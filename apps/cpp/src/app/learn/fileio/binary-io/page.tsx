import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function BinaryIOPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">バイナリI/O</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        バイナリモードではデータをテキスト変換なしにそのまま読み書きします。
        write()とread()でバイト列を直接操作し、構造体やPOD型のデータを効率的に保存できます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バイナリ書き込みと読み込み</h2>
        <p className="text-gray-400 mb-4">
          write()でバイト列を書き込み、read()で読み込みます。reinterpret_castでポインタの型を変換します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <cstring>
using namespace std;

int main() {
    stringstream ss(ios::binary | ios::in | ios::out);

    // 整数をバイナリで書き込み
    int writeVal = 12345;
    ss.write(reinterpret_cast<const char*>(&writeVal), sizeof(writeVal));

    double writeD = 3.14159;
    ss.write(reinterpret_cast<const char*>(&writeD), sizeof(writeD));

    // 先頭に戻って読み込み
    ss.seekg(0);

    int readVal;
    ss.read(reinterpret_cast<char*>(&readVal), sizeof(readVal));
    cout << "int: " << readVal << endl;

    double readD;
    ss.read(reinterpret_cast<char*>(&readD), sizeof(readD));
    cout << "double: " << readD << endl;

    cout << "バイト数: " << sizeof(int) + sizeof(double) << endl;

    return 0;
}`}
          expectedOutput={`int: 12345
double: 3.14159
バイト数: 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のバイナリI/O</h2>
        <p className="text-gray-400 mb-4">
          POD（Plain Old Data）型の構造体はそのままバイナリで読み書きできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <cstring>
using namespace std;

struct Record {
    char name[20];
    int age;
    double score;
};

int main() {
    stringstream ss(ios::binary | ios::in | ios::out);

    // 構造体を書き込み
    Record r1, r2;
    strncpy(r1.name, "Taro", sizeof(r1.name));
    r1.age = 25;
    r1.score = 92.5;

    strncpy(r2.name, "Hanako", sizeof(r2.name));
    r2.age = 22;
    r2.score = 88.0;

    ss.write(reinterpret_cast<const char*>(&r1), sizeof(Record));
    ss.write(reinterpret_cast<const char*>(&r2), sizeof(Record));

    // 読み込み
    ss.seekg(0);
    Record buf;
    cout << "=== レコード ===" << endl;
    while (ss.read(reinterpret_cast<char*>(&buf), sizeof(Record))) {
        cout << buf.name << " (age:" << buf.age << ", score:" << buf.score << ")" << endl;
    }

    return 0;
}`}
          expectedOutput={`=== レコード ===
Taro (age:25, score:92.5)
Hanako (age:22, score:88)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のバイナリI/O</h2>
        <p className="text-gray-400 mb-4">
          配列やvectorのデータもバイナリで一括読み書きできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    stringstream ss(ios::binary | ios::in | ios::out);

    // 配列を書き込み
    vector<int> data = {10, 20, 30, 40, 50};
    int size = data.size();

    // サイズを先に書き込み
    ss.write(reinterpret_cast<const char*>(&size), sizeof(size));
    // データを書き込み
    ss.write(reinterpret_cast<const char*>(data.data()), size * sizeof(int));

    // 読み込み
    ss.seekg(0);
    int readSize;
    ss.read(reinterpret_cast<char*>(&readSize), sizeof(readSize));

    vector<int> result(readSize);
    ss.read(reinterpret_cast<char*>(result.data()), readSize * sizeof(int));

    cout << "要素数: " << readSize << endl;
    cout << "データ: ";
    for (int x : result) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`要素数: 5
データ: 10 20 30 40 50`}
        />
      </section>

      <LessonCompleteButton categoryId="fileio" lessonId="binary-io" />
      <LessonNav lessons={lessons} currentId="binary-io" basePath="/learn/fileio" />
    </div>
  );
}
