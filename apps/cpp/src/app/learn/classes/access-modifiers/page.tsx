import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function AccessModifiersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アクセス修飾子</h1>
        <p className="text-gray-400">public・private・protectedの使い分けを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">3つのアクセスレベル</h2>
        <p className="text-gray-300 leading-relaxed">
          C++には3つのアクセス修飾子があります。publicはどこからでもアクセス可能、
          privateはクラス内部からのみアクセス可能、protectedはクラス内部と派生クラスからアクセス可能です。
          カプセル化により内部実装を隠蔽し、安全なインターフェースを提供します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">public・private・protected</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Person {
public:
    string name;          // どこからでもアクセス可能

    Person(string n, int a) : name(n), age(a) {}

    int getAge() const { return age; }

    void birthday() {
        age++;  // private メンバにクラス内からアクセス
        cout << name << "は" << age << "歳になりました" << endl;
    }

private:
    int age;              // クラス内のみ

protected:
    string secret = "秘密"; // クラス内と派生クラスから
};

class Employee : public Person {
public:
    Employee(string n, int a) : Person(n, a) {}

    void showSecret() {
        // protectedメンバに派生クラスからアクセス可能
        cout << name << "の秘密: " << secret << endl;
    }
};

int main() {
    Person p("太郎", 25);
    cout << p.name << ": " << p.getAge() << "歳" << endl;
    p.birthday();

    // p.age = 30;     // エラー: privateメンバ
    // p.secret;       // エラー: protectedメンバ

    Employee e("花子", 30);
    e.showSecret();

    return 0;
}`}
          expectedOutput={`太郎: 25歳
太郎は26歳になりました
花子の秘密: 秘密`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ゲッター・セッターとfriend</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Temperature {
    double celsius;  // private

public:
    Temperature(double c) : celsius(c) {}

    // ゲッター
    double getCelsius() const { return celsius; }
    double getFahrenheit() const { return celsius * 9.0 / 5.0 + 32.0; }

    // セッター（バリデーション付き）
    void setCelsius(double c) {
        if (c >= -273.15) {
            celsius = c;
        } else {
            cout << "エラー: 絶対零度以下" << endl;
        }
    }

    // friend関数は private にアクセス可能
    friend void printDetail(const Temperature& t);
};

void printDetail(const Temperature& t) {
    // friend なので celsius に直接アクセスできる
    cout << "内部値: " << t.celsius << "℃" << endl;
}

int main() {
    Temperature t(100.0);
    cout << t.getCelsius() << "℃ = " << t.getFahrenheit() << "°F" << endl;

    t.setCelsius(36.5);
    cout << t.getCelsius() << "℃" << endl;

    t.setCelsius(-300);  // バリデーションで拒否

    printDetail(t);

    return 0;
}`}
          expectedOutput={`100℃ = 212°F
36.5℃
エラー: 絶対零度以下
内部値: 36.5℃`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="access-modifiers" />
      </div>
      <LessonNav lessons={lessons} currentId="access-modifiers" basePath="/learn/classes" />
    </div>
  );
}
