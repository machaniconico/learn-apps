import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FstreamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">fstream</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        std::fstreamは読み書き両用のファイルストリームです。1つのストリームオブジェクトで
        ファイルの読み込みと書き込みの両方を行えます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fstreamの基本</h2>
        <p className="text-gray-400 mb-4">
          fstreamはiostreamの派生クラスで、入出力の両方の操作が可能です。オープンモードで動作を制御します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    // fstreamの動作をstringstreamでシミュレーション
    // 実際のfstream: fstream fs("data.txt", ios::in | ios::out);

    stringstream fs;

    // 書き込み
    fs << "行1: Hello" << endl;
    fs << "行2: World" << endl;
    fs << "行3: C++" << endl;

    // 先頭に戻って読み込み
    fs.seekg(0);
    string line;
    cout << "=== 読み込み ===" << endl;
    while (getline(fs, line)) {
        cout << line << endl;
    }

    return 0;
}`}
          expectedOutput={`=== 読み込み ===
行1: Hello
行2: World
行3: C++`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">オープンモード</h2>
        <p className="text-gray-400 mb-4">
          ios::in、ios::out、ios::app、ios::trunc、ios::binaryなどのフラグを組み合わせてモードを指定します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    // モードの説明を表示
    cout << "=== オープンモード ===" << endl;
    cout << "ios::in     - 読み込み用" << endl;
    cout << "ios::out    - 書き込み用" << endl;
    cout << "ios::app    - 追記モード" << endl;
    cout << "ios::trunc  - 既存内容を消去" << endl;
    cout << "ios::binary - バイナリモード" << endl;
    cout << endl;

    // 追記モードのシミュレーション
    stringstream fs;
    fs << "既存データ" << endl;

    // seekpで末尾に移動して追記
    fs.seekp(0, ios::end);
    fs << "追記データ1" << endl;
    fs << "追記データ2" << endl;

    // 読み込み
    fs.seekg(0);
    string line;
    cout << "=== ファイル内容 ===" << endl;
    while (getline(fs, line)) {
        cout << line << endl;
    }

    return 0;
}`}
          expectedOutput={`=== オープンモード ===
ios::in     - 読み込み用
ios::out    - 書き込み用
ios::app    - 追記モード
ios::trunc  - 既存内容を消去
ios::binary - バイナリモード

=== ファイル内容 ===
既存データ
追記データ1
追記データ2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シーク操作</h2>
        <p className="text-gray-400 mb-4">
          seekg（読み込み位置）とseekp（書き込み位置）でストリーム内の位置を移動できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    stringstream ss;
    ss << "ABCDEFGHIJ";

    // tellg: 現在の読み込み位置
    cout << "初期位置: " << ss.tellg() << endl;

    // seekg: 位置を移動
    ss.seekg(3);
    char c;
    ss.get(c);
    cout << "位置3の文字: " << c << endl;

    // 末尾からの相対位置
    ss.seekg(-2, ios::end);
    ss.get(c);
    cout << "末尾-2の文字: " << c << endl;

    // 先頭に戻る
    ss.seekg(0, ios::beg);
    string all;
    ss >> all;
    cout << "全体: " << all << endl;

    return 0;
}`}
          expectedOutput={`初期位置: 0
位置3の文字: D
末尾-2の文字: I
全体: ABCDEFGHIJ`}
        />
      </section>

      <LessonCompleteButton categoryId="fileio" lessonId="fstream" />
      <LessonNav lessons={lessons} currentId="fstream" basePath="/learn/fileio" />
    </div>
  );
}
