import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ReturnValuesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">戻り値</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            関数は<strong className="text-purple-300">return</strong>文で値を返します。戻り値の型は関数宣言時に指定します。
            複数の値を返したい場合はレコード型やリスト、マップを使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な戻り値</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">return</code>文で関数から値を返します。returnに達すると関数の実行が終了します。
        </p>
        <DartEditor
          defaultCode={`// 様々な型の戻り値
String repeat(String s, int n) => s * n;
bool isPositive(int n) => n > 0;
List<int> range(int start, int end) {
  return List.generate(end - start, (i) => start + i);
}

// 早期return
String classify(int n) {
  if (n < 0) return '負の数';
  if (n == 0) return 'ゼロ';
  if (n < 10) return '小さい正の数';
  return '大きな正の数';
}

void main() {
  print(repeat('abc', 3));
  print(isPositive(-5));
  print(isPositive(10));
  print(range(1, 6));

  for (int n in [-3, 0, 7, 42]) {
    print('\$n: \${classify(n)}');
  }
}`}
          expectedOutput={`abcabcabc
false
true
[1, 2, 3, 4, 5]
-3: 負の数
0: ゼロ
7: 小さい正の数
42: 大きな正の数`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数の値を返す（レコード型）</h2>
        <p className="text-gray-400 mb-4">
          Dart 3のレコード型（<code className="text-purple-300">(型1, 型2)</code>）を使うと、複数の値を返せます。
        </p>
        <DartEditor
          defaultCode={`// レコード型で複数の値を返す
(double min, double max, double avg) stats(List<double> values) {
  double min = values.reduce((a, b) => a < b ? a : b);
  double max = values.reduce((a, b) => a > b ? a : b);
  double avg = values.reduce((a, b) => a + b) / values.length;
  return (min, max, avg);
}

// 名前付きレコード
({String name, int age}) createPerson(String n, int a) {
  return (name: n, age: a);
}

void main() {
  List<double> scores = [78.5, 92.0, 65.5, 88.0, 73.5];
  var (min, max, avg) = stats(scores);
  print('最小: \$min');
  print('最大: \$max');
  print('平均: \${avg.toStringAsFixed(1)}');

  var person = createPerson('Alice', 30);
  print('名前: \${person.name}, 年齢: \${person.age}');
}`}
          expectedOutput={`最小: 65.5
最大: 92.0
平均: 79.5
名前: Alice, 年齢: 30`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Null許容の戻り値</h2>
        <p className="text-gray-400 mb-4">
          値が存在しない場合があるときは、<code className="text-purple-300">型?</code>でnullを返せる戻り値型を宣言します。
        </p>
        <DartEditor
          defaultCode={`// 見つからない場合にnullを返す
int? findFirst(List<int> list, bool Function(int) predicate) {
  for (int item in list) {
    if (predicate(item)) return item;
  }
  return null; // 見つからなかった
}

String? getEnvVar(Map<String, String> env, String key) {
  return env[key]; // 存在しなければnull
}

void main() {
  List<int> numbers = [1, 3, 5, 8, 11, 14];

  int? firstEven = findFirst(numbers, (n) => n % 2 == 0);
  print('最初の偶数: \${firstEven ?? "なし"}');

  int? over100 = findFirst(numbers, (n) => n > 100);
  print('100超の値: \${over100 ?? "なし"}');

  Map<String, String> env = {'HOST': 'localhost', 'PORT': '8080'};
  print('HOST: \${getEnvVar(env, 'HOST') ?? 'デフォルト'}');
  print('DB: \${getEnvVar(env, 'DB') ?? 'デフォルト'}');
}`}
          expectedOutput={`最初の偶数: 8
100超の値: なし
HOST: localhost
DB: デフォルト`}
        />
      </section>

      <LessonCompleteButton lessonId="return-values" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}
