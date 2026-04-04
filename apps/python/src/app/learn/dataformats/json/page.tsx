import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dataformats");

export default function JsonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">データ形式 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSON処理</h1>
        <p className="text-gray-400">
          JSONはWebAPIで最もよく使われるデータ形式です。
          Pythonの <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">json</code> モジュールで
          シリアライズ・デシリアライズをマスターしましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">JSONとは？</h2>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-4">
          <p className="text-gray-300 mb-3">
            JSON（JavaScript Object Notation）は軽量なデータ交換フォーマットです。
            人間が読みやすく、機械が解析しやすい構造になっています。
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["オブジェクト", '{ "key": "value" }'],
              ["配列", '[ 1, 2, "three" ]'],
              ["文字列", '"hello"（ダブルクォートのみ）'],
              ["数値", "42, 3.14, -1"],
              ["真偽値", "true, false（小文字）"],
              ["null", "null（Pythonの None）"],
            ].map(([type, example]) => (
              <div key={type} className="flex gap-2">
                <span className="text-blue-400 font-medium shrink-0">{type}:</span>
                <code className="text-gray-400 font-mono text-xs">{example}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Web API のレスポンスを処理する</h2>
        <PythonPlayground
          defaultCode={`import json

# Web API のレスポンス（実際はrequests.get().json()で取得）
api_response = """
{
    "status": "success",
    "data": {
        "users": [
            {
                "id": 1,
                "name": "田中太郎",
                "email": "tanaka@example.com",
                "role": "admin",
                "active": true
            },
            {
                "id": 2,
                "name": "鈴木花子",
                "email": "suzuki@example.com",
                "role": "user",
                "active": false
            }
        ],
        "total": 2,
        "page": 1
    }
}
"""

# JSON をパース
data = json.loads(api_response)
print(f"ステータス: {data['status']}")
print(f"総ユーザー数: {data['data']['total']}")
print()

# ユーザー一覧を処理
users = data["data"]["users"]
active_users = [u for u in users if u["active"]]
print(f"アクティブユーザー数: {len(active_users)}")
for user in users:
    status = "有効" if user["active"] else "無効"
    print(f"  [{status}] {user['name']} ({user['role']})")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">JSON の高度な操作</h2>
        <PythonPlayground
          defaultCode={`import json
from datetime import date, datetime

# カスタムエンコーダ
class AppEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return {"__type__": "date", "value": obj.isoformat()}
        if isinstance(obj, set):
            return {"__type__": "set", "value": sorted(obj)}
        return super().default(obj)

data = {
    "event": "Python勉強会",
    "date": date(2024, 4, 1),
    "tags": {"Python", "プログラミング", "初心者"},
    "attendees": 30,
}

encoded = json.dumps(data, cls=AppEncoder, ensure_ascii=False, indent=2)
print("カスタムエンコード:")
print(encoded)

print()
# カスタムデコーダ
def app_decoder(obj):
    if "__type__" in obj:
        if obj["__type__"] == "date":
            return date.fromisoformat(obj["value"])
        if obj["__type__"] == "set":
            return set(obj["value"])
    return obj

restored = json.loads(encoded, object_hook=app_decoder)
print(f"復元: event={restored['event']}, date={restored['date']}")
print(f"tags 型: {type(restored['tags']).__name__}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="dataformats" lessonId="json" />
      </div>
      <LessonNav lessons={lessons} currentId="json" basePath="/learn/dataformats" />
    </div>
  );
}
