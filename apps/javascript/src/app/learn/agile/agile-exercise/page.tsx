import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { AGILE_LESSONS } from "@/lib/lessons-data";

export default function AgileExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 mb-4">アジャイル レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アジャイル総合演習</h1>
        <p className="text-gray-400">TODOアプリのスプリント計画を立て、アジャイル開発を実践しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、<strong className="text-blue-400">TODOアプリ</strong>を題材に
          アジャイル開発の一連のプロセスを実践します。
          ユーザーストーリーの作成からスプリント計画、デイリースタンドアップの模擬、
          レトロスペクティブまでを体験しましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">TODOアプリの要件</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>タスクの追加・編集・削除</li>
              <li>タスクの完了/未完了の切り替え</li>
              <li>カテゴリ分類とフィルタリング</li>
              <li>期限の設定と通知</li>
              <li>ユーザー認証（ログイン/登録）</li>
              <li>データの永続化（DB保存）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">演習で実践すること</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>Step 1: ユーザーストーリーを書く</li>
              <li>Step 2: ストーリーポイントで見積もる</li>
              <li>Step 3: スプリントバックログを作成</li>
              <li>Step 4: デイリースタンドアップを模擬</li>
              <li>Step 5: レトロスペクティブを実施</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 1: ユーザーストーリーを書く */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: ユーザーストーリーを書く</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、TODOアプリに必要な機能を<strong className="text-blue-400">ユーザーストーリー</strong>として
          洗い出しましょう。「誰が」「何をしたいか」「なぜか」の形式で書きます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【プロダクトバックログ：ユーザーストーリー一覧】

US-1: タスク追加
  「ユーザーとして、新しいタスクを追加したい。
   なぜなら、やるべきことを記録しておきたいからだ。」
  受け入れ条件:
  - テキスト入力欄からタスクを追加できる
  - 空のタスクは追加できない
  - 追加後、入力欄がクリアされる

US-2: タスク完了
  「ユーザーとして、タスクを完了にしたい。
   なぜなら、終わったことを把握したいからだ。」
  受け入れ条件:
  - チェックボックスで完了/未完了を切り替え
  - 完了タスクに取り消し線が表示される

US-3: タスク削除
  「ユーザーとして、不要なタスクを削除したい。
   なぜなら、リストを整理したいからだ。」
  受け入れ条件:
  - 削除ボタンでタスクを削除
  - 確認ダイアログを表示する

US-4: カテゴリ分類
  「ユーザーとして、タスクにカテゴリを設定したい。
   なぜなら、種類ごとに整理したいからだ。」
  受け入れ条件:
  - 「仕事」「プライベート」「買い物」等から選択
  - カテゴリでフィルタリングできる

US-5: 期限設定
  「ユーザーとして、タスクに期限を設定したい。
   なぜなら、締め切りを管理したいからだ。」
  受け入れ条件:
  - 日付ピッカーで期限を設定
  - 期限が近いタスクがハイライトされる
  - 期限超過タスクが赤く表示される

US-6: ユーザー認証
  「ユーザーとして、ログインして自分のタスクを管理したい。
   なぜなら、他のデバイスからもアクセスしたいからだ。」
  受け入れ条件:
  - メールとパスワードで登録・ログイン
  - ログイン状態が保持される
  - ログアウトできる`}</code>
        </pre>
      </section>

      {/* Step 2: 見積もり */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: ストーリーポイントで見積もる</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各ユーザーストーリーに<strong className="text-blue-400">ストーリーポイント</strong>を
          割り当てます。プランニングポーカーをイメージし、
          複雑さ・不確実性・作業量を考慮して相対的に見積もりましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【見積もり結果】

ID   │ ストーリー      │ SP │ 根拠
─────┼────────────────┼────┼─────────────────────
US-1 │ タスク追加       │  2 │ シンプルなフォーム実装
US-2 │ タスク完了       │  1 │ 状態切り替えのみ
US-3 │ タスク削除       │  2 │ 確認ダイアログ含む
US-4 │ カテゴリ分類     │  5 │ UIとフィルタリングロジック
US-5 │ 期限設定        │  5 │ 日付ピッカー＋ハイライト
US-6 │ ユーザー認証     │  8 │ 認証フロー全体の実装
─────┴────────────────┴────┴─────────────────────
                 合計:  23 SP

【プランニングポーカーの流れ】
1. POがストーリーを説明する
2. チーム全員が各自ポイントカードを選ぶ
3. 全員同時にカードをオープン
4. 見積もりが大きくずれた人が理由を説明
5. 議論後、再度見積もり → 合意

【見積もりのコツ】
- 最初に基準となるストーリーを決める（例: US-2 = 1点）
- 「それより大きい？小さい？」と比較で見積もる
- 8点以上は分割を検討する
- 不確実性が高い場合は大きめに見積もる`}</code>
        </pre>
      </section>

      {/* Step 3: スプリントバックログ作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: スプリントバックログを作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          チームのベロシティ（想定: 10SP/Sprint）をもとに、
          最初のスプリントに取り込むストーリーを選択し、タスクに分解します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【Sprint 1 バックログ】（想定ベロシティ: 10SP）

スプリントゴール:
「ユーザーがタスクの基本操作（追加・完了・削除）をできるようにする」

選択したストーリー: US-1 (2SP) + US-2 (1SP) + US-3 (2SP) + US-4 (5SP)
合計: 10 SP

─────────────────────────────────────────────
US-1: タスク追加 (2SP)
  □ タスク入力フォームのUI実装          (0.5日)
  □ 追加ボタンのイベントハンドラ実装     (0.5日)
  □ 空入力バリデーション               (0.25日)
  □ タスク追加のユニットテスト          (0.25日)

US-2: タスク完了 (1SP)
  □ チェックボックスUI実装             (0.25日)
  □ 状態切り替えロジック              (0.25日)
  □ 完了時の取り消し線スタイル         (0.25日)

US-3: タスク削除 (2SP)
  □ 削除ボタンUI実装                 (0.25日)
  □ 確認ダイアログ実装               (0.5日)
  □ 削除ロジック実装                 (0.25日)
  □ 削除のユニットテスト              (0.25日)

US-4: カテゴリ分類 (5SP)
  □ カテゴリ選択UIコンポーネント        (0.5日)
  □ カテゴリデータモデル設計           (0.5日)
  □ フィルタリング機能実装            (1日)
  □ カテゴリ別の色分け表示            (0.5日)
  □ フィルタリングのテスト            (0.5日)
─────────────────────────────────────────────

【Sprint 2 では...】
  US-5: 期限設定 (5SP)
  US-6: ユーザー認証 (8SP) → 分割検討
    US-6a: ユーザー登録 (3SP)
    US-6b: ログイン/ログアウト (5SP)`}</code>
        </pre>
      </section>

      {/* Step 4: デイリースタンドアップの模擬 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: デイリースタンドアップを模擬する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Sprint中、毎日15分のデイリースタンドアップを実施します。
          以下のシナリオで、3日間の進捗報告を模擬してみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【Day 2 (火曜) のデイリースタンドアップ】

Aさん（フロントエンド）:
  昨日: タスク入力フォームのUI実装を完了した
  今日: 追加ボタンのイベントハンドラを実装する
  障害: 特になし

Bさん（バックエンド）:
  昨日: カテゴリデータモデルの設計を完了した
  今日: カテゴリ選択UIコンポーネントに取り掛かる
  障害: デザインの仕様が不明確。POに確認が必要

Cさん（フルスタック）:
  昨日: チェックボックスUIの実装を完了した
  今日: 完了状態の切り替えロジックを実装する
  障害: 特になし

→ SM: 「Bさんのデザイン仕様の件、
       今日中にPOとの打ち合わせを設定します」

---

【Day 5 (金曜) のデイリースタンドアップ】

Aさん:
  昨日: US-1(タスク追加)のテストを完了。US-3に着手
  今日: 確認ダイアログの実装を進める
  障害: 特になし

Bさん:
  昨日: カテゴリ選択UIが完成。フィルタリングに着手
  今日: フィルタリングロジックの実装を続ける
  障害: フィルタリングのパフォーマンスが気になる
        → タスク数が多い場合のテストが必要

Cさん:
  昨日: US-2(タスク完了)を完了！削除ボタンUIに着手
  今日: 削除ロジックの実装
  障害: 特になし

→ 現在の進捗: US-1 ✅ US-2 ✅ US-3 作業中 US-4 作業中`}</code>
        </pre>
      </section>

      {/* Step 5: レトロスペクティブ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 5: レトロスペクティブを実施する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スプリントの最後にKPT法で振り返りを行います。
          Sprint 1 が終わった想定で、以下の例を参考に自分のチームでも実施してみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【Sprint 1 レトロスペクティブ（KPT法）】

━━━ Keep（続けること）━━━
✅ デイリースタンドアップで障害を早期発見できた
✅ ペアプログラミングでコード品質が上がった
✅ テストを先に書くことでバグが減った
✅ Slackでの非同期コミュニケーションが活発

━━━ Problem（問題点）━━━
❌ US-4のカテゴリ分類が想定より時間がかかった
❌ デザインの仕様確認に1日かかってしまった
❌ コードレビューが溜まりがちだった
❌ 見積もりが楽観的すぎた（US-4は8SPが妥当）

━━━ Try（次に試すこと）━━━
🔄 大きいストーリーは事前にスパイクで調査する
🔄 POとの仕様確認をスプリント前に済ませる
🔄 コードレビューの時間を毎日30分確保する
🔄 見積もりの基準ストーリーを見直す

━━━ アクションアイテム ━━━
1. [Bさん] Sprint 2 の US-5, US-6 について
   事前にPOと仕様を確認する（木曜まで）
2. [SM] コードレビュータイムを毎日14:00-14:30に設定
3. [チーム] 見積もりの基準を US-1(2SP) から再調整`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ユーザーストーリーは「誰が・何を・なぜ」の形式で書き、受け入れ条件を明確にする</li>
          <li>ストーリーポイントはフィボナッチ数列で相対見積もりし、プランニングポーカーで合意する</li>
          <li>スプリントバックログはベロシティに基づいてストーリーを選択し、タスクに分解する</li>
          <li>デイリースタンドアップで進捗を共有し、障害を早期に発見・解消する</li>
          <li>レトロスペクティブでKPT法を使い、チームのプロセスを継続的に改善する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="agile" lessonId="agile-exercise" color="blue" />
      <LessonNav lessons={AGILE_LESSONS} currentId="agile-exercise" basePath="/learn/agile" color="blue" />
    </div>
  );
}
