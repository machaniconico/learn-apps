import { CEditor } from "@/components/c-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: 学生成績管理 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-green-900 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">初級</span>
          <h2 className="text-xl font-bold text-white">学生成績管理システム</h2>
        </div>
        <p className="text-gray-400 mb-4">構造体・配列・ポインタを組み合わせて、学生の成績を管理するプログラムを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>構造体 <code className="text-teal-400 bg-gray-800 px-1 rounded">Student</code> に名前・点数・学年を持たせる</li>
          <li>配列に複数の学生データを格納する</li>
          <li>ポインタを使って平均点を計算する関数を実装する</li>
          <li>最高点・最低点の学生を出力する</li>
        </ul>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 5

// TODO: Student構造体を定義する
// (名前50文字、点数int、学年int)

// TODO: 平均点を計算する関数を実装する
// float calcAverage(struct Student *students, int count)

// TODO: 最高点の学生インデックスを返す関数を実装する
// int findTopStudent(struct Student *students, int count)

int main() {
    // TODO: 学生データを配列に格納する
    // 例: {"田中", 85, 2}, {"鈴木", 92, 3}, ...

    // TODO: 平均点を計算して出力する

    // TODO: 最高点の学生名と点数を出力する

    return 0;
}`}
        />
      </div>

      {/* プロジェクト2: 文字列逆転ツール */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">文字列逆転ツール</h2>
        </div>
        <p className="text-gray-400 mb-4">ポインタと文字列操作を駆使して、文字列を逆転させるツールを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>ポインタを使って文字列の先頭と末尾を交換しながら逆転する</li>
          <li>単語単位で逆転する関数も実装する</li>
          <li>回文（パリンドローム）かどうかを判定する</li>
          <li>スペースを除いた文字列で回文判定する</li>
        </ul>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#include <ctype.h>

// TODO: 文字列をインプレースで逆転する関数を実装する
// void reverseString(char *str)

// TODO: 回文かどうか判定する関数を実装する
// int isPalindrome(const char *str)

// TODO: スペースを除いた回文判定関数を実装する
// int isPalindromeIgnoreSpaces(const char *str)

int main() {
    char str1[] = "Hello, World!";
    char str2[] = "racecar";
    char str3[] = "A man a plan a canal Panama";

    // TODO: str1を逆転して出力する

    // TODO: str2が回文かどうか判定して出力する

    // TODO: str3がスペース無視で回文かどうか判定して出力する

    return 0;
}`}
        />
      </div>

      {/* プロジェクト3: 動的メモリ電話帳 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-orange-900 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">動的メモリ電話帳</h2>
        </div>
        <p className="text-gray-400 mb-4">mallocと構造体を使って、動的にサイズが変わる電話帳を実装しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li><code className="text-teal-400 bg-gray-800 px-1 rounded">malloc</code>/<code className="text-teal-400 bg-gray-800 px-1 rounded">realloc</code> で動的にメモリを確保する</li>
          <li>連絡先の追加・削除・検索機能を実装する</li>
          <li>名前でソートする機能を追加する</li>
          <li>使用後は必ず <code className="text-teal-400 bg-gray-800 px-1 rounded">free</code> でメモリを解放する</li>
        </ul>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// TODO: Contact構造体を定義する
// (名前50文字、電話番号20文字、メール50文字)

// TODO: PhoneBook構造体を定義する
// (Contactの動的配列へのポインタ、件数int、容量int)

// TODO: 電話帳を初期化する関数
// void initPhoneBook(PhoneBook *pb)

// TODO: 連絡先を追加する関数(容量不足時はrealloc)
// void addContact(PhoneBook *pb, const char *name, const char *phone, const char *email)

// TODO: 名前で検索する関数
// Contact* findContact(PhoneBook *pb, const char *name)

// TODO: メモリを解放する関数
// void freePhoneBook(PhoneBook *pb)

int main() {
    // TODO: 電話帳を初期化し、3件追加してから検索・表示・解放する
    return 0;
}`}
        />
      </div>

      {/* プロジェクト4: ファイル暗号化 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-red-900 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">ファイル暗号化ツール</h2>
        </div>
        <p className="text-gray-400 mb-4">ファイルI/Oとビット演算を組み合わせて、XOR暗号でファイルを暗号化・復号するツールを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>バイナリモードでファイルを読み書きする</li>
          <li>XOR演算でバイトを暗号化する（同じキーで復号も可能）</li>
          <li>ファイルサイズを取得してバッファを動的確保する</li>
          <li>暗号化前後のファイル内容を16進数で表示する</li>
        </ul>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// TODO: XOR暗号化/復号化関数を実装する
// void xorEncrypt(unsigned char *data, size_t len, unsigned char key)

// TODO: ファイルを読み込んでバッファに格納する関数
// unsigned char* readFile(const char *filename, size_t *outLen)

// TODO: バッファの内容をファイルに書き込む関数
// int writeFile(const char *filename, const unsigned char *data, size_t len)

// TODO: バイト列を16進数で表示する関数
// void printHex(const unsigned char *data, size_t len)

int main() {
    const char *message = "秘密のメッセージ: Hello, Secret World!";
    unsigned char key = 0x42;

    // TODO: メッセージをバイト列として暗号化する
    // TODO: 暗号化前後の16進数表示を行う
    // TODO: 暗号化したものを復号して元に戻せるか確認する

    return 0;
}`}
        />
      </div>
    </div>
  );
}
