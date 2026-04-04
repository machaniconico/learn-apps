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
    category: "Python基礎",
    question: "Pythonで変数に値を代入する正しい方法はどれですか？",
    options: ["int x = 10", "x = 10", "var x = 10", "x := 10"],
    correctIndex: 1,
    explanation: "Pythonでは型宣言なしで `x = 10` のように直接代入します。`int x = 10` はJava/C風、`var x = 10` はJavaScript風、`:=` はセイウチ演算子で別の用途です。",
  },
  {
    id: 2,
    category: "制御構文",
    question: "次のコードの出力結果はどれですか？\n\nfor i in range(3):\n    print(i)",
    options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2 3 4"],
    correctIndex: 1,
    explanation: "`range(3)` は 0, 1, 2 を生成します。range は0始まりで、終端の値は含まれません。",
  },
  {
    id: 3,
    category: "関数",
    question: "デフォルト引数を持つ関数の正しい定義はどれですか？",
    options: [
      "def greet(name, greeting = 'こんにちは'):",
      "def greet(greeting = 'こんにちは', name):",
      "def greet(name, greeting):",
      "def greet(name; greeting = 'こんにちは'):",
    ],
    correctIndex: 0,
    explanation: "デフォルト引数は必須引数の後に定義します。デフォルト引数を必須引数より前に置くとSyntaxErrorになります。",
  },
  {
    id: 4,
    category: "リスト",
    question: "`lst = [1, 2, 3, 4, 5]` のとき、`lst[1:4]` の結果はどれですか？",
    options: ["[1, 2, 3]", "[2, 3, 4]", "[2, 3, 4, 5]", "[1, 2, 3, 4]"],
    correctIndex: 1,
    explanation: "スライス `[1:4]` はインデックス1から3（4の手前）までを返します。つまり `[2, 3, 4]` となります。",
  },
  {
    id: 5,
    category: "辞書",
    question: "辞書 `d = {'a': 1, 'b': 2}` に対して、存在しないキー 'c' を安全に取得する方法はどれですか？",
    options: ["d['c']", "d.get('c')", "d.find('c')", "d.fetch('c')"],
    correctIndex: 1,
    explanation: "`d.get('c')` はキーが存在しない場合にNoneを返します。`d['c']` はKeyErrorを発生させます。`find` と `fetch` は辞書のメソッドではありません。",
  },
  {
    id: 6,
    category: "文字列",
    question: "f文字列を使って変数 `name = '太郎'` と `age = 25` を埋め込む正しい書き方はどれですか？",
    options: [
      "f'{name}さんは{age}歳'",
      "'{name}さんは{age}歳'.format()",
      "'%sさんは%d歳' % name, age",
      "f\"(name)さんは(age)歳\"",
    ],
    correctIndex: 0,
    explanation: "f文字列は `f'...'` の形式で `{}` 内に変数や式を直接埋め込みます。Python 3.6以降で使用可能です。",
  },
  {
    id: 7,
    category: "クラス",
    question: "クラスのコンストラクタの正しい定義はどれですか？",
    options: [
      "def constructor(self, name):",
      "def __init__(self, name):",
      "def __new__(self, name):",
      "def init(self, name):",
    ],
    correctIndex: 1,
    explanation: "`__init__` はPythonのコンストラクタです。インスタンス生成時に自動的に呼ばれ、第1引数は慣習的に `self` とします。",
  },
  {
    id: 8,
    category: "ファイルI/O",
    question: "ファイルを安全に開いて読み込む正しい方法はどれですか？",
    options: [
      "f = open('file.txt'); data = f.read()",
      "with open('file.txt', 'r') as f: data = f.read()",
      "open('file.txt').read() as data",
      "file.open('file.txt') as f: data = f.read()",
    ],
    correctIndex: 1,
    explanation: "`with` 文（コンテキストマネージャ）を使うと、例外が発生してもファイルが自動的に閉じられます。これが最も安全な方法です。",
  },
  {
    id: 9,
    category: "標準ライブラリ",
    question: "`collections.Counter` を使って `['a', 'b', 'a', 'c', 'a']` の要素数を数えると、'a' のカウントはいくつですか？",
    options: ["1", "2", "3", "5"],
    correctIndex: 2,
    explanation: "`Counter` はリスト内の各要素の出現回数を辞書形式で返します。'a' は3回登場するので `Counter({'a': 3, 'b': 1, 'c': 1})` となります。",
  },
  {
    id: 10,
    category: "正規表現",
    question: "`re.findall(r'\\d+', 'abc123def456')` の結果はどれですか？",
    options: ["['123456']", "['123', '456']", "['1', '2', '3', '4', '5', '6']", "None"],
    correctIndex: 1,
    explanation: "`\\d+` は1文字以上の連続した数字にマッチします。`findall` はマッチした全ての部分文字列をリストで返すので `['123', '456']` になります。",
  },
  {
    id: 11,
    category: "Flask",
    question: "FlaskでGETリクエストを処理するルートの正しい定義はどれですか？",
    options: [
      "@app.route('/hello')\ndef hello(): return 'Hello'",
      "@app.get('/hello')\ndef hello(): return 'Hello'",
      "app.route('/hello', 'GET')\ndef hello(): return 'Hello'",
      "@app.handler('/hello')\ndef hello(): return 'Hello'",
    ],
    correctIndex: 0,
    explanation: "FlaskではGETリクエストは `@app.route` デコレータで処理します。`methods` 引数を省略するとデフォルトでGETのみ受け付けます。",
  },
  {
    id: 12,
    category: "Django",
    question: "DjangoのORMでUserモデルの全レコードを取得する正しい方法はどれですか？",
    options: [
      "User.getAll()",
      "User.objects.all()",
      "User.query.all()",
      "db.select(User)",
    ],
    correctIndex: 1,
    explanation: "Djangoでは `モデル名.objects.all()` でQuerySetを取得します。`objects` はDjangoのManagerオブジェクトで、データベース操作のインターフェースです。",
  },
  {
    id: 13,
    category: "NumPy",
    question: "`import numpy as np` の後、`np.zeros((2, 3))` で作成される配列の形はどれですか？",
    options: [
      "1次元の長さ6の配列",
      "2行3列の2次元配列（全要素0.0）",
      "3行2列の2次元配列（全要素0.0）",
      "2×3の単位行列",
    ],
    correctIndex: 1,
    explanation: "`np.zeros((2, 3))` は形状が (2, 3) つまり2行3列のゼロ行列を生成します。タプル引数で各次元のサイズを指定します。",
  },
  {
    id: 14,
    category: "Pandas",
    question: "PandasのDataFrameで特定の列を選択する正しい方法はどれですか？",
    options: [
      "df.column('name')",
      "df['name']",
      "df.get_column('name')",
      "df.select('name')",
    ],
    correctIndex: 1,
    explanation: "PandasのDataFrameは辞書ライクに `df['列名']` でSeriesを取得できます。また `df.name` のようにドット記法でもアクセスできます（列名がPython識別子の場合）。",
  },
  {
    id: 15,
    category: "Matplotlib",
    question: "Matplotlibで折れ線グラフを描画する正しいコードはどれですか？",
    options: [
      "plt.line([1,2,3], [4,5,6])",
      "plt.plot([1,2,3], [4,5,6])",
      "plt.draw([1,2,3], [4,5,6])",
      "plt.chart([1,2,3], [4,5,6])",
    ],
    correctIndex: 1,
    explanation: "`plt.plot(x, y)` が折れ線グラフの基本関数です。散布図は `plt.scatter`、棒グラフは `plt.bar` を使います。",
  },
  {
    id: 16,
    category: "pytest",
    question: "pytestでテスト関数を定義する正しい方法はどれですか？",
    options: [
      "def check_addition():\n    assert 1 + 1 == 2",
      "def test_addition():\n    assert 1 + 1 == 2",
      "@test\ndef addition():\n    assert 1 + 1 == 2",
      "class Test:\n    def addition():\n        assert 1 + 1 == 2",
    ],
    correctIndex: 1,
    explanation: "pytestはデフォルトで `test_` で始まる関数を自動収集します。クラスの場合は `Test` で始まるクラス内の `test_` メソッドが対象です。",
  },
  {
    id: 17,
    category: "デバッグ",
    question: "Pythonの組み込みデバッガpdbを使ってコードにブレークポイントを設定する方法はどれですか？",
    options: [
      "debug.break()",
      "import pdb; pdb.set_trace()",
      "breakpoint()",
      "2と3の両方が正しい",
    ],
    correctIndex: 3,
    explanation: "`import pdb; pdb.set_trace()` は従来の方法です。Python 3.7以降では組み込み関数 `breakpoint()` が追加され、より簡潔にブレークポイントを設定できます。",
  },
  {
    id: 18,
    category: "非同期処理",
    question: "Pythonで非同期関数を定義する正しい構文はどれですか？",
    options: [
      "async def fetch_data():",
      "def async fetch_data():",
      "@async\ndef fetch_data():",
      "coroutine def fetch_data():",
    ],
    correctIndex: 0,
    explanation: "`async def` キーワードを使って非同期関数（コルーチン関数）を定義します。この関数は `await` を使って呼び出すか、`asyncio.run()` で実行します。",
  },
  {
    id: 19,
    category: "型ヒント",
    question: "関数の引数と戻り値に型ヒントを付ける正しい書き方はどれですか？",
    options: [
      "def greet(name: str) -> str:\n    return f'Hello, {name}'",
      "def greet(str name) -> str:\n    return f'Hello, {name}'",
      "def greet(name: String) returns String:\n    return f'Hello, {name}'",
      "def greet<str>(name) -> str:\n    return f'Hello, {name}'",
    ],
    correctIndex: 0,
    explanation: "Pythonの型ヒントは `引数名: 型` で引数に、`-> 型` で戻り値に付けます。型はあくまでヒントで、実行時には強制されません（mypyなどで静的解析）。",
  },
  {
    id: 20,
    category: "アルゴリズム",
    question: "二分探索のアルゴリズムの計算量はどれですか？",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctIndex: 2,
    explanation: "二分探索は毎回探索範囲を半分にするため O(log n) の計算量になります。線形探索は O(n)、バブルソートは O(n²) です。",
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
          <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"}`}>
            <div className={`text-6xl font-bold mb-3 ${passed ? "text-green-400" : "text-red-400"}`}>
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
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
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
                  className={`rounded-xl border p-5 ${isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-green-500 text-gray-950" : "bg-red-500 text-white"}`}>
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
                      if (isCorrectChoice) optClass = "text-green-400 font-medium";
                      else if (isUserChoice && !isCorrect) optClass = "text-red-400 line-through";
                      return (
                        <p key={i} className={`text-sm ${optClass}`}>
                          {isCorrectChoice ? "✓ " : isUserChoice ? "✗ " : "  "}{opt}
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
                className="h-full bg-green-500 rounded-full transition-all duration-300"
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
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
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
                            ? "border-green-500 bg-green-500/10 text-green-300"
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
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-950 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
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
