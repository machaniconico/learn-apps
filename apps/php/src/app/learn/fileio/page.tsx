import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ファイルの内容を文字列として読み込む関数はどれですか？",
    options: ["file_read()", "fread_all()", "file_get_contents()", "read_file()"],
    answer: 2,
    explanation: "file_get_contents()はファイル全体を文字列として読み込みます。シンプルなファイル読み込みに最適です。",
  },
  {
    question: "file_put_contents()の第3引数にFILE_APPENDを渡すと何が起きますか？",
    options: [
      "ファイルを削除する",
      "ファイルの先頭に追記する",
      "ファイルの末尾に追記する",
      "ファイルを上書きする",
    ],
    answer: 2,
    explanation: "FILE_APPENDフラグを渡すと、既存のファイルの末尾にデータを追記します。指定しない場合は上書きされます。",
  },
  {
    question: "JSONデータを配列に変換する関数はどれですか？",
    options: ["json_parse()", "json_decode()", "json_to_array()", "decode_json()"],
    answer: 1,
    explanation: "json_decode()はJSON文字列をPHPの値（オブジェクトまたは配列）に変換します。第2引数にtrueを渡すと連想配列になります。",
  },
  {
    question: "ディレクトリの内容一覧を取得する関数はどれですか？",
    options: ["listdir()", "scandir()", "dir_list()", "readdir_all()"],
    answer: 1,
    explanation: "scandir()は指定したディレクトリ内のファイルとディレクトリの名前を配列で返します。",
  },
];

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPでのファイル操作を学びましょう。テキストファイルの読み書き、CSV・JSONの処理、ディレクトリ操作、ストリームなど、実践的なファイルI/O技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="green" categoryId="fileio" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの読み書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">file_get_contents()</code>と<code className="text-green-300">file_put_contents()</code>を使ったシンプルなファイル操作です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// ファイルに書き込む\n$content = "PHPファイルI/Oのサンプル\\n2行目のテキスト\\n3行目のテキスト";\nfile_put_contents("/tmp/sample.txt", $content);\n\n// ファイルを読み込む\n$data = file_get_contents("/tmp/sample.txt");\necho $data;`}
          expectedOutput={`PHPファイルI/Oのサンプル\n2行目のテキスト\n3行目のテキスト`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONの処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">json_encode()</code>と<code className="text-green-300">json_decode()</code>を使ってPHPの配列とJSONを相互変換できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$data = [\n    "name" => "田中太郎",\n    "age" => 30,\n    "skills" => ["PHP", "MySQL", "JavaScript"]\n];\n\n// 配列をJSONに変換\n$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);\necho $json . "\\n\\n";\n\n// JSONを配列に変換\n$decoded = json_decode($json, true);\necho "名前: " . $decoded["name"] . "\\n";\necho "スキル数: " . count($decoded["skills"]);`}
          expectedOutput={`{\n    "name": "田中太郎",\n    "age": 30,\n    "skills": [\n        "PHP",\n        "MySQL",\n        "JavaScript"\n    ]\n}\n\n名前: 田中太郎\nスキル数: 3`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
