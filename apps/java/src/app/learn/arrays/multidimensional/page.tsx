import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function MultidimensionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元配列</h1>
        <p className="text-gray-400">2次元配列とジャグ配列</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">多次元配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          多次元配列は「配列の配列」です。2次元配列は行列のようにデータを格納できます。
          Javaではジャグ配列（各行の長さが異なる配列）も作成できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>int[][] matrix = new int[3][4];</code> で3行4列の2次元配列</li>
          <li><code>matrix[行][列]</code> で要素にアクセス</li>
          <li><code>matrix.length</code> で行数、<code>matrix[0].length</code> で列数</li>
          <li>ジャグ配列: 各行の列数が異なる配列</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列の基本</h2>
        <p className="text-gray-400 mb-4">
          2次元配列を作成し、行と列で要素にアクセスします。
          テーブルやグリッドのデータを表現するのに便利です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 初期化子で2次元配列を作成
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // 全要素を表示
        System.out.println("行数: " + matrix.length);
        System.out.println("列数: " + matrix[0].length);

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // 特定要素へのアクセス
        System.out.println("matrix[1][2] = " + matrix[1][2]);
    }
}`}
          expectedOutput={`行数: 3
列数: 3
1 2 3
4 5 6
7 8 9
matrix[1][2] = 6`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジャグ配列</h2>
        <p className="text-gray-400 mb-4">
          ジャグ配列は各行の長さが異なる配列です。
          三角形のデータ構造などに使えます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // ジャグ配列: 各行の長さが異なる
        int[][] jagged = new int[4][];
        jagged[0] = new int[]{1};
        jagged[1] = new int[]{2, 3};
        jagged[2] = new int[]{4, 5, 6};
        jagged[3] = new int[]{7, 8, 9, 10};

        // 三角形に表示
        for (int i = 0; i < jagged.length; i++) {
            System.out.print("行" + i + "(" + jagged[i].length + "列): ");
            for (int val : jagged[i]) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`}
          expectedOutput={`行0(1列): 1
行1(2列): 2 3
行2(3列): 4 5 6
行3(4列): 7 8 9 10 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列の活用</h2>
        <p className="text-gray-400 mb-4">
          成績表のような実践的なデータを2次元配列で管理し、
          行ごとの合計や平均を計算します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String[] subjects = {"国語", "数学", "英語"};
        String[] students = {"田中", "鈴木", "佐藤"};

        int[][] scores = {
            {85, 92, 78},  // 田中
            {90, 88, 95},  // 鈴木
            {72, 96, 80}   // 佐藤
        };

        // 各生徒の平均を計算
        for (int i = 0; i < students.length; i++) {
            int sum = 0;
            for (int j = 0; j < subjects.length; j++) {
                sum += scores[i][j];
            }
            double avg = (double) sum / subjects.length;
            System.out.printf("%s: 合計=%d, 平均=%.1f%n", students[i], sum, avg);
        }
    }
}`}
          expectedOutput={`田中: 合計=255, 平均=85.0
鈴木: 合計=273, 平均=91.0
佐藤: 合計=248, 平均=82.7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}
