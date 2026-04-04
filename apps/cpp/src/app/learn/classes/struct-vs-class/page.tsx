import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function StructVsClassPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">structとclass</h1>
        <p className="text-gray-400">構造体とクラスの違いと使い分けを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">structとclassの違い</h2>
        <p className="text-gray-300 leading-relaxed">
          C++ではstructとclassはほぼ同じ機能を持ちます。唯一の違いはデフォルトのアクセス修飾子です。
          structはデフォルトpublic、classはデフォルトprivateです。慣習的に、structはデータの集まり（POD型）に、
          classは振る舞いを持つオブジェクトに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">structとclassの比較</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// struct: データの集まり（デフォルトpublic）
struct Point {
    double x;  // publicがデフォルト
    double y;

    double distance() const {
        return sqrt(x * x + y * y);
    }
};

// class: 振る舞いを持つオブジェクト（デフォルトprivate）
class Circle {
    double radius;  // privateがデフォルト
    Point center;

public:
    Circle(Point c, double r) : center(c), radius(r) {}

    double area() const { return 3.14159 * radius * radius; }
    void show() const {
        cout << "中心(" << center.x << ", " << center.y
             << ") 半径: " << radius << " 面積: " << area() << endl;
    }
};

int main() {
    // structは直接メンバにアクセス可能
    Point p{3.0, 4.0};
    cout << "Point(" << p.x << ", " << p.y << ")" << endl;
    cout << "原点からの距離: " << p.distance() << endl;

    // classはpublicインターフェース経由
    Circle c(p, 5.0);
    c.show();

    return 0;
}`}
          expectedOutput={`Point(3, 4)
原点からの距離: 5
中心(3, 4) 半径: 5 面積: 78.5398`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">集成体初期化と構造化束縛</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// 集成体（aggregate）: ユーザー定義コンストラクタなし
struct Color {
    int r, g, b;
    string name;
};

struct Config {
    int width = 800;    // デフォルト値
    int height = 600;
    bool fullscreen = false;
};

int main() {
    // 集成体初期化
    Color red{255, 0, 0, "赤"};
    Color blue{.r = 0, .g = 0, .b = 255, .name = "青"};  // C++20指示付き

    cout << red.name << ": (" << red.r << "," << red.g << "," << red.b << ")" << endl;
    cout << blue.name << ": (" << blue.r << "," << blue.g << "," << blue.b << ")" << endl;

    // デフォルト値の利用
    Config cfg;
    cout << cfg.width << "x" << cfg.height << endl;

    Config custom{1920, 1080, true};
    cout << custom.width << "x" << custom.height
         << (custom.fullscreen ? " フルスクリーン" : " ウィンドウ") << endl;

    // 構造化束縛 (C++17)
    auto [r, g, b, name] = red;
    cout << name << "のR値: " << r << endl;

    return 0;
}`}
          expectedOutput={`赤: (255,0,0)
青: (0,0,255)
800x600
1920x1080 フルスクリーン
赤のR値: 255`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="struct-vs-class" />
      </div>
      <LessonNav lessons={lessons} currentId="struct-vs-class" basePath="/learn/classes" />
    </div>
  );
}
