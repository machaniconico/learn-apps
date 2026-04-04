import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function HeaderSourcePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンパイル・ビルド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ヘッダとソース</h1>
        <p className="text-gray-400">.hと.cppの分離とインクルードガードを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜ分離するのか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ヘッダファイル(.h/.hpp)には<strong>宣言</strong>を、ソースファイル(.cpp)には<strong>実装</strong>を書きます。
          これにより変更のあったソースファイルのみ再コンパイルすれば済み、大規模プロジェクトでビルド時間が短縮されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ヘッダとソースの分離パターン</h2>
        <p className="text-gray-400 mb-4">通常のプロジェクト構造を1ファイルでシミュレートします。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// ===== point.h =====
// #pragma once
class Point {
public:
    Point(double x, double y);
    double getX() const;
    double getY() const;
    double distance(const Point& other) const;
    string toString() const;
private:
    double x_, y_;
};

// ===== point.cpp =====
#include <cmath>

Point::Point(double x, double y) : x_(x), y_(y) {}

double Point::getX() const { return x_; }
double Point::getY() const { return y_; }

double Point::distance(const Point& other) const {
    double dx = x_ - other.x_;
    double dy = y_ - other.y_;
    return sqrt(dx * dx + dy * dy);
}

string Point::toString() const {
    return "(" + to_string(x_) + ", " + to_string(y_) + ")";
}

// ===== main.cpp =====
int main() {
    Point a(0, 0);
    Point b(3, 4);

    cout << "点A: " << a.toString() << endl;
    cout << "点B: " << b.toString() << endl;
    cout << "距離: " << a.distance(b) << endl;
    return 0;
}`}
          expectedOutput={`点A: (0.000000, 0.000000)
点B: (3.000000, 4.000000)
距離: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">前方宣言による依存関係の削減</h2>
        <p className="text-gray-400 mb-4">前方宣言を使うとヘッダのインクルードを減らせます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// 前方宣言: 完全な定義なしにポインタ/参照を使える
class Engine;  // 前方宣言

class Car {
public:
    Car(const string& name);
    ~Car();
    void setEngine(Engine* e);
    void describe() const;
private:
    string name_;
    Engine* engine_;  // ポインタなら前方宣言だけでOK
};

class Engine {
public:
    Engine(int hp) : horsepower_(hp) {}
    int getHP() const { return horsepower_; }
private:
    int horsepower_;
};

Car::Car(const string& name) : name_(name), engine_(nullptr) {}
Car::~Car() {}
void Car::setEngine(Engine* e) { engine_ = e; }
void Car::describe() const {
    cout << name_;
    if (engine_) {
        cout << " (" << engine_->getHP() << "HP)";
    }
    cout << endl;
}

int main() {
    Car car("スポーツカー");
    Engine engine(300);
    car.setEngine(&engine);
    car.describe();
    return 0;
}`}
          expectedOutput={`スポーツカー (300HP)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="header-source" />
      </div>
      <LessonNav lessons={lessons} currentId="header-source" basePath="/learn/build" />
    </div>
  );
}
