import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "exceptions")!;

export default function CustomExceptionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-orange-400">例外処理</p>
        <h1 className="text-3xl font-bold text-gray-100">カスタム例外</h1>
        <p className="text-gray-400">
          StandardErrorを継承して独自の例外クラスを定義する方法を学びます。アプリケーション固有のエラーを明確に表現できるようになります。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">カスタム例外クラスの定義</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-300">class MyError &lt; StandardError; end</code> の形で定義します。
          StandardErrorを継承することで、通常のrescueでキャッチできるようになります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# シンプルなカスタム例外
class ValidationError < StandardError; end

# デフォルトメッセージ付き
class DatabaseError < StandardError
  def initialize(msg = "データベース接続エラーが発生しました")
    super(msg)
  end
end

begin
  raise ValidationError, "メールアドレスの形式が正しくありません"
rescue ValidationError => e
  puts "バリデーションエラー: #{e.message}"
  puts "クラス: #{e.class}"
end

begin
  raise DatabaseError
rescue DatabaseError => e
  puts e.message
end`}
        expectedOutput={`バリデーションエラー: メールアドレスの形式が正しくありません
クラス: ValidationError
データベース接続エラーが発生しました`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">属性を持つカスタム例外</h2>
        <p className="text-gray-400 text-sm">
          カスタム例外クラスにインスタンス変数を追加することで、エラーに関する追加情報を保持できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`class HttpError < StandardError
  attr_reader :status_code, :url

  def initialize(status_code, url, msg = nil)
    @status_code = status_code
    @url = url
    super(msg || "HTTPエラー #{status_code}: #{url}")
  end
end

class NotFoundError < HttpError
  def initialize(url)
    super(404, url, "ページが見つかりません: #{url}")
  end
end

begin
  raise NotFoundError, "/about"
rescue HttpError => e
  puts "エラー: #{e.message}"
  puts "ステータスコード: #{e.status_code}"
  puts "URL: #{e.url}"
  puts "クラス: #{e.class}"
end`}
        expectedOutput={`エラー: ページが見つかりません: /about
ステータスコード: 404
URL: /about
クラス: NotFoundError`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">例外の階層設計</h2>
        <p className="text-gray-400 text-sm">
          カスタム例外を階層構造にすることで、特定のクラスでも親クラスでもキャッチできるようになります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`class AppError < StandardError; end
class AuthError < AppError; end
class PermissionError < AuthError; end

def check_permission(role)
  raise PermissionError, "管理者権限が必要です" unless role == :admin
  puts "アクセスを許可しました"
end

[:user, :admin].each do |role|
  begin
    check_permission(role)
  rescue AppError => e
    # AppError の子クラスも全部キャッチ
    puts "#{e.class}: #{e.message}"
  end
end`}
        expectedOutput={`PermissionError: 管理者権限が必要です
アクセスを許可しました`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="exceptions" lessonId="custom-exceptions" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="custom-exceptions"
        basePath="/learn/exceptions"
      />
    </div>
  );
}
