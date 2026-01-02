
import { Link } from 'react-router-dom';
import Section from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Section className="text-center">
                <h1 className="text-9xl font-bold text-[#EB0028] mb-4">404</h1>
                <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Button variant="tedxPrimary" size="lg" asChild>
                    <Link to="/">Back to Home</Link>
                </Button>
            </Section>
        </div>
    );
};

export default NotFoundPage;
