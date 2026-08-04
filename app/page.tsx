"use client";

import ThreeCanvas from "@/components/ThreeCanvas/ThreeCanvas";
import { useState } from "react";

// // توی فایل page.tsx
// import dynamic from "next/dynamic";

// // این دستور می‌گه: این کامپوننت رو توی سرور رندر نکن، فقط توی مرورگر بیارش!
// const ThreeCanvas = dynamic(
//   () => import("@/components/ThreeCanvas/ThreeCanvas"),
//   {
//     ssr: false,
//   },
// );

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // ۱. اضافه کردن پیام کاربر به صفحه
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // ۲. ارسال مستقیم به بک‌اند
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.body) throw new Error("ریسپانس خالی است");

      // ۳. ساخت پیام هوش مصنوعی در استیت
      const aiMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: aiMessageId, role: "assistant", content: "" },
      ]);

      // ۴. خواندن استریم متنی کلمه به کلمه
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: msg.content + textChunk }
              : msg,
          ),
        );
      }
    } catch (error) {
      console.error("خطا در دریافت پاسخ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-slate-900 text-slate-100">
      <div className="z-10 max-w-2xl w-full flex flex-col gap-6">
        <ThreeCanvas />

        <header className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Prompt to 3D & AI Customizer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            فاز ۱: تست ارتباط اولیه با هوش مصنوعی
          </p>
        </header>

        {/* لیست پیام‌ها */}
        <div className="flex flex-col gap-4 min-h-[300px] max-h-[500px] overflow-y-auto p-4 rounded-xl bg-slate-950/50 border border-slate-800">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 my-auto">
              پیامی بنویسید تا گفتگو شروع شود...
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-lg max-w-[85%] ${
                m.role === "user"
                  ? "bg-blue-600 text-white self-end rounded-br-none"
                  : "bg-slate-800 text-slate-200 self-start rounded-bl-none border border-slate-700"
              }`}
            >
              <span className="text-xs font-semibold block mb-1 opacity-70">
                {m.role === "user" ? "تو" : "هوش مصنوعی"}
              </span>
              <p className="whitespace-pre-wrap leading-relaxed text-sm">
                {m.content}
              </p>
            </div>
          ))}

          {isLoading && (
            <div className="text-xs text-slate-500 animate-pulse self-start">
              در حال تفکر و پاسخگویی...
            </div>
          )}
        </div>

        {/* فرم ارسال */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-medium px-5 py-3 rounded-lg transition"
          >
            ارسال
          </button>
        </form>
      </div>
    </main>
  );
}
