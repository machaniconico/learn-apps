import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Active Record詳解</h1>
        <p className="text-gray-400">アソシエーション（has_many/belongs_to）、スコープ、コールバックを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アソシエーション</h2>
        <p className="text-gray-300 mb-3">
          Active Recordのアソシエーションはモデル間の関連を宣言的に定義します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">has_many :comments</code> — 1対多の関連（親側）</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">belongs_to :post</code> — 1対多の関連（子側）</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">has_many :through</code> — 多対多の関連</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">{"scope :published, -> { where(published: true) }"}</code> — スコープ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: has_many / belongs_toアソシエーション</h2>
        <RubyEditor
          defaultCode={`# アソシエーションの擬似実装
class Post
  attr_accessor :id, :title
  @@all = []

  def initialize(id, title)
    @id = id
    @title = title
    @@all << self
  end

  def self.all = @@all

  # has_many :comments
  def comments
    Comment.all.select { |c| c.post_id == @id }
  end
end

class Comment
  attr_accessor :id, :post_id, :body
  @@all = []

  def initialize(id, post_id, body)
    @id = id
    @post_id = post_id
    @body = body
    @@all << self
  end

  def self.all = @@all

  # belongs_to :post
  def post
    Post.all.find { |p| p.id == @post_id }
  end
end

post = Post.new(1, "Rails入門")
Comment.new(1, 1, "参考になりました！")
Comment.new(2, 1, "わかりやすいです")

puts "投稿: #{post.title}"
puts "コメント数: #{post.comments.length}"
post.comments.each { |c| puts "  - #{c.body}" }
puts "コメントの親: #{post.comments.first.post.title}"`}
          expectedOutput={`投稿: Rails入門
コメント数: 2
  - 参考になりました！
  - わかりやすいです
コメントの親: Rails入門`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: スコープとコールバック</h2>
        <RubyEditor
          defaultCode={`# スコープとコールバックの擬似実装
class Article
  attr_accessor :title, :published, :views, :created_at

  @@all = []

  def initialize(title, published: false)
    @title = title
    @published = published
    @views = 0
    @created_at = Time.now
    before_save
    @@all << self
  end

  def self.all = @@all

  # スコープ: published
  def self.published
    all.select(&:published)
  end

  # スコープ: popular (viewsが100以上)
  def self.popular
    all.select { |a| a.views >= 100 }
  end

  private

  # コールバック: before_save
  def before_save
    @title = @title.strip.capitalize
    puts "before_save: タイトルを正規化 -> #{@title}"
  end
end

Article.new("  rails tutorial  ", published: true)
Article.new("ruby basics", published: true)
Article.new("draft article", published: false)

puts "\n公開済み記事:"
Article.published.each { |a| puts "  #{a.title}" }

puts "\n全記事数: #{Article.all.length}"`}
          expectedOutput={`before_save: タイトルを正規化 -> Rails tutorial
before_save: タイトルを正規化 -> Ruby basics
before_save: タイトルを正規化 -> Draft article

公開済み記事:
  Rails tutorial
  Ruby basics

全記事数: 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="active-record" />
      </div>
      <LessonNav lessons={lessons} currentId="active-record" basePath="/learn/rails" />
    </div>
  );
}
