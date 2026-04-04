import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで例外をキャッチするための構文はどれですか？",
    options: ["try-catch", "begin-rescue", "try-except", "on-error"],
    answer: 0,
    explanation: "PHPではtry-catchブロックを使って例外をキャッチします。tryブロック内で発生した例外をcatchブロックで処理します。",
  },
  {
    question: "throwキーワードの役割は何ですか？",
    options: [
      "エラーを無視する",
      "例外を発生させる",
      "例外をキャッチする",
      "プログラムを終了する",
    ],
    answer: 1,
    explanation: "throwキーワードは例外オブジェクトを投げ（発生させ）ます。catchブロックがなければプログラムが終了します。",
  },
  {
    question: "finallyブロックはいつ実行されますか？",
    options: [
      "例外が発生したときのみ",
      "例外が発生しなかったときのみ",
      "例外の有無にかかわらず常に",
      "catchブロックの前に",
    ],
    answer: 2,
    explanation: "finallyブロックは例外が発生したかどうかにかかわらず、try-catchの後に必ず実行されます。",
  },
  {
    question: "カスタム例外クラスを作るには何を継承しますか？",
    options: ["Error", "Exception", "Throwable", "RuntimeError"],
    answer: 1,
    explanation: "カスタム例外クラスはExceptionクラスまたはそのサブクラス（RuntimeException等）を継承して作成します。",
  },
];

export default function ErrorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">エラー処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPのエラー処理と例外の扱い方を学びましょう。try-catch構文、カスタム例外クラスの作成、エラーレベルの管理など、堅牢なアプリケーションを作るために必要な技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="error" totalLessons={6} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/error" color="red" categoryId="error" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-catchの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">try</code>ブロック内で例外が発生すると、<code className="text-red-300">catch</code>ブロックで捕捉して処理できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction divide($a, $b) {\n    if ($b === 0) {\n        throw new InvalidArgumentException("ゼロ除算はできません");\n    }\n    return $a / $b;\n}\n\ntry {\n    echo divide(10, 2) . "\\n";\n    echo divide(10, 0) . "\\n";\n} catch (InvalidArgumentException $e) {\n    echo "エラー: " . $e->getMessage() . "\\n";\n} finally {\n    echo "処理完了";\n}`}
          expectedOutput={`5\nエラー: ゼロ除算はできません\n処理完了`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外クラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">Exception</code>クラスを継承して独自の例外クラスを作成すると、エラーの種類を細かく分類できます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass ValidationException extends Exception {\n    private array $errors;\n\n    public function __construct(array $errors) {\n        parent::__construct("バリデーションエラー");\n        $this->errors = $errors;\n    }\n\n    public function getErrors(): array {\n        return $this->errors;\n    }\n}\n\ntry {\n    throw new ValidationException(["名前は必須です", "メールが無効です"]);\n} catch (ValidationException $e) {\n    echo $e->getMessage() . "\\n";\n    foreach ($e->getErrors() as $error) {\n        echo "- " . $error . "\\n";\n    }\n}`}
          expectedOutput={`バリデーションエラー\n- 名前は必須です\n- メールが無効です`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
