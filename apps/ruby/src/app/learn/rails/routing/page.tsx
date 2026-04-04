import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "rails")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Ruby on Rails入門 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング</h1>
        <p className="text-gray-400">routes.rbでURLとコントローラアクションを結びつける方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">routes.rbの基本</h2>
        <p className="text-gray-300 mb-3">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">config/routes.rb</code> でURLパターンとコントローラアクションを対応付けます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-red-300">resources :posts</code> — 7つのRESTfulアクションを一括定義</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">get '/about', to: 'pages#about'</code> — 個別ルート定義</li>
          <li><code className="bg-gray-800 px-1 rounded text-red-300">namespace :api</code> — 名前空間でグループ化</li>
          <li>ネストしたresourcesで親子関係を表現</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: RESTfulルーティングの7アクション</h2>
        <RubyEditor
          defaultCode={`# resources :posts が生成するルート一覧（擬似コード）
restful_routes = [
  { method: "GET",    path: "/posts",          action: "posts#index",   name: "一覧表示" },
  { method: "GET",    path: "/posts/new",       action: "posts#new",     name: "新規フォーム" },
  { method: "POST",   path: "/posts",          action: "posts#create",  name: "作成" },
  { method: "GET",    path: "/posts/:id",      action: "posts#show",    name: "詳細表示" },
  { method: "GET",    path: "/posts/:id/edit", action: "posts#edit",    name: "編集フォーム" },
  { method: "PATCH",  path: "/posts/:id",      action: "posts#update",  name: "更新" },
  { method: "DELETE", path: "/posts/:id",      action: "posts#destroy", name: "削除" },
]

puts "HTTPメソッド  パス                   アクション"
puts "-" * 60
restful_routes.each do |r|
  puts "#{r[:method].ljust(8)}  #{r[:path].ljust(22)} #{r[:action]}"
end`}
          expectedOutput={`HTTPメソッド  パス                   アクション
------------------------------------------------------------
GET       /posts                 posts#index
GET       /posts/new             posts#new
POST      /posts                 posts#create
GET       /posts/:id             posts#show
GET       /posts/:id/edit        posts#edit
PATCH     /posts/:id             posts#update
DELETE    /posts/:id             posts#destroy`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ネストしたルートと名前空間</h2>
        <RubyEditor
          defaultCode={`# ネストしたルートの例
# resources :posts do
#   resources :comments
# end
# -> /posts/:post_id/comments

nested_routes = [
  "/posts/1/comments",
  "/posts/1/comments/new",
  "/posts/1/comments/5",
]

puts "ネストしたルート例:"
nested_routes.each { |r| puts "  #{r}" }

# 名前空間の例
# namespace :api do
#   namespace :v1 do
#     resources :users
#   end
# end
puts "\nAPI名前空間の例:"
api_routes = ["/api/v1/users", "/api/v1/users/1"]
api_routes.each { |r| puts "  #{r}" }

# 個別ルート
puts "\n個別ルート:"
puts "  GET /about -> pages#about"
puts "  GET /contact -> pages#contact"`}
          expectedOutput={`ネストしたルート例:
  /posts/1/comments
  /posts/1/comments/new
  /posts/1/comments/5

API名前空間の例:
  /api/v1/users
  /api/v1/users/1

個別ルート:
  GET /about -> pages#about
  GET /contact -> pages#contact`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="rails" lessonId="routing" />
      </div>
      <LessonNav lessons={lessons} currentId="routing" basePath="/learn/rails" />
    </div>
  );
}
