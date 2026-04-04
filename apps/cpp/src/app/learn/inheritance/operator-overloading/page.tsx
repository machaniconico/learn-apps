import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function OperatorOverloadingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">継承・多態性 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子オーバーロード</h1>
        <p className="text-gray-400">クラスに対する演算子の定義を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演算子オーバーロードとは</h2>
        <p className="text-gray-300 leading-relaxed">
          演算子オーバーロードにより、クラスに対して+、-、==、&lt;&lt;などの演算子を定義できます。
          メンバ関数として定義する方法とフレンド関数として定義する方法があります。
          直感的な操作が可能になりますが、意味が明確な場合にのみ使用すべきです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子と比較演算子</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Fraction {
    int num, den;  // 分子, 分母

    void simplify() {
        int g = gcd(abs(num), abs(den));
        num /= g;
        den /= g;
        if (den < 0) { num = -num; den = -den; }
    }

    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }

public:
    Fraction(int n, int d) : num(n), den(d) { simplify(); }

    // 算術演算子
    Fraction operator+(const Fraction& other) const {
        return Fraction(num * other.den + other.num * den, den * other.den);
    }

    Fraction operator*(const Fraction& other) const {
        return Fraction(num * other.num, den * other.den);
    }

    // 比較演算子
    bool operator==(const Fraction& other) const {
        return num == other.num && den == other.den;
    }

    bool operator<(const Fraction& other) const {
        return num * other.den < other.num * den;
    }

    // 出力演算子（friend関数）
    friend ostream& operator<<(ostream& os, const Fraction& f) {
        os << f.num << "/" << f.den;
        return os;
    }
};

int main() {
    Fraction a(1, 2);
    Fraction b(1, 3);

    cout << a << " + " << b << " = " << (a + b) << endl;
    cout << a << " * " << b << " = " << (a * b) << endl;
    cout << a << " == " << b << ": " << (a == b ? "Yes" : "No") << endl;
    cout << a << " < " << b << ": " << (a < b ? "Yes" : "No") << endl;

    Fraction c(2, 4);
    cout << a << " == " << c << ": " << (a == c ? "Yes" : "No") << endl;

    return 0;
}`}
          expectedOutput={`1/2 + 1/3 = 5/6
1/2 * 1/3 = 1/6
1/2 == 1/3: No
1/2 < 1/3: No
1/2 == 1/2: Yes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">添字演算子とインクリメント</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
using namespace std;

class SafeArray {
    int* data;
    int size;

public:
    SafeArray(int n) : size(n), data(new int[n]()) {}
    ~SafeArray() { delete[] data; }

    // コピー禁止（簡略化のため）
    SafeArray(const SafeArray&) = delete;
    SafeArray& operator=(const SafeArray&) = delete;

    // 添字演算子（境界チェック付き）
    int& operator[](int index) {
        if (index < 0 || index >= size)
            throw out_of_range("インデックス範囲外");
        return data[index];
    }

    const int& operator[](int index) const {
        if (index < 0 || index >= size)
            throw out_of_range("インデックス範囲外");
        return data[index];
    }

    int getSize() const { return size; }
};

int main() {
    SafeArray arr(5);

    // 添字演算子で代入と読み取り
    for (int i = 0; i < arr.getSize(); i++) {
        arr[i] = i * 10;
    }

    for (int i = 0; i < arr.getSize(); i++) {
        cout << "arr[" << i << "] = " << arr[i] << endl;
    }

    // 境界チェック
    try {
        arr[10] = 99;
    } catch (const out_of_range& e) {
        cout << "例外: " << e.what() << endl;
    }

    return 0;
}`}
          expectedOutput={`arr[0] = 0
arr[1] = 10
arr[2] = 20
arr[3] = 30
arr[4] = 40
例外: インデックス範囲外`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="operator-overloading" />
      </div>
      <LessonNav lessons={lessons} currentId="operator-overloading" basePath="/learn/inheritance" />
    </div>
  );
}
