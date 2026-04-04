import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function FormsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーム</h1>
        <p className="text-gray-400">ユーザーからの入力を受け付けるフォーム要素を学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フォームの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フォームはユーザーからデータを入力してもらうための仕組みです。ログイン画面、検索ボックス、アンケート、
          お問い合わせフォームなど、あらゆるWebサイトで使われています。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;form&gt;</code>で全体を囲み、
          中に<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;input&gt;</code>、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;textarea&gt;</code>、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;select&gt;</code>などの入力要素を配置します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">inputの種類</h2>
        <p className="text-gray-400 mb-4">type属性でさまざまな入力フィールドを作れます。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<form>
  <div class="field">
    <label>テキスト入力</label>
    <input type="text" placeholder="名前を入力">
  </div>

  <div class="field">
    <label>メールアドレス</label>
    <input type="email" placeholder="email@example.com">
  </div>

  <div class="field">
    <label>パスワード</label>
    <input type="password" placeholder="パスワード">
  </div>

  <div class="field">
    <label>数値</label>
    <input type="number" min="0" max="100" value="50">
  </div>

  <div class="field">
    <label>日付</label>
    <input type="date">
  </div>

  <div class="field">
    <label>色</label>
    <input type="color" value="#6c5ce7">
  </div>

  <div class="field">
    <label>範囲（スライダー）</label>
    <input type="range" min="0" max="100" value="60">
  </div>

  <div class="field">
    <label>チェックボックス</label>
    <div>
      <input type="checkbox" id="agree">
      <label for="agree">利用規約に同意する</label>
    </div>
  </div>

  <div class="field">
    <label>ラジオボタン</label>
    <div>
      <input type="radio" name="plan" id="free"> <label for="free">無料</label>
      <input type="radio" name="plan" id="pro"> <label for="pro">有料</label>
    </div>
  </div>
</form>`}
          defaultCss={`.field {
  margin-bottom: 16px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
}
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}
input:focus {
  border-color: #6c5ce7;
  outline: none;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">textarea・select・バリデーション</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<form>
  <div class="field">
    <label for="msg">メッセージ</label>
    <textarea id="msg" rows="4" placeholder="自由に記入..."
      required minlength="10"></textarea>
    <small>10文字以上で入力してください</small>
  </div>

  <div class="field">
    <label for="category">カテゴリ</label>
    <select id="category" required>
      <option value="">選択してください</option>
      <option value="bug">バグ報告</option>
      <option value="feature">機能リクエスト</option>
      <option value="other">その他</option>
    </select>
  </div>

  <div class="field">
    <label>ファイルアップロード</label>
    <input type="file" accept="image/*">
  </div>

  <button type="submit">送信する</button>
</form>`}
          defaultCss={`.field { margin-bottom: 16px; }
label { display: block; font-weight: bold; margin-bottom: 4px; font-size: 14px; }
textarea, select {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}
small { color: #999; font-size: 12px; }
button {
  background: #6c5ce7;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
button:hover { background: #5f4dd0; }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">お問い合わせフォームを自分で作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- お問い合わせフォームを作ってみよう -->
<form>
  <h2>お問い合わせ</h2>
  <input type="text" placeholder="お名前">
  <input type="email" placeholder="メールアドレス">
  <textarea placeholder="お問い合わせ内容"></textarea>
  <button type="submit">送信</button>
</form>`}
          defaultCss={`form { max-width: 400px; margin: 0 auto; }
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="html" lessonId="forms" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="forms" basePath="/learn/html" color="orange" />
    </div>
  );
}
