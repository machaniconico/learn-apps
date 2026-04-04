import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

export default function NoexceptPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ムーブセマンティクス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">noexcept</h1>
        <p className="text-gray-400">例外を投げない保証とムーブセマンティクスにおけるnoexceptの重要性を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">noexceptの基本</h2>
        <p className="text-gray-400 mb-4">
          noexcept指定子は関数が例外を投げないことを保証します。
          コンパイラはこの情報を使って最適化を行い、STLコンテナはムーブの安全性を判断します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <type_traits>
using namespace std;

void safeFunc() noexcept {
    cout << "例外を投げない関数" << endl;
}

void riskyFunc() {
    cout << "例外を投げる可能性のある関数" << endl;
}

int main() {
    safeFunc();
    riskyFunc();

    // noexcept演算子で確認
    cout << "safeFunc noexcept: "
         << (noexcept(safeFunc()) ? "はい" : "いいえ") << endl;
    cout << "riskyFunc noexcept: "
         << (noexcept(riskyFunc()) ? "はい" : "いいえ") << endl;

    // 条件付きnoexcept
    int x = 5;
    cout << "int加算 noexcept: "
         << (noexcept(x + x) ? "はい" : "いいえ") << endl;

    return 0;
}`}
          expectedOutput={`例外を投げない関数
例外を投げる可能性のある関数
safeFunc noexcept: はい
riskyFunc noexcept: いいえ
int加算 noexcept: はい`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブとnoexcept</h2>
        <p className="text-gray-400 mb-4">
          std::vectorなどのSTLコンテナは、リサイズ時にnoexceptなムーブコンストラクタがある場合のみムーブを使います。
          noexceptがないとコピーにフォールバックし、パフォーマンスが低下します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

class WithNoexcept {
public:
    WithNoexcept() { cout << "構築" << endl; }
    WithNoexcept(const WithNoexcept&) { cout << "コピー" << endl; }
    WithNoexcept(WithNoexcept&&) noexcept { cout << "ムーブ" << endl; }
};

class WithoutNoexcept {
public:
    WithoutNoexcept() { cout << "構築" << endl; }
    WithoutNoexcept(const WithoutNoexcept&) { cout << "コピー" << endl; }
    WithoutNoexcept(WithoutNoexcept&&) { cout << "ムーブ(非noexcept)" << endl; }
};

int main() {
    cout << "=== noexceptあり ===" << endl;
    vector<WithNoexcept> v1;
    v1.reserve(1);
    v1.emplace_back();
    cout << "--- push_back ---" << endl;
    v1.emplace_back();  // リサイズ時にムーブが使われる

    cout << endl;
    cout << "=== noexceptなし ===" << endl;
    vector<WithoutNoexcept> v2;
    v2.reserve(1);
    v2.emplace_back();
    cout << "--- push_back ---" << endl;
    v2.emplace_back();  // リサイズ時にコピーが使われる

    return 0;
}`}
          expectedOutput={`=== noexceptあり ===
構築
--- push_back ---
構築
ムーブ

=== noexceptなし ===
構築
--- push_back ---
構築
コピー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">move_if_noexcept</h2>
        <p className="text-gray-400 mb-4">
          std::move_if_noexceptは、ムーブコンストラクタがnoexceptの場合のみムーブし、
          そうでなければコピーを行う安全なユーティリティです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <utility>
#include <type_traits>
using namespace std;

class Safe {
    int value;
public:
    Safe(int v) : value(v) {}
    Safe(const Safe& o) : value(o.value) { cout << "Safeコピー" << endl; }
    Safe(Safe&& o) noexcept : value(o.value) {
        o.value = 0;
        cout << "Safeムーブ" << endl;
    }
    int get() const { return value; }
};

class Unsafe {
    int value;
public:
    Unsafe(int v) : value(v) {}
    Unsafe(const Unsafe& o) : value(o.value) { cout << "Unsafeコピー" << endl; }
    Unsafe(Unsafe&& o) : value(o.value) {  // noexceptなし
        o.value = 0;
        cout << "Unsafeムーブ" << endl;
    }
    int get() const { return value; }
};

int main() {
    Safe s(42);
    cout << "Safe move_if_noexcept: ";
    Safe s2 = std::move_if_noexcept(s);  // ムーブ
    cout << "結果: " << s2.get() << endl;

    Unsafe u(99);
    cout << "Unsafe move_if_noexcept: ";
    Unsafe u2 = std::move_if_noexcept(u);  // コピー（安全側）
    cout << "結果: " << u2.get() << endl;

    return 0;
}`}
          expectedOutput={`Safe move_if_noexcept: Safeムーブ
結果: 42
Unsafe move_if_noexcept: Unsafeコピー
結果: 99`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="move" lessonId="noexcept" />
      </div>
      <LessonNav lessons={lessons} currentId="noexcept" basePath="/learn/move" />
    </div>
  );
}
