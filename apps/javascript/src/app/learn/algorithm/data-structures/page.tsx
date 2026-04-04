import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { ALGORITHM_LESSONS } from "@/lib/lessons-data";

export default function DataStructuresLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 mb-4">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ構造</h1>
        <p className="text-gray-400">配列、連結リスト、スタック、キュー、木、グラフの実装を学ぼう</p>
      </div>

      {/* 連結リスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">連結リスト（Linked List）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各要素（ノード）がデータと次のノードへの参照を持つデータ構造です。
          配列と違い、<strong className="text-yellow-400">先頭への挿入・削除が O(1)</strong> で行えます。
          ただし、インデックスアクセスは O(n) です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 先頭に追加 O(1)
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // 末尾に追加 O(n)
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }

  // 全要素を表示
  print() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(" -> "));
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
list.print(); // 0 -> 1 -> 2 -> 3`}</code>
        </pre>
      </section>

      {/* スタック */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スタック（Stack）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">LIFO（Last In, First Out）</strong>の原則に従うデータ構造です。
          最後に追加した要素が最初に取り出されます。
          ブラウザの「戻る」ボタン、関数の呼び出し履歴、括弧の対応チェックなどに使われます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);  // O(1)
  }

  pop() {
    return this.items.pop(); // O(1)
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  get size() {
    return this.items.length;
  }
}

// 括弧の対応チェック
function isValidParentheses(s) {
  const stack = new Stack();
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const char of s) {
    if ("([{".includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  return stack.isEmpty();
}

console.log(isValidParentheses("({[]})")); // true
console.log(isValidParentheses("({)}"));   // false`}</code>
        </pre>
      </section>

      {/* キュー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">キュー（Queue）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">FIFO（First In, First Out）</strong>の原則に従うデータ構造です。
          最初に追加した要素が最初に取り出されます。
          タスクの処理順序、BFS、プリンタのジョブ管理などに使われます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  peek() {
    return this.items[this.head];
  }

  isEmpty() {
    return this.tail - this.head === 0;
  }

  get size() {
    return this.tail - this.head;
  }
}

const q = new Queue();
q.enqueue("タスクA");
q.enqueue("タスクB");
q.enqueue("タスクC");
console.log(q.dequeue()); // "タスクA"（先に入れた方から）
console.log(q.dequeue()); // "タスクB"
console.log(q.size);      // 1`}</code>
        </pre>
      </section>

      {/* 木構造 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">二分探索木（Binary Search Tree）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各ノードが最大2つの子ノードを持ち、
          <strong className="text-yellow-400">左の子 &lt; 親 &lt; 右の子</strong>という規則を満たす木構造です。
          探索・挿入・削除が平均 O(log n) で行えます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) { this.root = node; return; }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) { current.left = node; return; }
        current = current.left;
      } else {
        if (!current.right) { current.right = node; return; }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // 中間順走査（昇順で出力される）
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }
}

const tree = new BST();
[8, 3, 10, 1, 6, 14].forEach(v => tree.insert(v));
console.log(tree.inOrder());    // [1, 3, 6, 8, 10, 14]
console.log(tree.search(6));    // true
console.log(tree.search(7));    // false`}</code>
        </pre>
      </section>

      {/* グラフ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">グラフ（Graph）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ノード（頂点）とエッジ（辺）で構成されるデータ構造です。
          SNSの友人関係、路線図、Webページのリンクなど、
          <strong className="text-yellow-400">もの同士の関係</strong>を表現するのに使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // 無向グラフのエッジ追加
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  print() {
    for (const vertex in this.adjacencyList) {
      console.log(vertex, "->", this.adjacencyList[vertex].join(", "));
    }
  }
}

const g = new Graph();
["東京", "大阪", "名古屋", "福岡"].forEach(v => g.addVertex(v));
g.addEdge("東京", "大阪");
g.addEdge("東京", "名古屋");
g.addEdge("大阪", "福岡");
g.addEdge("名古屋", "大阪");
g.print();
// 東京 -> 大阪, 名古屋
// 大阪 -> 東京, 福岡, 名古屋
// 名古屋 -> 東京, 大阪
// 福岡 -> 大阪`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>連結リストは先頭への挿入・削除が O(1) だがインデックスアクセスは O(n)</li>
          <li>スタック（LIFO）は関数呼び出し、元に戻す操作などに使われる</li>
          <li>キュー（FIFO）はタスク管理、BFS などに使われる</li>
          <li>二分探索木は探索・挿入・削除が平均 O(log n)</li>
          <li>グラフは関係性の表現に強く、BFS/DFS で探索できる</li>
          <li>問題に最適なデータ構造を選ぶことでアルゴリズムの効率が大幅に変わる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="algorithm" lessonId="data-structures" color="yellow" />
      <LessonNav lessons={ALGORITHM_LESSONS} currentId="data-structures" basePath="/learn/algorithm" color="yellow" />
    </div>
  );
}
