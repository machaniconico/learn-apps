import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function IfstreamOfstreamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">ifstream・ofstream</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        ifstream（入力ファイルストリーム）はファイルからの読み込み、ofstream（出力ファイルストリーム）は
        ファイルへの書き込みに使います。基本的な使い方を学びましょう。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ofstreamでファイルに書き込む</h2>
        <p className="text-gray-400 mb-4">
          ofstreamオブジェクトを作成し、&lt;&lt;演算子で書き込みます。stringstreamでシミュレーションします。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    // ofstreamの代わりにostringstreamでシミュレーション
    ostringstream ofs;

    // <<演算子で書き込み
    ofs << "名前: 太郎" << endl;
    ofs << "年齢: 25" << endl;
    ofs << "スコア: 92.5" << endl;

    // 書き込んだ内容を表示
    cout << "=== 書き込み内容 ===" << endl;
    cout << ofs.str();

    // 追記モードのシミュレーション
    ofs << "追加データ: OK" << endl;
    cout << "=== 追記後 ===" << endl;
    cout << ofs.str();

    return 0;
}`}
          expectedOutput={`=== 書き込み内容 ===
名前: 太郎
年齢: 25
スコア: 92.5
=== 追記後 ===
名前: 太郎
年齢: 25
スコア: 92.5
追加データ: OK`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ifstreamでファイルから読み込む</h2>
        <p className="text-gray-400 mb-4">
          getlineで1行ずつ読み込むか、&gt;&gt;演算子でスペース区切りの値を読み取ります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    // ifstreamの代わりにistringstreamでシミュレーション
    string fileContent = "Alice 90\\nBob 85\\nCharlie 78\\n";
    istringstream ifs(fileContent);

    // getlineで1行ずつ読む
    cout << "=== 行読み ===" << endl;
    string line;
    while (getline(ifs, line)) {
        cout << line << endl;
    }

    // >>演算子で値を読む
    istringstream ifs2(fileContent);
    cout << "=== 値読み ===" << endl;
    string name;
    int score;
    while (ifs2 >> name >> score) {
        cout << name << "さんのスコア: " << score << endl;
    }

    return 0;
}`}
          expectedOutput={`=== 行読み ===
Alice 90
Bob 85
Charlie 78
=== 値読み ===
Aliceさんのスコア: 90
Bobさんのスコア: 85
Charlieさんのスコア: 78`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルのオープンとクローズ</h2>
        <p className="text-gray-400 mb-4">
          ファイルストリームはRAIIでスコープ終了時に自動的にクローズされます。is_open()で開成否を確認できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    // ファイル操作のパターンを解説
    // 実際のコード例:
    // ofstream ofs("output.txt");
    // if (!ofs.is_open()) { cerr << "開けません"; return 1; }
    // ofs << "Hello" << endl;
    // ofs.close();  // 明示的にクローズ（任意）

    // シミュレーション
    ostringstream ofs;
    bool isOpen = true;  // シミュレーション

    if (isOpen) {
        ofs << "ファイルを開きました" << endl;
        ofs << "データを書き込みました" << endl;
        cout << "書き込み成功" << endl;
    }

    // 読み込みシミュレーション
    istringstream ifs(ofs.str());
    string line;
    cout << "=== 読み込み ===" << endl;
    while (getline(ifs, line)) {
        cout << line << endl;
    }

    // スコープ終了でRAIIにより自動クローズ
    cout << "ファイルは自動的にクローズされます" << endl;

    return 0;
}`}
          expectedOutput={`書き込み成功
=== 読み込み ===
ファイルを開きました
データを書き込みました
ファイルは自動的にクローズされます`}
        />
      </section>

      <LessonCompleteButton categoryId="fileio" lessonId="ifstream-ofstream" />
      <LessonNav lessons={lessons} currentId="ifstream-ofstream" basePath="/learn/fileio" />
    </div>
  );
}
