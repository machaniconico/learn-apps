import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NullBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">nullの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 2.12から<strong className="text-blue-300">Null Safety</strong>が導入され、デフォルトでは変数にnullを代入できなくなりました。
            nullを許容する場合は型の後に<strong className="text-blue-300">?</strong>を付けます（例：<strong className="text-blue-300">String?</strong>）。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Null Safety の基本</h2>
        <p className="text-gray-400 mb-4">
          Null Safetyにより、nullによるランタイムエラーをコンパイル時に防げます。<code className="text-blue-300">?</code>でnullを許容する型を宣言します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // Null非許容型（デフォルト）
  String name = 'Alice';
  int age = 30;

  // Null許容型（? を付ける）
  String? nickname = null;
  int? score = null;

  print('名前: \$name');
  print('年齢: \$age');
  print('ニックネーム: \$nickname');
  print('スコア: \$score');

  // null かどうかチェック
  print('nickname is null: \${nickname == null}');
  print('score is null: \${score == null}');

  // 値を代入
  nickname = 'Ali';
  score = 95;
  print('更新後 - ニックネーム: \$nickname, スコア: \$score');
}`}
          expectedOutput={`名前: Alice
年齢: 30
ニックネーム: null
スコア: null
nickname is null: true
score is null: true
更新後 - ニックネーム: Ali, スコア: 95`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">null安全な操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">?.</code>（null安全アクセス）と<code className="text-blue-300">??</code>（null合体）を使ってnullを安全に扱います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  String? text = null;

  // ?. null安全アクセス（nullならnullを返す）
  int? length = text?.length;
  String? upper = text?.toUpperCase();
  print('長さ: \$length');    // null
  print('大文字: \$upper');   // null

  // ?? null合体演算子
  String display = text ?? '（未設定）';
  print('表示: \$display');

  // チェーン
  String? value = null;
  int result = value?.length ?? 0;
  print('長さ（デフォルト0）: \$result');

  // nullチェック後のスマートキャスト
  String? maybeNull = 'hello';
  if (maybeNull != null) {
    // このブロック内では String型として扱われる
    print('大文字: \${maybeNull.toUpperCase()}');
    print('長さ: \${maybeNull.length}');
  }
}`}
          expectedOutput={`長さ: null
大文字: null
表示: （未設定）
長さ（デフォルト0）: 0
大文字: HELLO
長さ: 5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">late と null アサーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">late</code>で遅延初期化を、<code className="text-blue-300">!</code>でnullでないことを明示的にアサートできます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // late: 後で必ず初期化される変数
  late String message;
  late int count;

  // 何か処理をしてから初期化
  bool condition = true;
  if (condition) {
    message = 'lateで遅延初期化';
    count = 42;
  }
  print(message);
  print(count);

  // ! null アサーション演算子（使用に注意）
  String? nullable = 'nullでない値';
  String nonNull = nullable!; // nullでないと断言
  print('アサーション後: \$nonNull');
  print('長さ: \${nullable!.length}');

  // null許容型をリストで扱う例
  List<String?> items = ['apple', null, 'banana', null, 'cherry'];
  List<String> nonNulls = items.whereType<String>().toList();
  print('非null要素: \$nonNulls');
}`}
          expectedOutput={`lateで遅延初期化
42
アサーション後: nullでない値
長さ: 7
非null要素: [apple, banana, cherry]`}
        />
      </section>

      <LessonCompleteButton lessonId="null-basics" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="null-basics" basePath="/learn/basics" />
    </div>
  );
}
