// withAuth.tsx
import http from '@/services/http';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuthCustom = (WrappedComponent: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        const router = useRouter();

        useEffect(() => {
            const isAuthenticated = http.getAuthToken(); // Implement your authentication logic
            if (!isAuthenticated) {
                router.push('/'); // Redirect to login page if not authenticated
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuthCustom;