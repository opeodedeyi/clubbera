export const dynamic = 'force-dynamic'

import { usersServerApi  } from '@/lib/api/usersServer';
import EditProfilePage from '@/components/profile/EditProfilePage/EditProfilePage';
import ManageAccount from '@/components/layout/ManageAccount/ManageAccount';


export default async function ManageAccountDetails() {
    const response = await usersServerApi.getUserProfile();
    const userData = response.data;

    return (
        <ManageAccount>
            <EditProfilePage initialProfile={userData}/>
        </ManageAccount>
    );
}