import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function ConstraintsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">ジェネリクス</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">型制約</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">型制約</strong>は<code className="text-teal-300">extends</code>キーワードで型パラメータに上限を設けます。
            制約を設けることで、型パラメータが特定のメソッドや機能を持つことをコンパイル時に保証できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">extends による型制約</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">&lt;T extends SomeType&gt;</code>でTがSomeTypeを実装していることを保証します。
        </p>
        <DartEditor
          defaultCode={`// Comparableを実装した型のみ受け付ける
T findMax<T extends Comparable<T>>(List<T> list) {
  if (list.isEmpty) throw ArgumentError('空リスト');
  return list.reduce((a, b) => a.compareTo(b) >= 0 ? a : b);
}

T findMin<T extends Comparable<T>>(List<T> list) {
  if (list.isEmpty) throw ArgumentError('空リスト');
  return list.reduce((a, b) => a.compareTo(b) <= 0 ? a : b);
}

List<T> sortedList<T extends Comparable<T>>(List<T> list) =>
    [...list]..sort();

void main() {
  // int（Comparableを実装）
  final nums = [3, 1, 4, 1, 5, 9, 2, 6];
  print('最大: \${findMax(nums)}');
  print('最小: \${findMin(nums)}');
  print('ソート: \${sortedList(nums)}');

  print('---');

  // String（Comparableを実装）
  final words = ['banana', 'apple', 'cherry', 'date'];
  print('最大: \${findMax(words)}');
  print('最小: \${findMin(words)}');
  print('ソート: \${sortedList(words)}');

  print('---');

  // DateTime（Comparableを実装）
  final dates = [
    DateTime(2024, 3, 15),
    DateTime(2024, 1, 1),
    DateTime(2024, 12, 31),
  ];
  print('最も遅い: \${findMax(dates)}');
  print('最も早い: \${findMin(dates)}');
}`}
          expectedOutput={`最大: 9
最小: 1
ソート: [1, 1, 2, 3, 4, 5, 6, 9]
---
最大: date
最小: apple
ソート: [apple, banana, cherry, date]
---
最も遅い: 2024-12-31 00:00:00.000
最も早い: 2024-01-01 00:00:00.000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カスタムインターフェースでの型制約</h2>
        <p className="text-gray-400 mb-4">
          独自のインターフェースを型制約として使えます。
        </p>
        <DartEditor
          defaultCode={`abstract class Serializable {
  Map<String, dynamic> toJson();
}

class Repository<T extends Serializable> {
  final List<T> _items = [];

  void add(T item) => _items.add(item);

  List<Map<String, dynamic>> exportAll() =>
      _items.map((item) => item.toJson()).toList();
}

class User implements Serializable {
  final String name;
  final int age;
  User(this.name, this.age);

  @override
  Map<String, dynamic> toJson() => {'name': name, 'age': age};
}

class Product implements Serializable {
  final String title;
  final double price;
  Product(this.title, this.price);

  @override
  Map<String, dynamic> toJson() => {'title': title, 'price': price};
}

void main() {
  final userRepo = Repository<User>();
  userRepo.add(User('太郎', 25));
  userRepo.add(User('花子', 30));
  print('Users: \${userRepo.exportAll()}');

  final productRepo = Repository<Product>();
  productRepo.add(Product('Dart本', 2800));
  productRepo.add(Product('Flutter本', 3200));
  print('Products: \${productRepo.exportAll()}');
}`}
          expectedOutput={`Users: [{name: 太郎, age: 25}, {name: 花子, age: 30}]
Products: [{title: Dart本, price: 2800.0}, {title: Flutter本, price: 3200.0}]`}
        />
      </section>

      <LessonCompleteButton lessonId="constraints" categoryId="generics" />
      <LessonNav lessons={lessons} currentId="constraints" basePath="/learn/generics" />
    </div>
  );
}
