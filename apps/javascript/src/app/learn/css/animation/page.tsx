import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function AnimationLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アニメーション</h1>
        <p className="text-gray-400">transition、@keyframes、transformを使って動きのあるUIを作ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CSSアニメーションの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CSSだけでスムーズなアニメーションを作ることができます。大きく分けて2つの方法があります：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">transition</code> - プロパティの変化を滑らかにする（ホバー時など）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@keyframes</code> - 複雑なアニメーションをフレーム単位で定義</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">transform</code> - 回転（rotate）、拡大（scale）、移動（translate）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">animation</code> - @keyframesアニメーションを適用するプロパティ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">transitionでホバーアニメーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">transition</code>を指定すると、状態の変化がスムーズになります。ボタンにマウスを乗せてみてください。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<button class="btn btn-color">色が変わる</button>
<button class="btn btn-scale">大きくなる</button>
<button class="btn btn-shadow">影が付く</button>
<button class="btn btn-round">角が丸くなる</button>

<hr>

<div class="card">
  <h3>ホバーカード</h3>
  <p>マウスを乗せると浮き上がります</p>
</div>`}
          defaultCss={`.btn {
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  font-family: sans-serif;
  cursor: pointer;
  margin: 6px;
  background: #6c5ce7;
  /* transition: プロパティ 時間 イージング */
  transition: all 0.3s ease;
}

.btn-color:hover {
  background: #e17055;
}
.btn-scale:hover {
  transform: scale(1.15);
}
.btn-shadow:hover {
  box-shadow: 0 8px 25px rgba(108, 92, 231, 0.5);
}
.btn-round:hover {
  border-radius: 30px;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  max-width: 280px;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}
.card h3 { margin: 0 0 8px; color: #2d3436; }
.card p { margin: 0; color: #636e72; font-size: 14px; }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@keyframesアニメーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@keyframes</code>で複雑なアニメーションを定義し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">animation</code>プロパティで適用します。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="bounce-ball"></div>

<div class="pulse-dot"></div>

<div class="spinner"></div>

<p class="fade-in">フェードインするテキスト</p>`}
          defaultCss={`/* バウンスアニメーション */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-40px); }
}
.bounce-ball {
  width: 40px;
  height: 40px;
  background: #e17055;
  border-radius: 50%;
  animation: bounce 1s ease-in-out infinite;
  margin: 20px;
  display: inline-block;
}

/* パルスアニメーション */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}
.pulse-dot {
  width: 30px;
  height: 30px;
  background: #00b894;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
  margin: 20px;
  display: inline-block;
}

/* 回転アニメーション（ローディング） */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #dfe6e9;
  border-top: 4px solid #0984e3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 20px;
  display: inline-block;
}

/* フェードイン */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #6c5ce7;
  animation: fadeIn 2s ease forwards;
  margin: 20px;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">transformの活用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">transform</code>で回転・拡大・移動・傾斜を表現できます。ホバーで変化を確認してみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="transform-grid">
  <div class="t-box rotate">rotate<br>回転</div>
  <div class="t-box scale-up">scale<br>拡大</div>
  <div class="t-box translate">translate<br>移動</div>
  <div class="t-box skew">skew<br>傾斜</div>
  <div class="t-box combined">複合<br>変形</div>
</div>

<p style="font-family: sans-serif; color: #636e72; font-size: 13px; margin-top: 12px;">
  ※ 各ボックスにマウスを乗せてみてください
</p>`}
          defaultCss={`.transform-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 30px 10px;
}
.t-box {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.4s ease;
}
.rotate {
  background: #d63031;
}
.rotate:hover {
  transform: rotate(45deg);
}
.scale-up {
  background: #0984e3;
}
.scale-up:hover {
  transform: scale(1.4);
}
.translate {
  background: #00b894;
}
.translate:hover {
  transform: translate(15px, -15px);
}
.skew {
  background: #fdcb6e;
  color: #2d3436;
}
.skew:hover {
  transform: skew(10deg, 5deg);
}
.combined {
  background: #6c5ce7;
}
.combined:hover {
  transform: rotate(10deg) scale(1.2) translateY(-10px);
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- アニメーションを自由に作ってみよう -->
<div class="my-animation">アニメーション!</div>`}
          defaultCss={`@keyframes myAnim {
  0% { transform: translateX(0); background: #6c5ce7; }
  50% { transform: translateX(100px); background: #e17055; }
  100% { transform: translateX(0); background: #6c5ce7; }
}

.my-animation {
  display: inline-block;
  padding: 20px 30px;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  border-radius: 10px;
  animation: myAnim 2s ease-in-out infinite;
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="animation" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="animation" basePath="/learn/css" color="blue" />
    </div>
  );
}
