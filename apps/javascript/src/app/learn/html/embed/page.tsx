import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function EmbedLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">iframe・埋め込み</h1>
        <p className="text-gray-400">YouTube、地図、外部コンテンツをページに埋め込もう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">iframeとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;iframe&gt;</code>は
          「inline frame」の略で、別のWebページをページ内に埋め込むための要素です。
          YouTube動画、Googleマップ、ツイート、外部のWebアプリなどを自分のページに表示できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な埋め込み</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<h2>iframeの基本</h2>

<!-- 外部サイトの埋め込み -->
<iframe
  src="https://example.com"
  width="100%"
  height="300"
  title="外部サイト"
  style="border: 2px solid #ddd; border-radius: 8px;">
</iframe>

<h2>videoタグで動画</h2>
<video width="100%" controls>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  お使いのブラウザは動画をサポートしていません。
</video>

<h2>audioタグで音声</h2>
<audio controls style="width:100%">
  <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
  お使いのブラウザは音声をサポートしていません。
</audio>`}
          defaultCss={`body { font-family: sans-serif; }
h2 { color: #6c5ce7; margin-top: 20px; }
iframe { margin-bottom: 16px; }`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">埋め込みの注意点</h2>
        <div className="space-y-2 text-gray-300 text-sm">
          <div className="flex gap-2"><span className="text-orange-400">&#9888;</span> iframeは必ずtitle属性をつける（アクセシビリティ）</div>
          <div className="flex gap-2"><span className="text-orange-400">&#9888;</span> sandbox属性でセキュリティを制限できる</div>
          <div className="flex gap-2"><span className="text-orange-400">&#9888;</span> loading=&quot;lazy&quot;で遅延読み込みしてパフォーマンス向上</div>
          <div className="flex gap-2"><span className="text-orange-400">&#9888;</span> 外部サイトはX-Frame-Optionsで埋め込みを拒否していることがある</div>
          <div className="flex gap-2"><span className="text-orange-400">&#9888;</span> レスポンシブにするにはaspect-ratioやCSSラッパーを使う</div>
        </div>
      </section>
      <LessonCompleteButton categoryId="html" lessonId="embed" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="embed" basePath="/learn/html" color="orange" />
    </div>
  );
}
