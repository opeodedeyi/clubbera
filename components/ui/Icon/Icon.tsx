import {
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CalendarIcon,
    CautionIcon,
    ChatIcon,
    CommentIcon,
    CopyIcon,
    EditIcon,
    EditProfileIcon,
    EmojiHappyIcon,
    GalleryIcon,
    GlobeIcon,
    GroupIcon,
    HomeIcon,
    InfoIcon,
    LikeIcon,
    LikedIcon,
    LoadingEllipsisIcon,
    LocationMarkIcon,
    LockIcon,
    MailIcon,
    MetricIcon,
    ProfileIcon,
    SearchIcon,
    TickStylishIcon,
    VerticalEllipsisIcon,
    BalloonIcon,
    BinIcon,
    HeartIcon,
    HelpIcon,
    MegaphoneIcon,
    NotificationIcon,
    PlusCustomIcon,
    SignoutIcon,
    ToggleIcon,
} from './icons/';
import type { IconProps, SimpleIconProps, ComplexIconProps } from '@/types/icon';
import styles from './Icon.module.css';


const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36,
    cHeader: 28 | 22,
}

const getHoverClass = (hoverEffect?: string) => {
    switch (hoverEffect) {
        case 'opacity':
        case 'scale':
            return styles.hoverable
        case 'color':
            return styles.hoverableColor
        case 'close':
            return styles.hoverableClose
        case 'primary':
            return styles.hoverablePrimary
        case 'none':
        default:
            return ''
    }
}

export default function Icon(props: IconProps) {
    const { name, size = 'md', className = '', hover = 'none' } = props
    const iconSize = sizeMap[size]
    
    const iconClasses = [
        styles.icon,
        styles[size],
        getHoverClass(hover),
        className
    ].filter(Boolean).join(' ')
  
    // Render appropriate icon
    switch (name) {
        case 'arrowDown':
            const arrowDownProps = props as SimpleIconProps
            return (
                <ArrowDownIcon
                    size={iconSize}
                    color={arrowDownProps.color}
                    className={iconClasses}/>
            )
        case 'arrowUp':
            const arrowUpProps = props as SimpleIconProps
            return (
                <ArrowUpIcon
                    size={iconSize}
                    color={arrowUpProps.color}
                    className={iconClasses}/>
            )
        case 'arrowLeft':
            const arrowLeftProps = props as SimpleIconProps
            return (
                <ArrowLeftIcon
                    size={iconSize}
                    color={arrowLeftProps.color}
                    className={iconClasses}/>
            )
        case 'arrowRight':
            const arrowRightProps = props as SimpleIconProps
            return (
                <ArrowRightIcon
                    size={iconSize}
                    color={arrowRightProps.color}
                    className={iconClasses}/>
            )
        case 'calendar':
            const calendarProps = props as SimpleIconProps
            return (
                <CalendarIcon
                    size={iconSize}
                    color={calendarProps.color}
                    className={iconClasses}/>
            )
        case 'caution':
            const cautionProps = props as SimpleIconProps
            return (
                <CautionIcon
                    size={iconSize}
                    color={cautionProps.color}
                    className={iconClasses}/>
            )
        case 'chat':
            const chatProps = props as SimpleIconProps
            return (
                <ChatIcon
                    size={iconSize}
                    color={chatProps.color}
                    className={iconClasses}/>
            )
        case 'comment':
            const commentProps = props as SimpleIconProps
            return (
                <CommentIcon
                    size={iconSize}
                    color={commentProps.color}
                    className={iconClasses}/>
            )
        case 'copy':
            const copyProps = props as SimpleIconProps
            return (
                <CopyIcon
                    size={iconSize}
                    color={copyProps.color}
                    className={iconClasses}/>
            )
        case 'edit':
            const editProps = props as SimpleIconProps
            return (
                <EditIcon
                    size={iconSize}
                    color={editProps.color}
                    className={iconClasses}/>
            )
        case 'editProfile':
            const editProfileProps = props as SimpleIconProps
            return (
                <EditProfileIcon
                    size={iconSize}
                    color={editProfileProps.color}
                    className={iconClasses}/>
            )
        case 'emojiHappy':
            const emojiHappyProps = props as SimpleIconProps
            return (
                <EmojiHappyIcon
                    size={iconSize}
                    color={emojiHappyProps.color}
                    className={iconClasses}/>
            )
        case 'gallery':
            const galleryProps = props as SimpleIconProps
            return (
                <GalleryIcon
                    size={iconSize}
                    color={galleryProps.color}
                    className={iconClasses}/>
            )
        case 'globe':
            const globeProps = props as SimpleIconProps
            return (
                <GlobeIcon
                    size={iconSize}
                    color={globeProps.color}
                    className={iconClasses}/>
            )
        case 'group':
            const groupProps = props as SimpleIconProps
            return (
                <GroupIcon
                    size={iconSize}
                    color={groupProps.color}
                    className={iconClasses}/>
            )
        case 'home':
            const homeProps = props as SimpleIconProps
            return (
                <HomeIcon
                    size={iconSize}
                    color={homeProps.color}
                    className={iconClasses}/>
            )
        case 'info':
            const infoProps = props as SimpleIconProps
            return (
                <InfoIcon
                    size={iconSize}
                    color={infoProps.color}
                    className={iconClasses}/>
            )
        case 'like':
            const likeProps = props as SimpleIconProps
            return (
                <LikeIcon
                    size={iconSize}
                    color={likeProps.color}
                    className={iconClasses}/>
            )
        case 'liked':
            const likedProps = props as SimpleIconProps
            return (
                <LikedIcon
                    size={iconSize}
                    color={likedProps.color}
                    className={iconClasses}/>
            )
        case 'loadingEllipsis':
            const loadingEllipsisProps = props as SimpleIconProps
            return (
                <LoadingEllipsisIcon
                    size={iconSize}
                    color={loadingEllipsisProps.color}
                    className={iconClasses}/>
            )
        case 'locationMark':
            const locationMarkProps = props as SimpleIconProps
            return (
                <LocationMarkIcon
                    size={iconSize}
                    color={locationMarkProps.color}
                    className={iconClasses}/>
            )
        case 'lock':
            const lockProps = props as SimpleIconProps
            return (
                <LockIcon
                    size={iconSize}
                    color={lockProps.color}
                    className={iconClasses}/>
            )
        case 'mail':
            const mailProps = props as SimpleIconProps
            return (
                <MailIcon
                    size={iconSize}
                    color={mailProps.color}
                    className={iconClasses}/>
            )
        case 'metric':
            const metricProps = props as SimpleIconProps
            return (
                <MetricIcon
                    size={iconSize}
                    color={metricProps.color}
                    className={iconClasses}/>
            )
        case 'profile':
            const profileProps = props as SimpleIconProps
            return (
                <ProfileIcon
                    size={iconSize}
                    color={profileProps.color}
                    className={iconClasses}/>
            )
        case 'search':
            const searchProps = props as SimpleIconProps
            return (
                <SearchIcon
                    size={iconSize}
                    color={searchProps.color}
                    className={iconClasses}/>
            )
        case 'tickStylish':
            const tickStylishProps = props as SimpleIconProps
            return (
                <TickStylishIcon
                    size={iconSize}
                    color={tickStylishProps.color}
                    className={iconClasses}/>
            )
        case 'verticalEllipsis':
            const verticalEllipsisProps = props as SimpleIconProps
            return (
                <VerticalEllipsisIcon
                    size={iconSize}
                    color={verticalEllipsisProps.color}
                    className={iconClasses}/>
            )
        // Complex icons
        case 'balloon':
            const balloonProps = props as ComplexIconProps
            return (
                <BalloonIcon 
                    size={iconSize}
                    color={balloonProps.color}
                    fillColor={balloonProps.fillColor}
                    strokeColor={balloonProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'bin':
            const binProps = props as ComplexIconProps
            return (
                <BinIcon 
                    size={iconSize}
                    color={binProps.color}
                    fillColor={binProps.fillColor}
                    strokeColor={binProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'heart':
            const heartProps = props as ComplexIconProps
            return (
                <HeartIcon 
                    size={iconSize}
                    color={heartProps.color}
                    fillColor={heartProps.fillColor}
                    strokeColor={heartProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'help':
            const helpProps = props as ComplexIconProps
            return (
                <HelpIcon 
                    size={iconSize}
                    color={helpProps.color}
                    fillColor={helpProps.fillColor}
                    strokeColor={helpProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'megaphone':
            const megaphoneProps = props as ComplexIconProps
            return (
                <MegaphoneIcon 
                    size={iconSize}
                    color={megaphoneProps.color}
                    fillColor={megaphoneProps.fillColor}
                    strokeColor={megaphoneProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'notification':
            const notificationProps = props as ComplexIconProps
            return (
                <NotificationIcon 
                    size={iconSize}
                    color={notificationProps.color}
                    fillColor={notificationProps.fillColor}
                    strokeColor={notificationProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'plusCustom':
            const plusCustomProps = props as ComplexIconProps
            return (
                <PlusCustomIcon 
                    size={iconSize}
                    color={plusCustomProps.color}
                    fillColor={plusCustomProps.fillColor}
                    strokeColor={plusCustomProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'signout':
            const signoutProps = props as ComplexIconProps
            return (
                <SignoutIcon 
                    size={iconSize}
                    color={signoutProps.color}
                    fillColor={signoutProps.fillColor}
                    strokeColor={signoutProps.strokeColor}
                    className={iconClasses}/>
            )
        case 'toggle':
            const toggleProps = props as ComplexIconProps
            return (
                <ToggleIcon 
                    size={iconSize}
                    color={toggleProps.color}
                    fillColor={toggleProps.fillColor}
                    strokeColor={toggleProps.strokeColor}
                    className={iconClasses}/>
            )
        default:
            return null
    }
}