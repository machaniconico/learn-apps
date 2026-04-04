import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function HtmlExercise() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HTML総合演習</h1>
        <p className="text-gray-400">学んだ知識を使って、実際のWebページを作ってみよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">課題：ポートフォリオページを作ろう</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          これまで学んだHTMLの知識をすべて使って、自己紹介のポートフォリオページを作ってみましょう。
          以下の要素を含めてください：
        </p>
        <ul className="space-y-1 text-gray-300 text-sm">
          <li>&#10003; セマンティックタグ（header、nav、main、section、footer）</li>
          <li>&#10003; 見出しと段落</li>
          <li>&#10003; ナビゲーションリンク</li>
          <li>&#10003; 画像</li>
          <li>&#10003; スキルのリスト（ul/ol）</li>
          <li>&#10003; 経歴のテーブル</li>
          <li>&#10003; お問い合わせフォーム</li>
          <li>&#10003; 適切なメタデータ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エディタで作成</h2>
        <p className="text-gray-400 mb-4">下のエディタで自由に作ってみましょう。参考コードを編集してもOKです。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>田中太郎 | ポートフォリオ</title>
</head>
<body>

<header>
  <h1>田中太郎</h1>
  <p>Webエンジニア</p>
  <nav>
    <a href="#about">自己紹介</a> |
    <a href="#skills">スキル</a> |
    <a href="#career">経歴</a> |
    <a href="#contact">お問い合わせ</a>
  </nav>
</header>

<main>
  <section id="about">
    <h2>自己紹介</h2>
    <img src="https://picsum.photos/150/150" alt="プロフィール写真"
      style="border-radius:50%;">
    <p>はじめまして。Web開発が好きなエンジニアです。
       HTML、CSS、JavaScriptを使って、使いやすいWebサイトを作っています。</p>
  </section>

  <section id="skills">
    <h2>スキル</h2>
    <ul>
      <li>HTML5 / CSS3</li>
      <li>JavaScript / TypeScript</li>
      <li>React / Next.js</li>
      <li>Node.js</li>
    </ul>
  </section>

  <section id="career">
    <h2>経歴</h2>
    <table>
      <tr><th>年</th><th>内容</th></tr>
      <tr><td>2020</td><td>プログラミング学習開始</td></tr>
      <tr><td>2022</td><td>Web制作会社に就職</td></tr>
      <tr><td>2024</td><td>フリーランスとして独立</td></tr>
    </table>
  </section>

  <section id="contact">
    <h2>お問い合わせ</h2>
    <form>
      <label for="name">お名前</label><br>
      <input type="text" id="name" required><br><br>

      <label for="email">メール</label><br>
      <input type="email" id="email" required><br><br>

      <label for="message">メッセージ</label><br>
      <textarea id="message" rows="4" required></textarea><br><br>

      <button type="submit">送信</button>
    </form>
  </section>
</main>

<footer>
  <p>&copy; 2026 田中太郎. All rights reserved.</p>
</footer>

</body>
</html>`}
          defaultCss={`body {
  font-family: sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}
header { text-align: center; margin-bottom: 30px; }
nav a { color: #6c5ce7; margin: 0 8px; }
section { margin-bottom: 30px; }
h2 { color: #6c5ce7; border-bottom: 2px solid #6c5ce7; padding-bottom: 8px; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background: #6c5ce7; color: white; }
input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
button { background: #6c5ce7; color: white; padding: 10px 24px; border: none; border-radius: 6px; cursor: pointer; }
footer { text-align: center; color: #999; margin-top: 40px; }`}
        />
      </section>
      <LessonCompleteButton categoryId="html" lessonId="html-exercise" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="html-exercise" basePath="/learn/html" color="orange" />
    </div>
  );
}
