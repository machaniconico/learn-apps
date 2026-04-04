import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function UnlessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">unless文</h1>
        <p className="text-gray-400">「〜でなければ」を表すunlessでコードをより自然に書きましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">unlessとは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-cyan-300">unless</code> は
          <code className="bg-gray-800 px-1 rounded">if !</code> と同等です。
          条件が<strong>偽</strong>のときにブロックが実行されます。
          否定条件を自然な英語のように読めるのがメリットです。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">unless 条件</code> は <code className="bg-gray-800 px-1.5 py-0.5 rounded">if !条件</code> と同じ</li>
          <li>unlessにelsifは使えない（elseは使える）</li>
          <li>後置unless: <code className="bg-gray-800 px-1.5 py-0.5 rounded">式 unless 条件</code></li>
          <li>複雑な否定条件ではunlessより!ifが明確な場合も</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なunless</h2>
        <RubyEditor
          defaultCode={`# unless の基本
logged_in = false

unless logged_in
  puts "ログインしてください"
end

# if ! と同等
if !logged_in
  puts "ログインしてください（if!版）"
end

# unlessにelseを使う
admin = false
unless admin
  puts "一般ユーザーです"
else
  puts "管理者です"
end`}
          expectedOutput={`ログインしてください
ログインしてください（if!版）
一般ユーザーです`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 後置unless</h2>
        <RubyEditor
          defaultCode={`# 後置unless (一行表記)
password = "secret123"

puts "パスワードが必要です" unless password
puts "パスワードが短すぎます" unless password.length >= 8

# nilチェックに便利
name = nil
puts "名前を入力してください" unless name

name = "Alice"
puts "こんにちは、#{name}！" unless name.nil?

# 配列が空でない場合のみ処理
items = ["apple", "banana"]
puts "アイテム: #{items.join(', ')}" unless items.empty?`}
          expectedOutput={`パスワードが短すぎます
名前を入力してください
こんにちは、Alice！
アイテム: apple, banana`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: unlessの実用的なパターン</h2>
        <RubyEditor
          defaultCode={`def process_order(order)
  unless order[:items].empty?
    total = order[:items].sum { |item| item[:price] }
    puts "注文合計: #{total}円"
  end

  unless order[:discount].nil?
    puts "割引適用: #{order[:discount]}%"
  end
end

order = {
  items: [
    { name: "リンゴ", price: 100 },
    { name: "バナナ", price: 80 },
    { name: "チェリー", price: 200 },
  ],
  discount: 10
}

process_order(order)

# 空の注文
empty_order = { items: [], discount: nil }
process_order(empty_order)
puts "空の注文: 処理なし"`}
          expectedOutput={`注文合計: 380円
割引適用: 10%
空の注文: 処理なし`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="unless" />
      </div>
      <LessonNav lessons={lessons} currentId="unless" basePath="/learn/control" />
    </div>
  );
}
