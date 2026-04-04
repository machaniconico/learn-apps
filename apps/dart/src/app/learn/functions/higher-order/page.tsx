import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function HigherOrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">高階関数</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">高階関数</strong>は関数を引数として受け取ったり、関数を戻り値として返す関数です。
            Dartでは関数は第一級オブジェクトなので、変数に代入したり引数として渡せます。
            <code>map</code>、<code>where</code>、<code>fold</code>などが代表的な高階関数です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数を引数として渡す</h2>
        <p className="text-gray-400 mb-4">
          関数型<code className="text-purple-300">戻り値型 Function(引数型)</code>でパラメータの型を宣言できます。
        </p>
        <DartEditor
          defaultCode={`// 関数を引数として受け取る
List<T> myFilter<T>(List<T> list, bool Function(T) predicate) {
  List<T> result = [];
  for (var item in list) {
    if (predicate(item)) result.add(item);
  }
  return result;
}

void applyTwice(void Function() action) {
  action();
  action();
}

// 関数を返す
int Function(int) multiplier(int factor) {
  return (int x) => x * factor;
}

void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  print(myFilter(numbers, (n) => n % 2 == 0));
  print(myFilter(numbers, (n) => n > 5));

  applyTwice(() => print('Hello!'));

  var triple = multiplier(3);
  var quintuple = multiplier(5);
  print(triple(7));
  print(quintuple(4));
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[6, 7, 8, 9, 10]
Hello!
Hello!
21
20`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クロージャと状態の保持</h2>
        <p className="text-gray-400 mb-4">
          クロージャは外側のスコープの変数を参照し続けます。状態を持つ関数を作れます。
        </p>
        <DartEditor
          defaultCode={`// カウンターを返す関数（クロージャ）
Map<String, Function> makeCounter({int initial = 0, int step = 1}) {
  int count = initial;
  return {
    'increment': () { count += step; return count; },
    'decrement': () { count -= step; return count; },
    'reset': () { count = initial; return count; },
    'value': () => count,
  };
}

// メモ化
int Function(int) memoize(int Function(int) fn) {
  Map<int, int> cache = {};
  return (int n) => cache[n] ??= fn(n);
}

void main() {
  var counter = makeCounter(initial: 10, step: 5);
  print(counter['value']!());         // 10
  print(counter['increment']!());     // 15
  print(counter['increment']!());     // 20
  print(counter['decrement']!());     // 15
  print(counter['reset']!());         // 10

  // メモ化で重複計算を省く
  int callCount = 0;
  int expensive(int n) {
    callCount++;
    return n * n;
  }
  var memoized = memoize(expensive);
  memoized(5); memoized(5); memoized(5);
  print('呼び出し回数: \$callCount'); // 1（キャッシュ利用）
}`}
          expectedOutput={`10
15
20
15
10
呼び出し回数: 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数合成とパイプライン</h2>
        <p className="text-gray-400 mb-4">
          関数を合成して新しい関数を作ることで、処理のパイプラインを構築できます。
        </p>
        <DartEditor
          defaultCode={`// 関数合成
T Function(A) compose<A, B, T>(
  T Function(B) f,
  B Function(A) g,
) => (A x) => f(g(x));

void main() {
  // 個別の変換関数
  String trim(String s) => s.trim();
  String toLowerCase(String s) => s.toLowerCase();
  String addExclamation(String s) => '\$s!';

  // 合成
  var normalize = compose(compose(addExclamation, toLowerCase), trim);
  print(normalize('  Hello World  '));
  print(normalize('  DART FLUTTER  '));

  // fold（reduce の汎用版）
  List<int> numbers = [1, 2, 3, 4, 5];
  int product = numbers.fold(1, (acc, n) => acc * n);
  print('積: \$product');

  Map<String, int> freq = numbers.fold({}, (map, n) {
    map[n.toString()] = (map[n.toString()] ?? 0) + 1;
    return map;
  });
  print('頻度: \$freq');
}`}
          expectedOutput={`hello world!
dart flutter!
積: 120
頻度: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}`}
        />
      </section>

      <LessonCompleteButton lessonId="higher-order" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="higher-order" basePath="/learn/functions" />
    </div>
  );
}
