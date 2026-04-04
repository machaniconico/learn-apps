import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function HtmlBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HTMLの基本構造</h1>
        <p className="text-gray-400">Webページの骨格となるHTMLの基本を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HTMLとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTML（HyperText Markup Language）は、Webページの構造を定義するマークアップ言語です。
          ブラウザはHTMLを読み取り、画面に表示する内容と構造を理解します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          すべてのWebページはHTMLで構成されており、Web開発の最も基本的な技術です。
          「タグ」と呼ばれる記号で文書の構造を記述します。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DOCTYPE宣言</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTMLファイルの先頭には、必ず <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;!DOCTYPE html&gt;</code> を記述します。
          これはブラウザに「このファイルはHTML5で書かれている」と伝える宣言です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;!DOCTYPE html&gt;</code> - HTML5の文書型宣言（必須）</li>
          <li>この宣言がないと、ブラウザが古い互換モードで表示する場合があります</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">html / head / body</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTMLの基本構造は3つの主要な要素で成り立っています：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;html&gt;</code> - ドキュメント全体を囲むルート要素</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;head&gt;</code> - メタ情報（タイトル、文字コードなど）を記述する領域</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;body&gt;</code> - ブラウザに表示されるコンテンツを記述する領域</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">meta charset と title</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;head&gt;</code> 内には重要なメタ情報を記述します：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;meta charset=&quot;UTF-8&quot;&gt;</code> - 文字エンコーディングの指定。日本語を正しく表示するために必須</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;title&gt;</code> - ブラウザのタブに表示されるページタイトル</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;meta name=&quot;viewport&quot;&gt;</code> - スマホ対応のための表示設定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">はじめてのWebページ</h2>
        <p className="text-gray-400 mb-4">
          基本構造をすべて含んだHTMLページです。コードを編集して結果を確認してみましょう。
        </p>
        <CodePlayground
          mode="html"
          defaultHtml={`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>はじめてのWebページ</title>
</head>
<body>
  <h1>こんにちは、世界！</h1>
  <p>これは私のはじめてのWebページです。</p>
  <p>HTMLの基本構造を学んでいます。</p>
</body>
</html>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;!DOCTYPE html&gt;</code> でHTML5を宣言する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;html&gt;</code> がルート要素で、<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;head&gt;</code> と <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;body&gt;</code> を含む</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;meta charset=&quot;UTF-8&quot;&gt;</code> で文字コードを指定する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;title&gt;</code> でページタイトルを設定する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;body&gt;</code> 内に表示したいコンテンツを書く</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="html" lessonId="basics" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="basics" basePath="/learn/html" color="orange" />
    </div>
  );
}
