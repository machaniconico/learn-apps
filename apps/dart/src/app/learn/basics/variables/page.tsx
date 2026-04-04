import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">変数</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartでは<strong className="text-blue-300">var</strong>キーワードで変数を宣言し、型推論が自動で行われます。
            また、明示的に型を指定することも可能です。変数は宣言後に値を変更できますが、型は変えられません。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">var による変数宣言</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">var</code>で宣言すると、最初に代入した値の型が推論されます。後から同じ型の値に変更できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  var name = 'Alice';     // String型として推論
  var age = 30;           // int型として推論
  var height = 165.5;     // double型として推論
  var isStudent = false;  // bool型として推論

  print('名前: \$name (\${name.runtimeType})');
  print('年齢: \$age (\${age.runtimeType})');
  print('身長: \$height (\${height.runtimeType})');
  print('学生: \$isStudent (\${isStudent.runtimeType})');

  // 値の変更（同じ型のみ）
  name = 'Bob';
  age = 25;
  print('変更後: \$name, \$age歳');
}`}
          expectedOutput={`名前: Alice (String)
年齢: 30 (int)
身長: 165.5 (double)
学生: false (bool)
変更後: Bob, 25歳`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">明示的な型宣言</h2>
        <p className="text-gray-400 mb-4">
          型名を明示的に書くことで、コードの意図を明確にできます。型が合わない値を代入するとコンパイルエラーになります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 明示的な型宣言
  String greeting = 'こんにちは';
  int count = 10;
  double pi = 3.14159;
  bool flag = true;

  print(greeting);
  print('カウント: \$count');
  print('π = \$pi');
  print('フラグ: \$flag');

  // 宣言と代入を分離
  String message;
  message = 'あとから代入';
  print(message);
}`}
          expectedOutput={`こんにちは
カウント: 10
π = 3.14159
フラグ: true
あとから代入`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dynamic型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">dynamic</code>型は任意の型の値を代入できますが、型安全性が失われるため注意が必要です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  dynamic value = 42;
  print('整数: \$value (\${value.runtimeType})');

  value = 'テキスト';
  print('文字列: \$value (\${value.runtimeType})');

  value = [1, 2, 3];
  print('リスト: \$value (\${value.runtimeType})');

  // Object型も使える
  Object obj = 100;
  print('Object: \$obj (\${obj.runtimeType})');
}`}
          expectedOutput={`整数: 42 (int)
文字列: テキスト (String)
リスト: [1, 2, 3] (List<int>)
Object: 100 (int)`}
        />
      </section>

      <LessonCompleteButton lessonId="variables" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
