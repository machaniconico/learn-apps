"use client";

import { useState } from "react";
import { GLOSSARY_TERMS } from "@/lib/glossary-data";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? GLOSSARY_TERMS.filter((t) => t.term.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase()) || (t.reading && t.reading.includes(query.toLowerCase())))
    : GLOSSARY_TERMS;

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Dart用語集</h1>
          <p className="text-gray-400">Dartでよく使われる{GLOSSARY_TERMS.length}語の用語集</p>
        </div>
        <div className="mb-6">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="用語を検索..." className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-teal-500 text-sm" />
        </div>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-10">「{query}」に一致する用語が見つかりません</p>
          ) : (
            filtered.map((t) => (
              <div key={t.term} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold text-teal-400">{t.term}</h3>
                  {t.reading && <span className="text-xs text-gray-500">（{t.reading}）</span>}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{t.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
