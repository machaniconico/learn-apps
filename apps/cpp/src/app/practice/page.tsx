import { CppEditor } from "@/components/cpp-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: 学生成績管理 */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト1: 学生成績管理</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-400 mb-4">構造体とベクターを使って学生の成績を管理するプログラムを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Student 構造体を定義する（名前・点数フィールド）</li>
          <li>vector&lt;Student&gt; に複数の学生データを格納する</li>
          <li>平均点を計算して出力する</li>
          <li>最高点・最低点の学生名を表示する</li>
        </ul>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// TODO: Student 構造体を定義する
// フィールド: string name, int score

// TODO: 平均点を計算する関数を実装する
// double average(const vector<Student>& students)

// TODO: 最高点の学生を返す関数を実装する
// Student topStudent(const vector<Student>& students)

int main() {
    // TODO: 学生データを vector に追加する
    vector<Student> students;
    // students.push_back({"Alice", 85});
    // ...

    // TODO: 平均点・最高点を表示する
    return 0;
}`}
          expectedOutput={`平均点: 82.0
最高点: Alice (95点)`}
        />
      </div>

      {/* プロジェクト2: 文字列処理ツール */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト2: 文字列処理ツール</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">string クラスとアルゴリズムを使って文字列を解析するツールを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>単語数を数える関数を実装する</li>
          <li>文字列を逆順にする関数を実装する</li>
          <li>特定の文字が何回登場するかを数える関数を実装する</li>
          <li>すべて大文字に変換する関数を実装する</li>
        </ul>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

// TODO: 単語数を数える関数を実装する
// int countWords(const string& text)

// TODO: 文字列を逆順にする関数を実装する
// string reverseString(const string& text)

// TODO: 特定の文字の出現回数を数える関数を実装する
// int countChar(const string& text, char ch)

// TODO: 文字列をすべて大文字に変換する関数を実装する
// string toUpperCase(const string& text)

int main() {
    string text = "hello world from cpp";

    // TODO: 各関数を呼び出して結果を出力する

    return 0;
}`}
          expectedOutput={`単語数: 4
逆順: ppc morf dlrow olleh
'l' の出現回数: 3
大文字: HELLO WORLD FROM CPP`}
        />
      </div>

      {/* プロジェクト3: 簡易データベース */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト3: 簡易データベース</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">map を使ってキーバリュー型の簡易データベースを実装しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>map&lt;string, string&gt; でデータを管理する</li>
          <li>レコードの追加・検索・削除を実装する</li>
          <li>全レコードを一覧表示する機能を追加する</li>
          <li>キーが存在しない場合のエラー処理を行う</li>
        </ul>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <map>
using namespace std;

class SimpleDB {
private:
    map<string, string> data;

public:
    // TODO: レコードを追加する
    // void insert(const string& key, const string& value)

    // TODO: キーでレコードを検索する（見つからない場合は "NOT FOUND" を返す）
    // string find(const string& key) const

    // TODO: キーでレコードを削除する
    // bool remove(const string& key)

    // TODO: 全レコードを表示する
    // void listAll() const
};

int main() {
    SimpleDB db;

    // TODO: データを追加・検索・削除して動作を確認する

    return 0;
}`}
          expectedOutput={`追加: Alice -> 090-1234-5678
追加: Bob -> 090-8765-4321
検索 Alice: 090-1234-5678
検索 Carol: NOT FOUND
全レコード:
  Alice: 090-1234-5678
  Bob: 090-8765-4321
削除 Bob: 成功
全レコード:
  Alice: 090-1234-5678`}
        />
      </div>

      {/* プロジェクト4: 行列計算クラス */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト4: 行列計算クラス</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-400 mb-4">クラスと演算子オーバーロードを使って2×2行列の計算ライブラリを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Matrix2x2 クラスを定義する（2×2の要素を保持）</li>
          <li>operator+ で行列の加算を実装する</li>
          <li>operator* で行列の乗算を実装する</li>
          <li>operator&lt;&lt; で行列を整形して出力する</li>
        </ul>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Matrix2x2 {
public:
    double a[2][2];

    // TODO: コンストラクタを実装する
    // Matrix2x2(double a00, double a01, double a10, double a11)

    // TODO: operator+ を実装する（行列の加算）
    // Matrix2x2 operator+(const Matrix2x2& other) const

    // TODO: operator* を実装する（行列の乗算）
    // Matrix2x2 operator*(const Matrix2x2& other) const

    // TODO: operator<< をフレンド関数で実装する（整形出力）
    // friend ostream& operator<<(ostream& os, const Matrix2x2& m)
};

int main() {
    // TODO: 2つの行列を作成して加算・乗算を確認する

    return 0;
}`}
          expectedOutput={`行列A:
[1, 2]
[3, 4]
行列B:
[5, 6]
[7, 8]
A + B:
[6, 8]
[10, 12]
A * B:
[19, 22]
[43, 50]`}
        />
      </div>
    </div>
  );
}
