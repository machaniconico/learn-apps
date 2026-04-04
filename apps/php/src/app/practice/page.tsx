import { PhpEditor } from "@/components/php-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: 掲示板データ管理 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-green-900 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">初級</span>
          <h2 className="text-xl font-bold text-white">掲示板データ管理</h2>
        </div>
        <p className="text-gray-400 mb-4">配列と関数を使って、掲示板の投稿データを管理するプログラムを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>連想配列で投稿データ（タイトル・本文・投稿者・日時）を管理する</li>
          <li>投稿の追加・削除・検索を関数で実装する</li>
          <li>投稿を日時の降順で並び替える</li>
          <li>キーワードで投稿を検索して一覧表示する</li>
        </ul>
        <PhpEditor
          defaultCode={`<?php
// TODO: 投稿を追加するcreatePost関数を実装する
// function createPost(array &$posts, string $title, string $body, string $author): void

// TODO: 投稿をIDで削除するdeletePost関数を実装する
// function deletePost(array &$posts, int $id): bool

// TODO: キーワードで投稿を検索するsearchPosts関数を実装する
// function searchPosts(array $posts, string $keyword): array

// TODO: 投稿一覧を表示するprintPosts関数を実装する
// function printPosts(array $posts): void

$posts = [];

// TODO: 5件の投稿を追加する（PHPプログラミング、Web開発などのトピック）

// TODO: 投稿一覧を表示する

// TODO: "PHP"キーワードで検索して結果を表示する

// TODO: 1件削除してから再度一覧を表示する`}
        />
      </div>

      {/* プロジェクト2: ユーザー認証システム */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">ユーザー認証システム</h2>
        </div>
        <p className="text-gray-400 mb-4">クラスとパスワードハッシュを使って、安全なユーザー認証システムを実装しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">password_hash()</code> でパスワードを安全にハッシュ化する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">password_verify()</code> でログイン認証を行う</li>
          <li>ログイン試行回数を制限するロックアウト機能を追加する</li>
          <li>バリデーション（メール形式・パスワード強度）を実装する</li>
        </ul>
        <PhpEditor
          defaultCode={`<?php
class UserAuth {
    private array $users = [];
    private array $loginAttempts = [];
    private int $maxAttempts = 3;

    // TODO: ユーザー登録メソッドを実装する
    // パスワードはpassword_hash()でハッシュ化して保存
    // public function register(string $email, string $password): bool

    // TODO: ログインメソッドを実装する
    // 試行回数制限付き、password_verify()で確認
    // public function login(string $email, string $password): bool

    // TODO: パスワード強度チェックメソッドを実装する
    // 8文字以上、大小文字・数字・記号を含むか確認
    // private function isStrongPassword(string $password): bool

    // TODO: メールアドレス形式バリデーション
    // private function isValidEmail(string $email): bool
}

$auth = new UserAuth();

// TODO: ユーザーを登録する
// TODO: 正しいパスワードでログイン試行する
// TODO: 間違ったパスワードで3回試行してロックアウトを確認する`}
        />
      </div>

      {/* プロジェクト3: APIレスポンス生成 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">APIレスポンス生成</h2>
        </div>
        <p className="text-gray-400 mb-4">連想配列とJSONを使って、RESTful APIのレスポンスを生成・処理するシステムを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>成功・エラー・ページネーション付きレスポンスを統一フォーマットで生成する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">json_encode()</code> / <code className="text-orange-300 bg-gray-800 px-1 rounded">json_decode()</code> でデータ変換する</li>
          <li>HTTPステータスコードとメッセージを管理する</li>
          <li>入れ子になったデータ構造を整形して出力する</li>
        </ul>
        <PhpEditor
          defaultCode={`<?php
class ApiResponse {
    // TODO: 成功レスポンスを生成するsuccessメソッドを実装する
    // ["status" => "success", "data" => $data, "timestamp" => time()]
    // public static function success(mixed $data, int $statusCode = 200): string

    // TODO: エラーレスポンスを生成するerrorメソッドを実装する
    // ["status" => "error", "code" => $code, "message" => $message]
    // public static function error(string $message, int $code = 400): string

    // TODO: ページネーション付きレスポンスを生成するpaginatedメソッドを実装する
    // ["status" => "success", "data" => $items, "pagination" => [...]]
    // public static function paginated(array $items, int $page, int $total, int $perPage = 10): string
}

// TODO: 商品一覧データを定義する（ID、名前、価格、カテゴリ）
$products = [];

// TODO: 全商品のsuccessレスポンスを生成・出力する
// TODO: 存在しないIDへのerrorレスポンスを生成・出力する
// TODO: ページネーション付きレスポンスを生成・出力する（1ページ目、1件/ページ）`}
        />
      </div>

      {/* プロジェクト4: テンプレートエンジン */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-red-900 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">ミニテンプレートエンジン</h2>
        </div>
        <p className="text-gray-400 mb-4">正規表現と文字列操作を使って、変数展開とループをサポートするテンプレートエンジンを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">preg_replace_callback()</code> で変数プレースホルダーを置換する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">{"{{変数名}}"}</code> 形式の変数展開を実装する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">{"{% for item in list %}"}</code> 形式のループを実装する</li>
          <li>条件分岐 <code className="text-orange-300 bg-gray-800 px-1 rounded">{"{% if condition %}"}</code> を実装する</li>
        </ul>
        <PhpEditor
          defaultCode={`<?php
class TemplateEngine {
    private array $variables = [];

    // TODO: テンプレート変数をセットするassignメソッドを実装する
    // public function assign(string $key, mixed $value): void

    // TODO: {{変数名}}を値に置換するrenderVariablesメソッドを実装する
    // private function renderVariables(string $template): string

    // TODO: {% for item in list %}...{% endfor %}を展開するrenderLoopsメソッドを実装する
    // private function renderLoops(string $template): string

    // TODO: テンプレート全体をレンダリングするrenderメソッドを実装する
    // public function render(string $template): string
}

$engine = new TemplateEngine();
$engine->assign('title', 'ユーザー一覧');
$engine->assign('users', [
    ['name' => '田中太郎', 'role' => '管理者'],
    ['name' => '鈴木花子', 'role' => '一般ユーザー'],
    ['name' => '佐藤次郎', 'role' => '一般ユーザー'],
]);

$template = <<<TPL
<h1>{{title}}</h1>
<ul>
{% for user in users %}
  <li>{{user.name}} ({{user.role}})</li>
{% endfor %}
</ul>
TPL;

// TODO: テンプレートをレンダリングして出力する
echo $engine->render($template);`}
        />
      </div>
    </div>
  );
}
