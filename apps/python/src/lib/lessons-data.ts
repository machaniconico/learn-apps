export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  path: string;
  color: string;
  difficulty: Difficulty;
  lessons: Lesson[];
}

// ── Basics ──────────────────────────────────────────────────────────────────
const BASICS_LESSONS: Lesson[] = [
  { id: "setup", title: "Python環境構築", description: "Pythonのインストールと実行環境の準備", category: "basics", order: 1 },
  { id: "variables", title: "変数とデータ型", description: "データを保存する箱の使い方", category: "basics", order: 2 },
  { id: "types", title: "型の基本", description: "int・float・str・boolなど基本的なデータ型を理解する", category: "basics", order: 3 },
  { id: "operators", title: "演算子", description: "算術・比較・論理演算子を使いこなす", category: "basics", order: 4 },
  { id: "input-output", title: "入出力", description: "input()とprint()でユーザーとやりとりする", category: "basics", order: 5 },
  { id: "strings-basics", title: "文字列の基本", description: "文字列の作成・結合・基本操作", category: "basics", order: 6 },
  { id: "numbers", title: "数値と計算", description: "整数・浮動小数点数の計算と数学関数", category: "basics", order: 7 },
  { id: "booleans", title: "真偽値", description: "TrueとFalseを使った論理的な処理", category: "basics", order: 8 },
  { id: "none-type", title: "None型", description: "値が存在しないことを表すNoneの使い方", category: "basics", order: 9 },
  { id: "type-conversion", title: "型変換", description: "int()・str()・float()による型の変換", category: "basics", order: 10 },
  { id: "comments", title: "コメントとdocstring", description: "コードに説明を付ける方法とdocstringの書き方", category: "basics", order: 11 },
  { id: "basics-exercise", title: "基礎総合演習", description: "Python基礎の知識を使った実践問題", category: "basics", order: 12 },
];

// ── Control ──────────────────────────────────────────────────────────────────
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if文", description: "条件に応じて処理を分岐させる基本構文", category: "control", order: 1 },
  { id: "elif", title: "elif・else", description: "複数の条件を順番にチェックする方法", category: "control", order: 2 },
  { id: "comparison", title: "比較演算子", description: "==・!=・<・>など値を比較する演算子", category: "control", order: 3 },
  { id: "logical", title: "論理演算子", description: "and・or・notを使った複合条件の書き方", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "リストやrangeを使った繰り返し処理", category: "control", order: 5 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileの使い方", category: "control", order: 6 },
  { id: "break-continue", title: "break・continue", description: "ループを中断・スキップする制御文", category: "control", order: 7 },
  { id: "range", title: "range関数", description: "連続した数値のシーケンスを生成する", category: "control", order: 8 },
  { id: "comprehension", title: "内包表記", description: "リスト・辞書・集合をワンライナーで生成する", category: "control", order: 9 },
  { id: "control-exercise", title: "制御構文演習", description: "条件分岐とループを組み合わせた実践問題", category: "control", order: 10 },
];

// ── Functions ─────────────────────────────────────────────────────────────────
const FUNCTIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "def文を使った関数の定義と呼び出し方", category: "functions", order: 1 },
  { id: "args", title: "引数と仮引数", description: "関数に値を渡す方法と仮引数の使い方", category: "functions", order: 2 },
  { id: "return", title: "戻り値", description: "return文で関数から値を返す方法", category: "functions", order: 3 },
  { id: "default-args", title: "デフォルト引数", description: "引数に初期値を設定してオプション化する", category: "functions", order: 4 },
  { id: "kwargs", title: "*args・**kwargs", description: "可変長引数とキーワード引数を使いこなす", category: "functions", order: 5 },
  { id: "lambda", title: "ラムダ式", description: "無名関数lambdaの書き方と活用シーン", category: "functions", order: 6 },
  { id: "decorators", title: "デコレータ", description: "関数を拡張するデコレータの仕組みと書き方", category: "functions", order: 7 },
  { id: "functions-exercise", title: "関数演習", description: "関数を使ったプログラム設計の実践問題", category: "functions", order: 8 },
];

// ── Lists ─────────────────────────────────────────────────────────────────────
const LISTS_LESSONS: Lesson[] = [
  { id: "basics", title: "リストの基本", description: "リストの作成・アクセス・更新の基礎", category: "lists", order: 1 },
  { id: "methods", title: "リストのメソッド", description: "append・remove・sort など主要メソッドの使い方", category: "lists", order: 2 },
  { id: "slicing", title: "スライス", description: "リストや文字列の一部を切り出すスライス記法", category: "lists", order: 3 },
  { id: "nested", title: "ネストされたリスト", description: "リストの中にリストを持つ二次元データ構造", category: "lists", order: 4 },
  { id: "tuple-basics", title: "タプルの基本", description: "変更不可能なシーケンスであるタプルの使い方", category: "lists", order: 5 },
  { id: "tuple-unpacking", title: "タプルのアンパック", description: "タプルの値を複数の変数に一度に代入する", category: "lists", order: 6 },
  { id: "enumerate-zip", title: "enumerate・zip", description: "インデックス付き反復とシーケンスの結合", category: "lists", order: 7 },
  { id: "lists-exercise", title: "リスト・タプル演習", description: "リストとタプルを活用した実践問題", category: "lists", order: 8 },
];

// ── Dicts ─────────────────────────────────────────────────────────────────────
const DICTS_LESSONS: Lesson[] = [
  { id: "basics", title: "辞書の基本", description: "キーと値のペアでデータを管理する辞書の使い方", category: "dicts", order: 1 },
  { id: "methods", title: "辞書のメソッド", description: "keys・values・items・get など辞書操作メソッド", category: "dicts", order: 2 },
  { id: "comprehension", title: "辞書内包表記", description: "辞書を簡潔に生成する内包表記の書き方", category: "dicts", order: 3 },
  { id: "sets", title: "集合（set）", description: "重複なし・順序なしのデータ構造setの使い方", category: "dicts", order: 4 },
  { id: "frozen-set", title: "frozenset", description: "変更不可能な集合frozensetとその用途", category: "dicts", order: 5 },
  { id: "dicts-exercise", title: "辞書・集合演習", description: "辞書と集合を使ったデータ処理の実践問題", category: "dicts", order: 6 },
];

// ── Strings ───────────────────────────────────────────────────────────────────
const STRINGS_LESSONS: Lesson[] = [
  { id: "methods", title: "文字列メソッド", description: "upper・lower・strip・replace など文字列操作メソッド", category: "strings", order: 1 },
  { id: "formatting", title: "文字列フォーマット", description: "%演算子とformat()による文字列の書式設定", category: "strings", order: 2 },
  { id: "fstring", title: "f文字列", description: "Python 3.6以降で使えるf-stringによる埋め込み", category: "strings", order: 3 },
  { id: "split-join", title: "split・join", description: "文字列の分割と結合の使いどころ", category: "strings", order: 4 },
  { id: "encoding", title: "文字コードとエンコーディング", description: "UTF-8やbytesオブジェクトの扱い方", category: "strings", order: 5 },
  { id: "strings-exercise", title: "文字列演習", description: "文字列操作を駆使したテキスト処理の実践問題", category: "strings", order: 6 },
];

// ── Classes ───────────────────────────────────────────────────────────────────
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったオブジェクトの設計図", category: "classes", order: 1 },
  { id: "init", title: "__init__メソッド", description: "コンストラクタで初期状態を設定する方法", category: "classes", order: 2 },
  { id: "methods", title: "インスタンスメソッド", description: "selfを使ったインスタンスへの操作の定義", category: "classes", order: 3 },
  { id: "attributes", title: "インスタンス変数・クラス変数", description: "インスタンスごとの値とクラス共通の値の使い分け", category: "classes", order: 4 },
  { id: "encapsulation", title: "カプセル化", description: "アンダースコアを使ったアクセス制限の慣習", category: "classes", order: 5 },
  { id: "classmethod", title: "classmethod・staticmethod", description: "クラスメソッドと静的メソッドの違いと使い方", category: "classes", order: 6 },
  { id: "property", title: "プロパティ", description: "@propertyデコレータでゲッター・セッターを定義する", category: "classes", order: 7 },
  { id: "classes-exercise", title: "クラス演習", description: "クラスを使ったオブジェクト指向設計の実践問題", category: "classes", order: 8 },
];

// ── Inheritance ───────────────────────────────────────────────────────────────
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "親クラスを引き継ぐ子クラスの定義方法", category: "inheritance", order: 1 },
  { id: "override", title: "メソッドオーバーライド", description: "親クラスのメソッドを子クラスで上書きする", category: "inheritance", order: 2 },
  { id: "super", title: "super()の使い方", description: "親クラスのメソッドを明示的に呼び出す", category: "inheritance", order: 3 },
  { id: "abstract", title: "抽象クラス", description: "ABCモジュールを使ったインターフェースの定義", category: "inheritance", order: 4 },
  { id: "dataclass", title: "データクラス", description: "@dataclassで定型的なクラスを簡潔に書く", category: "inheritance", order: 5 },
  { id: "inheritance-exercise", title: "継承演習", description: "継承を活用したオブジェクト設計の実践問題", category: "inheritance", order: 6 },
];

// ── Stdlib ────────────────────────────────────────────────────────────────────
const STDLIB_LESSONS: Lesson[] = [
  { id: "os-path", title: "osモジュール", description: "ファイルシステム操作やパス処理のためのosモジュール", category: "stdlib", order: 1 },
  { id: "datetime", title: "datetimeモジュール", description: "日付・時刻の取得・演算・フォーマット", category: "stdlib", order: 2 },
  { id: "collections", title: "collectionsモジュール", description: "Counter・defaultdict・dequeなど高機能なコレクション", category: "stdlib", order: 3 },
  { id: "itertools", title: "itertoolsモジュール", description: "チェーン・組み合わせ・順列など反復処理ツール", category: "stdlib", order: 4 },
  { id: "pathlib", title: "pathlibモジュール", description: "オブジェクト指向スタイルでパスを扱うpathlib", category: "stdlib", order: 5 },
  { id: "math", title: "mathモジュール", description: "三角関数・対数・定数など数学関数のモジュール", category: "stdlib", order: 6 },
  { id: "json-module", title: "jsonモジュール", description: "Pythonオブジェクトとの相互変換とファイル読み書き", category: "stdlib", order: 7 },
  { id: "stdlib-exercise", title: "標準ライブラリ演習", description: "標準ライブラリを活用した実用的な処理の実践問題", category: "stdlib", order: 8 },
];

// ── Packages ──────────────────────────────────────────────────────────────────
const PACKAGES_LESSONS: Lesson[] = [
  { id: "pip", title: "pip入門", description: "Pythonパッケージのインストール・管理ツールpip", category: "packages", order: 1 },
  { id: "venv", title: "仮想環境（venv）", description: "プロジェクトごとに独立した環境を作るvenvの使い方", category: "packages", order: 2 },
  { id: "poetry", title: "Poetry", description: "依存関係管理とパッケージ公開ができるPoetryの使い方", category: "packages", order: 3 },
  { id: "requirements", title: "requirements.txt", description: "依存パッケージをファイルで管理・共有する方法", category: "packages", order: 4 },
  { id: "packages-exercise", title: "パッケージ管理演習", description: "パッケージ管理ツールを使った環境構築の実践問題", category: "packages", order: 5 },
];

// ── File I/O ──────────────────────────────────────────────────────────────────
const FILEIO_LESSONS: Lesson[] = [
  { id: "read", title: "ファイルの読み込み", description: "open()とread・readline・readlinesでファイルを読む", category: "fileio", order: 1 },
  { id: "write", title: "ファイルへの書き込み", description: "write・writelines・printリダイレクトでファイルに出力する", category: "fileio", order: 2 },
  { id: "with-statement", title: "with文", description: "コンテキストマネージャでファイルを安全に扱う", category: "fileio", order: 3 },
  { id: "binary", title: "バイナリファイル", description: "画像や音声などバイナリデータの読み書き", category: "fileio", order: 4 },
  { id: "csv-file", title: "CSVファイル操作", description: "csvモジュールを使った表形式データの読み書き", category: "fileio", order: 5 },
  { id: "fileio-exercise", title: "ファイルI/O演習", description: "ファイル操作を使ったデータ処理の実践問題", category: "fileio", order: 6 },
];

// ── Data Formats ──────────────────────────────────────────────────────────────
const DATAFORMATS_LESSONS: Lesson[] = [
  { id: "json", title: "JSON処理", description: "jsonモジュールでJSON形式のデータを読み書きする", category: "dataformats", order: 1 },
  { id: "csv", title: "CSV処理", description: "csvモジュールとPandasを使ったCSVデータの操作", category: "dataformats", order: 2 },
  { id: "yaml", title: "YAML処理", description: "PyYAMLを使って設定ファイルなどYAMLを扱う", category: "dataformats", order: 3 },
  { id: "xml", title: "XML処理", description: "xml.etree.ElementTreeを使ったXMLのパースと生成", category: "dataformats", order: 4 },
  { id: "dataformats-exercise", title: "データ形式演習", description: "各種データ形式を変換・処理する実践問題", category: "dataformats", order: 5 },
];

// ── Regex ─────────────────────────────────────────────────────────────────────
const REGEX_LESSONS: Lesson[] = [
  { id: "basics", title: "正規表現の基本", description: "reモジュールと基本的なパターン文字列の書き方", category: "regex", order: 1 },
  { id: "patterns", title: "メタ文字とパターン", description: ".・*・+・?・[]・^・$などメタ文字の意味と使い方", category: "regex", order: 2 },
  { id: "match-search", title: "match・search・findall", description: "文字列からパターンを検索する各関数の違い", category: "regex", order: 3 },
  { id: "replace", title: "置換・分割", description: "sub()とsplit()を使った文字列の置換と分割", category: "regex", order: 4 },
  { id: "regex-exercise", title: "正規表現演習", description: "正規表現を使ったテキスト処理の実践問題", category: "regex", order: 5 },
];

// ── Flask ─────────────────────────────────────────────────────────────────────
const FLASK_LESSONS: Lesson[] = [
  { id: "setup", title: "Flaskセットアップ", description: "Flaskのインストールと最小限のWebアプリ起動", category: "flask", order: 1 },
  { id: "routing", title: "ルーティング", description: "@app.routeでURLと処理を対応付ける方法", category: "flask", order: 2 },
  { id: "templates", title: "Jinjaテンプレート", description: "HTMLテンプレートに動的データを埋め込む", category: "flask", order: 3 },
  { id: "forms", title: "フォーム処理", description: "GETとPOSTでフォームデータを受け取る方法", category: "flask", order: 4 },
  { id: "database", title: "データベース連携", description: "SQLAlchemyを使ったDBの読み書き", category: "flask", order: 5 },
  { id: "api", title: "REST API構築", description: "FlaskでJSON APIを作る方法", category: "flask", order: 6 },
  { id: "auth", title: "認証・セッション", description: "Flask-Loginを使ったログイン機能の実装", category: "flask", order: 7 },
  { id: "flask-exercise", title: "Flask演習", description: "FlaskでシンプルなWebアプリを構築する実践問題", category: "flask", order: 8 },
];

// ── FastAPI ───────────────────────────────────────────────────────────────────
const FASTAPI_LESSONS: Lesson[] = [
  { id: "setup", title: "FastAPIセットアップ", description: "FastAPIとUvicornのインストールと起動方法", category: "fastapi", order: 1 },
  { id: "routing", title: "パスオペレーション", description: "GET・POST・PUT・DELETEルートの定義方法", category: "fastapi", order: 2 },
  { id: "models", title: "Pydanticモデル", description: "データのバリデーションと型定義にPydanticを使う", category: "fastapi", order: 3 },
  { id: "validation", title: "リクエストバリデーション", description: "パスパラメータ・クエリ・ボディの検証方法", category: "fastapi", order: 4 },
  { id: "async-endpoints", title: "非同期エンドポイント", description: "async defを使ったコルーチンベースのAPI", category: "fastapi", order: 5 },
  { id: "database", title: "データベース連携", description: "SQLAlchemy + FastAPIでDBを操作する方法", category: "fastapi", order: 6 },
  { id: "docs", title: "自動ドキュメント", description: "Swagger UIとReDocで自動生成されるAPIドキュメント", category: "fastapi", order: 7 },
  { id: "fastapi-exercise", title: "FastAPI演習", description: "FastAPIでCRUD APIを実装する実践問題", category: "fastapi", order: 8 },
];

// ── Django ────────────────────────────────────────────────────────────────────
const DJANGO_LESSONS: Lesson[] = [
  { id: "setup", title: "Djangoセットアップ", description: "プロジェクト・アプリの作成とサーバー起動", category: "django", order: 1 },
  { id: "models", title: "モデル（ORM）", description: "Djangoのモデル定義とマイグレーションの仕組み", category: "django", order: 2 },
  { id: "views", title: "ビュー", description: "関数ビューとクラスベースビューの書き方", category: "django", order: 3 },
  { id: "templates", title: "テンプレート", description: "Djangoテンプレート言語でHTMLを動的に生成する", category: "django", order: 4 },
  { id: "admin", title: "管理画面", description: "Django Adminを使ったデータの管理・確認", category: "django", order: 5 },
  { id: "forms", title: "フォーム", description: "Django Formsでユーザー入力を安全に扱う", category: "django", order: 6 },
  { id: "auth", title: "認証システム", description: "Djangoの組み込み認証でログイン・ログアウトを実装", category: "django", order: 7 },
  { id: "django-exercise", title: "Django演習", description: "DjangoでブログアプリなどのWebアプリを構築する問題", category: "django", order: 8 },
];

// ── NumPy ─────────────────────────────────────────────────────────────────────
const NUMPY_LESSONS: Lesson[] = [
  { id: "arrays", title: "配列の作成", description: "np.array・zeros・ones・arangeで配列を作る", category: "numpy", order: 1 },
  { id: "operations", title: "配列演算", description: "ベクトル演算・ユニバーサル関数・集約", category: "numpy", order: 2 },
  { id: "indexing", title: "インデックスとスライス", description: "多次元配列の要素アクセスとファンシーインデックス", category: "numpy", order: 3 },
  { id: "broadcasting", title: "ブロードキャスト", description: "異なる形状の配列を自動的に合わせて演算する仕組み", category: "numpy", order: 4 },
  { id: "linalg", title: "線形代数", description: "行列演算・行列式・固有値・逆行列の計算", category: "numpy", order: 5 },
  { id: "numpy-exercise", title: "NumPy演習", description: "NumPyを使った数値計算の実践問題", category: "numpy", order: 6 },
];

// ── Pandas ────────────────────────────────────────────────────────────────────
const PANDAS_LESSONS: Lesson[] = [
  { id: "series", title: "Series", description: "1次元のラベル付きデータ構造Seriesの使い方", category: "pandas", order: 1 },
  { id: "dataframe", title: "DataFrame", description: "表形式のデータ構造DataFrameの作成と基本操作", category: "pandas", order: 2 },
  { id: "indexing", title: "インデックス・選択", description: "loc・iloc・条件フィルタでデータを絞り込む", category: "pandas", order: 3 },
  { id: "cleaning", title: "データクレンジング", description: "欠損値・重複の処理とデータ型の変換", category: "pandas", order: 4 },
  { id: "groupby", title: "groupby・集約", description: "データをグループ化して集計・変換する方法", category: "pandas", order: 5 },
  { id: "pandas-exercise", title: "Pandas演習", description: "Pandasを使ったデータ分析の実践問題", category: "pandas", order: 6 },
];

// ── Matplotlib ────────────────────────────────────────────────────────────────
const MATPLOTLIB_LESSONS: Lesson[] = [
  { id: "basics", title: "グラフの基本", description: "折れ線グラフ・棒グラフ・散布図の描き方", category: "matplotlib", order: 1 },
  { id: "customization", title: "グラフのカスタマイズ", description: "タイトル・ラベル・凡例・色の設定方法", category: "matplotlib", order: 2 },
  { id: "subplots", title: "サブプロット", description: "複数のグラフを並べて表示するsubplotsの使い方", category: "matplotlib", order: 3 },
  { id: "styles", title: "スタイルと応用", description: "スタイルシート・ヒートマップ・箱ひげ図などの応用", category: "matplotlib", order: 4 },
  { id: "matplotlib-exercise", title: "Matplotlib演習", description: "Matplotlibを使ったデータ可視化の実践問題", category: "matplotlib", order: 5 },
];

// ── Pytest ────────────────────────────────────────────────────────────────────
const PYTEST_LESSONS: Lesson[] = [
  { id: "basics", title: "pytestの基本", description: "テスト関数の書き方とpytestの実行方法", category: "pytest", order: 1 },
  { id: "assertions", title: "アサーション", description: "assert文を使った期待値との比較とエラーメッセージ", category: "pytest", order: 2 },
  { id: "fixtures", title: "フィクスチャ", description: "テストの前準備・後処理をfixtureで共有する", category: "pytest", order: 3 },
  { id: "parametrize", title: "パラメータ化テスト", description: "@pytest.mark.parametrizeで多数のケースを効率よくテスト", category: "pytest", order: 4 },
  { id: "mocking", title: "モック・パッチ", description: "unittest.mockを使って外部依存をモックに置き換える", category: "pytest", order: 5 },
  { id: "pytest-exercise", title: "pytest演習", description: "pytestを使ったテスト設計の実践問題", category: "pytest", order: 6 },
];

// ── Debug ─────────────────────────────────────────────────────────────────────
const DEBUG_LESSONS: Lesson[] = [
  { id: "print-debug", title: "print デバッグ", description: "print()を戦略的に使ってバグを特定する方法", category: "debug", order: 1 },
  { id: "pdb", title: "pdb デバッガ", description: "Pythonの組み込みデバッガpdbの使い方", category: "debug", order: 2 },
  { id: "logging", title: "loggingモジュール", description: "ログレベルとハンドラを使った本格的なロギング", category: "debug", order: 3 },
  { id: "profiling", title: "プロファイリング", description: "cProfileとtimeitを使ってボトルネックを特定する", category: "debug", order: 4 },
  { id: "debug-exercise", title: "デバッグ演習", description: "バグを含むコードを発見・修正するデバッグ実践問題", category: "debug", order: 5 },
];

// ── Async ─────────────────────────────────────────────────────────────────────
const ASYNC_LESSONS: Lesson[] = [
  { id: "basics", title: "非同期処理の基本", description: "asyncio・コルーチン・イベントループの仕組み", category: "async", order: 1 },
  { id: "await", title: "awaitキーワード", description: "awaitを使って非同期関数の完了を待つ方法", category: "async", order: 2 },
  { id: "tasks", title: "タスクと並行実行", description: "asyncio.create_taskで複数のコルーチンを並行処理", category: "async", order: 3 },
  { id: "aiohttp", title: "aiohttpによるHTTP通信", description: "非同期HTTPクライアント・サーバーにaiohttpを使う", category: "async", order: 4 },
  { id: "async-exercise", title: "非同期処理演習", description: "非同期処理を使った並行プログラミングの実践問題", category: "async", order: 5 },
];

// ── Type Hints ────────────────────────────────────────────────────────────────
const TYPEHINTS_LESSONS: Lesson[] = [
  { id: "basics", title: "型ヒントの基本", description: "変数・引数・戻り値への型アノテーションの書き方", category: "typehints", order: 1 },
  { id: "advanced", title: "高度な型表現", description: "Optional・Union・Listなどtypingモジュールの活用", category: "typehints", order: 2 },
  { id: "generics", title: "ジェネリクス", description: "TypeVarを使った汎用的な型定義", category: "typehints", order: 3 },
  { id: "protocol", title: "Protocol", description: "ダックタイピングを型で表現するProtocolの使い方", category: "typehints", order: 4 },
  { id: "typehints-exercise", title: "型ヒント演習", description: "型ヒントを活用した堅牢なコード設計の実践問題", category: "typehints", order: 5 },
];

// ── Algorithm ─────────────────────────────────────────────────────────────────
const ALGORITHM_LESSONS: Lesson[] = [
  { id: "complexity", title: "計算量とBig-O記法", description: "アルゴリズムの効率を表すO記法の読み方と考え方", category: "algorithm", order: 1 },
  { id: "sort", title: "ソートアルゴリズム", description: "バブル・マージ・クイックソートの仕組みと実装", category: "algorithm", order: 2 },
  { id: "search", title: "探索アルゴリズム", description: "線形探索・二分探索の実装と使いどころ", category: "algorithm", order: 3 },
  { id: "recursion", title: "再帰", description: "関数が自分自身を呼び出す再帰アルゴリズムの設計", category: "algorithm", order: 4 },
  { id: "dynamic", title: "動的計画法", description: "部分問題を記憶して効率化する動的計画法の入門", category: "algorithm", order: 5 },
  { id: "algorithm-exercise", title: "アルゴリズム演習", description: "アルゴリズムを実装して解く競技プログラミング風問題", category: "algorithm", order: 6 },
];

// ── Design ────────────────────────────────────────────────────────────────────
const DESIGN_LESSONS: Lesson[] = [
  { id: "solid", title: "SOLID原則", description: "オブジェクト指向設計の5つの原則をPythonで学ぶ", category: "design", order: 1 },
  { id: "creational", title: "生成パターン", description: "Singleton・Factory・Builder など生成に関するデザインパターン", category: "design", order: 2 },
  { id: "structural", title: "構造パターン", description: "Adapter・Decorator・Facade など構造に関するデザインパターン", category: "design", order: 3 },
  { id: "behavioral", title: "振る舞いパターン", description: "Observer・Strategy・Command など振る舞いに関するデザインパターン", category: "design", order: 4 },
  { id: "design-exercise", title: "設計パターン演習", description: "デザインパターンを適用したコード設計の実践問題", category: "design", order: 5 },
];

// ── Category definitions ───────────────────────────────────────────────────────
export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "Python基礎", path: "/learn/basics", color: "green", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御構文", path: "/learn/control", color: "blue", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "functions", name: "関数", path: "/learn/functions", color: "yellow", difficulty: "beginner", lessons: FUNCTIONS_LESSONS },
  { id: "lists", name: "リスト・タプル", path: "/learn/lists", color: "orange", difficulty: "beginner", lessons: LISTS_LESSONS },
  { id: "dicts", name: "辞書・集合", path: "/learn/dicts", color: "cyan", difficulty: "beginner", lessons: DICTS_LESSONS },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "pink", difficulty: "beginner", lessons: STRINGS_LESSONS },
  { id: "classes", name: "クラス基礎", path: "/learn/classes", color: "purple", difficulty: "intermediate", lessons: CLASSES_LESSONS },
  { id: "inheritance", name: "継承・応用", path: "/learn/inheritance", color: "violet", difficulty: "intermediate", lessons: INHERITANCE_LESSONS },
  { id: "stdlib", name: "標準ライブラリ", path: "/learn/stdlib", color: "teal", difficulty: "intermediate", lessons: STDLIB_LESSONS },
  { id: "packages", name: "パッケージ管理", path: "/learn/packages", color: "green", difficulty: "intermediate", lessons: PACKAGES_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "orange", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "dataformats", name: "データ形式", path: "/learn/dataformats", color: "blue", difficulty: "intermediate", lessons: DATAFORMATS_LESSONS },
  { id: "regex", name: "正規表現", path: "/learn/regex", color: "red", difficulty: "intermediate", lessons: REGEX_LESSONS },
  { id: "flask", name: "Flask", path: "/learn/flask", color: "pink", difficulty: "intermediate", lessons: FLASK_LESSONS },
  { id: "fastapi", name: "FastAPI", path: "/learn/fastapi", color: "teal", difficulty: "intermediate", lessons: FASTAPI_LESSONS },
  { id: "django", name: "Django", path: "/learn/django", color: "green", difficulty: "intermediate", lessons: DJANGO_LESSONS },
  { id: "numpy", name: "NumPy", path: "/learn/numpy", color: "blue", difficulty: "intermediate", lessons: NUMPY_LESSONS },
  { id: "pandas", name: "Pandas", path: "/learn/pandas", color: "purple", difficulty: "intermediate", lessons: PANDAS_LESSONS },
  { id: "matplotlib", name: "Matplotlib", path: "/learn/matplotlib", color: "red", difficulty: "intermediate", lessons: MATPLOTLIB_LESSONS },
  { id: "pytest", name: "テスト（pytest）", path: "/learn/pytest", color: "yellow", difficulty: "intermediate", lessons: PYTEST_LESSONS },
  { id: "debug", name: "デバッグ", path: "/learn/debug", color: "orange", difficulty: "intermediate", lessons: DEBUG_LESSONS },
  { id: "async", name: "非同期処理", path: "/learn/async", color: "violet", difficulty: "advanced", lessons: ASYNC_LESSONS },
  { id: "typehints", name: "型ヒント", path: "/learn/typehints", color: "cyan", difficulty: "advanced", lessons: TYPEHINTS_LESSONS },
  { id: "algorithm", name: "アルゴリズム", path: "/learn/algorithm", color: "yellow", difficulty: "advanced", lessons: ALGORITHM_LESSONS },
  { id: "design", name: "設計パターン", path: "/learn/design", color: "indigo", difficulty: "advanced", lessons: DESIGN_LESSONS },
];

// ── Utility functions ──────────────────────────────────────────────────────────
export function getCategoryInfo(categoryId: string): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.id === categoryId);
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "beginner":
      return "初級";
    case "intermediate":
      return "中級";
    case "advanced":
      return "上級";
  }
}

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case "beginner":
      return "green";
    case "intermediate":
      return "blue";
    case "advanced":
      return "red";
  }
}

export function getAllLessons(categoryId: string): Lesson[] {
  switch (categoryId) {
    case "basics":
      return BASICS_LESSONS;
    case "control":
      return CONTROL_LESSONS;
    case "functions":
      return FUNCTIONS_LESSONS;
    case "lists":
      return LISTS_LESSONS;
    case "dicts":
      return DICTS_LESSONS;
    case "strings":
      return STRINGS_LESSONS;
    case "classes":
      return CLASSES_LESSONS;
    case "inheritance":
      return INHERITANCE_LESSONS;
    case "stdlib":
      return STDLIB_LESSONS;
    case "packages":
      return PACKAGES_LESSONS;
    case "fileio":
      return FILEIO_LESSONS;
    case "dataformats":
      return DATAFORMATS_LESSONS;
    case "regex":
      return REGEX_LESSONS;
    case "flask":
      return FLASK_LESSONS;
    case "fastapi":
      return FASTAPI_LESSONS;
    case "django":
      return DJANGO_LESSONS;
    case "numpy":
      return NUMPY_LESSONS;
    case "pandas":
      return PANDAS_LESSONS;
    case "matplotlib":
      return MATPLOTLIB_LESSONS;
    case "pytest":
      return PYTEST_LESSONS;
    case "debug":
      return DEBUG_LESSONS;
    case "async":
      return ASYNC_LESSONS;
    case "typehints":
      return TYPEHINTS_LESSONS;
    case "algorithm":
      return ALGORITHM_LESSONS;
    case "design":
      return DESIGN_LESSONS;
    default:
      return [];
  }
}
