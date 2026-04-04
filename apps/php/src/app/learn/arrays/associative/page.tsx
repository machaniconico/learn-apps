import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function AssociativePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">配列 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">連想配列</h1>
        <p className="text-gray-400 leading-relaxed">
          連想配列は文字列キーで値を管理する配列です。PHPでは連想配列が多用されており、設定データやオブジェクトの代替としても使われます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-3">連想配列とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          連想配列は<code className="text-cyan-300">"キー" =&gt; 値</code>の形式で定義します。キーは文字列または整数で、値は任意の型を使えます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>キーによるアクセス: <code className="text-cyan-300">$arr["key"]</code></li>
          <li>キー一覧: <code className="text-cyan-300">array_keys($arr)</code></li>
          <li>値一覧: <code className="text-cyan-300">array_values($arr)</code></li>
          <li>キー存在確認: <code className="text-cyan-300">array_key_exists("key", $arr)</code></li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">連想配列の作成とアクセス</h2>
        <p className="text-gray-400 mb-4">
          文字列キーで意味のある名前を付けてデータを管理します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$person = [\n    "name"  => "佐藤太郎",\n    "age"   => 32,\n    "email" => "taro@example.com",\n    "city"  => "大阪",\n];\n\necho $person["name"] . "\\n";\necho $person["age"] . "歳\\n";\necho $person["city"] . "\\n";\n\n// キーと値の一覧\nforeach ($person as $key => $value) {\n    echo $key . ": " . $value . "\\n";\n}`}
          expectedOutput={`佐藤太郎\n32歳\n大阪\nname: 佐藤太郎\nage: 32\nemail: taro@example.com\ncity: 大阪`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">キーの確認と操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_key_exists</code>でキーの存在を確認し、<code className="text-cyan-300">array_keys</code>・<code className="text-cyan-300">array_values</code>で一覧を取得します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$config = [\n    "host"     => "localhost",\n    "port"     => 3306,\n    "database" => "myapp",\n];\n\n// キーの存在確認\necho array_key_exists("host", $config) ? "host: あり\\n" : "host: なし\\n";\necho array_key_exists("user", $config) ? "user: あり\\n" : "user: なし\\n";\n\n// キー一覧\necho implode(", ", array_keys($config)) . "\\n";\n\n// 値一覧\nforeach (array_values($config) as $v) {\n    echo $v . "\\n";\n}`}
          expectedOutput={`host: あり\nuser: なし\nhost, port, database\nlocalhost\n3306\nmyapp`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列のマージと上書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">array_merge</code>や<code className="text-cyan-300">+</code>演算子で連想配列を結合できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\n$defaults = [\n    "color"   => "blue",\n    "size"    => "medium",\n    "weight"  => 100,\n];\n\n$custom = [\n    "color"  => "red",\n    "weight" => 200,\n];\n\n// array_merge: 後の値で上書き\n$merged = array_merge($defaults, $custom);\nforeach ($merged as $k => $v) {\n    echo "$k: $v\\n";\n}`}
          expectedOutput={`color: red\nsize: medium\nweight: 200`}
        />
      </section>

      <LessonCompleteButton categoryId="arrays" lessonId="associative" />
      <LessonNav lessons={lessons} currentId="associative" basePath="/learn/arrays" />
    </div>
  );
}
