import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function TextFontsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テキスト・フォント</h1>
        <p className="text-gray-400">font-family、font-size、font-weight、line-heightなどでテキストの見た目を自在に操ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フォント関連プロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSSにはテキストの見た目を制御する多くのプロパティがあります。主要なものを覚えましょう：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">font-family</code> - フォントの種類を指定（複数指定でフォールバック）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">font-size</code> - 文字の大きさ（px, em, rem など）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">font-weight</code> - 文字の太さ（normal, bold, 100〜900）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">line-height</code> - 行間の高さ</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">letter-spacing</code> - 文字間のスペース</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">text-decoration</code> - 下線・取り消し線などの装飾</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">text-transform</code> - 大文字・小文字の変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォントの種類とサイズ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">font-family</code>はカンマ区切りで複数指定でき、最初のフォントがなければ次が使われます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h1 class="serif">セリフ体の見出し</h1>
<h1 class="sans">サンセリフ体の見出し</h1>
<h1 class="mono">等幅フォントの見出し</h1>

<p class="size-small">小さいテキスト（14px）</p>
<p class="size-medium">中くらいのテキスト（18px）</p>
<p class="size-large">大きいテキスト（28px）</p>
<p class="size-rem">remで指定（1.5rem）</p>`}
          defaultCss={`.serif {
  font-family: "Georgia", "Times New Roman", serif;
  color: #2d3436;
}
.sans {
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #0984e3;
}
.mono {
  font-family: "Courier New", monospace;
  color: #6c5ce7;
}
.size-small { font-size: 14px; }
.size-medium { font-size: 18px; }
.size-large { font-size: 28px; }
.size-rem { font-size: 1.5rem; }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">太さ・行間・文字間隔</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">font-weight</code>、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">line-height</code>、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">letter-spacing</code>で読みやすさを調整できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<p class="light">font-weight: 300（細い）</p>
<p class="normal">font-weight: 400（通常）</p>
<p class="bold">font-weight: 700（太い）</p>
<p class="black">font-weight: 900（極太）</p>

<hr>

<p class="tight-line">行間が狭いテキスト。CSSのline-heightを1.2に設定しています。複数行になると詰まって見えます。読みづらいですね。</p>
<p class="wide-line">行間が広いテキスト。CSSのline-heightを2.0に設定しています。複数行になるとゆったり見えます。読みやすいですね。</p>

<hr>

<p class="tight-letter">文字間隔が狭い</p>
<p class="wide-letter">文字間隔が広い</p>`}
          defaultCss={`p {
  font-family: sans-serif;
  font-size: 16px;
  margin: 8px 0;
}
.light { font-weight: 300; }
.normal { font-weight: 400; }
.bold { font-weight: 700; }
.black { font-weight: 900; }

.tight-line { line-height: 1.2; color: #d63031; }
.wide-line { line-height: 2.0; color: #00b894; }

.tight-letter { letter-spacing: -1px; }
.wide-letter { letter-spacing: 5px; }

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 16px 0;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テキスト装飾と変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">text-decoration</code>で下線などを、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">text-transform</code>で大文字・小文字変換ができます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<p class="underline">下線付きテキスト</p>
<p class="overline">上線付きテキスト</p>
<p class="line-through">取り消し線テキスト</p>
<p class="wavy">波線の下線（おしゃれ）</p>
<p class="no-deco"><a href="#">リンクの下線を消す</a></p>

<hr>

<p class="upper">hello world → 大文字に変換</p>
<p class="lower">HELLO WORLD → 小文字に変換</p>
<p class="capitalize">hello world → 先頭だけ大文字</p>`}
          defaultCss={`.underline {
  text-decoration: underline;
}
.overline {
  text-decoration: overline;
}
.line-through {
  text-decoration: line-through;
  color: #b2bec3;
}
.wavy {
  text-decoration: underline wavy #e17055;
}
.no-deco a {
  text-decoration: none;
  color: #0984e3;
}
.upper { text-transform: uppercase; }
.lower { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 16px 0;
}
p { font-family: sans-serif; margin: 8px 0; }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- フォントやテキストのスタイルを自由に変えてみよう -->
<h1 class="title">お気に入りのスタイル</h1>
<p class="body">ここに好きなテキストを入れて、CSSでスタイルを変えてみてください。</p>`}
          defaultCss={`.title {
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
}
.body {
  font-size: 16px;
  line-height: 1.6;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="text-fonts" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="text-fonts" basePath="/learn/css" color="blue" />
    </div>
  );
}
