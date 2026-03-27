"use client"

import { useState, useCallback, useEffect } from "react"
import en from "../locales/en.json"
import es from "../locales/es.json"

const locales: Record<string, any> = { en, es }

export function useI18n() {
  const [lang, setLang] = useState("en")

  const t = useCallback((key: string) => {
    const keys = key.split(".")
    let value = locales[lang]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }, [lang])

  const toggleLang = () => {
    setLang(prev => prev === "en" ? "es" : "en")
  }

  return { t, lang, toggleLang }
}
