"use client";

import { useState } from "react";
import Link from "next/link";
import { saveFinalExamScore } from "@/lib/progress";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Ruby基礎",
    question: "putsとprintの違いとして正しいのはどれですか？",
    options: [
      "putsは改行なし、printは改行あり",
      "putsは改行付き、printは改行なし",
      "どちらも同じ動作をする",
      "putsは数値のみ、printは文字列のみ出力できる",
    ],
    correctIndex: 1,
    explanation: "`puts` は出力後に改行を追加しますが、`print` は改行を追加しません。また `puts` はnil引数で空行を出力し、配列を渡すと各要素を1行ずつ出力します。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "Rubyの `unless` 文の意味として正しいのはどれですか？",
    options: [
      "条件が真のときに実行する",
      "条件が偽（falseまたはnil）のときに実行する（ifの否定）",
      "ループを繰り返す",
      "例外を捕捉する",
    ],
    correctIndex: 1,
    explanation: "`unless` は `if` の否定形で、条件が偽（false または nil）のときにブロックを実行します。`unless condition` は `if !condition` と同等です。",
  },
  {
    id: 3,
    category: "メソッド",
    question: "Rubyのメソッドの暗黙の戻り値はどれですか？",
    options: [
      "常にnil",
      "最初に評価された式の値",
      "最後に評価された式の値",
      "returnキーワードで明示しないと戻り値はない",
    ],
    correctIndex: 2,
    explanation: "Rubyのメソッドは `return` を明示しなくても、最後に評価された式の値が自動的に戻り値となります。これはRubyの重要な特徴のひとつです。",
  },
  {
    id: 4,
    category: "配列",
    question: "`[1, 2, 3].map {|n| n * 2}` の結果はどれですか？",
    options: [
      "[1, 2, 3]",
      "[2, 4, 6]",
      "6",
      "nil",
    ],
    correctIndex: 1,
    explanation: "`map`（または `collect`）は各要素にブロックを適用し、その結果からなる新しい配列を返します。各要素が2倍されるので `[2, 4, 6]` となります。",
  },
  {
    id: 5,
    category: "ハッシュ",
    question: "Rubyでシンボルをキーとするハッシュの正しい書き方はどれですか？",
    options: [
      `{"name" => "Ruby"}`,
      `{:name => "Ruby"} または {name: "Ruby"}`,
      `{[name]: "Ruby"}`,
      `{name = "Ruby"}`,
    ],
    correctIndex: 1,
    explanation: "シンボルキーのハッシュは `{:name => \"Ruby\"}` のロケット記法と、Ruby 1.9以降では `{name: \"Ruby\"}` のコロン記法どちらでも書けます。後者がより一般的です。",
  },
  {
    id: 6,
    category: "文字列",
    question: "Rubyの文字列で式展開（文字列内に変数や式を埋め込む）の正しい記法はどれですか？",
    options: [
      `'Hello $\{name}'`,
      `"Hello #\{name}"`,
      `"Hello %{name}"`,
      `"Hello {name}"`,
    ],
    correctIndex: 1,
    explanation: "Rubyの式展開は `\"Hello #\{name}\"` のように `#{}` を使います。ダブルクォート文字列のみで有効です。シングルクォートでは展開されません。",
  },
  {
    id: 7,
    category: "シンボル",
    question: "Rubyのシンボルの特徴として正しいのはどれですか？",
    options: [
      "ミュータブルで毎回異なるオブジェクトが生成される",
      "イミュータブルで同じシンボルは同一オブジェクト",
      "文字列より処理速度が遅い",
      "数値のみを表現できる",
    ],
    correctIndex: 1,
    explanation: "シンボルはイミュータブル（変更不可）で、同じシンボルは常に同一オブジェクトです。`:name.equal?(:name)` は `true` を返します。ハッシュキーや識別子に適しています。",
  },
  {
    id: 8,
    category: "ブロック",
    question: "メソッド内で `yield` を使う役割として正しいのはどれですか？",
    options: [
      "メソッドの実行を終了する",
      "メソッドに渡されたブロックを呼び出して実行する",
      "新しいスレッドを起動する",
      "例外を発生させる",
    ],
    correctIndex: 1,
    explanation: "`yield` はメソッドに渡されたブロックを呼び出します。`yield` に引数を渡すとブロックのブロック引数に渡されます。`block_given?` でブロックの有無を確認できます。",
  },
  {
    id: 9,
    category: "クラス",
    question: "Rubyのクラスで `initialize` メソッドの役割はどれですか？",
    options: [
      "クラスメソッドを定義する",
      "インスタンス生成時に呼ばれるコンストラクタ",
      "クラスを継承するためのメソッド",
      "インスタンスを削除する",
    ],
    correctIndex: 1,
    explanation: "`initialize` は `new` でインスタンスが生成されるときに自動的に呼ばれるコンストラクタです。インスタンス変数（`@変数名`）の初期化などに使います。",
  },
  {
    id: 10,
    category: "継承",
    question: "Rubyの `super` キーワードの役割として正しいのはどれですか？",
    options: [
      "クラスを定義する",
      "親クラスの同名メソッドを呼び出す",
      "モジュールをインクルードする",
      "例外を再発生させる",
    ],
    correctIndex: 1,
    explanation: "`super` は親クラス（スーパークラス）の同名メソッドを呼び出します。引数なしで `super` と書くと現在のメソッドの引数がそのまま渡されます。",
  },
  {
    id: 11,
    category: "モジュール",
    question: "モジュールを `include` したときの効果として正しいのはどれですか？",
    options: [
      "クラスメソッドとして追加される",
      "インスタンスメソッドとして追加される",
      "定数のみが取り込まれる",
      "継承関係が変わる",
    ],
    correctIndex: 1,
    explanation: "`include` はモジュールのメソッドをインスタンスメソッドとしてクラスに追加します。`extend` を使うとクラスメソッドとして追加されます。",
  },
  {
    id: 12,
    category: "例外処理",
    question: "Rubyで例外を処理する正しい構文はどれですか？",
    options: [
      "try { } catch { }",
      "begin; rescue => e; end",
      "attempt { } except { }",
      "handle { } error { }",
    ],
    correctIndex: 1,
    explanation: "Rubyでは `begin ~ rescue ~ ensure ~ end` で例外を処理します。`rescue ExceptionClass => e` で特定の例外を捕捉し、`ensure` は必ず実行されます。",
  },
  {
    id: 13,
    category: "Enumerable",
    question: "`reduce`（または `inject`）の役割として正しいのはどれですか？",
    options: [
      "配列から要素を削除する",
      "各要素を畳み込んで単一の値にまとめる",
      "配列をソートする",
      "条件に合う要素のみを返す",
    ],
    correctIndex: 1,
    explanation: "`reduce` は畳み込み演算を行い、配列の全要素を1つの値にまとめます。例: `[1,2,3].reduce(0) {|sum, n| sum + n}` は `6` を返します。",
  },
  {
    id: 14,
    category: "正規表現",
    question: "Rubyで `=~` 演算子の役割として正しいのはどれですか？",
    options: [
      "文字列を正規表現で置換する",
      "文字列と正規表現のパターンマッチを行い、マッチ位置を返す",
      "2つの文字列が等しいか比較する",
      "正規表現オブジェクトを生成する",
    ],
    correctIndex: 1,
    explanation: "`=~` は文字列と正規表現のマッチングを行い、マッチした位置（インデックス）を返します。マッチしない場合は `nil` を返します。",
  },
  {
    id: 15,
    category: "メタプログラミング",
    question: "`method_missing` の用途として正しいのはどれですか？",
    options: [
      "存在しないメソッドが呼ばれたときの処理を定義する",
      "メソッドを削除する",
      "プライベートメソッドを公開する",
      "メソッドのエイリアスを作成する",
    ],
    correctIndex: 0,
    explanation: "`method_missing` は未定義のメソッドが呼ばれたときに自動的に呼び出されるフックメソッドです。動的なメソッド定義やDSL実装に活用されます。",
  },
  {
    id: 16,
    category: "テスト",
    question: "RSpecの `expect` 構文として正しいのはどれですか？",
    options: [
      "assert_equal(expected, actual)",
      "expect(actual).to eq(expected)",
      "assertEquals(expected, actual)",
      "test(actual == expected)",
    ],
    correctIndex: 1,
    explanation: "RSpecでは `expect(actual).to eq(expected)` の形式でアサーションを書きます。`eq`、`be`、`include`、`raise_error` などのマッチャーが使えます。",
  },
  {
    id: 17,
    category: "Gem",
    question: "BundlerはRubyエコシステムでどのような役割を担いますか？",
    options: [
      "Rubyコードをコンパイルする",
      "Gemの依存関係を管理し一貫した環境を提供する",
      "Webサーバーを起動する",
      "テストを実行する",
    ],
    correctIndex: 1,
    explanation: "Bundlerは `Gemfile` に記述されたGemの依存関係を解決・管理します。`bundle install` で依存Gemをインストールし、`Gemfile.lock` で環境を固定します。",
  },
  {
    id: 18,
    category: "Rails",
    question: "Ruby on RailsのMVCアーキテクチャで「M（Model）」の役割はどれですか？",
    options: [
      "HTMLを生成してユーザーに表示する",
      "データとビジネスロジックを担当する",
      "HTTPリクエストを受け付けてルーティングする",
      "アセット（CSS・JS）を管理する",
    ],
    correctIndex: 1,
    explanation: "ModelはMVCの「M」で、データベースとのやり取り（Active Record）やビジネスロジックを担当します。ViewはUI表示、ControllerはリクエストとModelをつなぎます。",
  },
  {
    id: 19,
    category: "並行処理",
    question: "Ruby 3.0で導入されたRactorの特徴として正しいのはどれですか？",
    options: [
      "GILを使って複数スレッドを管理する",
      "アクターモデルに基づく並行実行でGILの制限を回避できる",
      "JavaのThreadクラスと同じ仕組みで動作する",
      "ブロック構文のみで使用できる",
    ],
    correctIndex: 1,
    explanation: "RactorはRuby 3.0で導入されたアクターモデルベースの並行処理機構です。Ractor間はオブジェクトを共有せず、メッセージパッシングで通信するためGILの制限を受けません。",
  },
  {
    id: 20,
    category: "エコシステム",
    question: "RuboCopはRubyエコシステムでどのような用途に使いますか？",
    options: [
      "Gemのパッケージングとリリース",
      "コードの静的解析とスタイルチェック",
      "Railsのデータベースマイグレーション",
      "テストカバレッジの計測",
    ],
    correctIndex: 1,
    explanation: "RuboCopはRubyの静的解析ツールで、コードスタイルガイド（Ruby Style Guide）への準拠チェックや潜在的なバグの検出を行います。自動修正機能（`--autocorrect`）も備えています。",
  },
];

export default function FinalExamPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < QUESTIONS.length) {
      const unanswered = QUESTIONS.filter((q) => answers[q.id] === undefined).length;
      if (!window.confirm(`まだ${unanswered}問未回答です。このまま提出しますか？`)) return;
    }
    let correct = 0;
    for (const q of QUESTIONS) {
      if (answers[q.id] === q.correctIndex) correct++;
    }
    const finalScore = Math.round((correct / QUESTIONS.length) * 100);
    setScore(finalScore);
    saveFinalExamScore(finalScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const passed = score >= 80;
  const answeredCount = Object.keys(answers).length;

  if (submitted) {
    const correctCount = QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;
    return (
      <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Result Card */}
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-red-500/40 bg-red-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-red-400" : "text-red-400"}`}>
              {score}点
            </div>
            <div className="text-2xl font-bold text-gray-100 mb-2">
              {passed ? "合格おめでとうございます！" : "もう少し頑張りましょう"}
            </div>
            <p className="text-gray-400 mb-1">
              {correctCount} / {QUESTIONS.length} 問正解
            </p>
            <p className="text-sm text-gray-500">
              {passed ? "80点以上で合格です。" : "合格には80点以上が必要です。"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              もう一度受ける
            </button>
            {passed && (
              <Link
                href="/certificate"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                修了証明書を見る
              </Link>
            )}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              ダッシュボードに戻る
            </Link>
          </div>

          {/* Review */}
          <h2 className="text-xl font-bold text-gray-100 mb-5">解答確認</h2>
          <div className="space-y-5">
            {QUESTIONS.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-5 ${isCorrect ? "border-red-500/30 bg-red-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-red-500 text-white" : "bg-gray-600 text-white"}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{q.category}</p>
                      <p className="text-gray-200 text-sm font-medium whitespace-pre-line">{q.question}</p>
                    </div>
                  </div>
                  <div className="ml-9 space-y-1.5 mb-3">
                    {q.options.map((opt, i) => {
                      const isUserChoice = userAnswer === i;
                      const isCorrectChoice = q.correctIndex === i;
                      let optClass = "text-gray-500";
                      if (isCorrectChoice) optClass = "text-red-400 font-medium";
                      else if (isUserChoice && !isCorrect) optClass = "text-red-400 line-through";
                      return (
                        <p key={i} className={`text-sm ${optClass}`}>
                          {isCorrectChoice ? "-> " : isUserChoice ? "x " : "  "}{opt}
                        </p>
                      );
                    })}
                  </div>
                  <div className="ml-9 text-xs text-gray-400 bg-gray-900 rounded-lg p-3 border border-gray-800">
                    <span className="font-medium text-gray-300">解説: </span>{q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-3xl">💎</span>
            <h1 className="text-3xl font-bold text-gray-100">Ruby言語 最終試験</h1>
          </div>
          <p className="text-gray-400">
            全{QUESTIONS.length}問の選択問題です。80点以上で合格となります。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-400 flex-shrink-0">
              {answeredCount} / {QUESTIONS.length} 回答済み
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {QUESTIONS.map((q, idx) => {
            const userAnswer = answers[q.id];
            return (
              <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">{q.category}</span>
                    <p className="text-gray-200 font-medium whitespace-pre-line">{q.question}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-10">
                  {q.options.map((opt, i) => {
                    const isSelected = userAnswer === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(q.id, i)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                          isSelected
                            ? "border-red-500 bg-red-500/10 text-red-300"
                            : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
                        }`}
                      >
                        <span className="font-medium mr-2 text-gray-500">
                          {["A", "B", "C", "D"][i]}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-center pb-10">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            試験を提出する
          </button>
        </div>
      </div>
    </div>
  );
}
