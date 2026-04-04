import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "io")!;

export default function CsvPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-400">ファイルI/O</p>
        <h1 className="text-3xl font-bold text-gray-100">CSV処理</h1>
        <p className="text-gray-400">
          RubyのCSVライブラリを使ったCSVファイルの読み書きを学びます。CSV.read、CSV.foreach、CSV.generateを使いこなして表形式データを処理しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">CSVの読み込み</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">require &apos;csv&apos;</code> でCSVライブラリを読み込みます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">headers: true</code> オプションでヘッダー行を自動処理します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'csv'

# CSVデータをシミュレーション
csv_data = <<~CSV
  name,age,city
  Alice,30,Tokyo
  Bob,25,Osaka
  Carol,35,Nagoya
CSV

# CSV.parse でパース
rows = CSV.parse(csv_data, headers: true)

rows.each do |row|
  puts "#{row['name']} (#{row['age']}歳) - #{row['city']}"
end

puts "---"
puts "行数: #{rows.length}"
puts "ヘッダー: #{rows.headers.inspect}"`}
        expectedOutput={`Alice (30歳) - Tokyo
Bob (25歳) - Osaka
Carol (35歳) - Nagoya
---
行数: 3
ヘッダー: ["name", "age", "city"]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">CSVの生成</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">CSV.generate</code> でCSV文字列を生成します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">csv &lt;&lt; row</code> で行を追加します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'csv'

products = [
  { name: "Apple", price: 150, stock: 100 },
  { name: "Banana", price: 80, stock: 250 },
  { name: "Cherry", price: 300, stock: 50 },
]

# CSV生成
csv_output = CSV.generate(headers: true) do |csv|
  csv << ["商品名", "価格", "在庫数"]
  products.each do |p|
    csv << [p[:name], p[:price], p[:stock]]
  end
end

puts csv_output

# 合計計算
total_value = products.sum { |p| p[:price] * p[:stock] }
puts "在庫総額: #{total_value}円"`}
        expectedOutput={`商品名,価格,在庫数
Apple,150,100
Banana,80,250
Cherry,300,50

在庫総額: 107500円`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">CSV.foreach で大きなファイルを処理</h2>
        <p className="text-gray-400 text-sm">
          大きなCSVファイルは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">CSV.foreach</code> で1行ずつ読み込みメモリを節約します。
        </p>
      </div>

      <RubyEditor
        defaultCode={`require 'csv'

csv_data = <<~CSV
  date,amount,category
  2024-01-01,1500,food
  2024-01-02,3000,transport
  2024-01-03,800,food
  2024-01-04,5000,entertainment
  2024-01-05,1200,food
CSV

totals = Hash.new(0)
count = Hash.new(0)

CSV.parse(csv_data, headers: true) do |row|
  cat = row["category"]
  totals[cat] += row["amount"].to_i
  count[cat] += 1
end

puts "カテゴリ別集計:"
totals.sort.each do |cat, total|
  puts "  #{cat}: #{total}円 (#{count[cat]}件)"
end`}
        expectedOutput={`カテゴリ別集計:
  entertainment: 5000円 (1件)
  food: 3500円 (3件)
  transport: 3000円 (1件)`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="io" lessonId="csv" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="csv"
        basePath="/learn/io"
      />
    </div>
  );
}
