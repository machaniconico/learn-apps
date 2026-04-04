import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function JsonHandlingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイル・IO</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">JSON処理</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">dart:convert</strong>の<code className="text-green-300">jsonDecode()</code>・<code className="text-green-300">jsonEncode()</code>でJSONを処理します。
            クラスに<code className="text-green-300">fromJson()</code>・<code className="text-green-300">toJson()</code>を実装するのがDartの慣習です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">JSONエンコード・デコード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">jsonEncode()</code>でDartオブジェクトをJSON文字列に、<code className="text-green-300">jsonDecode()</code>で逆変換します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

void main() {
  // エンコード
  final data = {
    'id': 1,
    'name': '田中太郎',
    'scores': [85, 92, 78],
    'address': {'city': '東京', 'zip': '100-0001'},
    'active': true,
    'nickname': null,
  };

  final json = jsonEncode(data);
  print('JSON: \$json');
  print('');

  // デコード
  final decoded = jsonDecode(json) as Map<String, dynamic>;
  print('名前: \${decoded['name']}');
  print('スコア: \${decoded['scores']}');
  print('都市: \${(decoded['address'] as Map)['city']}');
  print('アクティブ: \${decoded['active']}');
  print('ニックネーム: \${decoded['nickname']}');

  // 配列のデコード
  const jsonArray = '[1, 2, 3, 4, 5]';
  final list = (jsonDecode(jsonArray) as List).cast<int>();
  print('合計: \${list.reduce((a, b) => a + b)}');
}`}
          expectedOutput={`JSON: {"id":1,"name":"田中太郎","scores":[85,92,78],"address":{"city":"東京","zip":"100-0001"},"active":true,"nickname":null}

名前: 田中太郎
スコア: [85, 92, 78]
都市: 東京
アクティブ: true
ニックネーム: null
合計: 15`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fromJson / toJson パターン</h2>
        <p className="text-gray-400 mb-4">
          Dartの慣習として、クラスに<code className="text-green-300">fromJson</code>ファクトリと<code className="text-green-300">toJson</code>メソッドを実装します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

class Product {
  final int id;
  final String name;
  final double price;
  final List<String> tags;

  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.tags,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] as int,
      name: json['name'] as String,
      price: (json['price'] as num).toDouble(),
      tags: (json['tags'] as List).cast<String>(),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'price': price,
    'tags': tags,
  };

  @override
  String toString() => 'Product(\$id: \$name ¥\$price)';
}

void main() {
  const jsonStr = '''[
    {"id":1,"name":"Dartの本","price":2800.0,"tags":["programming","dart"]},
    {"id":2,"name":"Flutter入門","price":3200.0,"tags":["flutter","mobile"]}
  ]''';

  final products = (jsonDecode(jsonStr) as List)
      .map((j) => Product.fromJson(j as Map<String, dynamic>))
      .toList();

  for (final p in products) {
    print('\$p タグ: \${p.tags}');
  }

  // 再エンコード
  final reencoded = jsonEncode(products.map((p) => p.toJson()).toList());
  print('\\n再エンコード長: \${reencoded.length}文字');
}`}
          expectedOutput={`Product(1: Dartの本 ¥2800.0) タグ: [programming, dart]
Product(2: Flutter入門 ¥3200.0) タグ: [flutter, mobile]

再エンコード長: 118文字`}
        />
      </section>

      <LessonCompleteButton lessonId="json-handling" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="json-handling" basePath="/learn/fileio" />
    </div>
  );
}
