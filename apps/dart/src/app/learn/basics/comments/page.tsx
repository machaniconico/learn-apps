import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">コメント</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartのコメントには<strong className="text-blue-300">// 一行コメント</strong>、
            <strong className="text-blue-300">/* ブロックコメント */</strong>、
            <strong className="text-blue-300">/// ドキュメントコメント</strong>の3種類があります。
            適切なコメントはコードの可読性を高めます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">一行コメントとブロックコメント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">//</code>で始まる一行コメントと、<code className="text-blue-300">/* */</code>で囲むブロックコメントが使えます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 一行コメント: この行はコードとして実行されない
  print('コメントのデモ');

  int x = 10; // 行末コメントも使える

  /* ブロックコメント:
     複数行にわたるコメントを書ける
     コードを一時的に無効化するのにも使う */

  // コメントはネストできる（/* 内に // は使える）
  /* 外側のコメント
    // 内側の一行コメント
  */

  /* ネストしたブロックコメント
     /* 内側もブロックコメント */
  end */

  int result = x * 2; // xを2倍にする
  print('結果: \$result');
}`}
          expectedOutput={`コメントのデモ
結果: 20`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ドキュメントコメント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">///</code>で始まるドキュメントコメントはdartdocツールでAPIドキュメントを生成するのに使います。Markdownが使えます。
        </p>
        <DartEditor
          defaultCode={`/// 摂氏を華氏に変換するユーティリティクラス。
///
/// 使用例:
/// \`\`\`dart
/// var fahrenheit = TempConverter.toFahrenheit(100);
/// print(fahrenheit); // 212.0
/// \`\`\`
class TempConverter {
  /// 摂氏[celsius]を華氏に変換して返す。
  ///
  /// [celsius] 変換する摂氏温度。
  /// 戻り値は華氏温度（double型）。
  static double toFahrenheit(double celsius) {
    return celsius * 9 / 5 + 32;
  }

  /// 華氏[fahrenheit]を摂氏に変換して返す。
  static double toCelsius(double fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
}

void main() {
  double boiling = TempConverter.toFahrenheit(100);
  double freezing = TempConverter.toCelsius(32);
  print('100°C = \${boiling}°F');
  print('32°F = \${freezing}°C');
}`}
          expectedOutput={`100°C = 212.0°F
32°F = 0.0°C`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コメントのベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          良いコメントは「なぜ」を説明し、「何を」はコード自体が語るようにします。
        </p>
        <DartEditor
          defaultCode={`/// ユーザーの年齢から成人かどうかを判定する。
/// 日本の法律（民法）に基づき、18歳以上を成人とする。
bool isAdult(int age) {
  return age >= 18; // 2022年から18歳に引き下げ
}

/// フィボナッチ数列のn番目の値を返す（0-indexed）。
/// メモ化により計算量をO(n)に抑えている。
int fibonacci(int n, [Map<int, int>? memo]) {
  memo ??= {};
  if (n <= 1) return n;
  // 計算済みの値はキャッシュから取得
  return memo[n] ??= fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}

void main() {
  print('18歳は成人: \${isAdult(18)}');
  print('17歳は成人: \${isAdult(17)}');

  // フィボナッチ数列の最初の10項
  List<int> fibs = List.generate(10, fibonacci);
  print('フィボナッチ: \$fibs');
}`}
          expectedOutput={`18歳は成人: true
17歳は成人: false
フィボナッチ: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`}
        />
      </section>

      <LessonCompleteButton lessonId="comments" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
