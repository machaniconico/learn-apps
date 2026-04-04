import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DESIGN_LESSONS } from "@/lib/lessons-data";

export default function ArchitectureLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">設計パターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アーキテクチャパターン</h1>
        <p className="text-gray-400">MVC、クリーンアーキテクチャ、DDDなど、アプリケーション全体の設計を学ぼう</p>
      </div>

      {/* アーキテクチャパターンとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アーキテクチャパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">アーキテクチャパターン</strong>は、アプリケーション全体の構造を決める大規模な設計パターンです。
          デザインパターンが「クラスやオブジェクト間の関係」を扱うのに対し、
          アーキテクチャパターンは「システム全体のレイヤーや責務の分け方」を扱います。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          適切なアーキテクチャを選ぶことで、大規模なアプリケーションでも保守性・テスト容易性・チーム開発の効率を維持できます。
        </p>
      </section>

      {/* MVC */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">MVC (Model-View-Controller)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">MVC</strong>は最も広く知られたアーキテクチャパターンで、
          アプリケーションを3つの層に分離します。Ruby on Rails、Laravel、Spring MVCなど多くのフレームワークが採用しています。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">Model（モデル）</h3>
            <p className="text-gray-400 text-sm">データとビジネスロジックを管理。DBアクセスやバリデーションを担当。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">View（ビュー）</h3>
            <p className="text-gray-400 text-sm">ユーザーに表示するUI部分。データの表示・入力を担当。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">Controller（コントローラー）</h3>
            <p className="text-gray-400 text-sm">ユーザー入力を受け取り、ModelとViewを仲介する。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// MVC の例（Express風の実装）

// Model - データとビジネスロジック
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

class TodoModel {
  private todos: Todo[] = [];
  private nextId = 1;

  getAll(): Todo[] {
    return [...this.todos];
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  toggleComplete(id: number): Todo | undefined {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
    return todo;
  }
}

// View - 表示ロジック（ここではJSON応答）
class TodoView {
  renderList(todos: Todo[]): string {
    return JSON.stringify({ todos, count: todos.length });
  }

  renderOne(todo: Todo): string {
    return JSON.stringify(todo);
  }

  renderError(message: string): string {
    return JSON.stringify({ error: message });
  }
}

// Controller - リクエスト処理と仲介
class TodoController {
  constructor(
    private model: TodoModel,
    private view: TodoView
  ) {}

  handleGetAll(): string {
    const todos = this.model.getAll();
    return this.view.renderList(todos);
  }

  handleCreate(title: string): string {
    if (!title.trim()) {
      return this.view.renderError("タイトルは必須です");
    }
    const todo = this.model.create(title);
    return this.view.renderOne(todo);
  }

  handleToggle(id: number): string {
    const todo = this.model.toggleComplete(id);
    if (!todo) return this.view.renderError("TODOが見つかりません");
    return this.view.renderOne(todo);
  }
}`}</code>
        </pre>
      </section>

      {/* MVP / MVVM */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">MVP と MVVM</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MVCの派生として、<strong className="text-violet-400">MVP</strong>と<strong className="text-violet-400">MVVM</strong>があります。
          それぞれ、ViewとModelの結合をさらに緩くする工夫がされています。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">MVP (Model-View-Presenter)</h3>
            <p className="text-gray-300 text-sm mb-2">ViewとModelが完全に分離。Presenterが仲介する。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>&#8226; ViewはPresenterへのイベント通知のみ</li>
              <li>&#8226; Presenterが全てのロジックを制御</li>
              <li>&#8226; テストしやすい（Viewをモック化できる）</li>
              <li>&#8226; Android開発で多く採用</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">MVVM (Model-View-ViewModel)</h3>
            <p className="text-gray-300 text-sm mb-2">データバインディングでViewとViewModelを自動同期。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>&#8226; ViewModelがUI状態を公開</li>
              <li>&#8226; データバインディングで自動反映</li>
              <li>&#8226; React, Vue, Angularが近い</li>
              <li>&#8226; フロントエンド開発で主流</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// MVVM的なアプローチ（React + カスタムフック）

// Model - ドメインロジック
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}

// ViewModel - UI状態とロジック（カスタムフック）
function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { users: filteredUsers, loading, searchQuery, setSearchQuery };
}

// View - UIの表示のみ
function UserListPage() {
  const { users, loading, searchQuery, setSearchQuery } = useUserList();

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="検索..."
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* レイヤードアーキテクチャ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">レイヤードアーキテクチャ（階層型）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">レイヤードアーキテクチャ</strong>は、アプリケーションを
          複数の水平層に分割するパターンです。各層は直下の層のみを呼び出します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 典型的な3層（4層）アーキテクチャ

// ┌─────────────────────────────┐
// │    Presentation Layer       │  ← Controller / Route Handler
// │    (プレゼンテーション層)      │
// ├─────────────────────────────┤
// │    Application Layer        │  ← UseCase / Service
// │    (アプリケーション層)        │
// ├─────────────────────────────┤
// │    Domain Layer             │  ← Entity / ValueObject
// │    (ドメイン層)               │
// ├─────────────────────────────┤
// │    Infrastructure Layer     │  ← Repository / External API
// │    (インフラストラクチャ層)     │
// └─────────────────────────────┘

// 例: ユーザー登録フロー

// Infrastructure Layer（データアクセス）
class UserRepository {
  async save(user: { name: string; email: string }) {
    // DBへの保存
    console.log("DB保存:", user);
    return { id: "1", ...user };
  }

  async findByEmail(email: string) {
    // DBからの検索
    return null;
  }
}

// Domain Layer（ビジネスルール）
class UserEntity {
  constructor(
    public readonly name: string,
    public readonly email: string
  ) {
    if (!name || name.length < 2) {
      throw new Error("名前は2文字以上必要です");
    }
    if (!email.includes("@")) {
      throw new Error("メールアドレスの形式が不正です");
    }
  }
}

// Application Layer（ユースケース）
class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(name: string, email: string) {
    // 既存ユーザーチェック
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error("このメールアドレスは既に登録されています");
    }

    // ドメインオブジェクト生成（バリデーション含む）
    const user = new UserEntity(name, email);

    // 永続化
    return await this.userRepo.save({
      name: user.name,
      email: user.email,
    });
  }
}

// Presentation Layer（APIハンドラ）
async function handleRegister(req: Request) {
  const body = await req.json();
  const useCase = new RegisterUserUseCase(new UserRepository());

  try {
    const user = await useCase.execute(body.name, body.email);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 400 }
    );
  }
}`}</code>
        </pre>
      </section>

      {/* クリーンアーキテクチャ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">クリーンアーキテクチャ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">クリーンアーキテクチャ</strong>は、Robert C. Martinが提唱した
          「依存関係を内側に向ける」設計方針です。ビジネスロジック（ドメイン）が
          フレームワークやDBなどの外部技術に依存しないようにします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// クリーンアーキテクチャの同心円（内側 → 外側）
//
//  ┌───────────────────────────────────────┐
//  │           Frameworks & Drivers        │  Express, React, PostgreSQL
//  │  ┌───────────────────────────────┐    │
//  │  │      Interface Adapters       │    │  Controllers, Gateways, Presenters
//  │  │  ┌───────────────────────┐    │    │
//  │  │  │    Application Layer  │    │    │  Use Cases
//  │  │  │  ┌───────────────┐    │    │    │
//  │  │  │  │   Entities    │    │    │    │  Domain Models
//  │  │  │  └───────────────┘    │    │    │
//  │  │  └───────────────────────┘    │    │
//  │  └───────────────────────────────┘    │
//  └───────────────────────────────────────┘
//
// ルール: 依存の方向は「外側 → 内側」のみ`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// クリーンアーキテクチャの実装例

// Entity（最内層 - 外部に依存しない）
class Order {
  constructor(
    public readonly id: string,
    public readonly items: { productId: string; quantity: number }[],
    public readonly status: "pending" | "confirmed" | "shipped"
  ) {}

  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  canCancel(): boolean {
    return this.status === "pending";
  }
}

// Use Case（アプリケーション層 - Entityに依存）
// ポートとしてインターフェースを定義
interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

interface NotificationService {
  notify(userId: string, message: string): Promise<void>;
}

class CancelOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private notifier: NotificationService
  ) {}

  async execute(orderId: string, userId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("注文が見つかりません");
    if (!order.canCancel()) throw new Error("この注文はキャンセルできません");

    const cancelled = new Order(order.id, order.items, "pending");
    await this.orderRepo.save(cancelled);
    await this.notifier.notify(userId, "注文がキャンセルされました");
  }
}

// Infrastructure（最外層 - Use Caseのインターフェースを実装）
class PostgresOrderRepository implements OrderRepository {
  async findById(id: string): Promise<Order | null> {
    // PostgreSQLからデータ取得
    return null;
  }
  async save(order: Order): Promise<void> {
    // PostgreSQLにデータ保存
  }
}

class EmailNotificationService implements NotificationService {
  async notify(userId: string, message: string): Promise<void> {
    // メールで通知
  }
}`}</code>
        </pre>
      </section>

      {/* DDD基礎 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">DDD（ドメイン駆動設計）の基礎</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">DDD（Domain-Driven Design）</strong>は、
          ビジネスの問題領域（ドメイン）を中心にソフトウェアを設計する手法です。
          Eric Evansが提唱しました。主要な構成要素を見てみましょう。
        </p>
        <div className="space-y-3 mb-6">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">Entity（エンティティ）</p>
            <p className="text-gray-400 text-sm">一意のIDを持つオブジェクト。例: ユーザー、注文、商品</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">Value Object（値オブジェクト）</p>
            <p className="text-gray-400 text-sm">IDを持たず値で比較されるオブジェクト。例: 住所、金額、メールアドレス</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">Aggregate（集約）</p>
            <p className="text-gray-400 text-sm">関連するEntityとValue Objectをまとめた単位。Aggregate Rootを通じてアクセスする</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">Repository（リポジトリ）</p>
            <p className="text-gray-400 text-sm">Aggregateの永続化と取得を抽象化するインターフェース</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">Domain Service（ドメインサービス）</p>
            <p className="text-gray-400 text-sm">EntityやValue Objectに属さないドメインロジック</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// DDD 構成要素の例 - ECサイトの注文ドメイン

// Value Object（値で比較。不変。）
class Money {
  constructor(
    readonly amount: number,
    readonly currency: string
  ) {
    if (amount < 0) throw new Error("金額は0以上です");
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("通貨が異なります");
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount
      && this.currency === other.currency;
  }
}

// Entity（一意のIDを持つ）
class OrderItem {
  constructor(
    readonly productId: string,
    readonly productName: string,
    readonly price: Money,
    readonly quantity: number
  ) {}

  getSubtotal(): Money {
    return new Money(
      this.price.amount * this.quantity,
      this.price.currency
    );
  }
}

// Aggregate Root（外部からはここを通じてアクセス）
class Order {
  private items: OrderItem[] = [];

  constructor(
    readonly id: string,
    readonly customerId: string,
    private status: "draft" | "placed" | "shipped" = "draft"
  ) {}

  addItem(item: OrderItem): void {
    if (this.status !== "draft") {
      throw new Error("確定済みの注文には追加できません");
    }
    this.items.push(item);
  }

  getTotal(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.getSubtotal()),
      new Money(0, "JPY")
    );
  }

  place(): void {
    if (this.items.length === 0) {
      throw new Error("商品がありません");
    }
    this.status = "placed";
  }
}`}</code>
        </pre>
      </section>

      {/* どう選ぶか */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">どのアーキテクチャを選ぶべきか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アーキテクチャの選択はプロジェクトの規模・複雑性・チーム体制によって変わります。
        </p>
        <div className="space-y-3">
          <div className="flex gap-3 items-start p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold shrink-0 w-32">小規模・個人</span>
            <p className="text-gray-300 text-sm">シンプルなMVCやレイヤードアーキテクチャで十分。過度な抽象化は避ける。</p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold shrink-0 w-32">中規模</span>
            <p className="text-gray-300 text-sm">レイヤードアーキテクチャ + SOLID原則。テスト容易性を意識した依存性注入。</p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold shrink-0 w-32">大規模・チーム</span>
            <p className="text-gray-300 text-sm">クリーンアーキテクチャやDDD。ドメインの複雑性をモデリングし、長期的な保守性を確保。</p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold shrink-0 w-32">マイクロサービス</span>
            <p className="text-gray-300 text-sm">各サービスにDDDの境界づけられたコンテキスト。サービス間はAPIで疎結合に。</p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-violet-400">MVC</strong> - Model/View/Controllerの3層分離。Webフレームワークの基本</li>
          <li><strong className="text-violet-400">MVP/MVVM</strong> - MVCの派生。フロントエンドではMVVM的アプローチが主流</li>
          <li><strong className="text-violet-400">レイヤードアーキテクチャ</strong> - 水平層に分割。上位層は下位層のみに依存</li>
          <li><strong className="text-violet-400">クリーンアーキテクチャ</strong> - 依存の方向を内側に統一。ドメインが外部技術に依存しない</li>
          <li><strong className="text-violet-400">DDD</strong> - ビジネスドメインを中心に設計。Entity、Value Object、Aggregateなど</li>
          <li>プロジェクトの規模と複雑性に応じて適切なアーキテクチャを選ぶ</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="design" lessonId="architecture" color="violet" />
      <LessonNav lessons={DESIGN_LESSONS} currentId="architecture" basePath="/learn/design" color="violet" />
    </div>
  );
}
