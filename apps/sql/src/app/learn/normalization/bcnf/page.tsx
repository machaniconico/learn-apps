import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "normalization")!.lessons;

export default function BcnfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">正規化 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ボイスコッド正規形</h1>
        <p className="text-gray-400">3NFを強化してすべての決定子が候補キーであることを保証する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">BCNFとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ボイスコッド正規形（BCNF）は3NFの厳格バージョンです。
          テーブル内のすべての関数従属 X → Y において、Xが候補キーでなければならないという条件を課します。
          3NFを満たしていてもBCNF違反になるケースは、複数の候補キーが重複した属性を持つときに発生します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">候補キー</code> — 行を一意に識別できる最小の属性集合</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">決定子</code> — 関数従属 X → Y のXのこと</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">BCNF条件</code> — すべての決定子が候補キーであること</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">BCNF違反の典型例</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          学生の履修テーブルで「学生ID, 科目」が候補キー、かつ「講師」が科目を決定する場合を考えます。
          講師 → 科目 の依存があり、「講師」は候補キーではないためBCNF違反です。
          解決策はテーブルを「科目-講師」と「学生-講師」に分割することです。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: BCNF違反テーブルの確認</h2>
        <SqlEditor
          defaultCode={`-- instructor → subject の依存があるが instructor は候補キーでない
SELECT * FROM enrollment_bad;`}
          setupSql={`CREATE TABLE enrollment_bad (
  student_id INTEGER,
  subject TEXT,
  instructor TEXT,
  PRIMARY KEY (student_id, subject)
);
INSERT INTO enrollment_bad VALUES (1, 'データベース', '山田先生');
INSERT INTO enrollment_bad VALUES (2, 'データベース', '山田先生');
INSERT INTO enrollment_bad VALUES (1, 'アルゴリズム', '佐藤先生');`}
          expectedOutput={`student_id | subject      | instructor
-----------+--------------+-----------
1          | データベース   | 山田先生
2          | データベース   | 山田先生
1          | アルゴリズム   | 佐藤先生`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: BCNFに分解したテーブル</h2>
        <SqlEditor
          defaultCode={`-- subject_instructor と student_instructor に分割
SELECT si.student_id, si.instructor, si2.subject
FROM student_instructor si
JOIN subject_instructor si2 ON si.instructor = si2.instructor;`}
          setupSql={`CREATE TABLE subject_instructor (subject TEXT, instructor TEXT, PRIMARY KEY (subject, instructor));
CREATE TABLE student_instructor (student_id INTEGER, instructor TEXT, PRIMARY KEY (student_id, instructor));
INSERT INTO subject_instructor VALUES ('データベース', '山田先生'), ('アルゴリズム', '佐藤先生');
INSERT INTO student_instructor VALUES (1, '山田先生'), (2, '山田先生'), (1, '佐藤先生');`}
          expectedOutput={`student_id | instructor | subject
-----------+------------+--------------
1          | 山田先生   | データベース
2          | 山田先生   | データベース
1          | 佐藤先生   | アルゴリズム`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 講師の担当科目変更が1か所で済む</h2>
        <SqlEditor
          defaultCode={`UPDATE subject_instructor SET subject = 'DB設計' WHERE instructor = '山田先生';
SELECT si.student_id, si.instructor, si2.subject
FROM student_instructor si
JOIN subject_instructor si2 ON si.instructor = si2.instructor;`}
          setupSql={`CREATE TABLE subject_instructor (subject TEXT, instructor TEXT, PRIMARY KEY (subject, instructor));
CREATE TABLE student_instructor (student_id INTEGER, instructor TEXT, PRIMARY KEY (student_id, instructor));
INSERT INTO subject_instructor VALUES ('データベース', '山田先生'), ('アルゴリズム', '佐藤先生');
INSERT INTO student_instructor VALUES (1, '山田先生'), (2, '山田先生'), (1, '佐藤先生');`}
          expectedOutput={`student_id | instructor | subject
-----------+------------+----------
1          | 山田先生   | DB設計
2          | 山田先生   | DB設計
1          | 佐藤先生   | アルゴリズム`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="normalization" lessonId="bcnf" />
      </div>
      <LessonNav lessons={lessons} currentId="bcnf" basePath="/learn/normalization" />
    </div>
  );
}
