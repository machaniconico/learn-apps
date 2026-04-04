import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リクエストバリデーション</h1>
        <p className="text-gray-400">パスパラメータ・クエリパラメータ・リクエストボディの検証方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Path・Query・Bodyの使い分け</h2>
        <p className="text-gray-400 mb-4">
          FastAPIでは<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Path()</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Query()</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Body()</code>クラスで各種パラメータに詳細な制約を設定できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI, Path, Query, Body
from typing import Annotated

app = FastAPI()

@app.get("/items/{item_id}")
def get_item(
    item_id: Annotated[int, Path(
        title="アイテムID",
        description="取得するアイテムのID",
        gt=0,       # 0より大きい
    )],
    q: Annotated[str | None, Query(
        min_length=3,
        max_length=50,
        alias="search",  # URLでは?search=... として渡す
    )] = None,
):
    return {"item_id": item_id, "search_query": q}

@app.post("/items")
def create_item(
    item: dict = Body(
        examples={
            "example1": {
                "summary": "基本的な例",
                "value": {"name": "Flask本", "price": 3200},
            }
        }
    )
):
    return item`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">HTTPExceptionでエラーレスポンス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">HTTPException</code>でAPIエラーを発生させると、
          適切なHTTPステータスコードとエラーメッセージを返します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI, HTTPException, status

items_db = {1: "Flask本", 2: "Django本"}

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"アイテム {item_id} が見つかりません",
        )
    return {"id": item_id, "name": items_db[item_id]}

@app.post("/items")
def create_item(item: ItemCreate):
    if item.price < 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="価格は0以上である必要があります",
        )`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">カスタムバリデーター</h2>
        <p className="text-gray-400 mb-4">
          Pydanticの<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@field_validator</code>デコレータで
          複雑なバリデーションロジックをモデルに組み込めます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from pydantic import BaseModel, field_validator, model_validator
import re

class UserCreate(BaseModel):
    username: str
    password: str
    confirm_password: str

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('ユーザー名は英数字とアンダースコアのみ使えます')
        return v.lower()  # 小文字に正規化

    @model_validator(mode='after')
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError('パスワードが一致しません')
        return self`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションチェーンを実装する</h2>
        <p className="text-gray-400 mb-4">
          複数のバリデーションを組み合わせて処理するパターンを確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`import re
from typing import Any

class FieldValidator:
    """Pydanticのfield_validatorに相当"""
    def __init__(self, field_name):
        self.field_name = field_name
        self.validators = []

    def add(self, fn, error_msg):
        self.validators.append((fn, error_msg))
        return self

    def validate(self, value) -> tuple[Any, list[str]]:
        errors = []
        result = value
        for fn, msg in self.validators:
            try:
                if not fn(result):
                    errors.append(msg)
                else:
                    # transformerがあれば適用
                    pass
            except Exception as e:
                errors.append(str(e))
        return result, errors

# バリデーションルールの定義
username_validator = FieldValidator("username")
username_validator.add(lambda v: len(v) >= 3, "ユーザー名は3文字以上必要です")
username_validator.add(lambda v: len(v) <= 30, "ユーザー名は30文字以下にしてください")
username_validator.add(lambda v: bool(re.match(r'^[a-zA-Z0-9_]+$', v)), "英数字とアンダースコアのみ使えます")

password_validator = FieldValidator("password")
password_validator.add(lambda v: len(v) >= 8, "パスワードは8文字以上必要です")
password_validator.add(lambda v: bool(re.search(r'[A-Z]', v)), "大文字を1文字以上含めてください")
password_validator.add(lambda v: bool(re.search(r'[0-9]', v)), "数字を1文字以上含めてください")

def validate_user(data):
    all_errors = {}

    _, u_errors = username_validator.validate(data.get("username", ""))
    if u_errors:
        all_errors["username"] = u_errors

    _, p_errors = password_validator.validate(data.get("password", ""))
    if p_errors:
        all_errors["password"] = p_errors

    if data.get("password") != data.get("confirm_password"):
        all_errors["confirm_password"] = ["パスワードが一致しません"]

    return all_errors

# テスト
test_cases = [
    {"username": "tanaka_01", "password": "SecureP@ss1", "confirm_password": "SecureP@ss1"},
    {"username": "ab", "password": "weak", "confirm_password": "different"},
]

for data in test_cases:
    errors = validate_user(data)
    if errors:
        print(f"バリデーションエラー（{data['username']!r}）:")
        for field, msgs in errors.items():
            print(f"  {field}: {msgs}")
    else:
        print(f"有効なデータ: username={data['username']}")
    print()`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="validation" />
      <LessonNav lessons={lessons} currentId="validation" basePath="/learn/fastapi" />
    </div>
  );
}
