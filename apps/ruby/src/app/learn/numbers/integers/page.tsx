import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "numbers")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">数値と演算 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">整数</h1>
        <p className="text-gray-400">Ruby の Integer クラスの特徴と便利なメソッドを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Integer クラスの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Ruby の整数は任意精度（Bignum）をサポートしており、桁数制限がありません。整数オブジェクトはメソッドを持ち、times・upto・downto などのイテレーションメソッドが使えます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">times</code>: 0 から n-1 回繰り返す</li>
          <li><code className="text-green-400">upto(n)</code>: 自身から n まで昇順に</li>
          <li><code className="text-green-400">downto(n)</code>: 自身から n まで降順に</li>
          <li><code className="text-green-400">even?</code> / <code className="text-green-400">odd?</code>: 偶数・奇数判定</li>
          <li><code className="text-green-400">to_s(base)</code>: 基数変換（2進数、16進数など）</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">イテレーションメソッド</h2>
        <RubyEditor
          defaultCode={`# times: 0から(n-1)まで
3.times { |i| puts "times: #{i}" }

# upto: 昇順
1.upto(5) { |i| print "#{i} " }
puts

# downto: 降順
5.downto(1) { |i| print "#{i} " }
puts

# step: ステップ指定
1.step(10, 2) { |i| print "#{i} " }
puts`}
          expectedOutput={`times: 0
times: 1
times: 2
1 2 3 4 5
5 4 3 2 1
1 3 5 7 9`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">整数の演算と基数変換</h2>
        <RubyEditor
          defaultCode={`# 演算子
puts 17 / 5
puts 17 % 5
puts 2 ** 10
puts -7.abs

# 判定メソッド
puts 42.even?
puts 7.odd?
puts 0.zero?

# 基数変換
puts 255.to_s(16)
puts 255.to_s(2)
puts 0b11111111`}
          expectedOutput={`3
2
1024
7
true
true
true
ff
11111111
255`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="numbers" lessonId="integers" />
      </div>
      <LessonNav lessons={lessons} currentId="integers" basePath="/learn/numbers" />
    </div>
  );
}
