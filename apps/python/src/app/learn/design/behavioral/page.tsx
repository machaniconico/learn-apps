import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignBehavioralPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">設計パターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">振る舞いパターン</h1>
        <p className="text-gray-400">Observer・Strategy・Command など振る舞いに関するデザインパターン</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">振る舞いパターンとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">振る舞いパターン（Behavioral Patterns）</strong>は
          オブジェクト間の通信・アルゴリズムの分離・責任の割り当てに関するパターンです。
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { name: "Strategy", desc: "アルゴリズムをカプセル化して交換可能にする" },
            { name: "Observer", desc: "状態変化を複数のオブジェクトに自動通知する" },
            { name: "Command", desc: "操作をオブジェクトとしてカプセル化する" },
          ].map((p) => (
            <div key={p.name} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-indigo-400 font-semibold mb-1">{p.name}</h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Strategy パターン</h2>
        <p className="text-gray-300 mb-4">
          アルゴリズムをクラスとしてカプセル化し、実行時に切り替えられるようにするパターンです。
          if/elif の連鎖で複数の処理を分岐させる代わりに使えます。
        </p>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod
from typing import List

# Strategyパターン: ソートアルゴリズムを差し替え可能にする

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: List[int]) -> List[int]: ...

    @property
    @abstractmethod
    def name(self) -> str: ...

class BubbleSortStrategy(SortStrategy):
    @property
    def name(self) -> str:
        return "バブルソート O(n²)"

    def sort(self, data: List[int]) -> List[int]:
        arr = data.copy()
        n = len(arr)
        for i in range(n):
            for j in range(n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr

class QuickSortStrategy(SortStrategy):
    @property
    def name(self) -> str:
        return "クイックソート O(n log n)"

    def sort(self, data: List[int]) -> List[int]:
        if len(data) <= 1:
            return data.copy()
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        mid  = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + mid + self.sort(right)

class ReverseSortStrategy(SortStrategy):
    @property
    def name(self) -> str:
        return "逆順ソート"

    def sort(self, data: List[int]) -> List[int]:
        return sorted(data, reverse=True)

# コンテキスト: ストラテジーを使う側
class DataSorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy) -> None:
        """実行時にアルゴリズムを切り替えられる"""
        self._strategy = strategy

    def sort(self, data: List[int]) -> List[int]:
        print(f"使用アルゴリズム: {self._strategy.name}")
        return self._strategy.sort(data)

data = [64, 34, 25, 12, 22, 11, 90]
print(f"元データ: {data}")
print()

sorter = DataSorter(BubbleSortStrategy())
print(sorter.sort(data))

sorter.set_strategy(QuickSortStrategy())
print(sorter.sort(data))

sorter.set_strategy(ReverseSortStrategy())
print(sorter.sort(data))
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Command パターン</h2>
        <p className="text-gray-300 mb-4">
          操作をオブジェクトとしてカプセル化するパターンです。
          操作の取り消し（Undo）・キューへの積み込み・ログ記録が容易になります。
        </p>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod
from typing import List

# Commandパターン: テキストエディタの操作をオブジェクト化

class Command(ABC):
    @abstractmethod
    def execute(self) -> None: ...

    @abstractmethod
    def undo(self) -> None: ...

class TextEditor:
    def __init__(self):
        self.text = ""

    def write(self, content: str) -> None:
        self.text += content

    def delete_chars(self, n: int) -> str:
        deleted = self.text[-n:]
        self.text = self.text[:-n]
        return deleted

    def __str__(self) -> str:
        return f"テキスト: '{self.text}'"

# 具体的なコマンド
class WriteCommand(Command):
    def __init__(self, editor: TextEditor, text: str):
        self._editor = editor
        self._text = text

    def execute(self) -> None:
        self._editor.write(self._text)

    def undo(self) -> None:
        self._editor.delete_chars(len(self._text))

class DeleteCommand(Command):
    def __init__(self, editor: TextEditor, n: int):
        self._editor = editor
        self._n = n
        self._deleted = ""

    def execute(self) -> None:
        self._deleted = self._editor.delete_chars(self._n)

    def undo(self) -> None:
        self._editor.write(self._deleted)

# コマンドマネージャー（Undo/Redoスタック）
class CommandManager:
    def __init__(self):
        self._history: List[Command] = []
        self._redo_stack: List[Command] = []

    def execute(self, command: Command) -> None:
        command.execute()
        self._history.append(command)
        self._redo_stack.clear()

    def undo(self) -> None:
        if self._history:
            cmd = self._history.pop()
            cmd.undo()
            self._redo_stack.append(cmd)
            print("  [Undo実行]")

    def redo(self) -> None:
        if self._redo_stack:
            cmd = self._redo_stack.pop()
            cmd.execute()
            self._history.append(cmd)
            print("  [Redo実行]")

editor = TextEditor()
manager = CommandManager()

print(editor)
manager.execute(WriteCommand(editor, "Hello"))
print(editor)
manager.execute(WriteCommand(editor, ", World"))
print(editor)
manager.execute(DeleteCommand(editor, 6))
print(editor)

manager.undo()
print(editor)
manager.undo()
print(editor)

manager.redo()
print(editor)
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="design" lessonId="behavioral" />
      </div>
      <LessonNav lessons={lessons} currentId="behavioral" basePath="/learn/design" />
    </div>
  );
}
