import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "rails")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "RailsのMVCにおいて、ビジネスロジックを担当するのはどれですか？",
    options: ["View", "Controller", "Model", "Router"],
    answer: 2,
    explanation: "ModelはActive Recordを通じてデータとビジネスロジックを管理します。",
  },
  {
    question: "rails generate modelコマンドで作成されないファイルはどれですか？",
    options: ["モデルファイル", "マイグレーションファイル", "コントローラファイル", "テストファイル"],
    answer: 2,
    explanation: "rails generate modelはモデル、マイグレーション、テストを生成しますが、コントローラは生成しません。",
  },
  {
    question: "routes.rbでRESTfulルートを一括定義するメソッドはどれですか？",
    options: ["route :posts", "map :posts", "resources :posts", "rest :posts"],
    answer: 2,
    explanation: "resources :postsでindex/show/new/create/edit/update/destroyの7アクションが定義されます。",
  },
  {
    question: "ERBテンプレートで式を評価して出力するタグはどれですか？",
    options: ["<% %>", "<%= %>", "<%# %>", "<%- %>"],
    answer: 1,
    explanation: "<%= %>は式を評価してHTMLに出力します。<% %>は評価のみで出力しません。",
  },
];

export default function RailsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">Ruby on Rails入門</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Ruby on RailsはMVCアーキテクチャに基づいたWebフレームワークです。Convention over Configurationの思想のもと、ルーティング・コントローラ・モデル・ビュー・マイグレーション・Active Recordを体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="rails" totalLessons={7} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/rails" color="red" categoryId="rails" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Railsの基本を試してみよう</h2>
        <RubyEditor
          defaultCode={`# Active Recordの基本的な使い方（擬似コード）
# モデル定義
class Post
  attr_accessor :title, :body, :created_at

  def initialize(title, body)
    @title = title
    @body = body
    @created_at = Time.now
  end

  def to_s
    "Post: #{@title}"
  end
end

post = Post.new("Hello Rails", "最初の投稿です")
puts post
puts post.title
puts post.created_at`}
          expectedOutput={`Post: Hello Rails
Hello Rails
${new Date().toISOString().split('T')[0]}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="red" />
      </section>
    </div>
  );
}
