import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ジェネリクス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクスパターン</h1>
        <p className="text-gray-400">実践的なジェネリクスの設計パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実践的なジェネリクス設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリクスを活用した設計パターンは、実務で広く使われています。
          DAO（Data Access Object）パターンや Repository パターン、
          汎用的な Service クラスなどがその代表例です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>DAO/Repository パターン: CRUD操作を型安全に共通化</li>
          <li>{"Service<T>"}: ビジネスロジックの共通基盤</li>
          <li>{"Result<T>"}: 処理結果を成功/失敗で表現</li>
          <li>Builder パターンとジェネリクスの組み合わせ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Repositoryパターン</h2>
        <p className="text-gray-400 mb-4">
          CRUD操作を共通化した汎用 Repository インターフェースです。
          どのエンティティでも同じインターフェースで操作できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    // 汎用Repositoryインターフェース
    interface Repository<T, ID> {
        void save(ID id, T entity);
        T findById(ID id);
        List<T> findAll();
        void deleteById(ID id);
    }

    // インメモリ実装
    static class InMemoryRepository<T> implements Repository<T, String> {
        private Map<String, T> store = new LinkedHashMap<>();

        public void save(String id, T entity) { store.put(id, entity); }
        public T findById(String id) { return store.get(id); }
        public List<T> findAll() { return new ArrayList<>(store.values()); }
        public void deleteById(String id) { store.remove(id); }
    }

    public static void main(String[] args) {
        // String用Repository
        InMemoryRepository<String> userRepo = new InMemoryRepository<>();
        userRepo.save("u1", "田中太郎");
        userRepo.save("u2", "鈴木花子");
        userRepo.save("u3", "佐藤次郎");

        System.out.println("ID=u1: " + userRepo.findById("u1"));
        System.out.println("全件: " + userRepo.findAll());

        userRepo.deleteById("u2");
        System.out.println("削除後: " + userRepo.findAll());
    }
}`}
          expectedOutput={`ID=u1: 田中太郎
全件: [田中太郎, 鈴木花子, 佐藤次郎]
削除後: [田中太郎, 佐藤次郎]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">{"Result<T>パターン"}</h2>
        <p className="text-gray-400 mb-4">
          処理結果を成功/失敗で表現する <code className="text-orange-300">{"Result<T>"}</code> パターンです。
          例外を使わずにエラーハンドリングを行う関数型スタイルの設計です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Result<T> {
        private final T value;
        private final String error;
        private final boolean success;

        private Result(T value, String error, boolean success) {
            this.value = value;
            this.error = error;
            this.success = success;
        }

        public static <T> Result<T> ok(T value) {
            return new Result<>(value, null, true);
        }

        public static <T> Result<T> fail(String error) {
            return new Result<>(null, error, false);
        }

        public boolean isSuccess() { return success; }
        public T getValue() { return value; }
        public String getError() { return error; }
    }

    static Result<Integer> divide(int a, int b) {
        if (b == 0) return Result.fail("ゼロで割れません");
        return Result.ok(a / b);
    }

    static Result<Integer> parseInt(String s) {
        try {
            return Result.ok(Integer.parseInt(s));
        } catch (NumberFormatException e) {
            return Result.fail("数値に変換できません: " + s);
        }
    }

    public static void main(String[] args) {
        Result<Integer> r1 = divide(10, 3);
        System.out.println("10/3 成功? " + r1.isSuccess() + " 値: " + r1.getValue());

        Result<Integer> r2 = divide(10, 0);
        System.out.println("10/0 成功? " + r2.isSuccess() + " エラー: " + r2.getError());

        Result<Integer> r3 = parseInt("42");
        System.out.println("parse '42' 成功? " + r3.isSuccess() + " 値: " + r3.getValue());

        Result<Integer> r4 = parseInt("abc");
        System.out.println("parse 'abc' 成功? " + r4.isSuccess() + " エラー: " + r4.getError());
    }
}`}
          expectedOutput={`10/3 成功? true 値: 3
10/0 成功? false エラー: ゼロで割れません
parse '42' 成功? true 値: 42
parse 'abc' 成功? false エラー: 数値に変換できません: abc`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">{"Service<T>パターン"}</h2>
        <p className="text-gray-400 mb-4">
          共通のビジネスロジックを基底クラスにまとめ、
          エンティティごとにサービスクラスを作成するパターンです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    // 汎用サービス基底クラス
    static abstract class BaseService<T> {
        protected Map<String, T> data = new LinkedHashMap<>();

        public void add(String id, T item) {
            data.put(id, item);
            System.out.println("[" + getEntityName() + "] 追加: " + item);
        }

        public List<T> getAll() {
            return new ArrayList<>(data.values());
        }

        public int count() {
            return data.size();
        }

        protected abstract String getEntityName();
    }

    // 具体的なサービス
    static class ProductService extends BaseService<String> {
        protected String getEntityName() { return "商品"; }
    }

    static class OrderService extends BaseService<Integer> {
        protected String getEntityName() { return "注文"; }
    }

    public static void main(String[] args) {
        ProductService products = new ProductService();
        products.add("p1", "ノートPC");
        products.add("p2", "マウス");

        OrderService orders = new OrderService();
        orders.add("o1", 1500);
        orders.add("o2", 300);

        System.out.println("商品一覧: " + products.getAll());
        System.out.println("商品数: " + products.count());
        System.out.println("注文一覧: " + orders.getAll());
    }
}`}
          expectedOutput={`[商品] 追加: ノートPC
[商品] 追加: マウス
[注文] 追加: 1500
[注文] 追加: 300
商品一覧: [ノートPC, マウス]
商品数: 2
注文一覧: [1500, 300]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="generic-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-patterns" basePath="/learn/generics" />
    </div>
  );
}
