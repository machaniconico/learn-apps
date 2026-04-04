import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysSpanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Span{"<T>"}</h1>
        <p className="text-gray-400">メモリ効率の良い Span 型によるスライス操作と stackalloc を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Span{"<T>"} とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-400">Span{"<T>"}</code> は C# 7.2 で導入された
          <strong className="text-white">連続したメモリ領域を参照する型</strong>です。
          配列のサブセット（スライス）を新しい配列にコピーすることなく参照できるため、
          メモリ割り当てを減らしパフォーマンスを向上させます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "ヒープ割り当てなし", desc: "既存メモリを参照するだけでコピーが発生しない" },
            { title: "配列・文字列に対応", desc: "配列、string、stackalloc メモリを参照できる" },
            { title: "スタック限定", desc: "ref struct のため、ヒープには格納できない" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800 rounded-lg p-4">
              <p className="text-orange-400 font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Span{"<T>"} の基本的な使い方</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        int[] arr = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

        // 配列全体の Span
        Span<int> fullSpan = arr;
        Console.WriteLine($"Span の長さ: {fullSpan.Length}");

        // スライス（コピーなし！）
        Span<int> slice = arr.AsSpan(2, 5);  // インデックス2から5要素
        Console.Write("スライス [2..7]: ");
        foreach (int n in slice) Console.Write($"{n} ");
        Console.WriteLine();

        // スライスの変更は元の配列に反映される
        slice[0] = 99;
        Console.WriteLine($"arr[2] = {arr[2]}");  // 99 に変わる

        // 範囲演算子との組み合わせ
        Span<int> middle = arr.AsSpan()[3..7];
        Console.Write("中間 [3..7]: ");
        foreach (int n in middle) Console.Write($"{n} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`Span の長さ: 10
スライス [2..7]: 2 3 4 5 6
arr[2] = 99
中間 [3..7]: 3 4 5 6 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stackalloc と Span{"<T>"}</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static unsafe void Main()
    {
        // stackalloc でスタックにメモリを確保
        // ヒープ割り当てを完全に回避できる
        Span<int> stackData = stackalloc int[5];

        for (int i = 0; i < stackData.Length; i++)
            stackData[i] = (i + 1) * (i + 1);  // 二乗値を格納

        Console.Write("スタック上のデータ: ");
        foreach (int n in stackData) Console.Write($"{n} ");
        Console.WriteLine();

        // ReadOnlySpan<char> で文字列を効率的に扱う
        ReadOnlySpan<char> text = "Hello, C#!".AsSpan();
        ReadOnlySpan<char> substr = text.Slice(7, 2);  // "C#"
        Console.WriteLine($"部分文字列: {substr.ToString()}");

        // Contains, StartsWith なども使用可能
        Console.WriteLine($"'C#' を含む: {text.Contains("C#", StringComparison.Ordinal)}");
    }
}`}
          expectedOutput={`スタック上のデータ: 1 4 9 16 25
部分文字列: C#
'C#' を含む: True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="span" />
      </div>
      <LessonNav lessons={lessons} currentId="span" basePath="/learn/arrays" />
    </div>
  );
}
