import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dataformats");

const quizQuestions: QuizQuestion[] = [
  {
    question: "json.dumps({'name': '太郎', 'age': 25}) の結果はどれですか？",
    options: [
      "'{\"name\": \"太郎\", \"age\": 25}'",
      "\"{'name': '太郎', 'age': 25}\"",
      "b'{\"name\": \"太郎\"}'",
      "エラーになる",
    ],
    answer: 0,
    explanation: "json.dumps() はPythonオブジェクトをJSON文字列に変換します。辞書のキーはダブルクォートで囲まれます。",
  },
  {
    question: "JSON文字列をPythonオブジェクトに変換する関数はどれですか？",
    options: ["json.loads()", "json.parse()", "json.decode()", "json.read()"],
    answer: 0,
    explanation: "json.loads()（load string）がJSON文字列をPythonオブジェクトに変換します。ファイルから読む場合は json.load() を使います。",
  },
  {
    question: "XML を標準ライブラリで扱うモジュールはどれですか？",
    options: [
      "xml.etree.ElementTree",
      "xmlparser",
      "lxml",
      "beautifulsoup4",
    ],
    answer: 0,
    explanation: "xml.etree.ElementTree は標準ライブラリに含まれており、XML のパースと生成が可能です。lxml や beautifulsoup4 は高機能ですが外部ライブラリです。",
  },
  {
    question: "YAML を扱うためのサードパーティライブラリはどれですか？",
    options: ["PyYAML", "yaml-python", "pyyaml-std", "ruamel"],
    answer: 0,
    explanation: "PyYAML（pip install pyyaml）が最もよく使われるYAMLライブラリです。import yaml として使用します。",
  },
];

export default function DataformatsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">データ形式</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="intermediate" />
        </div>
        <p className="text-gray-400">
          モダンなアプリケーション開発ではJSON・CSV・YAML・XMLなど様々なデータ形式を扱います。
          それぞれの特徴と適切な使い方、Pythonでの操作方法を学びましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="dataformats" totalLessons={5} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/dataformats" color="blue" categoryId="dataformats" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">主要データ形式の比較</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-gray-400 font-semibold">形式</th>
                <th className="text-left p-3 text-gray-400 font-semibold">用途</th>
                <th className="text-left p-3 text-gray-400 font-semibold">特徴</th>
                <th className="text-left p-3 text-gray-400 font-semibold">Python ライブラリ</th>
              </tr>
            </thead>
            <tbody>
              {[
                { format: "JSON", use: "Web API、設定ファイル", feature: "軽量・人間が読みやすい", lib: "json（標準）" },
                { format: "CSV", use: "表データ、データ分析", feature: "シンプル・表計算ソフトで開ける", lib: "csv（標準）" },
                { format: "YAML", use: "設定ファイル", feature: "コメント可・階層が見やすい", lib: "PyYAML（外部）" },
                { format: "XML", use: "設定、文書、RSS", feature: "スキーマ検証・名前空間対応", lib: "xml.etree（標準）" },
              ].map((row) => (
                <tr key={row.format} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="p-3 text-blue-400 font-mono font-semibold">{row.format}</td>
                  <td className="p-3 text-gray-300">{row.use}</td>
                  <td className="p-3 text-gray-400">{row.feature}</td>
                  <td className="p-3 text-gray-400 font-mono text-xs">{row.lib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">データ形式を実際に操作してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">JSON — 最もよく使われるデータ形式</h3>
          <PythonPlayground
            defaultCode={`import json

# Python オブジェクト → JSON 文字列
data = {
    "name": "田中太郎",
    "age": 28,
    "hobbies": ["読書", "プログラミング", "料理"],
    "address": {
        "city": "東京",
        "zip": "100-0001"
    },
    "active": True,
    "score": None
}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print("JSON 文字列:")
print(json_str)

print()
# JSON 文字列 → Python オブジェクト
restored = json.loads(json_str)
print(f"名前: {restored['name']}")
print(f"趣味数: {len(restored['hobbies'])}")
print(f"都市: {restored['address']['city']}")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">XML — 構造化データの処理</h3>
          <PythonPlayground
            defaultCode={`import xml.etree.ElementTree as ET

# XML を文字列から解析
xml_data = """<?xml version="1.0" encoding="UTF-8"?>
<catalog>
    <book id="001">
        <title>Pythonプログラミング入門</title>
        <author>田中太郎</author>
        <price>2800</price>
    </book>
    <book id="002">
        <title>データサイエンス実践</title>
        <author>鈴木花子</author>
        <price>3200</price>
    </book>
</catalog>"""

root = ET.fromstring(xml_data)
print(f"ルート要素: {root.tag}")
print()

for book in root.findall("book"):
    book_id = book.get("id")
    title = book.find("title").text
    author = book.find("author").text
    price = book.find("price").text
    print(f"ID: {book_id} | {title} | 著者: {author} | 価格: {price}円")
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
