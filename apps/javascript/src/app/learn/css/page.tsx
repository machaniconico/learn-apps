import { CodePlayground } from "@/components/code-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CSS_LESSONS } from "@/lib/lessons-data";

const quizQuestions: QuizQuestion[] = [
  {
    question: "CSSでclass属性を持つ要素を指定するセレクタはどれ？",
    options: ["#className", ".className", "className", "@className"],
    answer: 1,
    explanation: "classセレクタはドット（.）を使って指定します。例：.highlight { color: red; }",
  },
  {
    question: "CSSでid属性を持つ要素を指定するセレクタはどれ？",
    options: [".idName", "#idName", "idName", "*idName"],
    answer: 1,
    explanation: "idセレクタはシャープ（#）を使って指定します。例：#special { font-weight: bold; }",
  },
  {
    question: "CSSのボックスモデルで、要素の「内側の余白」を指定するプロパティはどれ？",
    options: ["margin", "border", "padding", "gap"],
    answer: 2,
    explanation: "paddingは要素の内側の余白、marginは外側の余白を指定します。borderは枠線、gapはFlexbox/Gridの要素間のスペースです。",
  },
  {
    question: "Flexboxを有効にするためのCSSプロパティと値の組み合わせはどれ？",
    options: [
      "flex: enabled",
      "display: flex",
      "layout: flexbox",
      "position: flex",
    ],
    answer: 1,
    explanation: "display: flex; を親要素に指定することでFlexboxレイアウトが有効になります。",
  },
];

export default function CSSLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">CSS入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">Webページを美しくデザインするスタイルシート言語を学びましょう</p>
      </div>

      <ProgressBar categoryId="css" totalLessons={11} color="blue" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全11レッスン</h2>
        <LessonList lessons={CSS_LESSONS} basePath="/learn/css" color="blue" />
      </section>

      {/* CSSとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CSSとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">CSS（Cascading Style Sheets）</strong>は、
          HTMLで作った構造に対して見た目のスタイルを適用する言語です。
          色、サイズ、配置、アニメーションなど、ページの視覚的な表現はすべてCSSで制御します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTMLが家の骨組みだとすると、CSSは壁紙、ペンキ、家具の配置を決めるインテリアデザインです。
          同じHTMLでも、CSSを変えるだけでまったく違う見た目にできます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127912;</div>
            <h3 className="font-semibold text-white mb-1">デザインの指定</h3>
            <p className="text-sm text-gray-400">色、フォント、サイズ、間隔を自由にコントロール</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128690;</div>
            <h3 className="font-semibold text-white mb-1">レイアウト</h3>
            <p className="text-sm text-gray-400">FlexboxやGridで要素を思い通りに配置</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128241;</div>
            <h3 className="font-semibold text-white mb-1">レスポンシブ</h3>
            <p className="text-sm text-gray-400">PCでもスマホでも美しく表示される設計</p>
          </div>
        </div>
      </section>

      {/* セレクタとプロパティ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セレクタとプロパティ</h2>
        <p className="text-gray-400 mb-4">
          CSSは「どの要素に」（セレクタ）「何を」（プロパティ）「どうする」（値）の3つで成り立ちます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h1>スタイルの基本</h1>
<p>この段落のスタイルを変えてみよう</p>
<p class="highlight">classを使った段落</p>
<p id="special">idを使った段落</p>`}
          defaultCss={`/* タグ名で指定 */
h1 {
  color: #6c5ce7;
  font-size: 28px;
}

/* すべてのpタグ */
p {
  color: #636e72;
  line-height: 1.6;
}

/* classで指定（.をつける） */
.highlight {
  background-color: #ffeaa7;
  padding: 8px 12px;
  border-radius: 4px;
  color: #2d3436;
}

/* idで指定（#をつける） */
#special {
  color: #e17055;
  font-weight: bold;
  border-left: 4px solid #e17055;
  padding-left: 12px;
}`}
        />
      </section>

      {/* ボックスモデル */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ボックスモデル</h2>
        <p className="text-gray-400 mb-4">
          すべてのHTML要素は「ボックス」として扱われます。margin、border、padding、contentの4層構造です。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="box">
  <p>このボックスのpaddingやmarginを変えてみよう</p>
</div>

<div class="box box2">
  <p>2つ目のボックス</p>
</div>`}
          defaultCss={`.box {
  background-color: #74b9ff;
  color: #2d3436;
  padding: 20px;       /* 内側の余白 */
  margin: 16px 0;      /* 外側の余白 */
  border: 3px solid #0984e3; /* 枠線 */
  border-radius: 8px;  /* 角丸 */
}

.box2 {
  background-color: #a29bfe;
  border-color: #6c5ce7;
  padding: 40px;
  margin-top: 30px;
}`}
        />
      </section>

      {/* Flexbox */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Flexboxレイアウト</h2>
        <p className="text-gray-400 mb-4">
          Flexboxは要素を横並び・縦並びにしたり、均等配置したりできる強力なレイアウトシステムです。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="container">
  <div class="card">カード1</div>
  <div class="card">カード2</div>
  <div class="card">カード3</div>
</div>`}
          defaultCss={`.container {
  display: flex;         /* Flexbox有効化 */
  gap: 12px;             /* 要素間の余白 */
  justify-content: center; /* 中央揃え */
  flex-wrap: wrap;       /* 折り返し */
}

.card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 24px 32px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  min-width: 120px;
  text-align: center;
}`}
        />
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="blue" />
      </section>

      {/* 自由に試す */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">
          HTML＋CSSを自由に書いて、デザインを試しましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="profile-card">
  <h2>名前を入力</h2>
  <p>ここに自己紹介を書こう</p>
  <button>もっと見る</button>
</div>`}
          defaultCss={`/* プロフィールカードをデザインしてみよう */
.profile-card {
  max-width: 300px;
  margin: 20px auto;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

button {
  background: #0984e3;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}`}
        />
      </section>
    </div>
  );
}
