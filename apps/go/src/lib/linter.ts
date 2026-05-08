import { checkBrackets, checkTypos, checkUnclosedStrings, checkConditionAssignment, checkMissingPattern } from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

const WORD_TYPOS: Record<string, string> = {
  fucn: "func", fucntion: "func",
  pakage: "package", packge: "package", pacakge: "package", pckg: "package",
  improt: "import", imoort: "import",
  retrun: "return", reutrn: "return",
  swtich: "switch", swithc: "switch",
  defualt: "default", deafult: "default",
  difer: "defer", deferr: "defer", defe: "defer",
  strucy: "struct", strcut: "struct", stuct: "struct",
  chanel: "chan", channle: "chan",
  mian: "main", maiin: "main",
  interfce: "interface",
  goroutien: "goroutine",
  rnage: "range",
  treu: "true",
  fasle: "false",
};

const PHRASE_TYPOS: Record<string, string> = {
  "fmt.Pritnln": "fmt.Println",
  "fmt.Prinltn": "fmt.Println",
  "fmt.Prinln": "fmt.Println",
  "fmt.Spritnf": "fmt.Sprintf",
  "fmt.Pritnf": "fmt.Printf",
  "fmt.Errrof": "fmt.Errorf",
  "fmr.Println": "fmt.Println",
  "fmr.Printf": "fmt.Printf",
  "pritnln": "Println",
  "Pritnf": "Printf",
  "Spritnf": "Sprintf",
};

const MISSING_PATTERN_CHECKS = [
  {
    usage: /\bfmt\.(Print|Println|Printf|Sprintf|Scan)\b/,
    required: /"fmt"/,
    message: 'fmt パッケージのインポートが必要です: import "fmt"',
  },
  {
    usage: /\bmath\.(Sqrt|Pow|Abs)\b/,
    required: /"math"/,
    message: 'math パッケージのインポートが必要です',
  },
  {
    usage: /\bstrings\.(Contains|Replace|Split)\b/,
    required: /"strings"/,
    message: 'strings パッケージのインポートが必要です',
  },
  {
    usage: /^\s*(?:var |const |type |\w+ :?=|fmt\.|math\.|strings\.|if |for |switch )/m,
    required: /\bpackage\s+main\b/,
    message: 'package main の宣言が必要です',
  },
  {
    usage: /\bpackage\s+main\b/,
    required: /\bfunc\s+main\s*\(\s*\)/,
    message: 'func main() の定義が必要です',
  },
];

export function lintGo(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingPattern(code, MISSING_PATTERN_CHECKS),
    ...checkTypos(code, WORD_TYPOS, PHRASE_TYPOS),
  ];
}
