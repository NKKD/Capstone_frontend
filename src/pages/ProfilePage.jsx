import { useAuthenticator } from '@aws-amplify/ui-react';
import ProtectedLayout from '../components/layouts/ProtectedLayout.jsx';

export default function ProfilePage() {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    return (
        <ProtectedLayout>
            <div style={{width:'400px', margin:'auto'}}>
                <div>Name: {user.attributes.name}</div>
                <div>Email: {user.attributes.email}</div>
            </div>
        </ProtectedLayout>
    )
}