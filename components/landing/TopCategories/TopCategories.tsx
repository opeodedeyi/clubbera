import CardHeroLayout from "@/components/layout/CardHeroLayout/CardHeroLayout";
import Button from "@/components/ui/Button/Button";
import styles from "./TopCategories.module.css";

const categories = [
    {
        title: "Sports & Fitness",
        color: "--color-danger-light",
        link: "/search&sports-fitness",
        description: "Join active communities focused on athletics, workouts, and outdoor activities",
    },
    {
        title: "Arts & Culture",
        color: "--color-community-light",
        link: "/search&sports-fitness",
        description: "Explore creative groups for music, theater, visual arts, and cultural events",
    },
    {
        title: "Technology",
        color: "--color-event-light",
        link: "/search&sports-fitness",
        description: "Connect with tech enthusiasts, developers, and innovation-focused communities",
    },
    {
        title: "Food & Drink",
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
                </div>
            ))}
        </CardHeroLayout>
    );
}