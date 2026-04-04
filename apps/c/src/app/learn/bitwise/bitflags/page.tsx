import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

export default function BitflagsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビット演算 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビットフラグ</h1>
        <p className="text-gray-400">ビットをフラグとして使う・#define FLAG_READ 1 を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビットフラグパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          1つの整数変数の各ビットをフラグとして使うことで、複数の真偽値をコンパクトに管理できます。
          オプション設定・権限管理・ゲーム状態などに広く使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>各フラグを <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">1 &lt;&lt; n</code> で定義</li>
          <li>フラグON: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">flags |= FLAG</code></li>
          <li>フラグOFF: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">flags &amp;= ~FLAG</code></li>
          <li>フラグチェック: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">flags &amp; FLAG</code></li>
          <li>フラグトグル: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">flags ^= FLAG</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルパーミッションフラグ</h2>
        <p className="text-gray-400 mb-4">
          Unix風のファイルパーミッションをビットフラグで実装します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define PERM_READ    (1 << 0)  // 0001
#define PERM_WRITE   (1 << 1)  // 0010
#define PERM_EXECUTE (1 << 2)  // 0100

void printPerms(unsigned int perms) {
    printf("%c%c%c",
        (perms & PERM_READ)    ? 'r' : '-',
        (perms & PERM_WRITE)   ? 'w' : '-',
        (perms & PERM_EXECUTE) ? 'x' : '-');
    printf(" (%d)\\n", perms);
}

int main() {
    unsigned int perms = 0;

    perms |= PERM_READ;
    printf("読み取りのみ: ");
    printPerms(perms);

    perms |= PERM_WRITE;
    printf("読み書き:     ");
    printPerms(perms);

    perms |= PERM_EXECUTE;
    printf("全権限:       ");
    printPerms(perms);

    perms &= ~PERM_WRITE;
    printf("書き込み削除: ");
    printPerms(perms);

    return 0;
}`}
          expectedOutput={`読み取りのみ: r-- (1)
読み書き:     rw- (3)
全権限:       rwx (7)
書き込み削除: r-x (5)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ゲームステートフラグ</h2>
        <p className="text-gray-400 mb-4">
          ゲームキャラクターの状態管理にビットフラグを活用します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define STATE_ALIVE    (1 << 0)
#define STATE_MOVING   (1 << 1)
#define STATE_JUMPING  (1 << 2)
#define STATE_ATTACKING (1 << 3)
#define STATE_INVINCIBLE (1 << 4)

void printState(unsigned int state) {
    if (state & STATE_ALIVE)     printf("alive ");
    if (state & STATE_MOVING)    printf("moving ");
    if (state & STATE_JUMPING)   printf("jumping ");
    if (state & STATE_ATTACKING) printf("attacking ");
    if (state & STATE_INVINCIBLE) printf("invincible ");
    printf("\\n");
}

int main() {
    unsigned int player = STATE_ALIVE;
    printf("初期: "); printState(player);

    player |= STATE_MOVING | STATE_JUMPING;
    printf("移動中: "); printState(player);

    player &= ~STATE_JUMPING;
    player |= STATE_ATTACKING;
    printf("攻撃中: "); printState(player);

    return 0;
}`}
          expectedOutput={`初期: alive 
移動中: alive moving jumping 
攻撃中: alive moving attacking `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="bitwise" lessonId="bitflags" />
      </div>
      <LessonNav lessons={lessons} currentId="bitflags" basePath="/learn/bitwise" />
    </div>
  );
}
