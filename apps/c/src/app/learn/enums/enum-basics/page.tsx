import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("enums");

export default function EnumBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">enum・型 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">enumの基本</h1>
        <p className="text-gray-400">enum Color {"{ RED, GREEN, BLUE };"} の定義と使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">enumとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          列挙型（enum）は名前付き整数定数の集合を定義します。
          マジックナンバー（意味不明な数値）の代わりに意味のある名前を使うことで、
          コードの可読性と保守性が大幅に向上します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>最初のメンバのデフォルト値は 0</li>
          <li>以降は前の値 +1 が自動で割り当てられる</li>
          <li>明示的に値を指定することもできる</li>
          <li>実態は整数型（int）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な enum</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">enum Color</code> で色の列挙型を定義します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

enum Color { RED, GREEN, BLUE };
enum Direction { NORTH, SOUTH, EAST, WEST };

int main() {
    enum Color c = GREEN;

    printf("RED   = %d\\n", RED);
    printf("GREEN = %d\\n", GREEN);
    printf("BLUE  = %d\\n", BLUE);

    printf("現在の色: %d\\n", c);

    if (c == GREEN) {
        printf("緑色です\\n");
    }

    return 0;
}`}
          expectedOutput={`RED   = 0
GREEN = 1
BLUE  = 2
現在の色: 1
緑色です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値を明示指定する enum</h2>
        <p className="text-gray-400 mb-4">
          各メンバに明示的な値を割り当てることができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

enum HttpStatus {
    OK          = 200,
    CREATED     = 201,
    BAD_REQUEST = 400,
    NOT_FOUND   = 404,
    SERVER_ERROR = 500,
};

void printStatus(enum HttpStatus s) {
    switch (s) {
        case OK:          printf("200 OK\\n"); break;
        case CREATED:     printf("201 Created\\n"); break;
        case NOT_FOUND:   printf("404 Not Found\\n"); break;
        case SERVER_ERROR: printf("500 Internal Server Error\\n"); break;
        default:          printf("Unknown: %d\\n", s); break;
    }
}

int main() {
    printStatus(OK);
    printStatus(NOT_FOUND);
    printStatus(SERVER_ERROR);
    return 0;
}`}
          expectedOutput={`200 OK
404 Not Found
500 Internal Server Error`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch 文との組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          enum は switch 文と非常に相性が良く、全ケースを網羅しやすくなります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

enum Season { SPRING, SUMMER, AUTUMN, WINTER };

const char *seasonName(enum Season s) {
    switch (s) {
        case SPRING: return "春";
        case SUMMER: return "夏";
        case AUTUMN: return "秋";
        case WINTER: return "冬";
        default:     return "不明";
    }
}

int main() {
    for (int s = SPRING; s <= WINTER; s++) {
        printf("%d: %s\\n", s, seasonName((enum Season)s));
    }
    return 0;
}`}
          expectedOutput={`0: 春
1: 夏
2: 秋
3: 冬`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="enum-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="enum-basics" basePath="/learn/enums" />
    </div>
  );
}
