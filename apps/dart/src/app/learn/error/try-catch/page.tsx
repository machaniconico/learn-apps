import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function TryCatchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">try-catch</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartでは<strong className="text-red-300">try-catch</strong>ブロックを使って例外を処理します。
            <code className="text-red-300">on</code>キーワードで特定の例外型を指定し、
            <code className="text-red-300">catch</code>で例外オブジェクトとスタックトレースを受け取れます。
            <code className="text-red-300">finally</code>ブロックは例外の有無にかかわらず必ず実行されます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な try-on-catch</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">on 例外型</code>で特定の例外型をキャッチします。複数の型を指定できます。
        </p>
        <DartEditor
          defaultCode={`void checkAge(int age) {
  if (age < 0) {
    throw ArgumentError('年齢は0以上でなければなりません: \$age');
  }
  if (age > 150) {
    throw RangeError.range(age, 0, 150, 'age');
  }
  print('年齢 \$age は有効です');
}

void main() {
  for (final age in [25, -5, 200]) {
    try {
      checkAge(age);
    } on ArgumentError catch (e) {
      print('引数エラー: \${e.message}');
    } on RangeError catch (e) {
      print('範囲エラー: \${e.message}');
    } catch (e, s) {
      print('予期しないエラー: \$e');
    }
  }
  print('処理完了');
}`}
          expectedOutput={`年齢 25 は有効です
引数エラー: 年齢は0以上でなければなりません: -5
範囲エラー: RangeError (age): Value not in range: 200
処理完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">finally ブロック</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">finally</code>ブロックはリソースの解放など、例外の有無にかかわらず実行したい処理に使います。
        </p>
        <DartEditor
          defaultCode={`class Resource {
  final String name;
  bool _opened = false;

  Resource(this.name);

  void open() {
    _opened = true;
    print('\$name: オープン');
  }

  void process(bool shouldFail) {
    if (!_opened) throw StateError('リソースが開いていません');
    if (shouldFail) throw Exception('\$name の処理に失敗');
    print('\$name: 処理成功');
  }

  void close() {
    _opened = false;
    print('\$name: クローズ');
  }
}

void main() {
  for (final fail in [false, true]) {
    final res = Resource('ファイル');
    try {
      res.open();
      res.process(fail);
    } catch (e) {
      print('エラー: \$e');
    } finally {
      res.close(); // 必ず実行
    }
    print('---');
  }
}`}
          expectedOutput={`ファイル: オープン
ファイル: 処理成功
ファイル: クローズ
---
ファイル: オープン
エラー: Exception: ファイル の処理に失敗
ファイル: クローズ
---`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外の再スロー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">rethrow</code>で現在の例外を再スローできます。ログを残しながら上位に伝播させるときに使います。
        </p>
        <DartEditor
          defaultCode={`void logAndRethrow(Object e, StackTrace s) {
  print('ログ: \${e.runtimeType} が発生');
  rethrow; // catchブロック内でのみ使用可
}

void process(int value) {
  try {
    if (value < 0) throw ArgumentError('負の値: \$value');
    print('処理: \$value');
  } catch (e, s) {
    print('中間でキャッチ: \$e');
    rethrow; // 再スロー
  }
}

void main() {
  try {
    process(10);
    process(-1);
  } on ArgumentError catch (e) {
    print('最終キャッチ: \${e.message}');
  }
}`}
          expectedOutput={`処理: 10
中間でキャッチ: Invalid argument(s): 負の値: -1
最終キャッチ: 負の値: -1`}
        />
      </section>

      <LessonCompleteButton lessonId="try-catch" categoryId="error" />
      <LessonNav lessons={lessons} currentId="try-catch" basePath="/learn/error" />
    </div>
  );
}
