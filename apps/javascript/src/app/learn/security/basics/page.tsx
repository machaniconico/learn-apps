import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SECURITY_LESSONS } from "@/lib/lessons-data";

export default function SecurityBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">セキュリティ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セキュリティの基本</h1>
        <p className="text-gray-400">脅威モデル、CIA三要素、攻撃の種類と防御の考え方を学ぼう</p>
      </div>

      {/* CIA三要素 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CIA三要素（情報セキュリティの3原則）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          情報セキュリティの目標は、以下の3つの要素を守ることです。
          これらを <strong className="text-red-400">CIA三要素</strong> と呼びます。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">Confidentiality（機密性）</h3>
            <p className="text-sm text-gray-400">許可された人だけが情報にアクセスできること。暗号化やアクセス制御で守る。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">Integrity（完全性）</h3>
            <p className="text-sm text-gray-400">情報が不正に改ざんされていないこと。ハッシュやデジタル署名で検証する。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">Availability（可用性）</h3>
            <p className="text-sm text-gray-400">必要なときに情報やサービスにアクセスできること。DDoS対策や冗長化で守る。</p>
          </div>
        </div>
      </section>

      {/* 脅威モデル */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">脅威モデル（Threat Model）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">脅威モデル</strong>とは、システムに対してどのような攻撃が想定されるかを
          整理・分析するフレームワークです。「何を守るか」「誰から守るか」「どう守るか」を明確にします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`脅威モデルの基本ステップ:

1. 資産の特定
   - ユーザーの個人情報（メール、パスワード）
   - 決済情報（クレジットカード番号）
   - セッション情報（ログイン状態）

2. 脅威の特定
   - 外部攻撃者（ハッカー）
   - 内部犯行者（従業員）
   - 自動化された攻撃（ボット）

3. 脆弱性の分析
   - 入力値の検証不足 → SQLインジェクション
   - 出力のエスケープ不足 → XSS
   - 認証の不備 → セッションハイジャック

4. 対策の実装
   - 入力バリデーション
   - 出力エスケープ
   - HTTPS の強制
   - 適切な認証・認可`}</code>
        </pre>
      </section>

      {/* 代表的な攻撃の種類 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">代表的な攻撃の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webアプリケーションに対する主要な攻撃手法を知っておきましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">インジェクション攻撃</h3>
            <p className="text-sm text-gray-400">SQLインジェクション、コマンドインジェクションなど。悪意のあるコードを注入する。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">クロスサイトスクリプティング（XSS）</h3>
            <p className="text-sm text-gray-400">悪意のあるJavaScriptをWebページに埋め込み、ユーザーの情報を盗む。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">CSRF（クロスサイトリクエストフォージェリ）</h3>
            <p className="text-sm text-gray-400">ログイン中のユーザーに意図しないリクエストを送信させる。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">DDoS攻撃</h3>
            <p className="text-sm text-gray-400">大量のリクエストでサーバーを過負荷にしてサービスを停止させる。</p>
          </div>
        </div>
      </section>

      {/* セキュリティの基本原則 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">セキュリティの基本原則</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li><strong className="text-red-400">最小権限の原則</strong>：必要最小限の権限だけを付与する</li>
          <li><strong className="text-red-400">多層防御</strong>：1つの防御が突破されても他の層で守る</li>
          <li><strong className="text-red-400">入力は常に信頼しない</strong>：ユーザーからの入力はすべてバリデーションする</li>
          <li><strong className="text-red-400">セキュリティ・バイ・デザイン</strong>：設計段階からセキュリティを考慮する</li>
          <li><strong className="text-red-400">フェイルセーフ</strong>：エラー時は安全な状態にフォールバックする</li>
        </ul>
      </section>

      {/* OWASP Top 10 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">OWASP Top 10</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">OWASP（Open Web Application Security Project）</strong>が発表する、
          Webアプリケーションにおける最も危険なセキュリティリスクのランキングです。
          開発者なら必ず知っておくべきリストです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`OWASP Top 10 (2021):

1. アクセス制御の不備
2. 暗号化の失敗
3. インジェクション（SQL, XSS等）
4. 安全でない設計
5. セキュリティの設定ミス
6. 脆弱で古いコンポーネント
7. 認証の不備
8. ソフトウェアとデータの整合性の不備
9. セキュリティログと監視の不備
10. サーバーサイドリクエストフォージェリ（SSRF）`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>CIA三要素（機密性・完全性・可用性）が情報セキュリティの基本</li>
          <li>脅威モデルで「何を」「誰から」「どう」守るかを明確にする</li>
          <li>インジェクション、XSS、CSRFなど主要な攻撃手法を理解する</li>
          <li>最小権限・多層防御・入力検証などの基本原則を守る</li>
          <li>OWASP Top 10 を定期的に確認し、最新の脅威に備える</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="security" lessonId="basics" color="red" />
      <LessonNav lessons={SECURITY_LESSONS} currentId="basics" basePath="/learn/security" color="red" />
    </div>
  );
}
