import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function CustomExceptionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">カスタム例外</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">カスタム例外クラス</strong>を作成すると、アプリケーション固有のエラーを表現できます。
            Exceptionクラスを継承し、独自のプロパティやメソッドを追加することで、
            エラーの種類を明確に分類し、詳細な情報を持たせることができます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカスタム例外</h2>
        <p className="text-gray-400 mb-4">
          Exceptionを継承してカスタム例外クラスを作成します。独自のメッセージやプロパティを持たせられます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass DatabaseException extends RuntimeException {\n    private string $query;\n\n    public function __construct(string $message, string $query = '', int $code = 0) {\n        parent::__construct($message, $code);\n        $this->query = $query;\n    }\n\n    public function getQuery(): string {\n        return $this->query;\n    }\n}\n\nfunction executeQuery(string $sql): void {\n    if (str_contains($sql, 'DROP')) {\n        throw new DatabaseException(\n            "危険なクエリが検出されました",\n            $sql,\n            403\n        );\n    }\n    echo "クエリ実行: {$sql}\\n";\n}\n\ntry {\n    executeQuery("SELECT * FROM users");\n    executeQuery("DROP TABLE users");\n} catch (DatabaseException $e) {\n    echo "DBエラー [{$e->getCode()}]: {$e->getMessage()}\\n";\n    echo "クエリ: {$e->getQuery()}";\n}`}
          expectedOutput={`クエリ実行: SELECT * FROM users\nDBエラー [403]: 危険なクエリが検出されました\nクエリ: DROP TABLE users`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外クラスの階層設計</h2>
        <p className="text-gray-400 mb-4">
          アプリケーションの基底例外クラスを作り、そこから具体的な例外クラスを派生させる設計が一般的です。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// 基底例外\nclass AppException extends RuntimeException {}\n\n// 具体的な例外クラス\nclass NotFoundException extends AppException {\n    public function __construct(string $resource, int $id) {\n        parent::__construct("{$resource} (ID: {$id}) が見つかりません", 404);\n    }\n}\n\nclass UnauthorizedException extends AppException {\n    public function __construct() {\n        parent::__construct("認証が必要です", 401);\n    }\n}\n\nclass ValidationException extends AppException {\n    private array $errors;\n\n    public function __construct(array $errors) {\n        parent::__construct("バリデーションエラー", 422);\n        $this->errors = $errors;\n    }\n\n    public function getErrors(): array {\n        return $this->errors;\n    }\n}\n\n// すべてAppExceptionとしてキャッチ可能\n$exceptions = [\n    new NotFoundException("User", 42),\n    new UnauthorizedException(),\n    new ValidationException(["名前は必須", "メールが無効"]),\n];\n\nforeach ($exceptions as $e) {\n    echo "[{$e->getCode()}] " . get_class($e) . ": {$e->getMessage()}\\n";\n}`}
          expectedOutput={`[404] NotFoundException: User (ID: 42) が見つかりません\n[401] UnauthorizedException: 認証が必要です\n[422] ValidationException: バリデーションエラー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外の再スロー</h2>
        <p className="text-gray-400 mb-4">
          catchブロックで例外を処理した後、さらに上位に再スローすることもできます。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass PaymentException extends RuntimeException {}\n\nfunction chargeCard(float $amount): void {\n    if ($amount <= 0) {\n        throw new InvalidArgumentException("金額は正の値でなければなりません");\n    }\n    if ($amount > 100000) {\n        throw new RangeException("1回の決済上限を超えています");\n    }\n    echo "決済完了: {$amount}円\\n";\n}\n\nfunction processPayment(float $amount): void {\n    try {\n        chargeCard($amount);\n    } catch (InvalidArgumentException | RangeException $e) {\n        // ログに記録してからPaymentExceptionとして再スロー\n        echo "ログ記録: " . $e->getMessage() . "\\n";\n        throw new PaymentException("決済処理に失敗しました", 0, $e);\n    }\n}\n\ntry {\n    processPayment(5000);\n    processPayment(-100);\n} catch (PaymentException $e) {\n    echo "決済エラー: " . $e->getMessage() . "\\n";\n    echo "原因: " . $e->getPrevious()->getMessage();\n}`}
          expectedOutput={`決済完了: 5000円\nログ記録: 金額は正の値でなければなりません\n決済エラー: 決済処理に失敗しました\n原因: 金額は正の値でなければなりません`}
        />
      </section>

      <LessonCompleteButton lessonId="custom-exceptions" categoryId="error" />
      <LessonNav lessons={lessons} currentId="custom-exceptions" basePath="/learn/error" />
    </div>
  );
}
