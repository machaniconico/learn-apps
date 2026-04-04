import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "文字列 '  Hello World  ' から前後の空白を除去するメソッドはどれですか？",
    options: ["remove()", "trim()", "strip()", "clean()"],
    answer: 2,
    explanation: "strip() メソッドは文字列の前後にある空白文字（スペース、タブ、改行）を除去します。lstrip() は左側のみ、rstrip() は右側のみ除去します。",
  },
  {
    question: "f文字列で変数を埋め込む正しい書き方はどれですか？",
    options: [
      '"名前: " + name',
      'f"名前: {name}"',
      '"名前: %s" % name',
      '"名前: {}".format(name)',
    ],
    answer: 1,
    explanation: "f文字列はPython 3.6以降で使える書き方で、f\"...{変数}...\" の形式で変数を埋め込めます。最も読みやすく推奨される方法です。",
  },
  {
    question: "'a,b,c'.split(',') の結果はどれですか？",
    options: ["'abc'", "('a', 'b', 'c')", "['a', 'b', 'c']", "{'a', 'b', 'c'}"],
    answer: 2,
    explanation: "split() は文字列を指定した区切り文字で分割し、リストを返します。'a,b,c'.split(',') は ['a', 'b', 'c'] を返します。",
  },
  {
    question: "文字列をUTF-8でエンコードするには？",
    options: [
      "s.encode('utf-8')",
      "encode(s, 'utf-8')",
      "s.to_bytes('utf-8')",
      "utf8(s)",
    ],
    answer: 0,
    explanation: "文字列の encode() メソッドに文字コードを指定することでバイト列に変換できます。逆にバイト列から文字列に戻すには decode() を使います。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">文字列操作</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400 mt-2">
          Pythonの文字列を自在に操る方法を学びます。メソッド、フォーマット、f文字列、分割・結合、エンコーディングまで網羅します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="pink" categoryId="strings" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">このカテゴリで学ぶこと</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "文字列メソッド", desc: "upper・lower・strip・replace", icon: "🔤" },
            { title: "文字列フォーマット", desc: "%演算子とformat()の使い方", icon: "📝" },
            { title: "f文字列", desc: "最新の埋め込み記法をマスター", icon: "⚡" },
            { title: "split・join", desc: "分割と結合の実用テクニック", icon: "✂️" },
            { title: "エンコーディング", desc: "UTF-8とbytesの扱い方", icon: "🌍" },
            { title: "実践演習", desc: "テキスト処理の総合問題", icon: "🎯" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">文字列メソッドを試してみよう</h2>
        <PythonPlayground
          defaultCode={`# 文字列メソッドの基本
text = "  Hello, Python World!  "

print(text.upper())          # 大文字
print(text.lower())          # 小文字
print(text.strip())          # 前後の空白除去
print(text.strip().replace("Python", "Pythonista"))

# 検索と確認
sentence = "Pythonは最高のプログラミング言語です"
print("Python" in sentence)
print(sentence.startswith("Python"))
print(sentence.count("の"))`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">f文字列の活用</h2>
        <PythonPlayground
          defaultCode={`# f文字列（f-string）
name = "田中太郎"
age = 25
score = 98.5

# 基本的な埋め込み
print(f"名前: {name}")
print(f"年齢: {age}歳")

# 式の評価
print(f"来年は{age + 1}歳")

# 書式指定
print(f"スコア: {score:.1f}点")
print(f"パーセント: {score / 100:.1%}")

# 幅指定・左右揃え
for i, fruit in enumerate(["りんご", "バナナ", "みかん"], 1):
    print(f"{i:2}. {fruit:<6} ✓")`}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
