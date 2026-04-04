import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数</h1>
        <p className="text-gray-400">メソッドに値を渡す方法と、値渡し・参照型の挙動を理解します</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの引数（パラメータ）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドに引数を渡すことで、同じメソッドを異なるデータで使い回せます。
          Javaではプリミティブ型は「値渡し」、参照型も「参照の値渡し」として扱われます。
          つまりプリミティブ型の引数を変更しても呼び出し元には影響しませんが、
          配列やオブジェクトの中身を変更すると呼び出し元にも影響します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>プリミティブ型（int, double等）は値のコピーが渡される</li>
          <li>参照型（配列、オブジェクト）は参照のコピーが渡される</li>
          <li>複数の引数はカンマで区切って定義する</li>
          <li>引数の型と順序はメソッドのシグネチャの一部</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プリミティブ型の値渡し</h2>
        <p className="text-gray-400 mb-4">プリミティブ型は値のコピーが渡されるため、メソッド内で変更しても元の変数には影響しません。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static void tryToChange(int num) {
        num = 999;  // コピーを変更しているだけ
        System.out.println("メソッド内: " + num);
    }

    static void doubleValue(int x) {
        System.out.println(x + " の2倍は " + (x * 2));
    }

    static void showRange(int min, int max) {
        System.out.println(min + " から " + max + " まで");
        int sum = 0;
        for (int i = min; i <= max; i++) {
            sum += i;
        }
        System.out.println("合計: " + sum);
    }

    public static void main(String[] args) {
        int value = 10;
        tryToChange(value);
        System.out.println("呼び出し後: " + value);  // 10のまま

        System.out.println("---");
        doubleValue(5);
        doubleValue(100);

        System.out.println("---");
        showRange(1, 5);
    }
}`}
          expectedOutput={`メソッド内: 999
呼び出し後: 10
---
5 の2倍は 10
100 の2倍は 200
---
1 から 5 まで
合計: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照型の挙動</h2>
        <p className="text-gray-400 mb-4">配列やオブジェクトは参照のコピーが渡されるため、中身を変更すると呼び出し元にも反映されます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 配列の中身を変更 → 呼び出し元に影響する
    static void doubleAll(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            arr[i] *= 2;
        }
    }

    // 配列の内容を表示
    static void printArray(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append(arr[i]);
        }
        sb.append("]");
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        System.out.print("変更前: ");
        printArray(numbers);

        doubleAll(numbers);  // 配列の中身が変わる

        System.out.print("変更後: ");
        printArray(numbers);
    }
}`}
          expectedOutput={`変更前: [1, 2, 3, 4, 5]
変更後: [2, 4, 6, 8, 10]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の引数を使った実践例</h2>
        <p className="text-gray-400 mb-4">型の異なる複数の引数を受け取るメソッドの実用例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static String formatUser(String name, int age, String city) {
        return name + "さん（" + age + "歳、" + city + "在住）";
    }

    static double calcBMI(double height, double weight) {
        double heightM = height / 100.0;
        return weight / (heightM * heightM);
    }

    public static void main(String[] args) {
        System.out.println(formatUser("田中", 25, "東京"));
        System.out.println(formatUser("鈴木", 30, "大阪"));

        System.out.println("---");
        double bmi = calcBMI(170.0, 65.0);
        System.out.printf("BMI: %.1f%n", bmi);
    }
}`}
          expectedOutput={`田中さん（25歳、東京在住）
鈴木さん（30歳、大阪在住）
---
BMI: 22.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/methods" />
    </div>
  );
}
