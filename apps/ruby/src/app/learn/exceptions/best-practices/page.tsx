import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

export default function BestPracticesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-orange-400">例外処理</p>
        <h1 className="text-3xl font-bold text-gray-100">ベストプラクティス</h1>
        <p className="text-gray-400">
          例外処理の設計指針を学びます。特定の例外をrescueする、Exceptionをrescueしない、例外をメッセージとして使わないなど実践的なノウハウを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">特定の例外クラスをrescueする</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue Exception</code> や素の
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">rescue</code> は避け、
          期待する具体的な例外クラスを指定します。意図しないエラーを隠蔽しなくなります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 悪い例: 全ての例外を握り潰す
def bad_example(str)
  begin
    Integer(str)
  rescue  # StandardError全てをキャッチ（過剰）
    -1
  end
end

# 良い例: 期待する例外のみキャッチ
def good_example(str)
  Integer(str)
rescue ArgumentError
  puts "#{str.inspect} は整数に変換できません"
  -1
end

puts bad_example("42")
puts bad_example("abc")
puts "---"
puts good_example("42")
puts good_example("abc")`}
        expectedOutput={`42
-1
---
42
"abc" は整数に変換できません
-1`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">例外メッセージを活用する</h2>
        <p className="text-gray-400 text-sm">
          例外はエラーの詳細情報を運ぶ手段です。<code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">e.message</code> と
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">e.backtrace</code> を活用して
          デバッグに役立てましょう。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 例外情報を適切に使う
def process_user_input(input)
  raise ArgumentError, "入力がnilです" if input.nil?
  raise ArgumentError, "入力が空文字です" if input.empty?
  raise TypeError, "文字列が必要です: #{input.class}" unless input.is_a?(String)

  input.strip.upcase
end

inputs = ["  hello  ", nil, "", 42, "world"]

inputs.each do |input|
  begin
    result = process_user_input(input)
    puts "成功: #{result}"
  rescue ArgumentError, TypeError => e
    puts "#{e.class}: #{e.message}"
  end
end`}
        expectedOutput={`成功: HELLO
ArgumentError: 入力がnilです
ArgumentError: 入力が空文字です
TypeError: 文字列が必要です: Integer
成功: WORLD`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">フェイルファストと回復可能エラーの区別</h2>
        <p className="text-gray-400 text-sm">
          プログラムバグ（ArgumentError、TypeError）はrescueせずクラッシュさせ、
          外部要因（IOError、NetworkError）はrescueして回復を試みるのが原則です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 回復可能なエラーのみrescue
class FileProcessor
  def process(path)
    content = load_file(path)
    transform(content)
  rescue Errno::ENOENT => e
    # ファイルが存在しない → 回復可能
    puts "ファイルが見つかりません: #{path}"
    nil
  rescue Errno::EACCES => e
    # 権限エラー → 回復可能
    puts "ファイルへのアクセス権がありません: #{path}"
    nil
  # ArgumentError はrescueしない（バグを早期発見するため）
  end

  private

  def load_file(path)
    raise ArgumentError, "パスはStringでなければなりません" unless path.is_a?(String)
    # File.read(path) のシミュレーション
    raise Errno::ENOENT, path if path.include?("missing")
    "file content of #{path}"
  end

  def transform(content)
    return nil if content.nil?
    content.upcase
  end
end

fp = FileProcessor.new
puts fp.process("example.txt")
puts fp.process("missing.txt").inspect`}
        expectedOutput={`FILE CONTENT OF EXAMPLE.TXT
ファイルが見つかりません: missing.txt
`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="exceptions" lessonId="best-practices" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="best-practices"
        basePath="/learn/exceptions"
      />
    </div>
  );
}
