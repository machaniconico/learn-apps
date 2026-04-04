import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">bool型とtrue/false、ブール式の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">bool型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">bool</code> 型は
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code>（真）または
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code>（偽）の2値のみを持ちます。
          条件分岐・ループの条件式などに広く使われます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C#ではほかの言語と異なり、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">0</code> や
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">null</code> をboolとして直接使えません。
          明示的に比較式を書く必要があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">bool型の基本</h2>
        <p className="text-gray-400 mb-4">比較演算子はすべてbool値を返します。</p>
        <CSharpEditor
          defaultCode={`bool isRaining = true;
bool isSunny = false;

Console.WriteLine($"雨が降っている: {isRaining}");
Console.WriteLine($"晴れている: {isSunny}");

// 比較演算子はboolを返す
int age = 20;
bool isAdult = age >= 18;
bool isTeenager = age >= 13 && age <= 19;

Console.WriteLine($"成人: {isAdult}");
Console.WriteLine($"10代: {isTeenager}");

// 等値比較
string status = "active";
bool isActive = status == "active";
Console.WriteLine($"アクティブ: {isActive}");`}
          expectedOutput={`雨が降っている: True
晴れている: False
成人: True
10代: False
アクティブ: True`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          bool値を組み合わせる論理演算子があります。
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3 p-2 bg-gray-900 rounded">
            <code className="text-purple-400 w-12">&&</code>
            <span className="text-gray-300">AND — 両方がtrueのときtrue（短絡評価あり）</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-gray-900 rounded">
            <code className="text-purple-400 w-12">||</code>
            <span className="text-gray-300">OR — どちらかがtrueのときtrue（短絡評価あり）</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-gray-900 rounded">
            <code className="text-purple-400 w-12">!</code>
            <span className="text-gray-300">NOT — 反転（trueはfalse、falseはtrue）</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-gray-900 rounded">
            <code className="text-purple-400 w-12">^</code>
            <span className="text-gray-300">XOR — 排他的OR（値が異なるときtrue）</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子の組み合わせ</h2>
        <p className="text-gray-400 mb-4">複雑な条件を論理演算子で表現しましょう。</p>
        <CSharpEditor
          defaultCode={`bool hasTicket = true;
bool isVIP = false;
bool isMember = true;

// AND: 両方の条件が必要
bool canEnterVIP = hasTicket && isVIP;
Console.WriteLine($"VIP入場可: {canEnterVIP}");

// OR: どちらかの条件でOK
bool canEnter = hasTicket || isMember;
Console.WriteLine($"入場可: {canEnter}");

// NOT: 条件を反転
bool isGuest = !isMember;
Console.WriteLine($"ゲスト: {isGuest}");

// 複合条件
int score = 75;
bool isPassing = score >= 60 && score < 100;
bool isExcellent = score >= 90;
bool isFailing = !(score >= 60);

Console.WriteLine($"合格: {isPassing}");
Console.WriteLine($"優秀: {isExcellent}");
Console.WriteLine($"不合格: {isFailing}");`}
          expectedOutput={`VIP入場可: False
入場可: True
ゲスト: False
合格: True
優秀: False
不合格: False`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}
