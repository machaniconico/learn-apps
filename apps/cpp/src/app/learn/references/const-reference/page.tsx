import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("references");

export default function ConstReferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">参照 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">const参照</h1>
        <p className="text-gray-400">変更不可な参照によるコピー回避</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">const参照とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">const int&amp; ref</code> は参照先の値を変更できない参照です。
          関数の引数で大きなオブジェクトのコピーを避けつつ、誤った変更を防ぐために使います。
        </p>
        <p className="text-gray-300 leading-relaxed">
          const参照は右辺値（リテラルや一時オブジェクト）もバインドできるという特別な性質があります。
          通常の参照は左辺値しかバインドできません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const参照の基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// const参照で受け取る（コピーなし・変更不可）
void printInfo(const string& name, const int& age) {
    cout << name << " (" << age << "歳)" << endl;
    // name = "変更";  // コンパイルエラー！
    // age = 0;         // コンパイルエラー！
}

int main() {
    string name = "田中";
    int age = 25;

    printInfo(name, age);

    // const参照はリテラルもバインドできる
    const int& ref = 42;
    cout << "リテラルへのconst参照: " << ref << endl;

    // 通常の参照はリテラルをバインドできない
    // int& bad = 42;  // コンパイルエラー！

    // 一時オブジェクトもバインド可能
    const string& temp = string("一時オブジェクト");
    cout << temp << endl;

    return 0;
}`}
          expectedOutput={`田中 (25歳)
リテラルへのconst参照: 42
一時オブジェクト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const参照でコピーを避ける</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

// const参照: コピーなし、変更不可（推奨）
void printStudent(const Student& s) {
    cout << s.name << ": " << s.score << "点" << endl;
}

// 値渡し: 毎回コピーが作られる（非効率）
void printStudentCopy(Student s) {
    cout << s.name << ": " << s.score << "点" << endl;
}

double average(const vector<int>& scores) {
    double sum = 0;
    for (const int& s : scores) {  // 範囲forでもconst参照
        sum += s;
    }
    return sum / scores.size();
}

int main() {
    Student st = {"佐藤花子", 95};
    printStudent(st);

    vector<int> scores = {80, 90, 75, 85, 100};
    cout << "平均: " << average(scores) << "点" << endl;

    // const参照は元の変数を変更しない保証
    cout << "scores[0] = " << scores[0] << " (変更なし)" << endl;

    return 0;
}`}
          expectedOutput={`佐藤花子: 95点
平均: 86点
scores[0] = 80 (変更なし)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="references" lessonId="const-reference" />
      </div>
      <LessonNav lessons={lessons} currentId="const-reference" basePath="/learn/references" />
    </div>
  );
}
