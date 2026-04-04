import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

export default function BeginRescuePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-orange-400">例外処理</p>
        <h1 className="text-3xl font-bold text-gray-100">begin-rescue</h1>
        <p className="text-gray-400">
          Rubyの例外処理の基本構文であるbegin/rescue/endブロックを学びます。エラーが発生したときに安全にプログラムを続行する方法を理解しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">begin/rescue/end の基本</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">begin</code> ブロック内でエラーが発生すると、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue</code> ブロックに処理が移ります。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue ExceptionClass =&gt; e</code> の形で
          例外オブジェクトを変数 <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">e</code> に束縛できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 基本的なbegin/rescue
begin
  puts "処理を開始します"
  result = 10 / 0   # ZeroDivisionErrorが発生
  puts "この行は実行されません"
rescue ZeroDivisionError => e
  puts "エラーが発生しました: #{e.message}"
end

puts "プログラムは続きます"`}
        expectedOutput={`処理を開始します
エラーが発生しました: divided by 0
プログラムは続きます`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">rescue StandardError</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">StandardError</code> を指定すると、
          多くの一般的なエラーをまとめてキャッチできます。クラス名を省略した <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue</code> も
          StandardErrorをキャッチします。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 複数のrescueブロック
def parse_number(str)
  begin
    Integer(str)
  rescue ArgumentError => e
    puts "ArgumentError: #{e.message}"
    nil
  rescue TypeError => e
    puts "TypeError: #{e.message}"
    nil
  end
end

puts parse_number("42")
puts parse_number("abc").inspect
puts parse_number(nil).inspect`}
        expectedOutput={`42
ArgumentError: invalid value for Integer(): "abc"
TypeError: can't convert nil into Integer
`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">メソッド内のrescue</h2>
        <p className="text-gray-400 text-sm">
          メソッド定義の中でbeginを省略してrescueを使うことができます。メソッド全体がbegin/endの役割を担います。
        </p>
      </div>

      <RubyEditor
        defaultCode={`def safe_divide(a, b)
  a / b
rescue ZeroDivisionError
  puts "0で割ることはできません"
  0
end

puts safe_divide(10, 2)
puts safe_divide(10, 0)
puts safe_divide(15, 3)`}
        expectedOutput={`5
0で割ることはできません
0
5`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="exceptions" lessonId="begin-rescue" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="begin-rescue"
        basePath="/learn/exceptions"
      />
    </div>
  );
}
