import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ConstructorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンストラクタ</h1>
        <p className="text-gray-400">オブジェクト初期化のためのコンストラクタ定義を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタとは</h2>
        <p className="text-gray-300 leading-relaxed">
          コンストラクタはオブジェクト生成時に自動的に呼ばれる特殊なメンバ関数です。
          クラス名と同じ名前を持ち、戻り値はありません。デフォルトコンストラクタ、
          パラメータ付きコンストラクタ、コピーコンストラクタなどがあります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々なコンストラクタ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Point {
    double x, y;

public:
    // デフォルトコンストラクタ
    Point() : x(0), y(0) {
        cout << "デフォルト: (" << x << ", " << y << ")" << endl;
    }

    // パラメータ付きコンストラクタ
    Point(double x, double y) : x(x), y(y) {
        cout << "パラメータ: (" << x << ", " << y << ")" << endl;
    }

    // コピーコンストラクタ
    Point(const Point& other) : x(other.x), y(other.y) {
        cout << "コピー: (" << x << ", " << y << ")" << endl;
    }

    void show() const {
        cout << "(" << x << ", " << y << ")" << endl;
    }
};

int main() {
    Point p1;           // デフォルト
    Point p2(3.0, 4.0); // パラメータ付き
    Point p3 = p2;       // コピー
    Point p4(p2);        // コピー（別の書き方）

    return 0;
}`}
          expectedOutput={`デフォルト: (0, 0)
パラメータ: (3, 4)
コピー: (3, 4)
コピー: (3, 4)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">委譲コンストラクタとdefault/delete</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Rectangle {
    double width, height;

public:
    // 主コンストラクタ
    Rectangle(double w, double h) : width(w), height(h) {}

    // 委譲コンストラクタ（正方形用）
    Rectangle(double side) : Rectangle(side, side) {}

    // デフォルトコンストラクタも委譲
    Rectangle() : Rectangle(1.0, 1.0) {}

    double area() const { return width * height; }
    void show() const {
        cout << width << " x " << height << " = " << area() << endl;
    }
};

class Singleton {
public:
    // コピー禁止
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

    static Singleton& getInstance() {
        static Singleton instance;
        return instance;
    }
    void hello() { cout << "Singleton!" << endl; }

private:
    Singleton() = default;  // デフォルト実装を使用
};

int main() {
    Rectangle r1;
    Rectangle r2(5.0);
    Rectangle r3(3.0, 4.0);
    r1.show();
    r2.show();
    r3.show();

    Singleton::getInstance().hello();
    return 0;
}`}
          expectedOutput={`1 x 1 = 1
5 x 5 = 25
3 x 4 = 12
Singleton!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="constructors" />
      </div>
      <LessonNav lessons={lessons} currentId="constructors" basePath="/learn/classes" />
    </div>
  );
}
