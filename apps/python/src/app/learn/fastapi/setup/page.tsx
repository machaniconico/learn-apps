import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">FastAPIセットアップ</h1>
        <p className="text-gray-400">FastAPIとUvicornのインストールと最初のAPIサーバーの起動方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">インストール</h2>
        <p className="text-gray-400 mb-4">
          FastAPIには<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fastapi</code>本体と、
          ASGIサーバーの<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">uvicorn</code>が必要です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">standard</code>オプションで追加依存関係もインストールできます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# インストール
pip install fastapi "uvicorn[standard]"

# または全依存関係をまとめてインストール
pip install fastapi[all]

# バージョン確認
python -c "import fastapi; print(fastapi.__version__)"

# サーバー起動
uvicorn main:app --reload`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">最初のFastAPIアプリ</h2>
        <p className="text-gray-400 mb-4">
          FastAPIはFlaskに似たデコレータスタイルで書けますが、型ヒントを活用することで
          自動バリデーションとドキュメント生成が行われます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">main.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI

app = FastAPI(
    title="My First API",
    description="FastAPIで作ったサンプルAPI",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "query": q}

# uvicorn main:app --reload で起動
# http://localhost:8000/docs でSwagger UIが見られる`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">FlaskとFastAPIの比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400">特徴</th>
                <th className="text-left py-2 px-3 text-pink-400">Flask</th>
                <th className="text-left py-2 px-3 text-teal-400">FastAPI</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2 px-3">型ヒント</td><td className="py-2 px-3">任意</td><td className="py-2 px-3">必須（コアな機能）</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">非同期</td><td className="py-2 px-3">追加設定が必要</td><td className="py-2 px-3">ネイティブサポート</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">バリデーション</td><td className="py-2 px-3">手動 or WTForms</td><td className="py-2 px-3">Pydanticで自動</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">APIドキュメント</td><td className="py-2 px-3">別途設定が必要</td><td className="py-2 px-3">自動生成（/docs）</td></tr>
              <tr><td className="py-2 px-3">テンプレート</td><td className="py-2 px-3">Jinja2内蔵</td><td className="py-2 px-3">別途設定</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">FastAPIの型ヒント活用パターン</h2>
        <p className="text-gray-400 mb-4">
          FastAPIが型ヒントをどのように活用するかをPythonで確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`from typing import Optional, Union

# FastAPIのエンドポイント関数の型ヒントパターン

# パスパラメータ（型ヒントで自動変換）
def read_item(item_id: int, q: Optional[str] = None):
    """
    item_id は int に自動変換される
    q はオプションのクエリパラメータ
    """
    result = {"item_id": item_id}
    if q:
        result["query"] = q
    return result

# 型ヒントによる自動変換の確認
def demonstrate_type_coercion():
    # 文字列→整数の変換シミュレーション
    path_param = "42"  # URLから来た文字列
    converted = int(path_param)  # FastAPIが自動的に行う
    print(f"パスパラメータ: '{path_param}' -> {converted} (型: {type(converted).__name__})")

    # オプションパラメータのデフォルト値
    def endpoint(item_id: int, active: bool = True, limit: int = 10):
        return {"id": item_id, "active": active, "limit": limit}

    print(f"\\nデフォルト値: {endpoint(1)}")
    print(f"カスタム値: {endpoint(2, active=False, limit=5)}")

demonstrate_type_coercion()

# レスポンスデータの構造
print("\\nAPIレスポンス例:")
response = read_item(123, "python")
for key, value in response.items():
    print(f"  {key}: {value} ({type(value).__name__})")`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="setup" />
      <LessonNav lessons={lessons} currentId="setup" basePath="/learn/fastapi" />
    </div>
  );
}
