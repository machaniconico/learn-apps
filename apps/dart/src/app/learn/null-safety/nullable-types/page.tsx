import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function NullableTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">Nullセーフティ</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Nullable型</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300">Nullable型</strong>は型名の後に<code className="text-indigo-300">?</code>をつけることで宣言します。
            nullを格納できる型で、アクセス前にnullチェックが必要です。
            関数の引数や戻り値、クラスフィールドでよく使われます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">nullable型の宣言と使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">String?</code>・<code className="text-indigo-300">int?</code>・<code className="text-indigo-300">bool?</code>のように任意の型をnullableにできます。
        </p>
        <DartEditor
          defaultCode={`class Person {
  final String name;
  final int? age;        // 年齢は任意
  final String? email;  // メールは任意

  Person(this.name, {this.age, this.email});

  void introduce() {
    print('名前: \$name');
    if (age != null) {
      print('年齢: \$age 歳');
    } else {
      print('年齢: 未公開');
    }
    print('メール: \${email ?? '未登録'}');
  }
}

void main() {
  final alice = Person('アリス', age: 30, email: 'alice@example.com');
  alice.introduce();
  print('---');

  final bob = Person('ボブ');
  bob.introduce();
}`}
          expectedOutput={`名前: アリス
年齢: 30 歳
メール: alice@example.com
---
名前: ボブ
年齢: 未公開
メール: 未登録`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">nullable型の関数引数と戻り値</h2>
        <p className="text-gray-400 mb-4">
          関数の引数・戻り値もnullableにできます。nullを返す可能性がある場合に使います。
        </p>
        <DartEditor
          defaultCode={`// nullを返す可能性がある場合はnullable戻り値
int? parseInt(String s) {
  return int.tryParse(s);
}

// nullable引数
String formatNumber(int? n, {String fallback = '---'}) {
  if (n == null) return fallback;
  return n.toString().padLeft(6, '0');
}

void main() {
  final inputs = ['42', 'abc', '100', '', '999'];

  for (final input in inputs) {
    final result = parseInt(input);
    print('\$input -> \${formatNumber(result)}');
  }
}`}
          expectedOutput={`42 -> 000042
abc -> ---
100 -> 000100
 -> ---
999 -> 000999`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">nullableコレクション</h2>
        <p className="text-gray-400 mb-4">
          コレクション自体や要素をnullableにできます。それぞれ意味が異なります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // List自体がnullable（リストがないかもしれない）
  List<String>? maybeList;
  print('maybeList: \$maybeList');
  maybeList = ['A', 'B', 'C'];
  print('maybeList: \$maybeList');

  // null要素を含むリスト
  List<int?> listWithNulls = [1, null, 3, null, 5];
  final nonNulls = listWithNulls.whereType<int>().toList();
  print('nullを除いた要素: \$nonNulls');

  // nullableなMapの値
  Map<String, int?> scores = {
    '太郎': 85,
    '花子': null,  // 未受験
    '次郎': 92,
  };

  for (final entry in scores.entries) {
    final scoreStr = entry.value?.toString() ?? '未受験';
    print('\${entry.key}: \$scoreStr');
  }
}`}
          expectedOutput={`maybeList: null
maybeList: [A, B, C]
nullを除いた要素: [1, 3, 5]
太郎: 85
花子: 未受験
次郎: 92`}
        />
      </section>

      <LessonCompleteButton lessonId="nullable-types" categoryId="null-safety" />
      <LessonNav lessons={lessons} currentId="nullable-types" basePath="/learn/null-safety" />
    </div>
  );
}
