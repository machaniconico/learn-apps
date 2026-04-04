import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">辞書・集合 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">辞書の基本</h1>
        <p className="text-gray-400">キーと値のペアでデータを管理する辞書の使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">辞書とは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            辞書（<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">dict</code>）はキー（key）と値（value）のペアでデータを管理するデータ構造です。
            波括弧 <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> を使って作成します。
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• キーによる高速な値の取得が可能</li>
            <li>• キーはイミュータブル（変更不可能）なオブジェクトのみ</li>
            <li>• Python 3.7以降、挿入順序が保持される</li>
            <li>• 要素の追加・変更・削除が可能（ミュータブル）</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`# 辞書の作成
person = {
    "name": "田中太郎",
    "age": 25,
    "city": "東京",
    "hobbies": ["読書", "ゲーム"]
}

# キーでアクセス
print(person["name"])
print(person["age"])

# キーの存在確認
print("name" in person)
print("email" in person)

# dict() コンストラクタでも作成できる
config = dict(host="localhost", port=8080, debug=True)
print(config)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">辞書の更新と削除</h2>
        <PythonPlayground
          defaultCode={`person = {"name": "田中", "age": 25}

# 要素の追加
person["email"] = "tanaka@example.com"
print("追加後:", person)

# 要素の更新
person["age"] = 26
print("更新後:", person)

# 要素の削除
del person["email"]
print("削除後:", person)

# pop() で取り出して削除
age = person.pop("age")
print("取り出した値:", age)
print("pop後:", person)

# update() で一括更新
person.update({"age": 27, "city": "大阪", "score": 95})
print("update後:", person)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="dicts" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/dicts" />
    </div>
  );
}
