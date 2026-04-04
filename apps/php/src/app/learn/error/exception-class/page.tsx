import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function ExceptionClassPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">例外クラス</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPの<strong className="text-red-300">Exceptionクラス</strong>は例外処理の基底クラスです。
            getMessage()、getCode()、getFile()、getLine()、getTrace()などのメソッドを持ち、
            エラーの詳細情報を取得できます。PHPには用途別に多くの組み込み例外クラスが用意されています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Exceptionクラスのメソッド</h2>
        <p className="text-gray-400 mb-4">
          Exceptionオブジェクトから例外に関する様々な情報を取得できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\ntry {\n    throw new Exception("テスト例外メッセージ", 404);\n} catch (Exception $e) {\n    echo "メッセージ: " . $e->getMessage() . "\\n";\n    echo "コード: " . $e->getCode() . "\\n";\n    echo "ファイル: " . basename($e->getFile()) . "\\n";\n    echo "行番号: " . $e->getLine() . "\\n";\n    echo "文字列表現:\\n" . $e->__toString();\n}`}
          expectedOutput={`メッセージ: テスト例外メッセージ\nコード: 404\nファイル: index.php\n行番号: 3\n文字列表現:\nexception 'Exception' with message 'テスト例外メッセージ' in index.php:3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">組み込み例外クラス</h2>
        <p className="text-gray-400 mb-4">
          PHPには用途に応じた様々な組み込み例外クラスがあります。適切なクラスを使うことでエラーの意味が明確になります。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction demonstrateExceptions(): void {\n    $exceptions = [\n        new InvalidArgumentException("引数が無効です"),\n        new RuntimeException("実行時エラーが発生しました"),\n        new LogicException("ロジックに誤りがあります"),\n        new OverflowException("オーバーフローが発生しました"),\n        new OutOfRangeException("インデックスが範囲外です"),\n    ];\n\n    foreach ($exceptions as $e) {\n        $class = get_class($e);\n        echo "{$class}: {$e->getMessage()}\\n";\n    }\n}\n\ndemonstrateExceptions();`}
          expectedOutput={`InvalidArgumentException: 引数が無効です\nRuntimeException: 実行時エラーが発生しました\nLogicException: ロジックに誤りがあります\nOverflowException: オーバーフローが発生しました\nOutOfRangeException: インデックスが範囲外です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外チェーン（Previous Exception）</h2>
        <p className="text-gray-400 mb-4">
          Exceptionの第3引数に前の例外を渡すと例外チェーンを作れます。根本原因を保持しながら例外を変換できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction connectDatabase(string $host): void {\n    throw new RuntimeException("接続タイムアウト: {$host}");\n}\n\nfunction initApplication(): void {\n    try {\n        connectDatabase("db.example.com");\n    } catch (RuntimeException $e) {\n        throw new RuntimeException(\n            "アプリケーション初期化に失敗しました",\n            500,\n            $e // 前の例外をチェーン\n        );\n    }\n}\n\ntry {\n    initApplication();\n} catch (RuntimeException $e) {\n    echo "エラー: " . $e->getMessage() . "\\n";\n    echo "原因: " . $e->getPrevious()->getMessage();\n}`}
          expectedOutput={`エラー: アプリケーション初期化に失敗しました\n原因: 接続タイムアウト: db.example.com`}
        />
      </section>

      <LessonCompleteButton lessonId="exception-class" categoryId="error" />
      <LessonNav lessons={lessons} currentId="exception-class" basePath="/learn/error" />
    </div>
  );
}
