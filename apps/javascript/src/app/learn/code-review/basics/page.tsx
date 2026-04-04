import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CODE_REVIEW_LESSONS } from "@/lib/lessons-data";

export default function CodeReviewBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-2 py-1 rounded">コードレビュー レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2 mt-2">コードレビューの基本</h1>
        <p className="text-gray-400">なぜレビューするのか、何を見るのか、基本的な考え方を学ぼう</p>
      </div>

      {/* なぜコードレビューをするのか */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜコードレビューをするのか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コードレビューは単なる「間違い探し」ではありません。
          チーム開発において<strong className="text-orange-400">コードの品質</strong>を維持し、
          <strong className="text-orange-400">知識の共有</strong>を促進するための重要なプロセスです。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-2">品質面のメリット</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#8226; バグの早期発見（本番障害の防止）</li>
              <li>&#8226; セキュリティホールの検出</li>
              <li>&#8226; パフォーマンス問題の指摘</li>
              <li>&#8226; コーディング規約の徹底</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-2">チーム面のメリット</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#8226; コードベースの共有知識が増える</li>
              <li>&#8226; ジュニアメンバーの教育機会になる</li>
              <li>&#8226; 属人化（バス因子）の防止</li>
              <li>&#8226; チーム内の信頼関係が強まる</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">統計データ</p>
          <p className="text-sm text-gray-300">
            コードレビューを行うチームは、行わないチームに比べてバグの発生率が
            <strong className="text-orange-400">約60%低い</strong>という調査結果があります。
            レビューは最もコスト効率の良い品質保証手法の一つです。
          </p>
        </div>
      </section>

      {/* レビューの5つの観点 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">レビューの5つの観点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コードレビューでは、以下の5つの観点からコードを評価します。
          すべてを一度に見る必要はなく、優先度をつけて確認しましょう。
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="font-semibold text-white">正確性（Correctness）</h3>
            </div>
            <p className="text-gray-300 text-sm">コードが仕様通りに動作するか。エッジケースは考慮されているか。</p>
            <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-3">
              <code className="text-gray-300">{`// 悪い例: 0 で割る可能性がある
function average(nums: number[]): number {
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length; // nums が空配列だと NaN
}

// 良い例: エッジケースを考慮
function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="font-semibold text-white">可読性（Readability）</h3>
            </div>
            <p className="text-gray-300 text-sm">変数名は適切か。ロジックは理解しやすいか。コメントは必要十分か。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">3</span>
              <h3 className="font-semibold text-white">パフォーマンス（Performance）</h3>
            </div>
            <p className="text-gray-300 text-sm">不要なループや再計算はないか。N+1クエリなどの問題はないか。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">4</span>
              <h3 className="font-semibold text-white">セキュリティ（Security）</h3>
            </div>
            <p className="text-gray-300 text-sm">ユーザー入力のバリデーションは十分か。機密情報が漏洩しないか。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">5</span>
              <h3 className="font-semibold text-white">保守性（Maintainability）</h3>
            </div>
            <p className="text-gray-300 text-sm">将来の変更が容易か。DRY原則に従っているか。テストは書かれているか。</p>
          </div>
        </div>
      </section>

      {/* レビューチェックリスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">レビューチェックリスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビュー時に確認すべきポイントをまとめたチェックリストです。
          チームで共有して、レビューの質を均一化しましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-3">機能面</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#9744; 仕様通りに動作するか</li>
              <li>&#9744; エッジケースは考慮されているか</li>
              <li>&#9744; エラーハンドリングは適切か</li>
              <li>&#9744; 既存の機能を壊していないか</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-3">コード品質</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#9744; 命名は分かりやすいか</li>
              <li>&#9744; 関数やコンポーネントは適切な大きさか</li>
              <li>&#9744; 重複コードはないか</li>
              <li>&#9744; TypeScriptの型は適切か</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-3">セキュリティ</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#9744; ユーザー入力がサニタイズされているか</li>
              <li>&#9744; 機密情報がハードコードされていないか</li>
              <li>&#9744; 認証・認可のチェックがあるか</li>
              <li>&#9744; SQLインジェクション等の脆弱性はないか</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-3">テスト・ドキュメント</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#9744; テストは追加・更新されているか</li>
              <li>&#9744; CIが通っているか</li>
              <li>&#9744; 必要なドキュメントが更新されているか</li>
              <li>&#9744; 変更内容がPR説明文に記載されているか</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Approve と Request Changes */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Approve と Request Changes</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GitHubでは、レビュー結果を3つのステータスで伝えることができます。
          それぞれの使い分けを理解しましょう。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-400 mb-1">Approve（承認）</h3>
            <p className="text-gray-300 text-sm">
              コードに問題がなく、マージして良い状態。軽微な修正提案がある場合でも、
              ブロックする必要がなければApproveしてコメントで伝えるのがスムーズです。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h3 className="font-semibold text-red-400 mb-1">Request Changes（変更要求）</h3>
            <p className="text-gray-300 text-sm">
              マージ前に修正が必要な問題がある場合。バグ、セキュリティ問題、
              設計上の大きな懸念がある場合に使います。修正後に再度レビューします。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-gray-300 mb-1">Comment（コメント）</h3>
            <p className="text-gray-300 text-sm">
              承認でも変更要求でもない、フィードバックのみ。質問や提案をしたいが、
              判断は著者に任せたい場合に使います。
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">ポイント</p>
          <p className="text-sm text-gray-300">
            Request Changesを使う場合は、<strong className="text-orange-400">具体的に何を修正すべきか</strong>を
            明確に伝えましょう。「ここがダメ」ではなく「こう修正してください」と書くのがベストです。
          </p>
        </div>
      </section>

      {/* レビュー文化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">健全なレビュー文化を作る</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コードレビューは技術的なプロセスであると同時に、
          <strong className="text-orange-400">コミュニケーション</strong>です。
          チーム全体で心がけるべきポイントを紹介します。
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <div>
              <p className="text-white font-semibold">コードを批判し、人を批判しない</p>
              <p className="text-gray-400">「このコードは...」と書き、「あなたは...」とは書かない</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <div>
              <p className="text-white font-semibold">理由を説明する</p>
              <p className="text-gray-400">「こうした方がいい」だけでなく「なぜなら...」を添える</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <div>
              <p className="text-white font-semibold">良い点も褒める</p>
              <p className="text-gray-400">指摘だけでなく、良いコードにはポジティブなコメントを残す</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <div>
              <p className="text-white font-semibold">タイムリーにレビューする</p>
              <p className="text-gray-400">レビュー待ちが長いとチームの生産性が下がる（目安: 24時間以内）</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">5</span>
            <div>
              <p className="text-white font-semibold">完璧を求めすぎない</p>
              <p className="text-gray-400">「十分に良い」コードをマージして、改善は次のPRで行う</p>
            </div>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>&#8226; コードレビューは<strong className="text-orange-400">品質向上</strong>と<strong className="text-orange-400">知識共有</strong>の両方に貢献する</li>
          <li>&#8226; レビューの観点は<strong className="text-orange-400">正確性・可読性・パフォーマンス・セキュリティ・保守性</strong>の5つ</li>
          <li>&#8226; チェックリストを使って、レビューの抜け漏れを防ぐ</li>
          <li>&#8226; <strong className="text-orange-400">Approve / Request Changes / Comment</strong> を適切に使い分ける</li>
          <li>&#8226; 健全なレビュー文化は、<strong className="text-orange-400">敬意あるコミュニケーション</strong>から始まる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="code-review" lessonId="basics" color="orange" />
      <LessonNav lessons={CODE_REVIEW_LESSONS} currentId="basics" basePath="/learn/code-review" color="orange" />
    </div>
  );
}
