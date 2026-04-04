import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "design")!.lessons;

export default function FactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">設計パターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファクトリ</h1>
        <p className="text-gray-400">オブジェクトの生成を抽象化するファクトリパターンをRubyで実装する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリパターンとは</h2>
        <p className="text-gray-300 mb-3">
          ファクトリパターンはオブジェクトの生成ロジックをカプセル化し、
          呼び出し元がどのクラスをインスタンス化するかを知らなくて済むようにします。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>条件によって異なるクラスを生成するロジックを一元化</li>
          <li>新しいクラスを追加しても呼び出し元を変更しなくてよい</li>
          <li>Rubyではクラスメソッドやモジュールで実装することが多い</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: シンプルなファクトリメソッド</h2>
        <RubyEditor
          defaultCode={`# 通知サービスのファクトリ
class Notification
  attr_reader :message

  def initialize(message)
    @message = message
  end

  def self.create(type, message)
    case type
    when :email  then EmailNotification.new(message)
    when :sms    then SmsNotification.new(message)
    when :push   then PushNotification.new(message)
    else raise ArgumentError, "未知の通知タイプ: #{type}"
    end
  end

  def send_to(recipient)
    raise NotImplementedError, "サブクラスで実装してください"
  end
end

class EmailNotification < Notification
  def send_to(recipient)
    puts "メール送信 → #{recipient}: #{@message}"
  end
end

class SmsNotification < Notification
  def send_to(recipient)
    puts "SMS送信 → #{recipient}: #{@message[0, 20]}..."
  end
end

class PushNotification < Notification
  def send_to(recipient)
    puts "プッシュ通知 → #{recipient}: #{@message}"
  end
end

# ファクトリを使って通知を生成
[:email, :sms, :push].each do |type|
  n = Notification.create(type, "ご注文が確定しました")
  n.send_to("user@example.com")
end`}
          expectedOutput={`メール送信 → user@example.com: ご注文が確定しました
SMS送信 → user@example.com: ご注文が確定しました...
プッシュ通知 → user@example.com: ご注文が確定しました`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: レジストリを使ったファクトリ</h2>
        <RubyEditor
          defaultCode={`# クラスを動的に登録するファクトリ
module ParserFactory
  @parsers = {}

  def self.register(format, klass)
    @parsers[format] = klass
    puts "#{format}パーサーを登録しました"
  end

  def self.create(format, data)
    klass = @parsers[format]
    raise ArgumentError, "未対応フォーマット: #{format}" unless klass
    klass.new(data)
  end

  def self.supported_formats = @parsers.keys
end

class JsonParser
  def initialize(data) = @data = data
  def parse
    puts "JSON解析: #{@data[0, 30]}..."
    { type: :json, parsed: true }
  end
end

class CsvParser
  def initialize(data) = @data = data
  def parse
    puts "CSV解析: #{@data.lines.count}行"
    { type: :csv, parsed: true }
  end
end

# パーサーを登録
ParserFactory.register(:json, JsonParser)
ParserFactory.register(:csv, CsvParser)

puts "対応フォーマット: #{ParserFactory.supported_formats.inspect}"

json_parser = ParserFactory.create(:json, '{"name":"Ruby","year":1995}')
puts json_parser.parse.inspect

csv_parser = ParserFactory.create(:csv, "name,age\nAlice,30\nBob,25\n")
puts csv_parser.parse.inspect`}
          expectedOutput={`jsonパーサーを登録しました
csvパーサーを登録しました
対応フォーマット: [:json, :csv]
JSON解析: {"name":"Ruby","year":1995}...
{:type=>:json, :parsed=>true}
CSV解析: 3行
{:type=>:csv, :parsed=>true}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 抽象ファクトリパターン</h2>
        <RubyEditor
          defaultCode={`# 関連するオブジェクト群を生成する抽象ファクトリ
module UIFactory
  def self.for(theme)
    case theme
    when :dark  then DarkThemeFactory.new
    when :light then LightThemeFactory.new
    else raise ArgumentError, "未知のテーマ: #{theme}"
    end
  end
end

class DarkThemeFactory
  def create_button(label)
    puts "ダークボタン[#{label}]: bg=#1a1a2e, text=#e0e0e0"
  end

  def create_card(title)
    puts "ダークカード[#{title}]: bg=#16213e, border=#0f3460"
  end

  def create_input(placeholder)
    puts "ダークインプット[#{placeholder}]: bg=#0f3460, text=#e0e0e0"
  end
end

class LightThemeFactory
  def create_button(label)
    puts "ライトボタン[#{label}]: bg=#4361ee, text=#ffffff"
  end

  def create_card(title)
    puts "ライトカード[#{title}]: bg=#ffffff, border=#e0e0e0"
  end

  def create_input(placeholder)
    puts "ライトインプット[#{placeholder}]: bg=#f8f9fa, text=#212529"
  end
end

[:dark, :light].each do |theme|
  puts "\n#{theme}テーマ:"
  factory = UIFactory.for(theme)
  factory.create_button("送信")
  factory.create_card("プロフィール")
  factory.create_input("メールアドレス")
end`}
          expectedOutput={`
darkテーマ:
ダークボタン[送信]: bg=#1a1a2e, text=#e0e0e0
ダークカード[プロフィール]: bg=#16213e, border=#0f3460
ダークインプット[メールアドレス]: bg=#0f3460, text=#e0e0e0

lightテーマ:
ライトボタン[送信]: bg=#4361ee, text=#ffffff
ライトカード[プロフィール]: bg=#ffffff, border=#e0e0e0
ライトインプット[メールアドレス]: bg=#f8f9fa, text=#212529`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/design" />
    </div>
  );
}
