'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <h2 className="text-center">{error.message}</h2>
            <button
                className="btn btn-primary"
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}