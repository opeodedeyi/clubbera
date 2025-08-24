export type IconName = 
    // brands
    | 'clubbera'
    | 'clubberaGame'
    | 'clubberaHex'
    | 'clubberaOreo'
    | 'clubberaPlay'
    | 'clubberaTaiwo'
    | 'clubberaTriangle'
    | 'clubberaKehinde'
    | 'facebook'
    | 'linkedIn'
    | 'google'
    | 'instagram'
    | 'x'
    // simple
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowUp'
    | 'calendar'
    | 'caution'
    | 'chat'
    | 'comment'
    | 'copy'
    | 'edit'
    | 'editProfile'
    | 'emojiHappy'
    | 'gallery'
    | 'globe'
    | 'group'
    | 'heading'
    | 'home'
    | 'info'
    | 'like'
    | 'liked'
    | 'loadingEllipsis'
    | 'locationMark'
    | 'lock'
    | 'mail'
    | 'metric'
    | 'profile'
    | 'search'
    | 'tickStylish'
    | 'verticalEllipsis'
    | 'bold'
    | 'italic'
    | 'list'
    | 'underline'
    // complex
    | 'balloon'
    | 'bin'
    | 'megaphone'
    | 'heart'
    | 'help'
    | 'notification'
    | 'plusCustom'
    | 'toggle'
    | 'signout'
    | 'clock'
    | 'firstline'
    | 'link'

export type IconSize = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'max' | 'cHeader'

export type HoverEffect = 'none' | 'opacity' | 'scale' | 'color' | 'close' | 'primary'

interface BaseIconProps {
    name: IconName
    size?: IconSize
    className?: string
    hover?: HoverEffect
}
  
export interface SimpleIconProps extends BaseIconProps {
    name: 'arrowDown' | 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'calendar' | 'caution' | 'chat' | 'comment' | 'copy' | 'edit' | 'editProfile' | 'emojiHappy' | 'gallery' | 'globe' | 'group' | 'heading' | 'home' | 'info' | 'like' | 'liked' | 'loadingEllipsis' | 'locationMark' | 'lock' | 'mail' | 'metric' | 'profile' | 'search' | 'tickStylish' | 'verticalEllipsis' | 'bold' | 'italic' | 'list' | 'underline'
    color?: string
}
  
export interface ComplexIconProps extends BaseIconProps {
    name: 'balloon' | 'bin' | 'megaphone' | 'heart' | 'help' | 'notification' | 'plusCustom' | 'signout' | 'toggle' | 'clock' | 'firstline' | 'link'
    color?: string
    fillColor?: string
    strokeColor?: string
}

export interface BrandIconProps extends BaseIconProps {
    name: 'clubbera' | 'clubberaGame' | 'clubberaHex' | 'clubberaOreo' | 'clubberaPlay' | 'clubberaTaiwo' | 'clubberaTriangle' | 'clubberaKehinde' | 'facebook' |'google' | 'instagram' | 'linkedIn' | 'x'
    color?: string
}
  
export type IconProps = SimpleIconProps | ComplexIconProps | BrandIconProps