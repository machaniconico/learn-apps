import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { OPENAPI_LESSONS } from "@/lib/lessons-data";

export default function OpenAPIWritingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">OpenAPI レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-4 mb-2">OpenAPIの書き方</h1>
        <p className="text-gray-400">paths、schemas、parameters、responsesの定義を実践しよう</p>
      </div>

      {/* paths定義（GET / POST / PUT / DELETE） */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">paths定義（CRUD操作）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">paths</strong>はAPIのエンドポイントを定義するセクションです。
          HTTPメソッド（GET / POST / PUT / DELETE）ごとに操作を記述します。
          TODO APIを例に、CRUD操作の定義を見ていきましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`paths:
  /todos:
    get:
      tags:
        - todos
      summary: TODO一覧を取得
      description: 登録されているTODOの一覧を返します
      operationId: getTodos
      responses:
        "200":
          description: 成功
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Todo"

    post:
      tags:
        - todos
      summary: TODOを作成
      description: 新しいTODOを作成します
      operationId: createTodo
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateTodoRequest"
      responses:
        "201":
          description: 作成成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Todo"
        "400":
          description: バリデーションエラー
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /todos/{todoId}:
    put:
      tags:
        - todos
      summary: TODOを更新
      operationId: updateTodo
      parameters:
        - $ref: "#/components/parameters/TodoId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateTodoRequest"
      responses:
        "200":
          description: 更新成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Todo"
        "404":
          description: TODOが見つからない

    delete:
      tags:
        - todos
      summary: TODOを削除
      operationId: deleteTodo
      parameters:
        - $ref: "#/components/parameters/TodoId"
      responses:
        "204":
          description: 削除成功
        "404":
          description: TODOが見つからない`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">operationId</code>は
          各操作に一意のIDを付けるもので、コード生成時に関数名として使われます。
        </p>
      </section>

      {/* parameters（path / query / header） */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">parameters（パラメータ定義）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          APIのパラメータには<strong className="text-green-400">path</strong>（パスパラメータ）、
          <strong className="text-green-400">query</strong>（クエリパラメータ）、
          <strong className="text-green-400">header</strong>（ヘッダーパラメータ）の3種類があります。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# パスパラメータ: /todos/{todoId}
# URL の一部として値を渡す
parameters:
  - name: todoId
    in: path
    required: true          # pathパラメータは常にrequired: true
    description: TODOのID
    schema:
      type: integer
      example: 42

# クエリパラメータ: /todos?status=done&limit=10
# URLの ? 以降に付与される
  - name: status
    in: query
    required: false
    description: TODOのステータスでフィルタ
    schema:
      type: string
      enum:
        - todo
        - doing
        - done
      example: doing

  - name: limit
    in: query
    required: false
    description: 取得件数の上限
    schema:
      type: integer
      minimum: 1
      maximum: 100
      default: 20

# ヘッダーパラメータ
  - name: X-Request-Id
    in: header
    required: false
    description: リクエストの追跡用ID
    schema:
      type: string
      format: uuid

# components で再利用可能にする
components:
  parameters:
    TodoId:
      name: todoId
      in: path
      required: true
      description: TODOのID
      schema:
        type: integer
        example: 42

# 使い方: $ref で参照
# parameters:
#   - $ref: "#/components/parameters/TodoId"`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          よく使うパラメータは<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">components/parameters</code>に
          定義して<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">$ref</code>で参照すると、重複を避けられます。
        </p>
      </section>

      {/* requestBody と responses */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">requestBody と responses</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          POST / PUT リクエストのボディと、各HTTPステータスコードに対応するレスポンスを定義します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`# requestBody の定義
requestBody:
  required: true
  description: 作成するTODOの情報
  content:
    application/json:           # Content-Type
      schema:
        $ref: "#/components/schemas/CreateTodoRequest"
      example:                  # リクエスト例
        title: "牛乳を買う"
        description: "スーパーで低脂肪牛乳を購入"
        priority: "high"

# responses の定義
responses:
  # 成功レスポンス
  "200":
    description: 成功
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Todo"
        example:
          id: 1
          title: "牛乳を買う"
          status: "todo"
          createdAt: "2025-01-15T10:30:00Z"

  # バリデーションエラー
  "400":
    description: リクエストが不正です
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          code: "VALIDATION_ERROR"
          message: "titleは必須です"
          details:
            - field: "title"
              message: "必須項目です"

  # 認証エラー
  "401":
    description: 認証が必要です

  # 権限エラー
  "403":
    description: アクセス権限がありません

  # Not Found
  "404":
    description: リソースが見つかりません
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          code: "NOT_FOUND"
          message: "指定されたTODOは存在しません"

  # サーバーエラー
  "500":
    description: サーバー内部エラー
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Error"
        example:
          code: "INTERNAL_ERROR"
          message: "予期しないエラーが発生しました"`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">example</code>を記述しておくと、
          Swagger UIで具体的な値が表示され、APIの使い方がわかりやすくなります。
        </p>
      </section>

      {/* schemas（$ref / allOf / oneOf） */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">schemas（スキーマ定義）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">components/schemas</strong>にデータモデルを定義します。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">$ref</code>で参照することで
          重複を排除し、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">allOf</code>や
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">oneOf</code>で
          スキーマを組み合わせることもできます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`components:
  schemas:
    # 基本の Todo スキーマ
    Todo:
      type: object
      required:
        - id
        - title
        - status
        - createdAt
      properties:
        id:
          type: integer
          description: TODOの一意なID
          example: 1
        title:
          type: string
          description: TODOのタイトル
          example: "牛乳を買う"
          maxLength: 100
        description:
          type: string
          description: TODOの詳細説明
          nullable: true
          example: "スーパーで低脂肪牛乳を購入"
        status:
          type: string
          enum:
            - todo
            - doing
            - done
          description: TODOのステータス
          example: "todo"
        priority:
          type: string
          enum:
            - low
            - medium
            - high
          default: "medium"
        createdAt:
          type: string
          format: date-time
          example: "2025-01-15T10:30:00Z"

    # 作成リクエスト用スキーマ
    CreateTodoRequest:
      type: object
      required:
        - title
      properties:
        title:
          type: string
          maxLength: 100
        description:
          type: string
          nullable: true
        priority:
          type: string
          enum: [low, medium, high]

    # 更新リクエスト用スキーマ（allOf で継承）
    UpdateTodoRequest:
      allOf:
        - $ref: "#/components/schemas/CreateTodoRequest"
        - type: object
          properties:
            status:
              type: string
              enum: [todo, doing, done]

    # エラーレスポンス
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          example: "VALIDATION_ERROR"
        message:
          type: string
          example: "バリデーションエラーが発生しました"
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string

    # oneOf の例：通知の種類で構造が変わる
    Notification:
      oneOf:
        - $ref: "#/components/schemas/EmailNotification"
        - $ref: "#/components/schemas/SlackNotification"
      discriminator:
        propertyName: type

    EmailNotification:
      type: object
      required: [type, to, subject]
      properties:
        type:
          type: string
          enum: [email]
        to:
          type: string
          format: email
        subject:
          type: string

    SlackNotification:
      type: object
      required: [type, channel]
      properties:
        type:
          type: string
          enum: [slack]
        channel:
          type: string`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">allOf</code>は「すべてのスキーマを満たす」（継承に相当）、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">oneOf</code>は「いずれか1つのスキーマを満たす」（ユニオン型に相当）です。
        </p>
      </section>

      {/* 完全なTODO API仕様書 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">完全なTODO API仕様書</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ここまで学んだ要素をすべて組み合わせた、完全なTODO API仕様書の全体像です。
          実際のプロジェクトではこのようなファイルを
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">openapi.yaml</code>として管理します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`openapi: "3.0.3"
info:
  title: Todo API
  version: "1.0.0"
  description: |
    TODOアプリのREST API仕様書です。
    タスクの作成・取得・更新・削除（CRUD）をサポートします。

servers:
  - url: http://localhost:3000/api/v1
    description: 開発環境
  - url: https://api.example.com/v1
    description: 本番環境

tags:
  - name: todos
    description: TODO操作

paths:
  /todos:
    get:
      tags: [todos]
      summary: TODO一覧を取得
      operationId: getTodos
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [todo, doing, done]
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        "200":
          description: 成功
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Todo"
    post:
      tags: [todos]
      summary: TODOを作成
      operationId: createTodo
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateTodoRequest"
      responses:
        "201":
          description: 作成成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Todo"
        "400":
          $ref: "#/components/responses/BadRequest"

  /todos/{todoId}:
    get:
      tags: [todos]
      summary: TODO詳細を取得
      operationId: getTodo
      parameters:
        - $ref: "#/components/parameters/TodoId"
      responses:
        "200":
          description: 成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Todo"
        "404":
          $ref: "#/components/responses/NotFound"
    put:
      tags: [todos]
      summary: TODOを更新
      operationId: updateTodo
      parameters:
        - $ref: "#/components/parameters/TodoId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateTodoRequest"
      responses:
        "200":
          description: 更新成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Todo"
        "404":
          $ref: "#/components/responses/NotFound"
    delete:
      tags: [todos]
      summary: TODOを削除
      operationId: deleteTodo
      parameters:
        - $ref: "#/components/parameters/TodoId"
      responses:
        "204":
          description: 削除成功
        "404":
          $ref: "#/components/responses/NotFound"

components:
  parameters:
    TodoId:
      name: todoId
      in: path
      required: true
      schema:
        type: integer
  schemas:
    Todo:
      type: object
      required: [id, title, status, createdAt]
      properties:
        id:
          type: integer
        title:
          type: string
        description:
          type: string
          nullable: true
        status:
          type: string
          enum: [todo, doing, done]
        createdAt:
          type: string
          format: date-time
    CreateTodoRequest:
      type: object
      required: [title]
      properties:
        title:
          type: string
          maxLength: 100
        description:
          type: string
        priority:
          type: string
          enum: [low, medium, high]
    UpdateTodoRequest:
      allOf:
        - $ref: "#/components/schemas/CreateTodoRequest"
        - type: object
          properties:
            status:
              type: string
              enum: [todo, doing, done]
    Error:
      type: object
      required: [code, message]
      properties:
        code:
          type: string
        message:
          type: string
  responses:
    BadRequest:
      description: リクエストが不正です
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
    NotFound:
      description: リソースが見つかりません
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">components/responses</code>を
          使うことで、共通のエラーレスポンスも再利用可能になります。
        </p>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">paths</code>でエンドポイントとHTTPメソッドごとの操作を定義する</li>
          <li>パラメータには<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">path</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">query</code>、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">header</code>の3種類がある</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">requestBody</code>でPOST/PUTのリクエストボディを定義する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">responses</code>でHTTPステータスコードごとのレスポンスを定義する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">$ref</code>と<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">components</code>でスキーマを再利用し、DRYに保つ</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">allOf</code>でスキーマの継承、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">oneOf</code>でユニオン型を表現できる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="openapi" lessonId="writing" color="green" />
      <LessonNav lessons={OPENAPI_LESSONS} currentId="writing" basePath="/learn/openapi" color="green" />
    </div>
  );
}
