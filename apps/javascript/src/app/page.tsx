import Link from "next/link";

const LANGUAGES = [
  {
    id: "html",
    name: "HTML",
    color: "from-orange-500 to-red-500",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/10",
    icon: "{ }",
    tagline: "Webの骨格をつくる言語",
    description:
      "HTMLはWebページの構造を定義するマークアップ言語です。見出し、段落、画像、リンクなどの要素をタグで囲んで記述します。すべてのWebサイトの土台となる、最初に学ぶべき言語です。",
    whatYouLearn: [
      "HTMLの基本構造（DOCTYPE、html、head、body）",
      "テキスト要素（見出し、段落、リスト）",
      "リンクと画像の埋め込み",
      "フォームとユーザー入力",
      "セマンティックHTML（header、nav、main、footer）",
    ],
    example: `<!DOCTYPE html>
<html>
  <head>
    <title>はじめてのWebページ</title>
  </head>
  <body>
    <h1>こんにちは！</h1>
    <p>これが私の最初のWebページです。</p>
  </body>
</html>`,
  },
  {
    id: "css",
    name: "CSS",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    icon: "{ ; }",
    tagline: "Webを美しくデザインする言語",
    description:
      "CSSはWebページの見た目をコントロールするスタイルシート言語です。色、フォント、レイアウト、アニメーションなど、ページの視覚的な表現をすべてCSSで指定します。HTMLで作った骨格に、デザインという服を着せる役割です。",
    whatYouLearn: [
      "セレクタとプロパティの基本",
      "色、フォント、テキストのスタイリング",
      "ボックスモデル（margin、padding、border）",
      "Flexbox/Gridによるレイアウト",
      "レスポンシブデザイン（メディアクエリ）",
    ],
    example: `body {
  font-family: sans-serif;
  background-color: #1a1a2e;
  color: #eaeaea;
}

h1 {
  color: #6c5ce7;
  font-size: 2rem;
  text-align: center;
}

.card {
  background: #16213e;
  border-radius: 12px;
  padding: 20px;
}`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    color: "from-yellow-500 to-amber-500",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/10",
    icon: "( )",
    tagline: "Webに動きと知能を与える言語",
    description:
      "JavaScriptはWebページに動きとインタラクティブ性を加えるプログラミング言語です。ボタンクリックへの反応、データの処理、アニメーション、APIとの通信など、Webアプリケーションのロジックを担当します。世界で最も広く使われるプログラミング言語の一つです。",
    whatYouLearn: [
      "変数、データ型、演算子",
      "条件分岐（if/else）とループ（for/while）",
      "関数の定義と呼び出し",
      "DOM操作（HTML要素の動的変更）",
      "イベント処理（クリック、入力など）",
      "配列とオブジェクト",
    ],
    example: `// ボタンクリックでメッセージを表示
const button = document.querySelector('#btn');
let count = 0;

button.addEventListener('click', () => {
  count++;
  document.querySelector('#out')
    .textContent = count + '回クリック！';
});`,
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            プログラミングを学ぼう
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          HTML、CSS、JavaScriptの基礎をブラウザ上で学べるインタラクティブ学習アプリ。
          コードを書いて、すぐに結果を確認しながら学びましょう。
        </p>
      </section>

      {/* Learning Path */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2 text-center">学習ロードマップ</h2>
        <p className="text-gray-400 text-center mb-8">3つの言語を順番に学んでいきます</p>
        <div className="flex items-center justify-center gap-4 mb-12">
          {LANGUAGES.map((lang, i) => (
            <div key={lang.id} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-white font-bold text-lg`}>
                {i + 1}
              </div>
              {i < LANGUAGES.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Language Cards */}
      <section className="space-y-12">
        {LANGUAGES.map((lang) => (
          <div
            key={lang.id}
            className={`rounded-2xl border ${lang.borderColor} ${lang.bgColor} overflow-hidden`}
          >
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-3xl font-extrabold ${lang.textColor}`}>{lang.name}</span>
                    <span className="text-gray-500 font-mono text-sm">{lang.icon}</span>
                  </div>
                  <p className={`text-lg font-medium ${lang.textColor} opacity-80`}>{lang.tagline}</p>
                </div>
                <Link
                  href={`/learn/${lang.id}`}
                  className={`px-5 py-2.5 rounded-lg bg-gradient-to-r ${lang.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shrink-0`}
                >
                  学習を始める
                </Link>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">{lang.description}</p>

              {/* Two columns: What you learn + Code example */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* What you learn */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    学べること
                  </h3>
                  <ul className="space-y-2">
                    {lang.whatYouLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className={`mt-0.5 ${lang.textColor}`}>&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code example */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    コード例
                  </h3>
                  <pre className="bg-gray-900/80 rounded-lg p-4 text-sm overflow-x-auto border border-gray-800">
                    <code className="text-gray-300 font-mono">{lang.example}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-3">準備はできた？</h2>
        <p className="text-gray-400 mb-6">HTMLの基礎から始めましょう</p>
        <Link
          href="/learn/html"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          HTMLから始める &#8594;
        </Link>
      </section>

      {/* 他の言語も学ぼう */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">他の言語も学ぼう</h2>
            <p className="text-gray-400">同じシリーズの学習アプリで他の言語もマスターしよう</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <a href="https://python-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐍</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-green-400 transition-colors">Python</span>
            </a>
            <a href="https://csharp-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🔷</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">C#</span>
            </a>
            <a href="https://cpp-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">⚡</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">C++</span>
            </a>
            <a href="https://java-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-orange-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">☕</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-orange-400 transition-colors">Java</span>
            </a>
            <a href="https://go-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐹</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">Go</span>
            </a>
            <a href="https://ruby-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-red-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">💎</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-red-400 transition-colors">Ruby</span>
            </a>
            <a href="https://c-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-slate-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🔧</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-slate-400 transition-colors">C</span>
            </a>
            <a href="https://swift-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-amber-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐦</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-amber-400 transition-colors">Swift</span>
            </a>
            <a href="https://kotlin-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🟣</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-violet-400 transition-colors">Kotlin</span>
            </a>
            <a href="https://php-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🐘</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">PHP</span>
            </a>
            <a href="https://dart-learn-app.pages.dev/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-900 border border-gray-800 hover:border-teal-500/50 rounded-xl p-5 text-center transition-colors">
              <span className="text-3xl mb-2 block">🎯</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-teal-400 transition-colors">Dart</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
