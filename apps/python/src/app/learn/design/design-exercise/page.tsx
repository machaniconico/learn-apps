import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">設計パターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設計パターン演習</h1>
        <p className="text-gray-400">デザインパターンを適用したコード設計の実践問題</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">これまでの復習</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { term: "SOLID原則", desc: "S単一責任・O開放閉鎖・Lリスコフ・Iインターフェース分離・D依存性逆転" },
            { term: "Singleton", desc: "インスタンスを1つに限定。設定・接続プールなどに使用" },
            { term: "Factory Method", desc: "オブジェクト生成をサブクラスに委ねる。種類の切り替えが容易" },
            { term: "Builder", desc: "複雑なオブジェクトを段階的に構築。メソッドチェーンが特徴" },
            { term: "Adapter", desc: "互換性のないインターフェース間の橋渡し" },
            { term: "Decorator", desc: "継承なしで機能を動的に追加。複数組み合わせ可能" },
            { term: "Strategy", desc: "アルゴリズムを差し替え可能にする。if/elif地獄を解消" },
            { term: "Observer", desc: "状態変化を複数のオブジェクトに通知するpub/subモデル" },
            { term: "Command", desc: "操作をオブジェクト化。Undo/Redo・キューに対応" },
          ].map((item) => (
            <div key={item.term} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-indigo-400 font-mono text-sm font-semibold">{item.term}</code>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習1: 複数パターンを組み合わせたECサイト設計</h2>
        <p className="text-gray-300 mb-4">
          Factory・Strategy・Observerパターンを組み合わせて、
          注文処理システムを設計します。
        </p>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod
from typing import List, Dict
from dataclasses import dataclass, field

# === データ定義 ===
@dataclass
class Product:
    name: str
    price: float

@dataclass
class Order:
    products: List[Product] = field(default_factory=list)
    status: str = "pending"

    def add(self, product: Product) -> None:
        self.products.append(product)

    def subtotal(self) -> float:
        return sum(p.price for p in self.products)

# === Strategy: 割引戦略 ===
class DiscountStrategy(ABC):
    @abstractmethod
    def discount(self, order: Order) -> float: ...

    @property
    @abstractmethod
    def name(self) -> str: ...

class NoDiscount(DiscountStrategy):
    @property
    def name(self) -> str:
        return "割引なし"
    def discount(self, order: Order) -> float:
        return 0.0

class PercentDiscount(DiscountStrategy):
    def __init__(self, rate: float):
        self._rate = rate
    @property
    def name(self) -> str:
        return f"{int(self._rate*100)}%割引"
    def discount(self, order: Order) -> float:
        return order.subtotal() * self._rate

class ThresholdDiscount(DiscountStrategy):
    def __init__(self, threshold: float, amount: float):
        self._threshold = threshold
        self._amount = amount
    @property
    def name(self) -> str:
        return f"{self._threshold}円以上で{self._amount}円引き"
    def discount(self, order: Order) -> float:
        return self._amount if order.subtotal() >= self._threshold else 0.0

# === Observer: 注文イベントを通知 ===
class OrderObserver(ABC):
    @abstractmethod
    def on_order_placed(self, order: Order, total: float) -> None: ...

class ReceiptPrinter(OrderObserver):
    def on_order_placed(self, order: Order, total: float) -> None:
        print("[レシート]")
        for p in order.products:
            print(f"  {p.name}: ¥{p.price:.0f}")
        print(f"  合計: ¥{total:.0f}")

class InventoryManager(OrderObserver):
    def on_order_placed(self, order: Order, total: float) -> None:
        items = [p.name for p in order.products]
        print(f"[在庫管理] 出庫処理: {', '.join(items)}")

class EmailSender(OrderObserver):
    def on_order_placed(self, order: Order, total: float) -> None:
        print(f"[メール] 注文確認メール送信 (金額: ¥{total:.0f})")

# === Factory: 設定に応じて割引戦略を生成 ===
class DiscountFactory:
    @staticmethod
    def create(customer_type: str) -> DiscountStrategy:
        if customer_type == "premium":
            return PercentDiscount(0.15)
        elif customer_type == "regular":
            return ThresholdDiscount(5000, 500)
        else:
            return NoDiscount()

# === OrderService: 全てを統合 ===
class OrderService:
    def __init__(self):
        self._observers: List[OrderObserver] = []

    def add_observer(self, observer: OrderObserver) -> None:
        self._observers.append(observer)

    def place_order(self, order: Order, customer_type: str) -> float:
        strategy = DiscountFactory.create(customer_type)
        discount = strategy.discount(order)
        total = order.subtotal() - discount
        order.status = "confirmed"
        print(f"\\n=== 注文確定 ({customer_type}客: {strategy.name}) ===")
        print(f"小計: ¥{order.subtotal():.0f}")
        if discount > 0:
            print(f"割引: -¥{discount:.0f}")
        for obs in self._observers:
            obs.on_order_placed(order, total)
        return total

# 実行
service = OrderService()
service.add_observer(ReceiptPrinter())
service.add_observer(InventoryManager())
service.add_observer(EmailSender())

order1 = Order()
order1.add(Product("Pythonの教科書", 3000))
order1.add(Product("キーボード", 8000))
service.place_order(order1, "premium")

order2 = Order()
order2.add(Product("マウス", 2500))
service.place_order(order2, "regular")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習2: Decoratorパターンでロギングミドルウェアを作る</h2>
        <PythonPlayground
          defaultCode={`import time
import functools
from typing import Callable, Any

# Pythonの関数デコレータとDecoratorパターンの組み合わせ

def timer(func: Callable) -> Callable:
    """実行時間をログに記録するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs) -> Any:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = (time.perf_counter() - start) * 1000
        print(f"[TIMER] {func.__name__} 実行時間: {elapsed:.3f}ms")
        return result
    return wrapper

def logger(func: Callable) -> Callable:
    """引数と戻り値をログに記録するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs) -> Any:
        args_str = ", ".join(str(a) for a in args)
        print(f"[LOG] {func.__name__}({args_str}) 呼び出し")
        result = func(*args, **kwargs)
        print(f"[LOG] {func.__name__} 戻り値: {result}")
        return result
    return wrapper

def retry(max_attempts: int = 3) -> Callable:
    """失敗時にリトライするデコレータ"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"[RETRY] {func.__name__} 試行{attempt}/{max_attempts}: {e}")
                    if attempt == max_attempts:
                        raise
        return wrapper
    return decorator

# デコレータを組み合わせる
@timer
@logger
def calculate_fibonacci(n: int) -> int:
    """n番目のフィボナッチ数を計算"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print("=== calculate_fibonacci(20) ===")
result = calculate_fibonacci(20)
print()

# retry デコレータ
import random
call_count = 0

@retry(max_attempts=3)
def flaky_service(value: int) -> str:
    global call_count
    call_count += 1
    # 最初の2回は失敗するシミュレーション
    if call_count < 3:
        raise ConnectionError(f"サービス接続失敗（試行{call_count}）")
    return f"成功: {value * 2}"

print("=== flaky_service（リトライあり）===")
try:
    r = flaky_service(21)
    print(f"結果: {r}")
except Exception as e:
    print(f"最終エラー: {e}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="design" lessonId="design-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="design-exercise" basePath="/learn/design" />
    </div>
  );
}
