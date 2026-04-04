import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列フォーマット</h1>
        <p className="text-gray-400">%演算子と format() による文字列の書式設定を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">% 演算子によるフォーマット（古い方式）</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 text-sm mb-3">
            C言語由来の書式指定子を使う方式です。現在も動作しますが、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">format()</code> や f文字列が推奨されています。
          </p>
          <div className="space-y-2 text-sm">
            {[
              ["%s", "文字列"],
              ["%d", "整数"],
              ["%f", "浮動小数点数"],
              ["%.2f", "小数点以下2桁"],
              ["%10s", "10文字幅で右揃え"],
              ["%-10s", "10文字幅で左揃え"],
            ].map(([spec, desc]) => (
              <div key={spec} className="flex gap-3">
                <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">{spec}</code>
                <span className="text-gray-300">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <PythonPlayground
          defaultCode={`name = "田中"
age = 25
score = 98.567

# % 演算子
print("名前: %s" % name)
print("年齢: %d歳" % age)
print("スコア: %.2f点" % score)

# 複数の値
print("%s は %d歳で、スコアは %.1f点です" % (name, age, score))

# 幅指定
for i in range(1, 4):
    print("No.%2d: %s" % (i, "サンプル"))`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">str.format() メソッド</h2>
        <p className="text-gray-400 mb-4">
          Python 3で導入された <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">format()</code> は位置・名前・書式指定を柔軟に使えます。
        </p>
        <PythonPlayground
          defaultCode={`# 位置で指定
print("{}は{}歳です".format("田中", 25))
print("{0}と{1}、そして{0}".format("A", "B"))  # 同じ値を再利用

# 名前で指定
print("{name}の点数は{score:.1f}点".format(name="鈴木", score=87.5))

# 書式指定
print("{:10}|{:>10}|{:^10}".format("左揃え", "右揃え", "中央"))
print("{:,}".format(1000000))     # 3桁区切り
print("{:08.2f}".format(3.14))    # ゼロパディング
print("{:.1%}".format(0.856))     # パーセント表示`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="strings" lessonId="formatting" />
      </div>
      <LessonNav lessons={lessons} currentId="formatting" basePath="/learn/strings" />
    </div>
  );
}
