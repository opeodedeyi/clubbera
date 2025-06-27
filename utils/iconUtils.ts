import type { IconConfig, BrandIconConfig, RegularIconConfig } from '@/types/actionIcon'


const brandIconNames = [ 'clubbera', 'clubberaGame', 'clubberaHex', 'clubberaOreo', 'clubberaPlay', 'clubberaTaiwo', 'clubberaTriangle', 'clubberaKehinde', 'google', 'instagram', 'x' ] as const

export function isBrandIcon(iconConfig: IconConfig): iconConfig is BrandIconConfig {
    return brandIconNames.includes(iconConfig.name as any)
}

export function isRegularIcon(iconConfig: IconConfig): iconConfig is RegularIconConfig {
    return !isBrandIcon(iconConfig)
}