// Accessibility and i18n scaffolding for Axion Intelligence

export const defaultLocale = "en"
export const locales = ["en", "es", "fr", "ja", "zh"] as const

export type Locale = (typeof locales)[number]

export const dictionaries = {
  en: {
    hero: {
      title: "Learn faster. Play harder.",
      subtitle: "Axion turns any subject into an addictive, personalized game."
    },
    dashboard: {
      welcome: "Welcome Back",
      daily_quest: "Daily Quests",
      xp: "XP"
    }
  },
  es: {
    hero: {
      title: "Aprenda más rápido. Juegue más duro.",
      subtitle: "Axion convierte cualquier tema en un juego adictivo y personalizado."
    },
    dashboard: {
      welcome: "Bienvenido de nuevo",
      daily_quest: "Misiones diarias",
      xp: "Puntos de exp"
    }
  }
}

export function getDictionary(locale: Locale) {
  return (dictionaries as Record<string, any>)[locale] ?? dictionaries[defaultLocale]
}
