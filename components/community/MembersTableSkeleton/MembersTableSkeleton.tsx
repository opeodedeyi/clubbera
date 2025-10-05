import MemberRowSkeleton from '../MemberRowSkeleton/MemberRowSkeleton';

interface MembersTableSkeletonProps {
    tableStyles: {
        membersList: string;
        tableWrapper: string;
        table: string;
        tableHeader: string;
        tableHeaderCell: string;
        tableHeaderCellCenter: string;
        tableRow: string;
        tableCell: string;
        tableCellMuted: string;
        tableCellCenter: string;
        joinedColumn: string;
        memberInfo: string;
        memberDetails: string;
    };
    rowCount?: number;
}

export default function MembersTableSkeleton({ tableStyles, rowCount = 5 }: MembersTableSkeletonProps) {
    return (
        <div className={tableStyles.membersList}>
            <div className={tableStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <thead className={tableStyles.tableHeader}>
                        <tr>
                            <th className={tableStyles.tableHeaderCell}>Member</th>
                            <th className={`${tableStyles.tableHeaderCell} ${tableStyles.joinedColumn}`}>Joined</th>
                            <th className={tableStyles.tableHeaderCellCenter}>Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rowCount }).map((_, i) => (
                            <MemberRowSkeleton key={i} tableStyles={tableStyles} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
