import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">コレクション レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コレクション比較</h1>
        <p className="text-gray-400">各コレクションの特徴、パフォーマンス、用途別選択ガイドを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コレクション選択ガイド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          用途に合わせて適切なコレクションを選ぶことで、パフォーマンスと可読性が向上します。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-yellow-400 py-2 pr-3">コレクション</th>
                <th className="text-left text-gray-400 py-2 pr-3">順序</th>
                <th className="text-left text-gray-400 py-2 pr-3">重複</th>
                <th className="text-left text-gray-400 py-2 pr-3">K-V</th>
                <th className="text-left text-gray-400 py-2">主な用途</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {[
                ["T[]", "挿入順", "OK", "-", "固定サイズ、高速インデックスアクセス"],
                ["List<T>", "挿入順", "OK", "-", "動的サイズ、汎用リスト"],
                ["LinkedList<T>", "挿入順", "OK", "-", "先頭・末尾・中間の頻繁な挿入削除"],
                ["Dictionary<K,V>", "なし", "K不可", "あり", "キー検索 O(1)"],
                ["HashSet<T>", "なし", "不可", "-", "重複排除、集合演算"],
                ["SortedList<K,V>", "キー順", "K不可", "あり", "ソート + インデックス"],
                ["SortedDictionary<K,V>", "キー順", "K不可", "あり", "ソート + 頻繁な更新"],
                ["SortedSet<T>", "ソート順", "不可", "-", "ソート済み集合、範囲検索"],
                ["Stack<T>", "LIFO", "OK", "-", "戻る操作、DFS"],
                ["Queue<T>", "FIFO", "OK", "-", "タスク処理、BFS"],
                ["ConcurrentDictionary", "なし", "K不可", "あり", "マルチスレッド辞書"],
                ["ImmutableList<T>", "挿入順", "OK", "-", "変更不可、スレッドセーフ読み取り"],
              ].map(([name, order, dup, kv, use]) => (
                <tr key={name} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-2 pr-3"><code className="text-yellow-300">{name}</code></td>
                  <td className="py-2 pr-3">{order}</td>
                  <td className="py-2 pr-3">{dup}</td>
                  <td className="py-2 pr-3">{kv}</td>
                  <td className="py-2">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">計算量（Big-O）比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-yellow-400 py-2 pr-3">コレクション</th>
                <th className="text-left text-gray-400 py-2 pr-3">追加</th>
                <th className="text-left text-gray-400 py-2 pr-3">削除</th>
                <th className="text-left text-gray-400 py-2 pr-3">検索</th>
                <th className="text-left text-gray-400 py-2">インデックス</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {[
                ["T[]", "O(1)*", "O(n)", "O(n)", "O(1)"],
                ["List<T>", "O(1)*", "O(n)", "O(n)", "O(1)"],
                ["LinkedList<T>", "O(1)", "O(1)", "O(n)", "O(n)"],
                ["Dictionary<K,V>", "O(1)", "O(1)", "O(1)", "-"],
                ["HashSet<T>", "O(1)", "O(1)", "O(1)", "-"],
                ["SortedDictionary<K,V>", "O(log n)", "O(log n)", "O(log n)", "-"],
                ["SortedList<K,V>", "O(n)", "O(n)", "O(log n)", "O(1)"],
              ].map(([name, add, del, search, idx]) => (
                <tr key={name} className="border-b border-gray-800">
                  <td className="py-2 pr-3"><code className="text-yellow-300">{name}</code></td>
                  <td className="py-2 pr-3">{add}</td>
                  <td className="py-2 pr-3">{del}</td>
                  <td className="py-2 pr-3">{search}</td>
                  <td className="py-2">{idx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-xs mt-2">* 平均的な場合。容量拡張時は O(n)</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">選択の実例：同じ処理を違うコレクションで</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // シナリオ：「ユーザーIDのリストから重複を排除して検索」

        int[] userIds = { 5, 3, 1, 4, 2, 3, 5, 1, 7, 6 };

        // パターン1: List + LINQ（シンプルだが Distinct は HashSet を内部で使う）
        var uniqueList = userIds.Distinct().ToList();
        Console.WriteLine($"List Distinct: {uniqueList.Count}個");

        // パターン2: HashSet（重複排除と O(1) 検索）
        var uniqueSet = new HashSet<int>(userIds);
        Console.WriteLine($"HashSet: {uniqueSet.Count}個");
        Console.WriteLine($"ID 3 はあり? {uniqueSet.Contains(3)}");  // O(1)

        // パターン3: SortedSet（ソート済み + 重複排除）
        var sortedUnique = new SortedSet<int>(userIds);
        Console.Write("SortedSet: ");
        foreach (int id in sortedUnique) Console.Write($"{id} ");
        Console.WriteLine();

        // パターン4: Dictionary（IDと情報の紐付け）
        var userMap = new Dictionary<int, string>();
        foreach (int id in uniqueSet)
            userMap[id] = $"ユーザー{id}";

        Console.WriteLine($"Dictionary でIDルックアップ: {userMap[5]}");
    }
}`}
          expectedOutput={`List Distinct: 7個
HashSet: 7個
ID 3 はあり? True
SortedSet: 1 2 3 4 5 6 7
Dictionary でIDルックアップ: ユーザー5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/collections" />
    </div>
  );
}
