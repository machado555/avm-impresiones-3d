import { Cpu, Cuboid, Home, Printer, Sparkles, Zap } from "lucide-react";

export const categories = [
  {
    name: "Impresiones 3D",
    slug: "impresiones-3d",
    description: "Piezas decorativas, funcionales, prototipos y accesorios a pedido.",
    icon: Printer,
    accent: "from-cyan-400 to-blue-500"
  },
  {
    name: "Electronica",
    slug: "electronica",
    description: "Gadgets, modulos, accesorios inteligentes y soluciones practicas.",
    icon: Cpu,
    accent: "from-blue-400 to-violet-500"
  },
  {
    name: "Pequenos electrodomesticos",
    slug: "pequenos-electrodomesticos",
    description: "Productos compactos para mejorar rutinas y espacios cotidianos.",
    icon: Home,
    accent: "from-violet-400 to-fuchsia-500"
  },
  {
    name: "Diseno personalizado",
    slug: "diseno-personalizado",
    description: "Modelado, reparacion digital, prototipos y produccion a medida.",
    icon: Cuboid,
    accent: "from-emerald-300 to-cyan-400"
  }
];

export const featuredProducts = [
  {
    name: "Soporte modular AVM-X",
    category: "Impresion 3D",
    price: "$18.900",
    points: 180,
    description: "Organizador premium impreso en PLA+, ideal para escritorio y setups tech."
  },
  {
    name: "Kit sensores Maker",
    category: "Electronica",
    price: "$32.500",
    points: 320,
    description: "Pack inicial para proyectos IoT, prototipos y automatizacion casera."
  },
  {
    name: "Mini selladora compacta",
    category: "Electrodomesticos",
    price: "$24.200",
    points: 240,
    description: "Solucion portatil para cocina, taller y packaging de pequenos productos."
  }
];

export const processSteps = [
  {
    title: "Brief",
    description: "Contanos la idea, medidas, material, color y objetivo de la pieza.",
    icon: Sparkles
  },
  {
    title: "Cotizacion",
    description: "Analizamos factibilidad, tiempo de impresion, terminacion y costo.",
    icon: Zap
  },
  {
    title: "Produccion",
    description: "Fabricamos, validamos calidad y dejamos listo para retiro o envio.",
    icon: Printer
  }
];

export const blogPosts = [
  {
    title: "Como elegir material para impresion 3D",
    excerpt: "PLA, PETG, ABS y resinas: criterios simples para decidir segun uso real.",
    category: "Guias",
    readTime: "6 min"
  },
  {
    title: "Ideas rentables para prototipos rapidos",
    excerpt: "Casos donde imprimir una pieza antes de fabricar ahorra tiempo y dinero.",
    category: "Negocios",
    readTime: "4 min"
  },
  {
    title: "Setup maker: electronica + impresion 3D",
    excerpt: "Como combinar sensores, carcasas impresas y automatizacion liviana.",
    category: "Tecnologia",
    readTime: "5 min"
  }
];
