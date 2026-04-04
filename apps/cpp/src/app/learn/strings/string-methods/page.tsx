import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">find・substr・replaceなどの文字列操作メソッドを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">検索メソッド</h2>
        <p className="text-gray-300 leading-relaxed">
          std::stringにはfind、rfind、find_first_of、find_last_ofなど多彩な検索メソッドがあります。
          見つからない場合はstring::nposが返されます。これは通常size_tの最大値です。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">部分文字列と変換</h2>
        <p className="text-gray-300 leading-relaxed">
          substrで部分文字列を抽出し、stoi/stod/to_stringなどで数値と文字列を相互変換できます。
          これらを組み合わせることでCSVの解析やテキスト処理が可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索メソッドの活用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "C++ is powerful. C++ is fast.";

    // find: 最初の出現位置
    size_t pos = text.find("C++");
    cout << "最初のC++: 位置" << pos << endl;

    // rfind: 最後の出現位置
    pos = text.rfind("C++");
    cout << "最後のC++: 位置" << pos << endl;

    // find_first_of: 指定文字のいずれか最初の位置
    pos = text.find_first_of("aeiou");
    cout << "最初の母音: 位置" << pos << " ('" << text[pos] << "')" << endl;

    // 見つからない場合
    pos = text.find("Java");
    if (pos == string::npos) {
        cout << "Javaは見つかりません" << endl;
    }

    // 位置指定で検索
    pos = text.find("is", 5);  // 位置5以降から検索
    cout << "2番目のis: 位置" << pos << endl;

    return 0;
}`}
          expectedOutput={`最初のC++: 位置0
最後のC++: 位置17
最初の母音: 位置5
Javaは見つかりません
2番目のis: 位置21`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">substrと文字列分割</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
using namespace std;

// 区切り文字で文字列を分割する関数
vector<string> split(const string& s, char delimiter) {
    vector<string> tokens;
    size_t start = 0;
    size_t end;

    while ((end = s.find(delimiter, start)) != string::npos) {
        tokens.push_back(s.substr(start, end - start));
        start = end + 1;
    }
    tokens.push_back(s.substr(start));
    return tokens;
}

int main() {
    // substrの基本
    string path = "/home/user/documents/file.txt";
    size_t lastSlash = path.rfind('/');
    string filename = path.substr(lastSlash + 1);
    string dir = path.substr(0, lastSlash);
    cout << "ディレクトリ: " << dir << endl;
    cout << "ファイル名: " << filename << endl;

    // 文字列分割
    string csv = "apple,banana,cherry,date";
    vector<string> fruits = split(csv, ',');
    cout << "要素数: " << fruits.size() << endl;
    for (const auto& f : fruits) {
        cout << "  - " << f << endl;
    }

    return 0;
}`}
          expectedOutput={`ディレクトリ: /home/user/documents
ファイル名: file.txt
要素数: 4
  - apple
  - banana
  - cherry
  - date`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">replaceと数値変換</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    // replace: 部分文字列の置換
    string text = "I like cats. cats are cute.";
    size_t pos = 0;
    while ((pos = text.find("cats", pos)) != string::npos) {
        text.replace(pos, 4, "dogs");
        pos += 4;
    }
    cout << text << endl;

    // 数値変換
    string numStr = "42";
    int n = stoi(numStr);
    cout << "stoi: " << n * 2 << endl;

    double pi = stod("3.14159");
    cout << "stod: " << pi << endl;

    string back = to_string(123) + " + " + to_string(456);
    cout << "to_string: " << back << endl;

    // starts_with / ends_with (C++20)
    string file = "hello.cpp";
    cout << "starts_with h: " << (file.starts_with("hello") ? "Yes" : "No") << endl;
    cout << "ends_with .cpp: " << (file.ends_with(".cpp") ? "Yes" : "No") << endl;

    return 0;
}`}
          expectedOutput={`I like dogs. dogs are cute.
stoi: 84
stod: 3.14159
to_string: 123 + 456
starts_with h: Yes
ends_with .cpp: Yes`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="string-methods" basePath="/learn/strings" />
    </div>
  );
}
