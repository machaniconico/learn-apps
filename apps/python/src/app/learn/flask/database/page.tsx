import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データベース連携</h1>
        <p className="text-gray-400">Flask-SQLAlchemyを使ってデータベースを操作する方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">SQLAlchemyのセットアップ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Flask-SQLAlchemy</code>はFlaskとSQLAlchemyを統合した拡張機能です。
          モデルをクラスで定義し、ORMを通じてSQLを書かずにDBを操作できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myapp.db'
db = SQLAlchemy(app)

# モデルの定義
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    def __repr__(self):
        return f'<User {self.username}>'

# テーブルの作成
with app.app_context():
    db.create_all()`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">CRUD操作</h2>
        <p className="text-gray-400 mb-4">
          SQLAlchemyでは<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">db.session</code>を通じてデータの作成・読み取り・更新・削除（CRUD）を行います。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# Create（作成）
new_user = User(username='tanaka', email='tanaka@example.com')
db.session.add(new_user)
db.session.commit()

# Read（読み取り）
user = User.query.filter_by(username='tanaka').first()
all_users = User.query.all()
user_by_id = User.query.get(1)

# Update（更新）
user = User.query.get(1)
user.email = 'new@example.com'
db.session.commit()

# Delete（削除）
user = User.query.get(1)
db.session.delete(user)
db.session.commit()`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">リレーションシップ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">db.relationship()</code>でモデル間の関連を定義できます。
          一対多・多対多などのリレーションを簡単に扱えます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    # 一対多：ユーザーが複数の記事を持つ
    posts = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    # 外部キー
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# リレーションのアクセス
user = User.query.get(1)
for post in user.posts:   # ユーザーの記事一覧
    print(post.title)

post = Post.query.get(1)
print(post.author.username)  # backrefでユーザーを取得`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ORMパターンをシミュレートする</h2>
        <p className="text-gray-400 mb-4">
          SQLAlchemyのCRUD操作に相当するパターンをPythonで再現してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass, field
from typing import ClassVar, Optional
from datetime import datetime

@dataclass
class User:
    username: str
    email: str
    id: int = field(default=0)
    created_at: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))

    # インメモリ「データベース」
    _db: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    def save(self):
        """db.session.add() + db.session.commit() に相当"""
        if self.id == 0:
            self.id = User._next_id
            User._next_id += 1
            User._db.append(self)
            print(f"作成: User(id={self.id}, username={self.username})")
        else:
            for i, u in enumerate(User._db):
                if u.id == self.id:
                    User._db[i] = self
                    print(f"更新: User(id={self.id})")
        return self

    def delete(self):
        """db.session.delete() に相当"""
        User._db = [u for u in User._db if u.id != self.id]
        print(f"削除: User(id={self.id})")

    @classmethod
    def get_all(cls):
        return cls._db.copy()

    @classmethod
    def get_by_id(cls, user_id):
        return next((u for u in cls._db if u.id == user_id), None)

    @classmethod
    def filter_by(cls, **kwargs):
        results = cls._db
        for k, v in kwargs.items():
            results = [u for u in results if getattr(u, k, None) == v]
        return results

# CRUD操作
print("=== Create ===")
u1 = User("tanaka", "tanaka@example.com").save()
u2 = User("suzuki", "suzuki@example.com").save()

print("\\n=== Read ===")
all_users = User.get_all()
print(f"全ユーザー数: {len(all_users)}")
user = User.get_by_id(1)
print(f"ID=1: {user.username} ({user.email})")

print("\\n=== Update ===")
user.email = "tanaka.new@example.com"
user.save()

print("\\n=== Delete ===")
u2.delete()
print(f"削除後のユーザー数: {len(User.get_all())}")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="database" />
      <LessonNav lessons={lessons} currentId="database" basePath="/learn/flask" />
    </div>
  );
}
