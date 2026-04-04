import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function ResponsiveLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">レスポンシブデザイン</h1>
        <p className="text-gray-400">@media、ビューポート単位、モバイルファーストで画面サイズに対応するデザインを作ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">レスポンシブデザインとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レスポンシブデザインは、スマホ・タブレット・PCなどさまざまな画面サイズに対応するデザイン手法です：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@media</code> - 画面サイズに応じてスタイルを切り替える</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">モバイルファースト</code> - 小さい画面を基準にして、大きい画面用を追加する考え方</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">vw / vh</code> - ビューポートの幅・高さに対する割合の単位</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">rem / em</code> - 相対的なサイズ単位</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">max-width</code> - 最大幅を制限して読みやすさを維持</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">clamp()</code> - 最小・推奨・最大値を一度に指定する関数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@media クエリの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">@media (max-width: 600px)</code>のように、画面幅に応じてスタイルを変えられます。
          プレビューの幅を変えて確認してみましょう。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="container">
  <nav class="nav">
    <div class="logo">MyApp</div>
    <ul class="nav-links">
      <li><a href="#">ホーム</a></li>
      <li><a href="#">機能</a></li>
      <li><a href="#">料金</a></li>
      <li><a href="#">お問い合わせ</a></li>
    </ul>
  </nav>

  <div class="cards">
    <div class="card">
      <h3>機能 A</h3>
      <p>説明テキストが入ります。</p>
    </div>
    <div class="card">
      <h3>機能 B</h3>
      <p>説明テキストが入ります。</p>
    </div>
    <div class="card">
      <h3>機能 C</h3>
      <p>説明テキストが入ります。</p>
    </div>
  </div>
</div>`}
          defaultCss={`* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; }

.container { max-width: 800px; margin: 0 auto; padding: 16px; }

/* ナビゲーション */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 2px solid #eee;
  margin-bottom: 24px;
}
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #6c5ce7;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}
.nav-links a {
  text-decoration: none;
  color: #636e72;
  font-size: 14px;
}
.nav-links a:hover { color: #6c5ce7; }

/* カードグリッド */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #eee;
}
.card h3 {
  color: #6c5ce7;
  margin-bottom: 8px;
}
.card p {
  color: #636e72;
  font-size: 14px;
  line-height: 1.5;
}

/* タブレット向け */
@media (max-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* スマホ向け */
@media (max-width: 400px) {
  .nav {
    flex-direction: column;
    gap: 12px;
  }
  .nav-links {
    gap: 12px;
    font-size: 13px;
  }
  .cards {
    grid-template-columns: 1fr;
  }
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビューポート単位とclamp()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">vw</code>はビューポート幅の1%、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">clamp()</code>で最小・推奨・最大を一括指定できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h1 class="fluid-title">流体タイポグラフィ</h1>
<p class="fluid-text">
  この文字サイズは画面幅に応じて滑らかに変化します。
  clamp()を使うと、メディアクエリなしでレスポンシブなフォントサイズが実現できます。
</p>

<div class="vw-boxes">
  <div class="vw-box">50vw の幅</div>
  <div class="vw-box small">30vw の幅</div>
</div>

<div class="percent-demo">
  <div class="inner">
    max-width: 90% + margin: auto で中央配置
  </div>
</div>`}
          defaultCss={`body { font-family: sans-serif; }

/* clamp() による流体タイポグラフィ */
.fluid-title {
  /* clamp(最小, 推奨, 最大) */
  font-size: clamp(18px, 4vw, 36px);
  color: #6c5ce7;
  margin-bottom: 8px;
}
.fluid-text {
  font-size: clamp(13px, 2vw, 18px);
  line-height: 1.7;
  color: #636e72;
  margin-bottom: 20px;
}

/* vw 単位のボックス */
.vw-boxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.vw-box {
  width: 50vw;
  background: #0984e3;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}
.vw-box.small {
  width: 30vw;
  background: #00b894;
}

/* パーセントとmax-width */
.percent-demo {
  background: #dfe6e9;
  padding: 16px;
  border-radius: 10px;
}
.inner {
  max-width: 90%;
  margin: 0 auto;
  background: #6c5ce7;
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モバイルファーストの実践</h2>
        <p className="text-gray-400 mb-4">
          モバイルファーストでは、まずスマホ用スタイルを書き、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">min-width</code>で大きい画面用を追加します。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="page">
  <header class="header">
    <h1>レスポンシブサイト</h1>
  </header>
  <main class="main">
    <article class="article">
      <h2>記事タイトル</h2>
      <p>これはメインのコンテンツエリアです。モバイルでは全幅、PCではサイドバーの隣に表示されます。</p>
    </article>
    <aside class="sidebar">
      <h3>サイドバー</h3>
      <ul>
        <li>リンク1</li>
        <li>リンク2</li>
        <li>リンク3</li>
      </ul>
    </aside>
  </main>
  <footer class="footer">フッター</footer>
</div>`}
          defaultCss={`* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; }

/* モバイルファースト: 基本スタイル（スマホ） */
.header {
  background: #6c5ce7;
  color: white;
  padding: 16px;
  text-align: center;
}
.header h1 { font-size: 18px; }

.main {
  display: flex;
  flex-direction: column;
}
.article {
  padding: 20px;
}
.article h2 { color: #2d3436; margin-bottom: 8px; }
.article p { color: #636e72; line-height: 1.6; font-size: 14px; }

.sidebar {
  background: #f8f9fa;
  padding: 20px;
  border-top: 1px solid #eee;
}
.sidebar h3 { color: #6c5ce7; margin-bottom: 8px; font-size: 16px; }
.sidebar ul { list-style: none; }
.sidebar li {
  padding: 6px 0;
  color: #636e72;
  font-size: 14px;
}

.footer {
  background: #2d3436;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 13px;
}

/* タブレット以上 */
@media (min-width: 500px) {
  .main {
    flex-direction: row;
  }
  .article { flex: 2; }
  .sidebar {
    flex: 1;
    border-top: none;
    border-left: 1px solid #eee;
  }
  .header h1 { font-size: 22px; }
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- レスポンシブなレイアウトを自由に作ってみよう -->
<div class="my-layout">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>`}
          defaultCss={`.my-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 10px;
}
.item {
  background: #6c5ce7;
  color: white;
  padding: 24px;
  border-radius: 10px;
  text-align: center;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
}

/* 幅が広い時は2列 */
@media (min-width: 400px) {
  .my-layout {
    grid-template-columns: 1fr 1fr;
  }
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="responsive" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="responsive" basePath="/learn/css" color="blue" />
    </div>
  );
}
