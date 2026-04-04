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
    category: "基礎",
    question: "Kotlinで読み取り専用の変数を宣言するキーワードはどれですか？",
    options: ["var", "val", "let", "const"],
    correctIndex: 1,
    explanation: "`val` はイミュータブルな変数を宣言します。`var` は再代入可能な変数です。`let` はスコープ関数、`const` はコンパイル時定数に使います。",
  },
  {
    id: 2,
    category: "基礎",
    question: "Kotlinで関数を定義するキーワードはどれですか？",
    options: ["func", "def", "fun", "function"],
    correctIndex: 2,
    explanation: "Kotlinでは `fun` キーワードを使って関数を定義します。`func` はSwift、`def` はPython/Ruby、`function` はJavaScriptで使われます。",
  },
  {
    id: 3,
    category: "基礎",
    question: "次のコードの出力はどれですか？\n\nval x = 5\nprintln(if (x > 3) \"big\" else \"small\")",
    options: ["big", "small", "5", "コンパイルエラー"],
    correctIndex: 0,
    explanation: "Kotlinの `if` は式として使えます。`x = 5` は 3 より大きいため `\"big\"` が出力されます。",
  },
  {
    id: 4,
    category: "型・Null安全",
    question: "Kotlinでnullを許容する `String` 型の正しい宣言はどれですか？",
    options: ["String?", "Nullable<String>", "Optional<String>", "String!"],
    correctIndex: 0,
    explanation: "Kotlinではnullableな型は `?` を型名の後に付けて `String?` と宣言します。`Optional` はJava/Swift、`!` は非nullアサーションです。",
  },
  {
    id: 5,
    category: "型・Null安全",
    question: "エルビス演算子 `?:` の説明として正しいのはどれですか？",
    options: [
      "nullでないことをアサートする",
      "左辺がnullなら右辺の値を返す",
      "セーフコールを行う",
      "型キャストを行う",
    ],
    correctIndex: 1,
    explanation: "`?:` はエルビス演算子で、左辺がnullの場合に右辺の値を返します。`val x = nullable ?: \"default\"` のように使います。",
  },
  {
    id: 6,
    category: "型・Null安全",
    question: "セーフコール演算子 `?.` について正しい説明はどれですか？",
    options: [
      "nullの場合に例外をスローする",
      "左辺がnullなら処理をスキップしnullを返す",
      "左辺がnullなら右辺を実行する",
      "型を強制的にnon-nullにする",
    ],
    correctIndex: 1,
    explanation: "`?.` はセーフコール演算子で、レシーバがnullの場合はメソッド呼び出しをスキップしてnullを返します。NullPointerExceptionを防げます。",
  },
  {
    id: 7,
    category: "クラス・OOP",
    question: "`data class` が自動生成するメソッドに含まれないのはどれですか？",
    options: ["equals()", "hashCode()", "toString()", "close()"],
    correctIndex: 3,
    explanation: "`data class` は `equals()`、`hashCode()`、`toString()`、`copy()`、`componentN()` を自動生成します。`close()` はAutoCloseableのメソッドで自動生成されません。",
  },
  {
    id: 8,
    category: "クラス・OOP",
    question: "`sealed class` の特徴として正しいのはどれですか？",
    options: [
      "インスタンスを直接生成できる",
      "継承が同一モジュール内に限定される",
      "全メンバがfinalになる",
      "interfaceとして使える",
    ],
    correctIndex: 1,
    explanation: "`sealed class` は継承を同一モジュール（または同一ファイル）に限定します。`when` 式と組み合わせると全サブクラスの網羅チェックができます。",
  },
  {
    id: 9,
    category: "クラス・OOP",
    question: "Kotlinで継承可能なクラスを作るために必要なキーワードはどれですか？",
    options: ["public", "open", "override", "abstract"],
    correctIndex: 1,
    explanation: "Kotlinではクラスはデフォルトで `final` です。継承を許可するには `open` キーワードが必要です。`override` はメソッドのオーバーライドに使います。",
  },
  {
    id: 10,
    category: "クラス・OOP",
    question: "`companion object` の説明として正しいのはどれですか？",
    options: [
      "クラスの外部に定義するオブジェクト",
      "クラスに関連付けられたシングルトンでJavaのstaticに相当する",
      "インターフェースを実装するオブジェクト",
      "データクラス専用の設定オブジェクト",
    ],
    correctIndex: 1,
    explanation: "`companion object` はクラスに関連付けられたシングルトンで、Javaの `static` メンバに相当します。クラス名を通じてアクセスできます。",
  },
  {
    id: 11,
    category: "クラス・OOP",
    question: "拡張関数（extension function）の説明として正しいのはどれですか？",
    options: [
      "クラスを継承して新しい関数を追加する",
      "クラスを継承せずに既存クラスに関数を追加できる",
      "インターフェースに実装を追加する",
      "抽象クラスのメソッドを実装する",
    ],
    correctIndex: 1,
    explanation: "拡張関数はクラスを継承・変更せずに新しい関数を追加できます。`fun String.shout() = this.uppercase()` のように定義し、`\"hello\".shout()` と呼び出せます。",
  },
  {
    id: 12,
    category: "コルーチン",
    question: "`suspend` 関数について正しい説明はどれですか？",
    options: [
      "スレッドをブロックする関数",
      "コルーチン内でのみ呼び出せる中断可能な関数",
      "非同期で戻り値を返す関数",
      "キャンセル不可能な関数",
    ],
    correctIndex: 1,
    explanation: "`suspend` 関数はコルーチンコンテキスト内でのみ呼び出せます。実行を中断できますがスレッドはブロックしません。これがKotlinの非同期処理の中核です。",
  },
  {
    id: 13,
    category: "コルーチン",
    question: "`launch` と `async` の違いとして正しいのはどれですか？",
    options: [
      "launchは値を返し、asyncは返さない",
      "launchはJob、asyncはDeferred<T>を返す",
      "launchはメインスレッド専用、asyncはIOスレッド専用",
      "違いはなく、どちらも同じ",
    ],
    correctIndex: 1,
    explanation: "`launch` は `Job` を返しFire-and-forget処理に使います。`async` は `Deferred<T>` を返し、`await()` で結果を取得できます。結果が必要な場合は `async` を使います。",
  },
  {
    id: 14,
    category: "コルーチン",
    question: "`Dispatchers.IO` はどのような処理に適していますか？",
    options: [
      "UIの更新処理",
      "CPU集約的な計算処理",
      "ファイルアクセスやネットワーク通信などのI/O処理",
      "コルーチンのキャンセル処理",
    ],
    correctIndex: 2,
    explanation: "`Dispatchers.IO` はファイル読み書きやネットワーク通信などのI/Oバウンドな処理に最適化されたスレッドプールを使用します。UIは `Dispatchers.Main`、計算は `Dispatchers.Default` を使います。",
  },
  {
    id: 15,
    category: "コルーチン",
    question: "`Flow` はどのような特徴を持ちますか？",
    options: [
      "一度だけ値を返す hot ストリーム",
      "複数の値を逐次的にemitできる cold ストリーム",
      "UIスレッドでのみ動作するストリーム",
      "同期処理専用のストリーム",
    ],
    correctIndex: 1,
    explanation: "`Flow` は非同期で複数の値を流せる cold ストリームです。collectされた時に初めて実行が開始されます。`StateFlow` や `SharedFlow` は hot ストリームです。",
  },
  {
    id: 16,
    category: "コレクション",
    question: "`listOf()` と `mutableListOf()` の違いはどれですか？",
    options: [
      "listOf()の方が高速",
      "listOf()は読み取り専用、mutableListOf()は変更可能",
      "mutableListOf()はスレッドセーフ",
      "違いはない",
    ],
    correctIndex: 1,
    explanation: "`listOf()` は読み取り専用（イミュータブル）なリストを返します。`mutableListOf()` は追加・削除・変更が可能なリストを返します。",
  },
  {
    id: 17,
    category: "コレクション",
    question: "`filter` 関数の動作として正しいのはどれですか？",
    options: [
      "各要素を変換して新しいリストを返す",
      "条件を満たす要素だけを抽出して新しいリストを返す",
      "要素を一つの値に畳み込む",
      "要素を順に処理して副作用を実行する",
    ],
    correctIndex: 1,
    explanation: "`filter` はラムダの条件が `true` になる要素のみを含む新しいリストを返します。`map` は変換、`reduce` は畳み込み、`forEach` は副作用実行です。",
  },
  {
    id: 18,
    category: "コレクション",
    question: "`sequence` を使う利点はどれですか？",
    options: [
      "並列処理が自動で行われる",
      "大きなコレクションでも中間コレクションを作らず遅延評価できる",
      "型安全性が向上する",
      "ミュータブル操作が可能になる",
    ],
    correctIndex: 1,
    explanation: "`sequence` は遅延評価を行い、中間コレクションを生成しません。大量データの `filter` や `map` のチェーン処理でメモリと処理効率が改善されます。",
  },
  {
    id: 19,
    category: "Android・Compose",
    question: "`ViewModel` の主な役割はどれですか？",
    options: [
      "レイアウトXMLのインフレート",
      "UIデータを保持しライフサイクルを意識して管理する",
      "データベースの直接操作",
      "ネットワーク通信の実行",
    ],
    correctIndex: 1,
    explanation: "`ViewModel` はUIに必要なデータを保持します。画面回転などの設定変更でも状態が維持されます。データ取得は通常Repositoryに委譲します。",
  },
  {
    id: 20,
    category: "Android・Compose",
    question: "`StateFlow` と `LiveData` の違いとして正しいのはどれですか？",
    options: [
      "StateFlowはAndroid専用、LiveDataはKotlin全般で使える",
      "StateFlowはKotlinのFlowベースでAndroid非依存、LiveDataはAndroid専用",
      "LiveDataの方が新しい",
      "違いはない",
    ],
    correctIndex: 1,
    explanation: "`StateFlow` はKotlin Coroutinesの一部でAndroid非依存、`LiveData` はAndroid Architectureコンポーネント専用です。近年はKMPやCompose対応のため `StateFlow` が推奨されます。",
  },
  {
    id: 21,
    category: "クラス・OOP",
    question: "`lazy` 委譲プロパティの説明として正しいのはどれですか？",
    options: [
      "プロパティが変更されるたびに処理を実行する",
      "プロパティへの最初のアクセス時に初期化される",
      "プロパティを非nullに強制する",
      "プロパティをミュータブルにする",
    ],
    correctIndex: 1,
    explanation: "`by lazy { }` は最初にアクセスされた時点でラムダを実行して初期化します。以降は同じ値をキャッシュして返します。`val` プロパティにのみ使えます。",
  },
  {
    id: 22,
    category: "ツール",
    question: "Kotlinのビルドファイルで使われる `build.gradle.kts` の特徴はどれですか？",
    options: [
      "Groovy DSLで記述する",
      "Kotlin DSLで記述でき型安全な設定が可能",
      "JSONで記述する",
      "XMLで記述する",
    ],
    correctIndex: 1,
    explanation: "`.kts` 拡張子はKotlin Scriptを示します。`build.gradle.kts` はKotlin DSLで型安全にGradleビルドを設定できます。IDEの補完も利用できます。",
  },
  {
    id: 23,
    category: "ツール",
    question: "Ktorの説明として正しいのはどれですか？",
    options: [
      "Kotlin専用のデータベースフレームワーク",
      "KotlinでHTTPサーバーとクライアントを構築する非同期フレームワーク",
      "AndroidのUIフレームワーク",
      "Kotlinのテストフレームワーク",
    ],
    correctIndex: 1,
    explanation: "Ktorはコルーチンベースの非同期HTTPフレームワークです。サーバーサイドAPIとHTTPクライアントの両方を構築できます。KMPにも対応しています。",
  },
  {
    id: 24,
    category: "基礎",
    question: "`when` 式の説明として正しいのはどれですか？",
    options: [
      "ループ処理を行うキーワード",
      "Javaの `switch` に相当し、値を返す式としても使える多分岐構文",
      "try-catchと同等のエラー処理構文",
      "null安全のための構文",
    ],
    correctIndex: 1,
    explanation: "`when` はJavaの `switch` より強力で、式として値を返せます。`sealed class` との組み合わせで全分岐の網羅チェックがコンパイル時に行われます。",
  },
  {
    id: 25,
    category: "コルーチン",
    question: "`withContext` の用途として正しいのはどれですか？",
    options: [
      "新しいコルーチンを起動する",
      "コルーチンの実行ディスパッチャーを一時的に切り替える",
      "コルーチンをキャンセルする",
      "コルーチンのスコープを作成する",
    ],
    correctIndex: 1,
    explanation: "`withContext(Dispatchers.IO)` のように使い、ブロック内だけ別のスレッドで実行できます。新しいコルーチンは起動せず現在のコルーチンのコンテキストを切り替えます。",
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
    const finalScore = correct * 4;
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-violet-500/40 bg-violet-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-violet-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-violet-500/30 bg-violet-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-violet-500 text-white" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-violet-400 font-medium";
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
            <h1 className="text-3xl font-bold text-gray-100">最終試験</h1>
          </div>
          <p className="text-gray-400">
            全{QUESTIONS.length}問の選択問題です。1問4点、80点以上で合格となります。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-violet-500 bg-violet-500/10 text-violet-300"
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
            className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
