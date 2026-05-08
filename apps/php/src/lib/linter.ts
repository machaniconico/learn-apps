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
  ehco: "echo", ecoh: "echo", eccho: "echo",
  fucntion: "function", fucncion: "function", funciton: "function",
  retrun: "return", reutrn: "return",
  reqire: "require", requir: "require",
  incldue: "include", inlcude: "include",
  calss: "class", clss: "class",
  priavte: "private", privte: "private",
  pubic: "public", publc: "public",
  proected: "protected",
  arary: "array", arry: "array",
  lengthh: "length",
  arrary: "array",
  strign: "string",
  booelan: "boolean",
  foreahc: "foreach",
  swithc: "switch",
  brek: "break",
  contineu: "continue",
  trhow: "throw",
  finaly: "finally",
};

const LINE_COMMENT_PREFIXES = ["//", "#"];

export function lintPhp(code: string): LintMessage[] {
  return [
    ...checkBrackets(code, {
      lineCommentPrefixes: LINE_COMMENT_PREFIXES,
      blockCommentPairs: [["/*", "*/"]],
    }),
    ...checkTypos(code, WORD_TYPOS),
    ...checkUnclosedStrings(code, { lineCommentPrefixes: LINE_COMMENT_PREFIXES }),
    ...checkConditionAssignment(code, { lineCommentPrefixes: LINE_COMMENT_PREFIXES }),
    ...checkMissingSemicolons(code, {
      lineCommentPrefixes: LINE_COMMENT_PREFIXES,
      skipLinePatterns: [
        /^<\?php/,
        /^\?>/,
        /^(function|class|interface|trait|abstract|namespace|use)\b/,
        /^(if|else|elseif|while|for|foreach|switch|case|default|try|catch|finally)\b/,
      ],
    }),
    ...checkMissingPattern(code, [
      {
        usage: /\b(echo|print)\b/,
        required: /<\?php/,
        message: "<?php タグが必要です",
      },
    ]),
  ];
}
