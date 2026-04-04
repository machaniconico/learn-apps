import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function TypeCastPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">型キャスト</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">as演算子</strong>を使って型を明示的にキャストします。
            キャストが失敗すると<code className="text-teal-300">TypeError</code>が発生するため、事前に<code className="text-teal-300">is</code>で確認するか、
            安全なキャストパターンを使うことが重要です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">as 演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">value as Type</code>で型をキャストします。型が一致しない場合は例外が発生します。
        </p>
        <DartEditor
          defaultCode={`class Animal {
  String name;
  Animal(this.name);
  void speak() => print('\$name が鳴きます');
}

class Dog extends Animal {
  Dog(String name) : super(name);
  @override
  void speak() => print('\$name: ワン！');
  void fetch() => print('\$name がボールを拾います');
}

class Cat extends Animal {
  Cat(String name) : super(name);
  @override
  void speak() => print('\$name: ニャー');
  void purr() => print('\$name がゴロゴロ言います');
}

void main() {
  // 基本的な as キャスト
  Object obj = 'Dart言語';
  String str = obj as String;
  print('文字列の長さ: \${str.length}');

  // ポリモーフィックなリストでの as
  final Animal animal = Dog('ポチ');
  final Dog dog = animal as Dog; // 安全（実際はDog）
  dog.fetch();

  // is で確認してからキャスト
  final List<Animal> animals = [
    Dog('タロウ'),
    Cat('タマ'),
    Dog('ハナ'),
  ];

  for (final a in animals) {
    a.speak();
    if (a is Dog) {
      (a as Dog).fetch();
    }
  }
}`}
          expectedOutput={`文字列の長さ: 5
ポチ がボールを拾います
タロウ: ワン！
タロウ がボールを拾います
タマ: ニャー
ハナ: ワン！
ハナ がボールを拾います`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安全なキャストパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">is</code>による事前確認や、try-catchでキャスト失敗を安全に扱えます。
        </p>
        <DartEditor
          defaultCode={`// 安全なキャスト関数
T? safeCast<T>(Object? value) {
  if (value is T) return value as T;
  return null;
}

void processJson(Map<String, dynamic> json) {
  // dynamic から型安全に取得
  final name = safeCast<String>(json['name']);
  final age = safeCast<int>(json['age']);
  final tags = safeCast<List<dynamic>>(json['tags']);

  if (name != null) print('名前: \$name');
  if (age != null) print('年齢: \$age');
  if (tags != null) print('タグ: \${tags.cast<String>()}');
}

void main() {
  final validJson = <String, dynamic>{
    'name': '田中',
    'age': 30,
    'tags': ['Dart', 'Flutter'],
  };
  processJson(validJson);

  print('---');

  final partialJson = <String, dynamic>{
    'name': '鈴木',
    'age': '25', // 文字列として渡した場合
    'tags': null,
  };
  processJson(partialJson);

  print('---');

  // try-catch でキャスト失敗を捕捉
  try {
    Object value = 42;
    final str = value as String; // 失敗
    print(str);
  } on TypeError catch (e) {
    print('キャスト失敗: \$e');
  }
}`}
          expectedOutput={`名前: 田中
年齢: 30
タグ: [Dart, Flutter]
---
名前: 鈴木
---
キャスト失敗: type 'int' is not a subtype of type 'String' in type cast`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">数値型の変換</h2>
        <p className="text-gray-400 mb-4">
          数値型間の変換には<code className="text-teal-300">as</code>ではなくメソッドを使います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // int <-> double の変換
  int i = 42;
  double d = i.toDouble();
  int i2 = d.toInt();
  int i3 = (3.7).round();
  int i4 = (3.7).floor();
  int i5 = (3.2).ceil();

  print('int -> double: \$d');
  print('double -> int (truncate): \$i2');
  print('3.7.round(): \$i3');
  print('3.7.floor(): \$i4');
  print('3.2.ceil(): \$i5');

  // String <-> 数値の変換
  final parsed = int.parse('123');
  final parsedDouble = double.parse('3.14');
  final str = 42.toString();
  final tryParse = int.tryParse('abc'); // null を返す

  print('parse: \$parsed');
  print('parseDouble: \$parsedDouble');
  print('toString: \$str');
  print('tryParse(abc): \$tryParse');

  // 進数変換
  print('16進数: \${255.toRadixString(16)}');
  print('2進数: \${10.toRadixString(2)}');
  print('解析: \${int.parse('ff', radix: 16)}');
}`}
          expectedOutput={`int -> double: 42.0
double -> int (truncate): 42
3.7.round(): 4
3.7.floor(): 3
3.2.ceil(): 4
parse: 123
parseDouble: 3.14
toString: 42
tryParse(abc): null
16進数: ff
2進数: 1010
解析: 255`}
        />
      </section>

      <LessonCompleteButton lessonId="type-cast" categoryId="types" />
      <LessonNav lessons={lessons} currentId="type-cast" basePath="/learn/types" />
    </div>
  );
}
