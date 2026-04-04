import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsDictionaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">コレクション レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Dictionary{"<TKey,TValue>"}</h1>
        <p className="text-gray-400">キーと値のペア、Add・TryGetValue・ContainsKey、反復処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Dictionary とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-400">Dictionary{"<TKey, TValue>"}</code> は
          キーと値のペアを格納するハッシュテーブルベースのコレクションです。
          キーによるアクセスは O(1) と非常に高速です。キーは一意（重複不可）である必要があります。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { method: "Add(key, val)", desc: "追加（キー重複で例外）" },
            { method: "dict[key] = val", desc: "追加または上書き" },
            { method: "TryGetValue(key, out v)", desc: "安全な取得" },
            { method: "ContainsKey(key)", desc: "キー存在確認" },
            { method: "Remove(key)", desc: "削除" },
            { method: "Keys / Values", desc: "キー/値のコレクション" },
          ].map((item) => (
            <div key={item.method} className="bg-gray-800 rounded-lg p-3">
              <code className="text-yellow-400 text-xs font-mono block mb-1">{item.method}</code>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Dictionary の基本操作</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 作成と初期化
        var scores = new Dictionary<string, int>
        {
            ["田中"] = 85,
            ["鈴木"] = 92,
            ["佐藤"] = 78,
        };

        // 追加
        scores.Add("山田", 88);
        scores["伊藤"] = 95;  // 同じキーがあれば上書き

        // 取得
        Console.WriteLine($"田中: {scores["田中"]}");

        // 安全な取得
        if (scores.TryGetValue("鈴木", out int suzukiScore))
            Console.WriteLine($"鈴木: {suzukiScore}");

        // 存在確認
        Console.WriteLine($"山田あり? {scores.ContainsKey("山田")}");
        Console.WriteLine($"木村あり? {scores.ContainsKey("木村")}");

        // 削除
        scores.Remove("佐藤");

        // 全要素の反復
        Console.WriteLine("\n全スコア:");
        foreach (KeyValuePair<string, int> kv in scores)
            Console.WriteLine($"  {kv.Key}: {kv.Value}点");

        Console.WriteLine($"\n合計: {scores.Count}人");
    }
}`}
          expectedOutput={`田中: 85
鈴木: 92
山田あり? True
木村あり? False

全スコア:
  田中: 85点
  鈴木: 92点
  山田: 88点
  伊藤: 95点

合計: 4人`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Dictionary の実用パターン</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 単語の出現回数カウント
        string[] words = { "apple", "banana", "apple", "cherry", "banana", "apple" };
        var count = new Dictionary<string, int>();

        foreach (string word in words)
        {
            if (count.ContainsKey(word))
                count[word]++;
            else
                count[word] = 1;
            // または: count[word] = count.GetValueOrDefault(word, 0) + 1;
        }

        Console.WriteLine("単語の出現回数:");
        foreach (var (word, n) in count)
            Console.WriteLine($"  {word}: {n}回");

        // Keys と Values
        Console.Write("\nキー: ");
        foreach (string key in count.Keys) Console.Write($"{key} ");
        Console.WriteLine();

        Console.Write("値: ");
        foreach (int val in count.Values) Console.Write($"{val} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`単語の出現回数:
  apple: 3回
  banana: 2回
  cherry: 1回

キー: apple banana cherry
値: 3 2 1 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="dictionary" />
      </div>
      <LessonNav lessons={lessons} currentId="dictionary" basePath="/learn/collections" />
    </div>
  );
}
