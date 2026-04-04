import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

export default function SealedClassPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold">Dart 3新機能 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">シールドクラス</h1>
        <p className="text-gray-400">継承を制限するsealed classとパターンマッチングの強力な組み合わせを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">sealed classとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="text-violet-300">sealed</code>クラスは継承できるサブクラスを同一ライブラリ内に制限します。
          コンパイラがすべてのサブタイプを把握できるため、switch式での網羅性チェックが可能になります。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• 同一ライブラリ外からは継承・実装不可</li>
          <li>• switch式で全サブタイプを処理しないとコンパイルエラー</li>
          <li>• 代数的データ型（ADT）のパターンを実現</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Result型の実装</h2>
        <p className="text-gray-400 mb-4">
          sealed classを使ってエラーハンドリングのResult型を実装します。
        </p>
        <DartEditor
          defaultCode={`sealed class Result<T> {}

class Success<T> extends Result<T> {
  final T value;
  Success(this.value);
}

class Failure<T> extends Result<T> {
  final String error;
  Failure(this.error);
}

Result<int> divide(int a, int b) {
  if (b == 0) return Failure('ゼロ除算エラー');
  return Success(a ~/ b);
}

void handleResult(Result<int> result) {
  switch (result) {
    case Success(value: final v):
      print('成功: \$v');
    case Failure(error: final e):
      print('失敗: \$e');
  }
}

void main() {
  handleResult(divide(10, 2));
  handleResult(divide(10, 0));
  handleResult(divide(15, 4));
}`}
          expectedOutput={`成功: 5\n失敗: ゼロ除算エラー\n成功: 3`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">UIの状態管理への応用</h2>
        <p className="text-gray-400 mb-4">
          ロード状態をsealed classで表現するFlutter風のパターンです。
        </p>
        <DartEditor
          defaultCode={`sealed class AsyncState<T> {}

class Loading<T> extends AsyncState<T> {}

class Loaded<T> extends AsyncState<T> {
  final T data;
  Loaded(this.data);
}

class Error<T> extends AsyncState<T> {
  final String message;
  Error(this.message);
}

String renderState(AsyncState<List<String>> state) => switch (state) {
  Loading() => 'ローディング中...',
  Loaded(data: final items) =>
    'データ: \${items.join(", ")}',
  Error(message: final msg) =>
    'エラー: \$msg',
};

void main() {
  final states = <AsyncState<List<String>>>[
    Loading(),
    Loaded(['田中', '鈴木', '佐藤']),
    Error('ネットワークエラー'),
  ];

  for (final state in states) {
    print(renderState(state));
  }
}`}
          expectedOutput={`ローディング中...\nデータ: 田中, 鈴木, 佐藤\nエラー: ネットワークエラー`}
        />
      </section>
      <LessonCompleteButton lessonId="sealed-class" categoryId="dart3" />
      <LessonNav lessons={lessons} currentId="sealed-class" basePath="/learn/dart3" />
    </div>
  );
}
