import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "hashes")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyでハッシュを作成する正しい方法はどれですか？",
    options: ['{"key" => "value"}', "[key: value]", "(key, value)", "key = value"],
    answer: 0,
    explanation: 'ハッシュは {} で作成し、=> でキーと値を結びつけます。シンボルキーなら {key: value} も使えます。',
  },
  {
    question: "ハッシュからキーを削除するメソッドはどれですか？",
    options: ["remove", "delete", "pop", "shift"],
    answer: 1,
    explanation: "delete(key) でハッシュからキーと値のペアを削除できます。",
  },
  {
    question: "2つのハッシュを結合するメソッドはどれですか？",
    options: ["concat", "join", "merge", "combine"],
    answer: 2,
    explanation: "merge は2つのハッシュを結合した新しいハッシュを返します。merge! は破壊的に変更します。",
  },
  {
    question: "Hash.new(0) の動作として正しいのはどれですか？",
    options: [
      "サイズ0のハッシュを作る",
      "存在しないキーへのアクセスで0を返す",
      "全ての値を0にする",
      "エラーを発生させる",
    ],
    answer: 1,
    explanation: "Hash.new(default) はデフォルト値を設定し、存在しないキーにアクセスしたときその値を返します。",
  },
];

export default function HashesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">ハッシュ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ハッシュはキーと値のペアを格納するデータ構造です。{} リテラルでの作成、merge による結合、each/map/select による走査、シンボルキーの活用、ネストしたハッシュ、Hash.new によるデフォルト値設定まで学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="hashes" totalLessons={6} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/hashes" color="red" categoryId="hashes" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">ハッシュの基本を試してみよう</h2>
        <RubyEditor
          defaultCode={`# ハッシュの作成
person = { name: "Alice", age: 30, city: "Tokyo" }
puts person[:name]
puts person[:age]

# キーの追加
person[:email] = "alice@example.com"
puts person.keys.inspect

# merge
defaults = { role: "user", active: true }
merged = defaults.merge(person)
puts merged[:role]`}
          expectedOutput={`Alice
30
[:name, :age, :city, :email]
user`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="red" />
      </section>
    </div>
  );
}
