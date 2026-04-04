import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("typehints");

export default function TypehintsAdvancedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">型ヒント レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">高度な型表現</h1>
        <p className="text-gray-400">Optional・Union・Listなどtypingモジュールの活用</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">typingモジュールの主要な型</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { name: "Optional[T]", desc: "T または None。値がない可能性がある引数・戻り値に使う", example: "Optional[str] = None" },
            { name: "Union[A, B]", desc: "AまたはB。複数の型を許容する場合に使う", example: "Union[int, str]" },
            { name: "List[T]", desc: "T型の要素を持つリスト（3.9以降はlist[T]）", example: "List[int]" },
            { name: "Dict[K, V]", desc: "キーK・値Vの辞書（3.9以降はdict[K, V]）", example: "Dict[str, int]" },
            { name: "Tuple[A, B]", desc: "固定長タプル。各要素の型を指定できる", example: "Tuple[int, str, bool]" },
            { name: "Callable[[A], R]", desc: "引数と戻り値の型を持つ呼び出し可能オブジェクト", example: "Callable[[int], str]" },
          ].map((item) => (
            <div key={item.name} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-cyan-400 font-mono text-sm font-semibold">{item.name}</code>
              <p className="text-gray-400 text-xs mt-1 mb-2">{item.desc}</p>
              <code className="text-gray-500 text-xs font-mono">{item.example}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Optional — None を許容する型</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 text-cyan-300 px-1 rounded">Optional[T]</code>は
          <code className="bg-gray-800 text-cyan-300 px-1 rounded">Union[T, None]</code>の略記です。
          「値があるかもしれないし、ないかもしれない」という状態を表現します。
          Python 3.10以降では <code className="bg-gray-800 text-cyan-300 px-1 rounded">T | None</code> と書けます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob", 3: "Carol"}
    return users.get(user_id)  # 存在しない場合はNoneを返す

name = find_user(1)
if name is not None:            # None チェックが必要
    print(name.upper())

# Python 3.10以降の記法
def find_user_new(user_id: int) -> str | None:
    ...`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Union と Callable</h2>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`from typing import Union, Callable, List

# Union: 複数の型を許容
def process(value: Union[int, float, str]) -> str:
    return str(value)

# Callable: 関数を引数として受け取る
def apply_twice(func: Callable[[int], int], n: int) -> int:
    return func(func(n))

double = lambda x: x * 2
print(apply_twice(double, 3))  # 12

# List[Union[...]]: 混合型リスト
mixed: List[Union[int, str]] = [1, "hello", 2, "world"]`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">高度な型表現を使ってみよう</h2>
        <PythonPlayground
          defaultCode={`from typing import Optional, Union, List, Dict, Callable, Tuple

# Optional の使用例
def parse_int(s: str) -> Optional[int]:
    """文字列をintに変換。失敗したらNoneを返す"""
    try:
        return int(s)
    except ValueError:
        return None

test_values = ["42", "abc", "100", "-7", "3.14"]
for val in test_values:
    result = parse_int(val)
    if result is not None:
        print(f"'{val}' → {result} (成功)")
    else:
        print(f"'{val}' → None (変換失敗)")

print()

# Union の使用例
def to_number(value: Union[str, int, float]) -> float:
    """任意の数値型または数字文字列をfloatに変換"""
    return float(value)

print(to_number(42))       # int → float
print(to_number(3.14))     # float → float
print(to_number("2.718"))  # str → float

print()

# Callable の使用例
def transform_list(
    items: List[int],
    func: Callable[[int], int]
) -> List[int]:
    """リストの各要素に関数を適用"""
    return [func(x) for x in items]

numbers = [1, 2, 3, 4, 5]
squared = transform_list(numbers, lambda x: x ** 2)
print(f"元のリスト: {numbers}")
print(f"2乗:        {squared}")

# Dict と Tuple の組み合わせ
def summarize(
    scores: Dict[str, List[int]]
) -> Dict[str, Tuple[float, int, int]]:
    """各人のスコアリストから（平均, 最高, 最低）を計算"""
    result: Dict[str, Tuple[float, int, int]] = {}
    for name, s in scores.items():
        result[name] = (sum(s) / len(s), max(s), min(s))
    return result

data = {"Alice": [90, 85, 92], "Bob": [78, 82, 75], "Carol": [95, 88, 91]}
summary = summarize(data)
print()
for name, (avg, best, worst) in summary.items():
    print(f"{name}: 平均{avg:.1f} 最高{best} 最低{worst}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="typehints" lessonId="advanced" />
      </div>
      <LessonNav lessons={lessons} currentId="advanced" basePath="/learn/typehints" />
    </div>
  );
}
