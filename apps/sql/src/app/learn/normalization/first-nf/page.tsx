import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "normalization")!.lessons;

export default function FirstNfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">正規化 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">第1正規形</h1>
        <p className="text-gray-400">繰り返しグループを排除してデータを原子化する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">第1正規形とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          第1正規形（1NF）はデータベース正規化の最初のステップです。テーブルの各セルが単一の原子的な値を持ち、
          繰り返しグループ（配列や複数値）が存在しない状態を指します。
          1NFを満たすことで、SQLでの検索・更新が一貫して行えるようになります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">原子性</code> — 各カラムには分割できない単一の値のみ格納</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">繰り返しグループの排除</code> — 同種のデータを複数カラムに分割しない</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">主キーの存在</code> — 各行を一意に識別できるキーが必要</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">1NF違反の例と修正</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          たとえば「電話番号1、電話番号2、電話番号3」のように同種の値を複数カラムに分けるのは1NF違反です。
          また、カンマ区切りで複数の値を1つのカラムに詰め込むのも原子性の違反になります。
          正しくは、電話番号ごとに別の行として格納します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 1NF違反テーブルを確認する</h2>
        <SqlEditor
          defaultCode={`-- 1NF違反: phone1, phone2 という繰り返しグループがある
SELECT * FROM contacts_bad;`}
          setupSql={`CREATE TABLE contacts_bad (
  id INTEGER PRIMARY KEY,
  name TEXT,
  phone1 TEXT,
  phone2 TEXT
);
INSERT INTO contacts_bad VALUES (1, '田中太郎', '090-1111-2222', '03-3333-4444');
INSERT INTO contacts_bad VALUES (2, '鈴木花子', '080-5555-6666', NULL);`}
          expectedOutput={`id | name     | phone1        | phone2
---+----------+---------------+--------------
1  | 田中太郎 | 090-1111-2222 | 03-3333-4444
2  | 鈴木花子 | 080-5555-6666 | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 1NFに変換したテーブル</h2>
        <SqlEditor
          defaultCode={`-- 1NF準拠: 電話番号ごとに行を分ける
SELECT * FROM contacts ORDER BY contact_id, phone_type;`}
          setupSql={`CREATE TABLE contacts (
  contact_id INTEGER,
  name TEXT,
  phone_type TEXT,
  phone_number TEXT,
  PRIMARY KEY (contact_id, phone_type)
);
INSERT INTO contacts VALUES (1, '田中太郎', 'mobile', '090-1111-2222');
INSERT INTO contacts VALUES (1, '田中太郎', 'home',   '03-3333-4444');
INSERT INTO contacts VALUES (2, '鈴木花子', 'mobile', '080-5555-6666');`}
          expectedOutput={`contact_id | name     | phone_type | phone_number
-----------+----------+------------+--------------
1          | 田中太郎 | home       | 03-3333-4444
1          | 田中太郎 | mobile     | 090-1111-2222
2          | 鈴木花子 | mobile     | 080-5555-6666`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カンマ区切り値の分割クエリ</h2>
        <SqlEditor
          defaultCode={`-- カンマ区切りタグを持つ1NF違反テーブルから特定タグを検索
-- LIKEしか使えず非効率なのが問題
SELECT * FROM articles WHERE tags LIKE '%SQL%';`}
          setupSql={`CREATE TABLE articles (
  id INTEGER PRIMARY KEY,
  title TEXT,
  tags TEXT
);
INSERT INTO articles VALUES (1, 'SQL入門', 'SQL,データベース,初心者');
INSERT INTO articles VALUES (2, 'JOIN完全解説', 'SQL,JOIN,中級');
INSERT INTO articles VALUES (3, 'Pythonでデータ分析', 'Python,pandas');`}
          expectedOutput={`id | title       | tags
---+-------------+---------------------
1  | SQL入門     | SQL,データベース,初心者
2  | JOIN完全解説 | SQL,JOIN,中級`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="normalization" lessonId="first-nf" />
      </div>
      <LessonNav lessons={lessons} currentId="first-nf" basePath="/learn/normalization" />
    </div>
  );
}
