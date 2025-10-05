import styles from './MemberRowSkeleton.module.css';

interface MemberRowSkeletonProps {
    tableStyles: {
        tableRow: string;
        tableCell: string;
        tableCellMuted: string;
        tableCellCenter: string;
        joinedColumn: string;
        memberInfo: string;
        memberDetails: string;
    };
}

export default function MemberRowSkeleton({ tableStyles }: MemberRowSkeletonProps) {
    return (
        <tr className={tableStyles.tableRow}>
            <td className={tableStyles.tableCell}>
                <div className={tableStyles.memberInfo}>
                    <div className={`skeleton ${styles.profileImage}`}></div>

                    <div className={tableStyles.memberDetails}>
                        <div className={`skeleton ${styles.memberName}`}></div>
                        <div className={`skeleton ${styles.roleBadge}`}></div>
                    </div>
                </div>
            </td>
            <td className={`${tableStyles.tableCellMuted} ${tableStyles.joinedColumn}`}>
                <div className={`skeleton ${styles.joinedDate}`}></div>
            </td>
            <td className={tableStyles.tableCellCenter}>
                <div className={`skeleton ${styles.profileLink}`}></div>
            </td>
        </tr>
    );
}
