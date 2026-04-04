import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function StrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">デザインパターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Strategyパターン</h1>
        <p className="text-gray-400">アルゴリズムの切り替えを可能にするStrategyパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Strategyパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Strategyパターンはアルゴリズムをカプセル化し、実行時に動的に切り替えられるようにするパターンです。
          if-elseの連鎖を避け、新しいアルゴリズムの追加を容易にします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">仮想クラスによるStrategy</h2>
        <p className="text-gray-400 mb-4">圧縮アルゴリズムを動的に切り替える例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
#include <string>
using namespace std;

class CompressionStrategy {
public:
    virtual ~CompressionStrategy() = default;
    virtual string compress(const string& data) = 0;
    virtual string name() const = 0;
};

class ZipCompression : public CompressionStrategy {
public:
    string compress(const string& data) override {
        return "[ZIP:" + to_string(data.size()) + "bytes]";
    }
    string name() const override { return "ZIP"; }
};

class GzipCompression : public CompressionStrategy {
public:
    string compress(const string& data) override {
        return "[GZIP:" + to_string(data.size()) + "bytes]";
    }
    string name() const override { return "GZIP"; }
};

class FileCompressor {
    unique_ptr<CompressionStrategy> strategy_;
public:
    void setStrategy(unique_ptr<CompressionStrategy> s) {
        strategy_ = move(s);
    }

    void compressFile(const string& data) {
        if (!strategy_) {
            cout << "戦略が未設定" << endl;
            return;
        }
        cout << strategy_->name() << ": "
             << strategy_->compress(data) << endl;
    }
};

int main() {
    FileCompressor compressor;
    string data = "Hello, World! This is test data.";

    compressor.setStrategy(make_unique<ZipCompression>());
    compressor.compressFile(data);

    compressor.setStrategy(make_unique<GzipCompression>());
    compressor.compressFile(data);
    return 0;
}`}
          expectedOutput={`ZIP: [ZIP:31bytes]
GZIP: [GZIP:31bytes]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::functionによるStrategy</h2>
        <p className="text-gray-400 mb-4">ラムダ式でより軽量にStrategyを実装する方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <functional>
#include <vector>
#include <algorithm>
using namespace std;

class Sorter {
    function<bool(int, int)> compare_;
    string name_;
public:
    void setStrategy(const string& name, function<bool(int, int)> cmp) {
        name_ = name;
        compare_ = move(cmp);
    }

    void sort(vector<int>& data) {
        std::sort(data.begin(), data.end(), compare_);
        cout << name_ << ": ";
        for (int x : data) cout << x << " ";
        cout << endl;
    }
};

int main() {
    Sorter sorter;
    vector<int> data = {5, 2, 8, 1, 9, 3};

    // 昇順戦略
    sorter.setStrategy("昇順", [](int a, int b) { return a < b; });
    sorter.sort(data);

    // 降順戦略
    sorter.setStrategy("降順", [](int a, int b) { return a > b; });
    sorter.sort(data);

    // 偶数優先戦略
    sorter.setStrategy("偶数優先", [](int a, int b) {
        if (a % 2 != b % 2) return a % 2 < b % 2;
        return a < b;
    });
    sorter.sort(data);

    return 0;
}`}
          expectedOutput={`昇順: 1 2 3 5 8 9
降順: 9 8 5 3 2 1
偶数優先: 2 8 1 3 5 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/design" />
    </div>
  );
}
