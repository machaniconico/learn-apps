import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-boot");

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring Boot レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーハンドリング</h1>
        <p className="text-gray-400">@ExceptionHandler、@ControllerAdvice、ResponseEntityExceptionHandler</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Springのエラーハンドリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Bootでは <code className="text-orange-300">@ExceptionHandler</code> で例外をキャッチし、
          <code className="text-orange-300">@ControllerAdvice</code> でアプリケーション全体のエラー処理を一元化できます。
          <code className="text-orange-300">ResponseEntityExceptionHandler</code> を継承すると、
          Spring MVCの標準例外も統一的に処理できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>@ExceptionHandler</code> - 特定の例外をキャッチするメソッドを定義</li>
          <li><code>@ControllerAdvice</code> - 全コントローラに共通のエラー処理を適用</li>
          <li><code>ResponseEntityExceptionHandler</code> - Spring標準例外のハンドリング基盤</li>
          <li>カスタム例外クラスで業務エラーを表現</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@ExceptionHandlerとカスタム例外</h2>
        <p className="text-gray-400 mb-4">
          業務ロジックに応じたカスタム例外を定義し、
          <code className="text-orange-300">@ExceptionHandler</code> で適切なHTTPレスポンスに変換します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.time.*;

public class Main {

    // カスタム例外
    static class ResourceNotFoundException extends RuntimeException {
        ResourceNotFoundException(String resource, int id) {
            super(resource + " (id=" + id + ") が見つかりません");
        }
    }

    static class BusinessException extends RuntimeException {
        BusinessException(String message) { super(message); }
    }

    // エラーレスポンス用DTO
    record ErrorResponse(int status, String error, String message, String timestamp) {}

    // @ExceptionHandler を擬似的に再現
    static void handleException(Exception ex) {
        String timestamp = LocalDateTime.now().toString().substring(0, 19);
        ErrorResponse response;

        if (ex instanceof ResourceNotFoundException) {
            response = new ErrorResponse(404, "Not Found", ex.getMessage(), timestamp);
        } else if (ex instanceof BusinessException) {
            response = new ErrorResponse(400, "Bad Request", ex.getMessage(), timestamp);
        } else {
            response = new ErrorResponse(500, "Internal Server Error",
                "予期しないエラーが発生しました", timestamp);
        }

        System.out.println("  Status: " + response.status() + " " + response.error());
        System.out.println("  Message: " + response.message());
    }

    // サービス層
    static Map<Integer, String> users = Map.of(1, "Alice", 2, "Bob");

    static String findUser(int id) {
        String user = users.get(id);
        if (user == null) throw new ResourceNotFoundException("User", id);
        return user;
    }

    public static void main(String[] args) {
        System.out.println("=== @ExceptionHandler ===");

        System.out.println("\\nGET /api/users/1:");
        try {
            System.out.println("  Response: " + findUser(1));
        } catch (Exception e) { handleException(e); }

        System.out.println("\\nGET /api/users/99:");
        try {
            findUser(99);
        } catch (Exception e) { handleException(e); }

        System.out.println("\\nPOST /api/orders (在庫不足):");
        try {
            throw new BusinessException("在庫が不足しています");
        } catch (Exception e) { handleException(e); }
    }
}`}
          expectedOutput={`=== @ExceptionHandler ===

GET /api/users/1:
  Response: Alice

GET /api/users/99:
  Status: 404 Not Found
  Message: User (id=99) が見つかりません

POST /api/orders (在庫不足):
  Status: 400 Bad Request
  Message: 在庫が不足しています`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">@ControllerAdviceによるグローバルエラー処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">@ControllerAdvice</code> を使うと、全コントローラに共通の
          エラーハンドリングロジックを適用できます。コントローラごとに例外処理を書く必要がなくなります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // カスタム例外
    static class NotFoundException extends RuntimeException {
        final String resource;
        NotFoundException(String resource) {
            super(resource + "が見つかりません");
            this.resource = resource;
        }
    }

    static class UnauthorizedException extends RuntimeException {
        UnauthorizedException() { super("認証が必要です"); }
    }

    // @ControllerAdvice - グローバルエラーハンドラ
    static class GlobalExceptionHandler {
        // @ExceptionHandler(NotFoundException.class)
        static void handleNotFound(NotFoundException ex) {
            System.out.println("  -> 404: " + ex.getMessage());
        }

        // @ExceptionHandler(UnauthorizedException.class)
        static void handleUnauthorized(UnauthorizedException ex) {
            System.out.println("  -> 401: " + ex.getMessage());
        }

        // @ExceptionHandler(Exception.class) - 最後の砦
        static void handleGeneral(Exception ex) {
            System.out.println("  -> 500: " + ex.getMessage());
        }

        static void handle(Exception ex) {
            if (ex instanceof NotFoundException nfe) handleNotFound(nfe);
            else if (ex instanceof UnauthorizedException ue) handleUnauthorized(ue);
            else handleGeneral(ex);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== @ControllerAdvice グローバルエラー処理 ===");

        List<Exception> exceptions = List.of(
            new NotFoundException("商品"),
            new UnauthorizedException(),
            new NotFoundException("ユーザー"),
            new RuntimeException("DB接続エラー")
        );

        String[] endpoints = {
            "GET /api/products/99",
            "GET /api/admin/dashboard",
            "DELETE /api/users/999",
            "POST /api/data"
        };

        for (int i = 0; i < exceptions.size(); i++) {
            System.out.println("\\n" + endpoints[i] + ":");
            GlobalExceptionHandler.handle(exceptions.get(i));
        }
    }
}`}
          expectedOutput={`=== @ControllerAdvice グローバルエラー処理 ===

GET /api/products/99:
  -> 404: 商品が見つかりません

GET /api/admin/dashboard:
  -> 401: 認証が必要です

DELETE /api/users/999:
  -> 404: ユーザーが見つかりません

POST /api/data:
  -> 500: DB接続エラー`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-boot" lessonId="error-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="error-handling" basePath="/learn/spring-boot" />
    </div>
  );
}
