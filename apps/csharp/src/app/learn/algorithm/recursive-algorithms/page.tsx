import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmRecursiveAlgorithmsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰アルゴリズム</h1>
        <p className="text-gray-400">分割統治法、ハノイの塔などの再帰的アルゴリズムを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰の基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          再帰はメソッドが自分自身を呼び出すテクニックです。<strong className="text-white">基底ケース</strong>（終了条件）と<strong className="text-white">再帰ケース</strong>（自己呼び出し）の2つで構成されます。基底ケースがないと無限再帰になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階乗とフィボナッチ</h2>
        <p className="text-gray-400 mb-4">再帰の基本的な例です。</p>
        <CSharpEditor
          defaultCode={`// 再帰の基本例

// 階乗: n! = n × (n-1)!
long Factorial(int n)
{
    if (n <= 1) return 1;           // 基底ケース
    return n * Factorial(n - 1);    // 再帰ケース
}

// フィボナッチ数列（素朴な再帰 - O(2^n) で遅い）
int FibNaive(int n)
{
    if (n <= 1) return n;           // 基底ケース
    return FibNaive(n - 1) + FibNaive(n - 2); // 再帰ケース
}

// フィボナッチ（メモ化で改善 - O(n)）
int FibMemo(int n, Dictionary<int, int>? memo = null)
{
    memo ??= new Dictionary<int, int>();
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];
    memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
    return memo[n];
}

// 階乗
Console.WriteLine("階乗:");
for (int i = 0; i <= 10; i++)
    Console.Write($"{i}!={Factorial(i)}  ");
Console.WriteLine();

// フィボナッチ
Console.WriteLine("\nフィボナッチ数列:");
for (int i = 0; i <= 10; i++)
    Console.Write($"F({i})={FibMemo(i)}  ");
Console.WriteLine();

// 呼び出しのトレース
Console.WriteLine("\nFactorial(4) の呼び出し:");
Console.WriteLine("Factorial(4)");
Console.WriteLine("  = 4 × Factorial(3)");
Console.WriteLine("  = 4 × 3 × Factorial(2)");
Console.WriteLine("  = 4 × 3 × 2 × Factorial(1)");
Console.WriteLine("  = 4 × 3 × 2 × 1 = 24");`}
          expectedOutput={`階乗:
0!=1  1!=1  2!=2  3!=6  4!=24  5!=120  6!=720  7!=5040  8!=40320  9!=362880  10!=3628800

フィボナッチ数列:
F(0)=0  F(1)=1  F(2)=1  F(3)=2  F(4)=3  F(5)=5  F(6)=8  F(7)=13  F(8)=21  F(9)=34  F(10)=55

Factorial(4) の呼び出し:
Factorial(4)
  = 4 × Factorial(3)
  = 4 × 3 × Factorial(2)
  = 4 × 3 × 2 × Factorial(1)
  = 4 × 3 × 2 × 1 = 24`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハノイの塔</h2>
        <p className="text-gray-400 mb-4">再帰的思考の古典的な問題です。</p>
        <CSharpEditor
          defaultCode={`// ハノイの塔: n枚の円盤を柱Aから柱Cに移動する
// 制約: 大きい円盤の上に小さい円盤しか置けない

int moveCount = 0;

void HanoiTower(int n, char from, char to, char via)
{
    if (n == 1)
    {
        Console.WriteLine($"  円盤1: {from} -> {to}");
        moveCount++;
        return;
    }
    HanoiTower(n - 1, from, via, to);   // n-1枚を経由柱へ
    Console.WriteLine($"  円盤{n}: {from} -> {to}");
    moveCount++;
    HanoiTower(n - 1, via, to, from);   // n-1枚を目的柱へ
}

Console.WriteLine("ハノイの塔（3枚）:");
HanoiTower(3, 'A', 'C', 'B');
Console.WriteLine($"移動回数: {moveCount} (2^3 - 1 = 7)");

// n枚に必要な移動回数は 2^n - 1
Console.WriteLine();
Console.WriteLine("n枚に必要な最小移動回数: 2^n - 1");
for (int i = 1; i <= 8; i++)
{
    long moves = (long)Math.Pow(2, i) - 1;
    Console.WriteLine($"  {i,2}枚: {moves,5}回");
}`}
          expectedOutput={`ハノイの塔（3枚）:
  円盤1: A -> C
  円盤2: A -> B
  円盤1: C -> B
  円盤3: A -> C
  円盤1: B -> A
  円盤2: B -> C
  円盤1: A -> C
移動回数: 7 (2^3 - 1 = 7)

n枚に必要な最小移動回数: 2^n - 1
   1枚:     1回
   2枚:     3回
   3枚:     7回
   4枚:    15回
   5枚:    31回
   6枚:    63回
   7枚:   127回
   8枚:   255回`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithm" lessonId="recursive-algorithms" />
      </div>
      <LessonNav lessons={lessons} currentId="recursive-algorithms" basePath="/learn/algorithm" />
    </div>
  );
}
