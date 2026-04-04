import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function EnumsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">列挙型</h1>
        <p className="text-gray-400">enum の定義と利用、フラグ列挙型（[Flags]）、パース・ToString による変換</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">enum とは</h2>
        <p className="text-gray-400 mb-3">
          <code className="text-green-400">enum</code>（列挙型）は名前付き定数の集合です。
          マジックナンバーをなくし、コードの可読性と型安全性を向上させます。
        </p>
        <p className="text-gray-400">
          デフォルトでは int をベースとし、0 から始まる整数値が自動的に割り当てられます。
          値を明示的に指定することも可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基本的な enum の使い方</h2>
        <p className="text-gray-400 mb-4">
          enum は switch 文と組み合わせることが多いです。
          <code className="text-green-400">ToString()</code> で名前を取得し、<code className="text-green-400">Enum.Parse()</code> で文字列から変換できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

enum Season
{
    Spring = 1,
    Summer = 2,
    Autumn = 3,
    Winter = 4
}

class Program
{
    static string GetMessage(Season season)
    {
        return season switch
        {
            Season.Spring => "桜が咲く季節",
            Season.Summer => "海水浴の季節",
            Season.Autumn => "紅葉の季節",
            Season.Winter => "雪の季節",
            _ => "不明な季節"
        };
    }

    static void Main()
    {
        Season current = Season.Spring;
        Console.WriteLine($"現在: {current}");
        Console.WriteLine($"値: {(int)current}");
        Console.WriteLine(GetMessage(current));

        // 文字列からパース
        Season parsed = Enum.Parse<Season>("Summer");
        Console.WriteLine($"パース結果: {parsed}");
    }
}`}
          expectedOutput={`現在: Spring
値: 1
桜が咲く季節
パース結果: Summer`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">[Flags] 列挙型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400">[Flags]</code> 属性を付けるとビット演算で複数の値を組み合わせられます。
          各値は 2 の累乗（1, 2, 4, 8, ...）で定義し、<code className="text-green-400">|</code> で結合、<code className="text-green-400">HasFlag()</code> で確認します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

[Flags]
enum Permission
{
    None = 0,
    Read = 1,
    Write = 2,
    Delete = 4,
    Admin = Read | Write | Delete  // 複合値
}

class Program
{
    static void Main()
    {
        Permission userPerm = Permission.Read | Permission.Write;
        Console.WriteLine($"権限: {userPerm}");

        // 権限チェック
        Console.WriteLine($"読み取り: {userPerm.HasFlag(Permission.Read)}");
        Console.WriteLine($"削除: {userPerm.HasFlag(Permission.Delete)}");

        // 権限追加
        userPerm |= Permission.Delete;
        Console.WriteLine($"削除追加後: {userPerm}");

        // 権限削除
        userPerm &= ~Permission.Write;
        Console.WriteLine($"書き込み削除後: {userPerm}");
    }
}`}
          expectedOutput={`権限: Read, Write
読み取り: True
削除: False
削除追加後: Read, Write, Delete
書き込み削除後: Read, Delete`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="enums" />
      </div>
      <LessonNav lessons={lessons} currentId="enums" basePath="/learn/classes" />
    </div>
  );
}
