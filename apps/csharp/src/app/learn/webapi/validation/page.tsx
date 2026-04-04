import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function ValidationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バリデーション</h1>
        <p className="text-gray-400">DataAnnotations・[Required]・[StringLength]・ModelStateによる入力検証を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DataAnnotations 属性</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          モデルクラスに属性を付けてバリデーションルールを定義します:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[Required]</code>: 必須フィールド</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[StringLength(max)]</code>: 文字列長さ制約</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[Range(min, max)]</code>: 数値範囲</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[EmailAddress]</code>: メールアドレス形式</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">[RegularExpression]</code>: 正規表現パターン</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DataAnnotations によるバリデーション</h2>
        <p className="text-gray-400 mb-4">
          System.ComponentModel.DataAnnotations を使ったモデル検証です。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

class RegisterUserDto
{
    [Required(ErrorMessage = "ユーザー名は必須です")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "3〜50文字で入力してください")]
    public string? UserName { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "有効なメールアドレスを入力してください")]
    public string? Email { get; set; }

    [Required]
    [Range(18, 120, ErrorMessage = "年齢は18〜120の範囲で入力してください")]
    public int Age { get; set; }
}

class ModelValidator
{
    public static List<string> Validate(object model)
    {
        var errors = new List<string>();
        var context = new ValidationContext(model);
        var results = new List<ValidationResult>();
        Validator.TryValidateObject(model, context, results, validateAllProperties: true);
        foreach (var r in results)
            errors.Add(r.ErrorMessage ?? "バリデーションエラー");
        return errors;
    }
}

class Program
{
    static void Main()
    {
        // 有効なデータ
        var valid = new RegisterUserDto { UserName = "alice", Email = "alice@example.com", Age = 25 };
        var errors = ModelValidator.Validate(valid);
        Console.WriteLine(errors.Count == 0 ? "有効: バリデーション通過" : "無効: " + string.Join(", ", errors));

        // 無効なデータ
        var invalid = new RegisterUserDto { UserName = "ab", Email = "not-an-email", Age = 15 };
        errors = ModelValidator.Validate(invalid);
        Console.WriteLine("エラー:");
        foreach (var e in errors)
            Console.WriteLine($"  - {e}");
    }
}`}
          expectedOutput={`有効: バリデーション通過
エラー:
  - 3〜50文字で入力してください
  - 有効なメールアドレスを入力してください
  - 年齢は18〜120の範囲で入力してください`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムバリデーション属性</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">ValidationAttribute</code> を継承して独自の検証ルールを作成できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.ComponentModel.DataAnnotations;

// カスタムバリデーション属性
class FutureDateAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        if (value is DateTime date)
            return date > DateTime.Now;
        return false;
    }

    public override string FormatErrorMessage(string name)
        => $"{name}は現在より未来の日付を指定してください";
}

class EventDto
{
    [Required]
    public string? Title { get; set; }

    [FutureDate]
    public DateTime StartDate { get; set; }
}

class Program
{
    static void Main()
    {
        var past = new EventDto { Title = "勉強会", StartDate = DateTime.Now.AddDays(-1) };
        var future = new EventDto { Title = "発表会", StartDate = DateTime.Now.AddDays(7) };

        foreach (var ev in new[] { past, future })
        {
            var ctx = new ValidationContext(ev);
            var results = new System.Collections.Generic.List<ValidationResult>();
            bool valid = Validator.TryValidateObject(ev, ctx, results, true);
            Console.WriteLine($"{ev.Title}: {(valid ? "OK" : results[0].ErrorMessage)}");
        }
    }
}`}
          expectedOutput={`勉強会: StartDateは現在より未来の日付を指定してください
発表会: OK`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="validation" />
      </div>
      <LessonNav lessons={lessons} currentId="validation" basePath="/learn/webapi" />
    </div>
  );
}
