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
    category: "Java基礎",
    question: "Javaで標準出力に文字列を表示する正しい方法はどれですか？",
    options: ["print(\"Hello\");", "System.out.println(\"Hello\");", "std::cout << \"Hello\";", "Console.log(\"Hello\");"],
    correctIndex: 1,
    explanation: "Javaでは `System.out.println()` を使って標準出力に文字列を表示します。`println` は出力後に改行を行い、`print` は改行しません。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "次のコードの出力結果はどれですか？\n\nfor (int i = 1; i <= 4; i++)\n    System.out.print(i * 2 + \" \");",
    options: ["1 2 3 4", "2 4 6 8", "2 4 6", "1 3 5 7"],
    correctIndex: 1,
    explanation: "forループは i = 1 から始まり、i <= 4 の条件で繰り返します。各反復で i * 2 を出力するため、2, 4, 6, 8 が出力されます。",
  },
  {
    id: 3,
    category: "メソッド",
    question: "Javaのメソッドで引数を受け取る正しい宣言はどれですか？",
    options: [
      "def add(a, b) { return a + b; }",
      "function add(int a, int b) { return a + b; }",
      "public static int add(int a, int b) { return a + b; }",
      "int add(a: int, b: int) { return a + b; }",
    ],
    correctIndex: 2,
    explanation: "Javaのメソッドはアクセス修飾子、戻り値の型、メソッド名、引数リストの順で宣言します。`public static int add(int a, int b)` が正しい構文です。",
  },
  {
    id: 4,
    category: "クラス",
    question: "Javaのコンストラクタについて正しい説明はどれですか？",
    options: [
      "コンストラクタは戻り値の型を持つ",
      "コンストラクタはクラス名と同じ名前で、戻り値の型を持たない",
      "コンストラクタは必ず引数を取る必要がある",
      "コンストラクタは static キーワードで宣言する",
    ],
    correctIndex: 1,
    explanation: "コンストラクタはクラス名と同じ名前を持ち、戻り値の型は指定しません（voidも不要）。引数なしのデフォルトコンストラクタも定義できます。new キーワードでインスタンスを作成するときに呼び出されます。",
  },
  {
    id: 5,
    category: "配列・リスト",
    question: "`ArrayList<Integer> list = new ArrayList<>();` に対して要素4を末尾に追加する正しい方法はどれですか？",
    options: ["list[0] = 4;", "list.add(4);", "list.push(4);", "list.append(4);"],
    correctIndex: 1,
    explanation: "`ArrayList` では `add()` メソッドで末尾に要素を追加します。`list[0]` は配列のアクセス方法でArrayListには使えません。`push` や `append` はJavaのArrayListには存在しません。",
  },
  {
    id: 6,
    category: "文字列",
    question: "`String str = \"Hello\";` の文字列の長さを取得する方法として正しいのはどれですか？",
    options: [
      "str.length()",
      "str.size()",
      "str.len()",
      "length(str)",
    ],
    correctIndex: 0,
    explanation: "Javaの `String` クラスでは `length()` メソッドで文字列の長さを取得します。配列の場合は `length` フィールド（括弧なし）、コレクションの場合は `size()` メソッドを使います。",
  },
  {
    id: 7,
    category: "継承",
    question: "Javaで親クラスのメソッドをオーバーライドするために推奨される書き方はどれですか？",
    options: [
      "virtual を付けて宣言する",
      "@Override アノテーションを付ける",
      "override キーワードを付ける",
      "特別な書き方は不要",
    ],
    correctIndex: 1,
    explanation: "Javaではメソッドのオーバーライド時に `@Override` アノテーションを付けることが推奨されます。これによりコンパイル時にオーバーライドが正しく行われているかチェックされ、タイポなどのミスを防げます。",
  },
  {
    id: 8,
    category: "インターフェース",
    question: "Javaのインターフェースについて正しい説明はどれですか？",
    options: [
      "インターフェースは直接インスタンス化できる",
      "クラスは1つのインターフェースしか実装できない",
      "インターフェースは interface キーワードで宣言し、implements で実装する",
      "インターフェースにはフィールドを宣言できない",
    ],
    correctIndex: 2,
    explanation: "インターフェースは `interface` キーワードで宣言し、クラスは `implements` キーワードで複数のインターフェースを実装できます。Java 8以降ではデフォルトメソッドも定義可能です。",
  },
  {
    id: 9,
    category: "ジェネリクス",
    question: "Javaのジェネリクスの正しい構文はどれですか？",
    options: [
      "ArrayList<int> list = new ArrayList<>();",
      "ArrayList<Integer> list = new ArrayList<>();",
      "ArrayList list = new ArrayList<Integer>();",
      "List<Integer> list = new List<>();",
    ],
    correctIndex: 1,
    explanation: "ジェネリクスではプリミティブ型（int, doubleなど）は使えず、ラッパークラス（Integer, Doubleなど）を使います。`ArrayList<Integer>` が正しい構文です。`List` はインターフェースなので直接 new できません。",
  },
  {
    id: 10,
    category: "コレクション",
    question: "`HashMap<String, Integer> map` でキー \"age\" に対応する値を取得する正しい方法はどれですか？",
    options: [
      "map[\"age\"]",
      "map.get(\"age\")",
      "map.find(\"age\")",
      "map.value(\"age\")",
    ],
    correctIndex: 1,
    explanation: "`HashMap` では `get()` メソッドでキーに対応する値を取得します。キーが存在しない場合は `null` が返ります。`getOrDefault()` を使えばデフォルト値を指定できます。",
  },
  {
    id: 11,
    category: "ラムダ式",
    question: "Javaのラムダ式の正しい構文はどれですか？",
    options: [
      "auto f = (x) => { return x * 2; };",
      "(int x) -> x * 2",
      "lambda x: x * 2",
      "function(x) { return x * 2; }",
    ],
    correctIndex: 1,
    explanation: "Javaのラムダ式は `(引数) -> 式` または `(引数) -> { 文 }` の形式です。`(int x) -> x * 2` は引数xを受け取り、x * 2を返すラムダ式です。関数型インターフェースの実装として使われます。",
  },
  {
    id: 12,
    category: "Stream API",
    question: "Stream APIで偶数だけをフィルタリングする正しい方法はどれですか？",
    options: [
      "stream.where(n -> n % 2 == 0)",
      "stream.select(n -> n % 2 == 0)",
      "stream.filter(n -> n % 2 == 0)",
      "stream.find(n -> n % 2 == 0)",
    ],
    correctIndex: 2,
    explanation: "Stream APIでは `filter()` メソッドで条件に一致する要素だけを抽出します。引数にはPredicate（条件を判定する関数型インターフェース）を渡します。",
  },
  {
    id: 13,
    category: "Optional",
    question: "`Optional<String>` から値を安全に取得する方法として正しいのはどれですか？",
    options: [
      "optional.value()",
      "optional.orElse(\"デフォルト\")",
      "optional.unwrap()",
      "optional.getValue()",
    ],
    correctIndex: 1,
    explanation: "`Optional` の `orElse()` は値が存在すればその値を、存在しなければ引数のデフォルト値を返します。`orElseGet()` や `orElseThrow()` もよく使われます。`get()` もありますが、値がない場合に例外が発生するため推奨されません。",
  },
  {
    id: 14,
    category: "Spring Boot",
    question: "Spring BootでRESTコントローラーを定義するアノテーションはどれですか？",
    options: [
      "@Controller",
      "@RestController",
      "@Service",
      "@Component",
    ],
    correctIndex: 1,
    explanation: "`@RestController` は `@Controller` と `@ResponseBody` を組み合わせたアノテーションで、メソッドの戻り値が自動的にJSON等のレスポンスボディとして返されます。REST APIの実装に使われます。",
  },
  {
    id: 15,
    category: "例外処理",
    question: "Javaの例外処理の正しい構文はどれですか？",
    options: [
      "try { ... } except (Exception e) { ... }",
      "try { ... } catch (Exception e) { ... }",
      "try { ... } rescue (Exception e) { ... }",
      "try { ... } handle (Exception e) { ... }",
    ],
    correctIndex: 1,
    explanation: "Javaでは `try` ブロックで例外が発生する可能性のあるコードを囲み、`catch` ブロックで例外を捕捉します。`finally` ブロックで後処理を行うこともできます。Java 7以降では try-with-resources も使えます。",
  },
  {
    id: 16,
    category: "ソート・コレクション操作",
    question: "`List<Integer> list = Arrays.asList(3, 1, 4, 1, 5);` をソートする正しい方法はどれですか？",
    options: [
      "list.sort();",
      "Arrays.sort(list);",
      "Collections.sort(list);",
      "list.order();",
    ],
    correctIndex: 2,
    explanation: "`Collections.sort()` はリストをソートするユーティリティメソッドです。Java 8以降では `list.sort(Comparator.naturalOrder())` や `list.sort(null)` も使えます。`Arrays.sort()` は配列用です。",
  },
  {
    id: 17,
    category: "JUnit",
    question: "JUnit 5でテストメソッドに付けるアノテーションと、値の検証に使うメソッドの正しい組み合わせはどれですか？",
    options: [
      "@Test と assert(expected, actual)",
      "@Test と assertEquals(expected, actual)",
      "@TestMethod と verify(expected, actual)",
      "@UnitTest と check(expected, actual)",
    ],
    correctIndex: 1,
    explanation: "JUnit 5では `@Test` アノテーションでテストメソッドを定義し、`assertEquals()` で期待値と実際の値を比較します。`assertTrue()`, `assertNotNull()`, `assertThrows()` なども利用可能です。",
  },
  {
    id: 18,
    category: "ファイルI/O",
    question: "Java 11以降でテキストファイルの内容を1行で読み込む方法はどれですか？",
    options: [
      "Files.readString(Path.of(\"data.txt\"))",
      "File.read(\"data.txt\")",
      "new FileReader(\"data.txt\").readAll()",
      "Scanner.readFile(\"data.txt\")",
    ],
    correctIndex: 0,
    explanation: "Java 11で追加された `Files.readString()` を使えば、ファイル全体を1行で読み込めます。従来は `Files.readAllLines()` や `BufferedReader` を使っていましたが、この方法が最もシンプルです。",
  },
  {
    id: 19,
    category: "マルチスレッド",
    question: "Javaでスレッドを作成する方法として正しいのはどれですか？",
    options: [
      "Thread t = Thread.create(func);",
      "new Thread(() -> { /* 処理 */ }).start();",
      "async.run(() -> { /* 処理 */ });",
      "Runnable.execute(() -> { /* 処理 */ });",
    ],
    correctIndex: 1,
    explanation: "Javaでは `Thread` クラスのコンストラクタに `Runnable`（ラムダ式可）を渡してスレッドを作成し、`start()` メソッドで実行を開始します。`ExecutorService` を使った方法もモダンなJavaでは推奨されます。",
  },
  {
    id: 20,
    category: "Javaエコシステム",
    question: "Java 17で導入または正式化された機能として正しいのはどれですか？",
    options: [
      "ラムダ式",
      "Stream API",
      "Sealed Classes（シールドクラス）",
      "var（ローカル変数型推論）",
    ],
    correctIndex: 2,
    explanation: "Sealed Classes（シールドクラス）はJava 17で正式導入されました。ラムダ式とStream APIはJava 8、var（ローカル変数型推論）はJava 10で導入されています。Sealed Classesは継承可能なクラスを制限する機能です。",
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-orange-500/40 bg-orange-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-orange-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-orange-500/30 bg-orange-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-orange-500 text-gray-950" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-orange-400 font-medium";
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
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-orange-500 bg-orange-500/10 text-orange-300"
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
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-gray-950 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
