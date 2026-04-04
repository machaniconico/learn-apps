import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "metaprogramming")!.lessons;

export default function HooksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">メタプログラミング レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フックメソッド</h1>
        <p className="text-gray-400">included・inherited・method_addedなどのフックメソッドを使った自動処理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フックメソッドとは</h2>
        <p className="text-gray-300 mb-3">
          Rubyにはクラス・モジュールの特定イベント（継承・インクルード・メソッド追加など）に自動的に呼ばれる
          フックメソッドがあります。これを使ってフレームワーク的な機能を実装できます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">included(base)</code> — モジュールがincludeされたとき</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">inherited(subclass)</code> — クラスが継承されたとき</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">method_added(method_name)</code> — メソッドが定義されたとき</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">extended(base)</code> — extendされたとき</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: includedフックでクラスメソッドを追加</h2>
        <RubyEditor
          defaultCode={`module Validatable
  def self.included(base)
    puts "Validatableが#{base}にincludeされました"
    base.extend(ClassMethods)
    base.instance_variable_set(:@validations, [])
  end

  module ClassMethods
    def validates(attr, presence: false)
      @validations ||= []
      @validations << { attr: attr, presence: presence }
    end

    def validations = @validations
  end

  def valid?
    self.class.validations.all? do |v|
      !v[:presence] || !send(v[:attr]).nil?
    end
  end
end

class User
  include Validatable
  attr_accessor :name, :email

  validates :name,  presence: true
  validates :email, presence: true

  def initialize(name, email)
    @name = name
    @email = email
  end
end

puts User.new("Alice", "alice@example.com").valid?
puts User.new(nil, "test@example.com").valid?`}
          expectedOutput={`ValidatableがUserにincludeされました
true
false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: inheritedフックでサブクラスを追跡</h2>
        <RubyEditor
          defaultCode={`class Plugin
  @subclasses = []

  def self.inherited(subclass)
    @subclasses << subclass
    puts "新しいプラグイン登録: #{subclass}"
  end

  def self.all = @subclasses

  def self.run_all
    all.each { |klass| klass.new.run }
  end
end

class LogPlugin < Plugin
  def run = puts "ログ処理実行中..."
end

class AuthPlugin < Plugin
  def run = puts "認証処理実行中..."
end

class CachePlugin < Plugin
  def run = puts "キャッシュ処理実行中..."
end

puts "登録済みプラグイン: #{Plugin.all.map(&:name).inspect}"
Plugin.run_all`}
          expectedOutput={`新しいプラグイン登録: LogPlugin
新しいプラグイン登録: AuthPlugin
新しいプラグイン登録: CachePlugin
登録済みプラグイン: ["LogPlugin", "AuthPlugin", "CachePlugin"]
ログ処理実行中...
認証処理実行中...
キャッシュ処理実行中...`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: method_addedフックでロギング</h2>
        <RubyEditor
          defaultCode={`module MethodLogger
  def self.included(base)
    base.instance_variable_set(:@logged_methods, [])
    base.extend(ClassMethods)
  end

  module ClassMethods
    def method_added(method_name)
      return if method_name == :initialize
      return if @logged_methods&.include?(method_name)
      @logged_methods ||= []
      @logged_methods << method_name
      puts "メソッド追加を検出: ##{method_name}"
    end
  end
end

class Service
  include MethodLogger

  def process
    puts "処理中..."
  end

  def validate
    puts "検証中..."
  end
end

puts "登録されたメソッド: Service.instance_methods(false).sort.inspect"
puts Service.instance_methods(false).sort.inspect`}
          expectedOutput={`メソッド追加を検出: #process
メソッド追加を検出: #validate
登録されたメソッド: Service.instance_methods(false).sort.inspect
[:process, :validate]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="metaprogramming" lessonId="hooks" />
      </div>
      <LessonNav lessons={lessons} currentId="hooks" basePath="/learn/metaprogramming" />
    </div>
  );
}
