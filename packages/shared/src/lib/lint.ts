export interface LintMessage {
  line: number;
  col: number;
  length?: number;
  message: string;
  type: "error" | "warning";
}

export interface BracketCheckOptions {
  /** Line comment prefixes, default: ["//"] */
  lineCommentPrefixes?: string[];
  /** Block comment pairs, default: [["/*", "* /"]] (no space) */
  blockCommentPairs?: [string, string][];
}

export function checkBrackets(
  code: string,
  opts?: BracketCheckOptions,
): LintMessage[] {
  const commentPrefixes = opts?.lineCommentPrefixes ?? ["//"];
  const blockPairs = opts?.blockCommentPairs ?? [["/*", "*/"]];
  const messages: LintMessage[] = [];
  const stack: Array<{ char: string; line: number; col: number }> = [];
  const match: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const close: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const lines = code.split("\n");
  let inStr = false;
  let strCh = "";
  let inBlock = false;
  let blockClose = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let skip = false;

    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      const rest = line.slice(j);

      // block comment start
      if (!inStr && !skip && !inBlock) {
        for (const [op, cl] of blockPairs) {
          if (rest.startsWith(op)) {
            inBlock = true;
            blockClose = cl;
            j += op.length - 1;
            break;
          }
        }
        if (inBlock) continue;
      }

      // block comment end
      if (inBlock) {
        if (rest.startsWith(blockClose)) {
          inBlock = false;
          j += blockClose.length - 1;
        }
        continue;
      }

      // line comment
      if (!inStr && !skip) {
        for (const prefix of commentPrefixes) {
          if (rest.startsWith(prefix)) {
            skip = true;
            break;
          }
        }
        if (skip) break;
      }

      // strings
      const prev = j > 0 ? line[j - 1] : "";
      if (!inStr && (ch === '"' || ch === "'" || ch === "`") && prev !== "\\") {
        inStr = true;
        strCh = ch;
        continue;
      }
      if (inStr && ch === strCh && prev !== "\\") {
        inStr = false;
        continue;
      }
      if (inStr) continue;

      // brackets
      if (match[ch]) {
        stack.push({ char: ch, line: i + 1, col: j + 1 });
      } else if (close[ch]) {
        if (stack.length === 0) {
          messages.push({
            line: i + 1,
            col: j + 1,
            message: `対応する開き括弧がない「${ch}」があります`,
            type: "error",
          });
        } else {
          const top = stack[stack.length - 1];
          if (top.char !== close[ch]) {
            messages.push({
              line: i + 1,
              col: j + 1,
              message: `「${ch}」の対応が不正です（「${match[top.char]}」が期待されます）`,
              type: "error",
            });
            stack.pop();
          } else {
            stack.pop();
          }
        }
      }
    }
    // reset inStr at end of line for single-line strings only (not backtick)
    if (inStr && strCh !== "`") {
      inStr = false;
    }
  }

  for (const open of stack) {
    messages.push({
      line: open.line,
      col: open.col,
      message: `「${open.char}」が閉じられていません`,
      type: "error",
    });
  }

  return messages;
}

export function checkTypos(
  code: string,
  wordTypos: Record<string, string>,
  phraseTypos?: Record<string, string>,
): LintMessage[] {
  const messages: LintMessage[] = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("--") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*")
    )
      continue;

    // word typos
    const re = /\b[a-zA-Z_]\w*\b/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
      const w = m[0];
      if (wordTypos[w]) {
        messages.push({
          line: i + 1,
          col: m.index + 1,
          message: `「${w}」は「${wordTypos[w]}」の間違いではないですか？`,
          type: "warning",
        });
      }
    }

    // phrase typos
    if (phraseTypos) {
      for (const [typo, correct] of Object.entries(phraseTypos)) {
        let idx = line.indexOf(typo);
        while (idx >= 0) {
          messages.push({
            line: i + 1,
            col: idx + 1,
            message: `「${typo}」は「${correct}」の間違いではないですか？`,
            type: "warning",
          });
          idx = line.indexOf(typo, idx + typo.length);
        }
      }
    }
  }

  return messages;
}

/**
 * Check Ruby/Python-style block pairs where multiple openers share one closer.
 * e.g. openers = ["def", "class", "module", "do"], closer = "end"
 */
export function checkBlockPairs(
  code: string,
  openers: string[],
  closer: string,
  commentPrefix = "#",
): LintMessage[] {
  const messages: LintMessage[] = [];
  const lines = code.split("\n");
  const stack: Array<{ kw: string; line: number }> = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (trimmed.startsWith(commentPrefix)) continue;

    // strip string literals
    const cleaned = trimmed.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''");

    for (const op of openers) {
      const re = new RegExp(`\\b${op}\\b`, "g");
      let m: RegExpExecArray | null;
      while ((m = re.exec(cleaned)) !== null) {
        stack.push({ kw: op, line: i + 1 });
      }
    }

    const cre = new RegExp(`\\b${closer}\\b`, "g");
    let cm: RegExpExecArray | null;
    while ((cm = cre.exec(cleaned)) !== null) {
      if (stack.length > 0) {
        stack.pop();
      } else {
        messages.push({
          line: i + 1,
          col: cm.index + 1,
          message: `対応するブロック開始がない「${closer}」があります`,
          type: "error",
        });
      }
    }
  }

  for (const open of stack) {
    messages.push({
      line: open.line,
      col: 1,
      message: `「${open.kw}」に対応する「${closer}」がありません`,
      type: "error",
    });
  }

  return messages;
}

/**
 * Check for unclosed string literals at end of line.
 */
export function checkUnclosedStrings(
  code: string,
  opts?: { lineCommentPrefixes?: string[] },
): LintMessage[] {
  const commentPrefixes = opts?.lineCommentPrefixes ?? ["//"];
  const messages: LintMessage[] = [];
  const lines = code.split("\n");
  let inBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (inBlock) {
      if (line.includes("*/")) inBlock = false;
      continue;
    }
    const trimmed = line.trimStart();
    if (commentPrefixes.some((p) => trimmed.startsWith(p))) continue;
    if (trimmed.startsWith("/*")) {
      if (!trimmed.includes("*/")) inBlock = true;
      continue;
    }
    if (trimmed.startsWith("*")) continue;

    let inStr = false;
    let strCh = "";
    let strCol = 0;
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      const prev = j > 0 ? line[j - 1] : "";
      if (!inStr && commentPrefixes.some((p) => line.slice(j).startsWith(p)))
        break;
      if (!inStr && (ch === '"' || ch === "'") && prev !== "\\") {
        inStr = true;
        strCh = ch;
        strCol = j + 1;
      } else if (inStr && ch === strCh && prev !== "\\") {
        inStr = false;
      }
    }
    if (inStr) {
      messages.push({
        line: i + 1,
        col: strCol,
        length: line.length - strCol + 1,
        message: `文字列が閉じられていません（${strCh} が不足しています）`,
        type: "error",
      });
    }
  }
  return messages;
}

/**
 * Check for assignment (=) in if/while conditions where == was likely intended.
 */
export function checkConditionAssignment(
  code: string,
  opts?: { lineCommentPrefixes?: string[] },
): LintMessage[] {
  const commentPrefixes = opts?.lineCommentPrefixes ?? ["//"];
  const messages: LintMessage[] = [];
  const lines = code.split("\n");
  const condRe = /\b(if|while)\s*\(/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    if (commentPrefixes.some((p) => trimmed.startsWith(p))) continue;

    const condMatch = condRe.exec(line);
    if (!condMatch) continue;

    const start = condMatch.index + condMatch[0].length;
    let depth = 1;
    let content = "";
    const contentStart = start;
    for (let j = start; j < line.length && depth > 0; j++) {
      if (line[j] === "(") depth++;
      else if (line[j] === ")") {
        depth--;
        if (depth === 0) break;
      }
      content += line[j];
    }

    const eqRe = /(?<![!=<>])=(?!=)/g;
    let eqMatch: RegExpExecArray | null;
    while ((eqMatch = eqRe.exec(content)) !== null) {
      messages.push({
        line: i + 1,
        col: contentStart + eqMatch.index + 1,
        length: 1,
        message:
          "条件式の中で「=」（代入）が使われています。「==」（比較）の間違いではないですか？",
        type: "warning",
      });
    }
  }
  return messages;
}

/**
 * Check if code uses certain patterns but is missing required declarations.
 */
export function checkMissingPattern(
  code: string,
  checks: Array<{ usage: RegExp; required: RegExp; message: string }>,
): LintMessage[] {
  const messages: LintMessage[] = [];
  for (const check of checks) {
    if (check.usage.test(code) && !check.required.test(code)) {
      messages.push({
        line: 1,
        col: 1,
        message: check.message,
        type: "warning",
      });
    }
  }
  return messages;
}

/**
 * Check for missing semicolons on lines that look like statements.
 * Conservative: only flags obvious cases to avoid false positives.
 */
export function checkMissingSemicolons(
  code: string,
  opts?: {
    controlKeywords?: string[];
    lineCommentPrefixes?: string[];
    skipLinePatterns?: RegExp[];
  },
): LintMessage[] {
  const controlKW = new Set(
    opts?.controlKeywords ?? [
      "if", "else", "for", "while", "do", "switch", "case", "default",
      "try", "catch", "finally", "class", "struct", "enum", "namespace", "interface",
    ],
  );
  const commentPrefixes = opts?.lineCommentPrefixes ?? ["//"];
  const skipPatterns = opts?.skipLinePatterns ?? [];
  const messages: LintMessage[] = [];
  const lines = code.split("\n");
  let inBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimEnd();
    if (!trimmed || !trimmed.trim()) continue;
    const stripped = trimmed.trimStart();
    if (inBlock) {
      if (stripped.includes("*/")) inBlock = false;
      continue;
    }
    if (stripped.startsWith("/*")) {
      if (!stripped.includes("*/")) inBlock = true;
      continue;
    }
    if (commentPrefixes.some((p) => stripped.startsWith(p))) continue;
    if (stripped.startsWith("*")) continue;
    if (stripped.startsWith("#")) continue;
    if (/[{},;:]$/.test(trimmed)) continue;
    if (/^[{}]\s*$/.test(stripped)) continue;
    const firstWord = stripped.match(/^\w+/)?.[0];
    if (firstWord && controlKW.has(firstWord)) continue;
    if (skipPatterns.some((p) => p.test(stripped))) continue;

    if (/[)\w\d"']$/.test(trimmed)) {
      if (/\)\s*$/.test(trimmed) && /\b(function|fn|func|fun|def)\b/.test(stripped)) continue;
      if (/^\)$/.test(stripped)) continue;
      if (/^@/.test(stripped)) continue;
      if (/^(import|package)\s/.test(stripped)) continue;

      messages.push({
        line: i + 1,
        col: trimmed.length + 1,
        length: 1,
        message: "セミコロン「;」が不足している可能性があります",
        type: "warning",
      });
    }
  }
  return messages;
}
