import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartで例外をキャッチするための構文はどれですか？",
    options: ["try-catch", "begin-rescue", "try-except", "on-error"],
    answer: 0,
    explanation: "Dartではtry-catchブロックを使って例外をキャッチします。onキーワードで型を指定し、catchで例外オブジェクトを受け取れます。",
  },
  {
    question: "Dartのtry-catchでonキーワードの役割は何ですか？",
    options: [
      "例外を無視する",
      "特定の例外型を指定してキャッチする",
      "finallyブロックを定義する",
      "例外を再スローする",
    ],
    answer: 1,
    explanation: "onキーワードで特定の例外型を指定できます。例：on FormatException catchはFormatExceptionのみをキャッチします。",
  },
  {
    question: "DartのErrorとExceptionの違いは何ですか？",
    options: [
      "Errorはプログラムのバグ、Exceptionは予期される異常状態",
      "ExceptionはErrorより重大",
      "違いはない",
      "Errorは非同期処理専用",
    ],
    answer: 0,
    explanation: "ErrorはRangeError等のプログラムのバグを示し、通常キャッチしません。Exceptionは回復可能な異常状態でキャッチして処理します。",
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
    explanation: "finallyブロックは例外が発生したかどうかにかかわらず、try-catchの後に必ず実行されます。リソースの解放に使います。",
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
          Dartのエラー処理と例外の扱い方を学びましょう。try-catch-on構文、カスタム例外クラスの作成、ErrorとExceptionの違いなど、堅牢なアプリケーションを作るために必要な技術を習得します。
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
          <code className="text-red-300">try</code>ブロック内で例外が発生すると、<code className="text-red-300">on</code>/<code className="text-red-300">catch</code>ブロックで捕捉して処理できます。
        </p>
        <DartEditor
          defaultCode={`int divide(int a, int b) {
  if (b == 0) {
    throw ArgumentError('ゼロ除算はできません');
  }
  return a ~/ b;
}

void main() {
  try {
    print(divide(10, 2));
    print(divide(10, 0));
  } on ArgumentError catch (e) {
    print('引数エラー: \${e.message}');
  } finally {
    print('処理完了');
  }
}`}
          expectedOutput={`5
引数エラー: ゼロ除算はできません
処理完了`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外クラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">Exception</code>インターフェースを実装して独自の例外クラスを作成すると、エラーの種類を細かく分類できます。
        </p>
        <DartEditor
          defaultCode={`class ValidationException implements Exception {
  final List<String> errors;

  ValidationException(this.errors);

  @override
  String toString() => 'ValidationException: \${errors.join(', ')}';
}

void validateUser(String name, String email) {
  final errors = <String>[];
  if (name.isEmpty) errors.add('名前は必須です');
  if (!email.contains('@')) errors.add('メールが無効です');
  if (errors.isNotEmpty) throw ValidationException(errors);
}

void main() {
  try {
    validateUser('', 'invalid-email');
  } on ValidationException catch (e) {
    print('バリデーションエラー:');
    for (final error in e.errors) {
      print('  - \$error');
    }
  }
}`}
          expectedOutput={`バリデーションエラー:
  - 名前は必須です
  - メールが無効です`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
