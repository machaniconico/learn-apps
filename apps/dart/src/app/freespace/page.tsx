import { DartEditor } from "@/components/dart-editor";

const DEFAULT_CODE = `// Dart FizzBuzz + リスト操作 + クラス

void main() {
  // FizzBuzz
  print('=== FizzBuzz (1-20) ===');
  for (int i = 1; i <= 20; i++) {
    if (i % 15 == 0) {
      print('FizzBuzz');
    } else if (i % 3 == 0) {
      print('Fizz');
    } else if (i % 5 == 0) {
      print('Buzz');
    } else {
      print(i);
    }
  }

  // リストの高階関数
  print('\\n=== リスト操作 ===');
  final numbers = List.generate(10, (i) => i + 1);
  final evenSquares = numbers
      .where((n) => n % 2 == 0)
      .map((n) => n * n)
      .toList();
  print('偶数の二乗: $evenSquares');

  final sum = numbers.reduce((a, b) => a + b);
  print('合計: $sum');

  // クラス
  print('\\n=== クラス ===');
  final people = [
    Person('太郎', 25),
    Person('花子', 30),
    Person('次郎', 22),
  ];

  people.sort((a, b) => a.age.compareTo(b.age));
  for (final p in people) {
    print('  \${p.name}（\${p.age}歳）');
  }

  // Null安全
  print('\\n=== Null安全 ===');
  String? maybeNull = null;
  final length = maybeNull?.length ?? 0;
  print('長さ: \$length（nullなら0）');
}

class Person {
  final String name;
  final int age;

  const Person(this.name, this.age);

  @override
  String toString() => '\$name(\$age歳)';
}
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎯</span>
            <h1 className="text-3xl font-bold text-gray-100">Dartフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">Dartコードを自由に書いて確認できるフリースペースです</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              シンタックスハイライト対応
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Tabキーでインデント
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              自由にコードを試せる
            </div>
          </div>
        </div>

        <DartEditor defaultCode={DEFAULT_CODE} height="480px" />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Dart基本機能</h3>
            <p className="text-xs text-gray-500 leading-relaxed">変数、リスト、Map、文字列操作、Null安全、switch式などDartの基本機能を自由に試せます。</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">OOP・モダンDart</h3>
            <p className="text-xs text-gray-500 leading-relaxed">クラス、sealed class、Records、パターンマッチ、非同期処理などDart 3のモダン機能を確認できます。</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">DartPadまたはローカル環境で実行してください。Flutter固有のウィジェットはDartPad（Flutter mode）が必要です。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
