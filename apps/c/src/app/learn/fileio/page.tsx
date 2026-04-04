import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "fopen()でファイルを書き込みモードで開く正しいモード文字列はどれですか？",
    options: ["\"r\"", "\"w\"", "\"e\"", "\"write\""],
    answer: 1,
    explanation: "\"w\"は書き込みモードです。ファイルが存在すれば内容を消去し、なければ新規作成します。\"r\"は読み込み専用です。",
  },
  {
    question: "feof()関数の戻り値について正しいのはどれですか？",
    options: [
      "ファイルの終端に達していれば0を返す",
      "ファイルの終端に達していれば0以外を返す",
      "常に1を返す",
      "ファイルサイズを返す",
    ],
    answer: 1,
    explanation: "feof()はファイルの終端（EOF）に達していれば0以外の値を返し、まだ終端でなければ0を返します。",
  },
  {
    question: "fseek()のSEEK_ENDについて正しいのはどれですか？",
    options: [
      "ファイルの先頭を基準にする",
      "現在位置を基準にする",
      "ファイルの末尾を基準にする",
      "バッファの末尾を基準にする",
    ],
    answer: 2,
    explanation: "SEEK_ENDはファイルの末尾を基準にします。SEEK_SETはファイル先頭、SEEK_CURは現在位置を基準にします。",
  },
  {
    question: "バイナリモードでファイルを開く正しいモード文字列はどれですか？",
    options: ["\"b\"", "\"bin\"", "\"rb\"", "\"binary\""],
    answer: 2,
    explanation: "バイナリ読み込みは\"rb\"、バイナリ書き込みは\"wb\"を使います。バイナリモードでは改行コードの変換が行われません。",
  },
];

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語のファイル入出力を学びます。fopen・fclose からファイルの読み書き、バイナリI/O、ファイル位置操作、エラー処理まで体系的に習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="indigo" categoryId="fileio" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fopen・fclose の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fopen()</code> でファイルを開き、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fclose()</code> で必ず閉じます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // ファイルに書き込み
    FILE *fp = fopen("test.txt", "w");
    if (fp == NULL) {
        perror("ファイルを開けません");
        return 1;
    }
    fprintf(fp, "Hello, File!\\n");
    fprintf(fp, "Line 2\\n");
    fclose(fp);

    // ファイルを読み込み
    fp = fopen("test.txt", "r");
    char line[100];
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%s", line);
    }
    fclose(fp);

    return 0;
}`}
          expectedOutput={`Hello, File!
Line 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイル位置操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ftell()</code> で現在位置取得、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fseek()</code> で位置移動ができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "w");
    fputs("ABCDEFGHIJ", fp);
    fclose(fp);

    fp = fopen("data.txt", "r");

    fseek(fp, 0, SEEK_END);
    long size = ftell(fp);
    printf("ファイルサイズ: %ld バイト\\n", size);

    fseek(fp, 3, SEEK_SET);
    char c = fgetc(fp);
    printf("位置3の文字: %c\\n", c);

    rewind(fp);
    c = fgetc(fp);
    printf("先頭の文字: %c\\n", c);

    fclose(fp);
    return 0;
}`}
          expectedOutput={`ファイルサイズ: 10 バイト
位置3の文字: D
先頭の文字: A`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
