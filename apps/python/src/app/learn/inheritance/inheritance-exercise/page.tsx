import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・応用 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承演習</h1>
        <p className="text-gray-400">継承を活用したオブジェクト設計の実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1：動物園の動物クラス</h2>
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 mb-4">
          <p className="text-violet-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            Animal 抽象クラスを継承した複数の動物クラスを作り、多態性を活用した動物園シミュレーションを実装してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @abstractmethod
    def sound(self) -> str:
        pass

    @abstractmethod
    def move(self) -> str:
        pass

    def introduce(self):
        return f"私は{self.name}（{self.age}歳）。{self.sound()}、{self.move()}"

class Dog(Animal):
    def sound(self):
        return "ワンワンと吠えます"

    def move(self):
        return "4本足で走ります"

    def fetch(self):
        return f"{self.name}がボールを取ってきました！"

class Bird(Animal):
    def __init__(self, name, age, can_fly=True):
        super().__init__(name, age)
        self.can_fly = can_fly

    def sound(self):
        return "チュンチュンと鳴きます"

    def move(self):
        return "空を飛びます" if self.can_fly else "地面を歩きます"

class Fish(Animal):
    def sound(self):
        return "（無言）"

    def move(self):
        return "水中を泳ぎます"

zoo = [Dog("ポチ", 3), Bird("ピーコ", 2), Fish("ニモ", 1), Bird("ペン太", 5, False)]
print("動物園の動物たち:")
for animal in zoo:
    print(f"  {animal.introduce()}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2：RPG キャラクタークラス</h2>
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 mb-4">
          <p className="text-violet-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            RPG のキャラクタークラスを継承で実装し、異なる職業の特殊スキルを持つキャラクターを作ってください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`class Character:
    def __init__(self, name, hp, mp):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.mp = mp

    def attack(self, target):
        damage = 10
        target.hp -= damage
        return f"{self.name}が{target.name}に{damage}ダメージ！"

    def heal(self, amount=20):
        before = self.hp
        self.hp = min(self.hp + amount, self.max_hp)
        return f"{self.name}のHPが{self.hp - before}回復（{self.hp}/{self.max_hp}）"

    def status(self):
        bar_len = 10
        filled = int(self.hp / self.max_hp * bar_len)
        bar = "█" * filled + "░" * (bar_len - filled)
        return f"{self.name} HP:[{bar}] {self.hp}/{self.max_hp}"

class Warrior(Character):
    def __init__(self, name):
        super().__init__(name, hp=150, mp=30)

    def power_strike(self, target):
        damage = 30
        target.hp -= damage
        return f"{self.name}が渾身の一撃！{target.name}に{damage}ダメージ！"

class Mage(Character):
    def __init__(self, name):
        super().__init__(name, hp=80, mp=100)

    def fireball(self, target):
        if self.mp < 20:
            return "MPが不足しています"
        self.mp -= 20
        damage = 50
        target.hp -= damage
        return f"{self.name}がファイアボール！{target.name}に{damage}ダメージ！（残MP:{self.mp}）"

warrior = Warrior("アーサー")
mage = Mage("マーリン")
enemy = Character("ドラゴン", 200, 0)

print(warrior.power_strike(enemy))
print(mage.fireball(enemy))
print(warrior.attack(enemy))
print()
print(enemy.status())`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3：図形の面積計算システム</h2>
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 mb-4">
          <p className="text-violet-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            dataclass と ABC を組み合わせて図形クラスを実装し、さまざまな図形の面積を計算してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod
from dataclasses import dataclass
import math

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def name(self) -> str:
        pass

    def __str__(self):
        return f"{self.name()}: 面積 = {self.area():.2f}"

@dataclass
class Circle(Shape):
    radius: float

    def area(self):
        return math.pi * self.radius ** 2

    def name(self):
        return f"円（半径{self.radius}）"

@dataclass
class Rectangle(Shape):
    width: float
    height: float

    def area(self):
        return self.width * self.height

    def name(self):
        return f"長方形（{self.width}×{self.height}）"

@dataclass
class Triangle(Shape):
    base: float
    height: float

    def area(self):
        return self.base * self.height / 2

    def name(self):
        return f"三角形（底辺{self.base}, 高さ{self.height}）"

shapes = [Circle(5), Rectangle(4, 6), Triangle(8, 3), Circle(2.5)]
print("図形リスト:")
for s in shapes:
    print(f"  {s}")

total = sum(s.area() for s in shapes)
print(f"\n合計面積: {total:.2f}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="inheritance" lessonId="inheritance-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="inheritance-exercise" basePath="/learn/inheritance" />
    </div>
  );
}
