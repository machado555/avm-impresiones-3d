"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hola! Soy el asistente de AVM. Puedo ayudarte a encontrar productos, saber precios o resolver dudas sobre tu compra. En que te puedo ayudar?",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "No entendi la respuesta, proba de nuevo." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Estamos con mucha demanda en este momento, proba de nuevo en unos segundos o escribinos por WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          type="button"
          icon
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-50 h-14 w-14 rounded-full shadow-[0_0_38px_rgba(0,178,255,0.35)] hover:scale-105"
          aria-label="Abrir chat asistente"
        >
          <MessageCircle size={25} />
        </Button>
      )}

      {isOpen && (
        <div className="chat-panel fixed bottom-5 right-5 z-50 flex w-[360px] flex-col overflow-hidden rounded-[var(--avm-radius-xl)] border border-white/10 bg-[#050712]/95 shadow-[0_0_48px_rgba(0,178,255,0.15)] backdrop-blur-2xl max-sm:inset-x-4 max-sm:bottom-4 max-sm:w-auto">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="chat-title text-sm font-semibold text-white">
              Asistente AVM
            </span>
            <Button type="button" variant="ghost" icon onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-[var(--avm-radius-lg)] px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[var(--avm-blue)] to-[var(--avm-violet)] text-white"
                      : "border border-white/[0.06] bg-white/[0.06] text-[var(--avm-text)]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-[var(--avm-radius-lg)] border border-white/[0.06] bg-white/[0.06] px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <span className="chat-typing-dot h-2 w-2 animate-bounce rounded-full bg-white/50" />
                    <span className="chat-typing-dot h-2 w-2 animate-bounce rounded-full bg-white/50" />
                    <span className="chat-typing-dot h-2 w-2 animate-bounce rounded-full bg-white/50" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribi tu mensaje..."
                disabled={isLoading}
                className="avm-input flex-1"
              />
              <Button
                type="button"
                icon
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label="Enviar mensaje"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
