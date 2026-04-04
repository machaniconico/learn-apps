import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function PureVirtualPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">純粋仮想関数</h1>
        <p className="text-gray-400">抽象クラスと純粋仮想関数の定義を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">純粋仮想関数と抽象クラス</h2>
        <p className="text-gray-300 leading-relaxed">
          純粋仮想関数は = 0 で宣言され、実装を持たない仮想関数です。
          純粋仮想関数を1つ以上持つクラスは抽象クラスとなり、直接インスタンスを生成できません。
          派生クラスですべての純粋仮想関数を実装する必要があります。
          インターフェースの定義に最適な仕組みです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスの定義と実装</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

// 抽象クラス（インターフェース）
class Drawable {
public:
    virtual void draw() const = 0;      // 純粋仮想関数
    virtual string type() const = 0;    // 純粋仮想関数
    virtual ~Drawable() = default;
};

class Circle : public Drawable {
    double radius;
public:
    Circle(double r) : radius(r) {}
    void draw() const override {
        cout << "○ (半径: " << radius << ")" << endl;
    }
    string type() const override { return "Circle"; }
};

class Square : public Drawable {
    double side;
public:
    Square(double s) : side(s) {}
    void draw() const override {
        cout << "□ (辺: " << side << ")" << endl;
    }
    string type() const override { return "Square"; }
};

class Triangle : public Drawable {
    double base, height;
public:
    Triangle(double b, double h) : base(b), height(h) {}
    void draw() const override {
        cout << "△ (底辺: " << base << ", 高さ: " << height << ")" << endl;
    }
    string type() const override { return "Triangle"; }
};

int main() {
    // Drawable d;  // エラー: 抽象クラスはインスタンス化できない

    vector<unique_ptr<Drawable>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Square>(3.0));
    shapes.push_back(make_unique<Triangle>(4.0, 3.0));

    for (const auto& s : shapes) {
        cout << s->type() << ": ";
        s->draw();
    }

    return 0;
}`}
          expectedOutput={`Circle: ○ (半径: 5)
Square: □ (辺: 3)
Triangle: △ (底辺: 4, 高さ: 3)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースパターン</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// インターフェース: 純粋仮想関数のみ
class Serializable {
public:
    virtual string serialize() const = 0;
    virtual ~Serializable() = default;
};

class Printable {
public:
    virtual void print() const = 0;
    virtual ~Printable() = default;
};

// 複数のインターフェースを実装
class User : public Serializable, public Printable {
    string name;
    int age;

public:
    User(string n, int a) : name(n), age(a) {}

    string serialize() const override {
        return "{name:" + name + ",age:" + to_string(age) + "}";
    }

    void print() const override {
        cout << name << " (" << age << "歳)" << endl;
    }
};

int main() {
    User user("太郎", 25);

    // Printableとして使う
    const Printable& p = user;
    p.print();

    // Serializableとして使う
    const Serializable& s = user;
    cout << "JSON: " << s.serialize() << endl;

    return 0;
}`}
          expectedOutput={`太郎 (25歳)
JSON: {name:太郎,age:25}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="pure-virtual" />
      </div>
      <LessonNav lessons={lessons} currentId="pure-virtual" basePath="/learn/inheritance" />
    </div>
  );
}
