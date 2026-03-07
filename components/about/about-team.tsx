import Image from "next/image";
import Link from "next/link";
import XIcon from "@/components/x";
import LinkedinIcon from "../linkedin";

const TEAM_MEMBERS = [
  {
    name: "Josiah Dennis",
    role: "Chief Executive Officer (CEO)",
    image: "/assets/ceo.png",
    linkedin:
      "https://www.linkedin.com/in/josiah-dennis-b4b3aa233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    x: "https://x.com/BrainManiac_",
  },
  {
    name: "Benedict Benedict",
    role: "Chief Business Officer (CBO)",
    image: "/assets/cbo.png",
    linkedin:
      "https://www.linkedin.com/in/edidiongabasi-benedict-903773117?trk=contact-info",
    x: "https://x.com/eddybenbenjnr?s=21",
  },
  {
    name: "Paul Kalu",
    role: "Chief Technical Officer (CTO)",
    image: "/assets/cto.png",
    linkedin: "https://www.linkedin.com/in/paul-joseph-kaka-765217228/",
    x: "#",
  },
  {
    name: "Blessing Idowu",
    role: "Chief Design Officer (CDO)",
    image: "/assets/cdo.png",
    linkedin: "https://www.linkedin.com/in/blessing-idowu-949720242/",
    x: "https://x.com/blessIngIdowuj",
  },
];

export function AboutTeam() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <div className="inline-block border border-[#D1D5DB] bg-white rounded-full px-3 py-1 text-lg font-medium text-[#5A5F73] mb-4 tracking-wide shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            Leadership Team
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-[#111528]">
            Meet the people behind the work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-full aspect-3/4 bg-gray-100 rounded-2xl overflow-hidden relative mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-2xl font-medium text-[#111528]">
                {member.name}
              </h3>
              <p className="text-lg text-[#5A5F73] mb-3">{member.role}</p>

              <div className="flex items-center gap-3">
                <Link
                  target="_blank"
                  href={member.linkedin}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <LinkedinIcon />
                </Link>
                <Link
                  target="_blank"
                  href={member.x}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <div className="">
                    <XIcon size={20} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
