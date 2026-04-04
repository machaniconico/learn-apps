import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { OPENAPI_LESSONS } from "@/lib/lessons-data";

export default function OpenAPILearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">API仕様書（OpenAPI）入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">OpenAPI（Swagger）を使ってAPI仕様書を書き、チーム開発を効率化しよう</p>
      </div>

      <ProgressBar categoryId="openapi" totalLessons={3} color="green" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全3レッスン</h2>
        <LessonList lessons={OPENAPI_LESSONS} basePath="/learn/openapi" color="green" />
      </section>

      {/* OpenAPIとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OpenAPIとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">OpenAPI Specification（OAS）</strong>は、
          REST APIの仕様を記述するための標準フォーマットです。
          以前は<strong className="text-green-400">Swagger</strong>として知られていましたが、
          現在はLinux Foundation傘下のOpenAPI Initiativeが管理しています。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          YAML（またはJSON）でAPIのエンドポイント、リクエスト/レスポンスの形式、
          認証方法などを定義することで、フロントエンドとバックエンドの開発者が
          共通の仕様書をもとに並行開発できるようになります。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128196;</div>
            <h3 className="font-semibold text-white mb-1">API設計の標準化</h3>
            <p className="text-sm text-gray-400">YAMLで仕様を定義し、チーム全員が同じ仕様書を参照できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9881;</div>
            <h3 className="font-semibold text-white mb-1">自動コード生成</h3>
            <p className="text-sm text-gray-400">仕様書からクライアントSDKやサーバースタブを自動生成</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">ドキュメント自動生成</h3>
            <p className="text-sm text-gray-400">Swagger UIやRedocで見やすいAPIドキュメントを即座に公開</p>
          </div>
        </div>
      </section>

      {/* 学習ロードマップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">学習ロードマップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、API仕様書の基礎からツール活用まで段階的に学びます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">API仕様書の基本</code> &#8212; OpenAPIとは何か、API-first開発の考え方を理解する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">OpenAPIの書き方</code> &#8212; paths、schemas、parametersなどの定義を実践する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">ツールと自動生成</code> &#8212; Swagger UI、コード生成、バリデーションを活用する</li>
        </ul>
      </section>

      {/* 最初のOpenAPI定義 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">最初のOpenAPI定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          OpenAPIでは、YAMLまたはJSONでAPIの仕様を記述します。以下は最もシンプルなOpenAPI定義の例です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`openapi: "3.0.3"
info:
  title: My First API
  version: "1.0.0"
  description: はじめてのOpenAPI定義

paths:
  /hello:
    get:
      summary: 挨拶を返す
      responses:
        "200":
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: "Hello, World!"`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          各レッスンで、仕様書の書き方からツール活用まで順を追って学んでいきます。
        </p>
      </section>
    </div>
  );
}
