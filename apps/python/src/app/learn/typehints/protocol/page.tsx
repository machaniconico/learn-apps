import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("typehints");

export default function TypehintsProtocolPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">型ヒント レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Protocol</h1>
        <p className="text-gray-400">ダックタイピングを型で表現するProtocolの使い方</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Protocolとは</h2>
        <p className="text-gray-300 mb-4">
          Pythonは<strong className="text-white">ダックタイピング</strong>の言語です。
          「アヒルのように歩き、アヒルのように鳴くなら、それはアヒルだ」という考え方で、
          オブジェクトが必要なメソッドを持っていれば、クラスの継承関係は問いません。
        </p>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">Protocol</strong>（Python 3.8以降）は、このダックタイピングを
          型システムで表現する仕組みです。「このメソッドを持つオブジェクト」という構造的部分型を定義できます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="text-cyan-400 font-semibold mb-3">継承 vs Protocol</h3>
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`# 継承ベース（名前的部分型）
class Drawable(ABC):
    @abstractmethod
    def draw(self) -> None: ...

class Circle(Drawable):   # 明示的に継承が必要
    def draw(self) -> None:
        print("○")

# Protocol ベース（構造的部分型）
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

class Square:             # 継承不要！draw() があればOK
    def draw(self) -> None:
        print("□")

def render(shape: Drawable) -> None:
    shape.draw()

render(Square())  # OK — Squareは継承していないがdraw()を持つ`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Protocolの定義方法</h2>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`from typing import Protocol, runtime_checkable

# 基本的なProtocol定義
class Sizeable(Protocol):
    def __len__(self) -> int: ...

# runtime_checkable を付けるとisinstance()で確認できる
@runtime_checkable
class Closeable(Protocol):
    def close(self) -> None: ...

# 複数のメソッドを持つProtocol
class Repository(Protocol):
    def get(self, id: int) -> dict: ...
    def save(self, data: dict) -> None: ...
    def delete(self, id: int) -> bool: ...`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Protocolの実用例</h2>
        <PythonPlayground
          defaultCode={`from typing import Protocol, runtime_checkable, List

# === Protocolの定義 ===

class Drawable(Protocol):
    """描画できるオブジェクトのProtocol"""
    def draw(self) -> str: ...
    def area(self) -> float: ...

@runtime_checkable
class Serializable(Protocol):
    """シリアライズできるオブジェクトのProtocol"""
    def to_dict(self) -> dict: ...

# === 実装クラス（Protocolを継承しない！） ===

class Circle:
    def __init__(self, radius: float):
        self.radius = radius

    def draw(self) -> str:
        return f"○ (半径: {self.radius})"

    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2

    def to_dict(self) -> dict:
        return {"type": "circle", "radius": self.radius}

class Rectangle:
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def draw(self) -> str:
        return f"□ ({self.width}×{self.height})"

    def area(self) -> float:
        return self.width * self.height

    def to_dict(self) -> dict:
        return {"type": "rectangle", "width": self.width, "height": self.height}

class Triangle:
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def draw(self) -> str:
        return f"△ (底辺: {self.base}, 高さ: {self.height})"

    def area(self) -> float:
        return 0.5 * self.base * self.height

# === Protocol を使った汎用関数 ===

def render_all(shapes: List[Drawable]) -> None:
    """Drawableプロトコルを持つオブジェクトをまとめて描画"""
    total_area = 0.0
    for shape in shapes:
        print(f"  {shape.draw()} — 面積: {shape.area():.2f}")
        total_area += shape.area()
    print(f"  合計面積: {total_area:.2f}")

shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
print("=== 図形の描画 ===")
render_all(shapes)

# runtime_checkable でisinstance確認
print()
print("=== Serializableチェック ===")
for shape in shapes:
    is_serializable = isinstance(shape, Serializable)
    print(f"{shape.__class__.__name__}: Serializable = {is_serializable}")
    if is_serializable:
        print(f"  データ: {shape.to_dict()}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="typehints" lessonId="protocol" />
      </div>
      <LessonNav lessons={lessons} currentId="protocol" basePath="/learn/typehints" />
    </div>
  );
}
