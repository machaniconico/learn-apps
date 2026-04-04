export interface GlossaryTerm {
  term: string;
  reading?: string;
  category: string;
  description: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // 基礎
  {
    term: "print",
    reading: "ぷりんと",
    category: "基礎",
    description: "標準出力に改行なしで出力する関数。デバッグや値の確認に使う",
  },
  {
    term: "debugPrint",
    reading: "でばっぐぷりんと",
    category: "基礎",
    description: "デバッグ用の出力関数。String(reflecting:)相当の詳細な表現を出力する",
  },
  {
    term: "dump",
    reading: "だんぷ",
    category: "基礎",
    description: "オブジェクトのミラー情報を詳細にダンプする標準ライブラリ関数",
  },
  {
    term: "nil",
    reading: "にる",
    category: "基礎",
    description: "「値なし」を表すリテラル。Optionalの.noneケースに相当する",
  },
  {
    term: "let",
    reading: "れっと",
    category: "基礎",
    description: "定数を宣言するキーワード。一度代入した値は変更不可",
  },
  {
    term: "var",
    reading: "ばー",
    category: "基礎",
    description: "変数を宣言するキーワード。値を後から変更できる",
  },
  {
    term: "if let",
    reading: "いふれっと",
    category: "基礎",
    description: "Optionalを安全にアンラップするオプショナルバインディング構文",
  },
  {
    term: "guard let",
    reading: "がーどれっと",
    category: "基礎",
    description: "早期リターンとセットでOptionalをアンラップするguard文の形式",
  },
  {
    term: "guard",
    reading: "がーど",
    category: "基礎",
    description: "条件が偽のときにelseブロックで早期脱出する制御構文。条件が真なら後続コードに進む",
  },
  {
    term: "switch",
    reading: "すいっち",
    category: "基礎",
    description: "値に対するパターンマッチングを行う制御構文。全ケースを網羅する必要がある",
  },
  {
    term: "for-in",
    reading: "ふぉーいん",
    category: "基礎",
    description: "シーケンス・コレクション・範囲を繰り返し処理するループ構文",
  },
  {
    term: "while",
    reading: "わいる",
    category: "基礎",
    description: "条件が真の間繰り返すループ構文",
  },
  {
    term: "repeat-while",
    reading: "りぴーとわいる",
    category: "基礎",
    description: "最低1回実行してから条件判定するループ。他言語のdo-whileに相当",
  },
  {
    term: "defer",
    reading: "でぃふぁー",
    category: "基礎",
    description: "スコープ終了時に必ず実行されるコードブロックを登録するキーワード",
  },
  {
    term: "typealias",
    reading: "たいぷえいりあす",
    category: "基礎",
    description: "既存の型に別名を付けるキーワード。コードの可読性向上に使う",
  },
  {
    term: "文字列補間",
    reading: "もじれつほかん",
    category: "基礎",
    description: "\"\\(式)\"で文字列内に変数や式を埋め込む機能。String interpolationとも呼ばれる",
  },
  {
    term: "switch パターンマッチング",
    reading: "すいっちぱたーんまっちんぐ",
    category: "基礎",
    description: "switchでenum・範囲・タプル・型などの複雑な条件を一括して照合する仕組み",
  },

  // 型システム
  {
    term: "Optional",
    reading: "おぷしょなる",
    category: "型システム",
    description: "値があるか(.some)または値なし(.none / nil)かを表すジェネリック列挙型",
  },
  {
    term: "String",
    reading: "すとりんぐ",
    category: "型システム",
    description: "Unicode準拠の文字列型。値型（struct）として実装されている",
  },
  {
    term: "Array",
    reading: "あれい",
    category: "型システム",
    description: "同じ型の要素を順序付きで格納するジェネリック値型コレクション",
  },
  {
    term: "Dictionary",
    reading: "でぃくしょなり",
    category: "型システム",
    description: "キーと値のペアを格納するジェネリック値型コレクション。キーはHashable準拠が必要",
  },
  {
    term: "Set",
    reading: "せっと",
    category: "型システム",
    description: "重複を許さない順序なし集合コレクション。要素はHashable準拠が必要",
  },
  {
    term: "struct",
    reading: "すとらくと",
    category: "型システム",
    description: "値型の複合データ構造。代入時にコピーされ、参照共有が起きない",
  },
  {
    term: "class",
    reading: "くらす",
    category: "型システム",
    description: "参照型のデータ構造。継承・deinit・参照共有が可能。ARCで管理される",
  },
  {
    term: "enum",
    reading: "いにゅむ",
    category: "型システム",
    description: "関連する値の集合を定義する型。associated valuesでデータを付加できる",
  },
  {
    term: "enum associated values",
    reading: "いにゅむあそしえいてっどばりゅーず",
    category: "型システム",
    description: "enumの各ケースに任意の型の値を付加する機能。Result<T,E>などに活用される",
  },
  {
    term: "型キャスト (as? / as!)",
    reading: "かたきゃすとあす",
    category: "型システム",
    description: "as?は失敗するとnilを返す安全なダウンキャスト。as!は失敗時にランタイムエラー",
  },
  {
    term: "lazy",
    reading: "れいじー",
    category: "型システム",
    description: "プロパティの初期化を最初のアクセス時まで遅延させるキーワード",
  },
  {
    term: "mutating",
    reading: "みゅーてーてぃんぐ",
    category: "型システム",
    description: "struct・enumのメソッドでselfを変更するときに付けるキーワード",
  },
  {
    term: "static",
    reading: "すたてぃっく",
    category: "型システム",
    description: "型そのものに属するプロパティ・メソッドを宣言するキーワード",
  },
  {
    term: "final",
    reading: "ふぁいなる",
    category: "型システム",
    description: "クラス・メソッド・プロパティのオーバーライドを禁止するキーワード",
  },
  {
    term: "required",
    reading: "りくわいあど",
    category: "型システム",
    description: "すべてのサブクラスが実装しなければならないイニシャライザを示すキーワード",
  },
  {
    term: "convenience",
    reading: "こんびにえんす",
    category: "型システム",
    description: "指定イニシャライザを呼び出す補助的なイニシャライザを示すキーワード",
  },
  {
    term: "deinit",
    reading: "でいいにっと",
    category: "型システム",
    description: "classインスタンスが解放される直前に実行されるデイニシャライザ",
  },
  {
    term: "subscript",
    reading: "さぶすくりぷと",
    category: "型システム",
    description: "型に添字アクセス（[]記法）を定義するキーワード",
  },
  {
    term: "KeyPath",
    reading: "きーぱす",
    category: "型システム",
    description: "プロパティへの型安全な参照を表す\\(型.プロパティ)形式の式",
  },

  // プロトコル・ジェネリクス
  {
    term: "protocol",
    reading: "ぷろとこる",
    category: "プロトコル・ジェネリクス",
    description: "型が実装すべきメソッド・プロパティを定義するインターフェース。Swiftの多態性の中心",
  },
  {
    term: "extension",
    reading: "えくすてんしょん",
    category: "プロトコル・ジェネリクス",
    description: "既存の型にメソッド・computed property・プロトコル準拠を追加する構文",
  },
  {
    term: "protocol extensions",
    reading: "ぷろとこるえくすてんしょん",
    category: "プロトコル・ジェネリクス",
    description: "プロトコルにextensionでデフォルト実装を提供する手法。プロトコル指向プログラミングの核心",
  },
  {
    term: "generic",
    reading: "じぇねりっく",
    category: "プロトコル・ジェネリクス",
    description: "型パラメータ<T>を用いて型安全な汎用アルゴリズム・データ構造を定義する機能",
  },
  {
    term: "associatedtype",
    reading: "あそしえいてっどたいぷ",
    category: "プロトコル・ジェネリクス",
    description: "プロトコル内で宣言するプレースホルダー型。準拠する型が具体型を提供する",
  },
  {
    term: "opaque type (some)",
    reading: "おぺいくたいぷさむ",
    category: "プロトコル・ジェネリクス",
    description: "some Protocolと書き、具体的な型を隠蔽しながら型情報をコンパイラに保持させる戻り値型",
  },
  {
    term: "any",
    reading: "えにー",
    category: "プロトコル・ジェネリクス",
    description: "any Protocolと書き、存在型（existential type）を明示するキーワード。Swift 5.7以降必須",
  },
  {
    term: "Hashable",
    reading: "はっしゅあぶる",
    category: "プロトコル・ジェネリクス",
    description: "ハッシュ値を提供するプロトコル。DictionaryのキーやSetの要素に必要",
  },
  {
    term: "Equatable",
    reading: "いくぉーたぶる",
    category: "プロトコル・ジェネリクス",
    description: "==演算子による等値比較を可能にするプロトコル",
  },
  {
    term: "Comparable",
    reading: "こんぱらぶる",
    category: "プロトコル・ジェネリクス",
    description: "<演算子による順序比較を可能にするプロトコル。sort()などに必要",
  },
  {
    term: "Codable",
    reading: "こーだぶる",
    category: "プロトコル・ジェネリクス",
    description: "EncodableとDecodableを合成したtypealias。JSON等との相互変換を自動的に実装できる",
  },
  {
    term: "プロトコル指向プログラミング",
    reading: "ぷろとこるしこうぷろぐらみんぐ",
    category: "プロトコル・ジェネリクス",
    description: "継承より構成を優先し、protocolとextensionを組み合わせて柔軟な設計を行うSwiftのパラダイム",
  },
  {
    term: "property wrapper",
    reading: "ぷろぱてぃらっぱー",
    category: "プロトコル・ジェネリクス",
    description: "@記法でプロパティのget/setロジックを再利用可能にするカスタム属性の仕組み",
  },

  // 並行処理
  {
    term: "async/await",
    reading: "えーしんく/あうぇいと",
    category: "並行処理",
    description: "Swift 5.5導入の構造化並行処理構文。非同期関数をasyncで宣言しawaitで呼び出す",
  },
  {
    term: "actor",
    reading: "あくたー",
    category: "並行処理",
    description: "内部状態への直列アクセスを保証する参照型。データ競合をコンパイル時に防ぐ",
  },
  {
    term: "Task",
    reading: "たすく",
    category: "並行処理",
    description: "非同期処理の実行単位。Task { }で新しい非同期タスクを起動する",
  },
  {
    term: "@MainActor",
    reading: "めいんあくたー",
    category: "並行処理",
    description: "メインスレッドでの実行を保証するグローバルアクター属性。UIの更新に必須",
  },
  {
    term: "Sendable",
    reading: "せんだぶる",
    category: "並行処理",
    description: "並行境界を安全に越えられる型を示すプロトコル。データ競合を防ぐコンパイル時チェック",
  },
  {
    term: "throws",
    reading: "すろーず",
    category: "並行処理",
    description: "エラーを投げる可能性のある関数を示すキーワード。呼び出しにはtryが必要",
  },
  {
    term: "try",
    reading: "とらい",
    category: "並行処理",
    description: "throwing関数の呼び出しに付けるキーワード。try?は失敗時にnil、try!は強制アンラップ",
  },
  {
    term: "catch",
    reading: "きゃっち",
    category: "並行処理",
    description: "do-catchブロックでthrowされたエラーを捕捉するキーワード",
  },
  {
    term: "Result",
    reading: "りざると",
    category: "並行処理",
    description: "成功(.success)か失敗(.failure)かを表すジェネリック列挙型。同期エラー処理に使う",
  },
  {
    term: "ARC",
    reading: "えーあーるしー",
    category: "並行処理",
    description: "Automatic Reference Counting。Swiftのメモリ管理方式。参照カウントが0になると解放",
  },
  {
    term: "weak",
    reading: "うぃーく",
    category: "並行処理",
    description: "参照カウントを増やさない弱参照。循環参照を防ぐために使う。Optional型になる",
  },
  {
    term: "unowned",
    reading: "あんおうんど",
    category: "並行処理",
    description: "参照カウントを増やさない非所有参照。ライフタイムが保証されている場合に使う",
  },
  {
    term: "closure",
    reading: "くろーじゃー",
    category: "並行処理",
    description: "周囲のスコープの変数をキャプチャできる自己完結したコードブロック",
  },
  {
    term: "trailing closure",
    reading: "とれいりんぐくろーじゃー",
    category: "並行処理",
    description: "関数の最後の引数がクロージャのとき()の外に書ける省略記法",
  },
  {
    term: "@escaping",
    reading: "えすけーぴんぐ",
    category: "並行処理",
    description: "関数スコープを超えてクロージャが保持される場合に必要な属性",
  },
  {
    term: "@autoclosure",
    reading: "おーとくろーじゃー",
    category: "並行処理",
    description: "引数の式を自動的にクロージャに包む属性。遅延評価に使う",
  },

  // SwiftUI
  {
    term: "@State",
    reading: "すてーと",
    category: "SwiftUI",
    description: "Viewが所有するローカルな状態を管理するプロパティラッパー。変化するとViewが再描画される",
  },
  {
    term: "@Binding",
    reading: "ばいんでぃんぐ",
    category: "SwiftUI",
    description: "親Viewの@Stateへの双方向バインディングを提供するプロパティラッパー",
  },
  {
    term: "@Observable",
    reading: "おぶざーばぶる",
    category: "SwiftUI",
    description: "Swift 5.9/iOS 17+でObservation frameworkが提供するマクロ。クラスを観察可能にする",
  },
  {
    term: "@Published",
    reading: "ぱぶりっしゅど",
    category: "SwiftUI",
    description: "ObservableObjectで使うプロパティラッパー。プロパティ変化時にobjectWillChangeを発行する",
  },

  // テスト
  {
    term: "XCTest",
    reading: "えっくすしーてすと",
    category: "テスト",
    description: "Appleが提供する標準テストフレームワーク。XCTestCaseを継承してテストクラスを定義する",
  },
  {
    term: "XCTAssert",
    reading: "えっくすしーてぃーあさーと",
    category: "テスト",
    description: "XCTestのアサーション関数群。XCTAssertEqual・XCTAssertNil・XCTAssertThrowsErrorなど",
  },
  {
    term: "TDD",
    reading: "てぃーでぃーでぃー",
    category: "テスト",
    description: "テスト駆動開発。テストを先に書いて失敗させ、実装してグリーンにするサイクルを繰り返す",
  },

  // ツール
  {
    term: "SPM",
    reading: "えすぴーえむ",
    category: "ツール",
    description: "Swift Package Manager。Swiftの標準パッケージ管理ツール。Package.swiftで依存関係を定義",
  },
  {
    term: "Xcode",
    reading: "えっくすこーど",
    category: "ツール",
    description: "AppleのIDE。iOSおよびmacOSアプリ開発の標準環境。シミュレータ・デバッガを内蔵",
  },
  {
    term: "Instruments",
    reading: "いんすとるめんつ",
    category: "ツール",
    description: "Xcodeに付属するプロファイリングツール。メモリリーク・CPU使用率・ARCを可視化できる",
  },
];
