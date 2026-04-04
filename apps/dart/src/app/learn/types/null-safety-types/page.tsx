import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function NullSafetyTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Null Safety型</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-teal-300">Null Safety</strong>では、型はデフォルトでnullを許可しません（non-nullable）。
            <code className="text-teal-300">T?</code>とすることでnullableな型になります。
            コンパイラがnullの可能性を追跡し、NullPointerExceptionを事前に防ぎます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">nullable 型と non-nullable 型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">String</code>はnullを持てない型、<code className="text-teal-300">String?</code>はnullを持てる型です。
        </p>
        <DartEditor
          defaultCode={`// non-nullable: nullを代入できない
String name = 'Dart';
int count = 0;

// nullable: nullを代入できる
String? optionalName;
int? optionalCount;

print('name: \$name');
print('optionalName: \$optionalName'); // null

optionalName = 'Flutter';
print('optionalName: \$optionalName');

// nullable の使い方
String? findUser(int id) {
  if (id == 1) return 'Alice';
  if (id == 2) return 'Bob';
  return null; // 見つからない場合
}

void main() {
  final user1 = findUser(1);
  final user2 = findUser(99);

  // null チェック
  if (user1 != null) {
    print('ユーザー1: \${user1.toUpperCase()}');
  }

  // null 合体演算子
  print('ユーザー2: \${user2 ?? '不明'}');

  // ?. 演算子（nullなら null を返す）
  print(user2?.length);    // null
  print(user1?.length);    // 5
}`}
          expectedOutput={`name: Dart
optionalName: null
optionalName: Flutter
ユーザー1: ALICE
ユーザー2: 不明
null
5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">null 安全演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">??</code>（null合体）・<code className="text-teal-300">?.</code>（条件アクセス）・<code className="text-teal-300">!</code>（非nullアサーション）を使い分けます。
        </p>
        <DartEditor
          defaultCode={`class Address {
  String city;
  String? zipCode;

  Address(this.city, [this.zipCode]);
}

class User {
  String name;
  Address? address;

  User(this.name, [this.address]);
}

void main() {
  final user1 = User('田中', Address('東京', '100-0001'));
  final user2 = User('鈴木');

  // ?. による安全なアクセス（チェーン可能）
  print(user1.address?.city);         // 東京
  print(user2.address?.city);         // null
  print(user1.address?.zipCode);      // 100-0001

  // ?? による デフォルト値
  final city1 = user1.address?.city ?? '不明';
  final city2 = user2.address?.city ?? '不明';
  print('都市1: \$city1');
  print('都市2: \$city2');

  // ??= による null の場合のみ代入
  String? value;
  value ??= 'デフォルト';
  print(value);
  value ??= '別の値'; // null でないので代入されない
  print(value);

  // ! によるアサーション（null でないことを保証）
  String? maybeNull = '確実に文字列';
  final length = maybeNull!.length; // null でないと確信できる場合
  print('長さ: \$length');
}`}
          expectedOutput={`東京
null
100-0001
都市1: 東京
都市2: 不明
デフォルト
デフォルト
長さ: 8`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">late キーワードと nullable の活用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">late</code>で遅延初期化を宣言し、nullable型を適切に扱うパターンを学びます。
        </p>
        <DartEditor
          defaultCode={`class Config {
  late String apiUrl;
  late int timeout;
  String? authToken; // optional

  void init(String url, int t, {String? token}) {
    apiUrl = url;
    timeout = t;
    authToken = token;
  }

  void describe() {
    print('URL: \$apiUrl');
    print('タイムアウト: \${timeout}秒');
    print('認証: \${authToken ?? '未設定'}');
  }
}

// nullable リストと非nullリスト
void processItems(List<String?> items) {
  // null を除いたリスト
  final nonNull = items.whereType<String>().toList();
  print('全件: \${items.length}, 有効: \${nonNull.length}');

  for (final item in nonNull) {
    print('  - \${item.toUpperCase()}'); // null安全
  }
}

void main() {
  final config = Config();
  config.init('https://api.example.com', 30, token: 'abc123');
  config.describe();

  print('');

  final config2 = Config();
  config2.init('https://api2.example.com', 60);
  config2.describe();

  print('');

  processItems(['apple', null, 'banana', null, 'cherry']);
}`}
          expectedOutput={`URL: https://api.example.com
タイムアウト: 30秒
認証: abc123

URL: https://api2.example.com
タイムアウト: 60秒
認証: 未設定

全件: 5, 有効: 3
  - APPLE
  - BANANA
  - CHERRY`}
        />
      </section>

      <LessonCompleteButton lessonId="null-safety-types" categoryId="types" />
      <LessonNav lessons={lessons} currentId="null-safety-types" basePath="/learn/types" />
    </div>
  );
}
