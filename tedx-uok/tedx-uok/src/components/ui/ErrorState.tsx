import { Button } from './Button';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}


export default function ErrorState({
    title = 'Something went wrong',
    message = 'We encountered an error while loading this content.',
    onRetry
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 mb-6 max-w-md">{message}</p>
            {onRetry && (
                <Button variant="tedxSecondary" onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </div>
    );
}
