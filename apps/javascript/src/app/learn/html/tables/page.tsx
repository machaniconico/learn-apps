import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function TablesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テーブル</h1>
        <p className="text-gray-400">table、tr、td、thを使ってデータを表形式で表示しよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブルの基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTMLのテーブルは3つの要素で構成されます：
        </p>
        <ul className="space-y-2 text-gray-300 text-sm mb-4">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;table&gt;</code> - テーブル全体を囲む</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;tr&gt;</code> - 行（table row）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;td&gt;</code> - セル（table data）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;th&gt;</code> - 見出しセル（table header）太字＋中央揃え</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本のテーブル</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<table>
  <thead>
    <tr>
      <th>名前</th>
      <th>年齢</th>
      <th>職業</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>田中太郎</td>
      <td>28</td>
      <td>エンジニア</td>
    </tr>
    <tr>
      <td>佐藤花子</td>
      <td>32</td>
      <td>デザイナー</td>
    </tr>
    <tr>
      <td>鈴木一郎</td>
      <td>25</td>
      <td>マーケター</td>
    </tr>
  </tbody>
</table>`}
          defaultCss={`table {
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px 14px;
  text-align: left;
}
th {
  background-color: #6c5ce7;
  color: white;
}
tr:nth-child(even) {
  background-color: #f8f9fa;
}
tr:hover {
  background-color: #e9ecef;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セルの結合（colspan / rowspan）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">colspan</code>で横方向、
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">rowspan</code>で縦方向にセルを結合できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<table>
  <tr>
    <th colspan="3">2026年 売上レポート</th>
  </tr>
  <tr>
    <th>四半期</th>
    <th>国内</th>
    <th>海外</th>
  </tr>
  <tr>
    <td>Q1</td>
    <td>¥120万</td>
    <td>¥80万</td>
  </tr>
  <tr>
    <td>Q2</td>
    <td>¥150万</td>
    <td>¥95万</td>
  </tr>
  <tr>
    <td colspan="2" style="text-align:right; font-weight:bold;">合計</td>
    <td style="font-weight:bold;">¥445万</td>
  </tr>
</table>`}
          defaultCss={`table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
th {
  background: #2d3436;
  color: white;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <CodePlayground
          mode="all"
          defaultHtml={`<!-- 自分で時間割や成績表を作ってみよう -->
<table>
  <tr>
    <th>科目</th>
    <th>点数</th>
  </tr>
  <tr>
    <td>数学</td>
    <td>85</td>
  </tr>
</table>`}
          defaultCss={`table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 8px; }`}
        />
      </section>
      <LessonCompleteButton categoryId="html" lessonId="tables" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="tables" basePath="/learn/html" color="orange" />
    </div>
  );
}
