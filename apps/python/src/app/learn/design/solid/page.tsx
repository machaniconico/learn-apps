import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignSolidPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">設計パターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SOLID原則</h1>
        <p className="text-gray-400">オブジェクト指向設計の5つの原則をPythonで学ぶ</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">SOLID原則とは</h2>
        <p className="text-gray-300 mb-6">
          <strong className="text-white">SOLID</strong>は、保守しやすく拡張しやすいコードを書くための
          5つの設計原則の頭文字をとったものです。Robert C. Martin（Uncle Bob）が提唱しました。
        </p>
        <div className="space-y-3 mb-6">
          {[
            { letter: "S", name: "Single Responsibility Principle", ja: "単一責任の原則", desc: "クラスは1つの責任だけを持つべき" },
            { letter: "O", name: "Open/Closed Principle", ja: "開放/閉鎖原則", desc: "拡張に対して開かれ、修正に対して閉じているべき" },
            { letter: "L", name: "Liskov Substitution Principle", ja: "リスコフの置換原則", desc: "子クラスは親クラスの代わりに使えるべき" },
            { letter: "I", name: "Interface Segregation Principle", ja: "インターフェース分離原則", desc: "クライアントが使わないメソッドへの依存を強制しない" },
            { letter: "D", name: "Dependency Inversion Principle", ja: "依存性逆転原則", desc: "高レベルモジュールは低レベルモジュールに依存しない" },
          ].map((item) => (
            <div key={item.letter} className="flex items-start gap-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <span className="text-3xl font-extrabold text-indigo-400 w-8 shrink-0">{item.letter}</span>
              <div>
                <p className="text-white font-semibold text-sm">{item.ja}</p>
                <p className="text-gray-500 text-xs">{item.name}</p>
                <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">S: 単一責任の原則</h2>
        <p className="text-gray-300 mb-4">
          クラスを変更する理由は1つだけであるべきです。
          複数の責任を持つクラスは、変更が別の機能に影響を与えやすくなります。
        </p>
        <PythonPlayground
          defaultCode={`# ❌ 違反例: 1つのクラスが複数の責任を持つ
class UserBad:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def get_user_info(self) -> str:
        return f"{self.name} <{self.email}>"

    def send_email(self, message: str) -> None:
        # メール送信の責任も持っている（別責任！）
        print(f"メール送信: {self.email} → {message}")

    def save_to_db(self) -> None:
        # DB保存の責任も持っている（別責任！）
        print(f"DB保存: {self.name}")

# ✅ 正解例: 責任ごとにクラスを分離
class User:
    """ユーザーデータの管理のみ"""
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def get_info(self) -> str:
        return f"{self.name} <{self.email}>"

class EmailService:
    """メール送信のみ"""
    def send(self, email: str, message: str) -> None:
        print(f"メール送信: {email} → {message}")

class UserRepository:
    """DB保存のみ"""
    def save(self, user: User) -> None:
        print(f"DB保存: {user.get_info()}")

# 使用
user = User("Alice", "alice@example.com")
email_service = EmailService()
repo = UserRepository()

print(user.get_info())
email_service.send(user.email, "登録が完了しました")
repo.save(user)
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">O: 開放/閉鎖原則 & D: 依存性逆転原則</h2>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod
from typing import List

# 依存性逆転: 抽象（インターフェース）に依存する
class Notifier(ABC):
    @abstractmethod
    def notify(self, message: str) -> None:
        pass

# 開放/閉鎖: 新しい通知手段を追加しても既存コードを変更しない
class EmailNotifier(Notifier):
    def __init__(self, email: str):
        self.email = email

    def notify(self, message: str) -> None:
        print(f"[メール → {self.email}] {message}")

class SlackNotifier(Notifier):
    def __init__(self, channel: str):
        self.channel = channel

    def notify(self, message: str) -> None:
        print(f"[Slack → #{self.channel}] {message}")

class LineNotifier(Notifier):
    def __init__(self, user_id: str):
        self.user_id = user_id

    def notify(self, message: str) -> None:
        print(f"[LINE → {self.user_id}] {message}")

# NotificationService は Notifier の抽象に依存
class NotificationService:
    def __init__(self, notifiers: List[Notifier]):
        self._notifiers = notifiers

    def send_all(self, message: str) -> None:
        for notifier in self._notifiers:
            notifier.notify(message)

# 新しい通知手段を追加しても NotificationService を変更不要
service = NotificationService([
    EmailNotifier("alice@example.com"),
    SlackNotifier("general"),
    LineNotifier("user123"),
])

service.send_all("デプロイが完了しました！")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="design" lessonId="solid" />
      </div>
      <LessonNav lessons={lessons} currentId="solid" basePath="/learn/design" />
    </div>
  );
}
