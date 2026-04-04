import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("typehints");

export default function TypehintsExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">型ヒント レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型ヒント演習</h1>
        <p className="text-gray-400">型ヒントを活用した堅牢なコード設計の実践問題</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">これまでの復習</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { term: "変数アノテーション", desc: "name: str = 'Alice' — 変数の型を明示" },
            { term: "関数アノテーション", desc: "def f(x: int) -> str — 引数と戻り値の型を指定" },
            { term: "Optional[T]", desc: "T | None — 値がNoneになりうる場合に使う" },
            { term: "Union[A, B]", desc: "A | B — 複数の型を許容する場合に使う" },
            { term: "TypeVar", desc: "T = TypeVar('T') — ジェネリクスで型変数を定義" },
            { term: "Protocol", desc: "構造的部分型 — 継承なしでダックタイピングを型で表現" },
          ].map((item) => (
            <div key={item.term} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-cyan-400 font-mono text-sm font-semibold">{item.term}</code>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習1: 型付きデータクラスの設計</h2>
        <p className="text-gray-300 mb-4">
          型ヒントを活用して、書籍管理システムのデータ構造を実装してみましょう。
        </p>
        <PythonPlayground
          defaultCode={`from typing import Optional, List, Dict
from dataclasses import dataclass, field

@dataclass
class Author:
    name: str
    birth_year: int
    nationality: str = "日本"

    def __repr__(self) -> str:
        return f"{self.name} ({self.birth_year}年生まれ, {self.nationality})"

@dataclass
class Book:
    title: str
    author: Author
    year: int
    pages: int
    isbn: Optional[str] = None
    tags: List[str] = field(default_factory=list)

    def summary(self) -> str:
        tags_str = ", ".join(self.tags) if self.tags else "なし"
        isbn_str = self.isbn or "未登録"
        return (
            f"『{self.title}』 著: {self.author.name}\n"
            f"  出版年: {self.year}年 | ページ数: {self.pages}\n"
            f"  ISBN: {isbn_str} | タグ: {tags_str}"
        )

class Library:
    def __init__(self) -> None:
        self._books: List[Book] = []

    def add(self, book: Book) -> None:
        self._books.append(book)

    def find_by_author(self, author_name: str) -> List[Book]:
        return [b for b in self._books if author_name in b.author.name]

    def find_by_tag(self, tag: str) -> List[Book]:
        return [b for b in self._books if tag in b.tags]

    def stats(self) -> Dict[str, int]:
        return {
            "total": len(self._books),
            "total_pages": sum(b.pages for b in self._books),
            "avg_pages": sum(b.pages for b in self._books) // len(self._books) if self._books else 0,
        }

# ライブラリを構築
author1 = Author("夏目漱石", 1867)
author2 = Author("村上春樹", 1949)
author3 = Author("Guido van Rossum", 1956, "オランダ")

lib = Library()
lib.add(Book("吾輩は猫である", author1, 1905, 456, tags=["小説", "文学", "明治"]))
lib.add(Book("こころ", author1, 1914, 288, tags=["小説", "文学", "心理"]))
lib.add(Book("ノルウェイの森", author2, 1987, 360, tags=["小説", "恋愛", "現代"]))
lib.add(Book("Pythonの生みの親", author3, 2023, 300, isbn="978-0-000-00000-0", tags=["プログラミング", "Python"]))

# 検索
print("=== 夏目漱石の作品 ===")
for book in lib.find_by_author("夏目"):
    print(book.summary())
    print()

print("=== 統計 ===")
stats = lib.stats()
for key, val in stats.items():
    print(f"  {key}: {val}")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習2: ジェネリクスとProtocolを組み合わせる</h2>
        <PythonPlayground
          defaultCode={`from typing import TypeVar, Generic, Protocol, List, Optional

# Protocol: 比較可能なオブジェクト
class Comparable(Protocol):
    def __lt__(self, other) -> bool: ...
    def __le__(self, other) -> bool: ...

T = TypeVar("T")

# ジェネリックな優先度付きキュー
class PriorityQueue(Generic[T]):
    """最小値を優先して取り出すジェネリックなキュー"""

    def __init__(self) -> None:
        self._items: List[tuple] = []
        self._counter: int = 0

    def push(self, item: T, priority: int) -> None:
        """優先度付きでアイテムを追加（数値が小さいほど高優先度）"""
        self._items.append((priority, self._counter, item))
        self._items.sort(key=lambda x: (x[0], x[1]))
        self._counter += 1

    def pop(self) -> Optional[T]:
        """最高優先度のアイテムを取り出す"""
        if not self._items:
            return None
        _, _, item = self._items.pop(0)
        return item

    def peek(self) -> Optional[T]:
        """取り出さずに最高優先度のアイテムを確認"""
        if not self._items:
            return None
        return self._items[0][2]

    def size(self) -> int:
        return len(self._items)

    def is_empty(self) -> bool:
        return len(self._items) == 0

# タスク管理システム
from dataclasses import dataclass

@dataclass
class Task:
    name: str
    description: str

    def __repr__(self) -> str:
        return f"Task('{self.name}')"

# 文字列の優先度付きキュー
str_queue: PriorityQueue[str] = PriorityQueue()
str_queue.push("低優先度タスク", priority=3)
str_queue.push("緊急タスク", priority=1)
str_queue.push("通常タスク", priority=2)
str_queue.push("最緊急タスク", priority=0)

print("=== 文字列キュー（優先度順に処理）===")
while not str_queue.is_empty():
    item = str_queue.pop()
    print(f"  処理: {item}")

# タスクの優先度付きキュー
task_queue: PriorityQueue[Task] = PriorityQueue()
task_queue.push(Task("バグ修正", "本番環境のバグ"), priority=1)
task_queue.push(Task("ドキュメント更新", "APIドキュメント"), priority=3)
task_queue.push(Task("セキュリティパッチ", "脆弱性対応"), priority=0)
task_queue.push(Task("新機能追加", "ユーザーリクエスト"), priority=2)

print()
print("=== タスクキュー（優先度順に処理）===")
while not task_queue.is_empty():
    task = task_queue.pop()
    if task:
        print(f"  {task.name}: {task.description}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="typehints" lessonId="typehints-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="typehints-exercise" basePath="/learn/typehints" />
    </div>
  );
}
