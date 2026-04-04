import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignStructuralPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">設計パターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造パターン</h1>
        <p className="text-gray-400">Adapter・Decorator・Facade など構造に関するデザインパターン</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">構造パターンとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">構造パターン（Structural Patterns）</strong>は
          クラスやオブジェクトを組み合わせて大きな構造を作るためのパターンです。
          既存クラスの互換性確保・機能追加・インターフェースの単純化などに使われます。
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { name: "Adapter", desc: "互換性のないインターフェース間の橋渡し" },
            { name: "Decorator", desc: "オブジェクトに動的に機能を追加する" },
            { name: "Facade", desc: "複雑なサブシステムへのシンプルなインターフェース" },
          ].map((p) => (
            <div key={p.name} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-indigo-400 font-semibold mb-1">{p.name}</h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Adapter パターン</h2>
        <p className="text-gray-300 mb-4">
          既存クラスのインターフェースを別のインターフェースに変換するパターンです。
          互換性のないクラスを協調させる「アダプター（変換プラグ）」の役割を担います。
        </p>
        <PythonPlayground
          defaultCode={`# Adapterパターン: 互換性のないインターフェースを橋渡し

# 既存のクラス（変更できない外部ライブラリを想定）
class EuropeanSocket:
    """ヨーロッパ式コンセント（丸型2ピン、220V）"""
    def plug_in_european(self) -> str:
        return "220V 電力供給中（ヨーロッパ式）"

class UKSocket:
    """イギリス式コンセント（3ピン、240V）"""
    def plug_in_uk(self) -> str:
        return "240V 電力供給中（UK式）"

# クライアントが期待するインターフェース
class JapaneseSocket:
    """日本式コンセント（フラット2ピン、100V）"""
    def plug_in(self) -> str:
        raise NotImplementedError

# アダプター: EuropeanSocket を JapaneseSocket に変換
class EuropeanAdapter(JapaneseSocket):
    def __init__(self, socket: EuropeanSocket):
        self._socket = socket

    def plug_in(self) -> str:
        result = self._socket.plug_in_european()
        return f"[変圧器 220V→100V] {result}"

class UKAdapter(JapaneseSocket):
    def __init__(self, socket: UKSocket):
        self._socket = socket

    def plug_in(self) -> str:
        result = self._socket.plug_in_uk()
        return f"[変圧器 240V→100V] {result}"

# クライアントコードは JapaneseSocket しか知らない
def power_device(socket: JapaneseSocket) -> None:
    print(socket.plug_in())

european = EuropeanSocket()
uk = UKSocket()

power_device(EuropeanAdapter(european))
power_device(UKAdapter(uk))

print()
# データ変換のアダプター例
class LegacyCSVReader:
    """旧システム: CSV形式でデータを返す"""
    def read_csv(self) -> str:
        return "Alice,30,Tokyo\\nBob,25,Osaka"

class ModernDataAdapter:
    """旧CSVReaderを新システム（辞書リスト形式）に適応させる"""
    def __init__(self, reader: LegacyCSVReader):
        self._reader = reader

    def get_users(self) -> list:
        csv = self._reader.read_csv()
        users = []
        for line in csv.split("\\n"):
            name, age, city = line.split(",")
            users.append({"name": name, "age": int(age), "city": city})
        return users

adapter = ModernDataAdapter(LegacyCSVReader())
for user in adapter.get_users():
    print(f"ユーザー: {user}")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Decorator パターン</h2>
        <p className="text-gray-300 mb-4">
          既存のオブジェクトに動的に機能を追加するパターンです。
          継承よりも柔軟で、複数の機能を組み合わせやすいのが特徴です。
        </p>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod

# Decoratorパターン: 機能を動的に追加

class TextProcessor(ABC):
    @abstractmethod
    def process(self, text: str) -> str: ...

# 基本実装
class PlainText(TextProcessor):
    def process(self, text: str) -> str:
        return text

# デコレータ基底クラス
class TextDecorator(TextProcessor):
    def __init__(self, component: TextProcessor):
        self._component = component

    def process(self, text: str) -> str:
        return self._component.process(text)

# 具体的なデコレータ
class UpperCaseDecorator(TextDecorator):
    def process(self, text: str) -> str:
        return super().process(text).upper()

class TrimDecorator(TextDecorator):
    def process(self, text: str) -> str:
        return super().process(text).strip()

class ExclamationDecorator(TextDecorator):
    def process(self, text: str) -> str:
        return super().process(text) + "!!!"

class BracketDecorator(TextDecorator):
    def __init__(self, component: TextProcessor, bracket: str = "[]"):
        super().__init__(component)
        self._open = bracket[0]
        self._close = bracket[1]

    def process(self, text: str) -> str:
        return f"{self._open}{super().process(text)}{self._close}"

# 複数のデコレータを組み合わせ
text = "  hello, world  "
print(f"元のテキスト: '{text}'")
print()

# Trim → Upper → Exclamation
proc1 = ExclamationDecorator(UpperCaseDecorator(TrimDecorator(PlainText())))
print(f"Trim + Upper + !: '{proc1.process(text)}'")

# Trim → Bracket → Upper
proc2 = UpperCaseDecorator(BracketDecorator(TrimDecorator(PlainText()), "()"))
print(f"Trim + () + Upper: '{proc2.process(text)}'")

# Trim → Exclamation → Bracket
proc3 = BracketDecorator(ExclamationDecorator(TrimDecorator(PlainText())), "【】")
print(f"Trim + ! + 【】: '{proc3.process(text)}'")

print()
# Python のデコレータ構文との対比
print("Pythonの@デコレータも同じ考え方です:")
def exclaim(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) + "!!!"
    return wrapper

@exclaim
def greet(name: str) -> str:
    return f"Hello, {name}"

print(greet("Python"))
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="design" lessonId="structural" />
      </div>
      <LessonNav lessons={lessons} currentId="structural" basePath="/learn/design" />
    </div>
  );
}
