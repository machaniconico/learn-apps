import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++エコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テスト</h1>
        <p className="text-gray-400">Google Test・Catch2によるユニットテストを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++のテストフレームワーク</h2>
        <p className="text-gray-300 leading-relaxed">
          <strong>Google Test (gtest)</strong> はGoogleが開発した最も広く使われるテストフレームワークです。
          <strong>Catch2</strong> はヘッダオンリーで導入が容易なモダンテストフレームワークです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストの基本概念</h2>
        <p className="text-gray-400 mb-4">簡易テストフレームワークでテストの基本を体験しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <functional>
using namespace std;

// 簡易テストフレームワーク
struct TestResult { int passed = 0; int failed = 0; };
TestResult results;

void ASSERT_EQ(auto actual, auto expected, const string& msg) {
    if (actual == expected) {
        cout << "  [PASS] " << msg << endl;
        results.passed++;
    } else {
        cout << "  [FAIL] " << msg << endl;
        results.failed++;
    }
}

void ASSERT_TRUE(bool cond, const string& msg) {
    ASSERT_EQ(cond, true, msg);
}

// テスト対象の関数
int add(int a, int b) { return a + b; }
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int main() {
    cout << "--- add関数のテスト ---" << endl;
    ASSERT_EQ(add(1, 2), 3, "1 + 2 = 3");
    ASSERT_EQ(add(-1, 1), 0, "-1 + 1 = 0");
    ASSERT_EQ(add(0, 0), 0, "0 + 0 = 0");

    cout << "--- isPrime関数のテスト ---" << endl;
    ASSERT_TRUE(isPrime(2), "2 is prime");
    ASSERT_TRUE(isPrime(17), "17 is prime");
    ASSERT_TRUE(!isPrime(4), "4 is not prime");
    ASSERT_TRUE(!isPrime(1), "1 is not prime");

    cout << endl;
    cout << results.passed << " passed, "
         << results.failed << " failed" << endl;
    return 0;
}`}
          expectedOutput={`--- add関数のテスト ---
  [PASS] 1 + 2 = 3
  [PASS] -1 + 1 = 0
  [PASS] 0 + 0 = 0
--- isPrime関数のテスト ---
  [PASS] 2 is prime
  [PASS] 17 is prime
  [PASS] 4 is not prime
  [PASS] 1 is not prime

7 passed, 0 failed`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Google TestとCatch2の構文</h2>
        <p className="text-gray-400 mb-4">両フレームワークのテスト記述スタイルを紹介します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== Google Test の構文 ===" << endl;
    cout << R"(
#include <gtest/gtest.h>

TEST(MathTest, Addition) {
    EXPECT_EQ(add(1, 2), 3);
    EXPECT_NE(add(1, 2), 4);
}

TEST(MathTest, IsPrime) {
    EXPECT_TRUE(isPrime(2));
    EXPECT_FALSE(isPrime(4));
}
)" << endl;

    cout << "=== Catch2 の構文 ===" << endl;
    cout << R"(
#include <catch2/catch_test_macros.hpp>

TEST_CASE("Addition", "[math]") {
    REQUIRE(add(1, 2) == 3);
    REQUIRE(add(-1, 1) == 0);
}

TEST_CASE("IsPrime", "[math]") {
    SECTION("素数") {
        REQUIRE(isPrime(2));
        REQUIRE(isPrime(17));
    }
    SECTION("合成数") {
        REQUIRE_FALSE(isPrime(4));
    }
}
)" << endl;

    cout << "Google Test: 大規模プロジェクト向け、モック対応" << endl;
    cout << "Catch2: 導入が容易、BDDスタイル対応" << endl;
    return 0;
}`}
          expectedOutput={`=== Google Test の構文 ===

#include <gtest/gtest.h>

TEST(MathTest, Addition) {
    EXPECT_EQ(add(1, 2), 3);
    EXPECT_NE(add(1, 2), 4);
}

TEST(MathTest, IsPrime) {
    EXPECT_TRUE(isPrime(2));
    EXPECT_FALSE(isPrime(4));
}

=== Catch2 の構文 ===

#include <catch2/catch_test_macros.hpp>

TEST_CASE("Addition", "[math]") {
    REQUIRE(add(1, 2) == 3);
    REQUIRE(add(-1, 1) == 0);
}

TEST_CASE("IsPrime", "[math]") {
    SECTION("素数") {
        REQUIRE(isPrime(2));
        REQUIRE(isPrime(17));
    }
    SECTION("合成数") {
        REQUIRE_FALSE(isPrime(4));
    }
}

Google Test: 大規模プロジェクト向け、モック対応
Catch2: 導入が容易、BDDスタイル対応`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="testing" />
      </div>
      <LessonNav lessons={lessons} currentId="testing" basePath="/learn/ecosystem" />
    </div>
  );
}
