"use client";

import { useState } from "react";
import Link from "next/link";
import { saveFinalExamScore } from "@/lib/progress";

interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "HTMLで段落を表すタグはどれですか？",
    options: ["<div>", "<span>", "<p>", "<br>"],
    answer: 2,
    explanation: "<p>タグは paragraph（段落）の略で、テキストの段落を定義します。",
  },
  {
    question: "CSSのFlexboxで主軸方向を変更するプロパティはどれですか？",
    options: ["align-items", "flex-wrap", "flex-direction", "justify-content"],
    answer: 2,
    explanation: "flex-direction は主軸の方向を row（横）や column（縦）に設定します。",
  },
  {
    question: "JavaScriptで配列の各要素を変換して新しい配列を返すメソッドはどれですか？",
    options: ["filter()", "reduce()", "forEach()", "map()"],
    answer: 3,
    explanation: "map() は各要素にコールバックを適用し、その結果で新しい配列を生成します。",
  },
  {
    question: "Reactでコンポーネントの状態を管理するフックはどれですか？",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    answer: 2,
    explanation: "useState はコンポーネント内の状態変数を宣言し、更新関数を返します。",
  },
  {
    question: "Node.jsの特徴として正しいものはどれですか？",
    options: [
      "マルチスレッドで並列処理を行う",
      "シングルスレッド・イベントループ方式",
      "ブラウザ内でのみ動作する",
      "Pythonで書かれている",
    ],
    answer: 1,
    explanation: "Node.js はシングルスレッドのイベントループモデルで非同期I/Oを効率的に処理します。",
  },
  {
    question: "SQLで特定の条件に合うデータを取得するキーワードはどれですか？",
    options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
    answer: 2,
    explanation: "WHERE句は行をフィルタリングする条件を指定します。",
  },
  {
    question: "TypeScriptで変数の型を明示的に指定する構文はどれですか？",
    options: [
      "let x = number;",
      "let x: number;",
      "let number x;",
      "let x as number;",
    ],
    answer: 1,
    explanation: "TypeScriptでは変数名の後にコロンと型名を記述して型注釈を行います。",
  },
  {
    question: "Gitで変更をステージングエリアに追加するコマンドはどれですか？",
    options: ["git commit", "git push", "git add", "git pull"],
    answer: 2,
    explanation: "git add はワーキングディレクトリの変更をステージングエリアに追加します。",
  },
  {
    question: "CSSのbox-modelで、要素の内側の余白を指定するプロパティはどれですか？",
    options: ["margin", "border", "padding", "outline"],
    answer: 2,
    explanation: "paddingは要素のコンテンツとボーダーの間の内側余白を指定します。",
  },
  {
    question: "Next.jsでサーバーコンポーネントからクライアントコンポーネントにするには何を記述しますか？",
    options: [
      "\"use server\"",
      "\"use client\"",
      "export const dynamic = true",
      "import \"client\"",
    ],
    answer: 1,
    explanation: "ファイル先頭に \"use client\" を記述するとクライアントコンポーネントになります。",
  },
  {
    question: "JavaScriptのPromiseで、非同期処理の完了を待つキーワードはどれですか？",
    options: ["yield", "async", "await", "defer"],
    answer: 2,
    explanation: "await はPromiseが解決されるまで実行を一時停止し、結果を返します。",
  },
  {
    question: "Reactで副作用（データ取得など）を実行するフックはどれですか？",
    options: ["useState", "useContext", "useEffect", "useCallback"],
    answer: 2,
    explanation: "useEffect はレンダリング後に副作用を実行するためのフックです。",
  },
  {
    question: "HTTPステータスコード404が意味するものはどれですか？",
    options: [
      "サーバーエラー",
      "リダイレクト",
      "リソースが見つからない",
      "認証が必要",
    ],
    answer: 2,
    explanation: "404 Not Found は要求されたリソースがサーバーに存在しないことを示します。",
  },
  {
    question: "データベースのリレーションで「1対多」を表すのはどれですか？",
    options: [
      "1つのユーザーが1つのプロフィール",
      "1つのユーザーが複数の投稿",
      "複数のタグが複数の記事",
      "1つのテーブルに1つのカラム",
    ],
    answer: 1,
    explanation: "1人のユーザーが複数の投稿を持つ関係は典型的な1対多リレーションです。",
  },
  {
    question: "テスト駆動開発（TDD）の正しい手順はどれですか？",
    options: [
      "実装 → テスト → リファクタリング",
      "テスト → 実装 → リファクタリング",
      "リファクタリング → テスト → 実装",
      "テスト → リファクタリング → 実装",
    ],
    answer: 1,
    explanation: "TDDでは Red（テスト失敗）→ Green（実装）→ Refactor の順で進めます。",
  },
  {
    question: "CSSのposition: stickyの動作として正しいものはどれですか？",
    options: [
      "常に画面に固定される",
      "スクロール位置に応じてrelativeとfixedが切り替わる",
      "親要素の先頭に固定される",
      "absoluteと同じ動作をする",
    ],
    answer: 1,
    explanation: "stickyはスクロール位置に応じてrelativeとfixedの動作を切り替えます。",
  },
  {
    question: "GraphQLでデータを取得するための操作はどれですか？",
    options: ["mutation", "subscription", "query", "schema"],
    answer: 2,
    explanation: "GraphQLのqueryはサーバーからデータを読み取るための操作です。",
  },
  {
    question: "XSS（クロスサイトスクリプティング）攻撃への対策として最も重要なものはどれですか？",
    options: [
      "HTTPSの使用",
      "ユーザー入力のエスケープ処理",
      "パスワードのハッシュ化",
      "CORSの設定",
    ],
    answer: 1,
    explanation: "XSS対策ではユーザー入力を適切にエスケープ・サニタイズすることが最も重要です。",
  },
  {
    question: "アジャイル開発のスプリントとは何ですか？",
    options: [
      "プロジェクト全体の計画期間",
      "1～4週間の固定された開発サイクル",
      "バグ修正のための特別期間",
      "リリース前のテスト期間",
    ],
    answer: 1,
    explanation: "スプリントは1～4週間の固定期間で、計画からレビューまでを繰り返します。",
  },
  {
    question: "WebSocketの特徴として正しいものはどれですか？",
    options: [
      "リクエスト・レスポンス型の通信のみ",
      "サーバーからクライアントへの双方向通信が可能",
      "HTTPと同じプロトコル",
      "データの暗号化が不可能",
    ],
    answer: 1,
    explanation: "WebSocketはサーバーとクライアント間で双方向のリアルタイム通信を可能にします。",
  },
];

export default function FinalExamPage() {
  const [mounted] = useState(() => typeof window !== "undefined");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="animate-pulse h-8 w-64 bg-gray-800 rounded mb-8" />
      </div>
    );
  }

  const q = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;
  const progressPercent = finished
    ? 100
    : Math.round((currentQ / totalQ) * 100);

  function handleSelect(idx: number) {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);

    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);

    if (idx === q.answer) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ < totalQ - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      // score is already updated via setState; compute from answers
      let correct = 0;
      const updatedAnswers = [...answers];
      updatedAnswers[currentQ] = selected;
      for (let i = 0; i < totalQ; i++) {
        if (updatedAnswers[i] === QUESTIONS[i].answer) correct++;
      }
      const computedScore = Math.round((correct / totalQ) * 100);
      saveFinalExamScore(computedScore);
      setScore(correct);
      setFinished(true);
    }
  }

  function handleRetry() {
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
  }

  if (finished) {
    const finalPercent = Math.round((score / totalQ) * 100);
    const passed = finalPercent >= 80;

    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-white mb-8">
          最終試験 - 結果
        </h1>

        <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center">
          <div
            className={`text-6xl font-extrabold mb-4 ${
              passed ? "text-green-400" : "text-red-400"
            }`}
          >
            {finalPercent}点
          </div>
          <p className="text-xl text-gray-300 mb-2">
            {score}/{totalQ} 問正解
          </p>
          <div
            className={`inline-block px-4 py-2 rounded-full text-lg font-bold mb-6 ${
              passed
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {passed ? "合格" : "不合格"}
          </div>
          <p className="text-gray-400 mb-8">
            {passed
              ? "おめでとうございます！全課程の修了証明書を取得できます。"
              : "80点以上で合格です。もう一度挑戦してみましょう！"}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleRetry}
              className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
            >
              もう一度挑戦
            </button>
            {passed && (
              <Link
                href="/certificate"
                className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
              >
                修了証明書を見る
              </Link>
            )}
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
            >
              ダッシュボードに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-white mb-2">最終試験</h1>
      <p className="text-gray-400 mb-6">
        全{totalQ}問 / 80点以上で合格
      </p>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>
            第{currentQ + 1}問 / 全{totalQ}問
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 mb-6">
        <h2 className="text-lg font-bold text-white mb-6">
          Q{currentQ + 1}. {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let classes =
              "w-full text-left px-4 py-3 rounded-xl border transition-colors font-medium ";

            if (!showExplanation) {
              classes +=
                "border-gray-700 bg-gray-800 text-gray-200 hover:border-indigo-500 hover:bg-gray-750 cursor-pointer";
            } else if (idx === q.answer) {
              classes +=
                "border-green-500 bg-green-500/10 text-green-400";
            } else if (idx === selected && idx !== q.answer) {
              classes += "border-red-500 bg-red-500/10 text-red-400";
            } else {
              classes +=
                "border-gray-700 bg-gray-800 text-gray-500";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={classes}
              >
                <span className="mr-2 text-gray-500">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 rounded-xl bg-gray-800 border border-gray-700">
            <p className="text-sm font-medium text-indigo-400 mb-1">解説</p>
            <p className="text-gray-300 text-sm">{q.explanation}</p>
          </div>
        )}
      </div>

      {showExplanation && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            {currentQ < totalQ - 1 ? "次の問題へ" : "結果を見る"}
          </button>
        </div>
      )}
    </div>
  );
}
