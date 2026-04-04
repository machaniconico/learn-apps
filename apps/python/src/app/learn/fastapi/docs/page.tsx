import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">自動ドキュメント</h1>
        <p className="text-gray-400">Swagger UIとReDocで自動生成されるAPIドキュメントの活用方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">自動生成されるAPIドキュメント</h2>
        <p className="text-gray-400 mb-4">
          FastAPIはOpenAPI仕様に基づいてAPIドキュメントを自動生成します。
          コードを実装するだけでドキュメントが常に最新の状態に保たれます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-teal-500/20 p-5">
            <p className="text-teal-400 font-bold mb-2">Swagger UI</p>
            <p className="text-gray-400 text-sm mb-2">アクセス: <code className="text-teal-400 bg-gray-800 px-1 rounded">/docs</code></p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• エンドポイントの一覧表示</li>
              <li>• ブラウザから直接APIを試せる</li>
              <li>• リクエスト・レスポンスの例を確認</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl border border-teal-500/20 p-5">
            <p className="text-teal-400 font-bold mb-2">ReDoc</p>
            <p className="text-gray-400 text-sm mb-2">アクセス: <code className="text-teal-400 bg-gray-800 px-1 rounded">/redoc</code></p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• より読みやすいレイアウト</li>
              <li>• スキーマの詳細確認に最適</li>
              <li>• 印刷・PDF化に向いている</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ドキュメントのカスタマイズ</h2>
        <p className="text-gray-400 mb-4">
          タイトル・説明・バージョン・タグなど、ドキュメントの内容を詳細にカスタマイズできます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">summary</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">description</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">tags</code>を活用しましょう。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI

app = FastAPI(
    title="書籍管理API",
    description="""
    書籍の管理を行うAPIです。

    ## 機能
    * 書籍の一覧・詳細取得
    * 書籍の追加・更新・削除
    * ユーザー認証
    """,
    version="2.0.0",
    contact={"name": "開発チーム", "email": "dev@example.com"},
    license_info={"name": "MIT"},
)

@app.get(
    "/books/{book_id}",
    summary="書籍の詳細取得",
    description="IDを指定して書籍の詳細情報を取得します。存在しない場合は404を返します。",
    tags=["books"],
    response_description="書籍の詳細情報",
)
def get_book(book_id: int):
    """
    書籍の詳細情報を返します。

    - **book_id**: 取得する書籍のID
    """
    return {"id": book_id, "title": "FastAPI入門"}`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">OpenAPIスキーマの活用</h2>
        <p className="text-gray-400 mb-4">
          FastAPIが生成するOpenAPIスキーマは<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">/openapi.json</code>で取得できます。
          このJSONをもとにクライアントコードの自動生成や、テストの自動化が可能です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# openapi.jsonの主な構造
{
  "openapi": "3.1.0",
  "info": {"title": "My API", "version": "1.0.0"},
  "paths": {
    "/items/{item_id}": {
      "get": {
        "summary": "アイテム取得",
        "parameters": [...],
        "responses": {
          "200": {"description": "成功", ...},
          "404": {"description": "Not Found"}
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Item": {
        "type": "object",
        "properties": {...}
      }
    }
  }
}`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">OpenAPIスキーマを生成してみる</h2>
        <p className="text-gray-400 mb-4">
          Pydanticモデルからのスキーマ生成の仕組みをPythonで確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`import json
from dataclasses import dataclass
from typing import Optional

# Pydanticのmodel_json_schemaを簡易実装
def generate_schema(cls_name, fields):
    """OpenAPIスキーマのJSON Schemaを生成"""
    properties = {}
    required = []

    for name, info in fields.items():
        field_type = info.get("type", "string")
        description = info.get("description", "")
        is_required = info.get("required", True)

        type_map = {"str": "string", "int": "integer", "float": "number", "bool": "boolean"}
        json_type = type_map.get(field_type, "string")

        prop = {"type": json_type}
        if description:
            prop["description"] = description
        if "min" in info:
            prop["minimum"] = info["min"]
        if "max" in info:
            prop["maximum"] = info["max"]
        if "max_length" in info:
            prop["maxLength"] = info["max_length"]

        properties[name] = prop
        if is_required:
            required.append(name)

    return {
        "type": "object",
        "title": cls_name,
        "properties": properties,
        "required": required,
    }

# BookCreateモデルのスキーマ定義
book_schema = generate_schema("BookCreate", {
    "title": {"type": "str", "max_length": 200, "description": "書籍のタイトル"},
    "author": {"type": "str", "max_length": 100, "description": "著者名"},
    "price": {"type": "int", "min": 0, "description": "価格（円）"},
    "pages": {"type": "int", "min": 1, "description": "ページ数"},
    "isbn": {"type": "str", "description": "ISBNコード", "required": False},
})

print("=== BookCreate スキーマ ===")
print(json.dumps(book_schema, ensure_ascii=False, indent=2))

# エンドポイントのOpenAPI定義
endpoint_def = {
    "post": {
        "summary": "書籍を追加",
        "tags": ["books"],
        "requestBody": {
            "required": True,
            "content": {
                "application/json": {"schema": book_schema}
            }
        },
        "responses": {
            "201": {"description": "作成成功"},
            "422": {"description": "バリデーションエラー"},
        }
    }
}

print("\n=== /books エンドポイント定義 ===")
print(json.dumps(endpoint_def, ensure_ascii=False, indent=2))`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="docs" />
      <LessonNav lessons={lessons} currentId="docs" basePath="/learn/fastapi" />
    </div>
  );
}
