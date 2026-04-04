import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("typehints");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonの型ヒントについて正しい説明はどれですか？",
    options: [
      "実行時に型チェックを行い、間違った型を渡すとエラーになる",
      "ドキュメントとして機能し、mypyなどの静的解析ツールがチェックに使う",
      "型ヒントを書くとコードが遅くなる",
      "Python 3.10以降でしか使えない",
    ],
    answer: 1,
    explanation: "型ヒントは実行時には無視されます。mypyなどのツールが静的に型チェックを行い、バグを事前に発見できます。",
  },
  {
    question: "def greet(name: str) -> str: の型ヒントの意味として正しいのはどれですか？",
    options: [
      "引数nameは整数型、戻り値は文字列型",
      "引数nameは文字列型、戻り値は文字列型",
      "引数nameはオプション、戻り値は文字列型",
      "引数nameは文字列型、戻り値はなし",
    ],
    answer: 1,
    explanation: "name: str は引数 name が str 型であることを、-> str は戻り値が str 型であることを示します。",
  },
  {
    question: "Optional[str] と同じ意味を持つ型表現はどれですか（Python 3.10以降）？",
    options: [
      "str | None",
      "str | Optional",
      "Union[str]",
      "str?",
    ],
    answer: 0,
    explanation: "Python 3.10以降では str | None という書き方が使えます。Optional[str] は Union[str, None] の省略形と同じ意味です。",
  },
  {
    question: "TypeVar を使う主な目的はどれですか？",
    options: [
      "型ヒントを省略するため",
      "ジェネリック関数・クラスで型の柔軟性を保ちながら型安全性を確保するため",
      "実行時に型をチェックするため",
      "Noneを許容する型を定義するため",
    ],
    answer: 1,
    explanation: "TypeVar を使うとジェネリクスを実現できます。「同じ型のまま処理する」という制約を型で表現できます。",
  },
];

export default function TypehintsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">型ヒント</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="advanced" />
        </div>
        <p className="text-gray-400">
          Python 3の型アノテーション機能を活用して、より安全で保守しやすいコードを書きましょう。
          変数・引数・戻り値への型付けから、ジェネリクス・Protocolまで体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="typehints" totalLessons={5} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/typehints" color="cyan" categoryId="typehints" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">型ヒントとは？</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "バグの早期発見",
              desc: "mypyなどの静的解析ツールと組み合わせると、実行前に型の不整合を検出できる。",
              icon: "🐛",
            },
            {
              title: "IDEサポートの向上",
              desc: "型情報があることでコード補完・リファクタリング・ドキュメント表示が正確になる。",
              icon: "💡",
            },
            {
              title: "ドキュメントとしての役割",
              desc: "関数のシグネチャを見ただけで引数の型と戻り値が分かる。コメントより信頼性が高い。",
              icon: "📝",
            },
            {
              title: "実行時コストゼロ",
              desc: "型ヒントはデフォルトで実行時に無視される。パフォーマンスへの影響はほぼない。",
              icon: "⚡",
            },
            {
              title: "段階的に導入可能",
              desc: "既存コードに少しずつ型ヒントを追加できる。全部書かなくてもmypyは動作する。",
              icon: "🔧",
            },
            {
              title: "Python 3.5以降で標準",
              desc: "typing モジュールはPython 3.5以降で標準搭載。Python 3.10以降はさらに簡潔な記法が使える。",
              icon: "📦",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">型ヒントを試してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">基本的な型アノテーション</h3>
          <PythonPlayground
            defaultCode={`# 型ヒントはPyodideでも正常に動作します（実行時には無視されます）

# 変数アノテーション
name: str = "Alice"
age: int = 30
score: float = 95.5
is_active: bool = True

print(f"名前: {name} (型: {type(name).__name__})")
print(f"年齢: {age} (型: {type(age).__name__})")
print(f"スコア: {score} (型: {type(score).__name__})")

# 関数の型アノテーション
def greet(name: str, times: int = 1) -> str:
    return (f"こんにちは、{name}！" + " ") * times

result = greet("Python", 3)
print(result)

# リストと辞書の型ヒント
from typing import List, Dict

def average(numbers: List[float]) -> float:
    return sum(numbers) / len(numbers)

scores: Dict[str, int] = {"Alice": 90, "Bob": 85, "Carol": 78}
values = list(scores.values())
print(f"平均スコア: {average(values):.1f}")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Optional・Union・TypeVar</h3>
          <PythonPlayground
            defaultCode={`from typing import Optional, Union, TypeVar, List

# Optional: None を許容する型
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)  # 存在しない場合は None

print(find_user(1))   # Alice
print(find_user(99))  # None

# Union: 複数の型を許容
def stringify(value: Union[int, float, str]) -> str:
    return str(value)

print(stringify(42))
print(stringify(3.14))
print(stringify("hello"))

# TypeVar: ジェネリクス
T = TypeVar("T")

def first(items: List[T]) -> Optional[T]:
    return items[0] if items else None

print(first([1, 2, 3]))       # int型を推論
print(first(["a", "b"]))      # str型を推論
print(first([]))              # None

# Python 3.10以降の新記法（コメントで紹介）
# def new_style(x: int | str | None) -> int | str:
#     return x or 0
print("Python 3.10以降: int | str | None と書けます")
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
