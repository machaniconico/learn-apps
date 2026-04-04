import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringStreamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列ストリーム</h1>
        <p className="text-gray-400">std::stringstreamによる文字列の構築と解析を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">stringstreamとは</h2>
        <p className="text-gray-300 leading-relaxed">
          std::stringstreamはメモリ上の文字列をストリームとして扱うクラスです。&lt;sstream&gt;ヘッダで提供されます。
          coutと同じように&lt;&lt;で文字列を構築し、cinと同じように&gt;&gt;で解析できます。
          数値と文字列の変換や、CSVの解析などに非常に便利です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    // 文字列の構築（ostringstream）
    ostringstream oss;
    oss << "名前: " << "太郎" << ", 年齢: " << 25 << ", 点数: " << 95.5;
    string result = oss.str();
    cout << result << endl;

    // 文字列の解析（istringstream）
    string data = "42 3.14 hello";
    istringstream iss(data);
    int n;
    double d;
    string s;
    iss >> n >> d >> s;
    cout << "整数: " << n << endl;
    cout << "小数: " << d << endl;
    cout << "文字列: " << s << endl;

    // stringstream（読み書き両方）
    stringstream ss;
    ss << 100;
    int value;
    ss >> value;
    cout << "変換: " << value << endl;

    return 0;
}`}
          expectedOutput={`名前: 太郎, 年齢: 25, 点数: 95.5
整数: 42
小数: 3.14
文字列: hello
変換: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CSVの解析とgetline</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // getlineで行を分割
    string text = "one two three";
    istringstream iss(text);
    string word;
    cout << "単語分割:" << endl;
    while (iss >> word) {
        cout << "  " << word << endl;
    }

    // CSV解析（カンマ区切り）
    string csv = "Alice,90,85,92";
    istringstream csvStream(csv);
    string token;
    vector<string> fields;
    while (getline(csvStream, token, ',')) {
        fields.push_back(token);
    }

    cout << "名前: " << fields[0] << endl;
    cout << "科目数: " << fields.size() - 1 << endl;

    // 合計を計算
    int total = 0;
    for (size_t i = 1; i < fields.size(); i++) {
        total += stoi(fields[i]);
    }
    cout << "合計: " << total << endl;

    return 0;
}`}
          expectedOutput={`単語分割:
  one
  two
  three
名前: Alice
科目数: 3
合計: 267`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">書式設定と再利用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <iomanip>
using namespace std;

int main() {
    // 書式設定
    ostringstream oss;
    oss << fixed << setprecision(2);
    oss << "価格: " << 1234.5 << "円";
    cout << oss.str() << endl;

    // ストリームのクリアと再利用
    stringstream ss;
    ss << "first";
    cout << "1回目: " << ss.str() << endl;

    ss.str("");    // バッファをクリア
    ss.clear();    // フラグをリセット
    ss << "second";
    cout << "2回目: " << ss.str() << endl;

    // 16進数変換
    ostringstream hex_ss;
    hex_ss << hex << uppercase << 255;
    cout << "16進数: 0x" << hex_ss.str() << endl;

    return 0;
}`}
          expectedOutput={`価格: 1234.50円
1回目: first
2回目: second
16進数: 0xFF`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-stream" />
      </div>
      <LessonNav lessons={lessons} currentId="string-stream" basePath="/learn/strings" />
    </div>
  );
}
