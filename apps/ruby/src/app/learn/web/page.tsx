import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "web")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rackアプリケーションのcallメソッドはどのオブジェクトを返しますか？",
    options: ["Stringオブジェクト", "[status, headers, body]の配列", "Hashオブジェクト", "nilオブジェクト"],
    answer: 1,
    explanation: "Rackアプリはcall(env)を受け取り、[ステータスコード, ヘッダHash, ボディ]の3要素配列を返します。",
  },
  {
    question: "SinatraでGETリクエストを処理するメソッドはどれですか？",
    options: ["route :get", "handle_get", "get", "on_get"],
    answer: 2,
    explanation: "Sinatraではget '/path' { } でGETリクエストを処理します。",
  },
  {
    question: "HTTPステータスコード201が意味するのはどれですか？",
    options: ["OK", "Created", "Not Found", "Internal Server Error"],
    answer: 1,
    explanation: "201 Createdはリソースが正常に作成されたことを示します。",
  },
  {
    question: "RubyでJSONを解析するメソッドはどれですか？",
    options: ["JSON.decode", "JSON.parse", "JSON.load_str", "JSON.from_string"],
    answer: 1,
    explanation: "JSON.parse(string)でJSON文字列をRubyのHashや配列に変換します。",
  },
];

export default function WebPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Web開発基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          RubyによるWeb開発の基礎を学びます。RackインターフェースからSinatraによる軽量Webアプリ、HTTP基本、JSON API開発、WebSocketまで、Webプログラミングの核心を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="web" totalLessons={6} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/web" color="blue" categoryId="web" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">JSON処理を試してみよう</h2>
        <RubyEditor
          defaultCode={`require 'json'

# JSONの生成
data = {
  name: "Ruby",
  version: 3.2,
  features: ["blocks", "metaprogramming", "GC"]
}

json_str = JSON.generate(data)
puts json_str

# JSONの解析
parsed = JSON.parse(json_str)
puts parsed["name"]
puts parsed["features"].length`}
          expectedOutput={`{"name":"Ruby","version":3.2,"features":["blocks","metaprogramming","GC"]}
Ruby
3`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="blue" />
      </section>
    </div>
  );
}
