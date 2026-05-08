import { checkBrackets, checkTypos } from "@learn-apps/shared/lib/lint";
import type { LintMessage } from "@learn-apps/shared/lib/lint";

const WORD_TYPOS: Record<string, string> = {
  pirnt: "print", pritn: "print", prnt: "print",
  improt: "import", imoort: "import", imort: "import",
  retrun: "return", reutrn: "return",
  ture: "True", Ture: "True",
  flase: "False", fasle: "False", Flase: "False",
  noen: "None", Noen: "None",
  defi: "def", whlie: "while", elfi: "elif", esle: "else",
  clas: "class", brek: "break",
  contine: "continue", contiue: "continue",
  excpet: "except", execpt: "except",
  finaly: "finally", lamda: "lambda", yeild: "yield",
};

function checkColons(code: string): LintMessage[] {
  const messages: LintMessage[] = [];
  const lines = code.split("\n");
  const keywords = /^\s*(def|class|if|elif|else|for|while|with|try|except|finally)\b/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    if (trimmed.startsWith("#")) continue;
    if (!keywords.test(line)) continue;

    // Remove inline comments and trailing whitespace
    const withoutComment = line.replace(/#.*$/, "").trimEnd();
    if (withoutComment.length > 0 && !withoutComment.endsWith(":") && !withoutComment.endsWith("\\")) {
      const kw = trimmed.match(/^(\w+)/)?.[1] ?? "";
      messages.push({
        line: i + 1,
        col: withoutComment.length + 1,
        message: `「${kw}」文の末尾にコロン「:」がありません`,
        type: "error",
      });
    }
  }

  return messages;
}

export function lintPython(code: string): LintMessage[] {
  return [
    ...checkBrackets(code, { lineCommentPrefixes: ["#"], blockCommentPairs: [] }),
    ...checkColons(code),
    ...checkTypos(code, WORD_TYPOS),
  ];
}
