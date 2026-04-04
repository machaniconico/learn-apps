import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インスタンスメソッド</h1>
        <p className="text-gray-400">self を使ったインスタンスへの操作の定義を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">インスタンスメソッドの定義</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            インスタンスメソッドは第1引数に <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">self</code> を受け取る関数です。
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">self</code> を通じてインスタンスの属性や他のメソッドにアクセスできます。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`class Counter:
    def __init__(self, start=0):
        self.count = start
        self.history = []

    def increment(self, amount=1):
        """カウントを増やす"""
        self.count += amount
        self.history.append(f"+{amount}")
        return self  # メソッドチェーンのためにselfを返す

    def decrement(self, amount=1):
        """カウントを減らす"""
        self.count -= amount
        self.history.append(f"-{amount}")
        return self

    def reset(self):
        """カウントをリセット"""
        self.history.append(f"reset(was:{self.count})")
        self.count = 0
        return self

    def __str__(self):
        return f"Counter({self.count})"

# 通常の使い方
c = Counter(10)
c.increment(5)
c.decrement(3)
print(c)
print("履歴:", c.history)

# メソッドチェーン
c2 = Counter()
c2.increment(10).increment(5).decrement(3)
print(c2)
print("履歴:", c2.history)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">メソッドからメソッドを呼ぶ</h2>
        <PythonPlayground
          defaultCode={`class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, name, price, quantity=1):
        self.items.append({"name": name, "price": price, "qty": quantity})

    def get_total(self):
        return sum(item["price"] * item["qty"] for item in self.items)

    def apply_discount(self, percent):
        total = self.get_total()  # 自分のメソッドを呼ぶ
        discount = total * percent / 100
        return total - discount

    def display(self):
        print("カート内容:")
        for item in self.items:
            subtotal = item["price"] * item["qty"]
            print(f"  {item['name']}: {item['price']}円 × {item['qty']} = {subtotal}円")
        print(f"合計: {self.get_total()}円")
        print(f"10%割引後: {self.apply_discount(10):.0f}円")

cart = ShoppingCart()
cart.add_item("りんご", 150, 3)
cart.add_item("牛乳", 210)
cart.add_item("パン", 280, 2)
cart.display()`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/classes" />
    </div>
  );
}
