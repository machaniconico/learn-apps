import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function SetupPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Python環境構築</h1>
        <p className="text-gray-400">Pythonのインストールと実行環境の準備</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pythonとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonは1991年にグイド・ヴァン・ロッサムが開発したプログラミング言語です。
          シンプルで読みやすい文法が特徴で、初心者から上級者まで幅広く使われています。
          Web開発・データサイエンス・AI・自動化など、あらゆる分野で活躍します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">python --version</code> - インストール済みのPythonバージョンを確認</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">python3</code> - Python 3系のインタープリタを起動</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">python script.py</code> - Pythonファイルを実行</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">このサイトでの学習方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          このサイトではブラウザ上でPythonを直接実行できます。
          インストール不要で今すぐ学習を始められます。
          下のプレイグラウンドでコードを書き、「実行」ボタンをクリックすると結果が表示されます。
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-green-400 font-bold block mb-1">ステップ1</span>
            <span className="text-gray-400">コードを入力または編集する</span>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-green-400 font-bold block mb-1">ステップ2</span>
            <span className="text-gray-400">「実行」ボタンをクリックする</span>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-green-400 font-bold block mb-1">ステップ3</span>
            <span className="text-gray-400">出力エリアで結果を確認する</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">はじめてのPythonプログラム</h2>
        <p className="text-gray-400 mb-4">プログラミングの世界では最初に「Hello, World!」を表示するのが伝統です。実行してみましょう！</p>
        <PythonPlayground defaultCode={`# はじめてのPythonプログラム
print("Hello, World!")
print("Pythonへようこそ！")

# 計算もできます
print(2 + 3)
print(10 * 5)

# 日本語ももちろん使えます
print("プログラミングを楽しもう！")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pythonの特徴まとめ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonが初心者に選ばれる理由を理解しておきましょう。
        </p>
        <ul className="space-y-3 text-gray-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span><strong className="text-gray-200">インデント重視</strong> — 波括弧の代わりにインデント（字下げ）でブロックを表現します</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span><strong className="text-gray-200">動的型付け</strong> — 変数の型を宣言せずに使えます</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span><strong className="text-gray-200">豊富な標準ライブラリ</strong> — インストール直後から多くの機能が使えます</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span><strong className="text-gray-200">マルチパラダイム</strong> — 手続き型・オブジェクト指向・関数型スタイルで書けます</span>
          </li>
        </ul>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="setup" />
      </div>
      <LessonNav lessons={lessons} currentId="setup" basePath="/learn/basics" />
    </div>
  );
}
