import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DESIGN_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "DRY原則の意味として正しいのはどれ？",
    options: [
      "コードを乾燥させる（最小化する）",
      "同じ知識を繰り返さない",
      "テストを書いてから実装する",
      "コードをシンプルに保つ",
    ],
    answer: 1,
    explanation: "DRY（Don't Repeat Yourself）は「同じ知識を繰り返すな」という原則です。共通のロジックは一箇所にまとめて管理します。",
  },
  {
    question: "YAGNI原則が警告しているのはどれ？",
    options: [
      "テストを書かないこと",
      "コードが複雑すぎること",
      "将来必要になるかもしれない機能を先回りして実装すること",
      "ドキュメントを書かないこと",
    ],
    answer: 2,
    explanation: "YAGNI（You Aren't Gonna Need It）は「今必要ないものは作るな」という原則です。必要になったときに追加すればよいのです。",
  },
  {
    question: "「低結合・高凝集」の設計で正しいのはどれ？",
    options: [
      "モジュール間の依存を強くし、モジュール内の関連性を弱くする",
      "モジュール間の依存を弱くし、モジュール内の関連性を強くする",
      "すべてのコードを1つのファイルにまとめる",
      "モジュールをできるだけ小さく分割する",
    ],
    answer: 1,
    explanation: "良い設計はモジュール間の依存（結合度）を低くし、モジュール内の関連性（凝集度）を高くすることを目指します。",
  },
];

export default function DesignBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">設計パターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設計の基本原則</h1>
        <p className="text-gray-400">良いコードとは何か？ DRY、KISS、YAGNIなど普遍的な原則を学ぼう</p>
      </div>

      {/* DRY原則 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">DRY原則 - Don&apos;t Repeat Yourself</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">DRY（Don&apos;t Repeat Yourself）</strong>は「同じことを繰り返すな」という原則です。
          同じロジックやデータが複数箇所に存在すると、変更時にすべての箇所を修正する必要があり、バグの温床になります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          共通のロジックは関数やクラスに抽出し、一箇所で管理しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: 同じバリデーションロジックが重複
function validateEmail(email: string): boolean {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

function validateContactForm(email: string) {
  // 同じ正規表現が重複している！
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!regex.test(email)) {
    throw new Error("Invalid email");
  }
}

// 良い例: 共通ロジックを一箇所にまとめる
function isValidEmail(email: string): boolean {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

function validateContactForm(email: string) {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email");
  }
}`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">注意</p>
          <p className="text-sm text-gray-300">
            DRYは「同じコード」ではなく「同じ知識」の重複を避ける原則です。
            見た目が似ているだけで本質的に異なるロジックを無理にまとめると、かえって複雑になります。
          </p>
        </div>
      </section>

      {/* KISS原則 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">KISS原則 - Keep It Simple, Stupid</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">KISS</strong>は「シンプルに保て」という原則です。
          不必要に複雑なコードは理解しにくく、バグが混入しやすく、保守コストが高くなります。
          最もシンプルな解決策を選びましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: 過度に複雑
function isEven(n: number): boolean {
  return n.toString(2).split("").reverse()[0] === "0";
}

// 良い例: シンプルで明快
function isEven(n: number): boolean {
  return n % 2 === 0;
}

// 悪い例: 不必要な抽象化
class NumberCheckerFactory {
  createChecker(type: string) {
    if (type === "even") return new EvenChecker();
    if (type === "odd") return new OddChecker();
  }
}

// 良い例: 必要十分なシンプルさ
const isEven = (n: number) => n % 2 === 0;
const isOdd = (n: number) => n % 2 !== 0;`}</code>
        </pre>
      </section>

      {/* YAGNI原則 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">YAGNI原則 - You Aren&apos;t Gonna Need It</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">YAGNI</strong>は「今必要ないものは作るな」という原則です。
          将来必要になるかもしれない機能を先回りして実装すると、使われないコードが増え、複雑性だけが上がります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: "将来使うかも"で不要な機能を実装
interface UserService {
  getUser(id: string): User;
  createUser(data: CreateUserDto): User;
  updateUser(id: string, data: UpdateUserDto): User;
  deleteUser(id: string): void;
  exportUsersToCSV(): string;      // まだ要件にない
  importUsersFromCSV(): void;       // まだ要件にない
  generateUserReport(): Report;     // まだ要件にない
  bulkUpdateUsers(): void;          // まだ要件にない
}

// 良い例: 今必要な機能だけを実装
interface UserService {
  getUser(id: string): User;
  createUser(data: CreateUserDto): User;
  updateUser(id: string, data: UpdateUserDto): User;
  deleteUser(id: string): void;
}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          必要になったときに追加すればよいのです。アジャイル開発では「必要最小限」を素早く実装し、
          フィードバックに基づいて改善するアプローチが重視されます。
        </p>
      </section>

      {/* 関心の分離 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">関心の分離 (Separation of Concerns)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">関心の分離</strong>とは、プログラムを「それぞれ異なる関心事を扱う部分」に分割することです。
          UI、ビジネスロジック、データアクセスなど、異なる責務を持つコードは分けて管理しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: すべてが混在
async function handleSubmit(formData: FormData) {
  // バリデーション（ビジネスロジック）
  if (!formData.get("email")) throw new Error("Email required");
  // データベース操作（データアクセス）
  const db = await connectDB();
  await db.collection("users").insertOne({
    email: formData.get("email"),
    name: formData.get("name"),
  });
  // メール送信（外部サービス）
  await sendEmail(formData.get("email") as string, "Welcome!");
  // HTMLレスポンス（UI）
  return "<h1>登録完了</h1>";
}

// 良い例: 関心ごとに分離
// validator.ts
function validateUser(data: CreateUserDto): ValidationResult {
  if (!data.email) return { valid: false, error: "Email required" };
  return { valid: true };
}

// userRepository.ts
async function saveUser(data: CreateUserDto): Promise<User> {
  return await db.collection("users").insertOne(data);
}

// emailService.ts
async function sendWelcomeEmail(email: string): Promise<void> {
  await sendEmail(email, "Welcome!");
}

// userController.ts
async function handleSubmit(formData: FormData) {
  const data = parseFormData(formData);
  const validation = validateUser(data);
  if (!validation.valid) throw new Error(validation.error);
  const user = await saveUser(data);
  await sendWelcomeEmail(user.email);
  return user;
}`}</code>
        </pre>
      </section>

      {/* 結合度と凝集度 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">結合度と凝集度 (Coupling vs Cohesion)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          良い設計は<strong className="text-violet-400">低結合・高凝集</strong>を目指します。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">結合度 (Coupling) - 低いほど良い</h3>
            <p className="text-gray-300 text-sm mb-2">モジュール間の依存の強さ。結合度が高いと、一つの変更が他の多くの箇所に波及します。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>&#8226; インターフェースを介して通信する</li>
              <li>&#8226; 具象クラスではなく抽象に依存する</li>
              <li>&#8226; グローバル変数を避ける</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">凝集度 (Cohesion) - 高いほど良い</h3>
            <p className="text-gray-300 text-sm mb-2">モジュール内の要素がどれだけ関連し合っているか。凝集度が高いと、モジュールの目的が明確になります。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>&#8226; 一つのモジュールは一つの目的</li>
              <li>&#8226; 関連する機能をまとめる</li>
              <li>&#8226; 無関係な機能を混ぜない</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 悪い例: 高結合 - UserServiceがDBの内部実装に直接依存
class UserService {
  async getUser(id: string) {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    const db = client.db("myapp");
    return await db.collection("users").findOne({ _id: id });
  }
}

// 良い例: 低結合 - インターフェースで依存を抽象化
interface UserRepository {
  findById(id: string): Promise<User | null>;
}

class UserService {
  constructor(private repo: UserRepository) {}

  async getUser(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }
}

// MongoDBでもPostgreSQLでもテスト用モックでも差し替え可能`}</code>
        </pre>
      </section>

      {/* コードの臭い */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コードスメル (Code Smells)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">コードスメル</strong>とは、コードに問題がある可能性を示すサインです。
          バグではありませんが、放置すると将来的に問題を引き起こします。
        </p>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">長すぎる関数 (Long Method)</p>
            <p className="text-gray-400 text-sm">50行以上の関数は分割を検討。一つの関数は一つのことだけ行う。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">神クラス (God Class)</p>
            <p className="text-gray-400 text-sm">何でもできる巨大なクラス。責務を分割して複数のクラスにする。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">マジックナンバー (Magic Number)</p>
            <p className="text-gray-400 text-sm">意味のない数値リテラル。定数として名前を付ける。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">過剰なコメント (Excessive Comments)</p>
            <p className="text-gray-400 text-sm">コメントが必要なほど複雑なコードは、コード自体を改善すべき。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-violet-400 font-semibold text-sm">フィーチャーエンヴィー (Feature Envy)</p>
            <p className="text-gray-400 text-sm">他のクラスのデータに頻繁にアクセスする関数。そのクラスに移動すべき。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`// 悪い例: マジックナンバー
if (user.age >= 18 && order.total >= 5000) {
  applyDiscount(order, 0.1);
}

// 良い例: 名前付き定数
const MINIMUM_AGE = 18;
const DISCOUNT_THRESHOLD = 5000;
const DISCOUNT_RATE = 0.1;

if (user.age >= MINIMUM_AGE && order.total >= DISCOUNT_THRESHOLD) {
  applyDiscount(order, DISCOUNT_RATE);
}`}</code>
        </pre>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="violet" />
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-violet-400">DRY</strong> - 同じ知識を繰り返さない。共通ロジックは一箇所にまとめる</li>
          <li><strong className="text-violet-400">KISS</strong> - シンプルに保つ。不必要な複雑さを避ける</li>
          <li><strong className="text-violet-400">YAGNI</strong> - 今必要ないものは作らない。必要になったら追加する</li>
          <li><strong className="text-violet-400">関心の分離</strong> - 異なる責務のコードは別のモジュールに分ける</li>
          <li><strong className="text-violet-400">低結合・高凝集</strong> - モジュール間の依存は最小限に、モジュール内の関連性は最大限に</li>
          <li><strong className="text-violet-400">コードスメル</strong> - 問題のサインを見逃さず、早めにリファクタリングする</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="design" lessonId="basics" color="violet" />
      <LessonNav lessons={DESIGN_LESSONS} currentId="basics" basePath="/learn/design" color="violet" />
    </div>
  );
}
