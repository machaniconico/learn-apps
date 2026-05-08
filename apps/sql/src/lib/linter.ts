import { checkBrackets, checkTypos, checkUnclosedStrings, checkMissingPattern } from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";

// All typo keys are stored as-is; matching is case-insensitive via checkTyposCaseInsensitive below
const WORD_TYPOS_UPPER: Record<string, string> = {
  SLECT: "SELECT", SELCT: "SELECT", SELET: "SELECT", SELECCT: "SELECT",
  FORM: "FROM", FOMR: "FROM", FROMT: "FROM",
  WEHRE: "WHERE", WHREE: "WHERE", WHRE: "WHERE", WHEER: "WHERE",
  INSRET: "INSERT", INSERTT: "INSERT", INSRT: "INSERT", ISERT: "INSERT", INSETR: "INSERT",
  UDPATE: "UPDATE", UPDTE: "UPDATE", UPADTE: "UPDATE",
  DELTE: "DELETE", DELEET: "DELETE", DELET: "DELETE", DLEET: "DELETE",
  CRETAE: "CREATE", CRAETE: "CREATE", CREAT: "CREATE",
  GRUOP: "GROUP", GROPU: "GROUP", GORUP: "GROUP",
  OERDR: "ORDER", ORDR: "ORDER", ORDEER: "ORDER",
  JION: "JOIN", JOIIN: "JOIN", JOING: "JOIN",
  LMIT: "LIMIT", LIMT: "LIMIT",
  HAIVNG: "HAVING", HAVIGN: "HAVING",
  DISTINT: "DISTINCT", DESTINCT: "DISTINCT", DISTICT: "DISTINCT", DISTNCT: "DISTINCT",
  TALBE: "TABLE", TABEL: "TABLE",
  COULMN: "COLUMN", COLUMM: "COLUMN", COLMUN: "COLUMN",
  DRPO: "DROP", DORP: "DROP",
  ALTE: "ALTER", ALETR: "ALTER",
  VALEUS: "VALUES", VLAUES: "VALUES",
};

/**
 * Case-insensitive typo check for SQL keywords.
 * Normalizes each found token to uppercase before looking it up.
 */
function checkSqlTypos(code: string): LintMessage[] {
  const messages: LintMessage[] = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    if (trimmed.startsWith("--") || trimmed.startsWith("/*") || trimmed.startsWith("*"))
      continue;

    const re = /\b[a-zA-Z_]\w*\b/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
      const upper = m[0].toUpperCase();
      if (WORD_TYPOS_UPPER[upper]) {
        messages.push({
          line: i + 1,
          col: m.index + 1,
          message: `「${m[0]}」は「${WORD_TYPOS_UPPER[upper]}」の間違いではないですか？`,
          type: "warning",
        });
      }
    }
  }
  return messages;
}

export function lintSql(code: string): LintMessage[] {
  const upperCode = code.toUpperCase();
  return [
    ...checkBrackets(code, { lineCommentPrefixes: ["--"], blockCommentPairs: [["/*", "*/"]] }),
    ...checkUnclosedStrings(code, { lineCommentPrefixes: ["--"] }),
    ...checkSqlTypos(code),
    ...checkMissingPattern(code, [
      {
        // SELECT without FROM, unless it looks like a constant expression (SELECT digit/operator)
        usage: /\bSELECT\b/i,
        required: /\bFROM\b|\bSELECT\s+[\d('"]/i,
        message:
          "SELECT文にはFROM句が必要です（定数の計算を除く）",
      },
      {
        usage: /\bWHERE\b/i,
        required: /\b(SELECT|UPDATE|DELETE)\b/i,
        message: "WHERE句にはSELECT/UPDATE/DELETE文が必要です",
      },
    ]),
  ];
}
