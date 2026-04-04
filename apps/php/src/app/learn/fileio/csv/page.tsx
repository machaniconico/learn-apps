import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function CsvPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイルI/O</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">CSV操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            PHPには<strong className="text-green-300">fgetcsv()</strong>と<strong className="text-green-300">fputcsv()</strong>という
            CSV専用の関数があります。カンマやクォートを含むデータも正しく処理でき、
            データのインポート・エクスポート機能の実装に活用できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fgetcsv()でCSV読み込み</h2>
        <p className="text-gray-400 mb-4">
          fgetcsv()はCSVファイルを1行ずつ配列として読み込みます。クォートやエスケープを自動処理します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// テスト用CSVファイルを作成\n$csvData = "名前,年齢,職業,都市\\n田中太郎,30,エンジニア,東京\\n鈴木花子,25,デザイナー,大阪\\n佐藤次郎,35,マネージャー,名古屋";\nfile_put_contents("/tmp/users.csv", $csvData);\n\n// CSVを読み込む\n$handle = fopen("/tmp/users.csv", "r");\n$headers = fgetcsv($handle); // 1行目はヘッダー\n\necho "ユーザー一覧:\\n";\nwhile (($row = fgetcsv($handle)) !== false) {\n    $user = array_combine($headers, $row);\n    echo "  {$user['名前']} ({$user['年齢']}歳) - {$user['職業']} in {$user['都市']}\\n";\n}\nfclose($handle);`}
          expectedOutput={`ユーザー一覧:\n  田中太郎 (30歳) - エンジニア in 東京\n  鈴木花子 (25歳) - デザイナー in 大阪\n  佐藤次郎 (35歳) - マネージャー in 名古屋`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fputcsv()でCSV書き込み</h2>
        <p className="text-gray-400 mb-4">
          fputcsv()は配列をCSV形式でファイルに書き込みます。特殊文字は自動的にクォートされます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$products = [\n    ['商品名', '価格', 'カテゴリ', '在庫'],\n    ['PHPの教科書', 2800, 'IT書籍', 15],\n    ['ワイヤレスマウス', 3500, 'PC周辺機器', 42],\n    ['コーヒー豆, 特選', 1200, '食品', 8], // カンマ含む\n    ['プログラマー\\'s ノート', 500, '文具', 100], // シングルクォート含む\n];\n\n$filename = "/tmp/products.csv";\n$handle = fopen($filename, "w");\n\nforeach ($products as $row) {\n    fputcsv($handle, $row);\n}\nfclose($handle);\n\n// 書き込んだファイルを確認\necho file_get_contents($filename);`}
          expectedOutput={`商品名,価格,カテゴリ,在庫\nPHPの教科書,2800,IT書籍,15\nワイヤレスマウス,3500,PC周辺機器,42\n"コーヒー豆, 特選",1200,食品,8\nプログラマー's ノート,500,文具,100`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">CSVのフィルタリングと変換</h2>
        <p className="text-gray-400 mb-4">
          CSV読み込みと書き込みを組み合わせて、データのフィルタリングや変換処理を実装できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 入力CSVを作成\n$input = "id,name,score,grade\\n1,田中,85,B\\n2,鈴木,92,A\\n3,佐藤,67,C\\n4,高橋,95,A\\n5,伊藤,73,C";\nfile_put_contents("/tmp/scores.csv", $input);\n\n// Aグレードのみフィルタリング\n$inHandle  = fopen("/tmp/scores.csv", "r");\n$outHandle = fopen("/tmp/a_grade.csv", "w");\n\n$headers = fgetcsv($inHandle);\nfputcsv($outHandle, $headers);\n\n$count = 0;\nwhile (($row = fgetcsv($inHandle)) !== false) {\n    if ($row[3] === 'A') {\n        fputcsv($outHandle, $row);\n        $count++;\n    }\n}\nfclose($inHandle);\nfclose($outHandle);\n\necho "Aグレード: {$count}人\\n";\necho file_get_contents("/tmp/a_grade.csv");`}
          expectedOutput={`Aグレード: 2人\nid,name,score,grade\n2,鈴木,92,A\n4,高橋,95,A`}
        />
      </section>

      <LessonCompleteButton lessonId="csv" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="csv" basePath="/learn/fileio" />
    </div>
  );
}
