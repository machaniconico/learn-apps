"use client";

import { useState } from "react";
import Link from "next/link";
import { saveFinalExamScore } from "@/lib/progress";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "基礎",
    question: "printとdebugPrintの違いとして正しいのはどれですか？",
    options: [
      "printはデバッグ専用、debugPrintは本番向け",
      "printは通常の文字列表現を出力し、debugPrintはString(reflecting:)相当の詳細表現を出力する",
      "どちらも同じ出力をする",
      "debugPrintはエラーストリームに出力する",
    ],
    correctIndex: 1,
    explanation: "`print` はString(describing:)相当の読みやすい表現を出力します。`debugPrint` はString(reflecting:)相当の詳細表現（文字列はクォート付きなど）を出力し、デバッグ時により多くの情報を確認できます。",
  },
  {
    id: 2,
    category: "基礎",
    question: "letとvarの違いとして正しいのはどれですか？",
    options: [
      "letは参照型、varは値型に使う",
      "letは定数宣言で再代入不可、varは変数宣言で再代入可能",
      "letはグローバルスコープのみ、varはローカルスコープのみ使える",
      "どちらも同じで好みで使い分ける",
    ],
    correctIndex: 1,
    explanation: "`let` は定数宣言で一度代入した値は変更できません。`var` は変数宣言で後から値を変更できます。Swiftでは可能な限り `let` を使うことが推奨されています。",
  },
  {
    id: 3,
    category: "型システム",
    question: "Optionalのアンラップ方法として最も安全なのはどれですか？",
    options: [
      "強制アンラップ（!）を常に使う",
      "if letまたはguard letによるオプショナルバインディング",
      "as!によるキャスト",
      "nilチェックせずそのまま使う",
    ],
    correctIndex: 1,
    explanation: "`if let` や `guard let` によるオプショナルバインディングは、値がnilの場合にクラッシュせず安全にアンラップできます。強制アンラップ（`!`）はnilのときランタイムエラーになるため避けるべきです。",
  },
  {
    id: 4,
    category: "基礎",
    question: "guard文の特徴として正しいのはどれですか？",
    options: [
      "条件が真のときelseブロックを実行する",
      "条件が偽のときelseブロックで早期脱出し、真なら後続コードで変数を使い続けられる",
      "ループを抜けるためだけに使う",
      "Optional以外には使えない",
    ],
    correctIndex: 1,
    explanation: "`guard` は条件が偽のときelseブロックを実行して早期リターンします。条件が真の場合、アンラップされた変数はguard文より後のスコープでも使い続けられる点がif letと異なります。",
  },
  {
    id: 5,
    category: "基礎",
    question: "Swiftのswitch文について正しいのはどれですか？",
    options: [
      "breakを書かないと次のcaseに fall-through する",
      "全ケースを網羅する必要があり、デフォルトではfall-throughしない",
      "整数型にしか使えない",
      "caseは最大10個まで書ける",
    ],
    correctIndex: 1,
    explanation: "Swiftの `switch` は全ケースを網羅する必要があり（exhaustive）、デフォルトではfall-throughしません。文字列・enum・タプル・範囲など様々な型に対してパターンマッチングができます。",
  },
  {
    id: 6,
    category: "並行処理",
    question: "クロージャのキャプチャセマンティクスについて正しいのはどれですか？",
    options: [
      "クロージャは外部変数の値をコピーして保持する（値型の場合）",
      "クロージャは常に参照をキャプチャし、外部変数を直接変更できる",
      "クロージャは外部変数にアクセスできない",
      "キャプチャリストは不要で自動的に最適化される",
    ],
    correctIndex: 0,
    explanation: "クロージャは参照型（class）は参照を、値型（struct/Int等）は値をキャプチャします。`[weak self]` のようなキャプチャリストを使うと参照の強度を制御でき、循環参照を防げます。",
  },
  {
    id: 7,
    category: "型システム",
    question: "structとclassの最大の違いはどれですか？",
    options: [
      "structはメソッドを持てない",
      "structは値型でコピーされ、classは参照型で参照共有される",
      "classはプロトコルに準拠できない",
      "structはinitializerを定義できない",
    ],
    correctIndex: 1,
    explanation: "`struct` は値型で代入・関数渡しの際にコピーされます。`class` は参照型で同一インスタンスを複数箇所から参照します。structは継承不可・deinitなしという違いもありますが、最大の違いは値型vs参照型です。",
  },
  {
    id: 8,
    category: "プロトコル・ジェネリクス",
    question: "protocol extensionの用途として正しいのはどれですか？",
    options: [
      "プロトコルに継承関係を持たせる",
      "プロトコルのメソッドにデフォルト実装を提供してコードの再利用を促進する",
      "プロトコルの準拠をオプションにする",
      "クラスにのみ適用できる特殊な機能を追加する",
    ],
    correctIndex: 1,
    explanation: "protocol extensionを使うとプロトコルのメソッドにデフォルト実装を提供できます。準拠する型はデフォルト実装をそのまま使うか上書きするかを選べ、プロトコル指向プログラミングの核心機能です。",
  },
  {
    id: 9,
    category: "プロトコル・ジェネリクス",
    question: "ジェネリクスの型制約（where句や: Protocol）の役割は何ですか？",
    options: [
      "型パラメータを特定の型に固定する",
      "型パラメータが特定のプロトコルに準拠していることをコンパイル時に保証する",
      "実行時に型を動的に変換する",
      "型パラメータの数を制限する",
    ],
    correctIndex: 1,
    explanation: "ジェネリクスの型制約（`<T: Comparable>` や `where T: Equatable`）を使うと、型パラメータが特定のプロトコルに準拠していることをコンパイル時に保証し、そのプロトコルのメソッドを安全に呼び出せます。",
  },
  {
    id: 10,
    category: "並行処理",
    question: "Result型を使うメリットとして正しいのはどれですか？",
    options: [
      "非同期処理を同期的に実行できる",
      "成功・失敗を型安全に表現でき、エラー処理を強制できる",
      "メモリ使用量を削減できる",
      "コンパイル時間を短縮できる",
    ],
    correctIndex: 1,
    explanation: "`Result<Success, Failure>` は成功値と失敗値を型安全に表現します。switch文でパターンマッチすることでエラーケースの処理が強制され、エラーを見落としにくい設計になります。",
  },
  {
    id: 11,
    category: "並行処理",
    question: "async/awaitの特徴として正しいのはどれですか？",
    options: [
      "スレッドをブロックしながら非同期処理を待つ",
      "コールバックネストなしに非同期処理を直線的なコードで記述でき、スレッドをブロックしない",
      "async関数はメインスレッドでしか実行できない",
      "awaitは同期関数でも使える",
    ],
    correctIndex: 1,
    explanation: "`async/await` を使うと非同期処理をコールバックのネストなしに直線的なコードで記述できます。`await` の地点でスレッドはブロックされず、他の処理が実行されます。Swift 5.5以降で利用可能です。",
  },
  {
    id: 12,
    category: "並行処理",
    question: "ARCにおけるweakとunownedの違いとして正しいのはどれですか？",
    options: [
      "weakは強参照、unownedは弱参照",
      "weakはOptional型になりnilになりうる、unownedは非Optionalでライフタイムが保証される場合に使う",
      "どちらも全く同じ動作をする",
      "weakはclassのみ、unownedはstructにも使える",
    ],
    correctIndex: 1,
    explanation: "`weak` 参照はOptional型で参照先が解放されるとnilになります。`unowned` は非Optionalで参照先が自分より長生きすることが保証されている場合に使います。誤った使用はランタイムクラッシュになります。",
  },
  {
    id: 13,
    category: "SwiftUI",
    question: "@Stateと@Bindingの使い分けとして正しいのはどれですか？",
    options: [
      "@StateはObservableObjectに使い、@BindingはInt型にしか使えない",
      "@StateはViewが状態を所有する場合に使い、@Bindingは親から渡された状態への双方向参照に使う",
      "どちらも同じで好みで使い分ける",
      "@BindingはViewModelに定義し、@StateはViewに定義できない",
    ],
    correctIndex: 1,
    explanation: "`@State` はViewが状態を所有・管理する場合に使います。`@Binding` は親Viewから `$` を付けて渡された状態への双方向バインディングで、子Viewが親の状態を読み書きする際に使います。",
  },
  {
    id: 14,
    category: "プロトコル・ジェネリクス",
    question: "@Published（ObservableObject）の役割として正しいのはどれですか？",
    options: [
      "プロパティを公開APIとして外部に公開する",
      "プロパティ変化時にobjectWillChangeを自動発行し、SwiftUIのViewを再描画させる",
      "プロパティの型をPublishedに変換する",
      "スレッドセーフなアクセスを保証する",
    ],
    correctIndex: 1,
    explanation: "`@Published` はCombineのPublisherをプロパティに付与するプロパティラッパーです。ObservableObjectと組み合わせてプロパティ変化時にobjectWillChangeを自動発行し、@StateObjectや@ObservedObjectで監視しているViewを再描画させます。",
  },
  {
    id: 15,
    category: "テスト",
    question: "XCTestのアサーションメソッドとして正しいのはどれですか？",
    options: [
      "assertEqual(expected, actual)",
      "XCTAssertEqual(actual, expected)またはXCTAssertNil(value)",
      "assert(x == y, \"message\")",
      "expect(x).to(equal(y))",
    ],
    correctIndex: 1,
    explanation: "XCTestでは `XCTAssertEqual`・`XCTAssertNil`・`XCTAssertTrue`・`XCTAssertThrowsError` などのXCT接頭辞のアサーション関数を使います。失敗時に詳細なエラーメッセージを出力します。",
  },
  {
    id: 16,
    category: "ツール",
    question: "Swift Package Manager（SPM）のパッケージ定義ファイルはどれですか？",
    options: [
      "Gemfile",
      "Package.swift",
      "package.json",
      "build.gradle",
    ],
    correctIndex: 1,
    explanation: "SPMは `Package.swift` でパッケージ名・ターゲット・依存関係を定義します。`swift build` でビルド、`swift test` でテスト実行、`swift run` で実行ができます。Xcode 11以降はSPMを統合しています。",
  },
  {
    id: 17,
    category: "型システム",
    question: "enumのassociated valuesの説明として正しいのはどれですか？",
    options: [
      "enumのraw valueと同じもの",
      "各ケースに任意の型の値を付加できる機能。例: .success(Data)や.failure(Error)",
      "enumをHashableにするための仕組み",
      "enumのメソッドを定義するための構文",
    ],
    correctIndex: 1,
    explanation: "associated valuesはenumの各ケースに付加情報を持たせる機能です。`case success(Data)` や `case failure(Error)` のように使い、switch文でパターンマッチングして値を取り出します。Result型もこれを使っています。",
  },
  {
    id: 18,
    category: "プロトコル・ジェネリクス",
    question: "CodableプロトコルについてSwiftが提供する機能として正しいのはどれですか？",
    options: [
      "手動でJSONパーサーを実装する必要がある",
      "struct/classのプロパティ名に基づきJSONエンコード・デコードの実装を自動合成する",
      "CodableはDictionaryのみに使える",
      "Codableは非同期処理専用のプロトコルである",
    ],
    correctIndex: 1,
    explanation: "Codable（EncodableとDecodableの合成）に準拠した型は、プロパティ名がJSONキーに対応していれば自動的にエンコード・デコード実装が合成されます。CodingKeysで名前マッピングのカスタマイズも可能です。",
  },
  {
    id: 19,
    category: "型システム",
    question: "コレクションの高階関数（map・filter・reduce）について正しいのはどれですか？",
    options: [
      "mapは元の配列を変更する破壊的メソッド",
      "map/filter/reduceは新しいコレクション・値を返し、元のコレクションを変更しない",
      "reduceは配列を2倍にする関数",
      "filterは要素の型を変換する関数",
    ],
    correctIndex: 1,
    explanation: "`map` は各要素を変換した新しい配列を返し、`filter` は条件に合う要素の配列を返し、`reduce` は要素を畳み込んで単一の値を返します。いずれも元のコレクションを変更しない非破壊的メソッドです。",
  },
  {
    id: 20,
    category: "基礎",
    question: "Swiftの文字列補間（String interpolation）の正しい記法はどれですか？",
    options: [
      `"Hello $\{name}"`,
      `"Hello \\(name)"`,
      `"Hello %@" % name`,
      `"Hello #{name}"`,
    ],
    correctIndex: 1,
    explanation: "Swiftの文字列補間は `\"Hello \\(name)\"` のように `\\()` を使います。括弧内には変数・プロパティ・式を書くことができます。",
  },
  {
    id: 21,
    category: "基礎",
    question: "for-inで1から5までのRangeを作成する正しい書き方はどれですか？",
    options: [
      "for i in range(1, 5)",
      "for i in 1...5",
      "for i = 1; i <= 5; i++",
      "for i in [1,2,3,4,5]のみ",
    ],
    correctIndex: 1,
    explanation: "`1...5` は閉区間レンジ（1〜5を含む）、`1..<5` は半開区間レンジ（1〜4）です。`for i in 1...5` でiが1,2,3,4,5と変化します。",
  },
  {
    id: 22,
    category: "型システム",
    question: "型キャストas?とas!の違いとして正しいのはどれですか？",
    options: [
      "as?は上位型へのキャスト、as!は下位型へのキャスト",
      "as?はキャスト失敗時にnilを返す安全なキャスト、as!はキャスト失敗時にランタイムクラッシュする",
      "どちらも全く同じ動作をする",
      "as?はクラスにのみ使える",
    ],
    correctIndex: 1,
    explanation: "`as?` はOptionalを返し、キャスト失敗時はnilになる安全なダウンキャストです。`as!` は強制ダウンキャストで、失敗するとランタイムエラーになります。通常は `as?` を使うことが推奨されます。",
  },
  {
    id: 23,
    category: "プロトコル・ジェネリクス",
    question: "プロトコル指向プログラミング（POP）の特徴として正しいのはどれですか？",
    options: [
      "クラス継承を多用してコードを再利用する",
      "protocolとprotocol extensionによるデフォルト実装を組み合わせ、継承より構成を優先する",
      "グローバル変数でデータを共有する",
      "関数型プログラミングとは全く無関係な独立した概念",
    ],
    correctIndex: 1,
    explanation: "プロトコル指向プログラミングはprotocolで型の能力を定義し、protocol extensionでデフォルト実装を提供します。クラス継承の代わりにprotocol準拠と構成を使うことで、値型（struct）でも柔軟な設計が可能になります。",
  },
  {
    id: 24,
    category: "プロトコル・ジェネリクス",
    question: "opaque type（some Protocol）の説明として正しいのはどれですか？",
    options: [
      "any Protocolと同じで存在型を表す",
      "戻り値の具体的な型を隠蔽しつつコンパイラは型情報を保持し、パフォーマンスと型安全性を両立する",
      "someは配列の要素数を表すキーワード",
      "any Protocolより型安全性が低い",
    ],
    correctIndex: 1,
    explanation: "`some Protocol` はopaque type（不透明型）で、呼び出し元には具体的な型を隠しつつコンパイラは型を知っています。SwiftUIの `some View` がその例で、型消去のオーバーヘッドがなく高パフォーマンスです。",
  },
  {
    id: 25,
    category: "並行処理",
    question: "actorとSendableプロトコルの関係として正しいのはどれですか？",
    options: [
      "actorはSendableに準拠できない",
      "actorは自動的にSendableに準拠しており、並行境界を安全に越えて参照を渡せる",
      "Sendableはactorにのみ使えるプロトコル",
      "actorとSendableは無関係な独立した機能",
    ],
    correctIndex: 1,
    explanation: "`actor` は自動的に `Sendable` に準拠します。`Sendable` プロトコルは並行境界を安全に越えられる型を示し、コンパイラがデータ競合をチェックします。Swift Concurrencyの厳格な安全性（strict concurrency）の核心です。",
  },
];

export default function FinalExamPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < QUESTIONS.length) {
      const unanswered = QUESTIONS.filter((q) => answers[q.id] === undefined).length;
      if (!window.confirm(`まだ${unanswered}問未回答です。このまま提出しますか？`)) return;
    }
    let correct = 0;
    for (const q of QUESTIONS) {
      if (answers[q.id] === q.correctIndex) correct++;
    }
    const finalScore = correct * 4;
    setScore(finalScore);
    saveFinalExamScore(finalScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const passed = score >= 80;
  const answeredCount = Object.keys(answers).length;

  if (submitted) {
    const correctCount = QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;
    return (
      <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Result Card */}
          <div className="rounded-2xl border border-orange-500/40 bg-orange-500/5 p-8 text-center mb-8">
            <div className="text-6xl font-bold mb-3 text-orange-400">
              {score}点
            </div>
            <div className="text-2xl font-bold text-gray-100 mb-2">
              {passed ? "合格おめでとうございます！" : "もう少し頑張りましょう"}
            </div>
            <p className="text-gray-400 mb-1">
              {correctCount} / {QUESTIONS.length} 問正解
            </p>
            <p className="text-sm text-gray-500">
              {passed ? "80点以上で合格です。" : "合格には80点以上が必要です。"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              もう一度受ける
            </button>
            {passed && (
              <Link
                href="/certificate"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                修了証明書を見る
              </Link>
            )}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              ダッシュボードに戻る
            </Link>
          </div>

          {/* Review */}
          <h2 className="text-xl font-bold text-gray-100 mb-5">解答確認</h2>
          <div className="space-y-5">
            {QUESTIONS.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-5 ${isCorrect ? "border-orange-500/30 bg-orange-500/5" : "border-gray-700 bg-gray-900"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${isCorrect ? "bg-orange-500 text-white" : "bg-gray-600 text-white"}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{q.category}</p>
                      <p className="text-gray-200 text-sm font-medium whitespace-pre-line">{q.question}</p>
                    </div>
                  </div>
                  <div className="ml-9 space-y-1.5 mb-3">
                    {q.options.map((opt, i) => {
                      const isUserChoice = userAnswer === i;
                      const isCorrectChoice = q.correctIndex === i;
                      let optClass = "text-gray-500";
                      if (isCorrectChoice) optClass = "text-orange-400 font-medium";
                      else if (isUserChoice && !isCorrect) optClass = "text-red-400 line-through";
                      return (
                        <p key={i} className={`text-sm ${optClass}`}>
                          {isCorrectChoice ? "-> " : isUserChoice ? "x " : "  "}{opt}
                        </p>
                      );
                    })}
                  </div>
                  <div className="ml-9 text-xs text-gray-400 bg-gray-900 rounded-lg p-3 border border-gray-800">
                    <span className="font-medium text-gray-300">解説: </span>{q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-3xl">🍎</span>
            <h1 className="text-3xl font-bold text-gray-100">Swift言語 最終試験</h1>
          </div>
          <p className="text-gray-400">
            全{QUESTIONS.length}問の選択問題です。80点以上で合格となります。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-400 flex-shrink-0">
              {answeredCount} / {QUESTIONS.length} 回答済み
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {QUESTIONS.map((q, idx) => {
            const userAnswer = answers[q.id];
            return (
              <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">{q.category}</span>
                    <p className="text-gray-200 font-medium whitespace-pre-line">{q.question}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-10">
                  {q.options.map((opt, i) => {
                    const isSelected = userAnswer === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(q.id, i)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                          isSelected
                            ? "border-orange-500 bg-orange-500/10 text-orange-300"
                            : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
                        }`}
                      >
                        <span className="font-medium mr-2 text-gray-500">
                          {["A", "B", "C", "D"][i]}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-center pb-10">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            試験を提出する
          </button>
        </div>
      </div>
    </div>
  );
}
