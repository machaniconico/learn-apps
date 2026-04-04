import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dataformats");

export default function DataformatsExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">データ形式 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ形式演習</h1>
        <p className="text-gray-400">
          JSON・CSV・XMLを変換・処理する実践的な問題に取り組みましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1: CSV から JSON への変換</h2>
        <p className="text-gray-400 mb-4">
          CSV形式のデータをJSONに変換する関数を実装してください。数値は適切な型に変換してください。
        </p>
        <PythonPlayground
          defaultCode={`import csv
import json
import io

def csv_to_json(csv_text: str, numeric_columns: list[str] | None = None) -> str:
    """CSV を JSON 配列に変換する"""
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = []
    for row in reader:
        converted = {}
        for key, val in row.items():
            # 数値列の変換
            if numeric_columns and key in numeric_columns:
                try:
                    converted[key] = int(val) if "." not in val else float(val)
                except ValueError:
                    converted[key] = val
            else:
                converted[key] = val
        rows.append(converted)

    return json.dumps(rows, ensure_ascii=False, indent=2)

# テスト
csv_data = """名前,年齢,スコア,評価
田中太郎,28,92.5,A
鈴木花子,32,78.0,B
佐藤一郎,25,95.5,A+"""

result = csv_to_json(csv_data, numeric_columns=["年齢", "スコア"])
print("CSV → JSON:")
print(result)
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2: JSON から XML への変換</h2>
        <p className="text-gray-400 mb-4">
          JSON形式のデータをXMLに変換する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import json
import xml.etree.ElementTree as ET

def json_to_xml(json_data: list[dict], root_tag: str, item_tag: str) -> str:
    """JSON 配列を XML に変換する"""
    root = ET.Element(root_tag)

    for item in json_data:
        item_el = ET.SubElement(root, item_tag)
        for key, val in item.items():
            child = ET.SubElement(item_el, key.replace(" ", "_"))
            child.text = str(val)

    ET.indent(root, space="  ")
    return ET.tostring(root, encoding="unicode", xml_declaration=True)

# テスト
json_data = [
    {"名前": "田中太郎", "年齢": 28, "都市": "東京"},
    {"名前": "鈴木花子", "年齢": 32, "都市": "大阪"},
    {"名前": "佐藤一郎", "年齢": 25, "都市": "名古屋"},
]

result = json_to_xml(json_data, "people", "person")
print("JSON → XML:")
print(result)
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3: データの正規化</h2>
        <p className="text-gray-400 mb-4">
          複数のデータソースから来たデータを統一フォーマットに正規化する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import json
import csv
import io

# 様々なフォーマットのユーザーデータを正規化する

def normalize_user(raw: dict) -> dict:
    """様々なフォームのユーザーデータを統一フォーマットに変換"""
    # 名前（name, full_name, 名前 に対応）
    name = raw.get("name") or raw.get("full_name") or raw.get("名前", "不明")

    # 年齢（age, 年齢 に対応）
    age_raw = raw.get("age") or raw.get("年齢", 0)
    age = int(age_raw) if age_raw else 0

    # メール（email, mail に対応）
    email = raw.get("email") or raw.get("mail") or ""

    # 都市（city, location, 都市 に対応）
    city = raw.get("city") or raw.get("location") or raw.get("都市") or "不明"

    return {
        "name": name,
        "age": age,
        "email": email,
        "city": city,
    }

# 様々なフォーマットのデータ
raw_users = [
    {"full_name": "田中太郎", "age": 28, "email": "tanaka@ex.com", "city": "東京"},
    {"name": "鈴木花子", "年齢": 32, "mail": "suzuki@ex.com", "location": "大阪"},
    {"名前": "佐藤一郎", "age": "25", "email": "sato@ex.com", "都市": "名古屋"},
]

print("正規化前:")
for u in raw_users:
    print(f"  {u}")

print("\\n正規化後:")
normalized = [normalize_user(u) for u in raw_users]
print(json.dumps(normalized, ensure_ascii=False, indent=2))
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="dataformats" lessonId="dataformats-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="dataformats-exercise" basePath="/learn/dataformats" />
    </div>
  );
}
