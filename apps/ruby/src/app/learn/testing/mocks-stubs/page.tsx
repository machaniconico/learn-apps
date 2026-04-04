import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function MocksStubsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モック・スタブ</h1>
        <p className="text-gray-400">テストダブルを使って依存関係を切り離したユニットテストを書く方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テストダブルとは</h2>
        <p className="text-gray-300 mb-3">
          テストダブルは本物のオブジェクトの代わりに使う偽オブジェクトです。外部APIやデータベースへの
          依存を取り除き、高速・安定したテストを実現します。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><strong className="text-white">スタブ</strong> — メソッドの戻り値を固定する</li>
          <li><strong className="text-white">モック</strong> — メソッドが正しく呼ばれたかを検証する</li>
          <li><strong className="text-white">スパイ</strong> — 後から呼び出しを検証する</li>
          <li>Minitestには<code className="bg-gray-800 px-1 rounded text-indigo-300">Minitest::Mock</code>が組み込み</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Minitest::Mockの基本</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

# テスト対象
class WeatherService
  def initialize(api_client)
    @api_client = api_client
  end

  def current_temperature(city)
    data = @api_client.fetch(city)
    data[:temperature]
  end

  def forecast_summary(city)
    data = @api_client.fetch(city)
    "#{city}: #{data[:temperature]}度、#{data[:condition]}"
  end
end

class TestWeatherService < Minitest::Test
  def test_current_temperature
    # モックの作成
    mock_client = Minitest::Mock.new
    # fetch("Tokyo")が呼ばれたら固定値を返すように設定
    mock_client.expect(:fetch, { temperature: 25, condition: "晴れ" }, ["Tokyo"])

    service = WeatherService.new(mock_client)
    result = service.current_temperature("Tokyo")

    assert_equal 25, result
    mock_client.verify  # モックが期待通り呼ばれたか検証
  end

  def test_forecast_summary
    mock_client = Minitest::Mock.new
    mock_client.expect(:fetch, { temperature: 18, condition: "曇り" }, ["Osaka"])

    service = WeatherService.new(mock_client)
    result = service.forecast_summary("Osaka")

    assert_equal "Osaka: 18度、曇り", result
    mock_client.verify
  end
end`}
          expectedOutput={`# Running:

..

2 runs, 2 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: スタブで依存を差し替え</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class EmailSender
  def send_email(to, subject, body)
    # 実際はSMTPサーバーに送信する（テストでは呼びたくない）
    puts "メール送信: #{to} - #{subject}"
    true
  end
end

class NotificationService
  def initialize(email_sender)
    @email_sender = email_sender
  end

  def notify_user(user_email, message)
    success = @email_sender.send_email(
      user_email,
      "お知らせ",
      message
    )
    success ? "送信完了" : "送信失敗"
  end
end

class TestNotificationService < Minitest::Test
  def test_notify_returns_success_message
    # スタブ: send_emailを常にtrueを返す偽実装に差し替え
    stub_sender = Object.new
    def stub_sender.send_email(to, subject, body)
      true  # 実際には送信しない
    end

    service = NotificationService.new(stub_sender)
    result = service.notify_user("user@example.com", "テスト通知")

    assert_equal "送信完了", result
  end

  def test_notify_returns_failure_message
    stub_sender = Object.new
    def stub_sender.send_email(to, subject, body)
      false
    end

    service = NotificationService.new(stub_sender)
    result = service.notify_user("user@example.com", "テスト通知")

    assert_equal "送信失敗", result
  end
end`}
          expectedOutput={`# Running:

..

2 runs, 2 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: モックで呼び出し回数を検証</h2>
        <RubyEditor
          defaultCode={`require 'minitest/autorun'

class Cache
  def initialize
    @store = {}
    @hits = 0
    @misses = 0
  end

  def get(key)
    if @store.key?(key)
      @hits += 1
      @store[key]
    else
      @misses += 1
      nil
    end
  end

  def set(key, value) = @store[key] = value
  def hits   = @hits
  def misses = @misses
end

class TestCache < Minitest::Test
  def setup
    @cache = Cache.new
  end

  def test_cache_miss
    result = @cache.get(:user_1)
    assert_nil result
    assert_equal 0, @cache.hits
    assert_equal 1, @cache.misses
  end

  def test_cache_hit
    @cache.set(:user_1, { name: "Alice" })
    result = @cache.get(:user_1)

    assert_equal({ name: "Alice" }, result)
    assert_equal 1, @cache.hits
    assert_equal 0, @cache.misses
  end

  def test_multiple_accesses
    @cache.set(:key, "value")
    3.times { @cache.get(:key) }
    2.times { @cache.get(:missing) }

    assert_equal 3, @cache.hits
    assert_equal 2, @cache.misses
  end
end`}
          expectedOutput={`# Running:

...

3 runs, 9 assertions, 0 failures, 0 errors, 0 skips`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="mocks-stubs" />
      </div>
      <LessonNav lessons={lessons} currentId="mocks-stubs" basePath="/learn/testing" />
    </div>
  );
}
