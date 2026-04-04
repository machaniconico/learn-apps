import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("jpa");

export default function RelationshipsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">JPA・データベース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リレーション</h1>
        <p className="text-gray-400">@OneToMany、@ManyToOne、@ManyToMany、@JoinColumn、cascade</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エンティティ間のリレーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JPAではアノテーションでテーブル間の関連を定義します。
          <code className="text-orange-300">@OneToMany</code> / <code className="text-orange-300">@ManyToOne</code> で
          1対多の関係、<code className="text-orange-300">@ManyToMany</code> で多対多の関係を表現します。
          <code className="text-orange-300">cascade</code> で関連エンティティの連鎖操作を制御します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@OneToMany</code> - 1対多（親側。例: 部署 → 社員）</li>
          <li><code>@ManyToOne</code> - 多対1（子側。例: 社員 → 部署）</li>
          <li><code>@ManyToMany</code> - 多対多（例: 学生 ↔ 講座）</li>
          <li><code>@JoinColumn</code> - 外部キーカラムを指定</li>
          <li><code>cascade = CascadeType.ALL</code> - 親の操作を子に連鎖</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@OneToMany / @ManyToOne（1対多）</h2>
        <p className="text-gray-400 mb-4">
          部署と社員の関係のように、1つの親エンティティが複数の子エンティティを持つパターンです。
          双方向の関連では <code className="text-orange-300">mappedBy</code> で関連の所有側を指定します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // @Entity - 部署（親側）
    static class Department {
        int id;
        String name;
        // @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
        List<Employee> employees = new ArrayList<>();

        Department(int id, String name) { this.id = id; this.name = name; }

        void addEmployee(Employee emp) {
            employees.add(emp);
            emp.department = this;
        }
    }

    // @Entity - 社員（子側）
    static class Employee {
        int id;
        String name;
        // @ManyToOne
        // @JoinColumn(name = "department_id")
        Department department;

        Employee(int id, String name) { this.id = id; this.name = name; }
    }

    public static void main(String[] args) {
        System.out.println("=== @OneToMany / @ManyToOne ===\\n");

        // エンティティ作成
        Department dev = new Department(1, "開発部");
        Department sales = new Department(2, "営業部");

        dev.addEmployee(new Employee(1, "Alice"));
        dev.addEmployee(new Employee(2, "Bob"));
        dev.addEmployee(new Employee(3, "Charlie"));
        sales.addEmployee(new Employee(4, "Diana"));

        // 親 -> 子（OneToMany）
        System.out.println("[部署 -> 社員] OneToMany:");
        for (Department dept : List.of(dev, sales)) {
            System.out.println("  " + dept.name + ":");
            dept.employees.forEach(e ->
                System.out.println("    - " + e.name));
        }

        // 子 -> 親（ManyToOne）
        System.out.println("\\n[社員 -> 部署] ManyToOne:");
        for (Employee emp : dev.employees) {
            System.out.println("  " + emp.name + " -> " + emp.department.name);
        }

        System.out.println("\\n// Hibernate SQL:");
        System.out.println("SELECT * FROM employee WHERE department_id = 1");
    }
}`}
          expectedOutput={`=== @OneToMany / @ManyToOne ===

[部署 -> 社員] OneToMany:
  開発部:
    - Alice
    - Bob
    - Charlie
  営業部:
    - Diana

[社員 -> 部署] ManyToOne:
  Alice -> 開発部
  Bob -> 開発部
  Charlie -> 開発部

// Hibernate SQL:
SELECT * FROM employee WHERE department_id = 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@ManyToMany（多対多）</h2>
        <p className="text-gray-400 mb-4">
          学生と講座のように、双方が複数の相手を持つ関係です。
          JPAは中間テーブルを自動生成します。<code className="text-orange-300">@JoinTable</code> でテーブル名を指定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // @Entity
    static class Student {
        int id;
        String name;
        // @ManyToMany
        // @JoinTable(name = "student_course",
        //   joinColumns = @JoinColumn(name = "student_id"),
        //   inverseJoinColumns = @JoinColumn(name = "course_id"))
        List<Course> courses = new ArrayList<>();

        Student(int id, String name) { this.id = id; this.name = name; }
    }

    // @Entity
    static class Course {
        int id;
        String name;
        // @ManyToMany(mappedBy = "courses")
        List<Student> students = new ArrayList<>();

        Course(int id, String name) { this.id = id; this.name = name; }
    }

    static void enroll(Student student, Course course) {
        student.courses.add(course);
        course.students.add(student);
    }

    public static void main(String[] args) {
        System.out.println("=== @ManyToMany ===\\n");

        Student s1 = new Student(1, "田中");
        Student s2 = new Student(2, "鈴木");
        Student s3 = new Student(3, "佐藤");

        Course c1 = new Course(1, "Java入門");
        Course c2 = new Course(2, "Spring Boot");
        Course c3 = new Course(3, "データベース");

        enroll(s1, c1); enroll(s1, c2);
        enroll(s2, c1); enroll(s2, c3);
        enroll(s3, c2); enroll(s3, c3);

        System.out.println("[学生 -> 講座]:");
        for (Student s : List.of(s1, s2, s3)) {
            List<String> courseNames = s.courses.stream()
                .map(c -> c.name).toList();
            System.out.println("  " + s.name + " -> " + courseNames);
        }

        System.out.println("\\n[講座 -> 学生]:");
        for (Course c : List.of(c1, c2, c3)) {
            List<String> studentNames = c.students.stream()
                .map(s -> s.name).toList();
            System.out.println("  " + c.name + " -> " + studentNames);
        }

        System.out.println("\\n// 中間テーブル student_course:");
        System.out.println("| student_id | course_id |");
        System.out.println("|------------|-----------|");
        System.out.println("| 1          | 1         |");
        System.out.println("| 1          | 2         |");
        System.out.println("| 2          | 1         |");
        System.out.println("| 2          | 3         |");
        System.out.println("| 3          | 2         |");
        System.out.println("| 3          | 3         |");
    }
}`}
          expectedOutput={`=== @ManyToMany ===

[学生 -> 講座]:
  田中 -> [Java入門, Spring Boot]
  鈴木 -> [Java入門, データベース]
  佐藤 -> [Spring Boot, データベース]

[講座 -> 学生]:
  Java入門 -> [田中, 鈴木]
  Spring Boot -> [田中, 佐藤]
  データベース -> [鈴木, 佐藤]

// 中間テーブル student_course:
| student_id | course_id |
|------------|-----------|
| 1          | 1         |
| 1          | 2         |
| 2          | 1         |
| 2          | 3         |
| 3          | 2         |
| 3          | 3         |`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="jpa" lessonId="relationships" />
      </div>
      <LessonNav lessons={lessons} currentId="relationships" basePath="/learn/jpa" />
    </div>
  );
}
