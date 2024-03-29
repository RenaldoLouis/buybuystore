import http from '@/services/http';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { redirect } from 'next/navigation'

const withAuthCustom = (WrappedComponent: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        const router = useRouter();

        useEffect(() => {
            const isAuthenticated = http.getAuthToken();
            if (!isAuthenticated) {
                router.push('/'); // Redirect to login page if not authenticated
                // redirect('/');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuthCustom;