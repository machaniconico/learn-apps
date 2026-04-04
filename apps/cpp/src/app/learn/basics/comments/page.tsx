import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">単一行・複数行コメントの書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはプログラムの実行には影響しない、人間のための説明文です。
          コードの意図や動作を説明するために使います。コンパイラはコメントを無視します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">//</code> - 単一行コメント（行末まで）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">/* ... */</code> - 複数行コメント（範囲指定）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単一行コメント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">//</code> から行末までがコメントになります。最も一般的なコメントです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // これは単一行コメントです
    std::cout << "Hello!" << std::endl;

    int x = 10;  // 行末にもコメントを書ける
    int y = 20;  // yに20を代入

    // 計算結果を出力
    std::cout << "合計: " << (x + y) << std::endl;

    // コメントアウト：一時的にコードを無効化
    // std::cout << "この行は実行されない" << std::endl;

    std::cout << "コメントは実行に影響しません" << std::endl;

    return 0;
}`}
          expectedOutput={`Hello!
合計: 30
コメントは実行に影響しません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数行コメント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">/*</code> と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*/</code> で囲んだ範囲がコメントになります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

/*
 * このプログラムはコメントのデモです。
 * 複数行にわたる説明を書くことができます。
 * 関数やクラスの説明に便利です。
 */

int main() {
    /* 変数の初期化 */
    int width = 10;
    int height = 5;

    /*
    面積を計算して出力する。
    width * height で面積を求める。
    */
    int area = width * height;
    std::cout << "面積: " << area << std::endl;

    /* インラインでも使える */ std::cout << "幅: " << width << std::endl;

    std::cout << "高さ: " << height << std::endl;

    return 0;
}`}
          expectedOutput={`面積: 50
幅: 10
高さ: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">良いコメントの書き方</h2>
        <p className="text-gray-400 mb-4">
          効果的なコメントの書き方と、ドキュメンテーションコメントの例です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

/**
 * @brief 挨拶メッセージを生成する
 * @param name 挨拶する相手の名前
 * @return フォーマットされた挨拶文字列
 */
std::string createGreeting(const std::string& name) {
    return "こんにちは、" + name + "さん！";
}

// BMIを計算する（体重kg / 身長m^2）
double calculateBMI(double weight, double height) {
    // 不正な入力をチェック
    if (height <= 0) return 0.0;
    return weight / (height * height);
}

int main() {
    // 良いコメント: なぜそうするかを説明
    // 悪いコメント: コードの内容をそのまま繰り返す

    std::string greeting = createGreeting("太郎");
    std::cout << greeting << std::endl;

    // BMI = 体重(kg) / 身長(m)^2
    double bmi = calculateBMI(70.0, 1.75);
    std::cout << "BMI: " << bmi << std::endl;

    // TODO: 入力バリデーションを追加する
    // FIXME: 小数点以下の桁数を調整する

    return 0;
}`}
          expectedOutput={`こんにちは、太郎さん！
BMI: 22.8571`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
