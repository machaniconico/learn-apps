import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartでnull許容型を宣言するにはどうしますか？",
    options: ["String? name", "String | null name", "Optional<String> name", "nullable String name"],
    answer: 0,
    explanation: "Dartでは型名の後に?をつけることでnull許容型を宣言します。例：String? nameはnullまたはString値を持てます。",
  },
  {
    question: "null合体演算子??の役割は何ですか？",
    options: [
      "nullかどうかをチェックする",
      "左辺がnullなら右辺の値を返す",
      "nullを代入する",
      "null許容型をnon-null型に変換する",
    ],
    answer: 1,
    explanation: "??演算子は左辺がnullの場合に右辺の値を返します。例：name ?? 'デフォルト'はnameがnullなら'デフォルト'を返します。",
  },
  {
    question: "!演算子（nullアサーション）を使うとどうなりますか？",
    options: [
      "値がnullでないことをコンパイラに保証し、nullなら実行時エラーが発生する",
      "値を自動的にnullに変換する",
      "コンパイルエラーが発生する",
      "値がnullかどうかをチェックする",
    ],
    answer: 0,
    explanation: "!演算子はプログラマがnullでないと保証するアサーションです。実際にnullだった場合はNullThrownErrorが発生します。",
  },
  {
    question: "late修飾子の主な用途は何ですか？",
    options: [
      "遅延初期化（宣言時ではなく後で初期化）を可能にする",
      "変数をfinalにする",
      "変数をnullにする",
      "非同期処理を遅延させる",
    ],
    answer: 0,
    explanation: "late修飾子を使うと、宣言時にnon-null型の変数を初期化せず、後から初期化できます。初期化前にアクセスするとLateInitializationErrorが発生します。",
  },
];

export default function NullSafetyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">Nullセーフティ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dart 2.12で導入されたNullセーフティは、nullによるバグを型システムで防ぐ強力な機能です。nullable型と非nullable型の区別、安全なアクセス演算子、late修飾子など、現代的なDartプログラミングに必須の概念を学びましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="null-safety" totalLessons={6} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/null-safety" color="indigo" categoryId="null-safety" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">nullable型とnon-nullable型</h2>
        <p className="text-gray-400 mb-4">
          Dartでは<code className="text-indigo-300">?</code>をつけるとnull許容型、つけなければnon-null型になります。コンパイラがnullの安全性を保証します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // non-nullable型（nullを入れるとコンパイルエラー）
  String name = 'Dart';
  int age = 25;

  // nullable型（nullを入れられる）
  String? nickname = null;
  int? score = null;

  print('名前: \$name');
  print('年齢: \$age');
  print('ニックネーム: \$nickname');
  print('スコア: \$score');

  // null安全なアクセス
  print('ニックネームの長さ: \${nickname?.length ?? "未設定"}');

  nickname = 'Flutter';
  print('ニックネーム（更新後）: \${nickname.length}文字');
}`}
          expectedOutput={`名前: Dart
年齢: 25
ニックネーム: null
スコア: null
ニックネームの長さ: 未設定
ニックネーム（更新後）: 7文字`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">late修飾子と??=演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">late</code>修飾子は遅延初期化を可能にし、<code className="text-indigo-300">??=</code>はnullのときだけ代入します。
        </p>
        <DartEditor
          defaultCode={`class UserProfile {
  late String displayName;
  late final String userId;

  UserProfile(String id) {
    userId = id;
  }

  void setDisplayName(String name) {
    displayName = name;
  }
}

void main() {
  var profile = UserProfile('usr_001');
  profile.setDisplayName('太郎');

  print('ID: \${profile.userId}');
  print('表示名: \${profile.displayName}');

  // ??= 演算子
  String? config;
  config ??= 'デフォルト設定';
  print('設定: \$config');

  config ??= '別の設定'; // configはnullでないので変わらない
  print('設定（変更試み後）: \$config');
}`}
          expectedOutput={`ID: usr_001
表示名: 太郎
設定: デフォルト設定
設定（変更試み後）: デフォルト設定`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
