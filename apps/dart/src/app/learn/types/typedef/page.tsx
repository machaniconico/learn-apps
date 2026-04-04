import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function TypedefPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">typedef</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">typedef</strong>は型に別名を付けるキーワードです。
            関数型や複雑なジェネリクス型に短い名前を付けて、コードの可読性を高めます。
            Dart 2.13からはジェネリクスを含む任意の型にも使えるようになりました。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数型の typedef</h2>
        <p className="text-gray-400 mb-4">
          コールバック関数の型に名前を付けることで、シグネチャが明確になります。
        </p>
        <DartEditor
          defaultCode={`// 関数型の typedef
typedef IntTransformer = int Function(int);
typedef StringPredicate = bool Function(String);
typedef Comparator<T> = int Function(T, T);

int doubleIt(int n) => n * 2;
int squareIt(int n) => n * n;
int addTen(int n) => n + 10;

bool isLong(String s) => s.length > 5;
bool startsWithA(String s) => s.startsWith('A');

List<int> transform(List<int> list, IntTransformer fn) =>
    list.map(fn).toList();

List<String> filter(List<String> list, StringPredicate pred) =>
    list.where(pred).toList();

void main() {
  final numbers = [1, 2, 3, 4, 5];

  print(transform(numbers, doubleIt));
  print(transform(numbers, squareIt));
  print(transform(numbers, addTen));

  final words = ['Apple', 'Banana', 'Hi', 'Dart', 'Flutter'];
  print(filter(words, isLong));
  print(filter(words, startsWithA));

  // typedef を使った変数
  IntTransformer triple = (n) => n * 3;
  print(transform(numbers, triple));
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[1, 4, 9, 16, 25]
[11, 12, 13, 14, 15]
[Banana, Flutter]
[Apple]
[3, 6, 9, 12, 15]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複雑な型への typedef</h2>
        <p className="text-gray-400 mb-4">
          ネストしたジェネリクス型や長い型名を<code className="text-teal-300">typedef</code>で簡潔にします。
        </p>
        <DartEditor
          defaultCode={`// 複雑な型に別名を付ける
typedef Json = Map<String, dynamic>;
typedef JsonList = List<Map<String, dynamic>>;
typedef StringMap = Map<String, String>;
typedef Callback = void Function();
typedef AsyncCallback = Future<void> Function();

Json createUser(String name, int age, String email) {
  return {
    'name': name,
    'age': age,
    'email': email,
  };
}

void printUser(Json user) {
  print('名前: \${user['name']}, 年齢: \${user['age']}');
}

JsonList fetchUsers() {
  return [
    createUser('Alice', 30, 'alice@example.com'),
    createUser('Bob', 25, 'bob@example.com'),
    createUser('Carol', 35, 'carol@example.com'),
  ];
}

void runWithCallback(String label, Callback fn) {
  print('[\$label] 開始');
  fn();
  print('[\$label] 完了');
}

void main() {
  final user = createUser('田中', 28, 'tanaka@example.com');
  printUser(user);

  final users = fetchUsers();
  for (final u in users) {
    printUser(u);
  }

  runWithCallback('タスク1', () => print('  処理を実行中'));

  final env = StringMap.fromEntries([
    MapEntry('APP_ENV', 'production'),
    MapEntry('DEBUG', 'false'),
  ]);
  print(env);
}`}
          expectedOutput={`名前: 田中, 年齢: 28
名前: Alice, 年齢: 30
名前: Bob, 年齢: 25
名前: Carol, 年齢: 35
[タスク1] 開始
  処理を実行中
[タスク1] 完了
{APP_ENV: production, DEBUG: false}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクス typedef</h2>
        <p className="text-gray-400 mb-4">
          型パラメータを持つ<code className="text-teal-300">typedef</code>で汎用的な型エイリアスを定義できます。
        </p>
        <DartEditor
          defaultCode={`// ジェネリクス typedef
typedef Predicate<T> = bool Function(T value);
typedef Mapper<T, R> = R Function(T input);
typedef Reducer<T> = T Function(T acc, T current);

List<T> myWhere<T>(List<T> list, Predicate<T> pred) =>
    list.where(pred).toList();

List<R> myMap<T, R>(List<T> list, Mapper<T, R> mapper) =>
    list.map(mapper).toList();

T myReduce<T>(List<T> list, Reducer<T> reducer) =>
    list.reduce(reducer);

void main() {
  final ints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  Predicate<int> isEven = (n) => n % 2 == 0;
  Mapper<int, String> toLabel = (n) => '番号\$n';
  Reducer<int> sum = (a, b) => a + b;

  print(myWhere(ints, isEven));
  print(myMap([1, 2, 3], toLabel));
  print(myReduce(ints, sum));

  final words = ['hello', 'dart', 'world'];
  Mapper<String, int> wordLen = (s) => s.length;
  Reducer<String> concat = (a, b) => '\$a \$b';

  print(myMap(words, wordLen));
  print(myReduce(words, concat));
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[番号1, 番号2, 番号3]
55
[5, 4, 5]
hello dart world`}
        />
      </section>

      <LessonCompleteButton lessonId="typedef" categoryId="types" />
      <LessonNav lessons={lessons} currentId="typedef" basePath="/learn/types" />
    </div>
  );
}
