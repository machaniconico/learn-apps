import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "arrays")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">要素操作</h1>
        <p className="text-gray-400">配列への要素の追加・削除・更新を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">追加・削除メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyの配列はスタックとキューの両方として使えます。末尾操作には push/pop、先頭操作には unshift/shift を使います。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">push</code> / <code className="text-green-400">&lt;&lt;</code>: 末尾に追加</li>
          <li><code className="text-green-400">pop</code>: 末尾から取り出し</li>
          <li><code className="text-green-400">unshift</code>: 先頭に追加</li>
          <li><code className="text-green-400">shift</code>: 先頭から取り出し</li>
          <li><code className="text-green-400">delete</code> / <code className="text-green-400">delete_at</code>: 要素を削除</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">push / pop / shift / unshift</h2>
        <RubyEditor
          defaultCode={`arr = [2, 3, 4]

# 末尾に追加
arr.push(5)
arr << 6
puts arr.inspect

# 末尾から取り出し
last = arr.pop
puts last
puts arr.inspect

# 先頭に追加
arr.unshift(1)
puts arr.inspect

# 先頭から取り出し
first = arr.shift
puts first
puts arr.inspect`}
          expectedOutput={`[2, 3, 4, 5, 6]
6
[2, 3, 4, 5]
[1, 2, 3, 4, 5]
1
[2, 3, 4, 5]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">削除と更新</h2>
        <RubyEditor
          defaultCode={`arr = [1, 2, 3, 2, 4, 2]

# 値で削除（全て）
arr.delete(2)
puts arr.inspect

# インデックスで削除
arr.delete_at(1)
puts arr.inspect

# 要素の更新
arr[0] = 10
puts arr.inspect

# concat で結合
arr.concat([5, 6])
puts arr.inspect`}
          expectedOutput={`[1, 3, 4]
[1, 4]
[10, 4]
[10, 4, 5, 6]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="operations" />
      </div>
      <LessonNav lessons={lessons} currentId="operations" basePath="/learn/arrays" />
    </div>
  );
}
