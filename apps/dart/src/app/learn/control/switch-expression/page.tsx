import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchExpressionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">switch式</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 3で強化された<strong className="text-green-300">switch式</strong>はより簡潔な構文で値を返せます。
            各ケースは<strong className="text-green-300">=&gt;</strong>で値を返し、カンマで区切ります。
            パターンマッチングと組み合わせて強力な表現ができます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch式の基本</h2>
        <p className="text-gray-400 mb-4">
          switch式は値を返す式として使えます。<code className="text-green-300">=&gt;</code>で各ケースの値を指定し、<code className="text-green-300">_</code>でデフォルトケースを表します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 従来のswitch文
  String getDayOld(int day) {
    switch (day) {
      case 1: return '月曜日';
      case 2: return '火曜日';
      case 3: return '水曜日';
      default: return '不明';
    }
  }

  // Dart 3のswitch式（より簡潔）
  String getDay(int day) => switch (day) {
    1 => '月曜日',
    2 => '火曜日',
    3 => '水曜日',
    4 => '木曜日',
    5 => '金曜日',
    6 => '土曜日',
    7 => '日曜日',
    _ => '不明',
  };

  for (int i = 1; i <= 7; i++) {
    print('\$i: \${getDay(i)}');
  }
}`}
          expectedOutput={`1: 月曜日
2: 火曜日
3: 水曜日
4: 木曜日
5: 金曜日
6: 土曜日
7: 日曜日`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチングとswitch式</h2>
        <p className="text-gray-400 mb-4">
          Dart 3のswitch式はパターンマッチングと組み合わせることで強力な表現が可能です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 範囲パターン（Dart 3）
  String classify(int n) => switch (n) {
    < 0    => '負の数',
    0      => 'ゼロ',
    1 || 2 => '小さい正の数',
    >= 100 => '大きな数',
    _      => '普通の正の数',
  };

  List<int> numbers = [-5, 0, 1, 2, 50, 100, 200];
  for (int n in numbers) {
    print('\$n: \${classify(n)}');
  }
}`}
          expectedOutput={`-5: 負の数
0: ゼロ
1: 小さい正の数
2: 小さい正の数
50: 普通の正の数
100: 大きな数
200: 大きな数`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">enumとswitch式</h2>
        <p className="text-gray-400 mb-4">
          enumとswitch式を組み合わせると、全ケースの網羅チェックが自動で行われます。
        </p>
        <DartEditor
          defaultCode={`enum Season { spring, summer, autumn, winter }

void main() {
  // switch式でenumを処理
  for (var season in Season.values) {
    String description = switch (season) {
      Season.spring => '桜が咲く暖かい季節',
      Season.summer => '海と花火の暑い季節',
      Season.autumn => '紅葉と読書の涼しい季節',
      Season.winter => '雪と温かい飲み物の季節',
    };

    String emoji = switch (season) {
      Season.spring => '🌸',
      Season.summer => '☀️',
      Season.autumn => '🍁',
      Season.winter => '❄️',
    };

    print('\$emoji \${season.name}: \$description');
  }
}`}
          expectedOutput={`🌸 spring: 桜が咲く暖かい季節
☀️ summer: 海と花火の暑い季節
🍁 autumn: 紅葉と読書の涼しい季節
❄️ winter: 雪と温かい飲み物の季節`}
        />
      </section>

      <LessonCompleteButton lessonId="switch-expression" categoryId="control" />
      <LessonNav lessons={lessons} currentId="switch-expression" basePath="/learn/control" />
    </div>
  );
}
