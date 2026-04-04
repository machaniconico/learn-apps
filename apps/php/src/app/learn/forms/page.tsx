import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("forms");

const quizQuestions: QuizQuestion[] = [
  {
    question: "$_POSTと$_GETの違いは何ですか？",
    options: [
      "$_POSTはURLに値が表示され、$_GETは表示されない",
      "$_GETはURLに値が表示され、$_POSTは表示されない",
      "$_POSTはGETリクエストで使う",
      "違いはない",
    ],
    answer: 1,
    explanation: "$_GETはクエリ文字列としてURLに値が表示されます。$_POSTはリクエストボディに含まれるためURLには表示されません。",
  },
  {
    question: "セッションを開始するための関数はどれですか？",
    options: ["session_create()", "session_begin()", "session_start()", "start_session()"],
    answer: 2,
    explanation: "session_start()でセッションを開始します。この関数はHTMLを出力する前に呼び出す必要があります。",
  },
  {
    question: "クッキーを設定する関数はどれですか？",
    options: ["cookie_set()", "setcookie()", "set_cookie()", "cookie_create()"],
    answer: 1,
    explanation: "setcookie()関数でクッキーを設定します。名前、値、有効期限などを指定できます。",
  },
  {
    question: "ページをリダイレクトするために使うheader()の書き方はどれですか？",
    options: [
      "header('Redirect: url')",
      "header('Location: url')",
      "header('Move: url')",
      "header('Forward: url')",
    ],
    answer: 1,
    explanation: "header('Location: URL')でリダイレクトします。この後にexit;を呼ぶのがベストプラクティスです。",
  },
];

export default function FormsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">フォーム・HTTP</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPでのフォーム処理とHTTP通信の基礎を学びましょう。GETとPOSTの違い、フォームバリデーション、ファイルアップロード、セッション・クッキー管理など、Webアプリ開発の核心技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="forms" totalLessons={6} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/forms" color="indigo" categoryId="forms" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォームデータの処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">$_GET</code>や<code className="text-indigo-300">$_POST</code>を使ってフォームから送信されたデータを受け取ります。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// GETパラメータのシミュレーション\n$_GET['name'] = '田中太郎';\n$_GET['age'] = '25';\n\n$name = htmlspecialchars($_GET['name'] ?? '');\n$age = (int)($_GET['age'] ?? 0);\n\nif ($name === '') {\n    echo "エラー: 名前は必須です\\n";\n} elseif ($age < 0 || $age > 150) {\n    echo "エラー: 年齢が無効です\\n";\n} else {\n    echo "名前: " . $name . "\\n";\n    echo "年齢: " . $age . "歳";\n}`}
          expectedOutput={`名前: 田中太郎\n年齢: 25歳`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セッション管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">session_start()</code>でセッションを開始し、<code className="text-indigo-300">$_SESSION</code>にデータを保存します。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// セッションのシミュレーション\n$_SESSION = [];\n\nfunction sessionSet(string $key, $value): void {\n    $_SESSION[$key] = $value;\n}\n\nfunction sessionGet(string $key, $default = null) {\n    return $_SESSION[$key] ?? $default;\n}\n\nsessionSet('user_id', 42);\nsessionSet('username', 'yamada_hanako');\nsessionSet('logged_in', true);\n\nif (sessionGet('logged_in')) {\n    echo "ログイン済み\\n";\n    echo "ユーザーID: " . sessionGet('user_id') . "\\n";\n    echo "ユーザー名: " . sessionGet('username');\n}`}
          expectedOutput={`ログイン済み\nユーザーID: 42\nユーザー名: yamada_hanako`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
