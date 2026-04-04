import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dictionary<TKey, TValue> でキーが存在するか安全に確認するメソッドはどれですか？",
    options: ["HasKey()", "ContainsKey()", "Exists()", "TryGet()"],
    answer: 1,
    explanation: "ContainsKey() でキーの存在を確認します。存在しないキーにアクセスすると例外が発生します。",
  },
  {
    question: "HashSet<T> の最大の特徴は何ですか？",
    options: [
      "キーと値のペアを格納できる",
      "重複要素を許可しない",
      "挿入順を保持する",
      "スレッドセーフである",
    ],
    answer: 1,
    explanation: "HashSet<T> は重複なしの高速コレクションです。Set 演算（和集合・積集合など）も使えます。",
  },
  {
    question: "複数のスレッドから安全にアクセスできるディクショナリはどれですか？",
    options: [
      "Dictionary<TKey, TValue>",
      "SortedDictionary<TKey, TValue>",
      "ConcurrentDictionary<TKey, TValue>",
      "ImmutableDictionary<TKey, TValue>",
    ],
    answer: 2,
    explanation: "ConcurrentDictionary はスレッドセーフな辞書で、並行処理環境で安全に使用できます。",
  },
  {
    question: "ImmutableList<T> について正しい説明はどれですか？",
    options: [
      "Add した後に元のリストが変更される",
      "Add は新しいリストを返し、元のリストは変更されない",
      "スレッドセーフではない",
      "パフォーマンスは通常の List<T> と同じ",
    ],
    answer: 1,
    explanation: "ImmutableList は変更不可能です。Add などの操作は新しいインスタンスを返し、元のリストは変わりません。",
  },
];

export default function CollectionsIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
            コレクション
          </span>
          <DifficultyBadge difficulty="intermediate" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3">コレクション</h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          C# の高度なコレクション型を学びます。Dictionary・HashSet から並行コレクション・Immutable コレクションまで、
          用途に応じた選択方法も身につけます。
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 p-5 rounded-xl bg-gray-900 border border-gray-800">
        <ProgressBar categoryId="collections" totalLessons={lessons.length} color="yellow" />
      </div>

      {/* Overview */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コレクションの種類と選択基準</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          適切なコレクションを選ぶことで、パフォーマンスと可読性が大きく向上します。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "キー・値の対応", ex: "Dictionary<K,V>", color: "yellow" },
            { label: "重複なし集合", ex: "HashSet<T>", color: "yellow" },
            { label: "ソート済み辞書", ex: "SortedDictionary<K,V>", color: "yellow" },
            { label: "並行アクセス", ex: "ConcurrentDictionary", color: "yellow" },
            { label: "変更不可", ex: "ImmutableList<T>", color: "yellow" },
            { label: "最適選択", ex: "用途で比較", color: "yellow" },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-yellow-400 font-semibold mb-1">{item.label}</p>
              <code className="text-xs text-gray-300 font-mono">{item.ex}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Code example */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Dictionary の基本例</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var capitals = new Dictionary<string, string>
        {
            ["日本"] = "東京",
            ["フランス"] = "パリ",
            ["アメリカ"] = "ワシントンD.C.",
        };

        capitals.Add("ドイツ", "ベルリン");

        Console.WriteLine($"登録数: {capitals.Count}");
        Console.WriteLine($"日本の首都: {capitals["日本"]}");

        if (capitals.TryGetValue("イギリス", out string? cap))
            Console.WriteLine($"イギリスの首都: {cap}");
        else
            Console.WriteLine("イギリスは登録されていません");

        foreach (var (country, capital) in capitals)
            Console.WriteLine($"  {country}: {capital}");
    }
}`}
          expectedOutput={`登録数: 4
日本の首都: 東京
イギリスは登録されていません
  日本: 東京
  フランス: パリ
  アメリカ: ワシントンD.C.
  ドイツ: ベルリン`}
        />
      </section>

      {/* Lesson list */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">レッスン一覧</h2>
        <LessonList
          lessons={lessons}
          basePath="/learn/collections"
          color="yellow"
          categoryId="collections"
        />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="yellow" />
      </section>
    </div>
  );
}
