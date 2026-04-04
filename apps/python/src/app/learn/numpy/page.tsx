import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

const quizQuestions: QuizQuestion[] = [
  {
    question: "NumPyの配列を作成するために最もよく使われる関数はどれですか？",
    options: ["np.list()", "np.array()", "np.create()", "np.make()"],
    answer: 1,
    explanation: "np.array() はPythonのリストやタプルからNumPy配列（ndarray）を作成する最も基本的な関数です。",
  },
  {
    question: "np.zeros((3, 4)) が生成する配列の形状はどれですか？",
    options: ["1行3列", "3行4列", "4行3列", "3×4の1次元配列"],
    answer: 1,
    explanation: "np.zeros((3, 4)) は3行4列のゼロ行列を生成します。タプル (3, 4) が形状（shape）を表します。",
  },
  {
    question: "NumPy配列のブロードキャストとは何ですか？",
    options: [
      "配列の内容をコンソールに出力すること",
      "形状の異なる配列同士を自動的に拡張して演算すること",
      "配列をネットワーク経由で送信すること",
      "配列の要素を全てコピーすること",
    ],
    answer: 1,
    explanation: "ブロードキャストは、形状の異なる配列同士の演算時にNumPyが自動的に小さい配列を拡張して計算を可能にする仕組みです。",
  },
  {
    question: "np.dot(A, B) は何を計算しますか？",
    options: ["配列の要素ごとの積", "行列の積（内積）", "配列の差", "配列の論理積"],
    answer: 1,
    explanation: "np.dot() は行列の積（内積・ドット積）を計算します。2次元配列では行列乗算になります。",
  },
];

export default function NumpyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">NumPy</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          科学技術計算の基盤ライブラリNumPyをマスターしましょう。多次元配列の作成・操作・演算から、
          線形代数、ブロードキャストまで、データサイエンスに必須の知識を体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="numpy" totalLessons={6} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/numpy" color="blue" categoryId="numpy" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">NumPyでできること</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gray-900 border border-blue-500/20">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-blue-400 font-bold mb-1">高速な数値計算</h3>
            <p className="text-gray-400 text-sm">C言語で実装されたコアにより、純Pythonより数十倍高速な配列演算が可能です。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-blue-500/20">
            <div className="text-2xl mb-2">🔢</div>
            <h3 className="text-blue-400 font-bold mb-1">多次元配列</h3>
            <p className="text-gray-400 text-sm">1次元から多次元まで、均一な型の配列（ndarray）を効率よく扱えます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-blue-500/20">
            <div className="text-2xl mb-2">📐</div>
            <h3 className="text-blue-400 font-bold mb-1">線形代数・統計</h3>
            <p className="text-gray-400 text-sm">行列演算・固有値・乱数生成など、科学技術計算に必要な機能が揃っています。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NumPy配列を作ってみよう</h2>
        <p className="text-gray-400 mb-4">配列の作成と基本的な属性を確認しましょう。</p>
        <PythonPlayground defaultCode={`import numpy as np

# 1次元配列の作成
a = np.array([1, 2, 3, 4, 5])
print("1次元配列:", a)
print("形状:", a.shape)
print("データ型:", a.dtype)

# 2次元配列の作成
b = np.array([[1, 2, 3], [4, 5, 6]])
print("\\n2次元配列:")
print(b)
print("形状:", b.shape)

# 特殊な配列
zeros = np.zeros((3, 3))
ones = np.ones((2, 4))
eye = np.eye(3)
print("\\nゼロ行列:")
print(zeros)
print("単位行列:")
print(eye)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列演算を体験しよう</h2>
        <p className="text-gray-400 mb-4">NumPyの強力な要素ごとの演算とユニバーサル関数を試してみましょう。</p>
        <PythonPlayground defaultCode={`import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# 要素ごとの演算
print("a + b =", a + b)
print("a * b =", a * b)
print("a ** 2 =", a ** 2)

# ユニバーサル関数
print("\\nsqrt(a):", np.sqrt(a))
print("sum(a):", np.sum(a))
print("mean(a):", np.mean(a))
print("std(a):", np.std(a))
print("max(a):", np.max(a))

# 行列演算
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print("\\n行列の積:")
print(np.dot(A, B))`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="blue" />
      </section>
    </div>
  );
}
