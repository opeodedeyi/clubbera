'use client';

import LegalLayout from "@/components/layout/LegalLayout/LegalLayout";
import ArticleMarkdown from "@/components/Article/AtricleMarkdown/AtricleMarkdown";
import { privacyPolicy } from "@/lib/data/legal/privacyPolicy";

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout
            currentPage="Privacy Policy"
            title="Privacy Policy"
            time="Updated November 2024">
            <>
                <ArticleMarkdown article={privacyPolicy} />
                {/* next recommended legal */}
            </>
        </LegalLayout>
    );
}
