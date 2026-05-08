import { linter, lintGutter, type Diagnostic } from "@codemirror/lint";
import type { Extension } from "@codemirror/state";
import type { LintMessage } from "./lint";

/**
 * Create CodeMirror extensions for inline linting with gutter markers.
 * Converts LintMessage[] to CodeMirror Diagnostics (squiggly underlines).
 * Optionally calls onProblems to feed results to ProblemsPanel.
 */
export function createEditorLinter(
  lintFn: (code: string) => LintMessage[],
  onProblems?: (problems: LintMessage[]) => void,
): Extension {
  return [
    linter(
      (view) => {
        const code = view.state.doc.toString();
        const messages = lintFn(code);
        onProblems?.(messages);

        return messages.map((msg): Diagnostic => {
          const lineCount = view.state.doc.lines;
          const lineNum = Math.min(Math.max(1, msg.line), lineCount);
          const line = view.state.doc.line(lineNum);
          const col = Math.max(0, Math.min(msg.col - 1, line.length));
          const from = line.from + col;
          const len = msg.length ?? 1;
          const to = Math.min(from + Math.max(len, 1), line.to);

          return {
            from,
            to: to <= from ? Math.min(from + 1, line.to) : to,
            severity: msg.type === "error" ? "error" : "warning",
            message: msg.message,
          };
        });
      },
      { delay: 300 },
    ),
    lintGutter(),
  ];
}
