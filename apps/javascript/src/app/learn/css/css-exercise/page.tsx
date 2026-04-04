import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function CssExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">CSS レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CSS総合演習</h1>
        <p className="text-gray-400">これまで学んだCSSの知識をすべて使って、スタイリッシュなプロフィールカードを作ろう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">総合演習の目標</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、これまでのCSSレッスンで学んだ技術をフル活用します：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">テキスト・フォント</code> - 読みやすいタイポグラフィ</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">背景・グラデーション</code> - 美しいカラー表現</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">Grid / Flexbox</code> - レイアウト設計</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">position</code> - 要素の自由な配置</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">アニメーション</code> - インタラクティブな動き</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">疑似クラス・疑似要素</code> - ホバーエフェクトや装飾</li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          まずはお手本を確認し、次に自分なりのアレンジを加えてみましょう！
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">お手本：プロフィールカード</h2>
        <p className="text-gray-400 mb-4">
          グラデーション背景、アニメーション、ホバーエフェクトなどを組み合わせたプロフィールカードです。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div class="profile-card">
  <div class="card-header">
    <div class="avatar">T</div>
    <div class="status-dot"></div>
  </div>
  <div class="card-body">
    <h2 class="name">田中 太郎</h2>
    <p class="role">フロントエンドエンジニア</p>
    <p class="bio">
      HTML/CSS/JavaScriptが好きです。
      ユーザーに喜ばれるUIを作ることが目標です。
    </p>
    <div class="skills">
      <span class="skill-tag">HTML</span>
      <span class="skill-tag">CSS</span>
      <span class="skill-tag">JavaScript</span>
      <span class="skill-tag">React</span>
    </div>
    <div class="stats">
      <div class="stat">
        <span class="stat-num">42</span>
        <span class="stat-label">プロジェクト</span>
      </div>
      <div class="stat">
        <span class="stat-num">1.2k</span>
        <span class="stat-label">フォロワー</span>
      </div>
      <div class="stat">
        <span class="stat-num">89</span>
        <span class="stat-label">いいね</span>
      </div>
    </div>
    <button class="follow-btn">フォローする</button>
  </div>
</div>`}
          defaultCss={`body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f0f2f5;
  font-family: sans-serif;
}

.profile-card {
  width: 320px;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
}

/* ヘッダー（グラデーション背景） */
.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 120px;
  position: relative;
  display: flex;
  justify-content: center;
}

/* アバター */
.avatar {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  bottom: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

/* オンライン状態ドット */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
.status-dot {
  width: 16px;
  height: 16px;
  background: #00b894;
  border: 3px solid white;
  border-radius: 50%;
  position: absolute;
  bottom: -35px;
  left: calc(50% + 25px);
  animation: pulse 2s ease-in-out infinite;
}

/* カード本体 */
.card-body {
  padding: 50px 24px 24px;
  text-align: center;
}

.name {
  font-size: 22px;
  font-weight: 800;
  color: #2d3436;
  margin: 0 0 4px;
}
.role {
  font-size: 14px;
  color: #6c5ce7;
  font-weight: 600;
  margin: 0 0 12px;
}
.bio {
  font-size: 13px;
  color: #636e72;
  line-height: 1.6;
  margin: 0 0 16px;
}

/* スキルタグ */
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 20px;
}
.skill-tag {
  background: #f0f0ff;
  color: #6c5ce7;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
}
.skill-tag:hover {
  background: #6c5ce7;
  color: white;
}

/* 統計 */
.stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-num {
  font-size: 20px;
  font-weight: 800;
  color: #2d3436;
}
.stat-label {
  font-size: 11px;
  color: #b2bec3;
  margin-top: 2px;
}

/* フォローボタン */
.follow-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.follow-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
.follow-btn:active {
  transform: scale(0.98);
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チャレンジ：SNS風カードページ</h2>
        <p className="text-gray-400 mb-4">
          複数のプロフィールカードを並べたレイアウトに挑戦しましょう。Grid、レスポンシブ、アニメーションを駆使してください。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<h1 class="page-title">チームメンバー</h1>
<div class="team-grid">
  <div class="member-card">
    <div class="member-header header-1"></div>
    <div class="member-avatar">S</div>
    <div class="member-info">
      <h3>佐藤 花子</h3>
      <p class="member-role">デザイナー</p>
      <p class="member-desc">UIデザインとイラストが得意</p>
    </div>
  </div>
  <div class="member-card">
    <div class="member-header header-2"></div>
    <div class="member-avatar">K</div>
    <div class="member-info">
      <h3>鈴木 一郎</h3>
      <p class="member-role">エンジニア</p>
      <p class="member-desc">バックエンド開発を担当</p>
    </div>
  </div>
  <div class="member-card">
    <div class="member-header header-3"></div>
    <div class="member-avatar">Y</div>
    <div class="member-info">
      <h3>山田 美咲</h3>
      <p class="member-role">マーケター</p>
      <p class="member-desc">SNSマーケティング担当</p>
    </div>
  </div>
</div>`}
          defaultCss={`body {
  background: #f0f2f5;
  font-family: sans-serif;
  padding: 20px;
  margin: 0;
}

.page-title {
  text-align: center;
  font-size: 24px;
  color: #2d3436;
  margin-bottom: 24px;
}
.page-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #6c5ce7, #0984e3);
  margin: 8px auto 0;
  border-radius: 2px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.member-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}
.member-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.member-header {
  height: 80px;
}
.header-1 { background: linear-gradient(135deg, #fd79a8, #e17055); }
.header-2 { background: linear-gradient(135deg, #0984e3, #00cec9); }
.header-3 { background: linear-gradient(135deg, #fdcb6e, #e17055); }

.member-avatar {
  width: 56px;
  height: 56px;
  background: white;
  border: 3px solid white;
  border-radius: 50%;
  margin: -28px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  color: #6c5ce7;
  box-shadow: 0 3px 10px rgba(0,0,0,0.12);
  position: relative;
}

.member-info {
  padding: 12px 16px 20px;
}
.member-info h3 {
  font-size: 16px;
  color: #2d3436;
  margin: 8px 0 4px;
}
.member-role {
  font-size: 12px;
  color: #6c5ce7;
  font-weight: 600;
  margin: 0 0 8px;
}
.member-desc {
  font-size: 12px;
  color: #636e72;
  line-height: 1.5;
  margin: 0;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">
          これまでの知識をすべて活用して、オリジナルのプロフィールカードやWebページを作ってみましょう！
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- ここに自分だけのプロフィールカードを作ろう！ -->
<div class="my-card">
  <div class="my-header"></div>
  <div class="my-body">
    <h2>あなたの名前</h2>
    <p>自己紹介を書いてみよう</p>
    <button class="my-btn">ボタン</button>
  </div>
</div>`}
          defaultCss={`.my-card {
  width: 280px;
  margin: 20px auto;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  font-family: sans-serif;
}
.my-header {
  height: 100px;
  background: linear-gradient(135deg, #6c5ce7, #0984e3);
}
.my-body {
  padding: 24px;
  text-align: center;
}
.my-body h2 {
  margin: 0 0 8px;
  color: #2d3436;
}
.my-body p {
  color: #636e72;
  font-size: 14px;
  margin: 0 0 16px;
}
.my-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}
.my-btn:hover {
  background: #5f3dc4;
  transform: scale(1.05);
}`}
        />
      </section>
      <LessonCompleteButton categoryId="css" lessonId="css-exercise" color="blue" />
      <LessonNav lessons={CSS_LESSONS} currentId="css-exercise" basePath="/learn/css" color="blue" />
    </div>
  );
}
