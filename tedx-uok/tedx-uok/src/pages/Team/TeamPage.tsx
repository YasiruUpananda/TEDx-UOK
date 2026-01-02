import React, { useState, useEffect } from 'react';
import { Linkedin, UserCheck, Users, UserCog } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { sharedStyles } from '../../utils/constants';
import { supabase } from '../../lib/supabase';
import { getSupabaseStorageUrl } from '../../lib/utils';
import Loading from '../../components/ui/Loading';
import { useSEO } from "../../hooks/useSEO";
interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  type: "Licensee" | "EXCO" | "Director";
  photo_url: string;
  linkedin_url?: string;
  function_area?: string;
}

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  useSEO({
    title: "Our Team - Meet the Organizers| TEDxUOK",
    description: "Discover the passionate team behind TEDxUOK, including our licensee, executive committee, and directors dedicated to bringing inspiring ideas to life."
  })

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {

    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching team members:", error);
      } else {
        const teamBucket =
          (import.meta.env.VITE_SUPABASE_BUCKET_TEAM_PHOTOS as string) ||
          "team-photos";
        const mappedMembers: TeamMember[] = (data || []).map((m: any) => ({
          id: m.team_member_id?.toString() || "",
          full_name: m.full_name,
          role: m.role || "",
          type: (m.type as TeamMember["type"]) || "Director",
          photo_url: m.photo_url
            ? (String(m.photo_url).startsWith('http') || String(m.photo_url).startsWith('/')
              ? String(m.photo_url)
              : getSupabaseStorageUrl(teamBucket, String(m.photo_url)))
            : '',
          linkedin_url: m.linkedin_url,
          function_area: m.function_area,
        }));
        setTeamMembers(mappedMembers);
      }

      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const licensees = teamMembers.filter((member) => member.type === "Licensee");
  const executiveCommittee = teamMembers.filter(
    (member) => member.type === "EXCO"
  );
  const directors = teamMembers.filter((member) => member.type === "Director");

  const getTeamTypeStyles = (type: string) => {
    switch (type) {
      case "Licensee":
        return {
          borderColor: 'border-[#EB0028]',
          bgGradient: 'from-[#EB0028]/10 to-[#EB0028]/5',
          accentColor: 'text-[#EB0028]',
          icon: <UserCheck className="w-6 h-6 text-[#EB0028]" />
        };
      case "EXCO":
        return {
          borderColor: 'border-[#EB0028]',
          bgGradient: 'from-[#EB0028]/10 to-[#EB0028]/5',
          accentColor: 'text-[#EB0028]',
          icon: <Users className="w-6 h-6 text-[#EB0028]" />
        };
      case "Director":
        return {
          borderColor: 'border-[#EB0028]',
          bgGradient: 'from-[#EB0028]/10 to-[#EB0028]/5',
          accentColor: 'text-[#EB0028]',
          icon: <UserCog className="w-6 h-6 text-[#EB0028]" />
        };
      default:
        return {
          borderColor: "border-gray-600",
          bgGradient: "from-gray-600/10 to-gray-800/5",
          accentColor: "text-gray-400",
          icon: <UserCog className="w-6 h-6" />,
        };
    }
  };

  const renderTeamSection = (
    title: string,
    members: TeamMember[],
    trackNumber: string,
    type: string
  ) => (
    <section
      className="mb-20"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className={`${sharedStyles.typography.trackLabel} mb-2`}>
            {trackNumber}
          </p>
          <h2
            id={`${title.toLowerCase().replace(/\s+/g, "-")}`}
            className={`${sharedStyles.typography.sectionTitle} flex items-center gap-3`}
          >
            <span className="text-2xl">{getTeamTypeStyles(type).icon}</span>
            {title}
          </h2>
        </div>
      </div>

      <div className={sharedStyles.layout.gridThreeCol}>
        {members.map((member, index) => {
          const typeStyles = getTeamTypeStyles(member.type);
          return (
            <article
              key={member.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl bg-gradient-to-br ${typeStyles.bgGradient} ${typeStyles.borderColor} border-2 hover:border-opacity-80 transition-all duration-300 group`}
            >
              <div
                className={`${sharedStyles.card.imageContainer} relative overflow-hidden`}
              >
                <img
                  src={member.photo_url}
                  alt={member.full_name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x500/e8e2dc/666666?text=No+Image";
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                />
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${member.full_name} LinkedIn profile`}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
              <div className={`${sharedStyles.card.content} space-y-1`}>
                <h3
                  className={`${sharedStyles.typography.cardTitle} flex items-center gap-2`}
                >
                  <span>{member.full_name}</span>
                </h3>
                <p className={sharedStyles.typography.cardSubtitle}>
                  {member.role}
                </p>
                {member.function_area && (
                  <p className={`${typeStyles.accentColor} font-medium`}>
                    {member.function_area}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className={sharedStyles.layout.heroSection}>
        <div
          className={`${sharedStyles.layout.heroContainer} ${sharedStyles.layout.heroFlex}`}
        >
          <div>
            <h1 className={sharedStyles.typography.brandTitle}>
              <span className={sharedStyles.colors.tedxRed}>
                TED<sup>x</sup>
              </span>
              <span className="text-white"> UoK</span>
            </h1>
            <h2
              className={`${sharedStyles.typography.heroTitle} text-white mt-5`}
            >
              Team
            </h2>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-[#EB0028] to-transparent"></div>
          </div>

          <div className={sharedStyles.layout.heroAside}>
            <p className={sharedStyles.typography.heroDescriptionDark}>
              Meet the licensee, executive committee, and directors who shape
              TED<sup>x</sup> UoK.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent max-w-7xl mx-auto" />

      {/* Team Sections */}
      <section className={sharedStyles.layout.contentSection}>
        <div className={sharedStyles.layout.pageStack}>
          {licensees.length > 0 &&
            renderTeamSection("Licensee", licensees, "TEAM 01", "Licensee")}
          {executiveCommittee.length > 0 &&
            renderTeamSection(
              "Executive Committee",
              executiveCommittee,
              "TEAM 02",
              "EXCO"
            )}
          {directors.length > 0 &&
            renderTeamSection("Directors", directors, "TEAM 03", "Director")}
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
