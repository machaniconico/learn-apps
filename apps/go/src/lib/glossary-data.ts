export interface GlossaryTerm {
  term: string;
  reading?: string;
  category: string;
  description: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── 基礎 ────────────────────────────────────────────────────────────────────
  {
    term: "package",
    reading: "ぱっけーじ",
    description: "Goのコード管理単位。すべてのGoファイルは先頭に package 宣言が必要。main パッケージがプログラムのエントリポイントとなる。",
    category: "基礎",
  },
  {
    term: "import",
    reading: "いんぽーと",
    description: "外部パッケージやstandard libraryを読み込む宣言。括弧で囲んで複数パッケージを一度にインポートできる。",
    category: "基礎",
  },
  {
    term: "var",
    reading: "ばー",
    description: "変数を宣言するキーワード。型を明示する場合や関数外での宣言に使う。関数内では := による短縮宣言が一般的。",
    category: "基礎",
  },
  {
    term: ":=",
    reading: "しょーとでくらっしょん",
    description: "短縮変数宣言演算子。型推論付きで変数を宣言・初期化する。関数内でのみ使用可能。",
    category: "基礎",
  },
  {
    term: "const",
    reading: "こんすと",
    description: "定数を宣言するキーワード。コンパイル時に値が確定している必要がある。iota と組み合わせて連番定数を作れる。",
    category: "基礎",
  },
  {
    term: "iota",
    reading: "いおた",
    description: "const ブロック内で自動的にインクリメントされる定数生成子。列挙型の代わりに使われる。",
    category: "基礎",
  },
  {
    term: "rune",
    reading: "るーん",
    description: "Unicodeのコードポイントを表す型（int32のエイリアス）。Go の文字列はバイト列だが、rune を使えば1文字単位で扱える。",
    category: "基礎",
  },
  {
    term: "byte",
    reading: "ばいと",
    description: "uint8 のエイリアス型。バイナリデータや ASCII 文字の処理に使われる。string は []byte に変換可能。",
    category: "基礎",
  },
  {
    term: "string",
    reading: "すとりんぐ",
    description: "UTF-8 エンコードされたイミュータブルなバイト列。ダブルクォートまたはバッククォート（raw string）で作成する。",
    category: "基礎",
  },
  {
    term: "nil",
    reading: "にる",
    description: "ポインタ、インターフェース、マップ、スライス、チャネル、関数型のゼロ値。参照型が何も指していない状態を表す。",
    category: "基礎",
  },
  {
    term: "zero value",
    reading: "ぜろばりゅー",
    description: "変数が明示的に初期化されない場合のデフォルト値。数値は0、文字列は空文字、boolはfalse、参照型はnil。",
    category: "基礎",
  },
  {
    term: "init",
    reading: "いにっと",
    description: "パッケージの初期化を行う特殊な関数。main 関数の前に自動実行される。1ファイルに複数定義可能。",
    category: "基礎",
  },
  {
    term: "main",
    reading: "めいん",
    description: "プログラムのエントリポイントとなる関数。main パッケージ内に定義し、引数も戻り値も持たない。",
    category: "基礎",
  },
  // ── 関数・型 ─────────────────────────────────────────────────────────────────
  {
    term: "func",
    reading: "ふぁんく",
    description: "関数を定義するキーワード。複数戻り値、名前付き戻り値、可変長引数、クロージャをサポートする。",
    category: "関数・型",
  },
  {
    term: "struct",
    reading: "すとらくと",
    description: "フィールドの集合を定義する複合型。Goにはクラスがなく、struct にメソッドを付けてオブジェクト指向的に使う。",
    category: "関数・型",
  },
  {
    term: "interface",
    reading: "いんたーふぇーす",
    description: "メソッドシグネチャの集合を定義する型。暗黙的に実装される（ダックタイピング）。空インターフェース any はすべての型を受け入れる。",
    category: "関数・型",
  },
  {
    term: "pointer",
    reading: "ぽいんた",
    description: "変数のメモリアドレスを保持する型。& でアドレス取得、* でデリファレンス。関数に値を共有したり変更するために使う。",
    category: "関数・型",
  },
  {
    term: "receiver",
    reading: "れしーば",
    description: "メソッドが属する型を指定する構文。値レシーバとポインタレシーバがあり、ポインタレシーバは構造体の変更が可能。",
    category: "関数・型",
  },
  {
    term: "slice",
    reading: "すらいす",
    description: "可変長の配列ビュー。内部配列へのポインタ、長さ（len）、容量（cap）を持つ。append で要素追加、make で生成する。",
    category: "関数・型",
  },
  {
    term: "map",
    reading: "まっぷ",
    description: "キーと値のペアを保持するハッシュテーブル。make で生成し、m[key] でアクセスする。順序は保証されない。",
    category: "関数・型",
  },
  {
    term: "type assertion",
    reading: "たいぷあさーしょん",
    description: "インターフェース値から具体的な型の値を取り出す操作。v.(Type) の構文で、comma ok パターンで安全に使える。",
    category: "関数・型",
  },
  {
    term: "type switch",
    reading: "たいぷすいっち",
    description: "インターフェース値の動的な型に応じて分岐する構文。switch v := x.(type) の形式で、複数の型を判定できる。",
    category: "関数・型",
  },
  {
    term: "embedding",
    reading: "えんべでぃんぐ",
    description: "構造体やインターフェースに別の型を名前なしで埋め込む機能。継承の代わりにコンポジション（合成）で再利用を実現する。",
    category: "関数・型",
  },
  {
    term: "generics",
    reading: "じぇねりくす",
    description: "Go 1.18で導入された型パラメータ。[T constraint] の構文で型に依存しない汎用的なコードを書ける。",
    category: "関数・型",
  },
  {
    term: "make",
    reading: "めいく",
    description: "スライス、マップ、チャネルを初期化する組み込み関数。メモリを確保し使用可能な状態で返す。new とは異なりポインタではなく値を返す。",
    category: "関数・型",
  },
  {
    term: "new",
    reading: "にゅー",
    description: "型のゼロ値を確保してそのポインタを返す組み込み関数。make と違いスライス・マップ・チャネル以外の型にも使える。",
    category: "関数・型",
  },
  {
    term: "append",
    reading: "あぺんど",
    description: "スライスに要素を追加する組み込み関数。容量不足時は新しい配列が確保される。戻り値を必ず受け取る必要がある。",
    category: "関数・型",
  },
  {
    term: "range",
    reading: "れんじ",
    description: "スライス、マップ、チャネル、文字列を反復処理するキーワード。for i, v := range slice の形でインデックスと値を取得できる。",
    category: "関数・型",
  },
  {
    term: "defer",
    reading: "でふぁー",
    description: "関数の終了時に実行される遅延呼び出しを登録する。リソースのクリーンアップやファイルのクローズに使う。LIFO順で実行される。",
    category: "関数・型",
  },
  {
    term: "error",
    reading: "えらー",
    description: "Goの組み込みインターフェース。Error() string メソッドを持つ。Goではエラーを値として扱い、if err != nil で明示的に処理する。",
    category: "関数・型",
  },
  {
    term: "panic",
    reading: "ぱにっく",
    description: "プログラムの実行を停止する組み込み関数。回復不能なエラーで使用する。recover と組み合わせて捕捉可能。通常のエラーには error を使う。",
    category: "関数・型",
  },
  {
    term: "recover",
    reading: "りかばー",
    description: "panic を捕捉して通常の実行に戻す組み込み関数。defer 内でのみ有効。ミドルウェアやライブラリでの安全装置として使う。",
    category: "関数・型",
  },
  // ── 並行処理 ─────────────────────────────────────────────────────────────────
  {
    term: "goroutine",
    reading: "ごるーちん",
    description: "Goの軽量スレッド。go キーワードで起動する。OSスレッドよりはるかに軽量で、数千〜数万を同時実行できる。",
    category: "並行処理",
  },
  {
    term: "channel",
    reading: "ちゃねる",
    description: "ゴルーチン間でデータを安全にやり取りする通信機構。バッファありとバッファなしがある。<- 演算子で送受信する。",
    category: "並行処理",
  },
  {
    term: "select",
    reading: "せれくと",
    description: "複数のチャネル操作を待機し、準備できたものを実行する制御構文。タイムアウトやキャンセル処理に使われる。",
    category: "並行処理",
  },
  {
    term: "context",
    reading: "こんてきすと",
    description: "キャンセルシグナル、タイムアウト、リクエストスコープの値を伝搬する仕組み。APIの境界を越えてゴルーチンを制御する。",
    category: "並行処理",
  },
  {
    term: "Mutex",
    reading: "みゅーてっくす",
    description: "sync.Mutex。排他制御のためのロック機構。Lock() と Unlock() で共有リソースへの同時アクセスを防ぐ。",
    category: "並行処理",
  },
  {
    term: "RWMutex",
    reading: "あーるだぶりゅーみゅーてっくす",
    description: "sync.RWMutex。読み取りロックと書き込みロックを分離するミューテックス。読み取りが多いケースで Mutex より効率的。",
    category: "並行処理",
  },
  {
    term: "WaitGroup",
    reading: "うぇいとぐるーぷ",
    description: "sync.WaitGroup。複数のゴルーチンの完了を待つ同期プリミティブ。Add, Done, Wait の3メソッドで制御する。",
    category: "並行処理",
  },
  {
    term: "sync.Once",
    reading: "しんくわんす",
    description: "関数を一度だけ実行することを保証する同期プリミティブ。シングルトンの初期化やセットアップ処理に使う。",
    category: "並行処理",
  },
  {
    term: "errgroup",
    reading: "えらーぐるーぷ",
    description: "golang.org/x/sync/errgroup パッケージ。ゴルーチンのグループを管理し、最初のエラーを返す。WaitGroup のエラー処理拡張版。",
    category: "並行処理",
  },
  // ── パッケージ ───────────────────────────────────────────────────────────────
  {
    term: "module",
    reading: "もじゅーる",
    description: "Go Modules。go.mod ファイルで管理される依存パッケージの集合。Go 1.11で導入され、GOPATH に代わる依存管理の仕組み。",
    category: "パッケージ",
  },
  {
    term: "go.mod",
    reading: "ごーもっど",
    description: "モジュールのルートに置かれる設定ファイル。モジュールパス、Goバージョン、依存パッケージとそのバージョンを記述する。",
    category: "パッケージ",
  },
  {
    term: "go.sum",
    reading: "ごーさむ",
    description: "依存パッケージのチェックサムを記録するファイル。ビルドの再現性とセキュリティを保証する。バージョン管理に含める。",
    category: "パッケージ",
  },
  {
    term: "fmt",
    reading: "えふえむてぃー",
    description: "フォーマット付きI/Oを提供する標準パッケージ。Printf, Sprintf, Println など、文字列のフォーマットと出力に使う。",
    category: "パッケージ",
  },
  {
    term: "os",
    reading: "おーえす",
    description: "OS機能へのプラットフォーム非依存インターフェースを提供する標準パッケージ。ファイル操作、環境変数、プロセス管理などに使う。",
    category: "パッケージ",
  },
  {
    term: "io",
    reading: "あいおー",
    description: "基本的なI/Oインターフェース（Reader, Writer, Closer など）を定義する標準パッケージ。ストリーム処理の基盤となる。",
    category: "パッケージ",
  },
  {
    term: "log",
    reading: "ろぐ",
    description: "シンプルなログ出力を提供する標準パッケージ。タイムスタンプ付きのログ出力やFatal（ログ出力後に終了）をサポートする。",
    category: "パッケージ",
  },
  {
    term: "strings",
    reading: "すとりんぐす",
    description: "文字列操作の関数を提供する標準パッケージ。Contains, Split, Join, Replace, TrimSpace など頻出の文字列処理を含む。",
    category: "パッケージ",
  },
  {
    term: "strconv",
    reading: "えすてぃーあーるこんぶ",
    description: "文字列と基本データ型の相互変換を提供する標準パッケージ。Atoi, Itoa, ParseFloat, FormatInt など。",
    category: "パッケージ",
  },
  // ── Web・API ─────────────────────────────────────────────────────────────────
  {
    term: "net/http",
    reading: "ねっとえいちてぃーてぃーぴー",
    description: "HTTP クライアントとサーバーを提供する標準パッケージ。ListenAndServe でサーバー起動、http.Get でリクエスト送信。",
    category: "Web・API",
  },
  {
    term: "encoding/json",
    reading: "えんこーでぃんぐじぇいそん",
    description: "JSONのエンコード・デコードを提供する標準パッケージ。Marshal/Unmarshal で構造体とJSONを相互変換する。",
    category: "Web・API",
  },
  {
    term: "http.Handler",
    reading: "えいちてぃーてぃーぴーはんどら",
    description: "ServeHTTP メソッドを持つインターフェース。HTTPリクエストを処理する基本的な抽象化。ミドルウェアパターンの基盤。",
    category: "Web・API",
  },
  {
    term: "http.ServeMux",
    reading: "さーぶまっくす",
    description: "HTTPリクエストのルーティングを行うマルチプレクサ。Go 1.22でメソッドマッチングやパスパラメータが強化された。",
    category: "Web・API",
  },
  {
    term: "middleware",
    reading: "みどるうぇあ",
    description: "リクエスト処理の前後に共通処理（ログ、認証、CORS等）を挿入するパターン。Handler をラップする関数で実装する。",
    category: "Web・API",
  },
  {
    term: "template",
    reading: "てんぷれーと",
    description: "html/template パッケージ。HTMLテンプレートをレンダリングする。自動エスケープでXSS対策が組み込まれている。",
    category: "Web・API",
  },
  // ── テスト ───────────────────────────────────────────────────────────────────
  {
    term: "testing",
    reading: "てすてぃんぐ",
    description: "Goの標準テストパッケージ。*testing.T でテスト、*testing.B でベンチマーク、*testing.F でファジングテストを記述する。",
    category: "テスト",
  },
  {
    term: "benchmark",
    reading: "べんちまーく",
    description: "関数のパフォーマンスを計測するテスト。func BenchmarkXxx(b *testing.B) で定義し、go test -bench で実行する。",
    category: "テスト",
  },
  {
    term: "table-driven test",
    reading: "てーぶるどりぶんてすと",
    description: "テストケースをスライスで定義し、ループで実行するGoの慣用的なテストパターン。t.Run でサブテスト化できる。",
    category: "テスト",
  },
  {
    term: "fuzz testing",
    reading: "ふぁずてすてぃんぐ",
    description: "Go 1.18で導入された自動テスト手法。ランダムな入力を生成してバグを発見する。func FuzzXxx(f *testing.F) で定義する。",
    category: "テスト",
  },
  // ── ツール ───────────────────────────────────────────────────────────────────
  {
    term: "go build",
    reading: "ごーびるど",
    description: "Goのソースコードをコンパイルして実行可能バイナリを生成するコマンド。クロスコンパイルも GOOS/GOARCH で簡単に行える。",
    category: "ツール",
  },
  {
    term: "go run",
    reading: "ごーらん",
    description: "ソースコードをコンパイルして即座に実行するコマンド。開発中の動作確認に便利。バイナリは一時ディレクトリに作られる。",
    category: "ツール",
  },
  {
    term: "go test",
    reading: "ごーてすと",
    description: "_test.go ファイルのテストを実行するコマンド。-v で詳細出力、-cover でカバレッジ、-bench でベンチマークを実行する。",
    category: "ツール",
  },
  {
    term: "go fmt",
    reading: "ごーふぉーまっと",
    description: "Goのソースコードを標準のスタイルに自動フォーマットするコマンド。チーム間でコードスタイルの議論を不要にする。",
    category: "ツール",
  },
  {
    term: "go vet",
    reading: "ごーべっと",
    description: "コンパイルは通るが疑わしいコードを検出する静的解析ツール。Printf の引数不一致、到達不能コードなどを報告する。",
    category: "ツール",
  },
  {
    term: "go mod tidy",
    reading: "ごーもっどたいでぃ",
    description: "go.mod と go.sum から未使用の依存を削除し、不足する依存を追加するコマンド。依存管理のクリーンアップに使う。",
    category: "ツール",
  },
  {
    term: "go generate",
    reading: "ごーじぇねれーと",
    description: "ソースコード中の //go:generate コメントに基づいてコード生成を実行するコマンド。モック生成やコード自動生成に使う。",
    category: "ツール",
  },
  {
    term: "golangci-lint",
    reading: "ごーらんぐしーあいりんと",
    description: "複数のGoリンターを統合して実行するツール。CI/CDパイプラインでのコード品質チェックに広く使われる。",
    category: "ツール",
  },
];
