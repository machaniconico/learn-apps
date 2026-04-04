import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function ConditionalAccessPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">Nullセーフティ</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">条件付きアクセス</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300">?.</strong>（条件付きメンバーアクセス演算子）は、nullable型のオブジェクトに対して安全にプロパティやメソッドへアクセスするための演算子です。
            オブジェクトがnullの場合は<code className="text-indigo-300">null</code>を返し、non-nullの場合はメンバーへのアクセスを実行します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">?. 演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">obj?.property</code>はobjがnullなら<code className="text-indigo-300">null</code>、そうでなければ<code className="text-indigo-300">obj.property</code>を返します。
        </p>
        <DartEditor
          defaultCode={`class Address {
  final String city;
  final String? zipCode;

  Address(this.city, {this.zipCode});

  String get formatted => '\$city \${zipCode ?? ''}';
}

class User {
  final String name;
  final Address? address;

  User(this.name, {this.address});
}

void main() {
  final user1 = User('太郎', address: Address('東京', zipCode: '100-0001'));
  final user2 = User('花子');

  // ?. でnull安全にチェーンアクセス
  print(user1.address?.city);        // 東京
  print(user1.address?.zipCode);     // 100-0001
  print(user2.address?.city);        // null
  print(user2.address?.zipCode);     // null

  // チェーン
  print(user1.address?.formatted);   // 東京 100-0001
  print(user2.address?.formatted);   // null

  // メソッド呼び出し
  print(user1.address?.city.toUpperCase());  // TOKYO
  print(user2.address?.city.toUpperCase());  // null
}`}
          expectedOutput={`東京
100-0001
null
null
東京 100-0001
null
東京
null`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">?[] 添字演算子と組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">?[]</code>でnullableなMapやListへの安全なアクセスができます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  Map<String, List<String>>? data = {
    'fruits': ['apple', 'banana', 'cherry'],
    'veggies': ['carrot', 'broccoli'],
  };

  // ?[] でnullableなMapにアクセス
  print(data?['fruits']);
  print(data?['other']);  // キーなし -> null

  // チェーン: ?[] と ?. の組み合わせ
  print(data?['fruits']?.first);
  print(data?['fruits']?.length);

  // dataをnullにしてもエラーにならない
  data = null;
  print(data?['fruits']);         // null
  print(data?['fruits']?.first);  // null

  // ?? と組み合わせてデフォルト値
  final items = data?['fruits'] ?? ['デフォルト'];
  print(items);
}`}
          expectedOutput={`[apple, banana, cherry]
null
apple
3
null
null
[デフォルト]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">?. を使った実践的なパターン</h2>
        <p className="text-gray-400 mb-4">
          実際のコードでよく使われる<code className="text-indigo-300">?.</code>のパターンを確認しましょう。
        </p>
        <DartEditor
          defaultCode={`class Config {
  final Map<String, String> _settings;
  Config(this._settings);
  String? get(String key) => _settings[key];
}

Config? loadConfig(bool shouldLoad) {
  if (!shouldLoad) return null;
  return Config({'theme': 'dark', 'lang': 'ja'});
}

void main() {
  // シナリオ1: 設定あり
  final config1 = loadConfig(true);
  print('テーマ: \${config1?.get('theme') ?? 'light'}');
  print('言語: \${config1?.get('lang') ?? 'en'}');
  print('未定義: \${config1?.get('missing') ?? 'default'}');

  print('---');

  // シナリオ2: 設定なし
  final config2 = loadConfig(false);
  print('テーマ: \${config2?.get('theme') ?? 'light'}');
  print('言語: \${config2?.get('lang') ?? 'en'}');
}`}
          expectedOutput={`テーマ: dark
言語: ja
未定義: default
---
テーマ: light
言語: en`}
        />
      </section>

      <LessonCompleteButton lessonId="conditional-access" categoryId="null-safety" />
      <LessonNav lessons={lessons} currentId="conditional-access" basePath="/learn/null-safety" />
    </div>
  );
}
