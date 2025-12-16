import { IMAGES } from "@/lib/images";
import Button from "@/components/ui/Button/Button";
import CardHeroLayout from "@/components/layout/CardHeroLayout/CardHeroLayout";
import styles from "./TopCategories.module.css";

const categories = [
    {
        vector: 'sport',
        title: "Sports & Fitness",
        color: "--color-danger-light",
        link: "/search&sports-fitness",
        description: "Join active communities focused on athletics, workouts, and outdoor activities",
    },
    {
        vector: 'marketing',
        title: "Hobbies & Passions",
        color: "--color-community-light",
        link: "/search&sports-fitness",
        description: "Explore creative groups for music, theater, visual arts, and cultural events",
    },
    {
        vector: 'tech',
        title: "Technology",
        color: "--color-event-light",
        link: "/search&sports-fitness",
        description: "Connect with tech enthusiasts, developers, and innovation-focused communities",
    },
    {
        vector: 'business',
        title: "Career & Business",
        color: "--color-default-light",
        link: "/search&sports-fitness",
        description: "Discover culinary adventures, cooking classes, and dining experiences",
    },
];

export default function TopCategories() {
    return (
        <CardHeroLayout title="Explore top categories">
            {categories.map((category, index) => (
                <div key={index} className={styles.card} style={{ backgroundColor: `var(${category.color})` }}>
                    <div className={styles.cardText}>
                        <p className={styles.cardTitle}>{category.title}</p>
                        <p className={styles.cardDescription}>{category.description}</p>
                    </div>
                    <Button variant="gray" size="small" className="self-start" as="link" href={category.link}>
                        Explore
                    </Button>

                    <div className={`${styles.vector}`}>
                        <img src={IMAGES.vectors[category.vector as keyof typeof IMAGES.vectors]} alt="group of people" />
                    </div>
                </div>
            ))}
        </CardHeroLayout>
    );
}