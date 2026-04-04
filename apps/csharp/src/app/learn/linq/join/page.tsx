import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function JoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">LINQ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Join</h1>
        <p className="text-gray-400">Inner Join・Group Join・Cross Joinを使って複数データソースを結合する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Join の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LINQには3種類のJoinがあります。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Join</code>: 内部結合（両方に一致する要素のみ）</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">GroupJoin</code>: グループ結合（左外部結合的な動作）</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">SelectMany</code>: 直積（Cross Join）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Inner Join</h2>
        <p className="text-gray-400 mb-4">
          両方のシーケンスでキーが一致する要素を結合します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var departments = new List<(int Id, string Name)>
{
    (1, "開発部"),
    (2, "営業部"),
    (3, "総務部"),
};

var employees = new List<(int DeptId, string Name)>
{
    (1, "Alice"),
    (1, "Bob"),
    (2, "Charlie"),
    (1, "Dave"),
};

// Inner Join
var result = employees.Join(
    departments,
    emp => emp.DeptId,      // 外側のキー
    dept => dept.Id,         // 内側のキー
    (emp, dept) => new { emp.Name, dept.Name }  // 結果の形
);

foreach (var r in result)
    Console.WriteLine($"{r.Name} → {r.Name}");`}
          expectedOutput={`Alice → 開発部
Bob → 開発部
Charlie → 営業部
Dave → 開発部`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Group Join（左外部結合）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">GroupJoin</code> は左側の要素ごとに一致する右側要素のグループを作ります。一致なしでも左側は残ります。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

var departments = new List<(int Id, string Name)>
{
    (1, "開発部"),
    (2, "営業部"),
    (3, "総務部"),
};

var employees = new List<(int DeptId, string Name)>
{
    (1, "Alice"),
    (1, "Bob"),
    (2, "Charlie"),
};

// Group Join（総務部は空グループになる）
var result = departments.GroupJoin(
    employees,
    dept => dept.Id,
    emp => emp.DeptId,
    (dept, emps) => new { dept.Name, Employees = emps.ToList() }
);

foreach (var r in result)
{
    var names = r.Employees.Count > 0
        ? string.Join(", ", r.Employees.Select(e => e.Name))
        : "（なし）";
    Console.WriteLine($"{r.Name}: {names}");
}`}
          expectedOutput={`開発部: Alice, Bob
営業部: Charlie
総務部: （なし）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="linq" lessonId="join" />
      </div>
      <LessonNav lessons={lessons} currentId="join" basePath="/learn/linq" />
    </div>
  );
}
