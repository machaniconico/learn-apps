import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesAccessModifiersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">クラス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アクセス修飾子</h1>
        <p className="text-gray-400">public・private・protected・デフォルトの使い分けを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">4つのアクセス修飾子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaのアクセス修飾子は、クラスやメンバ（フィールド・メソッド）の可視性を制御します。
          適切なアクセス修飾子を使うことで、カプセル化を実現し、安全で保守しやすいコードを書けます。
          最も制限的な修飾子を選ぶのが良い設計の原則です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>public：すべてのクラスからアクセス可能</li>
          <li>protected：同一パッケージ + サブクラスからアクセス可能</li>
          <li>デフォルト（修飾子なし）：同一パッケージ内のみアクセス可能</li>
          <li>private：同一クラス内のみアクセス可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">privateによるカプセル化</h2>
        <p className="text-gray-400 mb-4">フィールドをprivateにして、メソッド経由でのみアクセスさせるカプセル化の例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class BankAccount {
        private String owner;
        private int balance;

        // コンストラクタ（public）
        public BankAccount(String owner, int initialBalance) {
            this.owner = owner;
            this.balance = Math.max(0, initialBalance);
        }

        // 残高照会（public）
        public int getBalance() {
            return balance;
        }

        // 入金（publicメソッド経由でprivateフィールドを変更）
        public void deposit(int amount) {
            if (amount > 0) {
                balance += amount;
                System.out.println(owner + ": " + amount + "円入金 → 残高" + balance + "円");
            }
        }

        // 出金
        public boolean withdraw(int amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                System.out.println(owner + ": " + amount + "円出金 → 残高" + balance + "円");
                return true;
            }
            System.out.println(owner + ": 出金失敗（残高不足）");
            return false;
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("田中", 10000);
        System.out.println("残高: " + account.getBalance() + "円");

        account.deposit(5000);
        account.withdraw(3000);
        account.withdraw(20000);  // 残高不足

        // account.balance = 999999; // コンパイルエラー: privateフィールド
    }
}`}
          expectedOutput={`残高: 10000円
田中: 5000円入金 → 残高15000円
田中: 3000円出金 → 残高12000円
田中: 出金失敗（残高不足）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">publicとprivateの使い分け</h2>
        <p className="text-gray-400 mb-4">外部に公開するメソッドと、内部でのみ使うヘルパーメソッドを分離します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static class PasswordValidator {
        private int minLength;

        public PasswordValidator(int minLength) {
            this.minLength = minLength;
        }

        // 内部ヘルパーメソッド（private）
        private boolean hasUpperCase(String s) {
            for (char c : s.toCharArray()) {
                if (Character.isUpperCase(c)) return true;
            }
            return false;
        }

        private boolean hasDigit(String s) {
            for (char c : s.toCharArray()) {
                if (Character.isDigit(c)) return true;
            }
            return false;
        }

        // 公開メソッド（public）
        public String validate(String password) {
            StringBuilder sb = new StringBuilder();
            if (password.length() < minLength)
                sb.append("長さ不足 ");
            if (!hasUpperCase(password))
                sb.append("大文字なし ");
            if (!hasDigit(password))
                sb.append("数字なし ");
            return sb.length() == 0 ? "OK" : sb.toString().trim();
        }
    }

    public static void main(String[] args) {
        PasswordValidator v = new PasswordValidator(8);

        String[] passwords = {"abc", "abcdefgh", "Abcdefg1", "short1A"};
        for (String pw : passwords) {
            System.out.println(pw + " → " + v.validate(pw));
        }
    }
}`}
          expectedOutput={`abc → 長さ不足 大文字なし 数字なし
abcdefgh → 大文字なし 数字なし
Abcdefg1 → OK
short1A → 長さ不足`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="access-modifiers" />
      </div>
      <LessonNav lessons={lessons} currentId="access-modifiers" basePath="/learn/classes" />
    </div>
  );
}
