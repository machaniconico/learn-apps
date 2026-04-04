import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function NullCoalescingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">Nullセーフティ</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Null合体演算子</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300">??</strong>（Null合体演算子）は左辺がnullのとき右辺の値を返します。
            <strong className="text-indigo-300">??=</strong>はnullのときだけ代入します。
            これらはnullに対するデフォルト値設定を簡潔に書くための演算子です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">?? 演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">expr ?? defaultValue</code>はexprがnullなら<code className="text-indigo-300">defaultValue</code>を返します。
        </p>
        <DartEditor
          defaultCode={`String getDisplayName(String? name) {
  return name ?? '匿名ユーザー';
}

int getScore(int? score) {
  return score ?? 0;
}

void main() {
  // ?? でデフォルト値
  print(getDisplayName('太郎'));  // 太郎
  print(getDisplayName(null));   // 匿名ユーザー

  print(getScore(85));   // 85
  print(getScore(null)); // 0

  // チェーン
  String? first;
  String? second;
  String? third = '最後の候補';

  final result = first ?? second ?? third ?? 'デフォルト';
  print(result); // 最後の候補

  // ?? と ?. の組み合わせ
  String? text = null;
  final length = text?.length ?? -1;
  print('長さ: \$length');

  text = 'Dart';
  final length2 = text?.length ?? -1;
  print('長さ: \$length2');
}`}
          expectedOutput={`太郎
匿名ユーザー
85
0
最後の候補
長さ: -1
長さ: 4`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">??= 演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">variable ??= value</code>はvariableがnullのときだけvalueを代入します。初期化パターンに便利です。
        </p>
        <DartEditor
          defaultCode={`class Cache {
  final Map<String, String> _store = {};

  String getOrSet(String key, String Function() factory) {
    _store[key] ??= factory();
    return _store[key]!;
  }
}

void main() {
  // ??= の基本
  String? value;
  print('初期値: \$value');

  value ??= '最初の代入';
  print('??= 後: \$value');

  value ??= '2回目の代入';  // nullでないので変わらない
  print('2回目 ??= 後: \$value');

  // Cacheクラスの使用
  final cache = Cache();
  int callCount = 0;

  String expensiveCalc() {
    callCount++;
    return '計算結果\$callCount';
  }

  print(cache.getOrSet('key1', expensiveCalc)); // 計算実行
  print(cache.getOrSet('key1', expensiveCalc)); // キャッシュから
  print(cache.getOrSet('key2', expensiveCalc)); // 計算実行
  print('計算回数: \$callCount');
}`}
          expectedOutput={`初期値: null
??= 後: 最初の代入
2回目 ??= 後: 最初の代入
計算結果1
計算結果1
計算結果2
計算回数: 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">実践的な使用パターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">??</code>を使ったデフォルト値パターンの実例を見てみましょう。
        </p>
        <DartEditor
          defaultCode={`Map<String, dynamic> parseConfig(Map<String, dynamic>? raw) {
  final config = raw ?? {};
  return {
    'host': config['host'] ?? 'localhost',
    'port': config['port'] ?? 8080,
    'debug': config['debug'] ?? false,
    'timeout': config['timeout'] ?? 30,
    'name': config['name'] ?? 'MyApp',
  };
}

void main() {
  // nullのconfigでもデフォルト値で動作
  final defaults = parseConfig(null);
  print('デフォルト設定:');
  defaults.forEach((k, v) => print('  \$k: \$v'));

  print('');

  // 一部だけ上書き
  final custom = parseConfig({'host': 'myserver.com', 'port': 443});
  print('カスタム設定:');
  custom.forEach((k, v) => print('  \$k: \$v'));
}`}
          expectedOutput={`デフォルト設定:
  host: localhost
  port: 8080
  debug: false
  timeout: 30
  name: MyApp

カスタム設定:
  host: myserver.com
  port: 443
  debug: false
  timeout: 30
  name: MyApp`}
        />
      </section>

      <LessonCompleteButton lessonId="null-coalescing" categoryId="null-safety" />
      <LessonNav lessons={lessons} currentId="null-coalescing" basePath="/learn/null-safety" />
    </div>
  );
}
