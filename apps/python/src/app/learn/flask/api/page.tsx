import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">REST API構築</h1>
        <p className="text-gray-400">FlaskでJSON APIを作る方法と、REST設計の原則を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">jsonifyでJSONレスポンス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">jsonify()</code>関数でPythonの辞書やリストをJSONレスポンスに変換できます。
          Content-Typeヘッダーも自動で<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">application/json</code>に設定されます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask, jsonify, request

app = Flask(__name__)

users = [
    {"id": 1, "name": "田中太郎", "email": "tanaka@example.com"},
    {"id": 2, "name": "鈴木花子", "email": "suzuki@example.com"},
]

# GET /api/users - ユーザー一覧
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({"users": users, "count": len(users)})

# GET /api/users/<id> - 個別ユーザー
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u["id"] == user_id), None)
    if not user:
        return jsonify({"error": "ユーザーが見つかりません"}), 404
    return jsonify(user)`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">POSTとリクエストボディの処理</h2>
        <p className="text-gray-400 mb-4">
          POSTリクエストではJSONボディを<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">request.get_json()</code>で取得します。
          データのバリデーションを行い、適切なHTTPステータスコードを返すことが重要です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# POST /api/users - ユーザー作成
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # バリデーション
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "name と email が必要です"}), 400

    new_user = {
        "id": len(users) + 1,
        "name": data["name"],
        "email": data["email"],
    }
    users.append(new_user)
    return jsonify(new_user), 201  # 201 Created

# DELETE /api/users/<id> - ユーザー削除
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    original_count = len(users)
    users = [u for u in users if u["id"] != user_id]
    if len(users) == original_count:
        return jsonify({"error": "ユーザーが見つかりません"}), 404
    return '', 204  # 204 No Content`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">HTTPステータスコードの使い分け</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-green-400 mb-2">成功系（2xx）</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">200</code> OK - 通常の成功</li>
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">201</code> Created - リソース作成</li>
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">204</code> No Content - 削除成功</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-red-400 mb-2">エラー系（4xx/5xx）</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">400</code> Bad Request - 不正なデータ</li>
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">401</code> Unauthorized - 認証が必要</li>
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">404</code> Not Found - 存在しない</li>
              <li><code className="text-pink-400 bg-gray-800 px-1 rounded">500</code> Server Error - サーバーエラー</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">REST APIをシミュレートする</h2>
        <p className="text-gray-400 mb-4">
          FlaskのREST APIパターンをPythonで再現してCRUDを実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`import json

# インメモリデータストア
db = {"users": [], "next_id": 1}

def api_response(data, status=200):
    return {"status": status, "body": json.dumps(data, ensure_ascii=False, indent=2)}

# GET /api/users
def get_users():
    return api_response({"users": db["users"], "count": len(db["users"])})

# GET /api/users/<id>
def get_user(user_id):
    user = next((u for u in db["users"] if u["id"] == user_id), None)
    if not user:
        return api_response({"error": "ユーザーが見つかりません"}, 404)
    return api_response(user)

# POST /api/users
def create_user(data):
    if not data.get("name") or not data.get("email"):
        return api_response({"error": "name と email が必要です"}, 400)
    user = {"id": db["next_id"], "name": data["name"], "email": data["email"]}
    db["users"].append(user)
    db["next_id"] += 1
    return api_response(user, 201)

# DELETE /api/users/<id>
def delete_user(user_id):
    before = len(db["users"])
    db["users"] = [u for u in db["users"] if u["id"] != user_id]
    if len(db["users"]) == before:
        return api_response({"error": "ユーザーが見つかりません"}, 404)
    return {"status": 204, "body": ""}

# テスト実行
print("=== POST /api/users ===")
r = create_user({"name": "田中太郎", "email": "tanaka@example.com"})
print(f"Status: {r['status']}\\n{r['body']}")

create_user({"name": "鈴木花子", "email": "suzuki@example.com"})

print("\\n=== GET /api/users ===")
r = get_users()
print(f"Status: {r['status']}\\n{r['body']}")

print("\\n=== GET /api/users/1 ===")
r = get_user(1)
print(f"Status: {r['status']}\\n{r['body']}")

print("\\n=== DELETE /api/users/2 ===")
r = delete_user(2)
print(f"Status: {r['status']}")

print("\\n=== GET /api/users (削除後) ===")
r = get_users()
print(f"Status: {r['status']}\\n{r['body']}")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="api" />
      <LessonNav lessons={lessons} currentId="api" basePath="/learn/flask" />
    </div>
  );
}
