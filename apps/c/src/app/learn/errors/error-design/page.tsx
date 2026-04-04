import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function ErrorDesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エラー処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラー設計</h1>
        <p className="text-gray-400">エラーコード・戻り値パターン・gotoクリーンアップパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Cのエラー処理戦略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Cには例外処理がないため、エラーを戻り値で通知するのが基本パターンです。
          いくつかの設計パターンがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>戻り値でエラーコードを返す（-1 or enum値）</li>
          <li>ポインタ引数でエラー情報を返す</li>
          <li>gotoを使ったクリーンアップパターン</li>
          <li>errnoを設定して-1を返す（POSIXスタイル）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーコードのenum定義</h2>
        <p className="text-gray-400 mb-4">
          エラーコードをenumで定義することで意味のある名前を使えます。
          成功は0、失敗は負の値が慣例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

typedef enum {
    ERR_OK       =  0,
    ERR_NULL_PTR = -1,
    ERR_TOO_LONG = -2,
    ERR_NO_MEM   = -3,
} ErrorCode;

const char *error_string(ErrorCode err) {
    switch (err) {
        case ERR_OK:       return "成功";
        case ERR_NULL_PTR: return "NULLポインタ";
        case ERR_TOO_LONG: return "文字列が長すぎる";
        case ERR_NO_MEM:   return "メモリ不足";
        default:           return "不明なエラー";
    }
}

ErrorCode process_string(const char *s, char *out, int max_len) {
    if (s == NULL || out == NULL) return ERR_NULL_PTR;
    if ((int)strlen(s) >= max_len) return ERR_TOO_LONG;
    strcpy(out, s);
    return ERR_OK;
}

int main(void) {
    char buf[16];
    ErrorCode rc;

    rc = process_string("Hello", buf, sizeof(buf));
    printf("短い文字列: %s (%s)\\n", buf, error_string(rc));

    rc = process_string("This string is too long for buffer", buf, sizeof(buf));
    printf("長い文字列: %s\\n", error_string(rc));

    rc = process_string(NULL, buf, sizeof(buf));
    printf("NULL: %s\\n", error_string(rc));

    return 0;
}`}
          expectedOutput={`短い文字列: Hello (成功)
長い文字列: 文字列が長すぎる
NULL: NULLポインタ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">gotoクリーンアップパターン</h2>
        <p className="text-gray-400 mb-4">
          複数のリソースを確保する際、エラー時のクリーンアップにgotoを使うパターンです。
          Linuxカーネルでも広く採用されています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int process_data(const char *filename) {
    FILE *fp = NULL;
    char *buf = NULL;
    int ret = -1;

    /* リソース1: ファイルオープン */
    fp = fopen(filename, "r");
    if (fp == NULL) {
        fprintf(stderr, "ファイルを開けない: %s\\n", filename);
        goto cleanup;
    }

    /* リソース2: バッファ確保 */
    buf = malloc(256);
    if (buf == NULL) {
        fprintf(stderr, "メモリ確保失敗\\n");
        goto cleanup;
    }

    /* 処理 */
    printf("処理成功: %s\\n", filename);
    ret = 0;

cleanup:
    /* 逆順でクリーンアップ */
    free(buf);      /* NULLでも安全 */
    if (fp) fclose(fp);
    return ret;
}

int main(void) {
    int rc = process_data("/etc/hosts");
    printf("結果: %d\\n", rc);

    rc = process_data("/nonexistent/file.txt");
    printf("結果: %d\\n", rc);

    return 0;
}`}
          expectedOutput={`処理成功: /etc/hosts
結果: 0
ファイルを開けない: /nonexistent/file.txt
結果: -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">出力引数パターン</h2>
        <p className="text-gray-400 mb-4">
          関数の戻り値をエラーコードにし、結果はポインタ引数で返すパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

typedef enum { OK = 0, ERR_INVALID = -1, ERR_MEM = -2 } Result;

Result create_array(int size, int **out_array) {
    if (size <= 0) return ERR_INVALID;

    *out_array = malloc(sizeof(int) * size);
    if (*out_array == NULL) return ERR_MEM;

    for (int i = 0; i < size; i++) {
        (*out_array)[i] = i * i;
    }
    return OK;
}

int main(void) {
    int *arr = NULL;
    Result rc = create_array(5, &arr);

    if (rc == OK) {
        printf("配列作成成功:\\n");
        for (int i = 0; i < 5; i++) {
            printf("  arr[%d] = %d\\n", i, arr[i]);
        }
        free(arr);
    } else {
        printf("エラー: %d\\n", rc);
    }

    /* 無効なサイズ */
    rc = create_array(-1, &arr);
    printf("size=-1: rc=%d\\n", rc);

    return 0;
}`}
          expectedOutput={`配列作成成功:
  arr[0] = 0
  arr[1] = 1
  arr[2] = 4
  arr[3] = 9
  arr[4] = 16
size=-1: rc=-1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="error-design" />
      </div>
      <LessonNav lessons={lessons} currentId="error-design" basePath="/learn/errors" />
    </div>
  );
}
