import ProtectedLayout from '../components/layouts/ProtectedLayout.jsx';

export default function HomePage() {

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ProtectedLayout/>
    )
}