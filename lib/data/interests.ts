export interface InterestCategory {
    id: string
    name: string
    interests: string[]
}

export const interestCategories: InterestCategory[] = [
    {
        id: 'technology',
        name: 'Technology',
        interests: [
            'Programming', 'Web Development', 'Mobile Development', 'AI and ML',
            'Data Science', 'Cybersecurity', 'Blockchain', 'Gaming', 'Tech Startups',
            'Software Engineering', 'DevOps', 'Cloud Computing', 'UI UX Design'
        ]
    },
    {
        id: 'career',
        name: 'Career & Business',
        interests: [
            'Entrepreneurship', 'Marketing', 'Sales', 'Finance', 'Consulting',
            'Project Management', 'Leadership', 'Networking', 'Career Development',
            'Business Strategy', 'Real Estate', 'Investing', 'Public Speaking'
        ]
    },
    {
        id: 'sports',
        name: 'Sports & Fitness',
        interests: [
            'Football', 'Basketball', 'Soccer', 'Tennis', 'Golf', 'Baseball',
            'Swimming', 'Running', 'Cycling', 'Gym and Fitness', 'Yoga', 'Boxing',
            'Martial Arts', 'Rock Climbing', 'Hiking', 'Volleyball', 'CrossFit', 'Pilates'
        ]
    },
    {
        id: 'entertainment',
        name: 'Entertainment',
        interests: [
            'Anime', 'Movies', 'TV Shows', 'Netflix', 'Stand-up Comedy',
            'Theater', 'Podcasts', 'Streaming', 'Marvel', 'DC', 'Gaming',
            'Board Games', 'Karaoke', 'Dancing', 'Magic and Illusion', 'Trivia'
        ]
    },
    {
        id: 'music',
        name: 'Music',
        interests: [
            'Pop Music', 'Rock', 'Hip Hop', 'Classical', 'Jazz', 'Electronic',
            'Country', 'R n B', 'Indie', 'Concerts', 'Music Production',
            'DJing', 'Singing', 'Playing Instruments', 'Music Festivals'
        ]
    },
    {
        id: 'creative',
        name: 'Arts & Creative',
        interests: [
            'Photography', 'Digital Art', 'Painting', 'Drawing', 'Writing',
            'Blogging', 'Creative Writing', 'Poetry', 'Graphic Design',
            'Fashion', 'Interior Design', 'Crafts', 'Sculpture', 'Film Making'
        ]
    },
    {
        id: 'lifestyle',
        name: 'Lifestyle',
        interests: [
            'Travel', 'Food', 'Cooking', 'Wine and Spirits', 'Coffee', 'Fashion',
            'Beauty', 'Home Improvement', 'Gardening', 'Meditation',
            'Wellness', 'Sustainable Living', 'Minimalism', 'Self-Improvement',  'Pet Care'
        ]
    },
    {
        id: 'social',
        name: 'Social & Community',
        interests: [
            'Volunteering', 'Community Service', 'Social Justice', 'Politics',
            'Environmental Causes', 'Animal Rights', 'Charity Work',
            'Mentoring', 'Event Planning', 'Meetups', 'Networking Events',
            'Safe Spaces', 'Support Groups', 'Community Building'
        ]
    },
    {
        id: 'demographics',
        name: 'Group Types',
        interests: [
            'New to Town', 'Young Professionals', 'Students', 'Parents',
            'Seniors', 'LGBTQ+', 'Women Only', 'Men Only', 'Mixed Groups',
            'Singles', 'Couples', 'Families'
        ]
    },
    {
        id: 'conversation',
        name: 'Discussion & Talk',
        interests: [
            'Deep Conversations', 'Casual Chat', 'Debate', 'Storytelling',
            'Current Events', 'Philosophy Talk', 'Life Experiences',
            'Mental Health Talk', 'Career Talk', 'Relationship Talk'
        ]
    },
    {
        id: 'learning',
        name: 'Learning & Education',
        interests: [
            'Languages', 'History', 'Science', 'Philosophy', 'Psychology',
            'Reading', 'Book Clubs', 'Online Courses', 'Workshops',
            'Skill Building', 'Personal Development', 'Teaching', 'Research'
        ]
    },
    {
        id: 'outdoor',
        name: 'Outdoor & Adventure',
        interests: [
            'Camping', 'Hiking', 'Rock Climbing', 'Skiing', 'Snowboarding',
            'Surfing', 'Fishing', 'Hunting', 'Backpacking', 'Mountain Biking',
            'Kayaking', 'Sailing', 'Nature Conservation', 'Geocaching'
        ]
    },
    {
        id: 'nightlife',
        name: 'Nightlife & Social',
        interests: [
            'Bars and Pubs', 'Nightclubs', 'Happy Hour', 'Wine Tasting',
            'Cocktail Making', 'Social Drinking', 'Live Music Venues',
            'Comedy Shows', 'Late Night Dining'
        ]
    }
]

export const allInterests = interestCategories.flatMap(category => category.interests)