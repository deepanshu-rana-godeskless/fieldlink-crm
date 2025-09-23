"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
];

const LocaleContext = createContext({
    lang: "en",
    setLang: (lang: string) => { },
    t: (key: string) => key,
    languages: LANGUAGES,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState("en");
    const [messages, setMessages] = useState<Record<string, string>>({});

    useEffect(() => {
        import(`../locales/${lang}.json`).then((mod) => setMessages(mod.default || mod));
    }, [lang]);

    function t(key: string) {
        return messages[key] || key;
    }

    return (
        <LocaleContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    return useContext(LocaleContext);
}
