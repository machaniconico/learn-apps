import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else if</h1>
        <p className="text-gray-400">複数条件を順番にチェックするelse ifチェーンのベストプラクティスを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else if チェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else if</code> を使うと、
          複数の条件を上から順番にチェックできます。最初に <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> になった
          ブロックだけが実行され、残りはスキップされます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          条件は上から評価されるため、<strong className="text-white">より具体的な条件を上に書く</strong>のがポイントです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績判定の例</h2>
        <p className="text-gray-400 mb-4">スコアに応じてABCDの成績を判定します。</p>
        <CSharpEditor
          defaultCode={`int score = 82;

// else if チェーン
string grade;
if (score >= 90)
{
    grade = "A（優秀）";
}
else if (score >= 80)
{
    grade = "B（良好）";
}
else if (score >= 70)
{
    grade = "C（普通）";
}
else if (score >= 60)
{
    grade = "D（要努力）";
}
else
{
    grade = "F（不合格）";
}

Console.WriteLine($"スコア {score}: {grade}");

// 別のスコアでテスト
int[] testScores = { 95, 75, 55, 100 };
foreach (int s in testScores)
{
    string g = s >= 90 ? "A" : s >= 80 ? "B" : s >= 70 ? "C" : s >= 60 ? "D" : "F";
    Console.WriteLine($"{s}点 -> {g}");
}`}
          expectedOutput={`スコア 82: B（良好）
95点 -> A
75点 -> C
55点 -> F
100点 -> A`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ベストプラクティス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          else if を使う際のポイントをまとめます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>最も具体的・厳しい条件を上に書く（例：90以上 → 80以上の順）</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>必ず最後に <code className="text-blue-400 bg-gray-800 px-1 rounded">else</code> でデフォルト処理を書く</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>条件が4つ以上になったら switch文の使用を検討する</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>早期リターン（Guard clause）でネストを浅くする</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">早期リターンでコードをシンプルに</h2>
        <p className="text-gray-400 mb-4">Guard clauseパターンはネストを避けて読みやすいコードになります。</p>
        <CSharpEditor
          defaultCode={`// 早期リターン（Guard clause）パターン
static string GetUserStatus(int age, bool isLoggedIn, bool isPremium)
{
    // 異常系・エラーケースを先に処理
    if (age < 0) return "無効な年齢";
    if (!isLoggedIn) return "ログインしてください";

    // 正常系の処理
    if (isPremium)
    {
        return "プレミアム会員";
    }
    else if (age >= 18)
    {
        return "一般会員";
    }
    else
    {
        return "ジュニア会員";
    }
}

Console.WriteLine(GetUserStatus(25, true, true));
Console.WriteLine(GetUserStatus(15, true, false));
Console.WriteLine(GetUserStatus(30, false, false));
Console.WriteLine(GetUserStatus(-1, true, false));`}
          expectedOutput={`プレミアム会員
ジュニア会員
ログインしてください
無効な年齢`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
