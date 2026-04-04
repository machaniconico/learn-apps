import Link from "next/link";

const learningPaths = [
  {
    id: "basics",
    name: "SQL基礎",
    icon: "🗃️",
    tagline: "SELECT、WHERE、JOINの基礎",
    description:
      "SELECT文、WHERE句、JOINなど、SQLの基本構文を体系的に学びましょう。データベースを扱う上で欠かせない知識を身につけます。",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-600/10",
    borderColor: "border-blue-500/30",
    href: "/learn/basics/select",
    topics: [
      "SELECT・FROM・WHERE",
      "AND・OR・NOT演算子",
      "ORDER BY・LIMIT",
      "GROUP BY・HAVING",
      "INNER JOIN・LEFT JOIN",
      "サブクエリ・EXISTS",
    ],
    code: `-- 売上上位の顧客を取得
SELECT
  c.name,
  SUM(o.amount) AS total
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.created_at >= '2024-01-01'
GROUP BY c.id, c.name
ORDER BY total DESC
LIMIT 10;`,
  },
  {
    id: "design",
    name: "データベース設計",
    icon: "📐",
    tagline: "DDL、制約、正規化",
    description:
      "CREATE TABLE、制約、正規化理論を学び、堅牢なデータベーススキーマを設計できるようになりましょう。",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-500/10 to-violet-600/10",
    borderColor: "border-purple-500/30",
    href: "/learn/create-table/basics",
    topics: [
      "CREATE TABLE・データ型",
      "PRIMARY KEY・FOREIGN KEY",
      "UNIQUE・CHECK制約",
      "ALTER TABLE",
      "第1〜第3正規形",
      "ER図設計",
    ],
    code: `-- ECサイトのテーブル定義
CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT    NOT NULL,
  price    INTEGER NOT NULL CHECK (price >= 0),
  stock    INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER REFERENCES categories(id)
);`,
  },
  {
    id: "advanced",
    name: "実践・運用",
    icon: "🚀",
    tagline: "ウィンドウ関数、パフォーマンス、セキュリティ",
    description:
      "ウィンドウ関数、CTE、パフォーマンスチューニング、セキュリティなど、実務で差がつく応用知識を習得します。",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10",
    borderColor: "border-orange-500/30",
    href: "/learn/window-functions/row-number",
    topics: [
      "ウィンドウ関数・RANK",
      "WITH・再帰CTE",
      "EXPLAIN・実行計画",
      "インデックスチューニング",
      "SQLインジェクション対策",
      "トランザクション・ACID",
    ],
    code: `-- 月別売上ランキング（ウィンドウ関数）
SELECT
  month,
  product,
  revenue,
  RANK() OVER (
    PARTITION BY month
    ORDER BY revenue DESC
  ) AS rank
FROM monthly_sales;`,
  },
];

const crossLinks = [
  { href: "https://code-study-7bg.pages.dev/", icon: "🌐", label: "JS / TS", hover: "hover:border-indigo-500/50", hoverText: "group-hover:text-indigo-400" },
  { href: "https://python-learn-app.pages.dev/", icon: "🐍", label: "Python", hover: "hover:border-green-500/50", hoverText: "group-hover:text-green-400" },
  { href: "https://csharp-learn-app.pages.dev/", icon: "🔷", label: "C#", hover: "hover:border-purple-500/50", hoverText: "group-hover:text-purple-400" },
  { href: "https://cpp-learn-app.pages.dev/", icon: "⚡", label: "C++", hover: "hover:border-blue-500/50", hoverText: "group-hover:text-blue-400" },
  { href: "https://java-learn-app.pages.dev/", icon: "☕", label: "Java", hover: "hover:border-orange-500/50", hoverText: "group-hover:text-orange-400" },
  { href: "https://go-learn-app.pages.dev/", icon: "🐹", label: "Go", hover: "hover:border-cyan-500/50", hoverText: "group-hover:text-cyan-400" },
  { href: "https://ruby-learn-app.pages.dev/", icon: "💎", label: "Ruby", hover: "hover:border-red-500/50", hoverText: "group-hover:text-red-400" },
  { href: "https://c-learn-app.pages.dev/", icon: "🔧", label: "C", hover: "hover:border-slate-500/50", hoverText: "group-hover:text-slate-400" },
  { href: "https://swift-learn-app.pages.dev/", icon: "🍎", label: "Swift", hover: "hover:border-amber-500/50", hoverText: "group-hover:text-amber-400" },
  { href: "https://kotlin-learn-app.pages.dev/", icon: "🟣", label: "Kotlin", hover: "hover:border-violet-500/50", hoverText: "group-hover:text-violet-400" },
  { href: "https://php-learn-app.pages.dev/", icon: "🐘", label: "PHP", hover: "hover:border-indigo-500/50", hoverText: "group-hover:text-indigo-400" },
  { href: "https://dart-learn-app.pages.dev/", icon: "🎯", label: "Dart", hover: "hover:border-teal-500/50", hoverText: "group-hover:text-teal-400" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-gray-950 to-cyan-950/20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            ブラウザだけで学習できる
          </div>
          <div className="text-6xl mb-6">🗃️</div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SQLを学ぼう
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            SELECT文からウィンドウ関数、データベース設計まで。
            体系的なカリキュラムでSQLをマスターしましょう。
          </p>
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">25</div>
              <div className="text-sm text-gray-500">カテゴリ</div>
            </div>
            <div className="w-px bg-gray-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">164</div>
              <div className="text-sm text-gray-500">レッスン</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/basics/select"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-gray-950 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              無料で始める
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors border border-gray-700"
            >
              カリキュラムを見る
            </a>
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section id="curriculum" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-3">学習ロードマップ</h2>
            <p className="text-gray-400">あなたの目標に合わせて学習パスを選ぼう</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className={`relative flex flex-col rounded-2xl border ${path.borderColor} bg-gradient-to-b ${path.bgGradient} from-opacity-10 overflow-hidden`}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{path.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-100">{path.name}</h3>
                      <p className={`text-sm bg-gradient-to-r ${path.gradient} bg-clip-text text-transparent font-medium`}>
                        {path.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{path.description}</p>
                </div>

                {/* Topics */}
                <div className="px-6 pb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    学べること
                  </h4>
                  <ul className="space-y-1.5">
                    {path.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-gray-300">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Example */}
                <div className="px-6 pb-4 flex-1">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    コード例
                  </h4>
                  <pre className="bg-gray-950 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto border border-gray-800 font-mono leading-relaxed">
                    <code>{path.code}</code>
                  </pre>
                </div>

                {/* CTA Button */}
                <div className="p-6 pt-2">
                  <Link
                    href={path.href}
                    className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${path.gradient} text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    学習を始める
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">準備はできた？</h2>
            <p className="text-gray-400 mb-8">
              まずはSQL基礎から始めて、着実にスキルを積み上げていきましょう。
            </p>
            <Link
              href="/learn/basics/select"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-gray-950 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              SQL基礎から始める
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 他の言語も学ぼう */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">他の言語も学ぼう</h2>
            <p className="text-gray-400">同じシリーズの学習アプリで他の言語もマスターしよう</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {crossLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group block bg-gray-900 border border-gray-800 ${link.hover} rounded-xl p-5 text-center transition-colors`}
              >
                <span className="text-3xl mb-2 block">{link.icon}</span>
                <span className={`text-sm font-semibold text-gray-200 ${link.hoverText} transition-colors`}>
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
