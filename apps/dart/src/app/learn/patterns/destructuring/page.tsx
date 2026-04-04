import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function DestructuringPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">パターンマッチング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">分割代入</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-pink-300">分割代入（Destructuring）</strong>はパターンを使ってコレクションやオブジェクトの要素を変数に取り出す機能です。
            Dart 3ではリスト・Map・レコード・クラスオブジェクトの分割代入が可能です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">リストとMapの分割代入</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">var [a, b, c] = list</code>や<code className="text-pink-300">var &#123;'key': val&#125; = map</code>で分割代入します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // リストの分割代入
  var [first, second, third] = [10, 20, 30];
  print('first=\$first, second=\$second, third=\$third');

  // スプレッドで残りをキャプチャ
  var [head, ...tail] = [1, 2, 3, 4, 5];
  print('head=\$head, tail=\$tail');

  // 途中をスキップ（_）
  var [a, _, c, _, e] = [10, 20, 30, 40, 50];
  print('a=\$a, c=\$c, e=\$e');

  // Mapの分割代入
  var {'name': name, 'age': age} = {'name': '太郎', 'age': 25};
  print('name=\$name, age=\$age');

  // for-in でのパターン
  final pairs = [('A', 1), ('B', 2), ('C', 3)];
  for (final (letter, number) in pairs) {
    print('\$letter -> \$number');
  }
}`}
          expectedOutput={`first=10, second=20, third=30
head=1, tail=[2, 3, 4, 5]
a=10, c=30, e=50
name=太郎, age=25
A -> 1
B -> 2
C -> 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クラスとオブジェクトの分割代入</h2>
        <p className="text-gray-400 mb-4">
          クラスのオブジェクトもパターンで分割代入できます。
        </p>
        <DartEditor
          defaultCode={`class Color {
  final int r, g, b;
  const Color(this.r, this.g, this.b);
}

class Person {
  final String name;
  final int age;
  const Person(this.name, this.age);
}

void main() {
  // クラスオブジェクトの分割代入
  const color = Color(255, 128, 0);
  final Color(r: red, g: green, b: blue) = color;
  print('R=\$red, G=\$green, B=\$blue');

  // switch での分割代入
  const people = [
    Person('太郎', 30),
    Person('花子', 17),
    Person('次郎', 25),
  ];

  for (final person in people) {
    final desc = switch (person) {
      Person(age: int a) when a < 18 => '\${person.name}: 未成年',
      Person(name: var n, age: var a) => '\$n: \$a歳',
    };
    print(desc);
  }

  // 変数の入れ替え
  var x = 1, y = 2;
  (x, y) = (y, x);
  print('swap: x=\$x, y=\$y');
}`}
          expectedOutput={`R=255, G=128, B=0
太郎: 30歳
花子: 未成年
次郎: 25歳
swap: x=2, y=1`}
        />
      </section>

      <LessonCompleteButton lessonId="destructuring" categoryId="patterns" />
      <LessonNav lessons={lessons} currentId="destructuring" basePath="/learn/patterns" />
    </div>
  );
}
