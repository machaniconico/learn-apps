import {
  checkBrackets,
  checkTypos,
  checkUnclosedStrings,
  checkConditionAssignment,
  checkMissingPattern,
  checkMissingSemicolons,
} from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

const WORD_TYPOS: Record<string, string> = {
  pubic: "public", pubilc: "public", publc: "public",
  priavte: "private", privte: "private",
  statc: "static", statci: "static",
  viod: "void", vodi: "void",
  Sysetm: "System", Systme: "System", Sytem: "System",
  Stirng: "String", Sring: "String",
  booelan: "boolean", bolean: "boolean",
  calss: "class", clss: "class",
  retrun: "return", reutrn: "return",
  improt: "import",
  treu: "true", fasle: "false",
  nwe: "new",
  finaly: "finally", abstrat: "abstract",
  extnds: "extends", implments: "implements",
};

const PHRASE_TYPOS: Record<string, string> = {
  "System.out.pritnln": "System.out.println",
  "System.out.pirntln": "System.out.println",
  "System.out.printl(": "System.out.println(",
  "Sytem.out.println": "System.out.println",
  "System.otu.println": "System.out.println",
};

const SEMICOLON_SKIP: RegExp[] = [
  /^(public|private|protected|static|class|interface|enum|abstract)\s.*[{(]$/,
  /^@\w+/,
];

const MISSING_PATTERN_CHECKS = [
  {
    usage: /\b(int|String|boolean|double|float|long)\s+\w+\s*[=;(]/,
    required: /\bclass\b/,
    message: "クラス宣言が必要です",
  },
  {
    usage: /\bclass\b/,
    required: /\bmain\s*\(\s*String/,
    message: "main メソッドが必要です: public static void main(String[] args)",
  },
  {
    usage: /\bScanner\b/,
    required: /import\s+java\.util\.Scanner\s*;/,
    message: "Scannerを使用するには import java.util.Scanner; が必要です",
  },
  {
    usage: /\bArrayList\b/,
    required: /import\s+java\.util\.ArrayList\s*;/,
    message: "ArrayListを使用するには import java.util.ArrayList; が必要です",
  },
  {
    usage: /\bHashMap\b/,
    required: /import\s+java\.util\.HashMap\s*;/,
    message: "HashMapを使用するには import java.util.HashMap; が必要です",
  },
];

export function lintJava(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingSemicolons(code, { skipLinePatterns: SEMICOLON_SKIP }),
    ...checkMissingPattern(code, MISSING_PATTERN_CHECKS),
    ...checkTypos(code, WORD_TYPOS, PHRASE_TYPOS),
  ];
}
