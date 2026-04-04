export interface LanguageConfig {
  id: string;
  name: string;
  emoji: string;
  url: string;
  hoverBorderColor: string;
  hoverTextColor: string;
}

export const languages: LanguageConfig[] = [
  { id: "javascript", name: "JS / TS", emoji: "🌐", url: "https://code-study-7bg.pages.dev/", hoverBorderColor: "hover:border-indigo-500/50", hoverTextColor: "group-hover:text-indigo-400" },
  { id: "python", name: "Python", emoji: "🐍", url: "https://python-learn-app.pages.dev/", hoverBorderColor: "hover:border-green-500/50", hoverTextColor: "group-hover:text-green-400" },
  { id: "csharp", name: "C#", emoji: "🔷", url: "https://csharp-learn-app.pages.dev/", hoverBorderColor: "hover:border-purple-500/50", hoverTextColor: "group-hover:text-purple-400" },
  { id: "cpp", name: "C++", emoji: "⚡", url: "https://cpp-learn-app.pages.dev/", hoverBorderColor: "hover:border-blue-500/50", hoverTextColor: "group-hover:text-blue-400" },
  { id: "java", name: "Java", emoji: "☕", url: "https://java-learn-app.pages.dev/", hoverBorderColor: "hover:border-orange-500/50", hoverTextColor: "group-hover:text-orange-400" },
  { id: "go", name: "Go", emoji: "🐹", url: "https://go-learn-app.pages.dev/", hoverBorderColor: "hover:border-cyan-500/50", hoverTextColor: "group-hover:text-cyan-400" },
  { id: "ruby", name: "Ruby", emoji: "💎", url: "https://ruby-learn-app.pages.dev/", hoverBorderColor: "hover:border-red-500/50", hoverTextColor: "group-hover:text-red-400" },
  { id: "c", name: "C", emoji: "🔧", url: "https://c-learn-app.pages.dev/", hoverBorderColor: "hover:border-slate-500/50", hoverTextColor: "group-hover:text-slate-400" },
  { id: "swift", name: "Swift", emoji: "🐦", url: "https://swift-learn-app.pages.dev/", hoverBorderColor: "hover:border-amber-500/50", hoverTextColor: "group-hover:text-amber-400" },
  { id: "kotlin", name: "Kotlin", emoji: "🟣", url: "https://kotlin-learn-app.pages.dev/", hoverBorderColor: "hover:border-violet-500/50", hoverTextColor: "group-hover:text-violet-400" },
  { id: "php", name: "PHP", emoji: "🐘", url: "https://php-learn-app.pages.dev/", hoverBorderColor: "hover:border-indigo-500/50", hoverTextColor: "group-hover:text-indigo-400" },
  { id: "dart", name: "Dart", emoji: "🎯", url: "https://dart-learn-app.pages.dev/", hoverBorderColor: "hover:border-teal-500/50", hoverTextColor: "group-hover:text-teal-400" },
];

export function getOtherLanguages(currentLanguageId: string): LanguageConfig[] {
  return languages.filter((lang) => lang.id !== currentLanguageId);
}
