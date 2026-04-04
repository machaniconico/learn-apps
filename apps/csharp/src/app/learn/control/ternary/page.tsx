import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function TernaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">三項演算子</h1>
        <p className="text-gray-400">条件 ? 真の値 : 偽の値 の簡潔な分岐を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          三項演算子（条件演算子）は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">?:</code> を使った
          簡潔な条件分岐です。if-elseの短縮版として使えます。
        </p>
        <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm mb-4">
          <span className="text-yellow-400">条件</span>
          <span className="text-blue-400"> ? </span>
          <span className="text-green-400">真の場合の値</span>
          <span className="text-blue-400"> : </span>
          <span className="text-red-400">偽の場合の値</span>
        </div>
        <p className="text-gray-300 leading-relaxed">
          三項演算子は<strong className="text-white">式</strong>であり、値を返します。
          変数への代入やメソッドの引数として直接使えます。
          シンプルな条件分岐に向いていますが、複雑な条件にはif-elseを使いましょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子の基本</h2>
        <p className="text-gray-400 mb-4">if-elseと三項演算子を比較しましょう。</p>
        <CSharpEditor
          defaultCode={`int age = 20;

// if-else版
string status1;
if (age >= 18)
    status1 = "成人";
else
    status1 = "未成年";
Console.WriteLine(status1);

// 三項演算子版（1行）
string status2 = age >= 18 ? "成人" : "未成年";
Console.WriteLine(status2);

// メソッド引数に直接使う
Console.WriteLine($"年齢 {age} は{(age >= 18 ? "成人" : "未成年")}です");

// 数値の場合
int score = 85;
int bonus = score >= 90 ? 100 : 0;
Console.WriteLine($"ボーナス: {bonus}円");

// 絶対値（Mathを使わない方法）
int number = -42;
int abs = number >= 0 ? number : -number;
Console.WriteLine($"|{number}| = {abs}");`}
          expectedOutput={`成人
成人
年齢 20 は成人です
ボーナス: 0円
|-42| = 42`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使い方のポイント</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-green-400 font-semibold mb-2">適切な使い方</p>
            <ul className="text-gray-300 space-y-1.5">
              <li>単純な二択の値の選択</li>
              <li>文字列補間内での簡単な条件</li>
              <li>デフォルト値の設定</li>
              <li>nullチェック（<code className="text-blue-400">?? と組み合わせ</code>）</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-red-400 font-semibold mb-2">避けるべき使い方</p>
            <ul className="text-gray-300 space-y-1.5">
              <li>複雑な条件（可読性が下がる）</li>
              <li>3段以上のネスト</li>
              <li>副作用のある式（処理を入れない）</li>
              <li>1行が長くなりすぎる場合</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的な三項演算子の例</h2>
        <p className="text-gray-400 mb-4">三項演算子が活躍する典型的なパターンです。</p>
        <CSharpEditor
          defaultCode={`// 表示のフォーマット
int count = 3;
string countMsg = $"{count}件の{(count == 1 ? "アイテム" : "アイテム")}";
Console.WriteLine(countMsg);

// null チェックと組み合わせ
string? userName = null;
string display = userName != null ? $"こんにちは、{userName}さん" : "ゲストさん";
Console.WriteLine(display);

userName = "田中";
display = userName != null ? $"こんにちは、{userName}さん" : "ゲストさん";
Console.WriteLine(display);

// 複数の三項演算子（適度なら可）
int temp = 22;
string weather = temp >= 30 ? "暑い" : temp >= 20 ? "快適" : temp >= 10 ? "涼しい" : "寒い";
Console.WriteLine($"{temp}度は{weather}");

// 三項演算子で最大値
int a = 42, b = 17;
int max = a > b ? a : b;
Console.WriteLine($"max({a}, {b}) = {max}");`}
          expectedOutput={`3件のアイテム
ゲストさん
こんにちは、田中さん
22度は快適
max(42, 17) = 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ternary" />
      </div>
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
