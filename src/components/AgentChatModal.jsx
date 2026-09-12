import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, Phone, ShieldCheck } from 'lucide-react';

export default function AgentChatModal({
  isOpen,
  onClose,
  agent = {
    name: 'Chloe Davis',
    title: 'Senior Luxury Travel Concierge',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'Online'
  }
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hello! I'm Chloe, your dedicated Wanderlust travel concierge. How may I tailor your luxury journey today?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Can I pay in BDT (Bangladeshi Taka)?',
    'How do I customize my Bali day-by-day itinerary?',
    'What is included in the private chauffeur service?'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent concierge response
    setTimeout(() => {
      let replyText = "Certainly! I have made a note of that on your expedition file. Let me know if you would like me to coordinate any additional VIP requests.";

      const lower = text.toLowerCase();
      if (lower.includes('bdt') || lower.includes('taka') || lower.includes('bangladesh')) {
        replyText = "Yes, absolutely! We fully support BDT (৳ Bangladeshi Taka). You can switch the currency in the top right menu, and your entire booking, taxes, and vouchers will be calculated and settled in BDT seamlessly.";
      } else if (lower.includes('itinerary') || lower.includes('bali')) {
        replyText = "You can easily customize each day! Use our 'Custom Itinerary' planner tab or let me adjust your temple visits, private yacht charters, or spa sessions directly in your dossier.";
      } else if (lower.includes('chauffeur') || lower.includes('car') || lower.includes('transport')) {
        replyText = "All private transfers feature executive Mercedes-Benz vehicles, professional English-speaking drivers, flight tracking, and chilled refreshments waiting for you right outside the gate.";
      }

      const agentReply = {
        id: Date.now() + 1,
        sender: 'agent',
        text: replyText,
        time: 'Just now'
      };

      setMessages((prev) => [...prev, agentReply]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full h-[85vh] sm:h-[620px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-luxury-emerald-dark text-white p-4 px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-950" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm leading-tight flex items-center gap-1.5">
                {agent.name}
                <span className="text-[10px] bg-emerald-800 text-amber-300 px-1.5 py-0.2 rounded font-sans font-semibold">VIP Concierge</span>
              </h3>
              <p className="text-[11px] text-emerald-200">{agent.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl shadow-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-luxury-emerald text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block mt-1 text-right ${
                    m.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
          <span className="text-slate-400 font-semibold px-1 whitespace-nowrap">Suggested:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-luxury-emerald whitespace-nowrap transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to concierge..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-luxury-emerald hover:bg-emerald-900 text-white flex items-center justify-center shadow transition active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
