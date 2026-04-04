import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PROJECT_LESSONS } from "@/lib/lessons-data";

export default function PortfolioProjectLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 mb-4">実践プロジェクト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポートフォリオサイト</h1>
        <p className="text-gray-400">HTML/CSS/JavaScriptで自己紹介サイトを作ろう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最初のプロジェクトとして、自分のスキルや作品を紹介する
          <strong className="text-indigo-400">ポートフォリオサイト</strong>を作ります。
          HTML/CSS/JavaScriptの基礎を組み合わせて、レスポンシブで見た目の良いサイトを完成させましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">必要なスキル</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>HTML の基本構造とセマンティック要素</li>
              <li>CSS のFlexbox/Grid レイアウト</li>
              <li>レスポンシブデザイン</li>
              <li>JavaScript のDOM操作（任意）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">完成物のイメージ</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>ヒーローセクション（名前・肩書き）</li>
              <li>自己紹介セクション</li>
              <li>スキル一覧</li>
              <li>作品紹介（カード形式）</li>
              <li>お問い合わせフォーム</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ステップ1: HTMLの構造 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ1: HTMLの骨組みを作る</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まずはセマンティックHTMLでページの構造を作りましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>山田太郎 | ポートフォリオ</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="hero">
    <nav class="nav">
      <a href="#about">自己紹介</a>
      <a href="#skills">スキル</a>
      <a href="#works">作品</a>
      <a href="#contact">お問い合わせ</a>
    </nav>
    <div class="hero-content">
      <h1>山田太郎</h1>
      <p>Webエンジニア / フロントエンド開発者</p>
    </div>
  </header>

  <main>
    <section id="about" class="section">
      <h2>自己紹介</h2>
      <p>こんにちは！Webエンジニアを目指して学習中の山田太郎です。</p>
    </section>

    <section id="skills" class="section">
      <h2>スキル</h2>
      <div class="skills-grid">
        <!-- スキルカードをここに追加 -->
      </div>
    </section>

    <section id="works" class="section">
      <h2>作品</h2>
      <div class="works-grid">
        <!-- 作品カードをここに追加 -->
      </div>
    </section>

    <section id="contact" class="section">
      <h2>お問い合わせ</h2>
      <form class="contact-form">
        <input type="text" name="name" placeholder="お名前" required />
        <input type="email" name="email" placeholder="メールアドレス" required />
        <textarea name="message" placeholder="メッセージ" rows="5" required></textarea>
        <button type="submit">送信</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 山田太郎</p>
  </footer>
</body>
</html>`}</code>
        </pre>
      </section>

      {/* ステップ2: CSSでデザイン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ2: CSSでデザインを整える</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`/* リセットと基本スタイル */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Noto Sans JP", sans-serif; color: #333; }

/* ヒーローセクション */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.hero h1 { font-size: 3rem; margin-bottom: 0.5rem; }
.hero p { font-size: 1.2rem; opacity: 0.9; }

/* ナビゲーション */
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}
.nav a { color: white; text-decoration: none; }

/* セクション */
.section {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}
.section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* スキル・作品グリッド */
.skills-grid, .works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .hero h1 { font-size: 2rem; }
  .nav { gap: 1rem; font-size: 0.9rem; }
}`}</code>
        </pre>
      </section>

      {/* ステップ3: スキルカード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ3: スキルカードを作る</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`<!-- スキルカードのHTML -->
<div class="skill-card">
  <div class="skill-icon">&#128187;</div>
  <h3>HTML / CSS</h3>
  <div class="skill-bar">
    <div class="skill-fill" style="width: 90%"></div>
  </div>
</div>

<div class="skill-card">
  <div class="skill-icon">&#9889;</div>
  <h3>JavaScript</h3>
  <div class="skill-bar">
    <div class="skill-fill" style="width: 75%"></div>
  </div>
</div>

<!-- スキルバーのCSS -->
<style>
.skill-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}
.skill-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.skill-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-top: 0.8rem;
  overflow: hidden;
}
.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 1s ease;
}
</style>`}</code>
        </pre>
      </section>

      {/* ステップ4: JavaScriptでインタラクション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ4: JavaScriptでインタラクションを追加</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// スムーズスクロール
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// スクロール時のフェードインアニメーション
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// フォーム送信の処理
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log('送信データ:', data);
  alert('送信しました（デモ）');
  e.target.reset();
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>セマンティックHTMLで意味のある構造を作る</li>
          <li>CSS Flexbox/Grid でレスポンシブなレイアウトを実現</li>
          <li>グラデーションや shadow でリッチなデザインに仕上げる</li>
          <li>IntersectionObserver でスクロールアニメーションを追加</li>
          <li>完成したら GitHub Pages や Vercel でデプロイして公開しよう</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="project" lessonId="portfolio" color="blue" />
      <LessonNav lessons={PROJECT_LESSONS} currentId="portfolio" basePath="/learn/project" color="blue" />
    </div>
  );
}
