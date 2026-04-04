import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">値に基づく多分岐処理のswitch構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">switch</code> 文は、
          式の値と一致する <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">case</code> ラベルに分岐します。
          C++のswitch文は整数型、文字型、列挙型に対応しています（文字列は使えません）。
        </p>
        <p className="text-gray-300 leading-relaxed">
          各caseの最後には <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">break</code> が必要です。
          breakがないと次のcaseに処理が流れます（フォールスルー）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なswitch文</h2>
        <p className="text-gray-400 mb-4">整数値で分岐する基本例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int day = 3;

    switch (day) {
        case 1:
            cout << "月曜日" << endl;
            break;
        case 2:
            cout << "火曜日" << endl;
            break;
        case 3:
            cout << "水曜日" << endl;
            break;
        case 4:
            cout << "木曜日" << endl;
            break;
        case 5:
            cout << "金曜日" << endl;
            break;
        default:
            cout << "週末" << endl;
            break;
    }

    // char型での分岐
    char grade = 'B';
    switch (grade) {
        case 'A': cout << "優秀" << endl; break;
        case 'B': cout << "良好" << endl; break;
        case 'C': cout << "普通" << endl; break;
        default:  cout << "要努力" << endl; break;
    }

    return 0;
}`}
          expectedOutput={`水曜日
良好`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォールスルーの活用</h2>
        <p className="text-gray-400 mb-4">breakを省略して複数のcaseをまとめる手法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int month = 4;

    // 複数のcaseをまとめる
    switch (month) {
        case 3: case 4: case 5:
            cout << month << "月は春です" << endl;
            break;
        case 6: case 7: case 8:
            cout << month << "月は夏です" << endl;
            break;
        case 9: case 10: case 11:
            cout << month << "月は秋です" << endl;
            break;
        case 12: case 1: case 2:
            cout << month << "月は冬です" << endl;
            break;
        default:
            cout << "無効な月です" << endl;
            break;
    }

    // 意図的なフォールスルー
    int level = 3;
    cout << "レベル" << level << "の特典: ";
    switch (level) {
        case 3:
            cout << "VIPラウンジ ";
            [[fallthrough]];
        case 2:
            cout << "優先搭乗 ";
            [[fallthrough]];
        case 1:
            cout << "マイル2倍";
            break;
        default:
            cout << "なし";
            break;
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`4月は春です
レベル3の特典: VIPラウンジ 優先搭乗 マイル2倍`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
