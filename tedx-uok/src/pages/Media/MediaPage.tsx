
import PageHero from '../../components/ui/PageHero';
import Section from '../../components/ui/Section';
import EmptyState from '../../components/ui/EmptyState';

const MediaPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <PageHero
                title="Press & Media"
                description="Resources for press, media coverage, and brand assets."
            />
            <Section>
                <EmptyState
                    title="Media Kit Coming Soon"
                    message="We are compiling our official media kit and press releases. Please contact us for immediate inquiries."
                />
            </Section>
        </div>
    );
};

export default MediaPage;
