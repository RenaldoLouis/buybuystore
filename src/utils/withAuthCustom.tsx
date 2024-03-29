import http from '@/services/http';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { redirect } from 'next/navigation'

const withAuthCustom = (WrappedComponent: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        // const router = useRouter();

        useEffect(() => {
            const isAuthenticated = http.getAuthToken(); // Implement your authentication logic
            if (!isAuthenticated) {
                // router.push('/'); // Redirect to login page if not authenticated
                redirect('/'); // Redirect to login page if not authenticated
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuthCustom;