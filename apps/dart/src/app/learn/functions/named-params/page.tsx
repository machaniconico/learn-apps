import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function NamedParamsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">名前付きパラメータ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">&#123;&#125;</strong>で囲むと名前付きパラメータを定義できます。
            呼び出し時に<strong className="text-purple-300">パラメータ名: 値</strong>の形式で指定します。
            <strong className="text-purple-300">required</strong>で必須にできます。Flutterでよく使われます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前付きパラメータの基本</h2>
        <p className="text-gray-400 mb-4">
          名前付きパラメータは順序を問わず指定でき、コードの可読性が向上します。デフォルト値を持てます。
        </p>
        <DartEditor
          defaultCode={`// 名前付きパラメータ（すべて省略可能）
void drawBox({int width = 10, int height = 5, String char = '*'}) {
  for (int i = 0; i < height; i++) {
    print(char * width);
  }
}

// requiredで必須パラメータを指定
String createEmail({
  required String to,
  required String subject,
  String body = '（本文なし）',
  bool isHtml = false,
}) {
  String type = isHtml ? 'HTML' : 'テキスト';
  return '宛先: \$to\n件名: \$subject\n形式: \$type\n本文: \$body';
}

void main() {
  drawBox();
  print('---');
  drawBox(width: 5, height: 3, char: '#');
  print('---');
  print(createEmail(to: 'alice@example.com', subject: 'テストメール'));
}`}
          expectedOutput={`**********
**********
**********
**********
**********
---
#####
#####
#####
---
宛先: alice@example.com
件名: テストメール
形式: テキスト
本文: （本文なし）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">required と null許容の組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">required</code>は必須、<code className="text-purple-300">型?</code>はオプションのnull許容パラメータです。
        </p>
        <DartEditor
          defaultCode={`class Product {
  final String name;
  final double price;
  final String? description;
  final int stock;

  Product({
    required this.name,
    required this.price,
    this.description,
    this.stock = 0,
  });

  @override
  String toString() {
    String desc = description ?? '説明なし';
    return '\$name: ¥\${price.toStringAsFixed(0)} (在庫:\$stock) - \$desc';
  }
}

void main() {
  var p1 = Product(name: 'Dartの本', price: 3000);
  var p2 = Product(
    name: 'Flutter入門',
    price: 4500,
    description: 'Flutterを基礎から学ぶ',
    stock: 10,
  );

  print(p1);
  print(p2);
}`}
          expectedOutput={`Dartの本: ¥3000 (在庫:0) - 説明なし
Flutter入門: ¥4500 (在庫:10) - Flutterを基礎から学ぶ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">位置パラメータと名前付きパラメータの混在</h2>
        <p className="text-gray-400 mb-4">
          位置パラメータと名前付きパラメータを組み合わせることができます。位置パラメータは先に書きます。
        </p>
        <DartEditor
          defaultCode={`// 位置パラメータ + 名前付きパラメータ
String formatMessage(
  String message, {
  String level = 'INFO',
  bool showTimestamp = false,
  String? prefix,
}) {
  String time = showTimestamp ? '[2024-01-01 12:00:00] ' : '';
  String pre = prefix != null ? '[\$prefix] ' : '';
  return '\$time[\$level] \$pre\$message';
}

void main() {
  print(formatMessage('アプリ起動'));
  print(formatMessage('エラー発生', level: 'ERROR'));
  print(formatMessage('処理完了', level: 'DEBUG', showTimestamp: true));
  print(formatMessage('ログイン', prefix: 'AUTH', level: 'INFO'));
}`}
          expectedOutput={`[INFO] アプリ起動
[ERROR] エラー発生
[2024-01-01 12:00:00] [DEBUG] 処理完了
[INFO] [AUTH] ログイン`}
        />
      </section>

      <LessonCompleteButton lessonId="named-params" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="named-params" basePath="/learn/functions" />
    </div>
  );
}
