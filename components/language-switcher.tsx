"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/types"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "wo", label: "WO" },
  ]

  return (
    <div className="flex gap-0 bg-white/10 backdrop-blur-md rounded-lg border border-white/30">
      {languages.map((lang, index) => (
        <Button
          key={lang.code}
          size="sm"
          variant={language === lang.code ? "default" : "ghost"}
          onClick={() => setLanguage(lang.code)}
          className={`min-w-[44px] font-medium text-white ${
            language === lang.code
              ? `bg-orange-500 hover:bg-orange-600 ${
                  index === 0
                    ? "rounded-l-lg rounded-r-none"
                    : index === languages.length - 1
                    ? "rounded-r-lg rounded-l-none"
                    : "rounded-none"
                } ${index < languages.length - 1 ? "border-r-0 border border-white/20" : ""}`
              : `hover:bg-white/10 ${
                  index === 0
                    ? "rounded-l-lg rounded-r-none"
                    : index === languages.length - 1
                    ? "rounded-r-lg rounded-l-none"
                    : "rounded-none"
                }`
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  )
}