import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function PdoBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">PDO基礎</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">PDO（PHP Data Objects）</strong>はPHPからデータベースに接続するための
            統一インターフェースです。MySQL、PostgreSQL、SQLiteなど様々なDBに同じAPIで接続でき、
            プリペアドステートメントによるセキュアなクエリ実行をサポートします。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">PDO接続の基本パターン</h2>
        <p className="text-gray-400 mb-4">
          PDOオブジェクトを生成する際にDSN（Data Source Name）で接続先を指定します。例外処理も必ず実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// PDO接続のベストプラクティスパターン\nfunction createConnection(string $dsn, string $user, string $pass): object {\n    // 接続設定\n    $options = [\n        // PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,\n        // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n        // PDO::ATTR_EMULATE_PREPARES   => false,\n    ];\n\n    echo "接続先: {$dsn}\\n";\n    echo "ユーザー: {$user}\\n";\n    echo "オプション:\\n";\n    echo "  ERRMODE: EXCEPTION（例外モード）\\n";\n    echo "  FETCH_MODE: ASSOC（連想配列）\\n";\n    echo "  EMULATE_PREPARES: false（ネイティブプリペアド）\\n";\n\n    return new stdClass(); // シミュレーション用\n}\n\n// 各DBのDSN形式\n$dsnExamples = [\n    'MySQL'      => 'mysql:host=localhost;dbname=myapp;charset=utf8mb4',\n    'PostgreSQL' => 'pgsql:host=localhost;dbname=myapp',\n    'SQLite'     => 'sqlite:/path/to/database.db',\n    'SQLite メモリ' => 'sqlite::memory:',\n];\n\necho "=== DSN形式の例 ===\\n";\nforeach ($dsnExamples as $db => $dsn) {\n    echo "{$db}:\\n  {$dsn}\\n";\n}\n\necho "\\n=== MySQL接続の作成 ===\\n";\ncreateConnection('mysql:host=localhost;dbname=myapp;charset=utf8mb4', 'root', '');`}
          expectedOutput={`=== DSN形式の例 ===\nMySQL:\n  mysql:host=localhost;dbname=myapp;charset=utf8mb4\nPostgreSQL:\n  pgsql:host=localhost;dbname=myapp\nSQLite:\n  sqlite:/path/to/database.db\nSQLite メモリ:\n  sqlite::memory:\n\n=== MySQL接続の作成 ===\n接続先: mysql:host=localhost;dbname=myapp;charset=utf8mb4\nユーザー: root\nオプション:\n  ERRMODE: EXCEPTION（例外モード）\n  FETCH_MODE: ASSOC（連想配列）\n  EMULATE_PREPARES: false（ネイティブプリペアド）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">フェッチモード</h2>
        <p className="text-gray-400 mb-4">
          PDOのfetchメソッドには複数のモードがあります。FETCH_ASSOCが最もよく使われます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// フェッチモードのシミュレーション\n$rows = [\n    [0 => 1, 'id' => 1, 1 => '田中太郎', 'name' => '田中太郎', 2 => 'tanaka@example.com', 'email' => 'tanaka@example.com'],\n    [0 => 2, 'id' => 2, 1 => '鈴木花子', 'name' => '鈴木花子', 2 => 'suzuki@example.com', 'email' => 'suzuki@example.com'],\n];\n\n// FETCH_ASSOC: 連想配列\necho "FETCH_ASSOC（連想配列）:\\n";\nforeach ($rows as $row) {\n    $assoc = ['id' => $row['id'], 'name' => $row['name'], 'email' => $row['email']];\n    echo "  ID={$assoc['id']}, 名前={$assoc['name']}\\n";\n}\n\n// FETCH_NUM: インデックス配列\necho "\\nFETCH_NUM（インデックス配列）:\\n";\nforeach ($rows as $row) {\n    $num = [$row[0], $row[1], $row[2]];\n    echo "  [{$num[0]}, {$num[1]}, {$num[2]}]\\n";\n}\n\n// FETCH_COLUMN: 単一カラム\necho "\\nFETCH_COLUMN（名前のみ）:\\n";\nforeach ($rows as $row) {\n    echo "  " . $row['name'] . "\\n";\n}`}
          expectedOutput={`FETCH_ASSOC（連想配列）:\n  ID=1, 名前=田中太郎\n  ID=2, 名前=鈴木花子\n\nFETCH_NUM（インデックス配列）:\n  [1, 田中太郎, tanaka@example.com]\n  [2, 鈴木花子, suzuki@example.com]\n\nFETCH_COLUMN（名前のみ）:\n  田中太郎\n  鈴木花子`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">エラー処理</h2>
        <p className="text-gray-400 mb-4">
          PDO::ERRMODE_EXCEPTIONモードでPDOExceptionを使った例外処理を実装します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass PDOException extends RuntimeException {}\n\nfunction connectWithErrorHandling(string $dsn): void {\n    try {\n        if (str_contains($dsn, 'wrong_host')) {\n            throw new PDOException("SQLSTATE[HY000]: 接続失敗: ホストが見つかりません");\n        }\n        echo "接続成功: {$dsn}\\n";\n    } catch (PDOException $e) {\n        // エラーメッセージには認証情報が含まれる可能性があるのでログのみ\n        error_log("DB接続エラー: " . $e->getMessage());\n        throw new RuntimeException("データベースに接続できませんでした", 500, $e);\n    }\n}\n\n// 正常な接続\ntry {\n    connectWithErrorHandling('mysql:host=localhost;dbname=myapp');\n} catch (RuntimeException $e) {\n    echo "エラー: " . $e->getMessage() . "\\n";\n}\n\n// 失敗する接続\ntry {\n    connectWithErrorHandling('mysql:host=wrong_host;dbname=myapp');\n} catch (RuntimeException $e) {\n    echo "エラー: " . $e->getMessage() . "\\n";\n    echo "原因: " . $e->getPrevious()->getMessage();\n}`}
          expectedOutput={`接続成功: mysql:host=localhost;dbname=myapp\nエラー: データベースに接続できませんでした\n原因: SQLSTATE[HY000]: 接続失敗: ホストが見つかりません`}
        />
      </section>

      <LessonCompleteButton lessonId="pdo-basics" categoryId="database" />
      <LessonNav lessons={lessons} currentId="pdo-basics" basePath="/learn/database" />
    </div>
  );
}
