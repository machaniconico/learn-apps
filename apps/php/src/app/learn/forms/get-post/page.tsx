import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

export default function GetPostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">フォーム・HTTP</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">GETとPOST</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPでは<strong className="text-indigo-300">$_GET</strong>と<strong className="text-indigo-300">$_POST</strong>という
            スーパーグローバル変数でフォームデータを受け取ります。
            GETはURLのクエリ文字列から、POSTはリクエストボディからデータを取得します。
            用途に応じて適切なメソッドを選ぶことが重要です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">$_GETの使い方</h2>
        <p className="text-gray-400 mb-4">
          GETパラメータはURLの?以降に含まれます。検索やフィルタリングなど、ブックマーク可能な操作に使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// URLパラメータのシミュレーション: ?page=2&sort=name&order=asc\n$_GET = ['page' => '2', 'sort' => 'name', 'order' => 'asc'];\n\n// null合体演算子でデフォルト値を設定\n$page  = (int)($_GET['page'] ?? 1);\n$sort  = $_GET['sort'] ?? 'id';\n$order = $_GET['order'] ?? 'asc';\n\n// 許可された値のみ受け付ける\n$allowedSorts  = ['id', 'name', 'date'];\n$allowedOrders = ['asc', 'desc'];\n\nif (!in_array($sort, $allowedSorts))   $sort  = 'id';\nif (!in_array($order, $allowedOrders)) $order = 'asc';\n\necho "ページ: {$page}\\n";\necho "ソート: {$sort}\\n";\necho "順序: {$order}\\n";\necho "クエリ: SELECT * FROM users ORDER BY {$sort} {$order} LIMIT 10 OFFSET " . (($page - 1) * 10);`}
          expectedOutput={`ページ: 2\nソート: name\n順序: asc\nクエリ: SELECT * FROM users ORDER BY name asc LIMIT 10 OFFSET 10`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">$_POSTの使い方</h2>
        <p className="text-gray-400 mb-4">
          POSTデータはリクエストボディに含まれ、URLには表示されません。フォーム送信やデータ更新に使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// POSTデータのシミュレーション\n$_POST = [\n    'username' => 'tanaka_taro',\n    'email'    => 'tanaka@example.com',\n    'password' => 'secret123',\n    'agree'    => '1',\n];\n\n// データを取得してサニタイズ\n$username = trim($_POST['username'] ?? '');\n$email    = trim($_POST['email'] ?? '');\n$password = $_POST['password'] ?? '';\n$agree    = isset($_POST['agree']);\n\necho "ユーザー名: {$username}\\n";\necho "メール: {$email}\\n";\necho "パスワード: " . str_repeat('*', strlen($password)) . "\\n";\necho "利用規約同意: " . ($agree ? "はい" : "いいえ") . "\\n";\n\n// パスワードはハッシュ化して保存\n$hashedPassword = password_hash($password, PASSWORD_BCRYPT);\necho "ハッシュ: " . substr($hashedPassword, 0, 20) . "...";`}
          expectedOutput={`ユーザー名: tanaka_taro\nメール: tanaka@example.com\nパスワード: *********\n利用規約同意: はい\nハッシュ: $2y$10$...`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">リクエストメソッドの判定</h2>
        <p className="text-gray-400 mb-4">
          $_SERVER['REQUEST_METHOD']でHTTPメソッドを確認し、GETとPOSTで処理を分岐させます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction handleRequest(string $method, array $data): void {\n    switch ($method) {\n        case 'GET':\n            echo "GETリクエスト\\n";\n            echo "検索キーワード: " . ($data['q'] ?? '(なし)') . "\\n";\n            break;\n\n        case 'POST':\n            echo "POSTリクエスト\\n";\n            echo "送信者: " . ($data['name'] ?? '(不明)') . "\\n";\n            echo "メッセージ: " . ($data['message'] ?? '(なし)') . "\\n";\n            break;\n\n        default:\n            echo "未対応のメソッド: {$method}\\n";\n    }\n}\n\n// GETリクエストのシミュレーション\nhandleRequest('GET', ['q' => 'PHP入門']);\necho "\\n";\n// POSTリクエストのシミュレーション\nhandleRequest('POST', ['name' => '山田花子', 'message' => 'こんにちは！']);`}
          expectedOutput={`GETリクエスト\n検索キーワード: PHP入門\n\nPOSTリクエスト\n送信者: 山田花子\nメッセージ: こんにちは！`}
        />
      </section>

      <LessonCompleteButton lessonId="get-post" categoryId="forms" />
      <LessonNav lessons={lessons} currentId="get-post" basePath="/learn/forms" />
    </div>
  );
}
