import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function PropsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Props</h1>
        <p className="text-gray-400">コンポーネントにデータを渡す仕組みを学ぼう</p>
      </div>

      {/* Propsとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Propsとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Props</strong>（プロパティの略）は、親コンポーネントから子コンポーネントに
          データを渡すための仕組みです。HTMLの属性のように、コンポーネントにデータを渡すことができます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Propsは<strong>読み取り専用</strong>です。子コンポーネントがPropsを直接変更することはできません。
          これにより、データの流れが「親 → 子」という一方向になり、アプリの動作が予測しやすくなります。
        </p>
      </section>

      {/* Propsの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Propsの基本的な使い方</h2>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 方法1: propsオブジェクトで受け取る
function Greeting(props) {
  return <h1>こんにちは、{props.name}さん！</h1>;
}

// 方法2: 分割代入で受け取る（推奨）
function GreetingV2({ name }) {
  return <h1>こんにちは、{name}さん！</h1>;
}

// 複数のPropsを渡す
function UserCard({ name, age, email }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>年齢: {age}歳</p>
      <p>メール: {email}</p>
    </div>
  );
}

// 親コンポーネントからデータを渡す
function App() {
  return (
    <div>
      <Greeting name="太郎" />
      <Greeting name="花子" />
      <UserCard name="田中太郎" age={25} email="taro@example.com" />
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          文字列は <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{'"..."'}</code> で、
          数値やオブジェクトは <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> で渡します。
        </p>
      </section>

      {/* さまざまな型のProps */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">さまざまな型のProps</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Propsにはあらゆるデータ型を渡すことができます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function Demo({
  text,        // 文字列
  count,       // 数値
  isActive,    // 真偽値
  items,       // 配列
  user,        // オブジェクト
  onClick,     // 関数
  children,    // 子要素
}) {
  return (
    <div>
      <p>{text}</p>
      <p>カウント: {count}</p>
      <p>状態: {isActive ? "有効" : "無効"}</p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p>ユーザー: {user.name}</p>
      <button onClick={onClick}>クリック</button>
      <div>{children}</div>
    </div>
  );
}

// 使い方
function App() {
  const handleClick = () => alert("クリック！");

  return (
    <Demo
      text="こんにちは"
      count={42}
      isActive={true}
      items={["りんご", "バナナ", "みかん"]}
      user={{ name: "太郎", age: 25 }}
      onClick={handleClick}
    >
      <p>これはchildren（子要素）です</p>
    </Demo>
  );
}`}</code>
        </pre>
      </section>

      {/* デフォルトProps */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトProps</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Propsが渡されなかった場合のデフォルト値を設定できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 分割代入のデフォルト値（推奨）
function Button({ label = "ボタン", color = "blue", size = "medium" }) {
  const sizeMap = {
    small: "8px 12px",
    medium: "12px 24px",
    large: "16px 32px",
  };

  return (
    <button
      style={{
        backgroundColor: color,
        padding: sizeMap[size],
        color: "white",
        border: "none",
        borderRadius: "6px",
      }}
    >
      {label}
    </button>
  );
}

function App() {
  return (
    <div>
      {/* すべてデフォルト値を使用 */}
      <Button />

      {/* 一部だけカスタマイズ */}
      <Button label="送信" color="green" />

      {/* すべてカスタマイズ */}
      <Button label="削除" color="red" size="small" />
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* TypeScriptでの型定義 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScriptでのProps型定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptを使う場合、Propsに型を定義することで安全にデータを受け渡しできます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// interfaceで型を定義
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isAdmin?: boolean;  // ?は省略可能（オプショナル）
}

function UserCard({ name, age, email, isAdmin = false }: UserCardProps) {
  return (
    <div className="card">
      <h2>{name} {isAdmin && "(管理者)"}</h2>
      <p>年齢: {age}歳</p>
      <p>メール: {email}</p>
    </div>
  );
}

// childrenを含む型
interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

function Layout({ title, children }: LayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      <main>{children}</main>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* スプレッド構文 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Propsのスプレッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オブジェクトのスプレッド構文を使って、Propsをまとめて渡すこともできます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function Profile({ name, age, email }) {
  return (
    <div>
      <p>名前: {name}</p>
      <p>年齢: {age}</p>
      <p>メール: {email}</p>
    </div>
  );
}

function App() {
  const userData = {
    name: "田中太郎",
    age: 25,
    email: "taro@example.com",
  };

  // スプレッドでまとめて渡す
  return <Profile {...userData} />;

  // 上記は以下と同じ意味：
  // <Profile name="田中太郎" age={25} email="taro@example.com" />
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>Propsは親から子へデータを渡す一方向のデータフロー</li>
          <li>分割代入で受け取るのが推奨パターン</li>
          <li>デフォルト値で、省略可能なPropsを設定できる</li>
          <li>TypeScriptのinterfaceで型安全にできる</li>
          <li>スプレッド構文でオブジェクトをまとめて渡せる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="props" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="props" basePath="/learn/react" color="green" />
    </div>
  );
}
