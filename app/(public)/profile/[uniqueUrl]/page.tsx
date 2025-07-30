import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { usersServerApi } from '@/lib/api/usersServer';
import ProfilePageContent from '@/components/profile/ProfilePageContent/ProfilePageContent';


interface ProfilePageProps {
    params: Promise<{ uniqueUrl: string }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
    const { uniqueUrl } = await params
    
    try {
        const response = await usersServerApi.getProfileByUrl(uniqueUrl)
        const profile = response.data
        
        return {
            title: `${profile.fullName} | Clubbera`,
            description: profile.bio || `Check out ${profile.fullName}'s profile on Clubbera`,
            openGraph: {
                title: `${profile.fullName} (@${profile.uniqueUrl})`,
                description: profile.bio || `Check out ${profile.fullName}'s profile on Clubbera`,
                images: profile.profileImage ? [profile.profileImage.url] : [],
                type: 'profile',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${profile.fullName}`,
                description: profile.bio || `Check out ${profile.fullName}'s profile on Clubbera`,
                images: profile.profileImage ? [profile.profileImage.url] : [],
            }
        }
    } catch {
        return {
            title: 'Profile Not Found | Clubbera',
            description: 'The requested profile could not be found.'
        }
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { uniqueUrl } = await params
    
    let profile
    try {
        const response = await usersServerApi.getProfileByUrl(uniqueUrl)
        console.log('Profile data:', response);
        
        profile = response.data
    } catch (error: unknown) {
        console.error('Profile fetch error:', error)

        if (error instanceof Error && error.message.includes('API Error: 404')) {
            notFound()
        }

        throw error
    }

    return <ProfilePageContent initialProfile={profile} uniqueUrl={uniqueUrl} />
}
