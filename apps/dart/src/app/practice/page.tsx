import { DartEditor } from "@/components/dart-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: メモアプリ */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-green-900 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">初級</span>
          <h2 className="text-xl font-bold text-white">メモアプリ</h2>
        </div>
        <p className="text-gray-400 mb-4">クラスとリストを使って、メモの作成・編集・削除ができるアプリを実装しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">class</code> でメモオブジェクト（タイトル・本文・作成日時・タグ）を定義する</li>
          <li>リストでメモの一覧を管理し、追加・削除・編集を実装する</li>
          <li>タグでメモをフィルタリングする機能を追加する</li>
          <li>タイトルまたは本文でキーワード検索できるようにする</li>
        </ul>
        <DartEditor
          defaultCode={`// TODO: Memoクラスを定義する
// (id: int, title: String, body: String, tags: List<String>, createdAt: DateTime)

// TODO: MemoAppクラスを実装する
class MemoApp {
  final List<dynamic> _memos = []; // TODO: 正しい型に変更する
  int _nextId = 1;

  // TODO: メモを追加するaddMemo関数を実装する

  // TODO: IDでメモを削除するdeleteMemo関数を実装する

  // TODO: タグでフィルタリングするfilterByTag関数を実装する

  // TODO: キーワード検索するsearch関数を実装する

  // TODO: 全メモを表示するprintAll関数を実装する
}

void main() {
  final app = MemoApp();
  // TODO: 5件のメモを追加する（異なるタグ付き）
  // TODO: タグ"仕事"でフィルタリングして表示する
  // TODO: キーワード"Dart"で検索して表示する
  // TODO: 1件削除してから全件表示する
}`}
        />
      </div>

      {/* プロジェクト2: クイズゲーム */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">クイズゲーム</h2>
        </div>
        <p className="text-gray-400 mb-4">MapとRandomを使って、ランダムに問題を出題するクイズゲームを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">Map</code> で問題と正解を管理する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">Random</code> でランダムに問題を選ぶ</li>
          <li>正解率・スコア・ランクを計算して出力する</li>
          <li>難易度別に問題を分類する機能を追加する</li>
        </ul>
        <DartEditor
          defaultCode={`import 'dart:math';

// TODO: QuestionクラスをMapベースで定義する
// (question: String, choices: List<String>, correctIndex: int, difficulty: String)

// TODO: QuizGameクラスを実装する
class QuizGame {
  final List<dynamic> _questions = []; // TODO: 正しい型に変更する
  int _score = 0;
  int _total = 0;
  final _random = Random();

  // TODO: 問題を追加するaddQuestion関数を実装する

  // TODO: ランダムにn問選ぶgetRandomQuestions関数を実装する

  // TODO: 問題に回答するanswer関数を実装する（正解かどうかを返す）

  // TODO: 成績を表示するprintResult関数を実装する
  // 正解数・正解率・ランク(A/B/C/D)を出力する
}

void main() {
  final game = QuizGame();
  // TODO: Dartに関するクイズを5問追加する
  // TODO: ランダムに3問選んで回答をシミュレートする
  // TODO: 成績を表示する
}`}
        />
      </div>

      {/* プロジェクト3: 非同期ファイル処理 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-orange-900 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">非同期ファイル処理パイプライン</h2>
        </div>
        <p className="text-gray-400 mb-4">FutureとAsync/Awaitを使って、複数ファイルを非同期で処理するパイプラインを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">Future</code> で非同期処理をモデル化する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">async/await</code> で読み取り・変換・書き込みを順序立てて実装する</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">Future.wait()</code> で複数ファイルを並列処理する</li>
          <li>エラー発生時のリトライロジックを実装する</li>
        </ul>
        <DartEditor
          defaultCode={`import 'dart:async';

// TODO: FileProcessResultクラスを定義する
// (filename: String, success: bool, result: String?, error: String?)

// TODO: ファイル読み込みをシミュレートするsuspend関数を実装する
// Future<String> readFile(String filename)
// 一定確率でエラーをスロー、await Future.delayed()で遅延を模擬

// TODO: テキスト変換処理を実装する（大文字化・行カウントなど）
// Future<String> processContent(String content)

// TODO: リトライ付きファイル処理を実装する
// Future<FileProcessResult> processWithRetry(String filename, {int maxRetries = 3})

Future<void> main() async {
  final files = ['data1.txt', 'data2.txt', 'data3.txt', 'data4.txt'];

  // TODO: Future.wait()で全ファイルを並列処理する
  // TODO: 成功・失敗の集計を表示する
  // TODO: 処理時間を計測して出力する
}`}
        />
      </div>

      {/* プロジェクト4: JSONパーサー */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">JSONパーサーと型変換</h2>
        </div>
        <p className="text-gray-400 mb-4">Mapと型変換を駆使して、JSONデータを型安全にDartオブジェクトへ変換するシステムを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">Map&lt;String, dynamic&gt;</code> でJSONデータを受け取る</li>
          <li><code className="text-orange-300 bg-gray-800 px-1 rounded">fromJson</code> / <code className="text-orange-300 bg-gray-800 px-1 rounded">toJson</code> ファクトリメソッドを実装する</li>
          <li>ネストしたオブジェクトとリストの変換を処理する</li>
          <li>型変換エラーを安全にハンドリングする</li>
        </ul>
        <DartEditor
          defaultCode={`import 'dart:convert';

// TODO: Addressクラスを定義する（fromJson/toJsonファクトリ付き）
// (street: String, city: String, zipCode: String)

// TODO: Userクラスを定義する（fromJson/toJsonファクトリ付き）
// (id: int, name: String, email: String, age: int, address: Address, hobbies: List<String>)

// TODO: JSON文字列を安全にパースするsafeParseUser関数を実装する
// User? safeParseUser(String jsonStr)
// 型変換エラーをキャッチしてnullを返す

void main() {
  final jsonStr = '''
  {
    "id": 1,
    "name": "田中太郎",
    "email": "tanaka@example.com",
    "age": 30,
    "address": {
      "street": "渋谷区道玄坂1-1",
      "city": "東京",
      "zipCode": "150-0043"
    },
    "hobbies": ["プログラミング", "読書", "ハイキング"]
  }
  ''';

  // TODO: JSONをUserオブジェクトに変換して各フィールドを出力する
  // TODO: UserオブジェクトをJSON文字列に戻して出力する
  // TODO: 不正なJSONでsafeParseUserをテストする
}`}
        />
      </div>
    </div>
  );
}
