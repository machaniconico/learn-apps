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
    category: "C#基礎",
    question: "C#で整数型の変数を宣言する正しい方法はどれですか？",
    options: ["x = 10", "int x = 10;", "var x: int = 10;", "let x = 10;"],
    correctIndex: 1,
    explanation: "C#では型名を先に書いて `int x = 10;` のように宣言します。`var x = 10;` も型推論で可能ですが、明示的に型名を指定する場合は `int` を使います。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "次のコードの出力結果はどれですか？\n\nfor (int i = 0; i < 3; i++)\n    Console.Write(i + \" \");",
    options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2 3 4"],
    correctIndex: 1,
    explanation: "forループは i = 0 から始まり、i < 3 の条件で繰り返します。i は 0, 1, 2 の値を取るため、出力は `0 1 2` です。",
  },
  {
    id: 3,
    category: "メソッド",
    question: "ref パラメータと out パラメータの違いとして正しいのはどれですか？",
    options: [
      "refは値型のみ、outは参照型のみ使える",
      "refは呼び出し前に初期化が必要、outは不要",
      "refは戻り値の代わり、outは引数の代わり",
      "refとoutに違いはない",
    ],
    correctIndex: 1,
    explanation: "refパラメータは呼び出し前に変数を初期化する必要がありますが、outパラメータは初期化不要で、メソッド内で必ず値を設定する必要があります。",
  },
  {
    id: 4,
    category: "配列・リスト",
    question: "`List<int> nums = new() { 1, 2, 3 };` に対して要素4を追加する正しい方法はどれですか？",
    options: ["nums[3] = 4;", "nums.Add(4);", "nums.Push(4);", "nums.Append(4);"],
    correctIndex: 1,
    explanation: "`List<T>.Add()` メソッドでリストの末尾に要素を追加します。配列のようにインデックスで直接追加はできず、Push は存在しません。Append は LINQ の拡張メソッドで新しいシーケンスを返します。",
  },
  {
    id: 5,
    category: "コレクション",
    question: "`Dictionary<string, int>` で存在しないキーを安全に取得する方法はどれですか？",
    options: ["dict[\"key\"]", "dict.TryGetValue(\"key\", out var val)", "dict.Find(\"key\")", "dict.Get(\"key\")"],
    correctIndex: 1,
    explanation: "`TryGetValue` はキーが存在する場合はtrueを返して値をoutパラメータに設定し、存在しない場合はfalseを返します。`dict[\"key\"]` はキーが存在しないとKeyNotFoundExceptionを投げます。",
  },
  {
    id: 6,
    category: "文字列",
    question: "文字列補間を使って変数 `name = \"太郎\"` と `age = 25` を埋め込む正しい書き方はどれですか？",
    options: [
      "$\"{name}さんは{age}歳\"",
      "\"{name}さんは{age}歳\"",
      "string.Format(\"{name}さんは{age}歳\")",
      "f\"{name}さんは{age}歳\"",
    ],
    correctIndex: 0,
    explanation: "C#の文字列補間は `$` プレフィックスを使い `$\"{変数名}\"` の形式で書きます。Pythonのf文字列に似ていますが、C#では `$` を使います。",
  },
  {
    id: 7,
    category: "クラス",
    question: "C#のautoプロパティの正しい定義はどれですか？",
    options: [
      "public string Name;",
      "public string Name { get; set; }",
      "public property Name: string;",
      "string Name => get; set;",
    ],
    correctIndex: 1,
    explanation: "autoプロパティは `{ get; set; }` アクセサを使って簡潔に定義できます。コンパイラが自動的にバッキングフィールドを生成します。",
  },
  {
    id: 8,
    category: "継承",
    question: "基底クラスのメソッドをオーバーライドするために必要なキーワードの組み合わせはどれですか？",
    options: [
      "基底クラス: abstract, 派生クラス: override",
      "基底クラス: virtual, 派生クラス: override",
      "基底クラス: override, 派生クラス: virtual",
      "1と2の両方が正しい",
    ],
    correctIndex: 3,
    explanation: "`virtual` メソッドは任意でオーバーライド可能、`abstract` メソッドは派生クラスでのオーバーライドが必須です。どちらも派生クラスでは `override` キーワードを使います。",
  },
  {
    id: 9,
    category: "インターフェース",
    question: "インターフェースについて正しい説明はどれですか？",
    options: [
      "インターフェースはインスタンス化できる",
      "クラスは1つのインターフェースしか実装できない",
      "インターフェースは複数実装でき、デフォルト実装も持てる",
      "インターフェースにはフィールドを定義できる",
    ],
    correctIndex: 2,
    explanation: "C#ではクラスは複数のインターフェースを実装でき、C# 8以降ではデフォルト実装も持てます。インターフェースはインスタンス化できず、フィールドも持てません。",
  },
  {
    id: 10,
    category: "ジェネリクス",
    question: "ジェネリック型制約 `where T : IComparable<T>` の意味はどれですか？",
    options: [
      "TはIComparable<T>を継承したクラスでなければならない",
      "TはIComparable<T>インターフェースを実装している型でなければならない",
      "TはIComparable<T>型の値のみ受け取れる",
      "TはIComparable<T>と同じ型でなければならない",
    ],
    correctIndex: 1,
    explanation: "`where T : IComparable<T>` は型パラメータTが `IComparable<T>` を実装していることを要求します。これにより、メソッド内でCompareToメソッドなどを安全に呼び出せます。",
  },
  {
    id: 11,
    category: "LINQ",
    question: "次のLINQクエリと同じ結果を返すメソッド構文はどれですか？\n\n`numbers.Where(n => n > 5).Select(n => n * 2)`",
    options: [
      "5より大きい数を2倍にしたシーケンス",
      "すべての数を2倍にしてから5より大きい数をフィルタ",
      "5より大きい数の個数",
      "最初の5個の要素を2倍にしたシーケンス",
    ],
    correctIndex: 0,
    explanation: "`Where` で条件に合う要素をフィルタし、`Select` で各要素を変換します。まず5より大きい要素を選び、それぞれを2倍にしたシーケンスを返します。",
  },
  {
    id: 12,
    category: "非同期",
    question: "async/awaitについて正しい説明はどれですか？",
    options: [
      "awaitは新しいスレッドを作成する",
      "asyncメソッドはTask, Task<T>, またはValueTask<T>を返す必要がある",
      "awaitは同期的にメソッドの完了を待つ",
      "async voidは推奨される使い方である",
    ],
    correctIndex: 1,
    explanation: "asyncメソッドは `Task`, `Task<T>`, `ValueTask<T>` を返す必要があります。awaitは非同期的に完了を待ち、スレッドをブロックしません。`async void` はイベントハンドラ以外では非推奨です。",
  },
  {
    id: 13,
    category: "デリゲート",
    question: "`Func<int, int, string>` の意味として正しいのはどれですか？",
    options: [
      "引数なしでstringを返す関数",
      "int引数1つでint型を返す関数",
      "int引数2つでstring型を返す関数",
      "string引数2つでintを返す関数",
    ],
    correctIndex: 2,
    explanation: "`Func<T1, T2, TResult>` は最後の型パラメータが戻り値の型です。`Func<int, int, string>` はint引数2つを受け取り、stringを返す関数を表します。",
  },
  {
    id: 14,
    category: "例外処理",
    question: "リソースの確実な解放に使うべき構文はどれですか？",
    options: [
      "try-catch",
      "try-finally",
      "using文",
      "2と3の両方が使える",
    ],
    correctIndex: 3,
    explanation: "`try-finally` でfinallyブロック内でリソースを解放するか、`using` 文で `IDisposable` を実装したオブジェクトを自動的にDisposeできます。using文の方が簡潔です。",
  },
  {
    id: 15,
    category: "パターンマッチング",
    question: "次のswitch式の正しい構文はどれですか？",
    options: [
      "var result = obj switch { int i => i * 2, string s => s.Length, _ => 0 };",
      "var result = switch(obj) { int i => i * 2, string s => s.Length };",
      "var result = obj.switch { int i: i * 2, string s: s.Length };",
      "var result = match obj { int i => i * 2, string s => s.Length };",
    ],
    correctIndex: 0,
    explanation: "C#のswitch式は `値 switch { パターン => 結果, ... }` の形式で書きます。`_` はデフォルトケース（ワイルドカードパターン）です。",
  },
  {
    id: 16,
    category: "ASP.NET Core",
    question: "ASP.NET Coreの依存性注入（DI）でサービスをシングルトンとして登録する正しい方法はどれですか？",
    options: [
      "builder.Services.AddTransient<IService, MyService>();",
      "builder.Services.AddScoped<IService, MyService>();",
      "builder.Services.AddSingleton<IService, MyService>();",
      "builder.Services.Add<IService, MyService>(ServiceLifetime.Single);",
    ],
    correctIndex: 2,
    explanation: "`AddSingleton` はアプリケーション全体で1つのインスタンスを共有します。`AddScoped` はHTTPリクエスト毎、`AddTransient` は注入毎に新しいインスタンスを作成します。",
  },
  {
    id: 17,
    category: "Entity Framework",
    question: "Entity Framework Coreで全ユーザーを取得する正しいコードはどれですか？",
    options: [
      "db.Users.GetAll()",
      "db.Users.ToList()",
      "db.Query<User>(\"SELECT * FROM Users\")",
      "User.objects.all()",
    ],
    correctIndex: 1,
    explanation: "EF CoreではDbContextのDbSet<T>プロパティを使い、`ToList()` や `ToListAsync()` でデータベースからエンティティを取得します。LINQメソッドチェーンでクエリを構築できます。",
  },
  {
    id: 18,
    category: "xUnit",
    question: "xUnitでパラメータ化テストを実行する正しい方法はどれですか？",
    options: [
      "[Fact]\npublic void Test(int x) { ... }",
      "[Theory]\n[InlineData(1)]\n[InlineData(2)]\npublic void Test(int x) { ... }",
      "[Test(1, 2)]\npublic void Test(int x) { ... }",
      "[Parameterized]\npublic void Test(int x) { ... }",
    ],
    correctIndex: 1,
    explanation: "xUnitでは `[Theory]` 属性と `[InlineData]` 属性を組み合わせてパラメータ化テストを行います。`[Fact]` はパラメータなしのテストに使用します。",
  },
  {
    id: 19,
    category: "デザインパターン",
    question: "Singletonパターンの目的として正しいのはどれですか？",
    options: [
      "オブジェクトの生成を別のクラスに委譲する",
      "クラスのインスタンスが1つだけであることを保証する",
      "オブジェクトの状態変化を監視者に通知する",
      "アルゴリズムを切り替え可能にする",
    ],
    correctIndex: 1,
    explanation: "Singletonパターンはクラスのインスタンスが1つだけ存在することを保証し、グローバルなアクセスポイントを提供します。Factoryは生成の委譲、Observerは通知、Strategyはアルゴリズム切り替えです。",
  },
  {
    id: 20,
    category: ".NETエコシステム",
    question: ".NET のパッケージマネージャーとして正しいのはどれですか？",
    options: ["npm", "pip", "NuGet", "Maven"],
    correctIndex: 2,
    explanation: "NuGetは.NETのパッケージマネージャーで、`dotnet add package` コマンドやVisual Studioから利用できます。npmはNode.js、pipはPython、MavenはJava用です。",
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-purple-500/40 bg-purple-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-purple-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-purple-500/30 bg-purple-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-purple-500 text-gray-950" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-purple-400 font-medium";
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
            全{QUESTIONS.length}問の選択問題です。80点以上で合格となります。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-purple-500 bg-purple-500/10 text-purple-300"
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
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-gray-950 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
