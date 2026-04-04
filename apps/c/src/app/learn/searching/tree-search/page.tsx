import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("searching");

export default function TreeSearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">探索アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">二分探索木</h1>
        <p className="text-gray-400">BST の挿入・探索・中順走査を C で実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">二分探索木（BST）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          二分探索木は各ノードについて「左の子 &lt; ノード &lt; 右の子」という制約を満たすツリーです。
          バランスが取れていれば探索・挿入・削除が O(log n) で行えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>左の子孫 &lt; 根 &lt; 右の子孫（BST 性質）</li>
          <li>探索・挿入：平均 O(log n)、最悪 O(n)（偏ったツリー）</li>
          <li>中順走査（in-order）で昇順に要素を列挙できる</li>
          <li>バランス調整には AVL 木や赤黒木が使われる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BST への挿入</h2>
        <p className="text-gray-400 mb-4">
          挿入は再帰的に行います。現在のノードより小さければ左へ、大きければ右へ進み、
          NULL に到達したら新しいノードを作成します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct BST {
    int data;
    struct BST *left, *right;
};

struct BST *insert(struct BST *root, int val) {
    if (root == NULL) {
        struct BST *n = malloc(sizeof(struct BST));
        n->data = val; n->left = n->right = NULL;
        return n;
    }
    if (val < root->data)
        root->left  = insert(root->left,  val);
    else if (val > root->data)
        root->right = insert(root->right, val);
    return root;
}

/* 中順走査（昇順） */
void inorder(struct BST *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

int main() {
    struct BST *root = NULL;
    int vals[] = {5, 3, 7, 1, 4, 6, 8};
    for (int i = 0; i < 7; i++)
        root = insert(root, vals[i]);

    printf("In-order: ");
    inorder(root);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`In-order: 1 3 4 5 6 7 8 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BST での探索</h2>
        <p className="text-gray-400 mb-4">
          探索も再帰的に行います。目標値が現在のノードより小さければ左へ、大きければ右へ進みます。
          見つかればそのノードを返し、NULL に達したら NULL を返します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct BST {
    int data;
    struct BST *left, *right;
};

struct BST *insert(struct BST *root, int val) {
    if (!root) {
        struct BST *n = malloc(sizeof(struct BST));
        n->data = val; n->left = n->right = NULL;
        return n;
    }
    if (val < root->data) root->left  = insert(root->left,  val);
    else if (val > root->data) root->right = insert(root->right, val);
    return root;
}

struct BST *search(struct BST *root, int target) {
    if (root == NULL || root->data == target) return root;
    if (target < root->data) return search(root->left,  target);
    return search(root->right, target);
}

int main() {
    struct BST *root = NULL;
    int vals[] = {5, 3, 7, 1, 4, 6, 8};
    for (int i = 0; i < 7; i++) root = insert(root, vals[i]);

    printf("search(4): %s\\n", search(root, 4) ? "found" : "not found");
    printf("search(9): %s\\n", search(root, 9) ? "found" : "not found");
    printf("search(1): %s\\n", search(root, 1) ? "found" : "not found");
    return 0;
}`}
          expectedOutput={`search(4): found
search(9): not found
search(1): found`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">前順・中順・後順の走査</h2>
        <p className="text-gray-400 mb-4">
          BST の3種類の走査を確認しましょう。中順（左→根→右）が昇順になるのは BST の重要な性質です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

struct BST { int data; struct BST *left, *right; };

struct BST *insert(struct BST *root, int val) {
    if (!root) {
        struct BST *n = malloc(sizeof(struct BST));
        n->data=val; n->left=n->right=NULL; return n;
    }
    if (val<root->data) root->left=insert(root->left,val);
    else root->right=insert(root->right,val);
    return root;
}

void preorder(struct BST *r)  { if(!r) return; printf("%d ",r->data); preorder(r->left);  preorder(r->right); }
void inorder(struct BST *r)   { if(!r) return; inorder(r->left);  printf("%d ",r->data); inorder(r->right);  }
void postorder(struct BST *r) { if(!r) return; postorder(r->left); postorder(r->right); printf("%d ",r->data); }

int main() {
    struct BST *root = NULL;
    int v[] = {4, 2, 6, 1, 3, 5, 7};
    for (int i=0;i<7;i++) root = insert(root, v[i]);

    printf("Pre:  "); preorder(root);  printf("\\n");
    printf("In:   "); inorder(root);   printf("\\n");
    printf("Post: "); postorder(root); printf("\\n");
    return 0;
}`}
          expectedOutput={`Pre:  4 2 1 3 6 5 7
In:   1 2 3 4 5 6 7
Post: 1 3 2 5 7 6 4 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="searching" lessonId="tree-search" />
      </div>
      <LessonNav lessons={lessons} currentId="tree-search" basePath="/learn/searching" />
    </div>
  );
}
