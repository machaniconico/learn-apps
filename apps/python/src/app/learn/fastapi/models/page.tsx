import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Pydanticモデル</h1>
        <p className="text-gray-400">データのバリデーションと型定義にPydanticのBaseModelを使う方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">BaseModelの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">BaseModel</code>を継承してクラスを定義すると、
          型ヒントに基づいた自動バリデーション・JSON変換・ドキュメント生成が行われます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Product(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    in_stock: bool = True
    created_at: datetime = Field(default_factory=datetime.now)

# 辞書からモデルを作成（自動バリデーション）
product = Product(id=1, name="Flask入門書", price=3200)
print(product.name)      # Flask入門書
print(product.in_stock)  # True (デフォルト)

# JSON形式に変換
print(product.model_dump_json())

# バリデーションエラー
try:
    invalid = Product(id="not-an-int", name="", price=-100)
except ValueError as e:
    print(f"ValidationError: {e}")`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Fieldによる詳細なバリデーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Field()</code>でフィールドごとに詳細なバリデーション制約を設定できます。
          最小値・最大値・正規表現・デフォルト値・説明文なども指定できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from pydantic import BaseModel, Field, EmailStr
from typing import Annotated

class UserCreate(BaseModel):
    username: Annotated[str, Field(
        min_length=3,
        max_length=30,
        pattern=r'^[a-zA-Z0-9_]+$',
        description="ユーザー名（英数字とアンダースコアのみ）",
    )]
    email: EmailStr  # メールアドレスの検証（pip install pydantic[email]が必要）
    age: Annotated[int, Field(ge=0, le=150, description="年齢")]
    bio: str = Field(default="", max_length=500)

# モデルのJSONスキーマ（/docsで自動表示される）
import json
schema = UserCreate.model_json_schema()
print(json.dumps(schema, indent=2, ensure_ascii=False))`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ネストされたモデルと継承</h2>
        <p className="text-gray-400 mb-4">
          モデルをネストしたり、継承を使って共通フィールドを再利用できます。
          リクエスト用・レスポンス用・DB用など用途別にモデルを分けることが一般的です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from pydantic import BaseModel
from typing import List

class Address(BaseModel):
    city: str
    prefecture: str
    zip_code: str

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str        # 作成時のみ
    address: Address     # ネストされたモデル

class UserResponse(UserBase):
    id: int
    address: Address
    # password は除外（セキュリティ）

class PaginatedUsers(BaseModel):
    users: List[UserResponse]
    total: int
    page: int
    per_page: int`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pydanticモデルのバリデーションを確認する</h2>
        <p className="text-gray-400 mb-4">
          データクラスを使ってPydanticのバリデーション動作を再現してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass, field
from typing import Optional
import re

class ValidationError(Exception):
    def __init__(self, errors):
        self.errors = errors
        super().__init__(str(errors))

def validate(value, rules):
    """フィールドバリデーション"""
    errors = []
    if rules.get("required") and not value:
        errors.append("必須項目です")
    if value and "min_length" in rules and len(str(value)) < rules["min_length"]:
        errors.append(f"最低{rules['min_length']}文字必要です")
    if value and "max_length" in rules and len(str(value)) > rules["max_length"]:
        errors.append(f"最大{rules['max_length']}文字までです")
    if value and "pattern" in rules and not re.match(rules["pattern"], str(value)):
        errors.append(f"パターンに一致しません: {rules['pattern']}")
    if value and "min_value" in rules and float(value) < rules["min_value"]:
        errors.append(f"最小値は{rules['min_value']}です")
    if value and "max_value" in rules and float(value) > rules["max_value"]:
        errors.append(f"最大値は{rules['max_value']}です")
    return errors

# モデルの定義（Pydantic相当）
PRODUCT_SCHEMA = {
    "name": {"required": True, "min_length": 1, "max_length": 100},
    "price": {"required": True, "min_value": 0},
    "sku": {"pattern": r'^[A-Z]{3}-[0-9]{4}$'},
}

def validate_product(data):
    all_errors = {}
    for field, rules in PRODUCT_SCHEMA.items():
        errs = validate(data.get(field), rules)
        if errs:
            all_errors[field] = errs

    if all_errors:
        raise ValidationError(all_errors)
    return data

# テスト
test_cases = [
    {"name": "Flask入門書", "price": 3200, "sku": "BKS-0001"},
    {"name": "", "price": -100, "sku": "invalid"},
    {"name": "a" * 101, "price": 0},
]

for data in test_cases:
    try:
        result = validate_product(data)
        print(f"有効: {result['name']}")
    except ValidationError as e:
        print(f"バリデーションエラー:")
        for field, errors in e.errors.items():
            print(f"  {field}: {', '.join(errors)}")
    print()`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="models" />
      <LessonNav lessons={lessons} currentId="models" basePath="/learn/fastapi" />
    </div>
  );
}
