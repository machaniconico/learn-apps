import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

export default function PytestParametrizePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">pytest レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ化テスト</h1>
        <p className="text-gray-400">@pytest.mark.parametrizeで多数のテストケースを効率よくテストする方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テストとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          同じテストロジックを異なる入力値・期待値で繰り返す場合、
          <code className="bg-gray-800 px-1 rounded text-yellow-300">@pytest.mark.parametrize</code> を使うと
          重複コードなしに多数のテストケースを記述できます。
          境界値・正常値・異常値を網羅的にテストするのに最適です。
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono text-xs">
            @pytest.mark.parametrize("a, b, expected", [<br />
            {"    "}(1, 2, 3),<br />
            {"    "}(0, 5, 5),<br />
            {"    "}(-1, -2, -3),<br />
            ])<br />
            def test_add(a, b, expected):<br />
            {"    "}assert add(a, b) == expected
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化のコンセプトを実践しよう</h2>
        <PythonPlayground defaultCode={`# パラメータ化テストのコンセプト

def is_valid_email(email):
    """簡易メールアドレスバリデーション"""
    if '@' not in email:
        return False
    parts = email.split('@')
    if len(parts) != 2:
        return False
    local, domain = parts
    if not local or not domain:
        return False
    if '.' not in domain:
        return False
    return True

# pytest.mark.parametrize に相当するテストケースリスト
# (入力, 期待する結果)
email_test_cases = [
    # 正常系
    ("user@example.com", True),
    ("test.name@company.co.jp", True),
    ("user+tag@gmail.com", True),
    # 異常系
    ("not-an-email", False),
    ("missing@", False),
    ("@nodomain.com", False),
    ("no-at-sign.com", False),
    ("double@@at.com", False),
]

print("=== パラメータ化テスト ===")
passed = failed = 0

for email, expected in email_test_cases:
    result = is_valid_email(email)
    status = "PASSED" if result == expected else "FAILED"
    if result == expected:
        passed += 1
    else:
        failed += 1
    print(f"  {status}: is_valid_email({email!r}) == {expected} (実際: {result})")

print(f"\\n合計: {passed}件合格, {failed}件失敗")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">境界値テストのパターン</h2>
        <p className="text-gray-400 mb-4">パラメータ化テストは境界値（エッジケース）の網羅的なテストに特に有効です。</p>
        <PythonPlayground defaultCode={`# 境界値テストのパターン

def grade(score):
    """点数から成績を返す"""
    if score < 0 or score > 100:
        raise ValueError(f"スコアは0〜100の範囲で指定してください: {score}")
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'F'

# 境界値を意識したテストケース
grade_test_cases = [
    # 境界値（ちょうどの値）
    (90, 'A'),
    (80, 'B'),
    (70, 'C'),
    (60, 'D'),
    (59, 'F'),
    # 境界値±1
    (91, 'A'),
    (89, 'B'),
    (79, 'C'),
    (69, 'D'),
    # 端点
    (100, 'A'),
    (0, 'F'),
]

print("=== 境界値テスト ===")
passed = failed = 0
for score, expected_grade in grade_test_cases:
    actual = grade(score)
    ok = actual == expected_grade
    passed += ok
    failed += not ok
    mark = "OK" if ok else "NG"
    print(f"  {mark}: grade({score:3d}) = '{actual}' (期待: '{expected_grade}')")

print(f"\\n結果: {passed}/{passed+failed} 合格")`} />
      </section>

      <LessonCompleteButton categoryId="pytest" lessonId="parametrize" />
      <LessonNav lessons={lessons} currentId="parametrize" basePath="/learn/pytest" />
    </div>
  );
}
