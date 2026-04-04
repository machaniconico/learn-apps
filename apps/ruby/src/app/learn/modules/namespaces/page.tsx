import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "modules")!;
const lessonId = "namespaces";

export default function NamespacesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">モジュール</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">名前空間</h1>
          <p className="text-gray-400">
            モジュールを名前空間として使うと、クラスや定数の名前の衝突を防げます。
            :: 演算子で名前空間内の要素にアクセスします。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">名前空間の使い方</h2>
          <p className="text-gray-400 text-sm mb-4">
            大規模なアプリケーションでは同じ名前のクラスが複数の文脈で必要になります。
            モジュールを名前空間にすることで衝突を避けられます。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>Module::Class で名前空間内のクラスにアクセス</li>
            <li>Module::CONSTANT で名前空間内の定数にアクセス</li>
            <li>ネストして階層的な名前空間を作れる</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`module Payments
  class Invoice
    attr_reader :amount

    def initialize(amount)
      @amount = amount
    end

    def to_s = "請求書: #{amount}円"
  end

  class Receipt
    attr_reader :amount

    def initialize(amount)
      @amount = amount
    end

    def to_s = "領収書: #{amount}円"
  end

  TAX_RATE = 0.10
end

module Documents
  class Invoice
    def to_s = "書類形式の請求書"
  end
end

# :: で名前空間を指定してアクセス
inv1 = Payments::Invoice.new(5000)
inv2 = Documents::Invoice.new
rec  = Payments::Receipt.new(5500)

puts inv1
puts inv2
puts rec
puts Payments::TAX_RATE`}
          expectedOutput={`請求書: 5000円
書類形式の請求書
領収書: 5500円
0.1`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">ネストした名前空間</h2>
          <p className="text-gray-400 text-sm">
            名前空間はネストできます。大規模なgemやフレームワークでよく使われるパターンです。
          </p>
        </div>

        <RubyEditor
          defaultCode={`module MyApp
  VERSION = "1.0.0"

  module Models
    class User
      attr_reader :name
      def initialize(name) = (@name = name)
      def to_s = "User(#{name})"
    end

    class Post
      attr_reader :title
      def initialize(title) = (@title = title)
      def to_s = "Post(#{title})"
    end
  end

  module Controllers
    class UsersController
      def index
        puts "ユーザー一覧を表示"
      end
    end
  end
end

puts MyApp::VERSION
puts MyApp::Models::User.new("Alice")
puts MyApp::Models::Post.new("Hello Ruby")
MyApp::Controllers::UsersController.new.index`}
          expectedOutput={`1.0.0
User(Alice)
Post(Hello Ruby)
ユーザー一覧を表示`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="modules" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/modules" />
      </div>
    </div>
  );
}
