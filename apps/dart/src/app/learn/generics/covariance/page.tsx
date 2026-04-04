import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function CovariancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">ジェネリクス</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">共変性</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">共変性（Covariance）</strong>とは、<code className="text-teal-300">Animal</code>のサブクラスが<code className="text-teal-300">Cat</code>のとき、
            <code className="text-teal-300">List&lt;Cat&gt;</code>を<code className="text-teal-300">List&lt;Animal&gt;</code>として使えることです。
            DartのListはデフォルトで共変ですが、書き込みには注意が必要です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dartの共変性</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">List&lt;Cat&gt;</code>は<code className="text-teal-300">List&lt;Animal&gt;</code>に代入できます（共変）。
        </p>
        <DartEditor
          defaultCode={`class Animal {
  final String name;
  Animal(this.name);
  String sound() => '...';
  @override
  String toString() => '\${runtimeType}(\$name)';
}

class Dog extends Animal {
  Dog(super.name);
  @override
  String sound() => 'ワン';
}

class Cat extends Animal {
  Cat(super.name);
  @override
  String sound() => 'ニャン';
}

void makeAllSpeak(List<Animal> animals) {
  for (final a in animals) {
    print('\$a: \${a.sound()}');
  }
}

void main() {
  final dogs = [Dog('ポチ'), Dog('シロ')];
  final cats = [Cat('タマ'), Cat('ミケ')];

  // List<Dog> を List<Animal> として渡せる（共変）
  makeAllSpeak(dogs);
  print('---');
  makeAllSpeak(cats);

  // 型チェック
  print('---');
  print('dogs is List<Animal>: \${dogs is List<Animal>}');
  print('cats is List<Animal>: \${cats is List<Animal>}');
}`}
          expectedOutput={`Dog(ポチ): ワン
Dog(シロ): ワン
---
Cat(タマ): ニャン
Cat(ミケ): ニャン
---
dogs is List<Animal>: true
cats is List<Animal>: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">covariant キーワード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">covariant</code>キーワードでパラメータの型をサブクラスで絞り込めます。
        </p>
        <DartEditor
          defaultCode={`abstract class Container<T> {
  void add(covariant T item);
  T get(int index);
  int get length;
}

class TypedList<T> implements Container<T> {
  final List<T> _items = [];

  @override
  void add(T item) => _items.add(item);

  @override
  T get(int index) => _items[index];

  @override
  int get length => _items.length;

  @override
  String toString() => 'TypedList\$_items';
}

void main() {
  // 型安全なコンテナ
  final intContainer = TypedList<int>();
  intContainer.add(1);
  intContainer.add(2);
  intContainer.add(3);
  print('int container: \$intContainer');

  final strContainer = TypedList<String>();
  strContainer.add('Dart');
  strContainer.add('Flutter');
  print('string container: \$strContainer');

  // 基底型として扱う
  Container<num> numContainer = TypedList<int>();
  // covariantなので、intをnumとして追加可能
  print('要素数: \${numContainer.length}');

  // 実用例: 型安全なキャッシュ
  final cache = TypedList<Map<String, dynamic>>();
  cache.add({'key': 'value1'});
  cache.add({'key': 'value2'});
  print('キャッシュ: \${cache.get(0)}');
}`}
          expectedOutput={`int container: TypedList[1, 2, 3]
string container: TypedList[Dart, Flutter]
要素数: 0
キャッシュ: {key: value1}`}
        />
      </section>

      <LessonCompleteButton lessonId="covariance" categoryId="generics" />
      <LessonNav lessons={lessons} currentId="covariance" basePath="/learn/generics" />
    </div>
  );
}
