import {
  checkBrackets,
  checkTypos,
  checkBlockPairs,
  checkUnclosedStrings,
  checkConditionAssignment,
} from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

const WORD_TYPOS: Record<string, string> = {
  pust: "puts", pusts: "puts", ptus: "puts",
  reqire: "require", requir: "require", reuqire: "require",
  defi: "def",
  modle: "module", modul: "module",
  calss: "class", clss: "class",
  retrun: "return", reutrn: "return",
  yeild: "yield", yiled: "yield",
  atrr: "attr",
  inclde: "include", incldue: "include",
  pritn: "print",
  dfe: "def",
  clsas: "class",
  retunr: "return",
  arary: "array",
  hahs: "hash",
  treu: "true",
  fasle: "false",
  nli: "nil",
};

const BLOCK_OPENERS = ["def", "class", "module", "do", "if", "unless", "while", "until", "begin", "case"];

const LINE_COMMENT_PREFIXES = ["#"];

export function lintRuby(code: string): LintMessage[] {
  return [
    ...checkBrackets(code, {
      lineCommentPrefixes: LINE_COMMENT_PREFIXES,
      blockCommentPairs: [["=begin", "=end"]],
    }),
    ...checkBlockPairs(code, BLOCK_OPENERS, "end", "#"),
    ...checkTypos(code, WORD_TYPOS),
    ...checkUnclosedStrings(code, { lineCommentPrefixes: LINE_COMMENT_PREFIXES }),
    ...checkConditionAssignment(code, { lineCommentPrefixes: LINE_COMMENT_PREFIXES }),
  ];
}
