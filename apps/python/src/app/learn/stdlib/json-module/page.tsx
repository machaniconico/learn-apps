import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function JsonModulePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">jsonモジュール</h1>
        <p className="text-gray-400">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">json</code> モジュールはPythonオブジェクトとJSON形式の文字列を相互変換します。
          Web APIのデータ処理や設定ファイルの読み書きに広く使われます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">型の対応関係</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-gray-400">Python</th>
                <th className="text-left p-3 text-gray-400">JSON</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["dict", "object {}"],
                ["list, tuple", "array []"],
                ["str", "string"],
                ["int, float", "number"],
                ["True / False", "true / false"],
                ["None", "null"],
              ].map(([py, js]) => (
                <tr key={py} className="border-b border-gray-800">
                  <td className="p-3"><code className="text-teal-400 font-mono">{py}</code></td>
                  <td className="p-3"><code className="text-yellow-400 font-mono">{js}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">dumps・loads の基本</h2>
        <PythonPlayground
          defaultCode={`import json

# Python → JSON 文字列（dumps）
data = {
    "ユーザー": "田中太郎",
    "年齢": 28,
    "アクティブ": True,
    "スコア": None,
    "タグ": ["Python", "Web"],
    "住所": {"都市": "東京", "郵便番号": "100-0001"}
}

# ensure_ascii=False で日本語をそのまま出力
json_str = json.dumps(data, ensure_ascii=False, indent=2)
print("=== dumps（Python → JSON）===")
print(json_str)

print()
# JSON 文字列 → Python（loads）
restored = json.loads(json_str)
print("=== loads（JSON → Python）===")
print(f"型: {type(restored)}")
print(f"ユーザー: {restored['ユーザー']}")
print(f"タグ数: {len(restored['タグ'])}")
print(f"都市: {restored['住所']['都市']}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">カスタムエンコーダとファイル操作</h2>
        <PythonPlayground
          defaultCode={`import json
import io
from datetime import date, datetime

# カスタムエンコーダ（date などを直列化）
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (date, datetime)):
            return obj.isoformat()
        return super().default(obj)

data = {
    "event": "Python勉強会",
    "date": date(2024, 4, 1),
    "created_at": datetime(2024, 3, 15, 10, 30)
}

json_str = json.dumps(data, cls=DateEncoder, ensure_ascii=False, indent=2)
print("カスタムエンコーダ:")
print(json_str)

print()
# ファイルへの読み書き（StringIO でシミュレート）
buf = io.StringIO()
json.dump({"key": "value", "nums": [1, 2, 3]}, buf, ensure_ascii=False)
buf.seek(0)
loaded = json.load(buf)
print(f"json.dump/load: {loaded}")

print()
# sort_keys と separators
compact = json.dumps({"b": 2, "a": 1}, sort_keys=True, separators=(",", ":"))
print(f"コンパクト（キーソート）: {compact}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="json-module" />
      </div>
      <LessonNav lessons={lessons} currentId="json-module" basePath="/learn/stdlib" />
    </div>
  );
}
