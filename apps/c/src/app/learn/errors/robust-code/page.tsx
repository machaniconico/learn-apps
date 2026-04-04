import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function RobustCodePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エラー処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">堅牢なコード</h1>
        <p className="text-gray-400">防御的プログラミング・入力検証・リソース管理の技法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">防御的プログラミングの原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          堅牢なコードは「入力は疑え、出力は確認せよ」の精神で書きます。
          すべての外部入力を検証し、すべての関数の戻り値を確認します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>すべてのポインタ引数のNULLチェック</li>
          <li>配列インデックスの境界チェック</li>
          <li>malloc/callocの戻り値チェック</li>
          <li>整数オーバーフローの防止</li>
          <li>文字列操作でのバッファオーバーフロー防止</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">入力検証</h2>
        <p className="text-gray-400 mb-4">
          関数の冒頭で引数を検証し、不正な入力を早期に弾きます。
          「フェイルファスト」の原則です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

#define MAX_NAME_LEN 64

typedef struct {
    char name[MAX_NAME_LEN];
    int age;
    double score;
} Student;

int create_student(Student *s, const char *name, int age, double score) {
    /* NULLチェック */
    if (s == NULL || name == NULL) return -1;

    /* 範囲チェック */
    if (age < 0 || age > 150) return -2;
    if (score < 0.0 || score > 100.0) return -3;

    /* 文字列長チェック */
    if (strlen(name) >= MAX_NAME_LEN) return -4;

    /* 安全なコピー */
    strncpy(s->name, name, MAX_NAME_LEN - 1);
    s->name[MAX_NAME_LEN - 1] = '\\0';
    s->age = age;
    s->score = score;
    return 0;
}

int main(void) {
    Student s;
    int rc;

    rc = create_student(&s, "田中太郎", 20, 85.5);
    if (rc == 0) printf("作成OK: %s, %d歳, %.1f点\\n", s.name, s.age, s.score);

    rc = create_student(&s, "エラーテスト", 200, 50.0);
    printf("年齢200: rc=%d\\n", rc);

    rc = create_student(&s, "スコアエラー", 20, 150.0);
    printf("スコア150: rc=%d\\n", rc);

    return 0;
}`}
          expectedOutput={`作成OK: 田中太郎, 20歳, 85.5点
年齢200: rc=-2
スコア150: rc=-3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数オーバーフローの防止</h2>
        <p className="text-gray-400 mb-4">
          整数の加算や乗算はオーバーフローする可能性があります。
          事前チェックで安全な演算を保証します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <limits.h>

/* 安全な加算 */
int safe_add(int a, int b, int *result) {
    /* オーバーフロー前チェック */
    if (b > 0 && a > INT_MAX - b) return -1;  /* 正のオーバーフロー */
    if (b < 0 && a < INT_MIN - b) return -1;  /* 負のオーバーフロー */
    *result = a + b;
    return 0;
}

/* 安全な乗算 */
int safe_multiply(int a, int b, int *result) {
    if (a != 0 && b > INT_MAX / a) return -1;
    if (a != 0 && b < INT_MIN / a) return -1;
    *result = a * b;
    return 0;
}

int main(void) {
    int r;

    safe_add(100, 200, &r);
    printf("100 + 200 = %d\\n", r);

    int rc = safe_add(INT_MAX, 1, &r);
    printf("INT_MAX + 1: %s\\n", rc == 0 ? "OK" : "オーバーフロー防止");

    safe_multiply(1000, 2000, &r);
    printf("1000 * 2000 = %d\\n", r);

    rc = safe_multiply(INT_MAX, 2, &r);
    printf("INT_MAX * 2: %s\\n", rc == 0 ? "OK" : "オーバーフロー防止");

    return 0;
}`}
          expectedOutput={`100 + 200 = 300
INT_MAX + 1: オーバーフロー防止
1000 * 2000 = 2000000
INT_MAX * 2: オーバーフロー防止`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リソース管理のベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          確保したリソースは必ず解放します。
          所有権を明確にし、解放後はNULLを設定してダングリングポインタを防ぎます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    size_t size;
} Buffer;

Buffer *buffer_create(size_t size) {
    Buffer *buf = malloc(sizeof(Buffer));
    if (buf == NULL) return NULL;

    buf->data = malloc(size);
    if (buf->data == NULL) {
        free(buf);  /* 部分的な確保もクリーンアップ */
        return NULL;
    }

    buf->size = size;
    memset(buf->data, 0, size);
    return buf;
}

void buffer_destroy(Buffer **buf) {
    if (buf == NULL || *buf == NULL) return;
    free((*buf)->data);
    (*buf)->data = NULL;
    free(*buf);
    *buf = NULL;  /* ダングリング防止 */
}

int main(void) {
    Buffer *b = buffer_create(32);
    if (b == NULL) {
        fprintf(stderr, "確保失敗\\n");
        return 1;
    }

    strncpy(b->data, "Hello, Buffer!", b->size - 1);
    printf("データ: %s\\n", b->data);
    printf("サイズ: %zu\\n", b->size);

    buffer_destroy(&b);
    printf("解放後: b=%s\\n", b == NULL ? "NULL（安全）" : "非NULL（危険）");

    return 0;
}`}
          expectedOutput={`データ: Hello, Buffer!
サイズ: 32
解放後: b=NULL（安全）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="robust-code" />
      </div>
      <LessonNav lessons={lessons} currentId="robust-code" basePath="/learn/errors" />
    </div>
  );
}
