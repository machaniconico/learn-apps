import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

export default function FileUploadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">フォーム・HTTP</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファイルアップロード</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPのファイルアップロードは<strong className="text-indigo-300">$_FILES</strong>スーパーグローバルで処理します。
            ファイルの種類・サイズのバリデーション、安全なファイル名の生成、適切な保存場所の設定が重要です。
            セキュリティを考慮した実装が必須です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">$_FILESの構造</h2>
        <p className="text-gray-400 mb-4">
          $_FILESにはアップロードされたファイルの名前、種類、サイズ、一時保存パス、エラーコードが含まれます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// $_FILESの構造をシミュレーション\n$_FILES = [\n    'avatar' => [\n        'name'     => 'profile.jpg',\n        'type'     => 'image/jpeg',\n        'size'     => 153600,   // 150KB\n        'tmp_name' => '/tmp/phpXXXXXX',\n        'error'    => UPLOAD_ERR_OK,\n    ]\n];\n\n// エラーコードの意味\n$errorMessages = [\n    UPLOAD_ERR_OK         => 'アップロード成功',\n    UPLOAD_ERR_INI_SIZE   => 'php.iniのサイズ制限超過',\n    UPLOAD_ERR_FORM_SIZE  => 'フォームのサイズ制限超過',\n    UPLOAD_ERR_PARTIAL    => '部分的にしかアップロードされなかった',\n    UPLOAD_ERR_NO_FILE    => 'ファイルが選択されていない',\n    UPLOAD_ERR_NO_TMP_DIR => '一時フォルダが存在しない',\n    UPLOAD_ERR_CANT_WRITE => 'ディスクへの書き込み失敗',\n];\n\n$file = $_FILES['avatar'];\necho "ファイル名: " . $file['name'] . "\\n";\necho "MIMEタイプ: " . $file['type'] . "\\n";\necho "サイズ: " . number_format($file['size']) . " bytes\\n";\necho "状態: " . ($errorMessages[$file['error']] ?? '不明なエラー');`}
          expectedOutput={`ファイル名: profile.jpg\nMIMEタイプ: image/jpeg\nサイズ: 153,600 bytes\n状態: アップロード成功`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファイルのバリデーション</h2>
        <p className="text-gray-400 mb-4">
          アップロードされたファイルは種類とサイズを必ず検証します。MIMEタイプはクライアントから送られるため、
          サーバー側でfinfo_file()を使って実際の形式を確認することが重要です。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction validateUpload(array $file, array $allowedTypes, int $maxSize): array {\n    $errors = [];\n\n    // エラーチェック\n    if ($file['error'] !== UPLOAD_ERR_OK) {\n        $errors[] = "アップロードエラー: コード " . $file['error'];\n        return $errors;\n    }\n\n    // サイズチェック\n    if ($file['size'] > $maxSize) {\n        $maxMb = $maxSize / 1024 / 1024;\n        $errors[] = "ファイルサイズが{$maxMb}MBを超えています";\n    }\n\n    // 拡張子チェック\n    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));\n    $allowedExts = ['jpg', 'jpeg', 'png', 'gif'];\n    if (!in_array($ext, $allowedExts)) {\n        $errors[] = "許可されていない拡張子: .{$ext}";\n    }\n\n    return $errors;\n}\n\n// テストケース\n$testFiles = [\n    ['name' => 'photo.jpg',    'size' => 500000,   'error' => 0, 'type' => 'image/jpeg'],\n    ['name' => 'virus.php',   'size' => 1000,     'error' => 0, 'type' => 'text/plain'],\n    ['name' => 'huge.png',    'size' => 10000000, 'error' => 0, 'type' => 'image/png'],\n];\n\nforeach ($testFiles as $file) {\n    $errors = validateUpload($file, ['image/jpeg', 'image/png'], 5 * 1024 * 1024);\n    if (empty($errors)) {\n        echo "{$file['name']}: OK\\n";\n    } else {\n        echo "{$file['name']}: " . implode(", ", $errors) . "\\n";\n    }\n}`}
          expectedOutput={`photo.jpg: OK\nvirus.php: 許可されていない拡張子: .php\nhuge.png: ファイルサイズが5MBを超えています`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安全なファイル保存</h2>
        <p className="text-gray-400 mb-4">
          元のファイル名をそのまま使うのは危険です。uniqid()やrandom_bytes()で一意のファイル名を生成します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction generateSafeFilename(string $originalName): string {\n    $ext      = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));\n    $unique   = bin2hex(random_bytes(8));\n    $datetime = date('Ymd_His');\n    return "{$datetime}_{$unique}.{$ext}";\n}\n\nfunction saveUploadedFile(array $file, string $uploadDir): string {\n    if (!is_dir($uploadDir)) {\n        mkdir($uploadDir, 0755, true);\n    }\n\n    $safeName = generateSafeFilename($file['name']);\n    $destPath = $uploadDir . '/' . $safeName;\n\n    // 実際は move_uploaded_file() を使用\n    // move_uploaded_file($file['tmp_name'], $destPath);\n\n    return $safeName;\n}\n\n// テスト\n$testFiles = ['profile.jpg', 'document.pdf', '../../../etc/passwd'];\nforeach ($testFiles as $filename) {\n    $safe = generateSafeFilename($filename);\n    $ext  = pathinfo($safe, PATHINFO_EXTENSION);\n    echo "元: {$filename}\\n  安全なファイル名の拡張子: .{$ext}\\n";\n}`}
          expectedOutput={`元: profile.jpg\n  安全なファイル名の拡張子: .jpg\n元: document.pdf\n  安全なファイル名の拡張子: .pdf\n元: ../../../etc/passwd\n  安全なファイル名の拡張子: `}
        />
      </section>

      <LessonCompleteButton lessonId="file-upload" categoryId="forms" />
      <LessonNav lessons={lessons} currentId="file-upload" basePath="/learn/forms" />
    </div>
  );
}
