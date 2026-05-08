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
  namepsace: "namespace", namespacce: "namespace",
  namsepace: "namespace",
  usign: "using", usinng: "using",
  unsig: "using",
  retrun: "return", reutrn: "return",
  viod: "void", vodi: "void",
  stirng: "string", strng: "string",
  vecotr: "vector",
  calss: "class", clss: "class",
  templte: "template", tempalte: "template",
  virtal: "virtual", virtaul: "virtual",
  mian: "main", maiin: "main",
  prntf: "printf", pritf: "printf", pirntf: "printf", prnitf: "printf",
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
  cotu: "cout",
  endll: "endl",
};

const PHRASE_TYPOS: Record<string, string> = {
  "std::cot": "std::cout", "std::cou ": "std::cout ",
  "std::endll": "std::endl",
  "std::cer ": "std::cerr ",
  "std::stirng": "std::string",
  "std::vctor": "std::vector", "std::vecor": "std::vector",
  "std::mpa": "std::map",
  "iostraem": "iostream", "iosream": "iostream",
  "stido.h": "stdio.h", "stdoi.h": "stdio.h",
  "stdib.h": "stdlib.h", "stidlib.h": "stdlib.h",
  "stirng.h": "string.h", "strng.h": "string.h",
};

const MISSING_PATTERN_CHECKS = [
  {
    usage: /\b(cout|cin|endl|cerr)\b/,
    required: /#include\s*<iostream>/,
    message: "cout/cinを使用するには #include <iostream> が必要です",
  },
  {
    usage: /\bstring\b(?!\s*\.h)/,
    required: /#include\s*<string>/,
    message: "string型を使用するには #include <string> が必要です",
  },
  {
    usage: /\bvector\s*</,
    required: /#include\s*<vector>/,
    message: "vectorを使用するには #include <vector> が必要です",
  },
  {
    usage: /\b(sort|find|count|reverse)\s*\(/,
    required: /#include\s*<algorithm>/,
    message: "sort/findを使用するには #include <algorithm> が必要です",
  },
  {
    usage: /\bcout\b/,
    required: /(?:std::cout|using\s+namespace\s+std)/,
    message: "std::coutと書くか、using namespace std; を追加してください",
  },
  {
    usage: /\b(printf|scanf|puts|gets|fprintf|sprintf)\s*\(/,
    required: /#include\s*<stdio\.h>|#include\s*<cstdio>/,
    message: "printf/scanfを使用するには #include <stdio.h> が必要です",
  },
  {
    usage: /\b(malloc|calloc|realloc|free|exit|atoi|atof)\s*[(\s]/,
    required: /#include\s*<stdlib\.h>|#include\s*<cstdlib>/,
    message: "malloc/freeを使用するには #include <stdlib.h> が必要です",
  },
  {
    usage: /\b(strlen|strcpy|strcmp|strcat|memcpy|memset)\s*\(/,
    required: /#include\s*<string\.h>|#include\s*<cstring>/,
    message: "文字列関数を使用するには #include <string.h> が必要です",
  },
  {
    usage: /(?<!#include[^>]*)\b(sqrt|pow|sin|cos|tan|ceil|floor|abs)\s*\(/,
    required: /#include\s*<math\.h>|#include\s*<cmath>/,
    message: "数学関数を使用するには #include <math.h> が必要です",
  },
  {
    usage: /[;{}]\s*$|\breturn\b/m,
    required: /\b(int|void)\s+main\s*\(/,
    message: "main関数が定義されていません",
  },
];

const SEMICOLON_SKIP_PATTERNS: RegExp[] = [
  /^(void|int|char|float|double|long|short|unsigned|signed|struct|enum|typedef|auto|bool|string)\s+\w+\s*\(/,
  /^\)/,
];

export function lintCpp(code: string): LintMessage[] {
  return [
    ...checkBrackets(code),
    ...checkUnclosedStrings(code),
    ...checkConditionAssignment(code),
    ...checkMissingSemicolons(code, { skipLinePatterns: SEMICOLON_SKIP_PATTERNS }),
    ...checkMissingPattern(code, MISSING_PATTERN_CHECKS),
    ...checkTypos(code, WORD_TYPOS, PHRASE_TYPOS),
  ];
}
