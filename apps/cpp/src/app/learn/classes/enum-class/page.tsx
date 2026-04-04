import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function EnumClassPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">enum class</h1>
        <p className="text-gray-400">スコープ付き列挙型の定義と活用を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">enum classとは</h2>
        <p className="text-gray-300 leading-relaxed">
          enum class（スコープ付き列挙型）はC++11で導入された改良型の列挙型です。
          従来のenumと異なり、列挙子がスコープで囲まれ、暗黙の整数変換が行われません。
          型安全性が高く、名前の衝突を避けられるため、モダンC++ではenum classが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">enumとenum classの比較</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 従来のenum（スコープなし）
enum OldColor { RED, GREEN, BLUE };

// enum class（スコープ付き）
enum class Color { Red, Green, Blue };
enum class Fruit { Apple, Banana, Cherry };

int main() {
    // 従来のenum: 暗黙にintに変換される
    OldColor oc = RED;
    int n = oc;  // OK: 暗黙変換
    cout << "旧enum RED = " << n << endl;

    // enum class: 暗黙変換されない（型安全）
    Color c = Color::Red;
    // int m = c;  // エラー: 暗黙変換できない
    int m = static_cast<int>(c);  // 明示的キャストが必要
    cout << "enum class Red = " << m << endl;

    // スコープで名前衝突を回避
    Color col = Color::Red;
    Fruit fruit = Fruit::Apple;
    // Color::Red と Fruit::Apple は別の型

    // switch文で使う
    switch (c) {
        case Color::Red:   cout << "赤" << endl; break;
        case Color::Green: cout << "緑" << endl; break;
        case Color::Blue:  cout << "青" << endl; break;
    }

    return 0;
}`}
          expectedOutput={`旧enum RED = 0
enum class Red = 0
赤`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的な活用例</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// 基底型を指定
enum class HttpStatus : int {
    OK = 200,
    NotFound = 404,
    InternalError = 500
};

// enum classを活用したステートマシン
enum class State { Idle, Running, Paused, Stopped };

string stateToString(State s) {
    switch (s) {
        case State::Idle:    return "待機中";
        case State::Running: return "実行中";
        case State::Paused:  return "一時停止";
        case State::Stopped: return "停止";
    }
    return "不明";
}

int main() {
    // HTTPステータス
    HttpStatus status = HttpStatus::OK;
    cout << "ステータス: " << static_cast<int>(status) << endl;

    status = HttpStatus::NotFound;
    cout << "ステータス: " << static_cast<int>(status) << endl;

    // ステートマシン
    State current = State::Idle;
    cout << stateToString(current) << endl;

    current = State::Running;
    cout << stateToString(current) << endl;

    current = State::Paused;
    cout << stateToString(current) << endl;

    current = State::Stopped;
    cout << stateToString(current) << endl;

    return 0;
}`}
          expectedOutput={`ステータス: 200
ステータス: 404
待機中
実行中
一時停止
停止`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="enum-class" />
      </div>
      <LessonNav lessons={lessons} currentId="enum-class" basePath="/learn/classes" />
    </div>
  );
}
