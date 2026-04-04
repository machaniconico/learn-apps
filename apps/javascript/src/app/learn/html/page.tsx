import { CodePlayground } from "@/components/code-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { HTML_LESSONS } from "@/lib/lessons-data";

const quizQuestions: QuizQuestion[] = [
  {
    question: "HTMLの正式名称は？",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
    explanation: "HTMLはHyper Text Markup Languageの略で、Webページの構造を定義するマークアップ言語です。",
  },
  {
    question: "HTMLで最も大きい見出しを作るタグはどれ？",
    options: ["<h6>", "<heading>", "<h1>", "<title>"],
    answer: 2,
    explanation: "<h1>が最も大きい見出しで、<h6>が最も小さい見出しです。<title>はページのタイトル（タブに表示される）を設定するタグです。",
  },
  {
    question: "HTMLのリンクを作成するタグはどれ？",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
    explanation: "<a>タグ（アンカータグ）でリンクを作成します。href属性にリンク先のURLを指定します。<link>タグはCSSファイルの読み込みなどに使います。",
  },
  {
    question: "HTMLについて正しい説明はどれ？",
    options: [
      "HTMLはプログラミング言語である",
      "HTMLはマークアップ言語である",
      "HTMLはスタイルシート言語である",
      "HTMLはデータベース言語である",
    ],
    answer: 1,
    explanation: "HTMLはプログラミング言語ではなく「マークアップ言語」です。コンテンツに意味（セマンティクス）を与えることが役割です。",
  },
];

export default function HTMLLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">HTML入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">Webページの骨格を作るマークアップ言語を学びましょう</p>
      </div>

      <ProgressBar categoryId="html" totalLessons={10} color="orange" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={HTML_LESSONS} basePath="/learn/html" color="orange" />
      </section>

      {/* HTMLとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HTMLとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-orange-400">HTML（HyperText Markup Language）</strong>は、
          Webページの構造と内容を定義するための言語です。ブラウザに「ここは見出し」「ここは段落」「ここは画像」
          といった情報を伝える「タグ」を使って書きます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTMLはプログラミング言語ではなく「マークアップ言語」です。計算やロジックを書くのではなく、
          コンテンツに意味（セマンティクス）を与えることが役割です。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128196;</div>
            <h3 className="font-semibold text-white mb-1">構造を定義</h3>
            <p className="text-sm text-gray-400">見出し、段落、リストなどの要素でページの骨格を作る</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128279;</div>
            <h3 className="font-semibold text-white mb-1">コンテンツを配置</h3>
            <p className="text-sm text-gray-400">テキスト、画像、リンク、動画などを埋め込む</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127760;</div>
            <h3 className="font-semibold text-white mb-1">すべてのWebの基盤</h3>
            <p className="text-sm text-gray-400">あらゆるWebサイトはHTMLから始まる</p>
          </div>
        </div>
      </section>

      {/* 基本構造 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTMLの基本構造</h2>
        <p className="text-gray-400 mb-4">
          HTMLファイルには必ず以下の構造が必要です。エディタでコードを編集して、プレビューの変化を確認しましょう。
        </p>
        <CodePlayground
          mode="html"
          defaultHtml={`<!DOCTYPE html>
<html>
  <head>
    <title>私のページ</title>
  </head>
  <body>
    <h1>こんにちは、HTML！</h1>
    <p>これが最初のWebページです。</p>
    <p>自由に編集してみてください。</p>
  </body>
</html>`}
        />
      </section>

      {/* 見出しと段落 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">見出しと段落</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h1&gt;</code>〜
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;h6&gt;</code>で見出し、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;p&gt;</code>で段落を作ります。
        </p>
        <CodePlayground
          mode="html"
          defaultHtml={`<h1>見出し1（最も大きい）</h1>
<h2>見出し2</h2>
<h3>見出し3</h3>
<h4>見出し4</h4>

<p>これは段落です。テキストを自然にまとめます。</p>
<p>2つ目の段落。自動的に間隔が空きます。</p>

<hr>

<h2>リスト</h2>
<ul>
  <li>順序なしリスト 1</li>
  <li>順序なしリスト 2</li>
</ul>

<ol>
  <li>順序ありリスト 1</li>
  <li>順序ありリスト 2</li>
</ol>`}
        />
      </section>

      {/* リンクと画像 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リンクと画像</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;a&gt;</code>タグでリンク、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;img&gt;</code>タグで画像を表示します。
        </p>
        <CodePlayground
          mode="html"
          defaultHtml={`<h2>リンクの例</h2>
<p>
  <a href="https://google.com" target="_blank">
    Googleを開く
  </a>
</p>

<h2>画像の例</h2>
<img
  src="https://picsum.photos/300/200"
  alt="サンプル画像"
  width="300"
>

<h2>組み合わせ</h2>
<a href="https://example.com">
  <img src="https://picsum.photos/200/100" alt="クリックできる画像">
</a>`}
        />
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="orange" />
      </section>

      {/* 自由に試す */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">
          下のエディタで自由にHTMLを書いてみましょう。「実行」ボタンを押すと結果が表示されます。
        </p>
        <CodePlayground
          mode="html"
          defaultHtml={`<!-- ここに自由にHTMLを書いてみよう！ -->
<h1>My Web Page</h1>
<p>好きなように編集してください</p>`}
        />
      </section>
    </div>
  );
}
