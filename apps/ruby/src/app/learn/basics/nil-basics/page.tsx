import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function NilBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">nilの基本</h1>
        <p className="text-gray-400">Rubyのnilの特性・判定・安全な扱い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">nilとは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-blue-300">nil</code> はRubyで「値が存在しない」ことを表す特別なオブジェクトです。
          NilClassの唯一のインスタンスで、falseと並んでRubyの唯二の偽値です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>初期化されていないインスタンス変数は <code className="bg-gray-800 px-1.5 py-0.5 rounded">nil</code></li>
          <li>ハッシュの存在しないキーへのアクセスは <code className="bg-gray-800 px-1.5 py-0.5 rounded">nil</code></li>
          <li>配列の範囲外アクセスは <code className="bg-gray-800 px-1.5 py-0.5 rounded">nil</code></li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">nil.to_i</code> は 0、<code className="bg-gray-800 px-1.5 py-0.5 rounded">nil.to_s</code> は <code className="bg-gray-800 px-1.5 py-0.5 rounded">{`""`}</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: nilの判定</h2>
        <RubyEditor
          defaultCode={`# nil判定
value = nil

puts value.nil?        # true
puts value == nil      # true
puts value.inspect     # nil

# ハッシュの存在しないキー
hash = { name: "Alice" }
puts hash[:name].inspect   # "Alice"
puts hash[:age].inspect    # nil
puts hash[:age].nil?       # true

# 配列の範囲外
arr = [1, 2, 3]
puts arr[0].inspect   # 1
puts arr[10].inspect  # nil`}
          expectedOutput={`true
true
nil
"Alice"
nil
true
1
nil`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: nilの安全な扱い</h2>
        <RubyEditor
          defaultCode={`# &. (安全参照演算子) Ruby 2.3+
user = nil
puts user&.name      # nil (エラーにならない)
puts user&.upcase    # nil

name = "alice"
puts name&.upcase    # ALICE

# || でデフォルト値
def find_user(id)
  nil  # ユーザーが見つからない場合
end

user = find_user(99) || "ゲスト"
puts user  # ゲスト

# to_i, to_s で安全変換
puts nil.to_i   # 0
puts nil.to_s   # "" (空文字)
puts nil.to_a.inspect  # []`}
          expectedOutput={`nil
nil
ALICE
ゲスト
0

[]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: nilチェックのパターン</h2>
        <RubyEditor
          defaultCode={`# 条件チェック
def greet(name)
  if name.nil?
    "名前が指定されていません"
  else
    "こんにちは、#{name}さん！"
  end
end

puts greet("Alice")  # こんにちは、Aliceさん！
puts greet(nil)      # 名前が指定されていません

# compact: nilを除去
arr = [1, nil, 2, nil, 3]
puts arr.compact.inspect  # [1, 2, 3]

# select で非nilだけ取得
puts arr.select { |x| !x.nil? }.inspect  # [1, 2, 3]`}
          expectedOutput={`こんにちは、Aliceさん！
名前が指定されていません
[1, 2, 3]
[1, 2, 3]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="nil-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="nil-basics" basePath="/learn/basics" />
    </div>
  );
}
