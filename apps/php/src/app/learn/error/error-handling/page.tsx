import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">エラーハンドリング</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">set_error_handler()</strong>と<strong className="text-red-300">set_exception_handler()</strong>を使うと、
            アプリケーション全体のエラーと例外を一元管理できます。
            カスタムハンドラでログ記録、エラーページ表示、通知送信などを実装できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">set_error_handler()</h2>
        <p className="text-gray-400 mb-4">
          set_error_handler()でPHPのエラーをカスタム関数で処理できます。コールバック関数にエラー情報が渡されます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction customErrorHandler(int $errno, string $errstr, string $errfile, int $errline): bool {\n    $levels = [\n        E_WARNING      => 'WARNING',\n        E_NOTICE       => 'NOTICE',\n        E_USER_ERROR   => 'USER_ERROR',\n        E_USER_WARNING => 'USER_WARNING',\n        E_USER_NOTICE  => 'USER_NOTICE',\n    ];\n\n    $level = $levels[$errno] ?? "UNKNOWN({$errno})";\n    $file  = basename($errfile);\n\n    echo "[{$level}] {$errstr} in {$file}:{$errline}\\n";\n\n    // trueを返すとPHP標準のエラーハンドラをバイパス\n    return true;\n}\n\nset_error_handler('customErrorHandler');\n\n// ユーザー定義エラーを発生させる\ntrigger_error("設定ファイルが見つかりません", E_USER_WARNING);\ntrigger_error("未定義の設定キーにアクセスしました", E_USER_NOTICE);\n\necho "エラーハンドラ設定後も実行継続";`}
          expectedOutput={`[USER_WARNING] 設定ファイルが見つかりません in index.php:17\n[USER_NOTICE] 未定義の設定キーにアクセスしました in index.php:18\nエラーハンドラ設定後も実行継続`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">set_exception_handler()</h2>
        <p className="text-gray-400 mb-4">
          キャッチされなかった例外を処理するグローバルハンドラを設定できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction globalExceptionHandler(Throwable $e): void {\n    $class   = get_class($e);\n    $message = $e->getMessage();\n    $code    = $e->getCode();\n    $file    = basename($e->getFile());\n    $line    = $e->getLine();\n\n    echo "=== 未処理例外 ===\\n";\n    echo "種類: {$class}\\n";\n    echo "メッセージ: {$message}\\n";\n    echo "コード: {$code}\\n";\n    echo "場所: {$file}:{$line}\\n";\n    echo "================\\n";\n}\n\nset_exception_handler('globalExceptionHandler');\n\n// キャッチされない例外をスロー\nthrow new RuntimeException("グローバルハンドラでキャッチされます", 500);`}
          expectedOutput={`=== 未処理例外 ===\n種類: RuntimeException\nメッセージ: グローバルハンドラでキャッチされます\nコード: 500\n場所: index.php:20\n================`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">register_shutdown_function()</h2>
        <p className="text-gray-400 mb-4">
          register_shutdown_function()はスクリプト終了時（エラーによる終了も含む）に必ず実行される関数を登録します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nregister_shutdown_function(function(): void {\n    $error = error_get_last();\n    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE])) {\n        echo "\\n=== シャットダウン時エラー検出 ===\\n";\n        echo "種類: " . $error['type'] . "\\n";\n        echo "メッセージ: " . $error['message'] . "\\n";\n    } else {\n        echo "\\nシャットダウン: 正常終了\\n";\n    }\n});\n\necho "処理開始\\n";\necho "処理中...\\n";\necho "処理完了\\n";`}
          expectedOutput={`処理開始\n処理中...\n処理完了\n\nシャットダウン: 正常終了`}
        />
      </section>

      <LessonCompleteButton lessonId="error-handling" categoryId="error" />
      <LessonNav lessons={lessons} currentId="error-handling" basePath="/learn/error" />
    </div>
  );
}
