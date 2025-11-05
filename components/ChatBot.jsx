"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBotPage() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "👋 Hey there! I'm your assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.reply || "Sorry, I didn’t get that." }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Something went wrong. Please try again later." },
      ]);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-gray-100 flex flex-col items-center justify-between p-4">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-400">💬 Chat Assistant</h1>
        <p className="text-gray-400 mt-2">Your personal helper, available 24/7.</p>
      </header>

      {/* Chat Box */}
      <main className="w-full max-w-3xl bg-[#1a1a21] rounded-2xl shadow-lg flex flex-col p-6 flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm sm:text-base leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-200 rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Section */}
      <footer className="w-full max-w-3xl mt-6 flex items-center bg-[#1a1a21] rounded-full p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none text-gray-200 px-4 placeholder-gray-500"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full font-medium transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
}