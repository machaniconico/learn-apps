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
  icnlude: "include", incldue: "include", inlcude: "include",
  retrun: "return", reutrn: "return",
  viod: "void", vodi: "void",
  prntf: "printf", pritf: "printf", pirntf: "printf",
  prnitf: "printf",
  sacnf: "scanf", scnaf: "scanf",
  stcpy: "strcpy",
  maloc: "malloc",
  fre: "free",
  breack: "break",
  contniue: "continue",
  sizof: "sizeof",
  NUl: "NULL",
  treu: "true",
  fasle: "false",
  strcut: "struct", strucy: "struct",
  tyepdef: "typedef", typdef: "typedef",
  mian: "main", maiin: "main",
};

// "fre" as a standalone word but not as part of "free"
const PHRASE_TYPOS: Record<string, string> = {
  "stido.h": "stdio.h", "stdoi.h": "stdio.h",
  "stdib.h": "stdlib.h", "stidlib.h": "stdlib.h",
  "stirng.h": "string.h", "strng.h": "string.h",
};

const MISSING_PATTERN_CHECKS = [
  {
    usage: /\b(printf|scanf|puts|gets|fprintf|sprintf)\s*\(/,
    required: /#include\s*<stdio\.h>/,
    message: "printf/scanfを使用するには #include <stdio.h> が必要です",
  },
  {
    usage: /\b(malloc|calloc|realloc|free|exit|atoi|atof)\s*[(\s]/,
    required: /#include\s*<stdlib\.h>/,
    message: "malloc/freeを使用するには #include <stdlib.h> が必要です",
  },
  {
    usage: /\b(strlen|strcpy|strcmp|strcat|memcpy|memset)\s*\(/,
    required: /#include\s*<string\.h>/,
    message: "文字列関数を使用するには #include <string.h> が必要です",
  },
  {
    usage: /(?<!#include[^>]*)\b(sqrt|pow|sin|cos|tan|ceil|floor|abs)\s*\(/,
    required: /#include\s*<math\.h>/,
    message: "数学関数を使用するには #include <math.h> が必要です",
  },
  {
    usage: /[;{}]\s*$|\breturn\b/m,
    required: /\b(int|void)\s+main\s*\(/,
    message: "main関数が定義されていません",
  },
];

const SEMICOLON_SKIP_PATTERNS: RegExp[] = [
  /^(void|int|char|float|double|long|short|unsigned|signed|struct|enum|typedef)\s+\w+\s*\(/,
  /^\)/,
];

export function lintC(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingSemicolons(code, { skipLinePatterns: SEMICOLON_SKIP_PATTERNS }),
    ...checkMissingPattern(code, MISSING_PATTERN_CHECKS),
    ...checkTypos(code, WORD_TYPOS, PHRASE_TYPOS),
  ];
}
