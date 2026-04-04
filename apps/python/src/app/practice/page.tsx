import { PythonPlayground } from "@/components/python-playground";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* Project 1: 家計簿アプリ */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">家計簿アプリ</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-300 mb-2">辞書・リスト・関数を組み合わせて、収入と支出を管理する家計簿アプリを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>各取引を辞書（date, category, amount, type）で管理する</li>
            <li>収入・支出を別々に合計する関数を作る</li>
            <li>カテゴリ別の支出を集計する関数を作る</li>
            <li>残高（収入 - 支出）を計算して表示する</li>
          </ul>
        </div>
        <PythonPlayground defaultCode={`# 家計簿データ（各取引は辞書で管理）
transactions = [
    {"date": "2024-01-05", "category": "食費",   "amount": 3200,  "type": "支出"},
    {"date": "2024-01-10", "category": "給料",   "amount": 250000, "type": "収入"},
    {"date": "2024-01-12", "category": "交通費", "amount": 1500,  "type": "支出"},
    {"date": "2024-01-15", "category": "食費",   "amount": 4800,  "type": "支出"},
    {"date": "2024-01-20", "category": "娯楽",   "amount": 5000,  "type": "支出"},
    {"date": "2024-01-25", "category": "副業",   "amount": 30000, "type": "収入"},
    {"date": "2024-01-28", "category": "光熱費", "amount": 8000,  "type": "支出"},
]

# TODO: 収入の合計を返す関数を実装する
def total_income(records):
    # ヒント: type が "収入" のものだけ filter して amount を合計する
    pass

# TODO: 支出の合計を返す関数を実装する
def total_expense(records):
    # ヒント: type が "支出" のものだけ filter して amount を合計する
    pass

# TODO: カテゴリ別の支出を集計して辞書で返す関数を実装する
def expense_by_category(records):
    # ヒント: 空の辞書を作り、支出のみループして category ごとに amount を加算する
    result = {}
    pass

# --- 以下は完成後に動作確認するコード ---
income = total_income(transactions)
expense = total_expense(transactions)
balance = income - expense if income and expense else 0

print("=== 1月の家計簿サマリー ===")
print(f"収入合計: {income:,}円")
print(f"支出合計: {expense:,}円")
print(f"残高:     {balance:,}円")

print("\\n=== カテゴリ別支出 ===")
by_cat = expense_by_category(transactions)
if by_cat:
    for cat, amt in sorted(by_cat.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {amt:,}円")
`} />
      </section>

      {/* Project 2: 単語カウンター */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">単語カウンター</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">文字列操作とファイルI/Oの知識を活かして、テキストの単語頻度を分析するツールを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>テキストを単語に分割して頻度を辞書で集計する</li>
            <li>句読点・記号を除去してから集計する</li>
            <li>出現頻度の高い上位N件を返す関数を作る</li>
            <li>文字数・単語数・文数を統計として表示する</li>
          </ul>
        </div>
        <PythonPlayground defaultCode={`import re
from collections import defaultdict

# 分析対象のテキスト（実際はファイルから読み込む想定）
text = """
Python はシンプルで読みやすい言語です。
Python を使えばデータ分析や Web 開発が簡単にできます。
データ分析には pandas や numpy が人気です。
Web 開発には Flask や Django がよく使われます。
Python のコードはシンプルで読みやすいため、初心者にも人気があります。
"""

# TODO: テキストを単語に分割して頻度を集計する関数を実装する
def count_words(text):
    # ヒント1: re.findall(r'[\\w]+', text) で単語のリストを取得できる
    # ヒント2: defaultdict(int) を使って各単語の出現回数を数える
    word_count = defaultdict(int)
    # TODO: words を取得して各単語をカウントする
    return dict(word_count)

# TODO: 出現頻度の高い上位 n 件を返す関数を実装する
def top_n_words(word_count, n=5):
    # ヒント: sorted() の key=lambda x: x[1] と reverse=True を使う
    pass

# TODO: テキストの統計情報を返す関数を実装する
def text_stats(text):
    # 文字数（空白含む）、単語数、文数（。や.で区切る）を返す辞書
    # ヒント: len(text.strip()) / len(re.findall(...)) / text.count('。') + text.count('.')
    pass

# --- 動作確認 ---
word_count = count_words(text)
print("=== 単語頻度 TOP5 ===")
top = top_n_words(word_count, 5)
if top:
    for word, count in top:
        print(f"  {word}: {count}回")

print("\\n=== テキスト統計 ===")
stats = text_stats(text)
if stats:
    for key, val in stats.items():
        print(f"  {key}: {val}")
`} />
      </section>

      {/* Project 3: 成績管理システム */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">成績管理システム</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">クラスと継承を使って、学生の成績を管理するシステムを構築しましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Student クラスに名前・学番・科目別スコアを持たせる</li>
            <li>平均点・最高点・最低点を計算するメソッドを実装する</li>
            <li>GraduateStudent クラスを Student から継承して研究テーマを追加する</li>
            <li>クラス全体の統計（平均・首席）を出力する</li>
          </ul>
        </div>
        <PythonPlayground defaultCode={`# TODO: Student クラスを実装する
class Student:
    def __init__(self, student_id, name, scores):
        """
        student_id: 学生番号 (str)
        name: 氏名 (str)
        scores: 科目と点数の辞書 例: {"数学": 85, "英語": 72, "国語": 90}
        """
        # TODO: self.student_id, self.name, self.scores を設定する
        pass

    def average(self):
        # TODO: scores の値の平均を返す（小数点1桁に丸める）
        pass

    def highest(self):
        # TODO: 最も点数が高い科目名と点数のタプルを返す
        pass

    def lowest(self):
        # TODO: 最も点数が低い科目名と点数のタプルを返す
        pass

    def __str__(self):
        return f"[{self.student_id}] {self.name} (平均: {self.average()}点)"


# TODO: GraduateStudent を Student を継承して実装する
class GraduateStudent(Student):
    def __init__(self, student_id, name, scores, research_topic):
        # TODO: super().__init__() を呼んで research_topic も設定する
        pass

    def __str__(self):
        # TODO: 親クラスの __str__() に研究テーマを追加して返す
        pass


# --- データと動作確認 ---
students = [
    Student("S001", "田中太郎",  {"数学": 85, "英語": 72, "国語": 90, "理科": 88}),
    Student("S002", "鈴木花子",  {"数学": 92, "英語": 95, "国語": 78, "理科": 84}),
    Student("S003", "佐藤次郎",  {"数学": 60, "英語": 68, "国語": 75, "理科": 55}),
    GraduateStudent("G001", "山田研究",{"数学": 95, "英語": 88, "国語": 82, "理科": 97}, "機械学習"),
]

print("=== 学生一覧 ===")
for s in students:
    print(s)

print("\\n=== 詳細 ===")
for s in students:
    if s.highest() and s.lowest():
        print(f"{s.name}: 得意={s.highest()}, 苦手={s.lowest()}")

print("\\n=== クラス統計 ===")
averages = [s.average() for s in students if s.average() is not None]
if averages:
    print(f"クラス平均: {sum(averages)/len(averages):.1f}点")
    best = max(students, key=lambda s: s.average() or 0)
    print(f"首席: {best.name} ({best.average()}点)")
`} />
      </section>

      {/* Project 4: CSVデータ分析 */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">CSVデータ分析</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-300 mb-2">標準ライブラリとリスト内包表記を使って、売上データを分析しましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>CSV形式の文字列をパースして辞書のリストに変換する</li>
            <li>リスト内包表記で月別・商品別の集計を行う</li>
            <li>統計値（平均・最大・最小・中央値）を計算する</li>
            <li>売上ランキングと前月比を計算して表示する</li>
          </ul>
        </div>
        <PythonPlayground defaultCode={`import csv
import io
from statistics import mean, median

# CSVデータ（実際はファイルから読み込む想定）
csv_data = """月,商品,売上,数量
1,りんご,15000,30
1,バナナ,8000,40
2,りんご,18000,36
2,バナナ,7500,37
2,みかん,12000,60
3,りんご,22000,44
3,バナナ,9000,45
3,みかん,14000,70
"""

# TODO: CSV文字列をパースして辞書のリストに変換する関数を実装する
def parse_csv(data):
    # ヒント: csv.DictReader(io.StringIO(data)) を使う
    # 売上と数量は int に変換する
    records = []
    # TODO: reader でループして records に追加する
    return records

# TODO: 商品別の合計売上を辞書で返す関数をリスト内包表記で実装する
def sales_by_product(records):
    # ヒント: set() で商品名一覧を取得し、辞書内包表記で集計する
    # { 商品名: その商品の売上合計 }
    pass

# TODO: 月別の合計売上を辞書で返す関数を実装する
def sales_by_month(records):
    pass

# TODO: 売上の統計を返す関数を実装する
def sales_stats(records):
    # 全レコードの売上リストから mean, median, max, min を返す辞書
    pass

# --- 動作確認 ---
records = parse_csv(csv_data)
print(f"読み込んだレコード数: {len(records)}")

print("\\n=== 商品別売上ランキング ===")
by_product = sales_by_product(records)
if by_product:
    for name, total in sorted(by_product.items(), key=lambda x: x[1], reverse=True):
        print(f"  {name}: {total:,}円")

print("\\n=== 月別売上推移 ===")
by_month = sales_by_month(records)
if by_month:
    for month, total in sorted(by_month.items()):
        print(f"  {month}月: {total:,}円")

print("\\n=== 売上統計 ===")
stats = sales_stats(records)
if stats:
    for key, val in stats.items():
        print(f"  {key}: {val:,.0f}円")
`} />
      </section>
    </div>
  );
}
