export const COMIC_STATUS = {
  Ongoing: 'warning',
  Upcoming: 'warning',
  Published: 'success',
  Finished: 'success',
  Removed: 'error',
}

export const LANGUAGE = [
  { id: 1, shortLang: "en", lang: "English" },
  { id: 2, shortLang: "vn", lang: "Tiếng Việt" },
]

export const LOCALES = LANGUAGE.map((l) => l.shortLang)
