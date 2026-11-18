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
    // Extended Latin (Polish, Nordic, Baltic, Slavic)
    .replace(/[Ł]/g, "L")
    .replace(/[ł]/g, "l")
    .replace(/[Đð]/g, "d")
    .replace(/[Đ]/g, "D")
    .replace(/[Øø]/g, "o")
    .replace(/[Åå]/g, "a")
    .replace(/[Ąą]/g, "a")
    .replace(/[Ęę]/g, "e")
    .replace(/[Ńń]/g, "n")
    .replace(/[Śś]/g, "s")
    .replace(/[ŹźŻż]/g, "z")
    .replace(/[Ůů]/g, "u")
    .replace(/[Ťť]/g, "t")
    .replace(/[Ďď]/g, "d")
    .replace(/[Ňň]/g, "n")
    .replace(/[Řř]/g, "r")
    // Cyrillic Transliteration (Ukrainian, Russian, Bulgarian names & addresses)
    .replace(/[Аа]/g, (c) => (c === "А" ? "A" : "a"))
    .replace(/[Бб]/g, (c) => (c === "Б" ? "B" : "b"))
    .replace(/[Вв]/g, (c) => (c === "В" ? "V" : "v"))
    .replace(/[ГгҐґ]/g, (c) => (c === "Г" || c === "Ґ" ? "G" : "g"))
    .replace(/[Дд]/g, (c) => (c === "Д" ? "D" : "d"))
    .replace(/[ЕеЁёЄє]/g, (c) => (c === "Е" || c === "Ё" || c === "Є" ? "E" : "e"))
    .replace(/[Жж]/g, (c) => (c === "Ж" ? "Zh" : "zh"))
    .replace(/[Зз]/g, (c) => (c === "З" ? "Z" : "z"))
    .replace(/[ИиІі]/g, (c) => (c === "И" || c === "І" ? "I" : "i"))
    .replace(/[Йй]/g, (c) => (c === "Й" ? "Y" : "y"))
    .replace(/[Її]/g, (c) => (c === "Ї" ? "Yi" : "yi"))
    .replace(/[Кк]/g, (c) => (c === "К" ? "K" : "k"))
    .replace(/[Лл]/g, (c) => (c === "Л" ? "L" : "l"))
    .replace(/[Мм]/g, (c) => (c === "М" ? "M" : "m"))
    .replace(/[Нн]/g, (c) => (c === "Н" ? "N" : "n"))
    .replace(/[Оо]/g, (c) => (c === "О" ? "O" : "o"))
    .replace(/[Пп]/g, (c) => (c === "П" ? "P" : "p"))
    .replace(/[Рр]/g, (c) => (c === "Р" ? "R" : "r"))
    .replace(/[Сс]/g, (c) => (c === "С" ? "S" : "s"))
    .replace(/[Тт]/g, (c) => (c === "Т" ? "T" : "t"))
    .replace(/[Уу]/g, (c) => (c === "У" ? "U" : "u"))
    .replace(/[Фф]/g, (c) => (c === "Ф" ? "F" : "f"))
    .replace(/[Хх]/g, (c) => (c === "Х" ? "Kh" : "kh"))
    .replace(/[Цц]/g, (c) => (c === "Ц" ? "Ts" : "ts"))
    .replace(/[Чч]/g, (c) => (c === "Ч" ? "Ch" : "ch"))
    .replace(/[Шш]/g, (c) => (c === "Ш" ? "Sh" : "sh"))
    .replace(/[Щщ]/g, (c) => (c === "Щ" ? "Shch" : "shch"))
    .replace(/[ЪъЬь]/g, "'")
    .replace(/[Ыы]/g, (c) => (c === "Ы" ? "Y" : "y"))
    .replace(/[Ээ]/g, (c) => (c === "Э" ? "E" : "e"))
    .replace(/[Юю]/g, (c) => (c === "Ю" ? "Yu" : "yu"))
    .replace(/[Яя]/g, (c) => (c === "Я" ? "Ya" : "ya"))
    // Greek Transliteration
    .replace(/[Αα]/g, "a")
    .replace(/[Ββ]/g, "b")
    .replace(/[Γγ]/g, "g")
    .replace(/[Δδ]/g, "d")
    .replace(/[Εε]/g, "e")
    .replace(/[Ζζ]/g, "z")
    .replace(/[Ηη]/g, "e")
    .replace(/[Θθ]/g, "th")
    .replace(/[Ιι]/g, "i")
    .replace(/[Κκ]/g, "k")
    .replace(/[Λλ]/g, "l")
    .replace(/[Μμ]/g, "m")
    .replace(/[Νν]/g, "n")
    .replace(/[Ξξ]/g, "x")
    .replace(/[Οο]/g, "o")
    .replace(/[Ππ]/g, "p")
    .replace(/[Ρρ]/g, "r")
    .replace(/[Σσς]/g, "s")
    .replace(/[Ττ]/g, "t")
    .replace(/[Υυ]/g, "y")
    .replace(/[Φφ]/g, "ph")
    .replace(/[Χχ]/g, "ch")
    .replace(/[Ψψ]/g, "ps")
    .replace(/[Ωω]/g, "o")
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
  const sanitized = str.replace(/[^\x20-\x7E\r\n\t]/g, " ");
  // Collapse multiple spaces within a line while preserving intentional newlines
  return sanitized.replace(/[ \t]{2,}/g, " ");
}

/**
 * Ensures a single line or wrapped line contains no em-dashes and safe characters
 */
export function safeLine(text: string): string {
  return cleanText(text).trim();
}
