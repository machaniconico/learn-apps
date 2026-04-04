import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignCreationalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">設計パターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">生成パターン</h1>
        <p className="text-gray-400">Singleton・Factory・Builder など生成に関するデザインパターン</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">生成パターンとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">生成パターン（Creational Patterns）</strong>は
          オブジェクトの生成方法に関するパターンです。
          クライアントコードがどのクラスを使うかを知らなくてもオブジェクトを生成できる柔軟性を提供します。
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { name: "Singleton", desc: "インスタンスが1つだけ存在することを保証" },
            { name: "Factory Method", desc: "サブクラスに生成するオブジェクトの種類を決めさせる" },
            { name: "Builder", desc: "複雑なオブジェクトを段階的に構築する" },
          ].map((p) => (
            <div key={p.name} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-indigo-400 font-semibold mb-1">{p.name}</h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Factory Method パターン</h2>
        <p className="text-gray-300 mb-4">
          オブジェクトの生成を専門の「ファクトリー」クラスに委ねるパターンです。
          生成するオブジェクトの種類を変えたい場合、クライアントコードを変更せずにファクトリーを変えるだけで済みます。
        </p>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod

# === Factory Method パターン ===

# 抽象製品
class Button(ABC):
    @abstractmethod
    def render(self) -> str: ...

    @abstractmethod
    def on_click(self) -> str: ...

# 具体的な製品
class WindowsButton(Button):
    def render(self) -> str:
        return "[ Windows ボタン ]"

    def on_click(self) -> str:
        return "Windows のクリックイベント発火"

class MacButton(Button):
    def render(self) -> str:
        return "( Mac ボタン )"

    def on_click(self) -> str:
        return "Mac のクリックイベント発火"

class WebButton(Button):
    def render(self) -> str:
        return "<button>Web ボタン</button>"

    def on_click(self) -> str:
        return "JavaScript のクリックイベント発火"

# 抽象ファクトリー
class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: ...

    def render_ui(self) -> None:
        btn = self.create_button()
        print(f"描画: {btn.render()}")
        print(f"操作: {btn.on_click()}")

# 具体的なファクトリー
class WindowsFactory(UIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

class MacFactory(UIFactory):
    def create_button(self) -> Button:
        return MacButton()

class WebFactory(UIFactory):
    def create_button(self) -> Button:
        return WebButton()

# クライアントコードはファクトリーの実装を知らない
def render_application(factory: UIFactory) -> None:
    print(f"--- {factory.__class__.__name__} ---")
    factory.render_ui()
    print()

for factory in [WindowsFactory(), MacFactory(), WebFactory()]:
    render_application(factory)
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Builder パターン</h2>
        <p className="text-gray-300 mb-4">
          多数のオプションを持つ複雑なオブジェクトを段階的に構築するパターンです。
          コンストラクタに大量の引数を渡す問題（テレスコーピングコンストラクタ問題）を解決します。
        </p>
        <PythonPlayground
          defaultCode={`from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class Pizza:
    """ピザオーダー"""
    size: str
    crust: str
    sauce: str
    toppings: List[str] = field(default_factory=list)
    extra_cheese: bool = False
    thin_slice: bool = False

    def __str__(self) -> str:
        toppings = ", ".join(self.toppings) if self.toppings else "なし"
        extras = []
        if self.extra_cheese:
            extras.append("追加チーズ")
        if self.thin_slice:
            extras.append("薄切り")
        extras_str = ", ".join(extras) if extras else "なし"
        return (
            f"ピザ: {self.size} | クラスト: {self.crust} | ソース: {self.sauce}\n"
            f"  トッピング: {toppings}\n"
            f"  オプション: {extras_str}"
        )

class PizzaBuilder:
    """Builderパターンでピザを段階的に構築"""

    def __init__(self) -> None:
        self._size = "M"
        self._crust = "レギュラー"
        self._sauce = "トマト"
        self._toppings: List[str] = []
        self._extra_cheese = False
        self._thin_slice = False

    def size(self, size: str) -> "PizzaBuilder":
        self._size = size
        return self  # メソッドチェーン可能

    def crust(self, crust: str) -> "PizzaBuilder":
        self._crust = crust
        return self

    def sauce(self, sauce: str) -> "PizzaBuilder":
        self._sauce = sauce
        return self

    def topping(self, *toppings: str) -> "PizzaBuilder":
        self._toppings.extend(toppings)
        return self

    def extra_cheese(self) -> "PizzaBuilder":
        self._extra_cheese = True
        return self

    def thin_slice(self) -> "PizzaBuilder":
        self._thin_slice = True
        return self

    def build(self) -> Pizza:
        return Pizza(
            self._size, self._crust, self._sauce,
            self._toppings, self._extra_cheese, self._thin_slice
        )

# メソッドチェーンで直感的に注文
margherita = (PizzaBuilder()
    .size("L")
    .crust("薄め")
    .sauce("トマト")
    .topping("バジル", "モッツァレラ")
    .build())

custom = (PizzaBuilder()
    .size("XL")
    .crust("厚め")
    .sauce("クリーム")
    .topping("ベーコン", "コーン", "玉ねぎ", "ピーマン")
    .extra_cheese()
    .thin_slice()
    .build())

print("=== 注文1 ===")
print(margherita)
print()
print("=== 注文2 ===")
print(custom)
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="design" lessonId="creational" />
      </div>
      <LessonNav lessons={lessons} currentId="creational" basePath="/learn/design" />
    </div>
  );
}
