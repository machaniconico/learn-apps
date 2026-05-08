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
  pubic: "public", pubilc: "public",
  priavte: "private", privte: "private",
  proetcted: "protected",
  statc: "static", statci: "static",
  viod: "void", vodi: "void",
  stirng: "string", Stirng: "String", strng: "string",
  boll: "bool",
  calss: "class", clss: "class",
  nmespace: "namespace", namepsace: "namespace",
  usign: "using",
  retrun: "return", reutrn: "return",
  treu: "true", fasle: "false",
  brek: "break", contine: "continue",
};

const PHRASE_TYPOS: Record<string, string> = {
  "Consoel.WriteLine": "Console.WriteLine",
  "Consle.WriteLine": "Console.WriteLine",
  "Console.Wirte(": "Console.Write(",
  "Console.WirteLine": "Console.WriteLine",
  "Console.WriteLien": "Console.WriteLine",
  "Console.WirteLine(": "Console.WriteLine(",
  "Cosole.WriteLine": "Console.WriteLine",
  "Console.Writeline": "Console.WriteLine",
  "Console.ReadLien": "Console.ReadLine",
  "Console.Readlien": "Console.ReadLine",
};

const SEMICOLON_SKIP: RegExp[] = [
  /^(public|private|protected|internal|static|class|interface|enum|struct|namespace|using)\s.*[{(]$/,
  /^(get|set)\s*[{;]?$/,
];

const MISSING_PATTERN_CHECKS = [
  {
    usage: /Console\.(Write|ReadLine)/,
    required: /using\s+System\s*;/,
    message: "Consoleを使用するには using System; が必要です",
  },
  {
    usage: /\b(int|string|bool|var)\s+\w+\s*[=;(]/,
    required: /\bclass\b/,
    message: "クラス宣言が必要です",
  },
  {
    usage: /\bclass\b/,
    required: /\bMain\s*\(/,
    message: "Main メソッドが必要です（プログラムのエントリーポイント）",
  },
  {
    usage: /List</,
    required: /using\s+System\.Collections\.Generic\s*;/,
    message: "Listを使用するには using System.Collections.Generic; が必要です",
  },
];

export function lintCsharp(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingSemicolons(code, { skipLinePatterns: SEMICOLON_SKIP }),
    ...checkMissingPattern(code, MISSING_PATTERN_CHECKS),
    ...checkTypos(code, WORD_TYPOS, PHRASE_TYPOS),
  ];
}
