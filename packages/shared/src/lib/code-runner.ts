const PISTON_API = "https://emkc.org/api/v2/piston/execute";

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  compilationError?: string;
}

const LANGUAGE_MAP: Record<string, { language: string; filename: string }> = {
  php: { language: "php", filename: "main.php" },
  c: { language: "c", filename: "main.c" },
  cpp: { language: "c++", filename: "main.cpp" },
  csharp: { language: "csharp", filename: "Main.cs" },
  java: { language: "java", filename: "Main.java" },
  go: { language: "go", filename: "main.go" },
  ruby: { language: "ruby", filename: "main.rb" },
  kotlin: { language: "kotlin", filename: "main.kt" },
  swift: { language: "swift", filename: "main.swift" },
  dart: { language: "dart", filename: "main.dart" },
  sql: { language: "sqlite3", filename: "main.sql" },
};

export async function executeCode(
  lang: string,
  code: string,
): Promise<ExecutionResult> {
  const config = LANGUAGE_MAP[lang];
  if (!config) {
    throw new Error(`未対応の言語: ${lang}`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(PISTON_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: config.language,
        version: "*",
        files: [{ name: config.filename, content: code }],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }

    const data = await response.json();

    if (data.compile && data.compile.code !== 0) {
      return {
        stdout: "",
        stderr: data.compile.stderr || data.compile.output || "",
        exitCode: data.compile.code,
        compilationError:
          data.compile.stderr || data.compile.output || "コンパイルエラー",
      };
    }

    return {
      stdout: data.run?.stdout || "",
      stderr: data.run?.stderr || "",
      exitCode: data.run?.code ?? 0,
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("実行がタイムアウトしました（15秒）");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
