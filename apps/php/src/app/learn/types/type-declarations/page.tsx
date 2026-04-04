import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function TypeDeclarationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">型システム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">型宣言</h1>
        <p className="text-gray-400 leading-relaxed">
          PHP 7以降、関数の引数・戻り値・クラスプロパティに型を宣言できます。型宣言によりバグを早期発見し、コードの可読性を高めます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-teal-400 mb-3">型宣言とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          型宣言（Type Declaration）は、変数・引数・戻り値に対して期待する型を明示的に指定する機能です。PHP 7で大幅に強化され、PHP 8でさらに拡張されました。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>スカラー型: <code className="text-teal-300">int</code>, <code className="text-teal-300">float</code>, <code className="text-teal-300">string</code>, <code className="text-teal-300">bool</code></li>
          <li>複合型: <code className="text-teal-300">array</code>, <code className="text-teal-300">callable</code>, <code className="text-teal-300">object</code></li>
          <li>特殊型: <code className="text-teal-300">void</code>, <code className="text-teal-300">mixed</code>, <code className="text-teal-300">never</code></li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">引数と戻り値の型宣言</h2>
        <p className="text-gray-400 mb-4">
          関数の引数名の前に型名を、戻り値はコロンの後に型名を書きます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction add(int $a, int $b): int {\n    return $a + $b;\n}\n\nfunction isAdult(int $age): bool {\n    return $age >= 18;\n}\n\nfunction getFullName(string $first, string $last): string {\n    return $last . " " . $first;\n}\n\necho add(10, 20) . "\\n";\necho (isAdult(20) ? "成人" : "未成年") . "\\n";\necho getFullName("太郎", "山田");`}
          expectedOutput={`30\n成人\n山田 太郎`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クラスプロパティの型宣言</h2>
        <p className="text-gray-400 mb-4">
          PHP 7.4以降、クラスプロパティにも型を宣言できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass User {\n    public int $id;\n    public string $name;\n    public string $email;\n\n    public function __construct(int $id, string $name, string $email) {\n        $this->id    = $id;\n        $this->name  = $name;\n        $this->email = $email;\n    }\n\n    public function describe(): string {\n        return "ID:{$this->id} 名前:{$this->name} メール:{$this->email}";\n    }\n}\n\n$user = new User(1, "田中花子", "hanako@example.com");\necho $user->describe();`}
          expectedOutput={`ID:1 名前:田中花子 メール:hanako@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">void戻り値型</h2>
        <p className="text-gray-400 mb-4">
          値を返さない関数には<code className="text-teal-300">void</code>を宣言します。returnに値を書くとエラーになります。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction printHeader(string $title): void {\n    echo "=== " . $title . " ===" . "\\n";\n    // return; は書けるが return 値; はエラー\n}\n\nfunction logMessage(string $level, string $msg): void {\n    echo "[" . strtoupper($level) . "] " . $msg . "\\n";\n}\n\nprintHeader("ユーザー一覧");\nlogMessage("info", "処理を開始しました");\nlogMessage("warn", "データが見つかりません");`}
          expectedOutput={`=== ユーザー一覧 ===\n[INFO] 処理を開始しました\n[WARN] データが見つかりません`}
        />
      </section>

      <LessonCompleteButton categoryId="types" lessonId="type-declarations" />
      <LessonNav lessons={lessons} currentId="type-declarations" basePath="/learn/types" />
    </div>
  );
}
