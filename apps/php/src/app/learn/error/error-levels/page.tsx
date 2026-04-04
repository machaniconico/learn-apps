import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function ErrorLevelsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">エラーレベル</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPには<strong className="text-red-300">複数のエラーレベル</strong>があります。
            E_ERROR（致命的エラー）、E_WARNING（警告）、E_NOTICE（通知）、E_DEPRECATED（非推奨）など、
            重大度に応じて分類されています。error_reporting()でどのレベルのエラーを表示するか制御できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">主なエラーレベル</h2>
        <p className="text-gray-400 mb-4">
          PHPのエラーレベルは整数定数で定義されています。各レベルの意味と使いどころを理解しましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 主なエラーレベル定数の値\n$errorLevels = [\n    'E_ERROR'       => E_ERROR,        // 致命的エラー（実行停止）\n    'E_WARNING'     => E_WARNING,      // 警告（実行継続）\n    'E_PARSE'       => E_PARSE,        // パースエラー\n    'E_NOTICE'      => E_NOTICE,       // 通知（未定義変数など）\n    'E_DEPRECATED'  => E_DEPRECATED,   // 非推奨機能の使用\n    'E_USER_ERROR'  => E_USER_ERROR,   // ユーザー定義エラー\n    'E_USER_WARNING'=> E_USER_WARNING, // ユーザー定義警告\n    'E_ALL'         => E_ALL,          // 全エラー\n];\n\nforeach ($errorLevels as $name => $value) {\n    echo sprintf("%-20s = %d\\n", $name, $value);\n}`}
          expectedOutput={`E_ERROR              = 1\nE_WARNING            = 2\nE_PARSE              = 4\nE_NOTICE             = 8\nE_DEPRECATED         = 8192\nE_USER_ERROR         = 256\nE_USER_WARNING       = 512\nE_ALL                = 32767`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">error_reporting()の設定</h2>
        <p className="text-gray-400 mb-4">
          error_reporting()でどのエラーレベルを報告するか設定できます。ビット演算子で組み合わせて指定します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 現在のerror_reporting設定を確認\n$current = error_reporting();\necho "現在の設定値: {$current}\\n\\n";\n\n// ビット演算での組み合わせ例\n$devMode   = E_ALL;                    // 開発環境：全エラー\n$prodMode  = E_ALL & ~E_DEPRECATED & ~E_NOTICE; // 本番環境\n$strictMode = E_ERROR | E_WARNING;     // エラーと警告のみ\n\necho "開発モード (E_ALL): {$devMode}\\n";\necho "本番モード (E_ALL & ~E_DEPRECATED & ~E_NOTICE): {$prodMode}\\n";\necho "厳格モード (E_ERROR | E_WARNING): {$strictMode}\\n\\n";\n\n// trigger_error でユーザー定義エラーを発生させる\ntrigger_error("これはユーザー定義の警告です", E_USER_WARNING);\necho "trigger_error後も実行継続";`}
          expectedOutput={`現在の設定値: 32767\n\n開発モード (E_ALL): 32767\n本番モード (E_ALL & ~E_DEPRECATED & ~E_NOTICE): 24567\n厳格モード (E_ERROR | E_WARNING): 3\n\nWarning: これはユーザー定義の警告です\ntrigger_error後も実行継続`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">エラーの抑制と確認</h2>
        <p className="text-gray-400 mb-4">
          @演算子でエラーを抑制できますが、推奨されません。代わりにtry-catchや事前チェックを使いましょう。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 非推奨：@演算子でエラー抑制\n$result = @file_get_contents("/存在しないファイル.txt");\nif ($result === false) {\n    echo "@演算子: ファイルが存在しません\\n";\n}\n\n// 推奨：事前チェック\n$filepath = "/存在しないファイル.txt";\nif (file_exists($filepath)) {\n    $content = file_get_contents($filepath);\n    echo "内容: {$content}\\n";\n} else {\n    echo "事前チェック: ファイルが存在しません\\n";\n}\n\n// 推奨：try-catchで例外処理\nfunction safeReadFile(string $path): string {\n    if (!file_exists($path)) {\n        throw new RuntimeException("ファイルが見つかりません: {$path}");\n    }\n    return file_get_contents($path);\n}\n\ntry {\n    safeReadFile("/存在しないファイル.txt");\n} catch (RuntimeException $e) {\n    echo "例外処理: " . $e->getMessage();\n}`}
          expectedOutput={`@演算子: ファイルが存在しません\n事前チェック: ファイルが存在しません\n例外処理: ファイルが見つかりません: /存在しないファイル.txt`}
        />
      </section>

      <LessonCompleteButton lessonId="error-levels" categoryId="error" />
      <LessonNav lessons={lessons} currentId="error-levels" basePath="/learn/error" />
    </div>
  );
}
