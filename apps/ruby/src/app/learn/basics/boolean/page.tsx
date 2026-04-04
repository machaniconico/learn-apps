import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">Rubyのtrue・false・nilと真偽値の扱いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyの真偽値の特徴</h2>
        <p className="text-gray-300 mb-4">
          Rubyでは <code className="bg-gray-800 px-1 rounded text-blue-300">nil</code> と{" "}
          <code className="bg-gray-800 px-1 rounded text-blue-300">false</code> だけが偽（falsy）です。
          それ以外はすべて真（truthy）です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><span className="text-red-400 font-semibold">偽（falsy）:</span> <code className="bg-gray-800 px-1.5 py-0.5 rounded">nil</code>, <code className="bg-gray-800 px-1.5 py-0.5 rounded">false</code></li>
          <li><span className="text-green-400 font-semibold">真（truthy）:</span> <code className="bg-gray-800 px-1.5 py-0.5 rounded">0</code>, <code className="bg-gray-800 px-1.5 py-0.5 rounded">{`""`}</code>, <code className="bg-gray-800 px-1.5 py-0.5 rounded">[]</code>, <code className="bg-gray-800 px-1.5 py-0.5 rounded">{`{}`}</code> など（他言語と異なる！）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: true・false・nil</h2>
        <RubyEditor
          defaultCode={`# trueとfalseのクラス
puts true.class   # TrueClass
puts false.class  # FalseClass
puts nil.class    # NilClass

# 論理演算
puts true && false  # false
puts true || false  # true
puts !true          # false

# and, or, not (優先度が低い別名)
puts true and false  # true (and は = より優先度低)
result = true && false
puts result  # false`}
          expectedOutput={`TrueClass
FalseClass
NilClass
false
true
false
true
false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Rubyの真偽値の特徴</h2>
        <RubyEditor
          defaultCode={`# 偽になるのはnilとfalseだけ
values = [nil, false, 0, "", [], {}, 0.0]

values.each do |v|
  if v
    puts "#{v.inspect} => 真"
  else
    puts "#{v.inspect} => 偽"
  end
end`}
          expectedOutput={`nil => 偽
false => 偽
0 => 真
"" => 真
[] => 真
{} => 真
0.0 => 真`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 条件付き代入と安全な参照</h2>
        <RubyEditor
          defaultCode={`# ||= : nilまたはfalseの場合のみ代入
name = nil
name ||= "デフォルト名"
puts name  # デフォルト名

name ||= "別の名前"
puts name  # デフォルト名 (変わらない)

# &&= : 真の場合のみ代入
value = 10
value &&= value * 2
puts value  # 20

nil_val = nil
nil_val &&= nil_val * 2
puts nil_val.inspect  # nil (nilのまま)`}
          expectedOutput={`デフォルト名
デフォルト名
20
nil`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}
