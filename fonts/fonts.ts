import localFont from 'next/font/local'

export const boris = localFont({
    src: './Boris.ttf',
    display: 'swap',
    variable: '--font-boris',
    weight: '400',
})

export const nunito = localFont({
    src: './Nunito-VariableFont_wght.ttf',
    display: 'swap',
    variable: '--font-nunito',
    weight: '400 600',
})
