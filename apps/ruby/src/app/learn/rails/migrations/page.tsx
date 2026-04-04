import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マイグレーション</h1>
        <p className="text-gray-400">データベーススキーマをRubyコードで管理するマイグレーションを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マイグレーションとは</h2>
        <p className="text-gray-300 mb-3">
          マイグレーションはデータベーススキーマの変更をRubyコードで記述し、バージョン管理する仕組みです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">rails generate migration AddTitleToPosts title:string</code> — マイグレーション生成</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">rails db:migrate</code> — マイグレーション実行</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">rails db:rollback</code> — 直前のマイグレーションを取り消し</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">create_table</code> / <code className="bg-gray-800 px-1 rounded text-red-300">add_column</code> / <code className="bg-gray-800 px-1 rounded text-red-300">remove_column</code> — スキーマ操作</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: マイグレーションファイルの構造</h2>
        <RubyEditor
          defaultCode={`# マイグレーションの操作を擬似的にシミュレート
class Migration
  attr_reader :schema

  def initialize
    @schema = {}
    @version = 0
  end

  def create_table(name, &block)
    @schema[name] = { columns: { id: :integer } }
    puts "テーブル作成: #{name}"
    block.call(TableDef.new(@schema[name]))
  end

  def add_column(table, column, type)
    @schema[table][:columns][column] = type
    puts "カラム追加: #{table}.#{column} (#{type})"
  end
end

class TableDef
  def initialize(table)
    @table = table
  end

  def string(name, **opts)
    @table[:columns][name] = :string
    puts "  + #{name}: string"
  end

  def text(name, **opts)
    @table[:columns][name] = :text
    puts "  + #{name}: text"
  end

  def timestamps
    @table[:columns][:created_at] = :datetime
    @table[:columns][:updated_at] = :datetime
    puts "  + timestamps"
  end
end

m = Migration.new
m.create_table(:posts) do |t|
  t.string :title
  t.text :body
  t.timestamps
end
m.add_column(:posts, :published, :boolean)
puts "\nスキーマ: #{m.schema[:posts][:columns].keys.join(', ')}`}
          expectedOutput={`テーブル作成: posts
  + title: string
  + body: text
  + timestamps
カラム追加: posts.published (boolean)

スキーマ: id, title, body, created_at, updated_at, published`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: マイグレーションコマンドの流れ</h2>
        <RubyEditor
          defaultCode={`# マイグレーションのup/downの概念
migrations = [
  {
    version: "20240101000001",
    name: "CreatePosts",
    up: "CREATE TABLE posts (id, title, body, created_at, updated_at)",
    down: "DROP TABLE posts"
  },
  {
    version: "20240101000002",
    name: "AddPublishedToPosts",
    up: "ALTER TABLE posts ADD COLUMN published boolean DEFAULT false",
    down: "ALTER TABLE posts DROP COLUMN published"
  },
  {
    version: "20240101000003",
    name: "AddIndexToPostsTitle",
    up: "CREATE INDEX index_posts_on_title ON posts (title)",
    down: "DROP INDEX index_posts_on_title"
  }
]

puts "rails db:migrate の実行:"
migrations.each do |m|
  puts "  == #{m[:version]} #{m[:name]}: migrating =="
  puts "  -- #{m[:up]}"
end

puts "\nrails db:rollback の実行:"
last = migrations.last
puts "  == #{last[:version]} #{last[:name]}: reverting =="
puts "  -- #{last[:down]}"`}
          expectedOutput={`rails db:migrate の実行:
  == 20240101000001 CreatePosts: migrating ==
  -- CREATE TABLE posts (id, title, body, created_at, updated_at)
  == 20240101000002 AddPublishedToPosts: migrating ==
  -- ALTER TABLE posts ADD COLUMN published boolean DEFAULT false
  == 20240101000003 AddIndexToPostsTitle: migrating ==
  -- CREATE INDEX index_posts_on_title ON posts (title)

rails db:rollback の実行:
  == 20240101000003 AddIndexToPostsTitle: reverting ==
  -- DROP INDEX index_posts_on_title`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="migrations" />
      </div>
      <LessonNav lessons={lessons} currentId="migrations" basePath="/learn/rails" />
    </div>
  );
}
