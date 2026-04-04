import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { GRAPHQL_LESSONS } from "@/lib/lessons-data";

export default function GraphQLLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">GraphQL入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">APIのクエリ言語GraphQLを学び、効率的なデータ取得を実現しよう</p>
      </div>

      <ProgressBar categoryId="graphql" totalLessons={5} color="pink" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={GRAPHQL_LESSONS} basePath="/learn/graphql" color="pink" />
      </section>

      {/* GraphQLとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GraphQLとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">GraphQL</strong>は、Meta（旧Facebook）が2015年に公開した
          APIのためのクエリ言語です。クライアントが必要なデータの形を指定してリクエストするため、
          過不足のないデータ取得が可能になります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          RESTful APIでは複数のエンドポイントにリクエストする必要がある場面でも、
          GraphQLなら1回のリクエストで必要なデータをすべて取得できます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128269;</div>
            <h3 className="font-semibold text-white mb-1">必要なデータだけ取得</h3>
            <p className="text-sm text-gray-400">クライアントがフィールドを指定して、過不足のないレスポンスを得られる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128279;</div>
            <h3 className="font-semibold text-white mb-1">単一エンドポイント</h3>
            <p className="text-sm text-gray-400">すべてのリクエストを1つのURLで処理し、ネットワーク効率を向上</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128220;</div>
            <h3 className="font-semibold text-white mb-1">強力な型システム</h3>
            <p className="text-sm text-gray-400">スキーマでAPIの仕様を明確に定義し、自動ドキュメント生成</p>
          </div>
        </div>
      </section>

      {/* 学習ロードマップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">学習ロードマップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、GraphQLの基礎からフルスタック実装まで段階的に学びます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">基本概念</code> &#8212; RESTとの違い、GraphQLの強みを理解する</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">スキーマ定義</code> &#8212; SDL（Schema Definition Language）で型を設計する</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">リゾルバ実装</code> &#8212; Apollo Serverでバックエンドを構築する</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Apollo Client</code> &#8212; ReactからGraphQLを使ってデータを取得する</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">総合演習</code> &#8212; フルスタックGraphQLアプリケーションを構築する</li>
        </ul>
      </section>

      {/* 最初のGraphQLクエリ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">最初のGraphQLクエリ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GraphQLでは、クライアントが欲しいデータの形をクエリとして記述します。以下は最もシンプルなGraphQLクエリの例です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# GraphQLクエリ（リクエスト）
query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}

# レスポンス（JSON）
{
  "data": {
    "user": {
      "name": "田中太郎",
      "email": "taro@example.com",
      "posts": [
        { "title": "GraphQL入門" },
        { "title": "Apollo Serverの使い方" }
      ]
    }
  }
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          各レッスンで、スキーマ設計からフロントエンド実装まで順を追って学んでいきます。
        </p>
      </section>
    </div>
  );
}
