import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">論理型</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-blue-300">bool</strong>型は<strong className="text-blue-300">true</strong>か<strong className="text-blue-300">false</strong>の2値を持ちます。
            論理演算子（<strong className="text-blue-300">&amp;&amp;</strong>、<strong className="text-blue-300">||</strong>、<strong className="text-blue-300">!</strong>）を使って複合条件を作れます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">bool型の基本</h2>
        <p className="text-gray-400 mb-4">
          Dartのbool型は厳密で、他の型を自動変換しません。0やnullはfalseとして扱われません。
        </p>
        <DartEditor
          defaultCode={`void main() {
  bool isActive = true;
  bool isDone = false;

  print('isActive: \$isActive');
  print('isDone: \$isDone');
  print('型: \${isActive.runtimeType}');

  // 比較演算子はboolを返す
  int x = 10;
  print('x > 5: \${x > 5}');
  print('x < 5: \${x < 5}');
  print('x == 10: \${x == 10}');
  print('x != 10: \${x != 10}');
  print('x >= 10: \${x >= 10}');
  print('x <= 10: \${x <= 10}');
}`}
          expectedOutput={`isActive: true
isDone: false
型: bool
x > 5: true
x < 5: false
x == 10: true
x != 10: false
x >= 10: true
x <= 10: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">&amp;&amp;</code>（AND）、<code className="text-blue-300">||</code>（OR）、<code className="text-blue-300">!</code>（NOT）を使って複合条件を作ります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  bool a = true;
  bool b = false;

  // AND（&&）: 両方trueのときtrue
  print('true && true: \${true && true}');
  print('true && false: \${a && b}');

  // OR（||）: どちらかtrueのときtrue
  print('true || false: \${a || b}');
  print('false || false: \${false || false}');

  // NOT（!）: 反転
  print('!true: \${!a}');
  print('!false: \${!b}');

  // 短絡評価（ショートサーキット）
  int x = 5;
  if (x > 0 && x < 10) {
    print('\$xは1〜9の範囲');
  }

  // 複合条件
  bool isAdult = true;
  bool hasTicket = true;
  bool canEnter = isAdult && hasTicket;
  print('入場可能: \$canEnter');
}`}
          expectedOutput={`true && true: true
true && false: false
true || false: true
false || false: false
!true: false
!false: true
5は1〜9の範囲
入場可能: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">条件式での bool</h2>
        <p className="text-gray-400 mb-4">
          if文や三項演算子でboolを使う実践的な例を見てみましょう。
        </p>
        <DartEditor
          defaultCode={`void main() {
  List<int> scores = [85, 92, 60, 78, 45];

  for (int score in scores) {
    bool isPassing = score >= 70;
    bool isExcellent = score >= 90;

    String result = isExcellent
        ? '優秀'
        : isPassing
            ? '合格'
            : '不合格';

    print('スコア \$score: \$result');
  }

  // bool メソッド
  String text = '';
  print('空文字: \${text.isEmpty}');
  print('空でない: \${text.isNotEmpty}');

  List<int> list = [];
  print('リスト空: \${list.isEmpty}');
}`}
          expectedOutput={`スコア 85: 合格
スコア 92: 優秀
スコア 60: 不合格
スコア 78: 合格
スコア 45: 不合格
空文字: true
空でない: false
リスト空: true`}
        />
      </section>

      <LessonCompleteButton lessonId="boolean" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}
