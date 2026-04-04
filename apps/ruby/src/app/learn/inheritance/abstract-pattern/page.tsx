import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;
const lessonId = "abstract-pattern";

export default function AbstractPatternPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-medium mb-2">継承</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">抽象クラスパターン</h1>
          <p className="text-gray-400">
            Ruby には abstract キーワードはありませんが、
            raise NotImplementedError を使ってサブクラスに実装を強制するパターンがあります。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">NotImplementedError パターン</h2>
          <p className="text-gray-400 text-sm mb-4">
            基底クラスのメソッドで
            <code className="text-orange-400 bg-gray-800 px-1 rounded mx-1">raise NotImplementedError</code>
            を呼ぶことで、サブクラスが実装しなかった場合にエラーを発生させます。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>テンプレートメソッドパターンと組み合わせて使うことが多い</li>
            <li>インターフェースの代わりとして機能する</li>
            <li>ドキュメントとしての役割も果たす</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`class DataExporter
  # サブクラスで実装必須のメソッド
  def export(data)
    raise NotImplementedError, "#{self.class}#export を実装してください"
  end

  def file_extension
    raise NotImplementedError, "#{self.class}#file_extension を実装してください"
  end

  # テンプレートメソッド（共通の処理フロー）
  def save(data, filename)
    content = export(data)
    full_name = "#{filename}.#{file_extension}"
    puts "#{full_name} に保存: #{content.bytesize} bytes"
    full_name
  end
end

class CsvExporter < DataExporter
  def export(data)
    data.map { |row| row.join(",") }.join("\n")
  end

  def file_extension = "csv"
end

class JsonExporter < DataExporter
  def export(data)
    require "json"
    data.to_json
  end

  def file_extension = "json"
end

data = [["name", "age"], ["Alice", 30], ["Bob", 25]]
CsvExporter.new.save(data, "users")
JsonExporter.new.save(data, "users")

begin
  DataExporter.new.save(data, "test")
rescue NotImplementedError => e
  puts "エラー: #{e.message}"
end`}
          expectedOutput={`users.csv に保存: 30 bytes
users.json に保存: 38 bytes
エラー: DataExporter#export を実装してください`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">インスタンス化を禁止するパターン</h2>
          <p className="text-gray-400 text-sm">
            new をオーバーライドして基底クラスの直接インスタンス化を禁止することもできます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class AbstractBase
  def self.new(*)
    if self == AbstractBase
      raise NotImplementedError, "AbstractBase は直接インスタンス化できません"
    end
    super
  end

  def process
    raise NotImplementedError
  end
end

class ConcreteImpl < AbstractBase
  def process = "具体的な処理"
end

puts ConcreteImpl.new.process

begin
  AbstractBase.new
rescue NotImplementedError => e
  puts e.message
end`}
          expectedOutput={`具体的な処理
AbstractBase は直接インスタンス化できません`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="inheritance" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/inheritance" />
      </div>
    </div>
  );
}
