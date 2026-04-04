import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function CustomExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタム例外</h1>
        <p className="text-gray-400">Exceptionを継承した独自の例外クラスの作成方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          標準の例外クラスだけでは表現しきれないビジネスロジックのエラーに対して、
          独自の例外クラスを作成します。
          <code className="text-orange-300">Exception</code> を継承すれば検査例外、
          <code className="text-orange-300">RuntimeException</code> を継承すれば非検査例外になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>class MyException extends Exception</code> - 検査例外</li>
          <li><code>class MyException extends RuntimeException</code> - 非検査例外</li>
          <li>メッセージとcauseを受け取るコンストラクタを用意する</li>
          <li>追加のフィールドで詳細情報を持たせることもできる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカスタム例外</h2>
        <p className="text-gray-400 mb-4">
          ビジネスルールに違反した場合に投げるカスタム例外を作成します。
        </p>
        <JavaEditor
          defaultCode={`// カスタム非検査例外
class InsufficientFundsException extends RuntimeException {
    private double balance;
    private double amount;

    InsufficientFundsException(double balance, double amount) {
        super("残高不足: 残高=" + balance + ", 引き出し額=" + amount);
        this.balance = balance;
        this.amount = amount;
    }

    double getBalance() { return balance; }
    double getAmount() { return amount; }
    double getShortage() { return amount - balance; }
}

class BankAccount {
    private String owner;
    private double balance;

    BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        balance -= amount;
        System.out.println(owner + ": " + amount + "円を引き出し (残高: " + balance + "円)");
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("太郎", 10000);
        account.withdraw(3000);

        try {
            account.withdraw(9000);
        } catch (InsufficientFundsException e) {
            System.out.println("エラー: " + e.getMessage());
            System.out.println("不足額: " + e.getShortage() + "円");
        }
    }
}`}
          expectedOutput={`太郎: 3000.0円を引き出し (残高: 7000.0円)
エラー: 残高不足: 残高=7000.0, 引き出し額=9000.0
不足額: 2000.0円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーコード付きカスタム例外</h2>
        <p className="text-gray-400 mb-4">
          APIレスポンスなどで使えるように、エラーコードを持つカスタム例外を作成します。
        </p>
        <JavaEditor
          defaultCode={`// エラーコード付きカスタム例外
class AppException extends RuntimeException {
    enum ErrorCode {
        USER_NOT_FOUND("E001", "ユーザーが見つかりません"),
        INVALID_INPUT("E002", "入力が不正です"),
        PERMISSION_DENIED("E003", "権限がありません");

        final String code;
        final String description;
        ErrorCode(String code, String description) {
            this.code = code;
            this.description = description;
        }
    }

    private ErrorCode errorCode;

    AppException(ErrorCode errorCode, String detail) {
        super("[" + errorCode.code + "] " + errorCode.description + ": " + detail);
        this.errorCode = errorCode;
    }

    ErrorCode getErrorCode() { return errorCode; }
}

public class Main {
    static String findUser(String id) {
        if (id == null || id.isEmpty()) {
            throw new AppException(AppException.ErrorCode.INVALID_INPUT, "IDが空です");
        }
        if (!"U001".equals(id)) {
            throw new AppException(AppException.ErrorCode.USER_NOT_FOUND, "ID=" + id);
        }
        return "Alice";
    }

    public static void main(String[] args) {
        try {
            System.out.println("ユーザー: " + findUser("U001"));
        } catch (AppException e) {
            System.out.println(e.getMessage());
        }

        try {
            findUser("U999");
        } catch (AppException e) {
            System.out.println(e.getMessage());
            System.out.println("コード: " + e.getErrorCode().code);
        }

        try {
            findUser("");
        } catch (AppException e) {
            System.out.println(e.getMessage());
        }
    }
}`}
          expectedOutput={`ユーザー: Alice
[E001] ユーザーが見つかりません: ID=U999
コード: E001
[E002] 入力が不正です: IDが空です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の継承階層を設計する</h2>
        <p className="text-gray-400 mb-4">
          アプリケーション全体で統一した例外階層を設計し、
          呼び出し元で適切な粒度でキャッチできるようにします。
        </p>
        <JavaEditor
          defaultCode={`// 基底例外クラス
class ServiceException extends RuntimeException {
    ServiceException(String msg) { super(msg); }
    ServiceException(String msg, Throwable cause) { super(msg, cause); }
}

// 具体的な例外クラス
class ValidationException extends ServiceException {
    ValidationException(String field, String reason) {
        super("バリデーションエラー [" + field + "]: " + reason);
    }
}

class NotFoundException extends ServiceException {
    NotFoundException(String entity, String id) {
        super(entity + "が見つかりません (id=" + id + ")");
    }
}

class AuthException extends ServiceException {
    AuthException(String reason) {
        super("認証エラー: " + reason);
    }
}

public class Main {
    static void process(int scenario) {
        switch (scenario) {
            case 1 -> throw new ValidationException("email", "形式が不正です");
            case 2 -> throw new NotFoundException("ユーザー", "U999");
            case 3 -> throw new AuthException("トークンが期限切れです");
        }
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            try {
                process(i);
            } catch (ValidationException e) {
                System.out.println("[検証] " + e.getMessage());
            } catch (NotFoundException e) {
                System.out.println("[404] " + e.getMessage());
            } catch (ServiceException e) {
                // その他のServiceException（AuthExceptionなど）
                System.out.println("[サービス] " + e.getMessage());
            }
        }
    }
}`}
          expectedOutput={`[検証] バリデーションエラー [email]: 形式が不正です
[404] ユーザーが見つかりません (id=U999)
[サービス] 認証エラー: トークンが期限切れです`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="custom-exceptions" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-exceptions" basePath="/learn/exceptions" />
    </div>
  );
}
