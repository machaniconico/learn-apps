import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysLinkedListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LinkedList</h1>
        <p className="text-gray-400">LinkedList{"<T>"} の双方向連結リスト構造、AddFirst・AddLast・ノード操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">連結リストとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-orange-400">LinkedList{"<T>"}</code> は
          各要素（ノード）が前後のノードへの参照を持つ<strong className="text-white">双方向連結リスト</strong>です。
          先頭・末尾・任意の位置への挿入・削除が O(1) でできますが、
          インデックスアクセスは O(n) のため向いていません。
        </p>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max font-mono text-xs">
            <span className="text-gray-500">null</span>
            <span className="text-gray-500">←</span>
            <div className="border border-orange-500/50 rounded px-3 py-2 text-orange-300">
              <div className="text-center">10</div>
              <div className="text-gray-500 text-center">First</div>
            </div>
            <span className="text-gray-400">↔</span>
            <div className="border border-orange-500/50 rounded px-3 py-2 text-orange-300">
              <div className="text-center">20</div>
            </div>
            <span className="text-gray-400">↔</span>
            <div className="border border-orange-500/50 rounded px-3 py-2 text-orange-300">
              <div className="text-center">30</div>
              <div className="text-gray-500 text-center">Last</div>
            </div>
            <span className="text-gray-500">→</span>
            <span className="text-gray-500">null</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">LinkedList の基本操作</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void PrintList<T>(LinkedList<T> list, string label)
    {
        Console.Write($"{label}: ");
        foreach (var item in list) Console.Write($"{item} ");
        Console.WriteLine();
    }

    static void Main()
    {
        var list = new LinkedList<int>();

        // 追加
        list.AddLast(2);
        list.AddLast(3);
        list.AddFirst(1);   // 先頭に追加
        list.AddLast(4);
        PrintList(list, "初期状態");

        Console.WriteLine($"First: {list.First!.Value}");
        Console.WriteLine($"Last:  {list.Last!.Value}");
        Console.WriteLine($"Count: {list.Count}");

        // 削除
        list.RemoveFirst();
        list.RemoveLast();
        PrintList(list, "両端削除後");

        // ノードを使った操作
        LinkedListNode<int>? node = list.Find(2);
        if (node != null)
        {
            list.AddAfter(node, 99);  // 2 の後に 99 を挿入
        }
        PrintList(list, "99 挿入後");
    }
}`}
          expectedOutput={`初期状態: 1 2 3 4
First: 1
Last:  4
Count: 4
両端削除後: 2 3
99 挿入後: 2 99 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">LinkedList の使いどころ</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// LRU キャッシュの簡易実装（LinkedList 活用例）
class LruCache
{
    private readonly int _capacity;
    private readonly LinkedList<(int key, int val)> _list = new();
    private readonly Dictionary<int, LinkedListNode<(int key, int val)>> _map = new();

    public LruCache(int capacity) => _capacity = capacity;

    public int Get(int key)
    {
        if (!_map.TryGetValue(key, out var node)) return -1;
        _list.Remove(node);
        _list.AddFirst(node);
        return node.Value.val;
    }

    public void Put(int key, int value)
    {
        if (_map.TryGetValue(key, out var node))
            _list.Remove(node);
        else if (_list.Count >= _capacity)
        {
            var last = _list.Last!;
            _map.Remove(last.Value.key);
            _list.RemoveLast();
        }
        var newNode = _list.AddFirst((key, value));
        _map[key] = newNode;
    }
}

class Program
{
    static void Main()
    {
        var cache = new LruCache(3);
        cache.Put(1, 100);
        cache.Put(2, 200);
        cache.Put(3, 300);

        Console.WriteLine($"Get(1) = {cache.Get(1)}");  // 100
        cache.Put(4, 400);  // 2 が削除される（最近使われていない）
        Console.WriteLine($"Get(2) = {cache.Get(2)}");  // -1（削除済み）
        Console.WriteLine($"Get(3) = {cache.Get(3)}");  // 300
        Console.WriteLine($"Get(4) = {cache.Get(4)}");  // 400
    }
}`}
          expectedOutput={`Get(1) = 100
Get(2) = -1
Get(3) = 300
Get(4) = 400`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="linked-list" />
      </div>
      <LessonNav lessons={lessons} currentId="linked-list" basePath="/learn/arrays" />
    </div>
  );
}
