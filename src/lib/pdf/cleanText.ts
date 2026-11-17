/**
 * Character cleaner to guarantee safe WinAnsi encoding for standard PDF fonts (Times-Roman, Helvetica).
 * Replaces non-standard punctuation, curly quotes, accents, and completely eliminates em-dash and en-dash.
 */
export function cleanText(input: string | undefined | null): string {
  if (!input) return "";

  let str = String(input);

  // Normalize Unicode
  try {
    str = str.normalize("NFKD");
  } catch {
    // ignore if normalize fails
  }

  // Punctuation and quotes replacements
  str = str
    // Quotation marks
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/`/g, "'")
    // Em dash and En dash - CRITICAL: Never allow em-dash or en-dash!
    .replace(/[\u2013\u2014\u2015]/g, "-")
    // Horizontal ellipsis
    .replace(/\u2026/g, "...")
    // Bullet points and special markers
    .replace(/[\u2022\u25E6\u25AA\u25AB\u2023]/g, "- ")
    // Non-breaking spaces and exotic spaces
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, " ")
    // Trademarks and symbols
    .replace(/\u00A9/g, "(c)")
    .replace(/\u00AE/g, "(R)")
    .replace(/\u2122/g, "(TM)")
    .replace(/\u00A7/g, "Section ")
    .replace(/\u00B6/g, "Para ")
    // Currency
    .replace(/\u20AC/g, "EUR ")
    .replace(/\u00A3/g, "GBP ")
    .replace(/\u00A5/g, "YEN ")
    // Accented vowels and common letters
    .replace(/[àáâãäå]/g, "a")
    .replace(/[ÀÁÂÃÄÅ]/g, "A")
    .replace(/[èéêë]/g, "e")
    .replace(/[ÈÉÊË]/g, "E")
    .replace(/[ìíîï]/g, "i")
    .replace(/[ÌÍÎÏ]/g, "I")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ÒÓÔÕÖ]/g, "O")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ÙÚÛÜ]/g, "U")
    .replace(/[ýÿ]/g, "y")
    .replace(/[Ý]/g, "Y")
    .replace(/[ñ]/g, "n")
    .replace(/[Ñ]/g, "N")
    .replace(/[çćč]/g, "c")
    .replace(/[ÇĆČ]/g, "C")
    .replace(/[şšś]/g, "s")
    .replace(/[ŞŠŚ]/g, "S")
    .replace(/[ğ]/g, "g")
    .replace(/[Ğ]/g, "G")
    .replace(/[ı]/g, "i")
    .replace(/[İ]/g, "I")
    .replace(/[žźż]/g, "z")
    .replace(/[ŽŹŻ]/g, "Z")
    .replace(/[ß]/g, "ss")
    .replace(/[æ]/g, "ae")
    .replace(/[Æ]/g, "AE")
    .replace(/[œ]/g, "oe")
    .replace(/[Œ]/g, "OE");

  // Keep strictly printable ASCII and newline/tab
  // Any character with code > 127 replaced with nearest safe match or space
  return str.replace(/[^\x20-\x7E\r\n\t]/g, " ");
}

/**
 * Ensures a single line or wrapped line contains no em-dashes and safe characters
 */
export function safeLine(text: string): string {
  return cleanText(text).trim();
}
