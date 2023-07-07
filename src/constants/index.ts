export const COMIC_STATUS = {
  "On-Going": "warning",
  "Upcoming": "warning",
  "Published": "success",
  "Removed": "error",
}

export const LANGUAGE = [
  { id: 1, shortLang: "en", lang: "English" },
  { id: 2, shortLang: "vn", lang: "Tiếng Việt" },
]

export const LOCALES = LANGUAGE.map((l) => l.shortLang)
