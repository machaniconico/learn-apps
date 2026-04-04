import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function AccessibilityLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アクセシビリティ</h1>
        <p className="text-gray-400">すべてのユーザーが使いやすいWebページを作ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アクセシビリティとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webアクセシビリティは、障がいのある方や高齢者を含む<strong className="text-orange-400">すべての人</strong>が
          Webコンテンツを利用できるようにすることです。視覚障がいのある方はスクリーンリーダー（読み上げソフト）を使い、
          マウスが使えない方はキーボードだけで操作します。適切なHTMLを書くことで、これらの支援技術が正しく動作します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アクセシブルなフォーム</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<form>
  <!-- label と input を for/id で紐づける -->
  <div class="field">
    <label for="username">ユーザー名 <span class="required">*</span></label>
    <input type="text" id="username"
      required
      aria-required="true"
      aria-describedby="username-help"
      placeholder="半角英数字">
    <small id="username-help">3文字以上で入力してください</small>
  </div>

  <div class="field">
    <label for="email">メールアドレス <span class="required">*</span></label>
    <input type="email" id="email"
      required
      aria-required="true">
  </div>

  <!-- role と aria-label でボタンの意味を明確に -->
  <button type="submit" aria-label="フォームを送信する">
    送信する
  </button>
</form>

<!-- 画像には必ず alt を -->
<img src="https://picsum.photos/200/100"
  alt="風景写真：緑の山と青い空">

<!-- 装飾画像は空の alt -->
<img src="https://picsum.photos/50/50"
  alt="" role="presentation">`}
          defaultCss={`.field { margin-bottom: 16px; }
label { display: block; font-weight: bold; margin-bottom: 4px; }
.required { color: red; }
input {
  width: 100%;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
input:focus {
  border-color: #6c5ce7;
  outline: 2px solid #6c5ce740;
}
small { color: #666; font-size: 12px; }
button {
  background: #6c5ce7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">チェックリスト</h2>
        <div className="space-y-2 text-gray-300 text-sm">
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> すべてのimgにalt属性をつける</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> labelとinputをfor/idで紐づける</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> セマンティックタグを使う（div地獄を避ける）</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> キーボードだけで全操作できるようにする</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> 十分な色コントラスト比を保つ</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> フォーカス状態を視覚的に分かりやすくする</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> aria属性で補足情報を提供する</div>
          <div className="flex gap-2"><span className="text-green-400">&#10003;</span> 見出しの階層構造を正しくする（h1→h2→h3）</div>
        </div>
      </section>
      <LessonCompleteButton categoryId="html" lessonId="accessibility" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="accessibility" basePath="/learn/html" color="orange" />
    </div>
  );
}
