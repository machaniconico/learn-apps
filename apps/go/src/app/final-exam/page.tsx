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
    category: "Go基礎",
    question: "Goで変数を短縮宣言するのに使う記号はどれですか？",
    options: ["var x = 10", "x := 10", "let x = 10", "x = 10"],
    correctIndex: 1,
    explanation: "Goでは `:=` を使って変数の型推論付き短縮宣言ができます。`var` による宣言も可能ですが、関数内では `:=` がより一般的に使われます。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "Goのループ構文について正しい説明はどれですか？",
    options: [
      "for, while, do-while の3種類がある",
      "for と while の2種類がある",
      "for のみで、while や do-while はない",
      "foreach のみがある",
    ],
    correctIndex: 2,
    explanation: "Goにはループ構文として `for` のみがあります。`for` を使って通常のループ、while風ループ（`for condition { }`）、無限ループ（`for { }`）をすべて表現できます。",
  },
  {
    id: 3,
    category: "関数",
    question: "Goの関数で複数の値を返す正しい方法はどれですか？",
    options: [
      "配列で返す: return [a, b]",
      "タプルで返す: return (a, b)",
      "カンマ区切りで返す: return a, b",
      "構造体でしか返せない",
    ],
    correctIndex: 2,
    explanation: "Goでは `return a, b` のようにカンマ区切りで複数の値を返せます。関数の戻り値の型は `(int, error)` のように括弧で囲んで宣言します。エラー処理で `値, error` を返すパターンが非常に多く使われます。",
  },
  {
    id: 4,
    category: "構造体",
    question: "Goで構造体にメソッドを定義するときのレシーバの正しい書き方はどれですか？",
    options: [
      "func Method(s *Struct) { }",
      "func (s *Struct) Method() { }",
      "func Struct.Method() { }",
      "Struct.prototype.Method = func() { }",
    ],
    correctIndex: 1,
    explanation: "Goではメソッドを `func (s *Struct) Method()` の形式で定義します。関数名の前にレシーバを `(変数名 型)` の形で記述します。ポインタレシーバ `*Struct` を使うと構造体の値を変更できます。",
  },
  {
    id: 5,
    category: "インターフェース",
    question: "Goのインターフェース実装について正しい説明はどれですか？",
    options: [
      "implements キーワードで明示的に実装する",
      "extends キーワードで継承する",
      "暗黙的に実装される（implements キーワード不要）",
      "@Interface アノテーションを付ける",
    ],
    correctIndex: 2,
    explanation: "Goのインターフェース実装は暗黙的です。型がインターフェースのすべてのメソッドを実装していれば、特別なキーワードなしに自動的にそのインターフェースを満たします。これをダックタイピングと呼びます。",
  },
  {
    id: 6,
    category: "ポインタ",
    question: "Goの `&` 演算子の意味として正しいのはどれですか？",
    options: [
      "値を複製する",
      "変数のアドレス（ポインタ）を取得する",
      "ポインタの値を取り出す（デリファレンス）",
      "ビット演算のAND",
    ],
    correctIndex: 1,
    explanation: "`&` 演算子は変数のメモリアドレス（ポインタ）を取得します。例えば `p := &x` で変数 x のポインタを取得できます。逆にポインタから値を取り出すには `*p`（デリファレンス）を使います。",
  },
  {
    id: 7,
    category: "スライス",
    question: "`append` 関数の戻り値について正しい説明はどれですか？",
    options: [
      "常に元のスライスを直接変更する",
      "エラーを返す",
      "新しいスライスを返す（元のスライスを変更しない可能性がある）",
      "追加した要素数を返す",
    ],
    correctIndex: 2,
    explanation: "`append` は新しいスライスを返します。内部配列の容量が足りない場合、新しい配列が確保されるため、元のスライスとは異なるものになります。必ず `s = append(s, elem)` のように戻り値を受け取る必要があります。",
  },
  {
    id: 8,
    category: "マップ",
    question: "Goでマップにキーが存在するかチェックする慣用的な書き方はどれですか？",
    options: [
      "if m.contains(key) { }",
      "if m.has(key) { }",
      "val, ok := m[key]",
      "if key in m { }",
    ],
    correctIndex: 2,
    explanation: "Goではマップの存在チェックに `val, ok := m[key]` のパターンを使います。`ok` が `true` ならキーが存在し、`false` なら存在しません。この「comma ok」イディオムはGoで非常に一般的です。",
  },
  {
    id: 9,
    category: "エラー処理",
    question: "Goのエラー処理の基本パターンとして正しいのはどれですか？",
    options: [
      "try-catch ブロックを使う",
      "if err != nil { return err }",
      "throws キーワードで宣言する",
      "Result<T, E> 型を使う",
    ],
    correctIndex: 1,
    explanation: "Goではエラーを値として扱い、`if err != nil` で明示的にチェックします。try-catch のような例外機構はなく、関数は通常 `(結果, error)` の複数戻り値でエラーを返します。",
  },
  {
    id: 10,
    category: "ゴルーチン",
    question: "ゴルーチンを起動するキーワードはどれですか？",
    options: ["async", "thread", "go", "spawn"],
    correctIndex: 2,
    explanation: "`go` キーワードを関数呼び出しの前に付けることでゴルーチンを起動します。例: `go myFunc()`。ゴルーチンはOSスレッドよりも軽量で、数千から数万のゴルーチンを同時に実行できます。",
  },
  {
    id: 11,
    category: "チャネル",
    question: "バッファなしチャネルの特徴として正しいのはどれですか？",
    options: [
      "データを蓄積できる",
      "送信と受信が同期する（送信側は受信されるまでブロック）",
      "一方向のみ通信できる",
      "自動的にクローズされる",
    ],
    correctIndex: 1,
    explanation: "バッファなしチャネルでは、送信側は受信側が値を受け取るまでブロックし、受信側は送信側が値を送るまでブロックします。これにより、ゴルーチン間の同期が実現できます。",
  },
  {
    id: 12,
    category: "パッケージ",
    question: "Goで識別子（変数、関数、型など）をパッケージ外にエクスポートするための命名規則はどれですか？",
    options: [
      "export キーワードを付ける",
      "public キーワードを付ける",
      "先頭を大文字で始める",
      "アンダースコアで始める",
    ],
    correctIndex: 2,
    explanation: "Goでは識別子の先頭を大文字にすることでエクスポート（公開）されます。小文字で始まる識別子はパッケージ内でのみアクセス可能です。アクセス修飾子のキーワードは存在しません。",
  },
  {
    id: 13,
    category: "テスト",
    question: "Goのテストファイルの命名規則として正しいのはどれですか？",
    options: [
      "test_*.go",
      "*_test.go",
      "*.test.go",
      "*_spec.go",
    ],
    correctIndex: 1,
    explanation: "Goのテストファイルは `_test.go` で終わる名前にします。例: `main_test.go`。テスト関数は `func TestXxx(t *testing.T)` の形式で宣言し、`go test` コマンドで実行します。",
  },
  {
    id: 14,
    category: "HTTP",
    question: "`http.HandleFunc` の引数として正しい組み合わせはどれですか？",
    options: [
      "HTTPメソッドとハンドラ関数",
      "URLパターンとハンドラ関数",
      "ポート番号とハンドラ関数",
      "リクエストとレスポンス",
    ],
    correctIndex: 1,
    explanation: "`http.HandleFunc` は第1引数にURLパターン（例: \"/api/users\"）、第2引数にハンドラ関数 `func(w http.ResponseWriter, r *http.Request)` を受け取ります。",
  },
  {
    id: 15,
    category: "JSON",
    question: "Goで構造体フィールドのJSONキー名を変える方法はどれですか？",
    options: [
      "@JsonProperty(\"name\") アノテーション",
      "json.SetKey(\"name\") メソッド",
      "構造体タグ `json:\"name\"`",
      "JSONSerializer を設定する",
    ],
    correctIndex: 2,
    explanation: "Goでは構造体タグ `json:\"name\"` を使ってJSONのキー名を指定します。例: `Name string \\`json:\"name\"\\``。`omitempty` オプションでゼロ値の場合に省略、`-` で除外できます。",
  },
  {
    id: 16,
    category: "ジェネリクス",
    question: "Go 1.18以降のジェネリクスで型パラメータを定義する正しい構文はどれですか？",
    options: [
      "<T extends any>",
      "func name<T>(x T) T",
      "[T constraint]",
      "(T: type)",
    ],
    correctIndex: 2,
    explanation: "Goのジェネリクスでは角括弧 `[]` を使って型パラメータを定義します。例: `func Max[T constraints.Ordered](a, b T) T`。制約（constraint）にはインターフェースを指定します。",
  },
  {
    id: 17,
    category: "コンテキスト",
    question: "`context.WithTimeout` の用途として正しいのはどれですか？",
    options: [
      "ゴルーチンの実行を遅延させる",
      "タイムアウト付きのコンテキストを作成する",
      "チャネルにタイムアウトを設定する",
      "HTTPリクエストの再試行間隔を設定する",
    ],
    correctIndex: 1,
    explanation: "`context.WithTimeout` は指定した期間後に自動的にキャンセルされるコンテキストを作成します。APIコール、データベースクエリなど、タイムアウトが必要な処理で広く使われます。",
  },
  {
    id: 18,
    category: "並行パターン",
    question: "`sync.WaitGroup` の3つの主要メソッドの正しい組み合わせはどれですか？",
    options: [
      "Start, Stop, Wait",
      "Add, Done, Wait",
      "Begin, End, Join",
      "Lock, Unlock, Wait",
    ],
    correctIndex: 1,
    explanation: "`sync.WaitGroup` は `Add(n)` でカウンタを増やし、`Done()` でカウンタを1減らし、`Wait()` でカウンタが0になるまでブロックします。複数のゴルーチンの完了を待つのに使います。",
  },
  {
    id: 19,
    category: "設計パターン",
    question: "`sync.Once` の用途として正しいのはどれですか？",
    options: [
      "ミューテックスのロックを取得する",
      "チャネルを一度だけ作成する",
      "指定した関数を一度だけ実行する（初期化処理などに使用）",
      "ゴルーチンを一度だけ起動する",
    ],
    correctIndex: 2,
    explanation: "`sync.Once` は `Do(func())` メソッドに渡された関数を、複数のゴルーチンから呼ばれても一度だけ実行します。シングルトンパターンの実装や、一度きりの初期化処理に使われます。",
  },
  {
    id: 20,
    category: "Goエコシステム",
    question: "`go vet` の用途として正しいのはどれですか？",
    options: [
      "依存パッケージを管理する",
      "コードをフォーマットする",
      "コードの静的解析を行い、疑わしい構文を報告する",
      "ベンチマークテストを実行する",
    ],
    correctIndex: 2,
    explanation: "`go vet` はGoのコードに対して静的解析を行い、コンパイルは通るが疑わしい構文（Printf の引数不一致、到達不能コード、ロックのコピーなど）を検出・報告します。`go fmt` はフォーマット、`go mod` は依存管理です。",
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-cyan-500/40 bg-cyan-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-cyan-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-cyan-500/30 bg-cyan-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-cyan-500 text-gray-950" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-cyan-400 font-medium";
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
            <span className="text-3xl">🐹</span>
            <h1 className="text-3xl font-bold text-gray-100">Go言語 最終試験</h1>
          </div>
          <p className="text-gray-400">
            全{QUESTIONS.length}問の選択問題です。80点以上で合格となります。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
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
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
