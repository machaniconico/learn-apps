import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

export default function FilepathPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ファイルI/O レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">filepath</h1>
        <p className="text-gray-400">filepath.Join、filepath.Walk、path操作ユーティリティの使い方を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パス操作の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">path/filepath</code> パッケージはOS依存のパスセパレータを
          自動的に処理します。直接文字列結合するのではなく、必ずこのパッケージを使いましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    // Join: パス要素を結合
    path := filepath.Join("home", "user", "documents", "file.txt")
    fmt.Println("Join:", path)

    // Dir: ディレクトリ部分を取得
    fmt.Println("Dir:", filepath.Dir(path))

    // Base: ファイル名を取得
    fmt.Println("Base:", filepath.Base(path))

    // Ext: 拡張子を取得
    fmt.Println("Ext:", filepath.Ext(path))

    // 拡張子を除いたファイル名
    name := filepath.Base(path)
    nameWithoutExt := name[:len(name)-len(filepath.Ext(name))]
    fmt.Println("Name:", nameWithoutExt)
}`}
          expectedOutput={`Join: home/user/documents/file.txt
Dir: home/user/documents
Base: file.txt
Ext: .txt
Name: file`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パスのクリーニングとマッチング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">filepath.Clean</code> はパスを正規化し、
          <code className="text-cyan-300">filepath.Match</code> はパターンマッチングを行います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    // Clean: パスを正規化
    fmt.Println("=== Clean ===")
    fmt.Println(filepath.Clean("a/b/../c"))
    fmt.Println(filepath.Clean("a/./b/./c"))
    fmt.Println(filepath.Clean("//a//b//c"))

    // Match: パターンマッチング
    fmt.Println("\\n=== Match ===")
    files := []string{"main.go", "utils.go", "test_utils.go", "README.md", "data.json"}
    for _, f := range files {
        matched, _ := filepath.Match("*.go", f)
        if matched {
            fmt.Printf("  *.go にマッチ: %s\\n", f)
        }
    }

    // Abs: 絶対パスに変換
    fmt.Println("\\n=== Abs ===")
    abs, _ := filepath.Abs(".")
    fmt.Println("現在のディレクトリ:", abs)
}`}
          expectedOutput={`=== Clean ===
a/c
a/b/c
/a/b/c

=== Match ===
  *.go にマッチ: main.go
  *.go にマッチ: utils.go
  *.go にマッチ: test_utils.go

=== Abs ===
現在のディレクトリ: /home/user`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">filepath.WalkDir</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">filepath.WalkDir</code> はディレクトリツリーを再帰的に走査します。
          Go 1.16で追加され、<code className="text-cyan-300">filepath.Walk</code> より効率的です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func main() {
    // テスト用ディレクトリ構造を作成
    os.MkdirAll("testdir/sub1", 0755)
    os.MkdirAll("testdir/sub2", 0755)
    os.WriteFile("testdir/main.go", []byte("package main"), 0644)
    os.WriteFile("testdir/sub1/util.go", []byte("package sub1"), 0644)
    os.WriteFile("testdir/sub2/data.json", []byte("{}"), 0644)
    defer os.RemoveAll("testdir")

    fmt.Println("=== ディレクトリ走査 ===")
    filepath.WalkDir("testdir", func(path string, d os.DirEntry, err error) error {
        if err != nil {
            return err
        }
        if d.IsDir() {
            fmt.Printf("[DIR]  %s\\n", path)
        } else {
            info, _ := d.Info()
            fmt.Printf("[FILE] %s (%d bytes)\\n", path, info.Size())
        }
        return nil
    })
}`}
          expectedOutput={`=== ディレクトリ走査 ===
[DIR]  testdir
[FILE] testdir/main.go (12 bytes)
[DIR]  testdir/sub1
[FILE] testdir/sub1/util.go (12 bytes)
[DIR]  testdir/sub2
[FILE] testdir/sub2/data.json (2 bytes)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="io" lessonId="filepath" />
      </div>
      <LessonNav lessons={lessons} currentId="filepath" basePath="/learn/io" />
    </div>
  );
}
