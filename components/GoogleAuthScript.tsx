// components/GoogleAuthScript.tsx
import { useEffect } from 'react';

const GoogleAuthScript = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup
            const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    return null;
};

export default GoogleAuthScript;