import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">MVC概要</h1>
        <p className="text-gray-400">RailsのModel-View-Controllerアーキテクチャとディレクトリ構造を理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">MVCアーキテクチャとは</h2>
        <p className="text-gray-300 mb-3">
          RailsはMVC（Model-View-Controller）パターンを採用しています。各コンポーネントが明確な責務を持ちます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">Model</code> — データとビジネスロジック（Active Record）</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">View</code> — UIの表示（ERBテンプレート）</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">Controller</code> — リクエスト処理と橋渡し</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Railsのディレクトリ構造</h2>
        <p className="text-gray-300 mb-3">
          Convention over Configuration（CoC）により、ファイルを決まった場所に置くだけで動作します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">app/models/</code> — モデルクラス</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">app/views/</code> — ERBテンプレート</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">app/controllers/</code> — コントローラクラス</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">config/routes.rb</code> — URLルーティング</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">db/migrate/</code> — マイグレーションファイル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: MVCの役割分担（擬似コード）</h2>
        <RubyEditor
          defaultCode={`# Model: データとロジック
class Article
  attr_accessor :title, :body

  def initialize(title, body)
    @title = title
    @body = body
  end

  def summary
    @body[0..50] + "..."
  end
end

# Controller: リクエスト処理
class ArticlesController
  def show(id)
    @article = Article.new("Rails入門", "Railsは素晴らしいWebフレームワークです。")
    render_view(@article)
  end

  def render_view(article)
    puts "タイトル: #{article.title}"
    puts "概要: #{article.summary}"
  end
end

# リクエストの流れ
controller = ArticlesController.new
controller.show(1)`}
          expectedOutput={`タイトル: Rails入門
概要: Railsは素晴らしいWebフレームワークです。...`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Convention over Configuration</h2>
        <RubyEditor
          defaultCode={`# Railsの命名規則
# クラス名（単数形・PascalCase） -> テーブル名（複数形・snake_case）
conventions = {
  "Article"     => "articles",
  "BlogPost"    => "blog_posts",
  "UserProfile" => "user_profiles",
  "Category"    => "categories"
}

puts "モデル名 -> テーブル名"
conventions.each do |model, table|
  puts "  #{model.ljust(15)} -> #{table}"
end

# コントローラの命名規則
puts "\nコントローラの命名規則:"
puts "  ArticlesController -> /articles"
puts "  UsersController    -> /users"`}
          expectedOutput={`モデル名 -> テーブル名
  Article         -> articles
  BlogPost        -> blog_posts
  UserProfile     -> user_profiles
  Category        -> categories

コントローラの命名規則:
  ArticlesController -> /articles
  UsersController    -> /users`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="mvc" />
      </div>
      <LessonNav lessons={lessons} currentId="mvc" basePath="/learn/rails" />
    </div>
  );
}
