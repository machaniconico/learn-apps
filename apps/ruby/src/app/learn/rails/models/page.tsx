import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モデル</h1>
        <p className="text-gray-400">Active Recordの基本とバリデーションを使ったモデル定義を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Active Recordの基本</h2>
        <p className="text-gray-300 mb-3">
          Active RecordはORMの一種で、Rubyオブジェクトとデータベーステーブルをマッピングします。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">rails generate model Post title:string body:text</code> — モデル生成</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">validates :title, presence: true</code> — バリデーション</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">Post.find(1)</code> — IDでレコード取得</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">Post.where(published: true)</code> — 条件検索</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: バリデーションの実装</h2>
        <RubyEditor
          defaultCode={`# Active Recordのバリデーション（擬似実装）
class Post
  attr_accessor :title, :body, :published
  attr_reader :errors

  def initialize(attrs = {})
    @title = attrs[:title]
    @body = attrs[:body]
    @published = attrs[:published] || false
    @errors = []
  end

  def valid?
    @errors = []
    @errors << "タイトルは必須です" if @title.nil? || @title.empty?
    @errors << "タイトルは50文字以内です" if @title && @title.length > 50
    @errors << "本文は必須です" if @body.nil? || @body.empty?
    @errors.empty?
  end

  def save
    if valid?
      puts "保存成功: #{@title}"
      true
    else
      puts "保存失敗:"
      @errors.each { |e| puts "  - #{e}" }
      false
    end
  end
end

# 有効なpost
p1 = Post.new(title: "Railsガイド", body: "内容です")
p1.save

# 無効なpost
p2 = Post.new(title: "", body: "")
p2.save`}
          expectedOutput={`保存成功: Railsガイド
保存失敗:
  - タイトルは必須です
  - 本文は必須です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Active Recordのクエリメソッド</h2>
        <RubyEditor
          defaultCode={`# Active Recordのクエリ（擬似実装）
class MockDB
  def self.all
    [
      { id: 1, title: "Ruby入門", published: true },
      { id: 2, title: "Rails入門", published: true },
      { id: 3, title: "下書き", published: false },
    ]
  end

  def self.find(id)
    all.find { |r| r[:id] == id }
  end

  def self.where(condition)
    key, val = condition.first
    all.select { |r| r[key] == val }
  end
end

# Post.all に相当
puts "全投稿:"
MockDB.all.each { |p| puts "  [#{p[:id]}] #{p[:title]}" }

# Post.find(1) に相当
puts "\nID=1の投稿:"
puts "  #{MockDB.find(1)[:title]}"

# Post.where(published: true) に相当
puts "\n公開済みの投稿:"
MockDB.where(published: true).each { |p| puts "  #{p[:title]}" }`}
          expectedOutput={`全投稿:
  [1] Ruby入門
  [2] Rails入門
  [3] 下書き

ID=1の投稿:
  Ruby入門

公開済みの投稿:
  Ruby入門
  Rails入門`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="models" />
      </div>
      <LessonNav lessons={lessons} currentId="models" basePath="/learn/rails" />
    </div>
  );
}
