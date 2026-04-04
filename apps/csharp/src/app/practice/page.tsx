import { CSharpEditor } from "@/components/csharp-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* Project 1: タスク管理アプリ */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">タスク管理アプリ</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-300 mb-2">クラスと List{"<T>"} を使って、タスクの追加・完了・削除ができる管理アプリを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Task クラスに ID・タイトル・優先度・完了フラグを持たせる</li>
            <li>List{"<Task>"} でタスクを管理する</li>
            <li>未完了タスクを優先度順に表示する</li>
            <li>完了率（完了数 / 総数）を表示する</li>
          </ul>
        </div>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

// TODO: Task クラスを実装する
class Task
{
    // TODO: Id (int), Title (string), Priority (int, 1=高/2=中/3=低), IsCompleted (bool) プロパティを定義する
    public int Id { get; set; }
    public string Title { get; set; }
    public int Priority { get; set; }
    public bool IsCompleted { get; set; }

    // TODO: コンストラクタを実装する（IsCompleted の初期値は false）
    public Task(int id, string title, int priority)
    {
        // TODO: プロパティに値をセットする
    }

    public string PriorityLabel =>
        Priority == 1 ? "高" : Priority == 2 ? "中" : "低";

    public override string ToString() =>
        $"[{Id}] {Title} (優先度: {PriorityLabel}) {(IsCompleted ? "✓" : "○")}";
}

class TaskManager
{
    private List<Task> tasks = new List<Task>();
    private int nextId = 1;

    // TODO: タスクを追加するメソッドを実装する
    public void AddTask(string title, int priority)
    {
        // TODO: new Task(nextId++, title, priority) を tasks に Add する
    }

    // TODO: ID でタスクを完了にするメソッドを実装する
    public void CompleteTask(int id)
    {
        // TODO: tasks から id が一致するものを Find して IsCompleted = true にする
    }

    // TODO: 未完了タスクを優先度順（昇順）で表示するメソッドを実装する
    public void ShowPending()
    {
        Console.WriteLine("=== 未完了タスク（優先度順）===");
        // TODO: tasks を Where(t => !t.IsCompleted) でフィルタし OrderBy(t => t.Priority) でソートして表示する
    }

    // TODO: 完了率を表示するメソッドを実装する
    public void ShowStats()
    {
        // TODO: tasks.Count で総数、Count(t => t.IsCompleted) で完了数を取得して表示する
    }
}

class Program
{
    static void Main()
    {
        var manager = new TaskManager();
        manager.AddTask("企画書を作成する", 1);
        manager.AddTask("メールを返信する", 3);
        manager.AddTask("バグを修正する", 1);
        manager.AddTask("ドキュメントを更新する", 2);
        manager.AddTask("コードレビューをする", 2);

        manager.ShowPending();

        Console.WriteLine();
        manager.CompleteTask(1);
        manager.CompleteTask(3);

        manager.ShowPending();
        Console.WriteLine();
        manager.ShowStats();
    }
}`}
          expectedOutput={`=== 未完了タスク（優先度順）===
[1] 企画書を作成する (優先度: 高) ○
[3] バグを修正する (優先度: 高) ○
[4] ドキュメントを更新する (優先度: 中) ○
[5] コードレビューをする (優先度: 中) ○
[2] メールを返信する (優先度: 低) ○

=== 未完了タスク（優先度順）===
[4] ドキュメントを更新する (優先度: 中) ○
[5] コードレビューをする (優先度: 中) ○
[2] メールを返信する (優先度: 低) ○

総タスク数: 5
完了数: 2
完了率: 40.0%`}
        />
      </section>

      {/* Project 2: 図書館システム */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">図書館システム</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">継承と LINQ を使って、本・電子書籍を管理する図書館システムを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Book 基底クラスにタイトル・著者・ジャンルを持たせる</li>
            <li>EBook を Book から継承してファイルサイズを追加する</li>
            <li>LINQ でジャンル別集計・著者検索・並べ替えを行う</li>
            <li>貸出中かどうかを管理して在庫確認できるようにする</li>
          </ul>
        </div>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

// TODO: Book 基底クラスを実装する
class Book
{
    public string Title { get; set; }
    public string Author { get; set; }
    public string Genre { get; set; }
    public bool IsAvailable { get; set; } = true;

    // TODO: コンストラクタを実装する
    public Book(string title, string author, string genre)
    {
        // TODO: プロパティに値をセットする
    }

    public virtual string GetInfo() =>
        $"「{Title}」 {Author} [{Genre}] {(IsAvailable ? "在庫あり" : "貸出中")}";
}

// TODO: EBook を Book から継承して実装する
class EBook : Book
{
    public double FileSizeMB { get; set; }

    // TODO: コンストラクタで base() を呼び FileSizeMB をセットする
    public EBook(string title, string author, string genre, double fileSizeMB)
        : base(title, author, genre)
    {
        // TODO: FileSizeMB をセットする
    }

    // TODO: GetInfo() をオーバーライドして "電子書籍 (Xmb)" を追加する
    public override string GetInfo() =>
        base.GetInfo() + $" [電子書籍 {FileSizeMB}MB]";
}

class Library
{
    private List<Book> books = new List<Book>();

    public void Add(Book book) => books.Add(book);

    // TODO: タイトルで貸出する（IsAvailable を false にする）
    public bool Checkout(string title)
    {
        // TODO: books から Title が一致して IsAvailable が true のものを FirstOrDefault で取得
        // 見つかれば IsAvailable = false にして true を返す、なければ false を返す
        return false;
    }

    // TODO: ジャンル別の冊数を表示する（LINQ の GroupBy を使う）
    public void ShowByGenre()
    {
        Console.WriteLine("=== ジャンル別冊数 ===");
        // TODO: books.GroupBy(b => b.Genre) でグループ化して各グループの Key と Count() を表示する
    }

    // TODO: 著者名で検索して一覧表示する
    public void SearchByAuthor(string author)
    {
        Console.WriteLine($"\\n=== 著者「{author}」の本 ===");
        // TODO: books.Where(b => b.Author.Contains(author)) で絞り込んで表示する
    }

    public void ShowAll()
    {
        Console.WriteLine("=== 全書籍一覧 ===");
        // TODO: books を OrderBy(b => b.Genre) でソートして GetInfo() を表示する
    }
}

class Program
{
    static void Main()
    {
        var lib = new Library();
        lib.Add(new Book("吾輩は猫である", "夏目漱石", "小説"));
        lib.Add(new Book("坊っちゃん", "夏目漱石", "小説"));
        lib.Add(new Book("銀河鉄道の夜", "宮沢賢治", "小説"));
        lib.Add(new Book("C# 入門", "山田太郎", "技術書"));
        lib.Add(new EBook("LINQ 完全ガイド", "佐藤花子", "技術書", 12.5));
        lib.Add(new EBook("デザインパターン", "鈴木一郎", "技術書", 8.3));

        lib.ShowAll();
        Console.WriteLine();

        lib.Checkout("坊っちゃん");
        lib.Checkout("C# 入門");
        lib.ShowByGenre();
        lib.SearchByAuthor("夏目漱石");
    }
}`}
          expectedOutput={`=== 全書籍一覧 ===
「吾輩は猫である」 夏目漱石 [小説] 在庫あり
「坊っちゃん」 夏目漱石 [小説] 在庫あり
「銀河鉄道の夜」 宮沢賢治 [小説] 在庫あり
「C# 入門」 山田太郎 [技術書] 在庫あり
「LINQ 完全ガイド」 佐藤花子 [技術書] 在庫あり [電子書籍 12.5MB]
「デザインパターン」 鈴木一郎 [技術書] 在庫あり [電子書籍 8.3MB]

=== ジャンル別冊数 ===
小説: 3冊
技術書: 3冊

=== 著者「夏目漱石」の本 ===
「吾輩は猫である」 夏目漱石 [小説] 在庫あり
「坊っちゃん」 夏目漱石 [小説] 貸出中`}
        />
      </section>

      {/* Project 3: 通貨換算ツール */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">通貨換算ツール</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-300 mb-2">Dictionary と例外処理を使って、複数通貨の換算ツールを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Dictionary{"<string, decimal>"} で通貨コードと対円レートを管理する</li>
            <li>未対応の通貨コードは独自例外 UnsupportedCurrencyException をスローする</li>
            <li>複数の換算を一括で実行するメソッドを実装する</li>
            <li>換算履歴を記録して表示できるようにする</li>
          </ul>
        </div>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

// TODO: 未対応通貨例外クラスを実装する
class UnsupportedCurrencyException : Exception
{
    // TODO: 通貨コードを受け取り "未対応の通貨コード: XXX" というメッセージを設定するコンストラクタ
}

class CurrencyConverter
{
    // 通貨コード → 1単位あたりの円換算レート
    private Dictionary<string, decimal> rates = new Dictionary<string, decimal>
    {
        { "USD", 149.50m },
        { "EUR", 162.30m },
        { "GBP", 189.70m },
        { "CNY",  20.80m },
        { "KRW",   0.11m },
    };

    private List<string> history = new List<string>();

    // TODO: 通貨コードが存在するか確認して bool を返すメソッドを実装する
    public bool IsSupported(string code) =>
        rates.ContainsKey(code.ToUpper());

    // TODO: amount 円を指定通貨に換算するメソッドを実装する
    public decimal Convert(decimal amountJpy, string toCurrency)
    {
        // TODO: toCurrency を ToUpper() で正規化する
        // TODO: rates に存在しなければ UnsupportedCurrencyException をスロー
        // TODO: amountJpy / rates[currency] を計算して履歴に追加し返す
        // 履歴の形式: "10000円 → 66.89USD"
        return 0;
    }

    // TODO: 一覧換算メソッド: 指定した円金額をすべての通貨に換算して表示する
    public void ConvertAll(decimal amountJpy)
    {
        Console.WriteLine($"\\n=== {amountJpy:N0}円の換算結果 ===");
        // TODO: rates の Keys を foreach してそれぞれ Convert を呼び出して表示する
    }

    public void ShowHistory()
    {
        Console.WriteLine("\\n=== 換算履歴 ===");
        foreach (var h in history) Console.WriteLine("  " + h);
    }
}

class Program
{
    static void Main()
    {
        var converter = new CurrencyConverter();

        // 個別換算
        try
        {
            decimal usd = converter.Convert(10000, "usd");
            Console.WriteLine($"10000円 = {usd:F2} USD");

            decimal eur = converter.Convert(50000, "EUR");
            Console.WriteLine($"50000円 = {eur:F2} EUR");

            // 未対応通貨（例外発生）
            converter.Convert(10000, "BTC");
        }
        catch (UnsupportedCurrencyException e)
        {
            Console.WriteLine($"エラー: {e.Message}");
        }

        // 一括換算
        converter.ConvertAll(100000);

        converter.ShowHistory();
    }
}`}
          expectedOutput={`10000円 = 66.89 USD
50000円 = 308.07 EUR
エラー: 未対応の通貨コード: BTC

=== 100000円の換算結果 ===
USD: 668.90
EUR: 616.14
GBP: 527.15
CNY: 4807.69
KRW: 909090.91

=== 換算履歴 ===
  10000円 → 66.89USD
  50000円 → 308.07EUR
  100000円 → 668.90USD
  100000円 → 616.14EUR
  100000円 → 527.15GBP
  100000円 → 4807.69CNY
  100000円 → 909090.91KRW`}
        />
      </section>

      {/* Project 4: ミニRPGバトル */}
      <section className="mb-12 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">ミニRPGバトル</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-300 mb-2">インターフェースとポリモーフィズムを使って、職業ごとに異なるスキルを持つRPGバトルシステムを作りましょう。</p>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">要件:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>ICharacter インターフェースに Attack・SpecialAttack・IsAlive を定義する</li>
            <li>Warrior・Mage・Healer クラスをそれぞれ実装する</li>
            <li>BattleSimulator で複数キャラを List{"<ICharacter>"} で管理してバトルを進行する</li>
            <li>ランダムな攻撃順序でターン制バトルを実装する</li>
          </ul>
        </div>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

// TODO: ICharacter インターフェースを定義する
interface ICharacter
{
    string Name { get; }
    int Hp { get; }
    int MaxHp { get; }
    bool IsAlive { get; }

    // TODO: int Attack(ICharacter target) を宣言する（ダメージ量を返す）
    // TODO: int SpecialAttack(ICharacter target) を宣言する（特殊攻撃）
    string GetStatus();
}

// TODO: CharacterBase 抽象クラスを作り共通処理を実装する
abstract class CharacterBase : ICharacter
{
    public string Name { get; protected set; }
    public int Hp { get; protected set; }
    public int MaxHp { get; protected set; }
    public bool IsAlive => Hp > 0;

    protected Random rng = new Random();

    public CharacterBase(string name, int maxHp)
    {
        Name = name;
        MaxHp = maxHp;
        Hp = maxHp;
    }

    // TODO: TakeDamage メソッドを実装する（Hp を減らし 0 未満にならないようにする）
    public void TakeDamage(int damage)
    {
        Hp = Math.Max(0, Hp - damage);
    }

    // TODO: Heal メソッドを実装する（Hp を増やし MaxHp を超えないようにする）
    public void Heal(int amount)
    {
        Hp = Math.Min(MaxHp, Hp + amount);
    }

    public string GetStatus() =>
        $"{Name} HP:{Hp}/{MaxHp}";

    public abstract int Attack(ICharacter target);
    public abstract int SpecialAttack(ICharacter target);
}

// TODO: Warrior クラスを実装する（通常攻撃: 20-35ダメージ、特殊: 渾身の一撃 50-80ダメージ）
class Warrior : CharacterBase
{
    public Warrior(string name) : base(name, 150) { }

    public override int Attack(ICharacter target)
    {
        int dmg = rng.Next(20, 36);
        (target as CharacterBase)?.TakeDamage(dmg);
        return dmg;
    }

    public override int SpecialAttack(ICharacter target)
    {
        // TODO: 50-80 のダメージを与えて返す
        return 0;
    }
}

// TODO: Mage クラスを実装する（通常攻撃: 15-25ダメージ、特殊: 魔法弾 60-100ダメージ）
class Mage : CharacterBase
{
    public Mage(string name) : base(name, 90) { }

    public override int Attack(ICharacter target)
    {
        // TODO: 15-25 のダメージを与えて返す
        return 0;
    }

    public override int SpecialAttack(ICharacter target)
    {
        // TODO: 60-100 のダメージを与えて返す
        return 0;
    }
}

// TODO: Healer クラスを実装する（通常攻撃: 10-20ダメージ、特殊: 回復魔法 味方1人を 40-60 回復）
class Healer : CharacterBase
{
    public Healer(string name) : base(name, 100) { }

    public override int Attack(ICharacter target)
    {
        // TODO: 10-20 のダメージを与えて返す
        return 0;
    }

    public override int SpecialAttack(ICharacter target)
    {
        // TODO: target を CharacterBase にキャストして 40-60 回復させ、回復量を返す（マイナス値で表現）
        return 0;
    }
}

class Program
{
    static void Main()
    {
        var heroes = new List<CharacterBase>
        {
            new Warrior("勇者アレン"),
            new Mage("魔法使いリリン"),
            new Healer("僧侶カイン"),
        };
        var enemy = new Warrior("魔王ダークロード");

        Console.WriteLine("=== バトル開始 ===");
        int turn = 1;
        var rng = new Random();

        while (heroes.Any(h => h.IsAlive) && enemy.IsAlive)
        {
            Console.WriteLine($"\\n--- ターン {turn} ---");

            // ヒーローの攻撃フェーズ
            foreach (var hero in heroes.Where(h => h.IsAlive))
            {
                bool useSpecial = rng.Next(3) == 0; // 1/3 の確率で特殊攻撃
                int result;
                if (hero is Healer && useSpecial)
                {
                    var wounded = heroes.Where(h => h.IsAlive).OrderBy(h => h.Hp).First();
                    result = hero.SpecialAttack(wounded);
                    Console.WriteLine($"  {hero.Name} が {wounded.Name} を回復！ ({-result}回復)");
                }
                else if (useSpecial)
                {
                    result = hero.SpecialAttack(enemy);
                    Console.WriteLine($"  {hero.Name} の特殊攻撃！ → 敵に{result}ダメージ");
                }
                else
                {
                    result = hero.Attack(enemy);
                    Console.WriteLine($"  {hero.Name} の攻撃 → 敵に{result}ダメージ");
                }
            }

            if (!enemy.IsAlive) break;

            // 敵の攻撃フェーズ
            var target = heroes.Where(h => h.IsAlive).OrderBy(_ => rng.Next()).First();
            int enemyDmg = enemy.Attack(target);
            Console.WriteLine($"  {enemy.Name} の攻撃 → {target.Name} に{enemyDmg}ダメージ");

            // ステータス表示
            Console.WriteLine("  [状態]");
            foreach (var h in heroes) Console.WriteLine($"    {h.GetStatus()}{(!h.IsAlive ? " (戦闘不能)" : "")}");
            Console.WriteLine($"    {enemy.GetStatus()}");

            turn++;
            if (turn > 20) break; // 無限ループ防止
        }

        Console.WriteLine("\\n=== バトル終了 ===");
        if (enemy.IsAlive)
            Console.WriteLine("魔王の勝利！");
        else
            Console.WriteLine("勇者たちの勝利！");
    }
}`}
          expectedOutput={`=== バトル開始 ===

--- ターン 1 ---
  勇者アレンの攻撃 → 敵に28ダメージ
  魔法使いリリンの攻撃 → 敵に19ダメージ
  僧侶カインの攻撃 → 敵に14ダメージ
  魔王ダークロードの攻撃 → 勇者アレン に32ダメージ
  [状態]
    勇者アレン HP:118/150
    魔法使いリリン HP:90/90
    僧侶カイン HP:100/100
    魔王ダークロード HP:89/150
（以降ランダムで進行）`}
        />
      </section>
    </div>
  );
}
