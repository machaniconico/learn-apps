import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function NullablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">型システム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Nullable型</h1>
        <p className="text-gray-400 leading-relaxed">
          Nullable型を使うと、通常の型に加えてnullも許容するようになります。PHPでnullを適切に扱うための重要な機能です。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-teal-400 mb-3">Nullable型とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          型名の前に<code className="text-teal-300">?</code>を付けるか、<code className="text-teal-300">null|型名</code>と書くことでnullを許容する型を宣言できます。PHP 7.1で導入されました。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-teal-300">?string</code> = <code className="text-teal-300">null|string</code> （同じ意味）</li>
          <li>引数・戻り値・プロパティに使用可能</li>
          <li>Nullsafe演算子 <code className="text-teal-300">?-&gt;</code> と組み合わせると便利</li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Nullable引数と戻り値</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">?string</code>と宣言すると、文字列かnullを渡せます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction greet(?string $name): string {\n    if ($name === null) {\n        return "ゲストさん、こんにちは！";\n    }\n    return "{$name}さん、こんにちは！";\n}\n\nfunction findUser(int $id): ?string {\n    $users = [1 => "田中", 2 => "鈴木", 3 => "山田"];\n    return $users[$id] ?? null;\n}\n\necho greet("佐藤") . "\\n";\necho greet(null) . "\\n";\n\n$user = findUser(2);\necho ($user ?? "未登録") . "\\n";\n$user2 = findUser(99);\necho ($user2 ?? "未登録");`}
          expectedOutput={`佐藤さん、こんにちは！\nゲストさん、こんにちは！\n鈴木\n未登録`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Nullsafe演算子との組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          PHP 8の<code className="text-teal-300">?-&gt;</code>（Nullsafe演算子）を使うと、nullチェックをシンプルに書けます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass Address {\n    public function __construct(public string $city) {}\n}\n\nclass User {\n    public function __construct(\n        public string $name,\n        public ?Address $address = null\n    ) {}\n\n    public function getCity(): ?string {\n        return $this->address?->city;\n    }\n}\n\n$user1 = new User("田中", new Address("東京"));\n$user2 = new User("鈴木"); // addressはnull\n\necho ($user1->getCity() ?? "住所不明") . "\\n";\necho ($user2->getCity() ?? "住所不明");`}
          expectedOutput={`東京\n住所不明`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Null合体演算子との違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">??</code>（Null合体演算子）はnullや未定義の場合にデフォルト値を返します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$config = [\n    "timeout"  => 30,\n    "host"     => "localhost",\n];\n\n// ?? でデフォルト値を指定\n$timeout  = $config["timeout"]  ?? 60;\n$host     = $config["host"]     ?? "127.0.0.1";\n$port     = $config["port"]     ?? 3306;\n$debug    = $config["debug"]    ?? false;\n\necho "timeout: $timeout\\n";\necho "host: $host\\n";\necho "port: $port\\n";\necho "debug: " . ($debug ? "true" : "false");`}
          expectedOutput={`timeout: 30\nhost: localhost\nport: 3306\ndebug: false`}
        />
      </section>

      <LessonCompleteButton categoryId="types" lessonId="nullable" />
      <LessonNav lessons={lessons} currentId="nullable" basePath="/learn/types" />
    </div>
  );
}
