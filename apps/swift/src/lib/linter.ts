import {
  checkBrackets,
  checkTypos,
  checkUnclosedStrings,
  checkConditionAssignment,
  checkMissingPattern,
} from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

const WORD_TYPOS: Record<string, string> = {
  pritn: "print", pirnt: "print", prit: "print", prnt: "print",
  lte: "let",
  vra: "var",
  fucn: "func", fucnc: "func",
  retrun: "return", reutrn: "return",
  swtich: "switch",
  stuct: "struct", strucy: "struct", strcut: "struct",
  calss: "class", clss: "class",
  procotol: "protocol", protocl: "protocol", protcol: "protocol",
  enuem: "enum",
  overrdie: "override", overide: "override",
  gaurd: "guard",
  treu: "true",
  fasle: "false",
  optioal: "optional",
  unwarp: "unwrap",
  priavte: "private", privte: "private",
  pubic: "public", publc: "public",
  mutaing: "mutating",
};

export function lintSwift(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkTypos(code, WORD_TYPOS),
    ...checkMissingPattern(code, [
      {
        usage: /\bprint\s*\(/,
        required: /\bfunc\s+\w+/,
        message:
          "ヒント: print() をスクリプトとして使う場合は問題ありません。関数の中で使う場合は func で関数を定義しましょう。",
      },
    ]),
  ];
}
