'use client';

import LegalLayout from "@/components/layout/LegalLayout/LegalLayout";
import ArticleMarkdown from "@/components/Article/AtricleMarkdown/AtricleMarkdown";
import { contentModerationPolicy } from "@/lib/data/legal/contentModerationPolicy";

export default function ModerationPolicyPage() {
    return (
        <LegalLayout
            currentPage="Content Moderation & Reporting Policy"
            title="Content Moderation & Reporting Policy"
            time="Updated November 2024">
            <>
                <ArticleMarkdown article={contentModerationPolicy} />
                {/* next recommended legal */}
            </>
        </LegalLayout>
    );
}
