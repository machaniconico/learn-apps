import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function FactoryPatternPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファクトリーパターン</h1>
        <p className="text-gray-400">オブジェクト生成をカプセル化するファクトリーパターンをDartで実装します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリーパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ファクトリーパターンはオブジェクト生成の詳細をカプセル化し、クライアントコードが具体的なクラスを知らなくても
          オブジェクトを生成できるようにするパターンです。Dartでは<code className="text-pink-300">factory</code>コンストラクタが使えます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-pink-300">factory</code>コンストラクタで生成ロジックをカプセル化</li>
          <li>• 条件に応じて異なるサブクラスのインスタンスを返せる</li>
          <li>• クライアントコードは具体的なクラスに依存しない</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dartのfactoryコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          Dartの<code className="text-teal-300">factory</code>キーワードを使ったファクトリーパターンです。
        </p>
        <DartEditor
          defaultCode={`abstract class Animal {
  String get name;
  String speak();

  factory Animal.create(String type) {
    return switch (type) {
      'dog' => Dog(),
      'cat' => Cat(),
      'bird' => Bird(),
      _ => throw ArgumentError('不明な動物: \$type'),
    };
  }
}

class Dog implements Animal {
  @override String get name => 'いぬ';
  @override String speak() => 'ワンワン！';
}

class Cat implements Animal {
  @override String get name => 'ねこ';
  @override String speak() => 'ニャー！';
}

class Bird implements Animal {
  @override String get name => 'とり';
  @override String speak() => 'チュンチュン！';
}

void main() {
  final animals = ['dog', 'cat', 'bird'].map(Animal.create).toList();
  for (final animal in animals) {
    print('\${animal.name}: \${animal.speak()}');
  }
}`}
          expectedOutput={`いぬ: ワンワン！\nねこ: ニャー！\nとり: チュンチュン！`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">キャッシュ付きファクトリー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">factory</code>コンストラクタとキャッシュを組み合わせてインスタンスを再利用するパターンです。
        </p>
        <DartEditor
          defaultCode={`class Color {
  final int r, g, b;
  static final Map<String, Color> _cache = {};

  Color._(this.r, this.g, this.b);

  factory Color(int r, int g, int b) {
    final key = '\$r,\$g,\$b';
    return _cache.putIfAbsent(key, () => Color._(r, g, b));
  }

  @override
  String toString() => 'Color(r:\$r, g:\$g, b:\$b)';
}

void main() {
  final red1 = Color(255, 0, 0);
  final red2 = Color(255, 0, 0);
  final blue = Color(0, 0, 255);

  print(red1);
  print('red1 == red2 (同一インスタンス): \${identical(red1, red2)}');
  print(blue);
  print('キャッシュサイズ: \${Color._cache.length}');
}`}
          expectedOutput={`Color(r:255, g:0, b:0)\nred1 == red2 (同一インスタンス): true\nColor(r:0, g:0, b:255)\nキャッシュサイズ: 2`}
        />
      </section>
      <LessonCompleteButton lessonId="factory-pattern" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="factory-pattern" basePath="/learn/oop-advanced" />
    </div>
  );
}
