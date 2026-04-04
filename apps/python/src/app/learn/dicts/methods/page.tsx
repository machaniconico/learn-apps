import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">辞書・集合 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">辞書のメソッド</h1>
        <p className="text-gray-400">keys・values・items・get など辞書操作メソッドを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">主要なメソッド一覧</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="space-y-3 text-sm">
            {[
              ["keys()", "すべてのキーを返す"],
              ["values()", "すべての値を返す"],
              ["items()", "キーと値のペアを返す"],
              ["get(key, default)", "キーで値を取得（なければデフォルト値）"],
              ["setdefault(key, default)", "キーがなければデフォルト値をセットして返す"],
              ["pop(key, default)", "キーの値を取り出して削除する"],
              ["update(other)", "別の辞書で値を一括更新する"],
              ["clear()", "すべての要素を削除する"],
            ].map(([method, desc]) => (
              <div key={method} className="flex gap-3">
                <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">{method}</code>
                <span className="text-gray-300">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <PythonPlayground
          defaultCode={`scores = {"田中": 90, "鈴木": 85, "佐藤": 92, "山田": 78}

# keys・values・items
print("キー:", list(scores.keys()))
print("値:", list(scores.values()))
print("ペア:", list(scores.items()))

# forループで使う
for name, score in scores.items():
    print(f"  {name}: {score}点")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">get() と setdefault()</h2>
        <PythonPlayground
          defaultCode={`config = {"host": "localhost", "port": 8080}

# get(): キーがなくても安全にアクセス
host = config.get("host")
timeout = config.get("timeout", 30)  # なければデフォルト値
print(f"host: {host}")
print(f"timeout: {timeout}")

# setdefault(): なければセットして返す
config.setdefault("debug", False)
config.setdefault("host", "example.com")  # すでにあれば変更しない
print(config)

# 集計パターン（setdefaultの活用）
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = {}
for word in words:
    count.setdefault(word, 0)
    count[word] += 1
print("単語カウント:", count)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">辞書のループとソート</h2>
        <PythonPlayground
          defaultCode={`scores = {"田中": 90, "鈴木": 85, "佐藤": 92, "山田": 78, "中村": 95}

# 値でソート（降順）
sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
print("成績順:")
for rank, (name, score) in enumerate(sorted_scores, start=1):
    print(f"  {rank}位: {name} ({score}点)")

# キーでソート
sorted_by_name = dict(sorted(scores.items()))
print("\n名前順:", sorted_by_name)

# 最大・最小
best = max(scores, key=scores.get)
worst = min(scores, key=scores.get)
print(f"\n最高: {best} ({scores[best]}点)")
print(f"最低: {worst} ({scores[worst]}点)")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="dicts" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/dicts" />
    </div>
  );
}
