import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">if-else文</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">if-else</strong>文は最も基本的な条件分岐です。
            条件式がtrueのときifブロックが、falseのときelseブロックが実行されます。
            Dartではif文の条件式は必ずbool型でなければなりません。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な if-else</h2>
        <p className="text-gray-400 mb-4">
          条件式がtrueなら<code className="text-green-300">if</code>ブロック、falseなら<code className="text-green-300">else</code>ブロックが実行されます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  int temperature = 28;

  if (temperature >= 30) {
    print('今日は暑い日です');
  } else {
    print('今日は涼しい日です');
  }

  // 波括弧を省略（1行の場合）
  int score = 85;
  if (score >= 60) print('合格');
  else print('不合格');

  // bool変数を直接使用
  bool isRaining = true;
  if (isRaining) {
    print('傘を持って行きましょう');
  } else {
    print('傘は不要です');
  }
}`}
          expectedOutput={`今日は涼しい日です
合格
傘を持って行きましょう`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数条件の組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">&amp;&amp;</code>（AND）と<code className="text-green-300">||</code>（OR）で複数の条件を組み合わせます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  int age = 20;
  bool hasID = true;

  // AND条件
  if (age >= 18 && hasID) {
    print('入場できます');
  } else {
    print('入場できません');
  }

  // OR条件
  bool isWeekend = false;
  bool isHoliday = true;

  if (isWeekend || isHoliday) {
    print('今日はお休みです');
  } else {
    print('今日は平日です');
  }

  // NOT条件
  bool isLoggedIn = false;
  if (!isLoggedIn) {
    print('ログインが必要です');
  }
}`}
          expectedOutput={`入場できます
今日はお休みです
ログインが必要です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">if 文のネスト</h2>
        <p className="text-gray-400 mb-4">
          if文の中にさらにif文を書くことができます。ただし深いネストはコードが読みにくくなるので注意しましょう。
        </p>
        <DartEditor
          defaultCode={`void classifyNumber(int n) {
  if (n > 0) {
    if (n % 2 == 0) {
      print('\$n は正の偶数');
    } else {
      print('\$n は正の奇数');
    }
  } else if (n < 0) {
    print('\$n は負の数');
  } else {
    print('ゼロ');
  }
}

void main() {
  classifyNumber(4);
  classifyNumber(7);
  classifyNumber(-3);
  classifyNumber(0);
}`}
          expectedOutput={`4 は正の偶数
7 は正の奇数
-3 は負の数
ゼロ`}
        />
      </section>

      <LessonCompleteButton lessonId="if-else" categoryId="control" />
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
