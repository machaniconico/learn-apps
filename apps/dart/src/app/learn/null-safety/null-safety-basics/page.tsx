import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function NullSafetyBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">Nullセーフティ</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Nullセーフティの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 2.12で導入された<strong className="text-indigo-300">Nullセーフティ</strong>は、null参照エラー（NullPointerException）をコンパイル時に防ぐ仕組みです。
            変数はデフォルトでnullを持てない<strong className="text-indigo-300">non-nullable</strong>型となり、
            明示的に<code className="text-indigo-300">?</code>をつけた場合のみnullを格納できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">non-nullable型とnullable型</h2>
        <p className="text-gray-400 mb-4">
          型に<code className="text-indigo-300">?</code>をつけるとnull許容型になります。つけなければコンパイラがnull代入を禁止します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // non-nullable型（nullは入れられない）
  String name = 'Dart';
  int count = 0;
  bool isActive = true;

  print('name: \$name');
  print('count: \$count');
  print('isActive: \$isActive');

  // nullable型（nullを入れられる）
  String? optionalName = null;
  int? optionalCount = null;

  print('optionalName: \$optionalName');
  print('optionalCount: \$optionalCount');

  // 後から値を代入
  optionalName = 'Flutter';
  optionalCount = 42;
  print('optionalName（更新）: \$optionalName');
  print('optionalCount（更新）: \$optionalCount');
}`}
          expectedOutput={`name: Dart
count: 0
isActive: true
optionalName: null
optionalCount: null
optionalName（更新）: Flutter
optionalCount（更新）: 42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Nullセーフティの恩恵</h2>
        <p className="text-gray-400 mb-4">
          Nullセーフティにより、nullチェックなしにnullable型のメンバーへアクセスしようとするとコンパイルエラーになります。
        </p>
        <DartEditor
          defaultCode={`String greet(String name) {
  return 'こんにちは、\$name さん！';
}

String? tryGreet(String? name) {
  // nameがnullかもしれないので?でアクセス
  if (name == null) return null;
  return 'こんにちは、\$name さん！';
}

void main() {
  // non-nullableはそのまま使える
  final msg1 = greet('太郎');
  print(msg1);

  // nullableはnullチェックが必要
  String? user = '花子';
  final msg2 = tryGreet(user);
  print(msg2);

  user = null;
  final msg3 = tryGreet(user);
  print('null結果: \$msg3');

  // if (name != null) でnullチェック後はnon-nullとして使える
  String? city = '東京';
  if (city != null) {
    // この中ではcityはnon-null String
    print('都市名の長さ: \${city.length}');
  }
}`}
          expectedOutput={`こんにちは、太郎 さん！
こんにちは、花子 さん！
null結果: null
都市名の長さ: 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型フロー解析（Flow Analysis）</h2>
        <p className="text-gray-400 mb-4">
          Dartコンパイラはコードの流れを解析して、nullチェック後は自動的にnon-nullable型として扱います。
        </p>
        <DartEditor
          defaultCode={`int? findValue(List<int> list, int target) {
  final index = list.indexOf(target);
  if (index == -1) return null;
  return list[index];
}

void processValue(int? value) {
  // nullチェック前はnullable
  print('raw value: \$value');

  if (value == null) {
    print('値が見つかりませんでした');
    return; // ここでreturnするのでこの後valueはnon-null
  }

  // この下ではvalueはnon-nullable int
  print('値: \$value');
  print('2倍: \${value * 2}');
  print('文字列長: \${value.toString().length}桁');
}

void main() {
  final list = [10, 20, 30, 40, 50];
  processValue(findValue(list, 30));
  print('---');
  processValue(findValue(list, 99));
}`}
          expectedOutput={`raw value: 30
値: 30
2倍: 60
文字列長: 2桁
---
raw value: null
値が見つかりませんでした`}
        />
      </section>

      <LessonCompleteButton lessonId="null-safety-basics" categoryId="null-safety" />
      <LessonNav lessons={lessons} currentId="null-safety-basics" basePath="/learn/null-safety" />
    </div>
  );
}
