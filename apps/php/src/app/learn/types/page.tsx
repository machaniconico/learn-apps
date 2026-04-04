import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHP 7以降で関数の引数に型宣言を付ける書き方として正しいものはどれですか？",
    options: [
      "function greet(string $name) {}",
      "function greet($name: string) {}",
      "function greet(string: $name) {}",
      "function greet($name as string) {}",
    ],
    answer: 0,
    explanation: "PHPでは型名を引数の前に書きます。例：function greet(string $name) {}",
  },
  {
    question: "ユニオン型（Union Types）の正しい書き方はどれですか？",
    options: [
      "int | string $value",
      "function foo(int|string $value) {}",
      "function foo(int or string $value) {}",
      "function foo(union(int, string) $value) {}",
    ],
    answer: 1,
    explanation: "PHP 8以降、ユニオン型は int|string のようにパイプ記号で型を繋ぎます。",
  },
  {
    question: "Nullable型として正しい書き方はどれですか？",
    options: [
      "function foo(string? $val) {}",
      "function foo(null|string $val) {}",
      "function foo(?string $val) {}",
      "BとCの両方正しい",
    ],
    answer: 3,
    explanation: "?string と null|string はどちらもnullable型として有効です。?string はPHP 7.1以降、null|string はPHP 8以降で使用できます。",
  },
  {
    question: "declare(strict_types=1) の効果として正しいものはどれですか？",
    options: [
      "エラーを全て無視する",
      "型強制（型ジャグリング）を無効にし、厳密な型チェックを行う",
      "コードの実行速度を上げる",
      "未定義変数の使用を許可する",
    ],
    answer: 1,
    explanation: "strict_types=1を宣言すると、型の自動変換が行われなくなり、型が一致しない場合はTypeErrorが発生します。",
  },
];

export default function TypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">型システム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの型システムを深く理解しましょう。型宣言、ユニオン型、交差型、nullable型、strict_typesモードなど、型安全なコードを書くための知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="types" totalLessons={6} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/types" color="teal" categoryId="types" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型宣言の基本</h2>
        <p className="text-gray-400 mb-4">
          PHP 7以降、引数・戻り値・プロパティに型を宣言できます。型安全なコードの第一歩です。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction add(int $a, int $b): int {\n    return $a + $b;\n}\n\nfunction greet(string $name): string {\n    return "こんにちは、" . $name . "さん！";\n}\n\necho add(3, 5) . "\\n";\necho greet("田中");`}
          expectedOutput={`8\nこんにちは、田中さん！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ユニオン型とNullable型</h2>
        <p className="text-gray-400 mb-4">
          PHP 8では複数の型を<code className="text-teal-300">|</code>で繋ぐユニオン型、<code className="text-teal-300">?型名</code>でnullable型を表現できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction formatId(int|string $id): string {\n    return "ID: " . $id;\n}\n\nfunction findUser(?int $id): string {\n    if ($id === null) {\n        return "ユーザーが指定されていません";\n    }\n    return "ユーザーID: " . $id;\n}\n\necho formatId(42) . "\\n";\necho formatId("abc-123") . "\\n";\necho findUser(null) . "\\n";\necho findUser(7);`}
          expectedOutput={`ID: 42\nID: abc-123\nユーザーが指定されていません\nユーザーID: 7`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
