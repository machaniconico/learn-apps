export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  path: string;
  color: string;
  difficulty: Difficulty;
  lessons: Lesson[];
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "html", name: "HTML", path: "/learn/html", color: "orange", difficulty: "beginner", lessons: [] },
  { id: "css", name: "CSS", path: "/learn/css", color: "blue", difficulty: "beginner", lessons: [] },
  { id: "javascript", name: "JavaScript", path: "/learn/javascript", color: "yellow", difficulty: "beginner", lessons: [] },
  { id: "react", name: "React", path: "/learn/react", color: "green", difficulty: "beginner", lessons: [] },
  { id: "typescript", name: "TypeScript", path: "/learn/typescript", color: "green", difficulty: "beginner", lessons: [] },
  { id: "git", name: "Git", path: "/learn/git", color: "green", difficulty: "beginner", lessons: [] },
  { id: "nextjs", name: "Next.js", path: "/learn/nextjs", color: "purple", difficulty: "intermediate", lessons: [] },
  { id: "nodejs", name: "Node.js", path: "/learn/nodejs", color: "red", difficulty: "intermediate", lessons: [] },
  { id: "database", name: "データベース", path: "/learn/database", color: "cyan", difficulty: "intermediate", lessons: [] },
  { id: "testing", name: "テスト", path: "/learn/testing", color: "pink", difficulty: "intermediate", lessons: [] },
  { id: "deploy", name: "デプロイ", path: "/learn/deploy", color: "teal", difficulty: "intermediate", lessons: [] },
  { id: "design", name: "設計パターン", path: "/learn/design", color: "violet", difficulty: "advanced", lessons: [] },
  { id: "algorithm", name: "アルゴリズム", path: "/learn/algorithm", color: "yellow", difficulty: "intermediate" as Difficulty, lessons: [] },
  { id: "security", name: "セキュリティ", path: "/learn/security", color: "red", difficulty: "intermediate" as Difficulty, lessons: [] },
  { id: "project", name: "実践プロジェクト", path: "/learn/project", color: "indigo", difficulty: "advanced", lessons: [] },
  { id: "state-mgmt", name: "状態管理", path: "/learn/state-mgmt", color: "purple", difficulty: "intermediate", lessons: [] },
  { id: "performance", name: "パフォーマンス", path: "/learn/performance", color: "green", difficulty: "advanced", lessons: [] },
  { id: "monitoring", name: "モニタリング", path: "/learn/monitoring", color: "teal", difficulty: "advanced", lessons: [] },
  { id: "infra", name: "インフラ", path: "/learn/infra", color: "cyan", difficulty: "advanced", lessons: [] },
  { id: "graphql", name: "GraphQL", path: "/learn/graphql", color: "pink", difficulty: "intermediate", lessons: [] },
  { id: "websocket", name: "WebSocket", path: "/learn/websocket", color: "violet", difficulty: "intermediate", lessons: [] },
  { id: "agile", name: "アジャイル", path: "/learn/agile", color: "blue", difficulty: "beginner", lessons: [] },
  { id: "code-review", name: "コードレビュー", path: "/learn/code-review", color: "orange", difficulty: "beginner", lessons: [] },
  { id: "openapi", name: "API仕様書", path: "/learn/openapi", color: "green", difficulty: "intermediate", lessons: [] },
  { id: "storybook", name: "Storybook", path: "/learn/storybook", color: "pink", difficulty: "intermediate", lessons: [] },
];

export function getCategoryInfo(categoryId: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === categoryId);
}

export function getDifficultyLabel(d: Difficulty): string {
  switch (d) {
    case "beginner": return "初級";
    case "intermediate": return "中級";
    case "advanced": return "上級";
  }
}

export function getDifficultyColor(d: Difficulty): { bg: string; text: string } {
  switch (d) {
    case "beginner": return { bg: "bg-emerald-500/20", text: "text-emerald-400" };
    case "intermediate": return { bg: "bg-amber-500/20", text: "text-amber-400" };
    case "advanced": return { bg: "bg-rose-500/20", text: "text-rose-400" };
  }
}

export const HTML_LESSONS: Lesson[] = [
  { id: "basics", title: "HTMLの基本構造", description: "DOCTYPE、html、head、bodyの基本", category: "html", order: 1 },
  { id: "text", title: "見出しと段落", description: "h1-h6、p、リスト要素", category: "html", order: 2 },
  { id: "links-images", title: "リンクと画像", description: "a、img、パスの指定", category: "html", order: 3 },
  { id: "tables", title: "テーブル", description: "table、tr、td、thで表を作る", category: "html", order: 4 },
  { id: "forms", title: "フォーム", description: "input、textarea、select、バリデーション", category: "html", order: 5 },
  { id: "semantic", title: "セマンティックHTML", description: "header、nav、main、article、footer", category: "html", order: 6 },
  { id: "meta-seo", title: "メタデータとSEO", description: "meta、title、OGP、検索エンジン対策", category: "html", order: 7 },
  { id: "accessibility", title: "アクセシビリティ", description: "aria属性、alt、役割と配慮", category: "html", order: 8 },
  { id: "embed", title: "iframe・埋め込み", description: "YouTube、地図、外部コンテンツの埋め込み", category: "html", order: 9 },
  { id: "html-exercise", title: "HTML総合演習", description: "学んだ知識でWebページを作ろう", category: "html", order: 10 },
];

export const CSS_LESSONS: Lesson[] = [
  { id: "selectors", title: "セレクタとプロパティ", description: "基本のセレクタと値の指定", category: "css", order: 1 },
  { id: "box-model", title: "ボックスモデル", description: "margin、padding、border", category: "css", order: 2 },
  { id: "flexbox", title: "Flexboxレイアウト", description: "横並び、中央揃え、均等配置", category: "css", order: 3 },
  { id: "text-fonts", title: "テキスト・フォント", description: "font-family、size、weight、line-height", category: "css", order: 4 },
  { id: "backgrounds", title: "背景・グラデーション", description: "background、gradient、画像背景", category: "css", order: 5 },
  { id: "grid", title: "Gridレイアウト", description: "2次元グリッドで複雑なレイアウト", category: "css", order: 6 },
  { id: "position", title: "position", description: "relative、absolute、fixed、sticky", category: "css", order: 7 },
  { id: "animation", title: "アニメーション", description: "transition、@keyframes、transform", category: "css", order: 8 },
  { id: "pseudo", title: "疑似クラス・疑似要素", description: ":hover、:focus、::before、::after", category: "css", order: 9 },
  { id: "responsive", title: "レスポンシブデザイン", description: "@media、モバイルファースト", category: "css", order: 10 },
  { id: "css-exercise", title: "CSS総合演習", description: "プロフィールページをデザインしよう", category: "css", order: 11 },
];

export const JS_LESSONS: Lesson[] = [
  { id: "variables", title: "変数とデータ型", description: "let、const、文字列、数値、真偽値", category: "javascript", order: 1 },
  { id: "conditions", title: "条件分岐", description: "if/else、switch、三項演算子", category: "javascript", order: 2 },
  { id: "dom", title: "DOM操作", description: "要素の取得、変更、追加、削除", category: "javascript", order: 3 },
  { id: "strings", title: "文字列操作", description: "slice、includes、replace、テンプレートリテラル", category: "javascript", order: 4 },
  { id: "arrays", title: "配列メソッド", description: "map、filter、reduce、find、sort", category: "javascript", order: 5 },
  { id: "objects", title: "オブジェクト詳細", description: "プロパティ、メソッド、分割代入", category: "javascript", order: 6 },
  { id: "loops", title: "ループ", description: "for、while、for...of、forEach", category: "javascript", order: 7 },
  { id: "functions", title: "関数詳細", description: "アロー関数、スコープ、クロージャ", category: "javascript", order: 8 },
  { id: "classes", title: "クラスとOOP", description: "class、constructor、extends、継承", category: "javascript", order: 9 },
  { id: "errors", title: "エラーハンドリング", description: "try/catch、throw、カスタムエラー", category: "javascript", order: 10 },
  { id: "async", title: "非同期処理", description: "Promise、async/await、コールバック", category: "javascript", order: 11 },
  { id: "fetch-api", title: "Fetch API", description: "HTTPリクエスト、JSONの取得・送信", category: "javascript", order: 12 },
  { id: "storage", title: "ローカルストレージ", description: "データの永続化、JSON変換", category: "javascript", order: 13 },
  { id: "modules", title: "モジュール", description: "import/export、コードの分割", category: "javascript", order: 14 },
  { id: "js-exercise", title: "JavaScript総合演習", description: "TODOアプリを作ろう", category: "javascript", order: 15 },
];

export const REACT_LESSONS: Lesson[] = [
  { id: "jsx", title: "JSXの基本", description: "HTMLに似たJavaScriptの構文", category: "react", order: 1 },
  { id: "components", title: "コンポーネント", description: "UIの部品を作って組み合わせる", category: "react", order: 2 },
  { id: "props", title: "Props", description: "コンポーネントにデータを渡す", category: "react", order: 3 },
  { id: "state", title: "State（useState）", description: "コンポーネントの状態管理", category: "react", order: 4 },
  { id: "hooks", title: "Hooks入門", description: "useState、useEffect、カスタムHook", category: "react", order: 5 },
  { id: "effects", title: "useEffect", description: "副作用の処理（API呼び出し等）", category: "react", order: 6 },
  { id: "events", title: "イベント処理", description: "クリック、入力、フォーム送信", category: "react", order: 7 },
  { id: "lists", title: "リスト表示とKey", description: "配列データの繰り返し描画", category: "react", order: 8 },
  { id: "routing", title: "ルーティング", description: "ページ遷移の仕組み", category: "react", order: 9 },
  { id: "react-exercise", title: "React総合演習", description: "天気予報アプリを作ろう", category: "react", order: 10 },
];

export const TYPESCRIPT_LESSONS: Lesson[] = [
  { id: "basics", title: "TypeScriptの基本", description: "型のある JavaScript", category: "typescript", order: 1 },
  { id: "types", title: "基本の型", description: "string、number、boolean、配列、タプル", category: "typescript", order: 2 },
  { id: "interfaces", title: "インターフェース", description: "オブジェクトの型定義", category: "typescript", order: 3 },
  { id: "generics", title: "ジェネリクス", description: "型を引数にする柔軟な型定義", category: "typescript", order: 4 },
  { id: "ts-exercise", title: "TypeScript総合演習", description: "型安全なTODOアプリ", category: "typescript", order: 5 },
];

export const GIT_LESSONS: Lesson[] = [
  { id: "basics", title: "Gitの基本", description: "init、add、commit、status、log", category: "git", order: 1 },
  { id: "branching", title: "ブランチ", description: "branch、checkout、merge", category: "git", order: 2 },
  { id: "remote", title: "リモートリポジトリ", description: "push、pull、clone、GitHub", category: "git", order: 3 },
  { id: "collaboration", title: "チーム開発", description: "PR、コードレビュー、コンフリクト解消", category: "git", order: 4 },
  { id: "git-exercise", title: "Git総合演習", description: "実践的なワークフロー", category: "git", order: 5 },
];

export const NEXTJS_LESSONS: Lesson[] = [
  { id: "basics", title: "Next.jsの基本", description: "React フレームワークの特徴と環境構築", category: "nextjs", order: 1 },
  { id: "routing", title: "ファイルベースルーティング", description: "App Router、動的ルート、レイアウト", category: "nextjs", order: 2 },
  { id: "data-fetching", title: "データ取得", description: "Server Components、fetch、キャッシュ", category: "nextjs", order: 3 },
  { id: "api-routes", title: "APIルート", description: "Route Handlers でバックエンドAPI を作る", category: "nextjs", order: 4 },
  { id: "rendering", title: "レンダリング戦略", description: "SSR、SSG、ISR、CSRの使い分け", category: "nextjs", order: 5 },
  { id: "nextjs-exercise", title: "Next.js総合演習", description: "ブログサイトを作ろう", category: "nextjs", order: 6 },
];

export const NODEJS_LESSONS: Lesson[] = [
  { id: "basics", title: "Node.jsの基本", description: "サーバーサイドJavaScriptの世界", category: "nodejs", order: 1 },
  { id: "modules", title: "モジュールシステム", description: "CommonJS、ESModules、npm", category: "nodejs", order: 2 },
  { id: "express", title: "Express入門", description: "Webフレームワークでサーバーを作る", category: "nodejs", order: 3 },
  { id: "rest-api", title: "REST API設計", description: "CRUD操作とHTTPメソッド", category: "nodejs", order: 4 },
  { id: "middleware", title: "ミドルウェア", description: "認証、ログ、エラーハンドリング", category: "nodejs", order: 5 },
  { id: "nodejs-exercise", title: "Node.js総合演習", description: "REST APIサーバーを作ろう", category: "nodejs", order: 6 },
];

export const DATABASE_LESSONS: Lesson[] = [
  { id: "basics", title: "データベースの基本", description: "RDB と NoSQL の違いと選び方", category: "database", order: 1 },
  { id: "sql", title: "SQL入門", description: "SELECT、INSERT、UPDATE、DELETE", category: "database", order: 2 },
  { id: "relations", title: "リレーションと正規化", description: "テーブル設計と外部キー", category: "database", order: 3 },
  { id: "orm", title: "ORM（Prisma）", description: "コードからDBを操作する", category: "database", order: 4 },
  { id: "db-exercise", title: "データベース総合演習", description: "ユーザー管理APIを作ろう", category: "database", order: 5 },
];

export const TESTING_LESSONS: Lesson[] = [
  { id: "basics", title: "テストの基本", description: "なぜテストを書くのか？テストの種類", category: "testing", order: 1 },
  { id: "unit", title: "ユニットテスト", description: "Jest / Vitestで関数をテスト", category: "testing", order: 2 },
  { id: "integration", title: "統合テスト", description: "API・コンポーネントの結合テスト", category: "testing", order: 3 },
  { id: "e2e", title: "E2Eテスト", description: "Playwrightでブラウザテスト", category: "testing", order: 4 },
  { id: "testing-exercise", title: "テスト総合演習", description: "TODOアプリにテストを書こう", category: "testing", order: 5 },
];

export const DEPLOY_LESSONS: Lesson[] = [
  { id: "basics", title: "デプロイの基本", description: "開発から本番公開までの流れ", category: "deploy", order: 1 },
  { id: "docker", title: "Docker入門", description: "コンテナで環境を統一する", category: "deploy", order: 2 },
  { id: "cicd", title: "CI/CD入門", description: "GitHub Actionsで自動化", category: "deploy", order: 3 },
  { id: "cloud", title: "クラウドサービス", description: "Vercel、AWS、GCPの比較", category: "deploy", order: 4 },
  { id: "deploy-exercise", title: "デプロイ総合演習", description: "Next.jsアプリを公開しよう", category: "deploy", order: 5 },
];

export const DESIGN_LESSONS: Lesson[] = [
  { id: "basics", title: "設計の基本原則", description: "良いコードとは何か？", category: "design", order: 1 },
  { id: "solid", title: "SOLID原則", description: "5つのオブジェクト指向設計原則", category: "design", order: 2 },
  { id: "patterns", title: "よく使うデザインパターン", description: "Singleton、Observer、Factory等", category: "design", order: 3 },
  { id: "architecture", title: "アーキテクチャパターン", description: "MVC、クリーンアーキテクチャ、DDD", category: "design", order: 4 },
  { id: "design-exercise", title: "設計パターン総合演習", description: "リファクタリングで設計を改善", category: "design", order: 5 },
];

export const ALGORITHM_LESSONS: Lesson[] = [
  { id: "basics", title: "アルゴリズムとは", description: "計算量、Big O記法、効率的な問題解決", category: "algorithm", order: 1 },
  { id: "sort", title: "ソートアルゴリズム", description: "バブル、選択、挿入、マージ、クイックソート", category: "algorithm", order: 2 },
  { id: "search", title: "探索アルゴリズム", description: "線形探索、二分探索、幅優先、深さ優先", category: "algorithm", order: 3 },
  { id: "data-structures", title: "データ構造", description: "配列、連結リスト、スタック、キュー、木、グラフ", category: "algorithm", order: 4 },
  { id: "algorithm-exercise", title: "アルゴリズム総合演習", description: "実践的な問題を解こう", category: "algorithm", order: 5 },
];

export const SECURITY_LESSONS: Lesson[] = [
  { id: "basics", title: "セキュリティの基本", description: "脅威モデル、攻撃の種類、防御の考え方", category: "security", order: 1 },
  { id: "web-attacks", title: "Webアプリの脆弱性", description: "XSS、CSRF、SQLインジェクション、OWASP Top 10", category: "security", order: 2 },
  { id: "auth-security", title: "認証とセキュリティ", description: "パスワード管理、JWT、OAuth、多要素認証", category: "security", order: 3 },
  { id: "https-cors", title: "HTTPS・CORS", description: "通信の暗号化、同一オリジンポリシー", category: "security", order: 4 },
  { id: "security-exercise", title: "セキュリティ総合演習", description: "脆弱性を見つけて修正しよう", category: "security", order: 5 },
];

export const PROJECT_LESSONS: Lesson[] = [
  { id: "portfolio", title: "ポートフォリオサイト", description: "HTML/CSS/JSで自己紹介サイトを作る", category: "project", order: 1 },
  { id: "todo-fullstack", title: "フルスタックTODO", description: "Next.js + DB で本格的なTODOアプリ", category: "project", order: 2 },
  { id: "ec-site", title: "ECサイト（模擬）", description: "商品一覧、カート、決済フローを実装", category: "project", order: 3 },
  { id: "chat-app", title: "リアルタイムチャット", description: "WebSocketで双方向通信", category: "project", order: 4 },
  { id: "project-exercise", title: "オリジナルアプリ企画", description: "自分だけのWebアプリを設計・実装", category: "project", order: 5 },
];

export const STATE_MGMT_LESSONS: Lesson[] = [
  { id: "basics", title: "状態管理の基本", description: "なぜ状態管理が必要か？props drilling問題", category: "state-mgmt", order: 1 },
  { id: "context", title: "useContext", description: "React組み込みのグローバル状態管理", category: "state-mgmt", order: 2 },
  { id: "redux", title: "Redux Toolkit", description: "大規模アプリの状態管理デファクト", category: "state-mgmt", order: 3 },
  { id: "zustand", title: "Zustand / Jotai", description: "軽量で使いやすい状態管理ライブラリ", category: "state-mgmt", order: 4 },
  { id: "state-exercise", title: "状態管理総合演習", description: "ショッピングカートで状態管理を実践", category: "state-mgmt", order: 5 },
];

export const PERFORMANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "パフォーマンスの基本", description: "Core Web Vitals、計測の重要性", category: "performance", order: 1 },
  { id: "lighthouse", title: "Lighthouse", description: "パフォーマンス計測と改善指標", category: "performance", order: 2 },
  { id: "images", title: "画像・アセット最適化", description: "WebP、lazy loading、CDN", category: "performance", order: 3 },
  { id: "code-splitting", title: "コード分割とメモ化", description: "dynamic import、React.memo、useMemo", category: "performance", order: 4 },
  { id: "performance-exercise", title: "パフォーマンス総合演習", description: "遅いページを高速化しよう", category: "performance", order: 5 },
];

export const MONITORING_LESSONS: Lesson[] = [
  { id: "basics", title: "モニタリングの基本", description: "なぜ監視するのか？可観測性の3本柱", category: "monitoring", order: 1 },
  { id: "logging", title: "ログ設計", description: "構造化ログ、ログレベル、Winston", category: "monitoring", order: 2 },
  { id: "error-tracking", title: "エラー監視（Sentry）", description: "エラー検知、スタックトレース、アラート", category: "monitoring", order: 3 },
  { id: "metrics", title: "メトリクスとダッシュボード", description: "Datadog、Grafana、カスタムメトリクス", category: "monitoring", order: 4 },
  { id: "monitoring-exercise", title: "モニタリング総合演習", description: "監視体制を構築しよう", category: "monitoring", order: 5 },
];

export const INFRA_LESSONS: Lesson[] = [
  { id: "basics", title: "インフラの基本", description: "サーバー、ネットワーク、クラウドの全体像", category: "infra", order: 1 },
  { id: "linux", title: "Linux基礎", description: "コマンドライン、ファイル操作、権限", category: "infra", order: 2 },
  { id: "nginx", title: "Nginx入門", description: "Webサーバー、リバースプロキシ、SSL", category: "infra", order: 3 },
  { id: "kubernetes", title: "Kubernetes入門", description: "コンテナオーケストレーションの基本", category: "infra", order: 4 },
  { id: "infra-exercise", title: "インフラ総合演習", description: "本番環境を構築しよう", category: "infra", order: 5 },
];

export const GRAPHQL_LESSONS: Lesson[] = [
  { id: "basics", title: "GraphQLの基本", description: "RESTとの違い、メリットとデメリット", category: "graphql", order: 1 },
  { id: "schema", title: "スキーマ定義", description: "型定義、Query、Mutation、Subscription", category: "graphql", order: 2 },
  { id: "resolver", title: "リゾルバ実装", description: "Apollo Server、データソース接続", category: "graphql", order: 3 },
  { id: "client", title: "Apollo Client", description: "React からGraphQLを使う", category: "graphql", order: 4 },
  { id: "graphql-exercise", title: "GraphQL総合演習", description: "GraphQL APIを設計・実装しよう", category: "graphql", order: 5 },
];

export const WEBSOCKET_LESSONS: Lesson[] = [
  { id: "basics", title: "WebSocketの基本", description: "HTTPとの違い、双方向通信の仕組み", category: "websocket", order: 1 },
  { id: "socketio", title: "Socket.IO入門", description: "イベント駆動のリアルタイム通信", category: "websocket", order: 2 },
  { id: "rooms", title: "ルームと名前空間", description: "グループ通信、チャネル分離", category: "websocket", order: 3 },
  { id: "auth", title: "認証とエラー処理", description: "接続時の認証、再接続、エラーハンドリング", category: "websocket", order: 4 },
  { id: "websocket-exercise", title: "WebSocket総合演習", description: "リアルタイムダッシュボードを作ろう", category: "websocket", order: 5 },
];

export const AGILE_LESSONS: Lesson[] = [
  { id: "basics", title: "アジャイル開発とは", description: "ウォーターフォールとの違い、アジャイル宣言", category: "agile", order: 1 },
  { id: "scrum", title: "スクラム入門", description: "スプリント、ロール、セレモニー", category: "agile", order: 2 },
  { id: "kanban", title: "カンバンとタスク管理", description: "カンバンボード、WIP制限、フロー効率", category: "agile", order: 3 },
  { id: "tools", title: "開発ツールと運用", description: "Jira、Linear、GitHub Projects", category: "agile", order: 4 },
  { id: "agile-exercise", title: "アジャイル総合演習", description: "スプリント計画を立ててみよう", category: "agile", order: 5 },
];

export const CODE_REVIEW_LESSONS: Lesson[] = [
  { id: "basics", title: "コードレビューの基本", description: "なぜレビューするのか、レビューの観点", category: "code-review", order: 1 },
  { id: "pr-writing", title: "良いPRの書き方", description: "タイトル、説明、差分の分割", category: "code-review", order: 2 },
  { id: "review-practice", title: "レビュー実践", description: "指摘の仕方・受け方、実例で学ぶ", category: "code-review", order: 3 },
];

export const OPENAPI_LESSONS: Lesson[] = [
  { id: "basics", title: "API仕様書の基本", description: "OpenAPIとは、なぜ仕様書が必要か", category: "openapi", order: 1 },
  { id: "writing", title: "OpenAPIの書き方", description: "paths、schemas、parameters、responses", category: "openapi", order: 2 },
  { id: "tooling", title: "ツールと自動生成", description: "Swagger UI、コード生成、バリデーション", category: "openapi", order: 3 },
];

export const STORYBOOK_LESSONS: Lesson[] = [
  { id: "basics", title: "Storybookの基本", description: "コンポーネントカタログとは、セットアップ", category: "storybook", order: 1 },
  { id: "stories", title: "ストーリーの書き方", description: "args、controls、decorators", category: "storybook", order: 2 },
  { id: "advanced", title: "実践的な活用", description: "アドオン、ビジュアルテスト、ドキュメント生成", category: "storybook", order: 3 },
];

export function getAllLessons(category: string): Lesson[] {
  switch (category) {
    case "html": return HTML_LESSONS;
    case "css": return CSS_LESSONS;
    case "javascript": return JS_LESSONS;
    case "react": return REACT_LESSONS;
    case "typescript": return TYPESCRIPT_LESSONS;
    case "git": return GIT_LESSONS;
    case "nextjs": return NEXTJS_LESSONS;
    case "nodejs": return NODEJS_LESSONS;
    case "database": return DATABASE_LESSONS;
    case "testing": return TESTING_LESSONS;
    case "deploy": return DEPLOY_LESSONS;
    case "design": return DESIGN_LESSONS;
    case "algorithm": return ALGORITHM_LESSONS;
    case "security": return SECURITY_LESSONS;
    case "project": return PROJECT_LESSONS;
    case "state-mgmt": return STATE_MGMT_LESSONS;
    case "performance": return PERFORMANCE_LESSONS;
    case "monitoring": return MONITORING_LESSONS;
    case "infra": return INFRA_LESSONS;
    case "graphql": return GRAPHQL_LESSONS;
    case "websocket": return WEBSOCKET_LESSONS;
    case "agile": return AGILE_LESSONS;
    case "code-review": return CODE_REVIEW_LESSONS;
    case "openapi": return OPENAPI_LESSONS;
    case "storybook": return STORYBOOK_LESSONS;
    default: return [];
  }
}
