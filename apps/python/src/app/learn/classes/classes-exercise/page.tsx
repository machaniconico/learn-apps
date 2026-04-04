import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラス演習</h1>
        <p className="text-gray-400">クラスを使ったオブジェクト指向設計の実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1：スタック（Stack）の実装</h2>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
          <p className="text-purple-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            push・pop・peek・is_empty・size メソッドを持つスタッククラスを実装してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`class Stack:
    def __init__(self):
        self._data = []

    def push(self, item):
        """要素を追加する"""
        self._data.append(item)

    def pop(self):
        """最後の要素を取り出す"""
        if self.is_empty():
            raise IndexError("スタックが空です")
        return self._data.pop()

    def peek(self):
        """最後の要素を確認する（取り出さない）"""
        if self.is_empty():
            raise IndexError("スタックが空です")
        return self._data[-1]

    def is_empty(self):
        return len(self._data) == 0

    @property
    def size(self):
        return len(self._data)

    def __str__(self):
        return f"Stack{self._data}"

# テスト
s = Stack()
s.push(1)
s.push(2)
s.push(3)
print(s)
print(f"peek: {s.peek()}")
print(f"pop: {s.pop()}")
print(f"pop: {s.pop()}")
print(f"size: {s.size}")
print(s)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2：学生管理システム</h2>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
          <p className="text-purple-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            Student クラスと Classroom クラスを作成し、成績管理ができるシステムを実装してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self._scores = {}

    def add_score(self, subject, score):
        self._scores[subject] = score

    @property
    def average(self):
        if not self._scores:
            return 0
        return sum(self._scores.values()) / len(self._scores)

    @property
    def grade(self):
        avg = self.average
        if avg >= 90: return "A"
        elif avg >= 80: return "B"
        elif avg >= 70: return "C"
        else: return "D"

    def __str__(self):
        return f"{self.name}({self.student_id}): 平均{self.average:.1f}点 [{self.grade}]"

class Classroom:
    def __init__(self, name):
        self.name = name
        self._students = []

    def add_student(self, student):
        self._students.append(student)

    def get_top_students(self, n=3):
        return sorted(self._students, key=lambda s: s.average, reverse=True)[:n]

    def class_average(self):
        if not self._students:
            return 0
        return sum(s.average for s in self._students) / len(self._students)

# テスト
classroom = Classroom("3年A組")
for name, id_, scores in [
    ("田中", "001", {"数学": 90, "英語": 85, "理科": 92}),
    ("鈴木", "002", {"数学": 75, "英語": 80, "理科": 70}),
    ("佐藤", "003", {"数学": 95, "英語": 88, "理科": 91}),
]:
    s = Student(name, id_)
    for subj, score in scores.items():
        s.add_score(subj, score)
    classroom.add_student(s)

print(f"{classroom.name} クラス平均: {classroom.class_average():.1f}点")
print("\nトップ3:")
for i, student in enumerate(classroom.get_top_students(), 1):
    print(f"  {i}位: {student}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3：カード（トランプ）クラス</h2>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
          <p className="text-purple-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            トランプのカードクラスとデッキクラスを作成し、シャッフルと配牌を実装してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`import random

class Card:
    SUITS = ["♠", "♥", "♦", "♣"]
    RANKS = ["A", "2", "3", "4", "5", "6", "7",
             "8", "9", "10", "J", "Q", "K"]

    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank

    @property
    def value(self):
        if self.rank in ["J", "Q", "K"]: return 10
        if self.rank == "A": return 11
        return int(self.rank)

    def __str__(self):
        return f"{self.suit}{self.rank}"

class Deck:
    def __init__(self):
        self._cards = [Card(s, r) for s in Card.SUITS for r in Card.RANKS]

    def shuffle(self):
        random.shuffle(self._cards)

    def deal(self, n=1):
        return [self._cards.pop() for _ in range(min(n, len(self._cards)))]

    @property
    def remaining(self):
        return len(self._cards)

# ゲームのシミュレーション
deck = Deck()
deck.shuffle()

hand = deck.deal(5)
print("手札:", " ".join(str(c) for c in hand))
print(f"合計値: {sum(c.value for c in hand)}")
print(f"残りカード: {deck.remaining}枚")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="classes-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="classes-exercise" basePath="/learn/classes" />
    </div>
  );
}
