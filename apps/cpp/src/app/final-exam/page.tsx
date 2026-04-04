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
    category: "C++基礎",
    question: "C++で標準出力に文字列を表示する正しい方法はどれですか？",
    options: ["print(\"Hello\");", "System.out.println(\"Hello\");", "std::cout << \"Hello\" << std::endl;", "printf \"Hello\""],
    correctIndex: 2,
    explanation: "C++では `std::cout` と挿入演算子 `<<` を使って標準出力に表示します。`std::endl` は改行とバッファのフラッシュを行います。`printf` はC言語の関数で使えますが、C++では `cout` が標準的です。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "次のコードの出力結果はどれですか？\n\nfor (int i = 1; i <= 4; i++)\n    std::cout << i * 2 << \" \";",
    options: ["1 2 3 4", "2 4 6 8", "2 4 6", "1 3 5 7"],
    correctIndex: 1,
    explanation: "forループは i = 1 から始まり、i <= 4 の条件で繰り返します。各反復で i * 2 を出力するため、2, 4, 6, 8 が出力されます。",
  },
  {
    id: 3,
    category: "関数",
    question: "C++の参照渡し（pass by reference）を使った関数の正しい宣言はどれですか？",
    options: [
      "void increment(int x) { x++; }",
      "void increment(int &x) { x++; }",
      "void increment(int *x) { x++; }",
      "void increment(ref int x) { x++; }",
    ],
    correctIndex: 1,
    explanation: "C++では `&` を使って参照渡しを行います。`int &x` は引数の参照を受け取り、関数内での変更が呼び出し元に反映されます。`int x` は値渡し、`int *x` はポインタ渡しです。",
  },
  {
    id: 4,
    category: "ポインタ",
    question: "次のコードで `*ptr` の値はいくつですか？\n\nint x = 42;\nint* ptr = &x;",
    options: ["xのメモリアドレス", "42", "0", "未定義"],
    correctIndex: 1,
    explanation: "`*ptr` はポインタのデリファレンス（間接参照）で、ポインタが指す先の値を取得します。`ptr` は `x` のアドレスを持っているので、`*ptr` は `x` の値である42になります。",
  },
  {
    id: 5,
    category: "配列・コンテナ",
    question: "`std::vector<int> v = {1, 2, 3};` に対して要素4を末尾に追加する正しい方法はどれですか？",
    options: ["v[3] = 4;", "v.add(4);", "v.push_back(4);", "v.append(4);"],
    correctIndex: 2,
    explanation: "`std::vector` では `push_back()` メソッドで末尾に要素を追加します。`v[3]` は範囲外アクセスで未定義動作、`add` や `append` は存在しません。",
  },
  {
    id: 6,
    category: "文字列",
    question: "`std::string` の長さを取得する方法として正しいのはどれですか？",
    options: [
      "str.length() または str.size()",
      "str.len()",
      "strlen(str)",
      "str.count()",
    ],
    correctIndex: 0,
    explanation: "`std::string` では `length()` と `size()` の両方が文字列の長さを返します。どちらも同じ結果です。`strlen()` はCスタイル文字列（`char*`）用の関数です。",
  },
  {
    id: 7,
    category: "クラス",
    question: "C++のコンストラクタについて正しい説明はどれですか？",
    options: [
      "コンストラクタは戻り値の型を持つ",
      "コンストラクタはクラス名と同じ名前で、戻り値の型を持たない",
      "コンストラクタは必ず引数を取る必要がある",
      "コンストラクタは static キーワードで宣言する",
    ],
    correctIndex: 1,
    explanation: "コンストラクタはクラス名と同じ名前を持ち、戻り値の型は指定しません（voidも不要）。引数なしのデフォルトコンストラクタも定義できます。",
  },
  {
    id: 8,
    category: "継承",
    question: "C++で仮想関数をオーバーライドするために使うキーワードの組み合わせとして正しいのはどれですか？",
    options: [
      "基底クラス: abstract, 派生クラス: override",
      "基底クラス: virtual, 派生クラス: override",
      "基底クラス: override, 派生クラス: virtual",
      "キーワードは不要",
    ],
    correctIndex: 1,
    explanation: "基底クラスで `virtual` キーワードを付けたメソッドを、派生クラスで `override` キーワード（C++11以降）を付けてオーバーライドします。`override` は省略可能ですが、安全のために付けることが推奨されます。",
  },
  {
    id: 9,
    category: "テンプレート",
    question: "C++の関数テンプレートの正しい構文はどれですか？",
    options: [
      "generic <T> T getMax(T a, T b) { ... }",
      "template <typename T> T getMax(T a, T b) { ... }",
      "T getMax<T>(T a, T b) { ... }",
      "def getMax(T a, T b) -> T { ... }",
    ],
    correctIndex: 1,
    explanation: "C++のテンプレートは `template <typename T>` または `template <class T>` で宣言します。`typename` と `class` はテンプレートパラメータではどちらも使えます。",
  },
  {
    id: 10,
    category: "コンテナ",
    question: "`std::map<std::string, int>` でキーに対応する値を安全に取得する方法はどれですか？",
    options: [
      "map[\"key\"]（キーが無ければ例外）",
      "map.find(\"key\") でイテレータを取得し、end() と比較する",
      "map.get(\"key\")",
      "map.lookup(\"key\")",
    ],
    correctIndex: 1,
    explanation: "`find()` はキーが見つかればそのイテレータを、見つからなければ `end()` を返します。`map[\"key\"]` はキーが無い場合にデフォルト値で新しい要素を挿入してしまうため安全ではありません。",
  },
  {
    id: 11,
    category: "スマートポインタ",
    question: "`std::unique_ptr` と `std::shared_ptr` の違いとして正しいのはどれですか？",
    options: [
      "unique_ptr は複数箇所で共有でき、shared_ptr はできない",
      "unique_ptr は所有権を独占し、shared_ptr は参照カウントで複数箇所で共有できる",
      "unique_ptr は遅く、shared_ptr は速い",
      "どちらも同じ動作をする",
    ],
    correctIndex: 1,
    explanation: "`unique_ptr` はリソースの所有権を独占し、コピー不可（ムーブのみ可能）です。`shared_ptr` は参照カウント方式で複数のポインタが同じリソースを共有でき、最後の所有者が破棄されたときにリソースが解放されます。",
  },
  {
    id: 12,
    category: "メモリ管理",
    question: "C++のRAII（Resource Acquisition Is Initialization）の説明として正しいのはどれですか？",
    options: [
      "メモリを手動で管理する手法",
      "ガベージコレクションの一種",
      "リソースの取得をオブジェクトの初期化時に、解放をデストラクタで行う手法",
      "メモリプールを使った最適化手法",
    ],
    correctIndex: 2,
    explanation: "RAIIはリソース（メモリ、ファイル、ロック等）の取得をコンストラクタで、解放をデストラクタで行う手法です。スコープを抜けるとデストラクタが自動的に呼ばれるため、リソースリークを防げます。",
  },
  {
    id: 13,
    category: "ラムダ式",
    question: "C++のラムダ式で、外部変数 `x` を値キャプチャする正しい構文はどれですか？",
    options: [
      "auto f = (x) => { return x * 2; };",
      "auto f = [x](){ return x * 2; };",
      "auto f = lambda x: x * 2;",
      "auto f = {x}(){ return x * 2; };",
    ],
    correctIndex: 1,
    explanation: "C++のラムダ式は `[キャプチャ](引数) { 本体 }` の形式です。`[x]` は変数xを値でキャプチャ、`[&x]` は参照でキャプチャ、`[=]` は全変数を値で、`[&]` は全変数を参照でキャプチャします。",
  },
  {
    id: 14,
    category: "ムーブセマンティクス",
    question: "`std::move` の役割として正しいのはどれですか？",
    options: [
      "オブジェクトを別のメモリ位置に物理的に移動する",
      "左辺値を右辺値参照にキャストし、ムーブコンストラクタ/代入演算子の呼び出しを可能にする",
      "オブジェクトのコピーを高速化する",
      "メモリを自動的に解放する",
    ],
    correctIndex: 1,
    explanation: "`std::move` は実際にはデータを移動しません。左辺値（lvalue）を右辺値参照（rvalue reference）にキャストすることで、ムーブコンストラクタやムーブ代入演算子を呼び出せるようにします。",
  },
  {
    id: 15,
    category: "STLアルゴリズム",
    question: "`std::vector<int> v = {3, 1, 4, 1, 5};` をソートする正しい方法はどれですか？",
    options: [
      "v.sort();",
      "std::sort(v);",
      "std::sort(v.begin(), v.end());",
      "sort(v, v.size());",
    ],
    correctIndex: 2,
    explanation: "`std::sort` はイテレータの範囲を引数に取ります。`v.begin()` と `v.end()` で配列全体の範囲を指定します。`<algorithm>` ヘッダのインクルードが必要です。",
  },
  {
    id: 16,
    category: "イテレータ",
    question: "イテレータを使った `std::vector` の走査で正しいコードはどれですか？",
    options: [
      "for (auto it = v.start(); it != v.stop(); it++)",
      "for (auto it = v.begin(); it != v.end(); ++it)",
      "for (auto it = v.first(); it != v.last(); it.next())",
      "for (auto it : v.iterator())",
    ],
    correctIndex: 1,
    explanation: "C++のイテレータは `begin()` で先頭、`end()` で末尾の次を指します。`++it`（前置インクリメント）でイテレータを進めます。`!=` で終了判定を行うのが慣用的です。",
  },
  {
    id: 17,
    category: "例外処理",
    question: "C++の例外処理の正しい構文はどれですか？",
    options: [
      "try { ... } except (std::exception& e) { ... }",
      "try { ... } catch (const std::exception& e) { ... }",
      "try { ... } rescue (std::exception e) { ... }",
      "try { ... } handle (std::exception& e) { ... }",
    ],
    correctIndex: 1,
    explanation: "C++では `try` ブロックで例外が発生する可能性のあるコードを囲み、`catch` ブロックで例外を捕捉します。`const std::exception&` で例外を参照で受け取るのが一般的です。",
  },
  {
    id: 18,
    category: "ファイルI/O",
    question: "C++でテキストファイルを読み込む正しい方法はどれですか？",
    options: [
      "std::ifstream file(\"data.txt\"); std::string line; std::getline(file, line);",
      "File.open(\"data.txt\").readLine();",
      "std::read_file(\"data.txt\");",
      "fopen(\"data.txt\", \"r\"); // C++標準の方法",
    ],
    correctIndex: 0,
    explanation: "`std::ifstream` は入力ファイルストリームで、`<fstream>` ヘッダを使います。`std::getline()` で1行ずつ読み込めます。`fopen` はCの関数で、C++では `ifstream` が推奨されます。",
  },
  {
    id: 19,
    category: "マルチスレッド",
    question: "C++11でスレッドを作成する正しい方法はどれですか？",
    options: [
      "Thread t = new Thread(func);",
      "std::thread t(func); t.join();",
      "pthread_create(&t, NULL, func, NULL);",
      "async.run(func);",
    ],
    correctIndex: 1,
    explanation: "C++11では `<thread>` ヘッダの `std::thread` クラスでスレッドを作成します。`join()` でスレッドの終了を待つか、`detach()` でバックグラウンド実行します。`pthread` はPOSIX APIで、C++標準ではありません。",
  },
  {
    id: 20,
    category: "C++エコシステム",
    question: "C++17で導入された機能として正しいのはどれですか？",
    options: [
      "ラムダ式",
      "スマートポインタ（unique_ptr, shared_ptr）",
      "構造化束縛（auto [x, y] = pair）と std::optional",
      "range-based forループ",
    ],
    correctIndex: 2,
    explanation: "構造化束縛（structured bindings）と `std::optional` はC++17で導入されました。ラムダ式とrange-based forループはC++11、スマートポインタ（`unique_ptr`, `shared_ptr`）もC++11で導入されています。",
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-blue-500/40 bg-blue-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-blue-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-blue-500/30 bg-blue-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-blue-500 text-gray-950" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-blue-400 font-medium";
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
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-blue-500 bg-blue-500/10 text-blue-300"
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
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-gray-950 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
