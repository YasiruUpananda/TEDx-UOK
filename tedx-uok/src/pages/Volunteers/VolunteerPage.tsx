
import PageHero from '../../components/ui/PageHero';
import Section from '../../components/ui/Section';
import { MousePointerClick } from 'lucide-react';

const VolunteerPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <PageHero
                title="Volunteer"
                description="Join the team behind the scenes and help bring TEDxUOK to life."
            />
            <Section>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-12 rounded-2xl">
                        <h3 className="text-3xl font-bold mb-6 text-white">Call for Volunteers</h3>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            We are looking for passionate individuals to join our organizing committee and event day volunteers.
                            If you are enthusiastic about ideas worth spreading, we want you!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                            <div className="p-6 bg-black rounded-xl border border-[#1F1F1F]">
                                <h4 className="font-bold text-white mb-2">Event Operations</h4>
                                <p className="text-sm text-gray-400">Logistics, venue management, and attendee experience.</p>
                            </div>
                            <div className="p-6 bg-black rounded-xl border border-[#1F1F1F]">
                                <h4 className="font-bold text-white mb-2">Marketing & Comms</h4>
                                <p className="text-sm text-gray-400">Social media, content creation, and public relations.</p>
                            </div>
                            <div className="p-6 bg-black rounded-xl border border-[#1F1F1F]">
                                <h4 className="font-bold text-white mb-2">Technical Production</h4>
                                <p className="text-sm text-gray-400">AV support, lighting, and stage management.</p>
                            </div>
                        </div>

                        <button className="inline-flex items-center gap-2 bg-[#EB0028] text-white px-8 py-4 rounded-full font-bold hover:bg-[#cf001f] transition-all">
                            Apply Now <MousePointerClick className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default VolunteerPage;
