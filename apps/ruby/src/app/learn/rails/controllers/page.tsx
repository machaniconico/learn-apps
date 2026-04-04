import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コントローラ</h1>
        <p className="text-gray-400">ApplicationController、アクション、params、before_actionフィルタを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コントローラの基本</h2>
        <p className="text-gray-300 mb-3">
          コントローラはリクエストを受け取り、モデルからデータを取得して、ビューに渡す橋渡し役です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">ApplicationController</code> — 全コントローラの基底クラス</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">params</code> — URLパラメータやPOSTデータへのアクセス</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">before_action</code> — アクション実行前のフィルタ</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">strong parameters</code> — セキュリティのためのパラメータ許可</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: コントローラの基本構造</h2>
        <RubyEditor
          defaultCode={`# コントローラの擬似実装
class ApplicationController
  def authenticate_user!
    puts "  [フィルタ] ユーザー認証チェック"
  end
end

class PostsController < ApplicationController
  # before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    authenticate_user!
    posts = [
      { id: 1, title: "最初の投稿" },
      { id: 2, title: "二番目の投稿" }
    ]
    puts "index: #{posts.length}件の投稿"
  end

  def show
    id = 1  # params[:id]に相当
    puts "show: ID=#{id}の投稿を表示"
  end

  def create
    authenticate_user!
    puts "create: 新しい投稿を作成"
  end
end

controller = PostsController.new
controller.index
controller.show
controller.create`}
          expectedOutput={`  [フィルタ] ユーザー認証チェック
index: 2件の投稿
show: ID=1の投稿を表示
  [フィルタ] ユーザー認証チェック
create: 新しい投稿を作成`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: paramsとStrong Parameters</h2>
        <RubyEditor
          defaultCode={`# Strong Parametersの概念（擬似コード）
class StrongParams
  def initialize(params)
    @params = params
  end

  def require(key)
    raise "#{key}がありません" unless @params[key]
    self
  end

  def permit(*keys)
    @params.select { |k, _| keys.include?(k) }
  end
end

# POSTデータを模擬
raw_params = {
  post: {
    title: "Railsガイド",
    body: "学習中です",
    admin: true  # 許可されていない危険なパラメータ
  }
}

params = StrongParams.new(raw_params[:post])
# titleとbodyのみ許可、adminは除外される
safe_params = params.require(:post).permit(:title, :body)

puts "安全なパラメータ:"
safe_params.each { |k, v| puts "  #{k}: #{v}" }`}
          expectedOutput={`安全なパラメータ:
  title: Railsガイド
  body: 学習中です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="controllers" />
      </div>
      <LessonNav lessons={lessons} currentId="controllers" basePath="/learn/rails" />
    </div>
  );
}
