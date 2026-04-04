import Link from "next/link";

const learningPaths = [
  {
    id: "basics",
    name: "Python基礎",
    icon: "🐍",
    tagline: "プログラミングの基礎を学ぶ",
    description:
      "変数、データ型、条件分岐、ループ、関数など、Pythonプログラミングの基礎をしっかりと身につけましょう。",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-600/10",
    borderColor: "border-green-500/30",
    href: "/learn/basics",
    topics: [
      "変数とデータ型",
      "条件分岐・ループ",
      "関数とスコープ",
      "リスト・辞書・タプル",
      "クラスとオブジェクト指向",
      "ファイル操作・例外処理",
    ],
    code: `# 変数とデータ型
name = "太郎"
age = 25
hobbies = ["読書", "ゲーム", "料理"]

# f文字列で出力
print(f"{name}さん（{age}歳）")
print(f"趣味: {', '.join(hobbies)}")`,
  },
  {
    id: "web",
    name: "Web開発",
    icon: "🌐",
    tagline: "WebアプリケーションをPythonで作る",
    description:
      "FastAPIやDjangoを使ってWebAPIやWebアプリケーションを開発する方法を学びましょう。",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-600/10",
    borderColor: "border-blue-500/30",
    href: "/learn/web",
    topics: [
      "FastAPI入門",
      "REST API設計",
      "データベース連携",
      "認証・認可",
      "非同期処理",
      "デプロイ",
    ],
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/hello/{name}")
async def hello(name: str):
    return {"message": f"こんにちは、{name}さん！"}`,
  },
  {
    id: "datascience",
    name: "データサイエンス",
    icon: "📊",
    tagline: "データ分析・可視化を学ぶ",
    description:
      "pandas、NumPy、matplotlibを使ってデータを分析・可視化し、機械学習の基礎も学びましょう。",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-500/10 to-violet-600/10",
    borderColor: "border-purple-500/30",
    href: "/learn/datascience",
    topics: [
      "NumPy基礎",
      "pandasでデータ操作",
      "matplotlibで可視化",
      "データ前処理",
      "統計分析",
      "機械学習入門",
    ],
    code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv")
monthly = df.groupby("month")["revenue"].sum()
monthly.plot(kind="bar", color="#10b981")
plt.title("月別売上")
plt.show()`,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-gray-950 to-emerald-950/20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-sm text-green-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            ブラウザだけで学習できる
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Pythonを学ぼう
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Pythonの基礎からWeb開発、データサイエンスまで。
            ブラウザ上でコードを書いて、すぐに結果を確認しながら学びましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/basics"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-950 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              無料で始める
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors border border-gray-700"
            >
              プレイグラウンドを試す
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                          className="w-3.5 h-3.5 text-green-500 flex-shrink-0"
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
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">準備はできた？</h2>
            <p className="text-gray-400 mb-8">
              まずはPython基礎から始めて、着実にスキルを積み上げていきましょう。
            </p>
            <Link
              href="/learn/basics"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-950 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Python基礎から始める
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <a href="https://code-study-7bg.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🌐</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">JS / TS</span>
            </a>
            <a href="https://csharp-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🔷</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">C#</span>
            </a>
            <a href="https://cpp-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">⚡</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">C++</span>
            </a>
            <a href="https://java-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-orange-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">☕</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-orange-400 transition-colors">Java</span>
            </a>
            <a href="https://go-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐹</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">Go</span>
            </a>
            <a href="https://ruby-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-red-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">💎</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-red-400 transition-colors">Ruby</span>
            </a>
            <a href="https://c-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-slate-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🔧</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-slate-400 transition-colors">C</span>
            </a>
            <a href="https://swift-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-amber-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐦</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-amber-400 transition-colors">Swift</span>
            </a>
            <a href="https://kotlin-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🟣</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-violet-400 transition-colors">Kotlin</span>
            </a>
            <a href="https://php-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐘</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">PHP</span>
            </a>
            <a href="https://dart-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-teal-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🎯</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-teal-400 transition-colors">Dart</span>
            </a>
            <a href="https://sql-learn-app.pages.dev/" className="group block bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🗃️</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">SQL</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
