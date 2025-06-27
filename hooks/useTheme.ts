'use client'
import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface UseThemeReturn {
    theme: string | undefined
    setTheme: (theme: string) => void
    systemTheme: string | undefined
    currentTheme: string | undefined
    mounted: boolean
    switchToLight: () => void
    switchToDark: () => void
    switchToColored: () => void
    isLight: boolean
    isDark: boolean
    isColored: boolean
}

export function useTheme(): UseThemeReturn {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useNextTheme()

    useEffect(() => setMounted(true), [])

    const currentTheme = theme === 'system' ? systemTheme : theme

    const switchToLight = () => setTheme('light')
    const switchToDark = () => setTheme('dark')
    const switchToColored = () => setTheme('colored')

    const isLight = currentTheme === 'light'
    const isDark = currentTheme === 'dark'
    const isColored = currentTheme === 'colored'

    return {
        theme,
        setTheme,
        systemTheme,
        currentTheme,
        mounted,
        switchToLight,
        switchToDark,
        switchToColored,
        isLight,
        isDark,
        isColored
    }
}