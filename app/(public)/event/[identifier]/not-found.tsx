import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Event Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        The event you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <Link 
                        href="/events" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Browse Events
                    </Link>
                    <div>
                        <Link 
                            href="/" 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}