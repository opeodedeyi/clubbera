'use client';

import LegalLayout from "@/components/layout/LegalLayout/LegalLayout";
import ArticleMarkdown from "@/components/Article/AtricleMarkdown/AtricleMarkdown";
import { termsOfService } from "@/lib/data/legal/termsOfService";

export default function LegalTermsPage() {
    return (
        <LegalLayout
            currentPage="Terms of Service"
            title="Terms of Service"
            time="Updated October 2025">
            <>
                <ArticleMarkdown article={termsOfService} />
                {/* next recommended legal */}
            </>
        </LegalLayout>
    );
}