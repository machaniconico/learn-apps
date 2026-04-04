import { getOtherLanguages } from "../lib/languages";

interface LanguageCrossLinksProps {
  currentLanguageId: string;
}

export function LanguageCrossLinks({ currentLanguageId }: LanguageCrossLinksProps) {
  const otherLanguages = getOtherLanguages(currentLanguageId);

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">他の言語も学ぼう</h2>
        <p className="text-gray-400 mb-8">同じシリーズの学習アプリで他の言語もマスターしよう</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {otherLanguages.map((lang) => (
            <a
              key={lang.id}
              href={lang.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block bg-gray-900 border border-gray-800 ${lang.hoverBorderColor} rounded-xl p-5 text-center transition-colors`}
            >
              <span className="text-3xl mb-2 block">{lang.emoji}</span>
              <span className={`text-sm font-semibold text-gray-200 ${lang.hoverTextColor} transition-colors`}>
                {lang.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
