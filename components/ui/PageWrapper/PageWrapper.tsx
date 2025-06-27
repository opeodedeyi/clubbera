'use client'

import { useMemo, useEffect, useState } from 'react';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import styles from './PageWrapper.module.css';

interface PageWrapperProps {
    children: React.ReactNode
    particleCount?: number
    particlesHeight?: number
    showParticles?: boolean
    className?: string
}

interface Particle {
    id: number
    name: BrandCharacterName
    size: ParticleSize
    color: string
    x: number
    y: number
    zone: 'left' | 'right'
}

type BrandCharacterName = 
    | 'clubberaGame'
    | 'clubberaHex' 
    | 'clubberaOreo'
    | 'clubberaPlay'
    | 'clubberaTaiwo'
    | 'clubberaTriangle'
    | 'clubberaKehinde'

type ParticleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

const BRAND_CHARACTERS: readonly BrandCharacterName[] = [
    'clubberaGame',
    'clubberaHex', 
    'clubberaOreo',
    'clubberaPlay',
    'clubberaTaiwo',
    'clubberaTriangle',
    'clubberaKehinde'
] as const

const SIZES: readonly ParticleSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

const COLORS: readonly string[] = [
    '--color-neutral',
    '--color-default', 
    '--color-event',
    '--color-community',
    '--color-danger'
] as const

export default function PageWrapper({ 
    children,
    particleCount=7,
    particlesHeight=355,
    showParticles=false,
    className=''
}: PageWrapperProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const particles = useMemo(() => {
        if (!showParticles || !mounted) return []
    
        const generated: Particle[] = []
        
        const leftCount = Math.floor(particleCount / 2)
        const rightCount = particleCount - leftCount
    
        // Create stratified Y positions for better distribution
        const createYPositions = (count: number) => {
            const zoneHeight = particlesHeight / count
            const positions: number[] = []
            
            for (let i = 0; i < count; i++) {
                // Each particle gets a zone, with some randomness within the zone
                const zoneStart = i * zoneHeight
                const zoneEnd = (i + 1) * zoneHeight
                const padding = zoneHeight * 0.1 // 10% padding within zone
                
                const y = Math.random() * (zoneHeight - padding * 2) + zoneStart + padding
                positions.push(y)
            }
            
            // Shuffle the positions so they're not perfectly ordered
            return positions.sort(() => Math.random() - 0.5)
        }
    
        const leftYPositions = createYPositions(leftCount)
        const rightYPositions = createYPositions(rightCount)
    
        // Generate left side particles
        for (let i = 0; i < leftCount; i++) {
            generated.push({
                id: i,
                name: BRAND_CHARACTERS[Math.floor(Math.random() * BRAND_CHARACTERS.length)],
                size: SIZES[Math.floor(Math.random() * SIZES.length)],
                color: COLORS[i % COLORS.length],
                zone: 'left',
                x: Math.random() * 23 + 2,
                y: leftYPositions[i], // Use stratified Y position
            })
        }
    
        // Generate right side particles
        for (let i = 0; i < rightCount; i++) {
            generated.push({
                id: leftCount + i,
                name: BRAND_CHARACTERS[Math.floor(Math.random() * BRAND_CHARACTERS.length)],
                size: SIZES[Math.floor(Math.random() * SIZES.length)],
                color: COLORS[(leftCount + i) % COLORS.length],
                zone: 'right',
                x: Math.random() * 23 + 75,
                y: rightYPositions[i], // Use stratified Y position
            })
        }
        
        return generated
    }, [showParticles, mounted, particleCount, particlesHeight])

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {/* Particles Layer */}
            {showParticles && mounted && (
                <div
                    className={styles.particlesContainer}
                    style={{
                        '--particles-height': `${particlesHeight}px` 
                    } as React.CSSProperties}>
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className={`${styles.particle} ${styles[particle.zone]}`}
                            style={{
                                '--particle-x': `${particle.x}%`,
                                '--particle-y': `${particle.y}px`,
                            } as React.CSSProperties}>
                            <BrandIcon
                                name={particle.name}
                                size={particle.size}
                                color={`var(${particle.color})`} />
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}