import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dotnet");

export default function DotnetLatestFeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">.NETエコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">最新機能</h1>
        <p className="text-gray-400">トップレベルステートメント、グローバルusing、ファイルスコープnamespace、プライマリコンストラクタを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モダンC#の機能</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# 9〜12にかけて多くの便利な機能が追加されました。これらを活用することでより簡潔で読みやすいコードが書けます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トップレベルステートメントとグローバルusing</h2>
        <p className="text-gray-400 mb-4">C# 9・10で導入されたボイラープレート削減機能です。</p>
        <CSharpEditor
          defaultCode={`// C# 9: トップレベルステートメント
// class Program と static void Main が不要に!

// C# 10: グローバルusing
// プロジェクト全体でusingを共有
// GlobalUsings.cs に記述:
// global using System;
// global using System.Collections.Generic;
// global using System.Linq;
// -> 各ファイルでのusingが不要に

// 従来の書き方 (C# 8以前)
Console.WriteLine("=== 従来の書き方 ===");
Console.WriteLine("using System;");
Console.WriteLine("using System.Collections.Generic;");
Console.WriteLine();
Console.WriteLine("class Program");
Console.WriteLine("{");
Console.WriteLine("    static void Main(string[] args)");
Console.WriteLine("    {");
Console.WriteLine("        Console.WriteLine(\"Hello!\");");
Console.WriteLine("    }");
Console.WriteLine("}");

Console.WriteLine();
Console.WriteLine("=== C# 9以降の書き方 ===");
Console.WriteLine("// (using不要: ImplicitUsings = enable の場合)");
Console.WriteLine("Console.WriteLine(\"Hello!\");");

Console.WriteLine();
Console.WriteLine("-> コードが大幅にシンプルになった!");`}
          expectedOutput={`=== 従来の書き方 ===
using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello!");
    }
}

=== C# 9以降の書き方 ===
// (using不要: ImplicitUsings = enable の場合)
Console.WriteLine("Hello!");

-> コードが大幅にシンプルになった!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プライマリコンストラクタとファイルスコープnamespace</h2>
        <p className="text-gray-400 mb-4">C# 12・10で導入されたコード簡略化機能です。</p>
        <CSharpEditor
          defaultCode={`// C# 10: ファイルスコープのnamespace宣言
// 従来: namespace MyApp { ... }（ネスト増加）
// 新式: namespace MyApp;（ファイル全体が対象）

namespace MyApp; // セミコロンで終わる = インデントが1段減る

// C# 12: プライマリコンストラクタ
// 従来のクラス
public class PersonOld
{
    private readonly string _name;
    private readonly int _age;

    public PersonOld(string name, int age)
    {
        _name = name;
        _age = age;
    }

    public string GetInfo() => $"{_name} ({_age}歳)";
}

// C# 12: プライマリコンストラクタ（大幅に簡潔）
public class Person(string name, int age)
{
    public string GetInfo() => $"{name} ({age}歳)";
}

// 使用例
var old = new PersonOld("田中太郎", 30);
var modern = new Person("鈴木花子", 25);

Console.WriteLine(old.GetInfo());
Console.WriteLine(modern.GetInfo());

Console.WriteLine();

// C# 8: using 宣言（ブロックなし）
Console.WriteLine("// C# 8: using 宣言");
Console.WriteLine("using var stream = new MemoryStream();");
Console.WriteLine("// メソッドの終わりで自動 Dispose");
Console.WriteLine("// usingブロックのインデントが不要");

// record 型（C# 9）
Console.WriteLine();
Console.WriteLine("// C# 9: record型（イミュータブルなデータクラス）");
record Point(double X, double Y);
var p1 = new Point(3.0, 4.0);
var p2 = p1 with { Y = 10.0 }; // with式でコピー
Console.WriteLine($"p1 = {p1}");
Console.WriteLine($"p2 = {p2}");
Console.WriteLine($"p1 == p2: {p1 == p2}");`}
          expectedOutput={`田中太郎 (30歳)
鈴木花子 (25歳)

// C# 8: using 宣言
using var stream = new MemoryStream();
// メソッドの終わりで自動 Dispose
// usingブロックのインデントが不要

// C# 9: record型（イミュータブルなデータクラス）
p1 = Point { X = 3, Y = 4 }
p2 = Point { X = 3, Y = 10 }
p1 == p2: False`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="dotnet" lessonId="latest-features" />
      </div>
      <LessonNav lessons={lessons} currentId="latest-features" basePath="/learn/dotnet" />
    </div>
  );
}
