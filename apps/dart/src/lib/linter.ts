import {
  checkBrackets,
  checkTypos,
  checkUnclosedStrings,
  checkConditionAssignment,
  checkMissingSemicolons,
  checkMissingPattern,
} from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

const WORD_TYPOS: Record<string, string> = {
  pritn: "print", pirnt: "print", prit: "print", prnt: "print",
  viod: "void", vodi: "void",
  Stirng: "String", Strng: "String",
  booelan: "bool",
  retrun: "return", reutrn: "return",
  calss: "class", clss: "class",
  abstact: "abstract", abstrat: "abstract", abstrct: "abstract",
  overrdie: "override", overide: "override",
  extneds: "extends", extnds: "extends", extens: "extends",
  implemnets: "implements", implments: "implements", impelments: "implements",
  treu: "true",
  fasle: "false",
  dynaimc: "dynamic",
  finla: "final", fianl: "final",
  cosnt: "const",
  mian: "main", maiin: "main",
};

export function lintDart(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingSemicolons(code, {
      skipLinePatterns: [
        /^(class|enum|mixin|extension|abstract)\s/,
        /^(if|else|for|while|do|switch|case|default|try|catch|finally)\b/,
        /^(import|export|part|library)\s/,
      ],
    }),
    ...checkTypos(code, WORD_TYPOS),
    ...checkMissingPattern(code, [
      {
        usage: /\b\w+\s*[;(]/,
        required: /\bvoid\s+main\b|\bmain\s*\(/,
        message: "void main() の定義が必要です",
      },
    ]),
  ];
}
