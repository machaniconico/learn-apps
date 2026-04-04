import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flask演習</h1>
        <p className="text-gray-400">これまでの知識を活かしてFlaskでシンプルなWebアプリを設計・実装します。</p>
      </div>

      {/* Challenge 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">課題1：TODOアプリのAPI設計</h2>
        <p className="text-gray-400 mb-4">
          FlaskでTODOアプリのREST APIを設計してください。
          CRUD操作に対応したエンドポイントを定義し、適切なHTTPメソッドとステータスコードを使います。
        </p>
        <div className="bg-gray-900 rounded-xl border border-pink-500/20 p-5 mb-4">
          <p className="text-pink-400 font-semibold text-sm mb-3">要件</p>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• <code className="text-pink-400 bg-gray-800 px-1 rounded">GET /api/todos</code> - TODO一覧取得</li>
            <li>• <code className="text-pink-400 bg-gray-800 px-1 rounded">POST /api/todos</code> - TODO作成（title必須）</li>
            <li>• <code className="text-pink-400 bg-gray-800 px-1 rounded">PUT /api/todos/&lt;id&gt;</code> - TODO更新（completed切り替え）</li>
            <li>• <code className="text-pink-400 bg-gray-800 px-1 rounded">DELETE /api/todos/&lt;id&gt;</code> - TODO削除</li>
            <li>• 存在しないIDへのアクセスは404を返す</li>
          </ul>
        </div>
      </section>

      {/* Challenge 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">課題2：ブログアプリの設計</h2>
        <p className="text-gray-400 mb-4">
          Flaskで基本的なブログアプリを構成する場合、どのような設計が必要でしょうか。
          以下の要件を満たすモデル・ルート・テンプレートの構成を考えてみましょう。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">必要なモデル</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• User（id, username, email, password_hash）</li>
              <li>• Post（id, title, content, user_id, created_at）</li>
              <li>• Comment（id, content, user_id, post_id）</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">必要なルート</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• GET / - 記事一覧</li>
              <li>• GET /post/&lt;id&gt; - 記事詳細</li>
              <li>• GET/POST /post/new - 記事作成</li>
              <li>• GET/POST /login - ログイン</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">TODO APIをPythonで実装してみよう</h2>
        <p className="text-gray-400 mb-4">
          課題1のTODO APIを実際にPythonで実装してみましょう。バリデーションと適切なエラーハンドリングも含めてください。
        </p>
        <PythonPlayground defaultCode={`import json

# インメモリTODOストア
todos = []
next_id = 1

def api(status, body):
    return {"status": status, "body": body}

# GET /api/todos
def get_todos(filter_completed=None):
    result = todos
    if filter_completed is not None:
        result = [t for t in todos if t["completed"] == filter_completed]
    return api(200, {"todos": result, "total": len(result)})

# POST /api/todos
def create_todo(data):
    global next_id
    title = (data or {}).get("title", "").strip()
    if not title:
        return api(400, {"error": "titleは必須です"})
    todo = {
        "id": next_id,
        "title": title,
        "completed": False,
        "priority": data.get("priority", "medium"),
    }
    todos.append(todo)
    next_id += 1
    return api(201, todo)

# PUT /api/todos/<id>
def update_todo(todo_id, data):
    todo = next((t for t in todos if t["id"] == todo_id), None)
    if not todo:
        return api(404, {"error": f"TODO id={todo_id} が見つかりません"})
    if "completed" in (data or {}):
        todo["completed"] = bool(data["completed"])
    if "title" in (data or {}) and data["title"].strip():
        todo["title"] = data["title"].strip()
    return api(200, todo)

# DELETE /api/todos/<id>
def delete_todo(todo_id):
    global todos
    before = len(todos)
    todos = [t for t in todos if t["id"] != todo_id]
    if len(todos) == before:
        return api(404, {"error": f"TODO id={todo_id} が見つかりません"})
    return api(204, "")

# テスト実行
def show(label, result):
    body = json.dumps(result["body"], ensure_ascii=False, indent=2) if result["body"] else ""
    print(f"{label} -> Status: {result['status']}")
    if body:
        print(body)
    print()

show("POST (有効)", create_todo({"title": "Flaskを学ぶ", "priority": "high"}))
show("POST (有効)", create_todo({"title": "テンプレートを練習する"}))
show("POST (無効)", create_todo({"title": ""}))
show("GET /todos", get_todos())
show("PUT /todos/1", update_todo(1, {"completed": True}))
show("GET (未完了のみ)", get_todos(filter_completed=False))
show("DELETE /todos/2", delete_todo(2))
show("DELETE (存在しない)", delete_todo(99))`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="flask-exercise" />
      <LessonNav lessons={lessons} currentId="flask-exercise" basePath="/learn/flask" />
    </div>
  );
}
