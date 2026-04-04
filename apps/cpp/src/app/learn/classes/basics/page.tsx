import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">classキーワードを使ったオブジェクトの設計図を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラスとは</h2>
        <p className="text-gray-300 leading-relaxed">
          クラスはデータ（メンバ変数）と振る舞い（メンバ関数）をひとまとめにした設計図です。
          クラスからオブジェクト（インスタンス）を生成して使います。C++のクラスはデフォルトで
          メンバがprivateになり、データの隠蔽（カプセル化）を自然にサポートします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの定義とインスタンス生成</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Car {
public:
    string brand;
    string model;
    int year;

    void display() {
        cout << year << "年式 " << brand << " " << model << endl;
    }
};

int main() {
    // インスタンスの生成
    Car car1;
    car1.brand = "Toyota";
    car1.model = "Corolla";
    car1.year = 2023;
    car1.display();

    // 別のインスタンス
    Car car2;
    car2.brand = "Honda";
    car2.model = "Civic";
    car2.year = 2024;
    car2.display();

    return 0;
}`}
          expectedOutput={`2023年式 Toyota Corolla
2024年式 Honda Civic`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メンバの初期化とthisポインタ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int score;

    // メンバ初期化子リスト付きコンストラクタ
    Student(string name, int score) : name(name), score(score) {}

    void show() {
        // thisポインタで自身を参照
        cout << this->name << ": " << this->score << "点" << endl;
    }

    // 自身の参照を返すメソッドチェーン
    Student& addBonus(int bonus) {
        score += bonus;
        return *this;
    }
};

int main() {
    Student s("太郎", 80);
    s.show();

    // メソッドチェーン
    s.addBonus(5).addBonus(10);
    s.show();

    return 0;
}`}
          expectedOutput={`太郎: 80点
太郎: 95点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
