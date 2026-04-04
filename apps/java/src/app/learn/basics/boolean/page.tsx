import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">boolean型とtrue/falseの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">boolean型と論理演算</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">boolean</code> 型は <code>true</code> か <code>false</code> の2値のみを持ちます。
          条件式の結果は常にboolean値となり、if文やwhileループの条件に使われます。
          論理演算子を使って複数の条件を組み合わせることもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>&&</code>（AND）: 両方trueのときtrue</li>
          <li><code>||</code>（OR）: どちらかがtrueのときtrue</li>
          <li><code>!</code>（NOT）: 値を反転</li>
          <li>比較演算子（<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code> など）はboolean値を返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">boolean変数と比較演算</h2>
        <p className="text-gray-400 mb-4">
          比較演算子の結果をboolean変数に格納して活用できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        boolean isActive = true;
        boolean isDeleted = false;

        System.out.println("有効: " + isActive);
        System.out.println("削除済: " + isDeleted);

        // 比較演算の結果はboolean
        int score = 85;
        boolean passed = score >= 60;
        boolean perfect = score == 100;

        System.out.println("合格: " + passed);
        System.out.println("満点: " + perfect);

        // 文字列の比較
        String role = "admin";
        boolean isAdmin = role.equals("admin");
        System.out.println("管理者: " + isAdmin);
    }
}`}
          expectedOutput={`有効: true
削除済: false
合格: true
満点: false
管理者: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">&&</code>、<code className="text-orange-300">||</code>、<code className="text-orange-300">!</code> を使って
          複数の条件を組み合わせます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        boolean hasInsurance = false;

        // AND: 両方true → true
        boolean canDrive = hasLicense && hasInsurance;
        System.out.println("運転可能: " + canDrive);

        // OR: どちらかtrue → true
        boolean hasDocument = hasLicense || hasInsurance;
        System.out.println("書類あり: " + hasDocument);

        // NOT: 反転
        System.out.println("免許なし: " + !hasLicense);

        // 複合条件
        boolean eligible = age >= 18 && hasLicense;
        System.out.println("資格あり: " + eligible);
    }
}`}
          expectedOutput={`運転可能: false
書類あり: true
免許なし: false
資格あり: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">短絡評価（ショートサーキット）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">&&</code> と <code className="text-orange-300">||</code> は短絡評価を行います。
          左辺で結果が確定すると右辺は評価されません。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // && の短絡評価: 左辺がfalseなら右辺は評価されない
        int x = 0;
        boolean result1 = (x != 0) && (10 / x > 1);
        System.out.println("AND短絡: " + result1);

        // || の短絡評価: 左辺がtrueなら右辺は評価されない
        boolean result2 = true || (10 / x > 1);
        System.out.println("OR短絡: " + result2);

        // 実用例: nullチェックと組み合わせ
        String name = null;
        boolean isValid = name != null && name.length() > 0;
        System.out.println("有効な名前: " + isValid);
    }
}`}
          expectedOutput={`AND短絡: false
OR短絡: true
有効な名前: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}
