import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DecoratorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">デザインパターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Decoratorパターン</h1>
        <p className="text-gray-400">機能を動的に追加するDecoratorパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Decoratorパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Decoratorパターンは既存のオブジェクトに機能を動的に追加するパターンです。
          継承よりも柔軟で、複数のデコレータを重ねることで機能を組み合わせられます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コーヒーショップの例</h2>
        <p className="text-gray-400 mb-4">飲み物にトッピングを動的に追加する典型的なDecoratorの例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
using namespace std;

class Beverage {
public:
    virtual ~Beverage() = default;
    virtual string description() const = 0;
    virtual int cost() const = 0;
};

class Coffee : public Beverage {
public:
    string description() const override { return "コーヒー"; }
    int cost() const override { return 300; }
};

class Tea : public Beverage {
public:
    string description() const override { return "紅茶"; }
    int cost() const override { return 250; }
};

// デコレータの基底クラス
class BeverageDecorator : public Beverage {
protected:
    unique_ptr<Beverage> beverage_;
public:
    BeverageDecorator(unique_ptr<Beverage> b) : beverage_(move(b)) {}
};

class Milk : public BeverageDecorator {
public:
    Milk(unique_ptr<Beverage> b) : BeverageDecorator(move(b)) {}
    string description() const override {
        return beverage_->description() + " + ミルク";
    }
    int cost() const override { return beverage_->cost() + 50; }
};

class Sugar : public BeverageDecorator {
public:
    Sugar(unique_ptr<Beverage> b) : BeverageDecorator(move(b)) {}
    string description() const override {
        return beverage_->description() + " + シュガー";
    }
    int cost() const override { return beverage_->cost() + 30; }
};

void printOrder(const Beverage& b) {
    cout << b.description() << " = " << b.cost() << "円" << endl;
}

int main() {
    // コーヒー + ミルク + シュガー
    auto drink1 = make_unique<Sugar>(
        make_unique<Milk>(
            make_unique<Coffee>()
        )
    );
    printOrder(*drink1);

    // 紅茶 + ミルク
    auto drink2 = make_unique<Milk>(make_unique<Tea>());
    printOrder(*drink2);

    return 0;
}`}
          expectedOutput={`コーヒー + ミルク + シュガー = 380円
紅茶 + ミルク = 300円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ストリームデコレータ</h2>
        <p className="text-gray-400 mb-4">データ処理にデコレータを適用する実用的な例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
#include <algorithm>
using namespace std;

class TextProcessor {
public:
    virtual ~TextProcessor() = default;
    virtual string process(const string& text) = 0;
};

class PlainText : public TextProcessor {
public:
    string process(const string& text) override { return text; }
};

class UpperCase : public TextProcessor {
    unique_ptr<TextProcessor> inner_;
public:
    UpperCase(unique_ptr<TextProcessor> p) : inner_(move(p)) {}
    string process(const string& text) override {
        string result = inner_->process(text);
        transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }
};

class Bracket : public TextProcessor {
    unique_ptr<TextProcessor> inner_;
public:
    Bracket(unique_ptr<TextProcessor> p) : inner_(move(p)) {}
    string process(const string& text) override {
        return "[" + inner_->process(text) + "]";
    }
};

int main() {
    auto proc = make_unique<Bracket>(
        make_unique<UpperCase>(
            make_unique<PlainText>()
        )
    );
    cout << proc->process("hello world") << endl;
    return 0;
}`}
          expectedOutput={`[HELLO WORLD]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="decorator" />
      </div>
      <LessonNav lessons={lessons} currentId="decorator" basePath="/learn/design" />
    </div>
  );
}
