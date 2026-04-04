import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "regex")!;

export default function RegexBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-pink-400">正規表現</p>
        <h1 className="text-3xl font-bold text-gray-100">正規表現の基本</h1>
        <p className="text-gray-400">
          Rubyの正規表現リテラル /pattern/ と Regexp.new の使い方を学びます。メタ文字、文字クラス、量指定子など基本的な構文を習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">正規表現リテラル</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">/pattern/</code> がRubyの正規表現リテラルです。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">Regexp.new("pattern")</code> でも同じRegexpオブジェクトを作れます。
          フラグとして <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">i</code>（大小文字無視）、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">m</code>（複数行）、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">x</code>（空白無視）が使えます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 正規表現リテラル
re1 = /hello/
re2 = /hello/i  # 大小文字無視
re3 = Regexp.new("hello", Regexp::IGNORECASE)

puts re1.class
puts re1 === "say hello world"
puts re2 === "Hello World"
puts re3 === "HELLO"

# 基本的なメタ文字
patterns = {
  /\d+/    => "数字1文字以上",
  /\w+/    => "単語文字1文字以上",
  /\s/     => "空白文字",
  /[aeiou]/=> "母音",
  /^Hello/ => "Helloで始まる",
  /Ruby$/  => "Rubyで終わる",
}

str = "Hello Ruby 123"
patterns.each do |pat, desc|
  puts "#{desc}: #{str.match?(pat)}"
end`}
        expectedOutput={`Regexp
true
true
true
数字1文字以上: true
単語文字1文字以上: true
空白文字: true
母音: true
Helloで始まる: true
Rubyで終わる: true`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">文字クラスと量指定子</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">[abc]</code> は文字クラス、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">*</code>（0回以上）、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">+</code>（1回以上）、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">?</code>（0か1回）、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">{"{n,m}"}</code>（n〜m回）が量指定子です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 文字クラス
strings = ["cat", "car", "cap", "cab", "bat", "can"]
matching = strings.select { |s| s.match?(/ca[trp]/) }
puts matching.inspect

# 量指定子
test_strings = ["color", "colour", "clr", "colouur"]
test_strings.each do |s|
  puts "#{s}: #{s.match?(/colou?r/)}"
end

# 数字のパターン
numbers = ["42", "3.14", "100", "3.14.15", "-5", "+100"]
valid_number = /^[+-]?\d+(\.\d+)?$/
numbers.each do |n|
  puts "#{n}: #{n.match?(valid_number)}"
end`}
        expectedOutput={`["cat", "car", "cap"]
color: true
colour: true
clr: false
colouur: false
42: true
3.14: true
100: true
3.14.15: false
-5: true
+100: true`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">アンカーと特殊シーケンス</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">\A</code>（文字列の先頭）、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">\Z</code>（文字列の末尾）、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">\b</code>（単語境界）を使うと精密なマッチングができます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# アンカー
texts = ["Ruby is great", "I love Ruby", "RubyOnRails", "ruby scripting"]

# \b: 単語境界（"Ruby"という単語）
word_ruby = texts.select { |t| t.match?(/\bRuby\b/) }
puts word_ruby.inspect

# \A と \Z: 文字列全体でのマッチ
emails = ["user@example.com", "bad@email", "test.name+tag@domain.co.jp", "not-email"]
email_pattern = /\A[\w.+\-]+@[\w\-]+(\.\w+)+\Z/
emails.each do |e|
  puts "#{e}: #{e.match?(email_pattern)}"
end`}
        expectedOutput={`["Ruby is great", "I love Ruby"]
user@example.com: true
bad@email: false
test.name+tag@domain.co.jp: true
not-email: false`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="regex" lessonId="basics" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="basics"
        basePath="/learn/regex"
      />
    </div>
  );
}
