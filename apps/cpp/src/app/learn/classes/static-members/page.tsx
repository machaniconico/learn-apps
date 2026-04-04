import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function StaticMembersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">静的メンバ</h1>
        <p className="text-gray-400">staticフィールド・メソッドの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">staticメンバとは</h2>
        <p className="text-gray-300 leading-relaxed">
          staticメンバ変数はクラスに1つだけ存在し、すべてのインスタンスで共有されます。
          staticメンバ関数はインスタンスなしで呼び出すことができ、staticメンバ変数のみにアクセスできます。
          インスタンス数のカウントや、ファクトリメソッドなどに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticメンバ変数</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Player {
    string name;
    static int totalPlayers;  // 全インスタンスで共有

public:
    Player(string n) : name(n) {
        totalPlayers++;
        cout << name << " 参加 (合計: " << totalPlayers << "人)" << endl;
    }

    ~Player() {
        totalPlayers--;
        cout << name << " 退出 (合計: " << totalPlayers << "人)" << endl;
    }

    static int getTotal() { return totalPlayers; }
};

// クラス外でstatic変数を定義
int Player::totalPlayers = 0;

int main() {
    cout << "初期: " << Player::getTotal() << "人" << endl;

    Player p1("Alice");
    Player p2("Bob");

    {
        Player p3("Charlie");
        cout << "ブロック内: " << Player::getTotal() << "人" << endl;
    }

    cout << "最終: " << Player::getTotal() << "人" << endl;

    return 0;
}`}
          expectedOutput={`初期: 0人
Alice 参加 (合計: 1人)
Bob 参加 (合計: 2人)
Charlie 参加 (合計: 3人)
ブロック内: 3人
Charlie 退出 (合計: 2人)
最終: 2人
Bob 退出 (合計: 1人)
Alice 退出 (合計: 0人)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticメンバ関数とconstexpr</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <cmath>
using namespace std;

class MathHelper {
public:
    // static constexpr（コンパイル時定数）
    static constexpr double PI = 3.14159265358979;
    static constexpr double E = 2.71828182845905;

    // staticメンバ関数
    static double circleArea(double radius) {
        return PI * radius * radius;
    }

    static double degToRad(double degrees) {
        return degrees * PI / 180.0;
    }

    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
};

int main() {
    // インスタンス不要で呼び出し
    cout << "PI = " << MathHelper::PI << endl;
    cout << "円の面積(r=5): " << MathHelper::circleArea(5.0) << endl;
    cout << "90度 = " << MathHelper::degToRad(90.0) << " rad" << endl;
    cout << "5! = " << MathHelper::factorial(5) << endl;

    return 0;
}`}
          expectedOutput={`PI = 3.14159
円の面積(r=5): 78.5398
90度 = 1.5708 rad
5! = 120`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="static-members" />
      </div>
      <LessonNav lessons={lessons} currentId="static-members" basePath="/learn/classes" />
    </div>
  );
}
