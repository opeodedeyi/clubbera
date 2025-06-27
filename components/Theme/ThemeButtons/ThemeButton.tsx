'use client';

import style from './ThemeButton.module.css'


interface ThemeButtonProps {
    backgroundColorOuter?: string
    backgroundColor?: string
    borderColor?: string
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

export default function ThemeButton({
    backgroundColorOuter = 'var(--color-light)',
    backgroundColor,
    borderColor,
    className = '',
    children,
    onClick 
}: ThemeButtonProps) {
    return (
        <div onClick={onClick} className={`${className} ${style.container}`}>
            <div className={style.buttonContainer} style={{ backgroundColor:backgroundColorOuter }}>
                <div className={style.innerColors} style={{ backgroundColor, borderColor }}></div>
            </div>

            <span>{children}</span>
        </div>
    )
}