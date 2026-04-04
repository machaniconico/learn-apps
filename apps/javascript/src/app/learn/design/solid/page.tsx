import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DESIGN_LESSONS } from "@/lib/lessons-data";

export default function SolidLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">設計パターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SOLID原則</h1>
        <p className="text-gray-400">オブジェクト指向設計の5大原則をTypeScriptで理解しよう</p>
      </div>

      {/* SOLIDとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SOLID原則とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">SOLID</strong>は、Robert C. Martin（Uncle Bob）が提唱した
          オブジェクト指向設計の5つの原則の頭文字です。
          これらの原則に従うことで、変更に強く、理解しやすく、再利用可能なソフトウェアを作ることができます。
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3 items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold text-lg w-8">S</span>
            <div>
              <span className="text-white font-semibold">Single Responsibility Principle</span>
              <span className="text-gray-400 ml-2">- 単一責任の原則</span>
            </div>
          </div>
          <div className="flex gap-3 items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold text-lg w-8">O</span>
            <div>
              <span className="text-white font-semibold">Open/Closed Principle</span>
              <span className="text-gray-400 ml-2">- 開放閉鎖の原則</span>
            </div>
          </div>
          <div className="flex gap-3 items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold text-lg w-8">L</span>
            <div>
              <span className="text-white font-semibold">Liskov Substitution Principle</span>
              <span className="text-gray-400 ml-2">- リスコフの置換原則</span>
            </div>
          </div>
          <div className="flex gap-3 items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold text-lg w-8">I</span>
            <div>
              <span className="text-white font-semibold">Interface Segregation Principle</span>
              <span className="text-gray-400 ml-2">- インターフェース分離の原則</span>
            </div>
          </div>
          <div className="flex gap-3 items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="text-violet-400 font-bold text-lg w-8">D</span>
            <div>
              <span className="text-white font-semibold">Dependency Inversion Principle</span>
              <span className="text-gray-400 ml-2">- 依存性逆転の原則</span>
            </div>
          </div>
        </div>
      </section>

      {/* SRP */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">S - 単一責任の原則 (SRP)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">クラスを変更する理由は、たった一つであるべき</strong>です。
          一つのクラスは一つの責務だけを持ち、その責務に関することだけを行います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: Userクラスが複数の責任を持っている
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  // ユーザーデータの管理（責務1）
  changeName(newName: string) {
    this.name = newName;
  }

  // データベース操作（責務2）
  saveToDatabase() {
    // DB保存ロジック...
  }

  // メール送信（責務3）
  sendWelcomeEmail() {
    // メール送信ロジック...
  }

  // PDF生成（責務4）
  generateReport(): string {
    return \`Report for \${this.name}\`;
  }
}

// 良い例: 責務ごとにクラスを分離
class User {
  constructor(
    public name: string,
    public email: string
  ) {}

  changeName(newName: string) {
    this.name = newName;
  }
}

class UserRepository {
  async save(user: User): Promise<void> {
    // DB保存ロジック
  }

  async findById(id: string): Promise<User | null> {
    // DB検索ロジック
    return null;
  }
}

class EmailService {
  async sendWelcomeEmail(user: User): Promise<void> {
    // メール送信ロジック
  }
}

class UserReportGenerator {
  generate(user: User): string {
    return \`Report for \${user.name}\`;
  }
}`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-sm text-violet-400 font-semibold mb-1">ポイント</p>
          <p className="text-sm text-gray-300">
            「変更する理由が一つ」とは、「DBの仕様が変わった」「メールの仕様が変わった」など、
            異なる変更理由でクラスを修正しなくて済むということです。
          </p>
        </div>
      </section>

      {/* OCP */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">O - 開放閉鎖の原則 (OCP)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">拡張に対して開いており、修正に対して閉じている</strong>べきです。
          既存のコードを変更せずに、新しい機能を追加できるように設計します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: 新しい割引種別を追加するたびに既存コードを修正
function calculateDiscount(type: string, price: number): number {
  if (type === "student") {
    return price * 0.2;
  } else if (type === "senior") {
    return price * 0.3;
  } else if (type === "member") {  // 追加のたびにif文が増える
    return price * 0.15;
  }
  return 0;
}

// 良い例: インターフェースで拡張ポイントを設ける
interface DiscountStrategy {
  calculate(price: number): number;
}

class StudentDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price * 0.2;
  }
}

class SeniorDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price * 0.3;
  }
}

// 新しい割引を追加しても既存コードに触らなくてよい
class MemberDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price * 0.15;
  }
}

class PriceCalculator {
  calculateDiscount(strategy: DiscountStrategy, price: number): number {
    return strategy.calculate(price);
  }
}`}</code>
        </pre>
      </section>

      {/* LSP */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">L - リスコフの置換原則 (LSP)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">子クラスは親クラスの代わりに使えなければならない</strong>。
          サブタイプは、スーパータイプの契約（期待される振る舞い）を破ってはいけません。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: LSP違反 - 正方形は長方形のサブタイプとして機能しない
class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(w: number) { this.width = w; }
  setHeight(h: number) { this.height = h; }
  getArea(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w: number) {
    this.width = w;
    this.height = w;  // 正方形なので高さも変わる
  }
  setHeight(h: number) {
    this.width = h;   // 正方形なので幅も変わる
    this.height = h;
  }
}

// Rectangleを期待するコードが壊れる
function doubleWidth(rect: Rectangle) {
  const oldHeight = rect.getArea() / 10; // 仮に幅10の場合
  rect.setWidth(20);
  // Squareだと高さも変わるので予期しない結果に！
}

// 良い例: 共通インターフェースで正しく設計
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  getArea(): number { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  getArea(): number { return this.side * this.side; }
}

// どちらのShapeでも安全に使える
function printArea(shape: Shape) {
  console.log(\`面積: \${shape.getArea()}\`);
}`}</code>
        </pre>
      </section>

      {/* ISP */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">I - インターフェース分離の原則 (ISP)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">クライアントは使わないメソッドへの依存を強制されるべきではない</strong>。
          大きなインターフェースは、より小さく具体的なインターフェースに分割すべきです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: 巨大なインターフェース
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
  attendMeeting(): void;
  writeReport(): void;
}

// ロボットWorkerはeat()やsleep()を実装できない！
class RobotWorker implements Worker {
  work() { /* OK */ }
  eat() { throw new Error("ロボットは食べません"); }  // 不自然
  sleep() { throw new Error("ロボットは寝ません"); }  // 不自然
  attendMeeting() { /* OK */ }
  writeReport() { /* OK */ }
}

// 良い例: 役割ごとにインターフェースを分離
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

interface Reportable {
  writeReport(): void;
}

// 人間: すべてを実装
class HumanWorker implements Workable, Eatable, Sleepable, Reportable {
  work() { console.log("Working..."); }
  eat() { console.log("Eating lunch..."); }
  sleep() { console.log("Sleeping..."); }
  writeReport() { console.log("Writing report..."); }
}

// ロボット: 必要なものだけ実装
class RobotWorker implements Workable, Reportable {
  work() { console.log("Working efficiently..."); }
  writeReport() { console.log("Generating report..."); }
}`}</code>
        </pre>
      </section>

      {/* DIP */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">D - 依存性逆転の原則 (DIP)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">上位モジュールは下位モジュールに依存すべきでない。両方とも抽象に依存すべきである</strong>。
          具体的な実装ではなく、インターフェース（抽象）に依存するようにします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: 上位モジュールが下位モジュールの具象に直接依存
class MySQLDatabase {
  save(data: string): void {
    console.log(\`MySQL: \${data} を保存\`);
  }
}

class UserService {
  private db = new MySQLDatabase();  // 具象クラスに直接依存

  createUser(name: string) {
    this.db.save(name);
    // MySQLからPostgreSQLに変更したい場合、
    // UserServiceのコードを修正する必要がある
  }
}

// 良い例: 抽象（インターフェース）に依存
interface Database {
  save(data: string): void;
  find(id: string): string | null;
}

class MySQLDatabase implements Database {
  save(data: string): void {
    console.log(\`MySQL: \${data} を保存\`);
  }
  find(id: string): string | null {
    return null;
  }
}

class PostgreSQLDatabase implements Database {
  save(data: string): void {
    console.log(\`PostgreSQL: \${data} を保存\`);
  }
  find(id: string): string | null {
    return null;
  }
}

class UserService {
  // 抽象（インターフェース）に依存
  constructor(private db: Database) {}

  createUser(name: string) {
    this.db.save(name);
  }
}

// 使う側で具象を注入（Dependency Injection）
const mysqlService = new UserService(new MySQLDatabase());
const pgService = new UserService(new PostgreSQLDatabase());`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-sm text-violet-400 font-semibold mb-1">依存性注入（DI）のメリット</p>
          <p className="text-sm text-gray-300">
            テスト時にモックを注入できる、実装を差し替えやすい、
            モジュール間の結合度が下がるなど、多くのメリットがあります。
          </p>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-violet-400">SRP</strong> - クラスの変更理由は一つだけ。責務を分離する</li>
          <li><strong className="text-violet-400">OCP</strong> - 既存コードを変更せずに拡張できるように設計する</li>
          <li><strong className="text-violet-400">LSP</strong> - サブタイプは親タイプと同じように安全に使えること</li>
          <li><strong className="text-violet-400">ISP</strong> - 巨大なインターフェースは小さく分割する</li>
          <li><strong className="text-violet-400">DIP</strong> - 具象ではなく抽象に依存する。依存性注入を活用する</li>
          <li>SOLID原則はすべてが連携しており、組み合わせて使うことで効果を発揮する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="design" lessonId="solid" color="violet" />
      <LessonNav lessons={DESIGN_LESSONS} currentId="solid" basePath="/learn/design" color="violet" />
    </div>
  );
}
