import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createSupabasePublicClient } from "@/lib/supabase/public";

const SYSTEM_INSTRUCTION = `Sos el asistente virtual de AVM-Impresiones 3D, una tienda de impresión 3D, electrónica y diseño personalizado. Ofrecemos productos en PLA+, PETG y resina, con diseño CAD a medida, electrónica y automatización.

CATÁLOGO DE PRODUCTOS:
{catalog}

INSTRUCCIONES DE COMPORTAMIENTO:
- Respondé siempre en español, en un tono cercano y profesional, acorde a una tienda de tecnología/diseño.
- Solo respondé sobre el catálogo de AVM, precios, categorías, tiempos de fabricación aproximados (impresión 3D bajo pedido, no stock inmediato salvo que se indique lo contrario) y el proceso de compra del sitio (agregar al carrito, checkout como invitado o con cuenta).
- Si te preguntan algo fuera de este alcance, respondé amablemente que no podés ayudar con eso y redirigí la conversación hacia el catálogo o sugerí contactar por WhatsApp para consultas puntuales.
- NUNCA inventes precios, stock o productos que no estén en la lista que te pasamos. Si no tenés el dato, decilo con honestidad y sugerí contactar por WhatsApp.
- No prometas plazos de entrega exactos ni políticas de cambio/devolución que no se te hayan indicado explícitamente — para esos temas, sugerí consultar la sección "Legal" del sitio o contactar por WhatsApp.
- Mantené las respuestas breves y claras, evitando párrafos largos.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function formatPrice(price: number): string {
  return "$" + price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function buildCatalogText(products: any[], categories: any[]): string {
  const catMap = new Map<string, string>();
  for (const cat of categories) {
    catMap.set(cat.id, cat.name);
  }

  const lines: string[] = [];
  for (const p of products) {
    const catName = catMap.get(p.category_id) ?? "Sin categoría";
    const stockText = p.stock > 0 ? `Stock: ${p.stock} unidades` : "Sin stock (bajo pedido)";
    lines.push(`- ${p.name} | Precio: ${formatPrice(Number(p.price))} | Categoría: ${catName} | ${p.short_description ?? "Sin descripción"} | ${stockText}`);
  }

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const { message, history }: { message: string; history: ChatMessage[] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Por favor, escribí un mensaje válido." }, { status: 400 });
    }

    const supabase = createSupabasePublicClient();

    const [productsResult, categoriesResult] = await Promise.all([
      supabase.from("products").select("id,name,price,short_description,category_id,stock").eq("status", "active"),
      supabase.from("categories").select("id,name").eq("is_active", true),
    ]);

    const products = productsResult.data ?? [];
    const categories = categoriesResult.data ?? [];

    const catalogText = buildCatalogText(products, categories);
    const systemPrompt = SYSTEM_INSTRUCTION.replace("{catalog}", catalogText || "No hay productos disponibles en este momento.");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Estamos con mucha demanda en este momento, probá de nuevo en unos segundos o escribinos por WhatsApp.",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({
      history: (history ?? []).map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "Estamos con mucha demanda en este momento, probá de nuevo en unos segundos o escribinos por WhatsApp.",
    });
  }
}
