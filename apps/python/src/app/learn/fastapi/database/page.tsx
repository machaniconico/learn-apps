import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データベース連携</h1>
        <p className="text-gray-400">SQLAlchemy + FastAPIでデータベースを操作する方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">SQLAlchemyのセットアップ</h2>
        <p className="text-gray-400 mb-4">
          FastAPIではSQLAlchemyをORMとして使うのが一般的です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">engine</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SessionLocal</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Base</code>の3つを設定します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">database.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./myapp.db"
# PostgreSQLの場合：
# DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# モデルの定義
from sqlalchemy import Column, Integer, String, Boolean

class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">依存性注入でDB接続を管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Depends(get_db)</code>でDB接続をエンドポイントに注入します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">yield</code>を使ったジェネレータで接続のライフサイクルを管理します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db          # DBを提供
    finally:
        db.close()        # リクエスト終了後にクローズ

@app.post("/users", response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserModel(username=user.username, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # 生成されたIDなどを取得
    return db_user

@app.get("/users/{user_id}", response_model=UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return user`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Pydanticスキーマとモデルの分離</h2>
        <p className="text-gray-400 mb-4">
          FastAPIの設計では<strong className="text-white">SQLAlchemyモデル</strong>（DB定義）と
          <strong className="text-white">Pydanticスキーマ</strong>（APIの入出力定義）を明確に分けることが重要です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# schemas.py - Pydantic スキーマ
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str          # 作成時のみ受け取る

class UserSchema(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True  # SQLAlchemyモデルからの変換を有効化

# models.py - SQLAlchemy モデル（DB定義）
class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)  # ハッシュ化したパスワード
    is_active = Column(Boolean, default=True)`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DBリポジトリパターンを実装する</h2>
        <p className="text-gray-400 mb-4">
          データベース操作をリポジトリクラスに分離するパターンをPythonで実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass, field
from typing import Optional, ClassVar

@dataclass
class User:
    username: str
    email: str
    id: int = 0
    is_active: bool = True

class UserRepository:
    """データベース操作を抽象化するリポジトリ（SQLAlchemyのSessionに相当）"""
    _store: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    @classmethod
    def create(cls, username: str, email: str) -> User:
        # 重複チェック
        if any(u.username == username for u in cls._store):
            raise ValueError(f"ユーザー名 '{username}' は既に使われています")
        if any(u.email == email for u in cls._store):
            raise ValueError(f"メール '{email}' は既に使われています")

        user = User(username=username, email=email, id=cls._next_id)
        cls._store.append(user)
        cls._next_id += 1
        return user

    @classmethod
    def get_by_id(cls, user_id: int) -> Optional[User]:
        return next((u for u in cls._store if u.id == user_id), None)

    @classmethod
    def get_all(cls, active_only: bool = False) -> list:
        if active_only:
            return [u for u in cls._store if u.is_active]
        return cls._store.copy()

    @classmethod
    def update(cls, user_id: int, **kwargs) -> Optional[User]:
        user = cls.get_by_id(user_id)
        if not user:
            return None
        for k, v in kwargs.items():
            if hasattr(user, k):
                setattr(user, k, v)
        return user

# テスト
print("=== ユーザー作成 ===")
u1 = UserRepository.create("tanaka", "tanaka@example.com")
u2 = UserRepository.create("suzuki", "suzuki@example.com")
print(f"作成: {u1.username} (ID={u1.id})")
print(f"作成: {u2.username} (ID={u2.id})")

print("\n=== 重複チェック ===")
try:
    UserRepository.create("tanaka", "other@example.com")
except ValueError as e:
    print(f"エラー: {e}")

print("\n=== ユーザー一覧 ===")
all_users = UserRepository.get_all()
print(f"合計: {len(all_users)}件")

print("\n=== ユーザー無効化 ===")
UserRepository.update(1, is_active=False)
active = UserRepository.get_all(active_only=True)
print(f"アクティブ: {len(active)}件")`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="database" />
      <LessonNav lessons={lessons} currentId="database" basePath="/learn/fastapi" />
    </div>
  );
}
