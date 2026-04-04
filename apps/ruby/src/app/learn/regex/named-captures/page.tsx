import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "regex")!;

export default function NamedCapturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-pink-400">正規表現</p>
        <h1 className="text-3xl font-bold text-gray-100">名前付きキャプチャ</h1>
        <p className="text-gray-400">
          {"(?<name>pattern)"}構文による名前付きキャプチャグループを学びます。番号ではなく意味のある名前でキャプチャにアクセスできるため、可読性が大幅に向上します。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">名前付きキャプチャの基本</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">{"(?<name>pattern)"}</code> で名前付きキャプチャグループを定義します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">m[:name]</code> または <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">m["name"]</code> でアクセスします。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 日付のパース（名前付きキャプチャ）
date_pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/

dates = ["2024-01-15", "2023-12-31", "2022-06-01"]

dates.each do |date|
  m = date.match(date_pattern)
  if m
    puts "#{m[:year]}年#{m[:month]}月#{m[:day]}日"
  end
end

# named_captures でハッシュに変換
m = "2024-01-15".match(date_pattern)
puts m.named_captures.inspect`}
        expectedOutput={`2024年01月15日
2023年12月31日
2022年06月01日
{"year"=>"2024", "month"=>"01", "day"=>"15"}`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">実用的な名前付きキャプチャ</h2>
        <p className="text-gray-400 text-sm">
          URLやメールアドレスなどの複雑なパターンでは、名前付きキャプチャを使うことでコードの意図が明確になります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# URLのパース
url_pattern = %r{
  (?<scheme>https?|ftp)://
  (?<host>[\w.-]+)
  (?::(?<port>\d+))?
  (?<path>/[^\?#]*)?
  (?:\?(?<query>[^#]*))?
}x

urls = [
  "https://example.com/path/to/page?q=ruby",
  "http://localhost:3000/api/users",
  "https://api.github.com/repos",
]

urls.each do |url|
  m = url.match(url_pattern)
  next unless m
  puts "URL: #{url}"
  puts "  スキーム: #{m[:scheme]}"
  puts "  ホスト: #{m[:host]}"
  puts "  ポート: #{m[:port] || 'デフォルト'}"
  puts "  パス: #{m[:path] || '/'}"
  puts "  クエリ: #{m[:query] || 'なし'}"
end`}
        expectedOutput={`URL: https://example.com/path/to/page?q=ruby
  スキーム: https
  ホスト: example.com
  ポート: デフォルト
  パス: /path/to/page
  クエリ: q=ruby
URL: http://localhost:3000/api/users
  スキーム: http
  ホスト: localhost
  ポート: 3000
  パス: /api/users
  クエリ: なし
URL: https://api.github.com/repos
  スキーム: https
  ホスト: api.github.com
  ポート: デフォルト
  パス: /repos
  クエリ: なし`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">gsub での名前付きキャプチャ参照</h2>
        <p className="text-gray-400 text-sm">
          gsub の置換文字列内で <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-300">{`\\k<name>`}</code> を使って名前付きキャプチャを参照できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 名前付きキャプチャで日付フォーマット変換
dates = ["2024-01-15", "2023-12-31", "2022-06-01"]

dates.each do |date|
  # \k<name> で名前付きキャプチャを参照
  japanese = date.gsub(
    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
    '\k<year>年\k<month>月\k<day>日'
  )
  puts japanese
end

# named_captures をそのまま使う
log = "ERROR 2024-01-15 10:30:45 Database timeout"
m = log.match(/(?<level>\w+) (?<date>[\d-]+) (?<time>[\d:]+) (?<message>.+)/)
if m
  info = m.named_captures
  puts "レベル: #{info['level']}"
  puts "発生時刻: #{info['date']} #{info['time']}"
  puts "内容: #{info['message']}"
end`}
        expectedOutput={`2024年01月15日
2023年12月31日
2022年06月01日
レベル: ERROR
発生時刻: 2024-01-15 10:30:45
内容: Database timeout`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="regex" lessonId="named-captures" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="named-captures"
        basePath="/learn/regex"
      />
    </div>
  );
}
