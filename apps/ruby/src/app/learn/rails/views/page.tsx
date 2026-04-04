import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビュー</h1>
        <p className="text-gray-400">ERBテンプレート、パーシャル、レイアウトを使ったビュー構築を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ERBテンプレートの基本</h2>
        <p className="text-gray-300 mb-3">
          ERB（Embedded Ruby）はHTMLにRubyコードを埋め込むためのテンプレートエンジンです。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">&lt;%= %&gt;</code> — 式を評価してHTMLに出力</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">&lt;% %&gt;</code> — 式を評価するが出力しない</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">render 'partial'</code> — パーシャルの読み込み</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">application.html.erb</code> — 共通レイアウト</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ERBタグの使い方</h2>
        <RubyEditor
          defaultCode={`require 'erb'

# ERBテンプレートのシミュレーション
template = <<~ERB
  <h1><%= title %></h1>
  <ul>
  <% items.each do |item| %>
    <li><%= item %></li>
  <% end %>
  </ul>
  <p>合計: <%= items.length %>件</p>
ERB

# テンプレートに渡す変数
title = "Rubyの特徴"
items = ["動的型付け", "オブジェクト指向", "ブロック・クロージャ"]

result = ERB.new(template).result(binding)
puts result`}
          expectedOutput={`<h1>Rubyの特徴</h1>
<ul>
  <li>動的型付け</li>
  <li>オブジェクト指向</li>
  <li>ブロック・クロージャ</li>
</ul>
<p>合計: 3件</p>`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: パーシャルとヘルパー</h2>
        <RubyEditor
          defaultCode={`require 'erb'

# パーシャルテンプレート（_post.erb相当）
post_partial = '<div class="post"><h2><%= post[:title] %></h2><p><%= post[:body] %></p></div>'

# ヘルパーメソッドの例
def truncate(text, length: 30)
  text.length > length ? text[0...length] + "..." : text
end

def link_to(text, path)
  "<a href=\"#{path}\">#{text}</a>"
end

posts = [
  { title: "Rails入門", body: "Ruby on Railsの基本的な使い方を学びます。初心者向けです。" },
  { title: "Active Record", body: "データベース操作をRubyで行う方法です。" },
]

posts.each do |post|
  puts "タイトル: #{post[:title]}"
  puts "本文: #{truncate(post[:body], length: 20)}"
  puts "リンク: #{link_to('詳細', '/posts/1')}"
  puts
end`}
          expectedOutput={`タイトル: Rails入門
本文: Ruby on Railsの基本的な使い...
リンク: <a href="/posts/1">詳細</a>

タイトル: Active Record
本文: データベース操作をRubyで行う方...
リンク: <a href="/posts/1">詳細</a>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="views" />
      </div>
      <LessonNav lessons={lessons} currentId="views" basePath="/learn/rails" />
    </div>
  );
}
