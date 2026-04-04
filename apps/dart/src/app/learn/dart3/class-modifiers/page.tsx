import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

export default function ClassModifiersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold">Dart 3新機能 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">クラス修飾子</h1>
        <p className="text-gray-400">base・final・interface・mixinなどDart 3のクラス修飾子を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クラス修飾子の種類</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dart 3ではクラスの継承・実装を細かく制御するための修飾子が追加されました。
          ライブラリAPIの設計をより明確にできます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-violet-300">base</code>: extends可、implements不可（外部から）</li>
          <li>• <code className="text-violet-300">final</code>: 外部から継承・実装どちらも不可</li>
          <li>• <code className="text-violet-300">interface</code>: implements可、extends不可（外部から）</li>
          <li>• <code className="text-violet-300">mixin class</code>: クラスとmixinの両方として使用可</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">interface classの使い方</h2>
        <p className="text-gray-400 mb-4">
          外部から実装のみ許可するinterfaceクラスです。
        </p>
        <DartEditor
          defaultCode={`// interface: 外部からimplementsのみ可能
interface class Serializable {
  String toJson() => '{}';
  // 外部ライブラリでextendsは不可、implementsのみ可
}

class User implements Serializable {
  final String name;
  final int age;
  User(this.name, this.age);

  @override
  String toJson() => '{"name": "\$name", "age": \$age}';
}

class Product implements Serializable {
  final String title;
  final double price;
  Product(this.title, this.price);

  @override
  String toJson() => '{"title": "\$title", "price": \$price}';
}

void printJson(Serializable obj) {
  print(obj.toJson());
}

void main() {
  printJson(User('田中', 30));
  printJson(Product('Dartの教科書', 2980.0));
}`}
          expectedOutput={`{"name": "田中", "age": 30}\n{"title": "Dartの教科書", "price": 2980.0}`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mixin classの使い方</h2>
        <p className="text-gray-400 mb-4">
          クラスとmixinの両方として使える<code className="text-teal-300">mixin class</code>です。
        </p>
        <DartEditor
          defaultCode={`mixin class Timestamped {
  final DateTime createdAt = DateTime.now();

  String get formattedDate =>
      '\${createdAt.year}/\${createdAt.month}/\${createdAt.day}';
}

mixin class Taggable {
  final List<String> tags = [];

  void addTag(String tag) => tags.add(tag);
  bool hasTag(String tag) => tags.contains(tag);
}

// mixinとして使う
class Article with Timestamped, Taggable {
  final String title;
  Article(this.title);
}

// クラスとして継承
class TimestampedBase extends Timestamped {}

void main() {
  final article = Article('Dart 3の新機能');
  article.addTag('Dart');
  article.addTag('プログラミング');

  print('タイトル: \${article.title}');
  print('タグ: \${article.tags.join(", ")}');
  print('Dartタグあり: \${article.hasTag("Dart")}');
  print('作成日: \${article.formattedDate}');
}`}
          expectedOutput={`タイトル: Dart 3の新機能\nタグ: Dart, プログラミング\nDartタグあり: true\n作成日: 2024/3/15`}
        />
      </section>
      <LessonCompleteButton lessonId="class-modifiers" categoryId="dart3" />
      <LessonNav lessons={lessons} currentId="class-modifiers" basePath="/learn/dart3" />
    </div>
  );
}
