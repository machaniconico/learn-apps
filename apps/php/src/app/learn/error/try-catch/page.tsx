import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function TryCatchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">try-catch</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPでは<strong className="text-red-300">try-catch</strong>ブロックを使って例外（Exception）を処理します。
            tryブロック内でthrowされた例外はcatchブロックで捕捉でき、プログラムの異常終了を防いで適切なエラー処理が行えます。
            finallyブロックは例外の有無にかかわらず必ず実行されます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なtry-catch</h2>
        <p className="text-gray-400 mb-4">
          例外が発生しうるコードをtryブロックに書き、catchブロックで例外を処理します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction checkAge(int $age): string {\n    if ($age < 0) {\n        throw new InvalidArgumentException("年齢は0以上でなければなりません");\n    }\n    if ($age > 150) {\n        throw new RangeException("年齢が範囲外です: {$age}");\n    }\n    return "年齢 {$age} は有効です";\n}\n\ntry {\n    echo checkAge(25) . "\\n";\n    echo checkAge(-5) . "\\n"; // 例外発生\n} catch (InvalidArgumentException $e) {\n    echo "引数エラー: " . $e->getMessage() . "\\n";\n} catch (RangeException $e) {\n    echo "範囲エラー: " . $e->getMessage() . "\\n";\n}\necho "プログラム継続中";`}
          expectedOutput={`年齢 25 は有効です\n引数エラー: 年齢は0以上でなければなりません\nプログラム継続中`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">finallyブロック</h2>
        <p className="text-gray-400 mb-4">
          finallyブロックは例外が発生しても発生しなくても必ず実行されます。リソースの解放などに使います。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction processFile(string $filename): void {\n    echo "ファイルを開く: {$filename}\\n";\n\n    try {\n        if (!str_ends_with($filename, '.txt')) {\n            throw new RuntimeException("テキストファイルのみ対応しています");\n        }\n        echo "ファイルを処理中...\\n";\n        echo "処理完了\\n";\n    } catch (RuntimeException $e) {\n        echo "エラー: " . $e->getMessage() . "\\n";\n    } finally {\n        echo "ファイルを閉じる: {$filename}\\n";\n    }\n}\n\nprocessFile("data.txt");\necho "---\\n";\nprocessFile("image.png");`}
          expectedOutput={`ファイルを開く: data.txt\nファイルを処理中...\n処理完了\nファイルを閉じる: data.txt\n---\nファイルを開く: image.png\nエラー: テキストファイルのみ対応しています\nファイルを閉じる: image.png`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数の例外をまとめてキャッチ</h2>
        <p className="text-gray-400 mb-4">
          PHP 8.0以降では、パイプ（|）を使って複数の例外型を1つのcatchブロックでまとめて処理できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction parseInput(mixed $input): int {\n    if (!is_numeric($input)) {\n        throw new InvalidArgumentException("数値ではありません: {$input}");\n    }\n    $value = (int)$input;\n    if ($value < 1 || $value > 100) {\n        throw new RangeException("1〜100の範囲で入力してください");\n    }\n    return $value;\n}\n\n$inputs = [42, "abc", 200];\n\nforeach ($inputs as $input) {\n    try {\n        $result = parseInput($input);\n        echo "値: {$result}\\n";\n    } catch (InvalidArgumentException | RangeException $e) {\n        echo "エラー [{$input}]: " . $e->getMessage() . "\\n";\n    }\n}`}
          expectedOutput={`値: 42\nエラー [abc]: 数値ではありません: abc\nエラー [200]: 1〜100の範囲で入力してください`}
        />
      </section>

      <LessonCompleteButton lessonId="try-catch" categoryId="error" />
      <LessonNav lessons={lessons} currentId="try-catch" basePath="/learn/error" />
    </div>
  );
}
