import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">constとreadonlyの違いと、それぞれの使いどころを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">const — コンパイル時定数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> キーワードで宣言した定数は
          <strong className="text-white">コンパイル時</strong>に値が確定します。宣言と同時に初期化が必要で、
          その後は変更できません。数値・文字列・bool型など基本型に使えます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> は暗黙的に
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">static</code> です。インスタンスに依存しません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const の使い方</h2>
        <p className="text-gray-400 mb-4">数学定数や設定値などに使います。</p>
        <CSharpEditor
          defaultCode={`// const: コンパイル時定数
const double Pi = 3.14159265358979;
const int MaxRetryCount = 3;
const string AppName = "C#学習アプリ";
const bool EnableLogging = true;

Console.WriteLine($"円周率: {Pi}");
Console.WriteLine($"最大リトライ数: {MaxRetryCount}");
Console.WriteLine($"アプリ名: {AppName}");
Console.WriteLine($"ログ有効: {EnableLogging}");

// constを使った計算
double radius = 5.0;
double area = Pi * radius * radius;
Console.WriteLine($"半径{radius}の円の面積: {area:F2}");`}
          expectedOutput={`円周率: 3.14159265358979
最大リトライ数: 3
アプリ名: C#学習アプリ
ログ有効: True
半径5の円の面積: 78.54`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">readonly — 実行時定数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">readonly</code> は
          <strong className="text-white">実行時</strong>に値が確定します。コンストラクタで初期化でき、
          new式などの実行時の値も使えます。クラスのフィールドに使います。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-purple-400 font-semibold mb-2">const を使う場面</p>
            <ul className="text-gray-300 space-y-1">
              <li>数学定数（Pi、Eなど）</li>
              <li>設定の上限値・下限値</li>
              <li>固定の文字列定数</li>
              <li>複数ファイルで共有する定数</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-purple-400 font-semibold mb-2">readonly を使う場面</p>
            <ul className="text-gray-300 space-y-1">
              <li>コンストラクタで初期化する値</li>
              <li>実行時に決まるオブジェクト</li>
              <li>依存性注入で受け取る値</li>
              <li>配列・コレクションの参照</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">readonly の使い方</h2>
        <p className="text-gray-400 mb-4">readonlyはクラスのフィールドとして使い、コンストラクタで初期化できます。</p>
        <CSharpEditor
          defaultCode={`using System;

class Config
{
    // readonly フィールド
    public readonly string DatabaseName;
    public readonly DateTime CreatedAt;
    public readonly int[] AllowedPorts;

    public Config(string dbName)
    {
        DatabaseName = dbName;
        CreatedAt = DateTime.Now;
        AllowedPorts = new[] { 80, 443, 8080 };
    }
}

class Program
{
    static void Main()
    {
        var config = new Config("myapp_db");
        Console.WriteLine($"DB名: {config.DatabaseName}");
        Console.WriteLine($"作成日時: {config.CreatedAt:HH:mm:ss}");
        Console.WriteLine($"ポート: {string.Join(", ", config.AllowedPorts)}");
    }
}`}
          expectedOutput={`DB名: myapp_db
作成日時: 12:00:00
ポート: 80, 443, 8080`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
