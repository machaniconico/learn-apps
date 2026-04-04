import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("typehints");

export default function TypehintsGenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">型ヒント レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクス</h1>
        <p className="text-gray-400">TypeVarを使った汎用的な型定義</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ジェネリクスとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">ジェネリクス（Generics）</strong>は、
          「型は後で決める」という柔軟な型定義の仕組みです。
          例えば「int のリストの最初の要素を返す関数」と「str のリストの最初の要素を返す関数」を
          1つの汎用関数として定義できます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2 text-sm">ジェネリクスなし（型が失われる）</h3>
            <pre className="text-gray-300 text-xs font-mono">{`def first(items: list) -> any:
    return items[0]

# 戻り値が any — 型情報が失われる
x = first([1, 2, 3])  # x の型は any`}</pre>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <h3 className="text-cyan-400 font-semibold mb-2 text-sm">ジェネリクスあり（型が保たれる）</h3>
            <pre className="text-cyan-200 text-xs font-mono">{`T = TypeVar("T")

def first(items: List[T]) -> T:
    return items[0]

# x の型は int と推論される！
x = first([1, 2, 3])`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">TypeVar の使い方</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 text-cyan-300 px-1 rounded">TypeVar</code>を使って
          型変数を定義します。型変数は「この型は後で決まる」という意味のプレースホルダーです。
          制約（bound）を付けることで許容する型を制限できます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`from typing import TypeVar, List, Optional

# 基本的な TypeVar
T = TypeVar("T")

def identity(value: T) -> T:
    """同じ型の値をそのまま返す"""
    return value

# 制約付き TypeVar
Number = TypeVar("Number", int, float)

def double(n: Number) -> Number:
    """intまたはfloatの2倍を返す（strは不可）"""
    return n * 2

# bound= で上限型を指定
from typing import Sequence

S = TypeVar("S", bound=Sequence)

def first_element(seq: S) -> Optional[object]:
    return seq[0] if seq else None`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Generic クラス</h2>
        <p className="text-gray-300 mb-4">
          クラスでもジェネリクスを使えます。
          <code className="bg-gray-800 text-cyan-300 px-1 rounded">Generic[T]</code>を継承することで、
          型パラメータを持つコンテナクラスを定義できます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`from typing import Generic, TypeVar, Optional

T = TypeVar("T")

class Stack(Generic[T]):
    """型安全なスタック"""
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> Optional[T]:
        return self._items.pop() if self._items else None

    def peek(self) -> Optional[T]:
        return self._items[-1] if self._items else None

# 使用時に型が確定する
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
print(int_stack.pop())  # 2 (int 型として推論される)`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ジェネリクスを使ってみよう</h2>
        <PythonPlayground
          defaultCode={`from typing import TypeVar, List, Optional, Dict, Generic, Tuple

T = TypeVar("T")
K = TypeVar("K")
V = TypeVar("V")

# ジェネリック関数
def first(items: List[T]) -> Optional[T]:
    return items[0] if items else None

def last(items: List[T]) -> Optional[T]:
    return items[-1] if items else None

def zip_to_dict(keys: List[K], values: List[V]) -> Dict[K, V]:
    """2つのリストを辞書にまとめる"""
    return dict(zip(keys, values))

# 型が保たれることを確認
int_list = [1, 2, 3, 4, 5]
str_list = ["Python", "Java", "Go", "Rust"]

print(f"first(int_list): {first(int_list)}")     # int
print(f"last(str_list): {last(str_list)}")        # str
print(f"first([]): {first([])}")                  # None

print()

# zip_to_dict の使用
names = ["Alice", "Bob", "Carol"]
scores = [90, 85, 78]
result = zip_to_dict(names, scores)
print("名前とスコア:")
for name, score in result.items():
    print(f"  {name}: {score}点")

print()

# Generic クラス
class Pair(Generic[K, V]):
    """2つの値を保持するジェネリッククラス"""
    def __init__(self, key: K, value: V) -> None:
        self.key = key
        self.value = value

    def swap(self) -> "Pair[V, K]":
        return Pair(self.value, self.key)

    def __repr__(self) -> str:
        return f"Pair({self.key!r}, {self.value!r})"

p1: Pair[str, int] = Pair("age", 30)
print(f"元のペア: {p1}")
p2 = p1.swap()
print(f"スワップ: {p2}")

# スタックの実装
class TypedStack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> Optional[T]:
        return self._items.pop() if self._items else None

    def size(self) -> int:
        return len(self._items)

print()
stack: TypedStack[int] = TypedStack()
for n in [10, 20, 30]:
    stack.push(n)
print(f"スタックサイズ: {stack.size()}")
print(f"pop: {stack.pop()}")  # 30
print(f"pop: {stack.pop()}")  # 20
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="typehints" lessonId="generics" />
      </div>
      <LessonNav lessons={lessons} currentId="generics" basePath="/learn/typehints" />
    </div>
  );
}
