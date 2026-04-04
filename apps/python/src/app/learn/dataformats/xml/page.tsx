import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dataformats");

export default function XmlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">データ形式 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">XML処理</h1>
        <p className="text-gray-400">
          XMLは設定ファイル・RSS・SVGなど幅広く使われます。
          標準ライブラリの <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">xml.etree.ElementTree</code> でパースと生成を学びましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">XML の構造</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">books.xml</div>
          <div className="p-4 font-mono text-sm">
            <p className="text-gray-500">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</p>
            <p><span className="text-blue-400">&lt;catalog&gt;</span></p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">&lt;book</span> <span className="text-green-400">id=&quot;001&quot; lang=&quot;ja&quot;</span><span className="text-blue-400">&gt;</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;title&gt;</span><span className="text-gray-300">Python入門</span><span className="text-blue-400">&lt;/title&gt;</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;author&gt;</span><span className="text-gray-300">田中太郎</span><span className="text-blue-400">&lt;/author&gt;</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;price</span> <span className="text-green-400">currency=&quot;JPY&quot;</span><span className="text-blue-400">&gt;</span><span className="text-gray-300">2800</span><span className="text-blue-400">&lt;/price&gt;</span></p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">&lt;/book&gt;</span></p>
            <p><span className="text-blue-400">&lt;/catalog&gt;</span></p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">ElementTree で XML をパースする</h2>
        <PythonPlayground
          defaultCode={`import xml.etree.ElementTree as ET

xml_data = """<?xml version="1.0" encoding="UTF-8"?>
<catalog>
    <book id="001" lang="ja">
        <title>Python入門</title>
        <author>田中太郎</author>
        <price currency="JPY">2800</price>
        <tags>
            <tag>Python</tag>
            <tag>プログラミング</tag>
            <tag>入門</tag>
        </tags>
    </book>
    <book id="002" lang="ja">
        <title>データサイエンス実践</title>
        <author>鈴木花子</author>
        <price currency="JPY">3200</price>
        <tags>
            <tag>データ分析</tag>
            <tag>機械学習</tag>
        </tags>
    </book>
</catalog>"""

root = ET.fromstring(xml_data)
print(f"ルート要素: {root.tag}")
print(f"本の数: {len(root)}")
print()

for book in root.findall("book"):
    book_id = book.get("id")
    lang = book.get("lang")
    title = book.find("title").text
    author = book.find("author").text
    price = book.find("price").text
    currency = book.find("price").get("currency")
    tags = [tag.text for tag in book.findall("tags/tag")]

    print(f"ID: {book_id} [{lang}]")
    print(f"  タイトル: {title}")
    print(f"  著者: {author}")
    print(f"  価格: {price} {currency}")
    print(f"  タグ: {', '.join(tags)}")
    print()
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">ElementTree で XML を生成する</h2>
        <PythonPlayground
          defaultCode={`import xml.etree.ElementTree as ET

# XML を Python から生成
root = ET.Element("students")
root.set("class", "Python上級")
root.set("year", "2024")

students = [
    {"id": "S001", "name": "田中太郎", "grade": "A", "score": "95"},
    {"id": "S002", "name": "鈴木花子", "grade": "B", "score": "82"},
    {"id": "S003", "name": "佐藤一郎", "grade": "A+", "score": "98"},
]

for s in students:
    student_el = ET.SubElement(root, "student")
    student_el.set("id", s["id"])

    name_el = ET.SubElement(student_el, "name")
    name_el.text = s["name"]

    grade_el = ET.SubElement(student_el, "grade")
    grade_el.text = s["grade"]

    score_el = ET.SubElement(student_el, "score")
    score_el.set("unit", "points")
    score_el.text = s["score"]

# インデント付きで出力（Python 3.9+）
ET.indent(root, space="    ")
xml_str = ET.tostring(root, encoding="unicode", xml_declaration=False)
print("生成した XML:")
print('<?xml version="1.0" encoding="UTF-8"?>')
print(xml_str)
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="dataformats" lessonId="xml" />
      </div>
      <LessonNav lessons={lessons} currentId="xml" basePath="/learn/dataformats" />
    </div>
  );
}
