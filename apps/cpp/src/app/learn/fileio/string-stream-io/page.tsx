import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function StringStreamIOPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">文字列ストリーム</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        &lt;sstream&gt;の istringstream、ostringstream、stringstream を使って
        文字列をストリームとして操作できます。データのパース、フォーマット、型変換に便利です。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">istringstreamでパース</h2>
        <p className="text-gray-400 mb-4">
          istringstreamは文字列を入力ストリームとして扱い、&gt;&gt;演算子やgetlineで値を取り出せます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    // スペース区切りの値をパース
    string data = "Alice 25 3.14";
    istringstream iss(data);

    string name;
    int age;
    double pi;
    iss >> name >> age >> pi;

    cout << "名前: " << name << endl;
    cout << "年齢: " << age << endl;
    cout << "PI: " << pi << endl;

    // カンマ区切りのCSVをパース
    string csv = "東京,大阪,名古屋,福岡";
    istringstream csvStream(csv);
    string token;
    cout << "都市: ";
    while (getline(csvStream, token, ',')) {
        cout << "[" << token << "] ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`名前: Alice
年齢: 25
PI: 3.14
都市: [東京] [大阪] [名古屋] [福岡]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ostringstreamでフォーマット</h2>
        <p className="text-gray-400 mb-4">
          ostringstreamを使って複雑な文字列を構築し、str()で結果の文字列を取得します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <iomanip>
using namespace std;

int main() {
    // 数値のフォーマット
    ostringstream oss;
    oss << fixed << setprecision(2);
    oss << "合計: " << 1234.5 << "円" << endl;
    oss << "税込: " << 1234.5 * 1.1 << "円" << endl;
    cout << oss.str();

    // テーブル形式の文字列を構築
    ostringstream table;
    table << left << setw(10) << "名前" << setw(6) << "点数" << endl;
    table << left << setw(10) << "太郎" << setw(6) << 90 << endl;
    table << left << setw(10) << "花子" << setw(6) << 85 << endl;
    cout << table.str();

    return 0;
}`}
          expectedOutput={`合計: 1234.50円
税込: 1357.95円
名前    点数
太郎    90
花子    85`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stringstreamによる型変換</h2>
        <p className="text-gray-400 mb-4">
          stringstreamを使って文字列と数値の相互変換ができます。エラーチェックも可能です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
using namespace std;

// 文字列から数値に変換
template<typename T>
bool fromString(const string& s, T& value) {
    istringstream iss(s);
    iss >> value;
    return !iss.fail() && iss.eof();
}

// 数値から文字列に変換
template<typename T>
string toString(const T& value) {
    ostringstream oss;
    oss << value;
    return oss.str();
}

int main() {
    int n;
    if (fromString("42", n))
        cout << "変換成功: " << n << endl;

    double d;
    if (fromString("3.14", d))
        cout << "変換成功: " << d << endl;

    if (!fromString("abc", n))
        cout << "変換失敗: abc" << endl;

    cout << "toString(100) = " << toString(100) << endl;
    cout << "toString(2.718) = " << toString(2.718) << endl;

    return 0;
}`}
          expectedOutput={`変換成功: 42
変換成功: 3.14
変換失敗: abc
toString(100) = 100
toString(2.718) = 2.718`}
        />
      </section>

      <LessonCompleteButton categoryId="fileio" lessonId="string-stream-io" />
      <LessonNav lessons={lessons} currentId="string-stream-io" basePath="/learn/fileio" />
    </div>
  );
}
