// components/ChatBot.jsx
"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...messages, { role: "user", content: input }, { role: "bot", content: data.reply }]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white p-4 shadow-lg rounded-xl">
      <div className="h-64 overflow-y-auto">
        {messages.map((m, i) => (
          <p key={i} className={m.role === "user" ? "text-blue-500" : "text-gray-700"}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>
      <div className="mt-2 flex">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="border flex-1 p-2" />
        <button onClick={sendMessage} className="bg-indigo-600 text-white px-4">Send</button>
      </div>
    </div>
  );
}