import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function CustomErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタムエラー</h1>
        <p className="text-gray-400">Error()メソッドを実装した独自のエラー型を定義する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムエラー型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">Error() string</code> メソッドを実装した任意の型は <code className="text-cyan-300">error</code> インターフェースを満たします。
          カスタムエラー型を使えば、エラーに追加情報（コード、フィールド名など）を持たせることができます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカスタムエラー</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

// カスタムエラー型
type ValidationError struct {
    Field   string
    Message string
}

// Error()メソッドでerrorインターフェースを実装
func (e *ValidationError) Error() string {
    return fmt.Sprintf("バリデーションエラー [%s]: %s", e.Field, e.Message)
}

func validateEmail(email string) error {
    if email == "" {
        return &ValidationError{Field: "email", Message: "必須項目です"}
    }
    if len(email) < 5 {
        return &ValidationError{Field: "email", Message: "短すぎます"}
    }
    return nil
}

func main() {
    emails := []string{"user@example.com", "", "ab"}

    for _, email := range emails {
        err := validateEmail(email)
        if err != nil {
            fmt.Println(err)
        } else {
            fmt.Printf("%s: OK\\n", email)
        }
    }
}`}
          expectedOutput={`user@example.com: OK
バリデーションエラー [email]: 必須項目です
バリデーションエラー [email]: 短すぎます`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーコード付きカスタムエラー</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type AppError struct {
    Code    int
    Message string
}

func (e *AppError) Error() string {
    return fmt.Sprintf("エラー %d: %s", e.Code, e.Message)
}

func findUser(id int) (string, error) {
    if id <= 0 {
        return "", &AppError{Code: 400, Message: "無効なユーザーID"}
    }
    if id > 100 {
        return "", &AppError{Code: 404, Message: "ユーザーが見つかりません"}
    }
    return fmt.Sprintf("User-%d", id), nil
}

func main() {
    ids := []int{1, -1, 999}

    for _, id := range ids {
        user, err := findUser(id)
        if err != nil {
            // 型アサーションでカスタムエラーの情報にアクセス
            if appErr, ok := err.(*AppError); ok {
                fmt.Printf("ID=%d: コード=%d, %s\\n", id, appErr.Code, appErr.Message)
            }
        } else {
            fmt.Printf("ID=%d: %s\\n", id, user)
        }
    }
}`}
          expectedOutput={`ID=1: User-1
ID=-1: コード=400, 無効なユーザーID
ID=999: コード=404, ユーザーが見つかりません`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数フィールドのバリデーション</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

type FieldError struct {
    Field   string
    Message string
}

type ValidationErrors struct {
    Errors []FieldError
}

func (e *ValidationErrors) Error() string {
    msgs := make([]string, len(e.Errors))
    for i, fe := range e.Errors {
        msgs[i] = fmt.Sprintf("%s: %s", fe.Field, fe.Message)
    }
    return strings.Join(msgs, "; ")
}

func validateUser(name, email string, age int) error {
    var errs []FieldError

    if name == "" {
        errs = append(errs, FieldError{"name", "必須"})
    }
    if email == "" {
        errs = append(errs, FieldError{"email", "必須"})
    }
    if age < 0 || age > 150 {
        errs = append(errs, FieldError{"age", "範囲外"})
    }

    if len(errs) > 0 {
        return &ValidationErrors{Errors: errs}
    }
    return nil
}

func main() {
    err := validateUser("", "", -1)
    if err != nil {
        fmt.Println(err)
    }

    err = validateUser("太郎", "taro@example.com", 25)
    if err != nil {
        fmt.Println(err)
    } else {
        fmt.Println("バリデーション成功")
    }
}`}
          expectedOutput={`name: 必須; email: 必須; age: 範囲外
バリデーション成功`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="custom" />
      </div>
      <LessonNav lessons={lessons} currentId="custom" basePath="/learn/errors" />
    </div>
  );
}
