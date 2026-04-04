import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function WriteFilesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイルI/O</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファイル書き込み</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPでファイルに書き込む方法は<strong className="text-green-300">file_put_contents()</strong>と
            <strong className="text-green-300">fopen()/fwrite()</strong>の2つが主な方法です。
            FILE_APPENDフラグで追記、LOCK_EXフラグで排他ロックを使った安全な書き込みが行えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">file_put_contents()で書き込み</h2>
        <p className="text-gray-400 mb-4">
          file_put_contents()はファイルへの書き込みをシンプルに行えます。デフォルトは上書きです。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$filename = "/tmp/output.txt";\n\n// 新規作成（上書き）\nfile_put_contents($filename, "最初の書き込み\\n");\n\n// 追記（FILE_APPENDフラグ）\nfile_put_contents($filename, "2回目の追記\\n", FILE_APPEND);\nfile_put_contents($filename, "3回目の追記\\n", FILE_APPEND);\n\n// 結果を確認\n$content = file_get_contents($filename);\necho "--- ファイル内容 ---\\n";\necho $content;\necho "バイト数: " . filesize($filename);`}
          expectedOutput={`--- ファイル内容 ---\n最初の書き込み\n2回目の追記\n3回目の追記\nバイト数: 45`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fopen()/fwrite()で書き込み</h2>
        <p className="text-gray-400 mb-4">
          fopen()のモードによって動作が変わります。"w"は上書き、"a"は追記、"x"は新規作成（存在する場合は失敗）です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$filename = "/tmp/log.txt";\n\n// ログ書き込み関数\nfunction writeLog(string $filename, string $level, string $message): void {\n    $timestamp = date("Y-m-d H:i:s");\n    $line = "[{$timestamp}] [{$level}] {$message}\\n";\n\n    $handle = fopen($filename, "a");\n    if ($handle === false) {\n        throw new RuntimeException("ログファイルを開けません");\n    }\n    fwrite($handle, $line);\n    fclose($handle);\n}\n\nwriteLog($filename, "INFO", "アプリケーション開始");\nwriteLog($filename, "DEBUG", "設定ファイル読み込み完了");\nwriteLog($filename, "WARNING", "キャッシュが古い可能性があります");\nwriteLog($filename, "INFO", "処理完了");\n\n// ログの内容を表示（タイムスタンプ部分を除いて）\n$lines = file($filename, FILE_IGNORE_NEW_LINES);\nforeach ($lines as $line) {\n    // タイムスタンプを省略して表示\n    echo preg_replace('/\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] /', '', $line) . "\\n";\n}`}
          expectedOutput={`[INFO] アプリケーション開始\n[DEBUG] 設定ファイル読み込み完了\n[WARNING] キャッシュが古い可能性があります\n[INFO] 処理完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">排他ロックによる安全な書き込み</h2>
        <p className="text-gray-400 mb-4">
          複数のプロセスが同時にファイルに書き込む場合、LOCK_EXで排他ロックをかけてデータの整合性を保ちます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction safeWrite(string $filename, string $data): bool {\n    $handle = fopen($filename, "c+");\n    if ($handle === false) {\n        return false;\n    }\n\n    // 排他ロック取得\n    if (flock($handle, LOCK_EX)) {\n        ftruncate($handle, 0); // ファイルをクリア\n        rewind($handle);\n        fwrite($handle, $data);\n        fflush($handle);\n        flock($handle, LOCK_UN); // ロック解放\n        fclose($handle);\n        return true;\n    }\n\n    fclose($handle);\n    return false;\n}\n\n$success = safeWrite("/tmp/counter.txt", "カウント: 42\\n更新時刻: " . date("H:i:s"));\n\nif ($success) {\n    echo "書き込み成功\\n";\n    echo file_get_contents("/tmp/counter.txt");\n} else {\n    echo "書き込み失敗";\n}`}
          expectedOutput={`書き込み成功\nカウント: 42\n更新時刻: 12:34:56`}
        />
      </section>

      <LessonCompleteButton lessonId="write-files" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="write-files" basePath="/learn/fileio" />
    </div>
  );
}
