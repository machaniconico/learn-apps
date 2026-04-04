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
    category: "C言語基礎",
    question: "C言語で標準出力に文字列を表示する正しい方法はどれですか？",
    options: ["print(\"Hello\");", "System.out.println(\"Hello\");", "printf(\"Hello\\n\");", "cout << \"Hello\";"],
    correctIndex: 2,
    explanation: "C言語では `printf()` 関数を使って標準出力に表示します。`\\n` は改行文字です。`cout` はC++の構文、`print` はPythonの構文です。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "次のコードの出力結果はどれですか？\n\nfor (int i = 1; i <= 4; i++)\n    printf(\"%d \", i * 2);",
    options: ["1 2 3 4", "2 4 6 8", "2 4 6", "1 3 5 7"],
    correctIndex: 1,
    explanation: "forループは i = 1 から始まり、i <= 4 の条件で繰り返します。各反復で i * 2 を出力するため、2, 4, 6, 8 が出力されます。",
  },
  {
    id: 3,
    category: "ポインタ",
    question: "次のコードで `*ptr` の値はいくつですか？\n\nint x = 42;\nint *ptr = &x;",
    options: ["xのメモリアドレス", "42", "0", "未定義"],
    correctIndex: 1,
    explanation: "`*ptr` はポインタのデリファレンス（間接参照）で、ポインタが指す先の値を取得します。`ptr` は `x` のアドレスを持っているので、`*ptr` は `x` の値である42になります。",
  },
  {
    id: 4,
    category: "配列",
    question: "C言語でint型の要素5個の配列を宣言する正しい方法はどれですか？",
    options: ["int arr[5];", "int arr(5);", "array<int, 5> arr;", "int[] arr = new int[5];"],
    correctIndex: 0,
    explanation: "C言語では `int arr[5];` と宣言します。`array<int,5>` はC++の構文、`new int[5]` はJava/C++の構文です。",
  },
  {
    id: 5,
    category: "文字列",
    question: "C言語で文字列の長さを取得する関数はどれですか？",
    options: ["str.length()", "strlen(str)", "str.size()", "length(str)"],
    correctIndex: 1,
    explanation: "`strlen()` は `<string.h>` で定義されたC言語の標準関数です。`str.length()` や `str.size()` はC++の `std::string` のメソッドです。",
  },
  {
    id: 6,
    category: "構造体",
    question: "C言語で構造体を定義する正しい構文はどれですか？",
    options: [
      "class Point { int x; int y; };",
      "struct Point { int x; int y; };",
      "record Point { int x; int y; };",
      "type Point = { x: int; y: int; };",
    ],
    correctIndex: 1,
    explanation: "C言語では `struct` キーワードを使って構造体を定義します。`class` はC++/Java、`record` はJavaの構文です。",
  },
  {
    id: 7,
    category: "メモリ管理",
    question: "C言語でヒープ領域にメモリを確保し、使用後に解放する正しいコードはどれですか？",
    options: [
      "int *p = new int(10); delete p;",
      "int *p = malloc(sizeof(int)); free(p);",
      "int *p = alloc(sizeof(int)); dealloc(p);",
      "int *p = new int; release(p);",
    ],
    correctIndex: 1,
    explanation: "C言語では `malloc()` でメモリを確保し、`free()` で解放します。`new`/`delete` はC++の構文です。`<stdlib.h>` のインクルードが必要です。",
  },
  {
    id: 8,
    category: "プリプロセッサ",
    question: "C言語で定数 `MAX` を 100 と定義するプリプロセッサディレクティブはどれですか？",
    options: ["const MAX = 100;", "#define MAX 100", "let MAX = 100;", "#constant MAX 100"],
    correctIndex: 1,
    explanation: "`#define` はプリプロセッサディレクティブで、コンパイル前にテキスト置換を行います。`const` はC言語でも使えますが、`#define` はC言語で伝統的に使われるマクロ定義方法です。",
  },
  {
    id: 9,
    category: "ファイルI/O",
    question: "C言語でファイルを読み込みモードで開く正しい関数呼び出しはどれですか？",
    options: [
      "File *fp = open(\"data.txt\", \"r\");",
      "FILE *fp = fopen(\"data.txt\", \"r\");",
      "FILE *fp = file_open(\"data.txt\", READ);",
      "ifstream fp(\"data.txt\");",
    ],
    correctIndex: 1,
    explanation: "`fopen()` はC言語のファイル操作関数で、`FILE *` 型のポインタを返します。第2引数は \"r\"（読み込み）、\"w\"（書き込み）、\"a\"（追記）などのモードを指定します。",
  },
  {
    id: 10,
    category: "typedef",
    question: "C言語で `unsigned int` を `uint` という名前で使えるようにするには？",
    options: [
      "alias uint = unsigned int;",
      "typedef unsigned int uint;",
      "using uint = unsigned int;",
      "#define unsigned int uint",
    ],
    correctIndex: 1,
    explanation: "`typedef` は既存の型に別名をつけるキーワードです。`using` はC++の構文、`alias` は他の言語の構文です。",
  },
  {
    id: 11,
    category: "関数ポインタ",
    question: "int型の引数を2つ取りint型を返す関数ポインタの宣言として正しいのはどれですか？",
    options: [
      "int *fp(int, int);",
      "int (*fp)(int, int);",
      "int &fp(int, int);",
      "func fp(int, int) int;",
    ],
    correctIndex: 1,
    explanation: "関数ポインタは `戻り値型 (*変数名)(引数型, ...)` の形式で宣言します。`int *fp(int, int)` はint型ポインタを返す関数の宣言です。",
  },
  {
    id: 12,
    category: "enum",
    question: "C言語で曜日を列挙型で定義する正しい方法はどれですか？",
    options: [
      "enum Days = {MON, TUE, WED};",
      "enum Days { MON, TUE, WED };",
      "enum Days(MON, TUE, WED);",
      "Days enum { MON, TUE, WED };",
    ],
    correctIndex: 1,
    explanation: "`enum` キーワードで列挙型を定義します。デフォルトでは最初の要素が0、次が1と自動的に整数値が割り当てられます。",
  },
  {
    id: 13,
    category: "ビット演算",
    question: "変数 `x` の3ビット目（0始まり）をセットする正しい演算はどれですか？",
    options: ["x = x + 8;", "x |= (1 << 3);", "x &= (1 << 3);", "x ^= 3;"],
    correctIndex: 1,
    explanation: "ビットをセットするには OR演算 `|=` を使います。`1 << 3` は3ビット目だけが1のマスクです。`&=` はビットをクリアするときに使います。",
  },
  {
    id: 14,
    category: "入力",
    question: "C言語でint型変数 `n` にキーボードから整数を入力する正しいコードはどれですか？",
    options: [
      "n = input();",
      "scanf(\"%d\", &n);",
      "cin >> n;",
      "gets(n);",
    ],
    correctIndex: 1,
    explanation: "`scanf()` はC言語の標準入力関数です。フォーマット指定子 `%d` でint型を読み込み、変数のアドレス `&n` を渡します。`cin` はC++の構文です。",
  },
  {
    id: 15,
    category: "連結リスト",
    question: "C言語で単方向連結リストのノードを構造体で表す際、次のノードへのポインタの宣言として正しいのはどれですか？",
    options: [
      "Node next;",
      "struct Node *next;",
      "Node &next;",
      "next: *Node;",
    ],
    correctIndex: 1,
    explanation: "次のノードへのポインタは `struct Node *next;` と宣言します。構造体の定義内で自分自身の型を参照するには `struct Node *` という形式が必要です。",
  },
  {
    id: 16,
    category: "sizeof演算子",
    question: "32ビット環境で `sizeof(int)` の一般的な値はいくつですか？",
    options: ["1", "2", "4", "8"],
    correctIndex: 2,
    explanation: "32ビット・64ビット環境では `int` は通常4バイトです。`sizeof` 演算子はコンパイル時に型のサイズをバイト単位で返します。",
  },
  {
    id: 17,
    category: "プリプロセッサ",
    question: "C言語でヘッダファイルの多重インクルードを防ぐ正しい方法はどれですか？",
    options: [
      "#once",
      "#ifndef MY_HEADER_H\n#define MY_HEADER_H\n...\n#endif",
      "#import \"myheader.h\"",
      "#single",
    ],
    correctIndex: 1,
    explanation: "インクルードガードは `#ifndef`、`#define`、`#endif` を組み合わせて多重インクルードを防ぎます。多くのコンパイラは `#pragma once` もサポートしています。",
  },
  {
    id: 18,
    category: "switch文",
    question: "C言語のswitch文で各caseの終わりに書かないと意図しない動作になるキーワードはどれですか？",
    options: ["return", "break", "continue", "exit"],
    correctIndex: 1,
    explanation: "`break` がないとフォールスルー（fall-through）が発生し、次のcaseも実行されます。これはC言語の仕様ですが、意図しないバグの原因になることが多いです。",
  },
  {
    id: 19,
    category: "static変数",
    question: "関数内の `static` ローカル変数について正しい説明はどれですか？",
    options: [
      "関数が呼ばれるたびに初期化される",
      "プログラム全体を通じて値が保持される",
      "他の関数からアクセスできる",
      "スタック領域に確保される",
    ],
    correctIndex: 1,
    explanation: "関数内の `static` 変数はプログラム起動時に一度だけ初期化され、関数呼び出し間で値が保持されます。スコープは関数内ですが、静的記憶域（データセグメント）に確保されます。",
  },
  {
    id: 20,
    category: "C言語の歴史",
    question: "C言語の標準規格の歴史について正しい順序はどれですか？",
    options: [
      "C99 → C89 → C11 → C23",
      "C89 → C99 → C11 → C23",
      "C11 → C89 → C99 → C23",
      "C89 → C11 → C99 → C23",
    ],
    correctIndex: 1,
    explanation: "C言語の標準規格はC89（ANSI C）→ C99 → C11 → C17（マイナー改訂）→ C23 の順に制定されました。C99でインライン変数宣言やboolean型などが追加されました。",
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-teal-500/40 bg-teal-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-teal-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-teal-500/30 bg-teal-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-teal-500 text-gray-950" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-teal-400 font-medium";
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
                className="h-full bg-teal-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-teal-500 bg-teal-500/10 text-teal-300"
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
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
