'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IMAGES } from '@/lib/images';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { CommunityData, CommunityMember, communityApi } from '@/lib/api/communities';
import CommunityLayout from "@/components/layout/CommunityLayout/CommunityLayout";
import MembersTableSkeleton from '@/components/community/MembersTableSkeleton/MembersTableSkeleton';
import Pagination from "@/components/ui/Pagination/Pagination";
import { formatRelativeTime } from '@/lib/utils/dateFormatter';
import styles from './CommunityMembersClient.module.css';

interface CommunityMembersClientProps {
    community: CommunityData;
}

export default function CommunityMembersClient({ community }: CommunityMembersClientProps) {
    const [members, setMembers] = useState<CommunityMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [total, setTotal] = useState(0);

    const limit = 20;

    const fetchMembers = async (page: number) => {
        try {
            setLoading(true);
            setError(null);
            const offset = (page - 1) * limit;
            const response = await communityApi.getCommunityMembers(community.id, limit, offset);
            console.log(response.data)
            setMembers(response.data);
            setTotal(response.pagination.total);
            setHasMore(response.pagination.hasMore);
            setTotalPages(Math.ceil(response.pagination.total / limit));
        } catch (err) {
            setError('Failed to load community members');
            console.error('Error fetching members:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers(currentPage);
    }, [community.id, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <CommunityLayout community={community}>
            <div className={styles.container}>
                <h2>Members ({total})</h2>

                {loading && (
                    <MembersTableSkeleton tableStyles={styles} />
                )}

                {error && (
                    <div className={styles.errorState}>
                        {error}
                    </div>
                )}

                {!loading && !error && members.length === 0 && (
                    <div className={styles.emptyState}>
                        No members found.
                    </div>
                )}

                {!loading && !error && members.length > 0 && (
                    <div className={styles.membersList}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead className={styles.tableHeader}>
                                    <tr>
                                        <th className={styles.tableHeaderCell}>Member</th>
                                        <th className={`${styles.tableHeaderCell} ${styles.joinedColumn}`}>Joined</th>
                                        <th className={styles.tableHeaderCellCenter}>Profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map((member) => (
                                        <tr key={member.id} className={styles.tableRow}>
                                            <td className={styles.tableCell}>
                                                <div className={styles.memberInfo}>
                                                    <img
                                                        src={member.profileImage?.provider === 'aws-s3' ?
                                                            getS3ImageUrl(member.profileImage.key) :
                                                            member.profileImage?.key ||
                                                            IMAGES.placeholders.avatar
                                                        }
                                                        alt={member.fullName}
                                                        className={styles.profileImage} />

                                                    <div className={styles.memberDetails}>
                                                        <div className={styles.memberName}>{member.fullName}</div>
                                                        <span className={styles.roleBadgeDefault}>{member.role}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`${styles.tableCellMuted} ${styles.joinedColumn}`}>
                                                {formatRelativeTime(member.joinedAt)}
                                            </td>
                                            <td className={styles.tableCellCenter}>
                                                <Link
                                                    href={`/profile/${member.uniqueUrl}`}
                                                    className={styles.profileLink}>
                                                    Profile
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                hasMore={hasMore}
                            />
                        )}
                    </div>
                )}
            </div>
        </CommunityLayout>
    )
}