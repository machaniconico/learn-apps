import { checkBrackets, checkTypos, checkUnclosedStrings, checkConditionAssignment, checkMissingPattern } from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

const WORD_TYPOS: Record<string, string> = {
  fucn: "fun", fu: "fun",
  pritnln: "println", printl: "println", pritn: "print",
  calss: "class", clss: "class",
  retrun: "return", reutrn: "return",
  overrdie: "override", abstrat: "abstract", abstact: "abstract",
  priavte: "private", privte: "private",
  suspned: "suspend", susepnd: "suspend",
  objetc: "object", comapnion: "companion",
  vla: "val",
  wneh: "when",
  interfce: "interface",
  treu: "true",
  fasle: "false",
  nulable: "nullable",
};

const PHRASE_TYPOS: Record<string, string> = {
  "pritnln(": "println(",
  "printl(": "println(",
  "pritn(": "print(",
};

const MISSING_PATTERN_CHECKS = [
  {
    usage: /^\s*(?:val |var |println|print|readLine|if |for |when |[A-Za-z])/m,
    required: /\bfun\s+main\s*\(/,
    message: 'fun main() の定義が必要です',
  },
];

export function lintKotlin(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingPattern(code, MISSING_PATTERN_CHECKS),
    ...checkTypos(code, WORD_TYPOS, PHRASE_TYPOS),
  ];
}
