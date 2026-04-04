import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NullablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Nullable型</h1>
        <p className="text-gray-400">int?、null合体演算子(??)、null条件演算子(?.)を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Nullable値型（T?）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の値型（int、bool、doubleなど）は <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">null</code> を持てません。
          型名の後に <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">?</code> をつけると、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">null</code> も保持できるようになります。
          これは <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Nullable&lt;T&gt;</code> の省略記法です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          データベースの値やオプションの入力など、「値がない」状態を表現するときに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Nullable型の基本操作</h2>
        <p className="text-gray-400 mb-4">HasValueとValueプロパティでnullチェックができます。</p>
        <CSharpEditor
          defaultCode={`int? age = null;
int? score = 85;

// HasValue でnullチェック
Console.WriteLine($"age has value: {age.HasValue}");
Console.WriteLine($"score has value: {score.HasValue}");

// 値を取得（nullの場合は例外）
if (score.HasValue)
{
    Console.WriteLine($"スコア: {score.Value}");
}

// null許容のメリット：「未入力」を表現
int? optionalInput = null;
Console.WriteLine(optionalInput.HasValue ? $"入力値: {optionalInput}" : "未入力");

optionalInput = 42;
Console.WriteLine(optionalInput.HasValue ? $"入力値: {optionalInput}" : "未入力");`}
          expectedOutput={`age has value: False
score has value: True
スコア: 85
未入力
入力値: 42`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">null演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C#にはnullを安全に扱うための演算子が3つあります。
        </p>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg">
            <code className="text-purple-400 font-mono">a ?? b</code>
            <span className="text-gray-300 ml-3">— null合体演算子：aがnullならbを返す</span>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <code className="text-purple-400 font-mono">a?.Member</code>
            <span className="text-gray-300 ml-3">— null条件演算子：aがnullなら全体がnull</span>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <code className="text-purple-400 font-mono">a ??= b</code>
            <span className="text-gray-300 ml-3">— null合体代入演算子：aがnullならbを代入</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">null演算子の使い方</h2>
        <p className="text-gray-400 mb-4">実用的なnull安全コードを書いてみましょう。</p>
        <CSharpEditor
          defaultCode={`// null合体演算子 ??
string? userName = null;
string displayName = userName ?? "ゲスト";
Console.WriteLine($"表示名: {displayName}");

// null条件演算子 ?.
string? text = null;
int? length = text?.Length;
Console.WriteLine($"長さ: {length?.ToString() ?? "null"}");

text = "Hello";
length = text?.Length;
Console.WriteLine($"長さ: {length}");

// チェーン
string? firstName = null;
string? result = firstName?.ToUpper()?.Trim();
Console.WriteLine($"結果: {result ?? "nullです"}");

// null合体代入 ??=
string? config = null;
config ??= "default-value";
Console.WriteLine($"設定: {config}");`}
          expectedOutput={`表示名: ゲスト
長さ: null
長さ: 5
結果: nullです
設定: default-value`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="nullable" />
      </div>
      <LessonNav lessons={lessons} currentId="nullable" basePath="/learn/basics" />
    </div>
  );
}
