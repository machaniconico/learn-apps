import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "regex")!;

export default function MatchingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-pink-400">正規表現</p>
        <h1 className="text-3xl font-bold text-gray-100">マッチング</h1>
        <p className="text-gray-400">
          =~演算子、match、match?メソッドによるマッチングを学びます。MatchDataオブジェクトの活用法と各メソッドの使い分けを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">=~ 演算子</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">=~</code> はマッチした位置（0始まり）を返し、マッチしない場合は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">nil</code> を返します。
          副作用としてキャプチャが <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">$1</code>、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">$2</code>... にセットされます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`str = "Ruby 3.2 was released in 2024"

# =~ はマッチ位置を返す
pos = str =~ /\d+\.\d+/
puts "バージョンの位置: #{pos}"

# nilチェック
if str =~ /Python/
  puts "Pythonを含む"
else
  puts "Pythonを含まない"
end

# =~ 後の特殊変数
str =~ /(\w+) (\d+\.\d+)/
puts "$1 = #{$1}"  # 最初のキャプチャ
puts "$2 = #{$2}"  # 2番目のキャプチャ
puts "$& = #{$&}"  # マッチした全体
puts "$' = #{$'}"  # マッチ後の文字列`}
        expectedOutput={`バージョンの位置: 5
Pythonを含まない
$1 = Ruby
$2 = 3.2
$& = Ruby 3.2
$' =  was released in 2024`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">match と MatchData</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">String#match(pattern)</code> は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">MatchData</code> オブジェクトを返します。
          キャプチャグループへのアクセスや詳細なマッチ情報の取得に使います。
        </p>
      </div>

      <RubyEditor
        defaultCode={`str = "Contact: john.doe@example.com or jane@test.org"

# matchはMatchDataを返す
m = str.match(/(\w[\w.]+)@(\w+)\.(\w+)/)

if m
  puts "全体: #{m[0]}"
  puts "ユーザー名: #{m[1]}"
  puts "ドメイン: #{m[2]}"
  puts "TLD: #{m[3]}"
  puts "マッチ開始: #{m.begin(0)}"
  puts "マッチ終了: #{m.end(0)}"
  puts "プレ文字列: #{m.pre_match.strip}"
end`}
        expectedOutput={`全体: john.doe@example.com
ユーザー名: john.doe
ドメイン: example
TLD: com
マッチ開始: 9
マッチ終了: 29
プレ文字列: Contact:`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">match? で真偽値チェック</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">match?</code> はRuby 2.4で追加されたメソッドです。
          MatchDataを生成しないため高速で、マッチするかどうかだけを知りたい場合に最適です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# match? の活用例（バリデーション）
def valid_username?(username)
  username.match?(/\A[a-zA-Z][a-zA-Z0-9_]{2,19}\Z/)
end

def valid_phone?(phone)
  phone.match?(/\A0\d{1,4}-\d{1,4}-\d{4}\Z/)
end

def valid_postal_code?(code)
  code.match?(/\A\d{3}-\d{4}\Z/)
end

usernames = ["alice", "a", "alice_123", "123abc", "very_long_username_here!"]
usernames.each { |u| puts "#{u}: #{valid_username?(u)}" }

puts "---"
phones = ["090-1234-5678", "03-123-4567", "invalid"]
phones.each { |p| puts "#{p}: #{valid_phone?(p)}" }

puts "---"
codes = ["123-4567", "1234567", "12-34567"]
codes.each { |c| puts "#{c}: #{valid_postal_code?(c)}" }`}
        expectedOutput={`alice: false
a: false
alice_123: true
123abc: false
very_long_username_here!: false
---
090-1234-5678: true
03-123-4567: false
invalid: false
---
123-4567: true
1234567: false
12-34567: false`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="regex" lessonId="matching" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="matching"
        basePath="/learn/regex"
      />
    </div>
  );
}
