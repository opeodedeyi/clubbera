'use client';

import LegalLayout from "@/components/layout/LegalLayout/LegalLayout";
import ArticleMarkdown from "@/components/Article/AtricleMarkdown/AtricleMarkdown";
import { cookiePolicy } from "@/lib/data/legal/cookiePolicy";

export default function CookiePolicyPage() {
    return (
        <LegalLayout
            currentPage="Cookie Policy"
            title="Cookie Policy"
            time="Updated November 2024">
            <>
                <ArticleMarkdown article={cookiePolicy} />
                {/* next recommended legal */}
            </>
        </LegalLayout>
    );
}
