import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("spring-mvc");

export default function FileUploadPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Spring MVC レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルアップロード</h1>
        <p className="text-gray-400">MultipartFile、@RequestPart、ストレージ設定</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイルアップロードの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Spring Bootでは <code className="text-orange-300">MultipartFile</code> インターフェースを使って
          アップロードされたファイルを受け取ります。
          <code className="text-orange-300">@RequestPart</code> や <code className="text-orange-300">@RequestParam</code> で
          マルチパートリクエストのファイルを取得し、サーバーに保存します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>MultipartFile</code> - アップロードファイルのインターフェース</li>
          <li><code>@RequestParam("file")</code> - フォームのファイルフィールドを受け取る</li>
          <li><code>@RequestPart</code> - マルチパートのパーツを個別に受け取る</li>
          <li><code>spring.servlet.multipart.max-file-size</code> - ファイルサイズ上限設定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルアップロード処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">MultipartFile</code> からファイル情報を取得し、
          ストレージに保存するコントローラの実装パターンです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    // MultipartFile の擬似実装
    static class MultipartFile {
        String originalFilename;
        String contentType;
        long size;

        MultipartFile(String name, String type, long size) {
            this.originalFilename = name;
            this.contentType = type;
            this.size = size;
        }

        boolean isEmpty() { return size == 0; }

        String getOriginalFilename() { return originalFilename; }
        String getContentType() { return contentType; }
        long getSize() { return size; }
    }

    // @RestController
    static class FileController {

        static final long MAX_SIZE = 10 * 1024 * 1024; // 10MB
        static final Set<String> ALLOWED_TYPES =
            Set.of("image/jpeg", "image/png", "application/pdf");

        // @PostMapping("/api/upload")
        static void upload(MultipartFile file) {
            System.out.println("  ファイル名: " + file.getOriginalFilename());
            System.out.println("  Content-Type: " + file.getContentType());
            System.out.println("  サイズ: " + formatSize(file.getSize()));

            // バリデーション
            if (file.isEmpty()) {
                System.out.println("  -> 400: ファイルが空です");
                return;
            }
            if (file.getSize() > MAX_SIZE) {
                System.out.println("  -> 400: ファイルサイズが上限を超えています");
                return;
            }
            if (!ALLOWED_TYPES.contains(file.getContentType())) {
                System.out.println("  -> 400: 許可されていないファイル形式です");
                return;
            }

            // 保存処理
            String savedPath = "/uploads/" + UUID.randomUUID().toString().substring(0, 8)
                + "_" + file.getOriginalFilename();
            System.out.println("  保存先: " + savedPath);
            System.out.println("  -> 200: アップロード成功");
        }

        static String formatSize(long bytes) {
            if (bytes < 1024) return bytes + " B";
            if (bytes < 1024 * 1024) return (bytes / 1024) + " KB";
            return String.format("%.1f MB", bytes / (1024.0 * 1024.0));
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ファイルアップロード ===");

        System.out.println("\\nPOST /api/upload (画像):");
        FileController.upload(
            new MultipartFile("photo.jpg", "image/jpeg", 2_500_000));

        System.out.println("\\nPOST /api/upload (大きすぎるファイル):");
        FileController.upload(
            new MultipartFile("huge.zip", "application/zip", 50_000_000));

        System.out.println("\\nPOST /api/upload (不正な形式):");
        FileController.upload(
            new MultipartFile("script.exe", "application/x-executable", 1000));
    }
}`}
          expectedOutput={`=== ファイルアップロード ===

POST /api/upload (画像):
  ファイル名: photo.jpg
  Content-Type: image/jpeg
  サイズ: 2441 KB
  保存先: /uploads/xxxxxxxx_photo.jpg
  -> 200: アップロード成功

POST /api/upload (大きすぎるファイル):
  ファイル名: huge.zip
  Content-Type: application/zip
  サイズ: 47.7 MB
  -> 400: ファイルサイズが上限を超えています

POST /api/upload (不正な形式):
  ファイル名: script.exe
  Content-Type: application/x-executable
  サイズ: 1000 B
  -> 400: 許可されていないファイル形式です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数ファイルと設定</h2>
        <p className="text-gray-400 mb-4">
          複数ファイルの同時アップロードと、application.propertiesでのストレージ設定を確認します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {

    record UploadResult(String filename, String status) {}

    // @PostMapping("/api/upload/multiple")
    // uploadMultiple(@RequestParam("files") List<MultipartFile> files)
    static List<UploadResult> uploadMultiple(List<String> filenames) {
        List<UploadResult> results = new ArrayList<>();
        for (String name : filenames) {
            results.add(new UploadResult(name, "成功"));
        }
        return results;
    }

    public static void main(String[] args) {
        System.out.println("=== 複数ファイルアップロード ===\\n");

        // application.properties の設定
        System.out.println("# application.properties");
        System.out.println("spring.servlet.multipart.enabled=true");
        System.out.println("spring.servlet.multipart.max-file-size=10MB");
        System.out.println("spring.servlet.multipart.max-request-size=50MB");
        System.out.println("app.upload.dir=/var/uploads");

        System.out.println("\\nPOST /api/upload/multiple:");
        List<String> files = List.of("doc1.pdf", "image.png", "data.csv");
        List<UploadResult> results = uploadMultiple(files);

        System.out.println("\\nAPI応答 (200 OK):");
        results.forEach(r ->
            System.out.println("  " + r.filename() + " -> " + r.status()));
        System.out.println("  合計: " + results.size() + "ファイル");
    }
}`}
          expectedOutput={`=== 複数ファイルアップロード ===

# application.properties
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB
app.upload.dir=/var/uploads

POST /api/upload/multiple:

API応答 (200 OK):
  doc1.pdf -> 成功
  image.png -> 成功
  data.csv -> 成功
  合計: 3ファイル`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spring-mvc" lessonId="file-upload" />
      </div>
      <LessonNav lessons={lessons} currentId="file-upload" basePath="/learn/spring-mvc" />
    </div>
  );
}
