import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function FactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">デザインパターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Factoryパターン</h1>
        <p className="text-gray-400">オブジェクト生成を抽象化するFactoryパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Factoryパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Factoryパターンはオブジェクトの生成ロジックをクライアントコードから分離するパターンです。
          クライアントは具体的なクラスを知らなくても、インターフェースを通じてオブジェクトを生成できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Simple Factory</h2>
        <p className="text-gray-400 mb-4">条件に応じて異なるオブジェクトを生成するシンプルなファクトリです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
using namespace std;

class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() const = 0;
};

class Circle : public Shape {
public:
    void draw() const override { cout << "○ 円を描画" << endl; }
};

class Rectangle : public Shape {
public:
    void draw() const override { cout << "□ 四角を描画" << endl; }
};

class Triangle : public Shape {
public:
    void draw() const override { cout << "△ 三角を描画" << endl; }
};

// ファクトリ関数
unique_ptr<Shape> createShape(const string& type) {
    if (type == "circle") return make_unique<Circle>();
    if (type == "rectangle") return make_unique<Rectangle>();
    if (type == "triangle") return make_unique<Triangle>();
    return nullptr;
}

int main() {
    auto shapes = { "circle", "rectangle", "triangle" };
    for (const auto& type : shapes) {
        auto shape = createShape(type);
        if (shape) shape->draw();
    }
    return 0;
}`}
          expectedOutput={`○ 円を描画
□ 四角を描画
△ 三角を描画`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Abstract Factory</h2>
        <p className="text-gray-400 mb-4">関連するオブジェクト群をまとめて生成するAbstract Factoryです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

// 製品のインターフェース
class Button {
public:
    virtual ~Button() = default;
    virtual void render() const = 0;
};

class Label {
public:
    virtual ~Label() = default;
    virtual void render() const = 0;
};

// Light テーマ
class LightButton : public Button {
public:
    void render() const override { cout << "[Light Button]" << endl; }
};
class LightLabel : public Label {
public:
    void render() const override { cout << "[Light Label]" << endl; }
};

// Dark テーマ
class DarkButton : public Button {
public:
    void render() const override { cout << "[Dark Button]" << endl; }
};
class DarkLabel : public Label {
public:
    void render() const override { cout << "[Dark Label]" << endl; }
};

// Abstract Factory
class UIFactory {
public:
    virtual ~UIFactory() = default;
    virtual unique_ptr<Button> createButton() = 0;
    virtual unique_ptr<Label> createLabel() = 0;
};

class LightFactory : public UIFactory {
public:
    unique_ptr<Button> createButton() override { return make_unique<LightButton>(); }
    unique_ptr<Label> createLabel() override { return make_unique<LightLabel>(); }
};

class DarkFactory : public UIFactory {
public:
    unique_ptr<Button> createButton() override { return make_unique<DarkButton>(); }
    unique_ptr<Label> createLabel() override { return make_unique<DarkLabel>(); }
};

void buildUI(UIFactory& factory) {
    auto btn = factory.createButton();
    auto lbl = factory.createLabel();
    btn->render();
    lbl->render();
}

int main() {
    cout << "=== Lightテーマ ===" << endl;
    LightFactory light;
    buildUI(light);

    cout << "=== Darkテーマ ===" << endl;
    DarkFactory dark;
    buildUI(dark);
    return 0;
}`}
          expectedOutput={`=== Lightテーマ ===
[Light Button]
[Light Label]
=== Darkテーマ ===
[Dark Button]
[Dark Label]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/design" />
    </div>
  );
}
