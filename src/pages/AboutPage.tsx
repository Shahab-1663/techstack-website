import React, { useState } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  CheckCircle2, 
  Send,
  MapPin,
  Briefcase
} from 'lucide-react';
import { 
  GithubIcon, 
  LinkedinIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon 
} from '../components/SocialIcons';
import { SEOHead } from '../components/SEOHead';

export function AboutPage() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    
    // Construct mailto link
    const subject = encodeURIComponent(`Inquiry from TechStack - ${contactName}`);
    const body = encodeURIComponent(`From: ${contactName} (${contactEmail})\n\nMessage:\n${contactMessage}`);
    window.location.href = `mailto:shahabsaeed1663@gmail.com?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  const skills = [
    {
      category: 'Frontend Engineering',
      icon: Code2,
      color: 'from-cyan-500 to-blue-500',
      items: ['React 18 & 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite & Webpack', 'Web APIs & DOM', 'Responsive UX/UI', 'Canvas & SVG']
    },
    {
      category: 'Backend & Systems',
      icon: Server,
      color: 'from-blue-500 to-indigo-500',
      items: ['Node.js & Express', 'Python', 'Java', 'RESTful API Design', 'Authentication & JWT', 'Microservices', 'WebSockets', 'Serverless Functions']
    },
    {
      category: 'Data & Infrastructure',
      icon: Database,
      color: 'from-indigo-500 to-purple-500',
      items: ['PostgreSQL & SQL', 'MongoDB', 'Redis Caching', 'Docker Containers', 'Git & GitHub Actions', 'Linux Environments', 'Cloud Run / GCP', 'SEO & Performance']
    }
  ];

  const projects = [
    {
      title: 'TechStack Web Portal & Tools Hub',
      role: 'Lead Architect & Full Stack Developer',
      description: 'Comprehensive developer platform featuring 20+ privacy-first client-side web tools, 4.0 university GPA calculator, and real-time formatting studios.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Web Crypto API'],
      link: 'https://github.com/Shahab-1663/techstack-website'
    },
    {
      title: 'University Academic CGPA Engine',
      role: 'Creator & Engineer',
      description: 'High-precision academic grading system supporting semester tracking, custom credit hours weighing, target GPA planning, and report generation.',
      tags: ['TypeScript', 'State Management', 'Education Tech'],
      link: '#cgpa-calc'
    },
    {
      title: 'Full Stack Cloud Applications',
      role: 'Software Engineer',
      description: 'Scalable cloud-native applications with decoupled microservices, relational databases, secure authentication, and optimized client bundles.',
      tags: ['Node.js', 'PostgreSQL', 'Docker', 'REST APIs'],
      link: 'https://github.com/Shahab-1663'
    }
  ];

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Shahab Saeed',
    'alternateName': 'Shahab Khan',
    'jobTitle': 'Full Stack Software Engineer & Web Developer',
    'email': 'shahabsaeed1663@gmail.com',
    'url': 'https://github.com/Shahab-1663',
    'sameAs': [
      'https://github.com/Shahab-1663',
      'https://www.linkedin.com/in/shahab-saeed/',
      'https://www.instagram.com/shahabk.7',
      'https://www.facebook.com/shahabk.74',
      'https://x.com/shahabk_7'
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn">
      <SEOHead
        title="About Shahab Saeed – Full Stack Web Developer & Software Engineer"
        description="Learn more about Shahab Saeed (Shahab Khan), versatile Full Stack Web Developer and creator of TechStack. View portfolio, skills, projects, and social profiles."
        keywords={['Shahab Saeed', 'Shahab Khan', 'full stack web developer', 'software engineer portfolio', 'react developer']}
        schema={authorSchema}
      />

      {/* Hero Profile Showcase */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-slate-900/90 p-8 sm:p-12 shadow-[0_0_60px_rgba(6,182,212,0.1)] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          {/* Avatar Photo */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-white/20 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face"
                alt="Shahab Saeed"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/me2.JPG';
                }}
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-lg whitespace-nowrap">
              Open to Opportunities
            </div>
          </div>

          {/* Bio text */}
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>Full Stack Software Engineer</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Shahab Saeed <span className="text-slate-400 text-2xl font-normal block sm:inline sm:text-3xl">(Shahab Khan)</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Versatile software engineer specializing in high-performance web applications, dynamic frontend architectures, and resilient backends. Passionate about creating clean, user-centric tools that solve real problems.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 font-mono pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Global / Remote
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                20 Years Old • Builder
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Contract & Full-time
              </span>
            </div>

            {/* Social Network Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
              <a
                href="https://github.com/Shahab-1663"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 hover:border-slate-600 transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @Shahab-1663</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/shahab-saeed/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 text-white text-xs font-medium border border-[#0a66c2]/40 transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://www.instagram.com/shahabk.7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-xs font-medium border border-pink-500/30 transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/shahabk.74"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-600/30 transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </a>

              <a
                href="https://x.com/shahabk_7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium border border-slate-700 transition-all shadow-sm"
              >
                <TwitterIcon className="w-4 h-4" />
                <span>X / Twitter</span>
              </a>

              <a
                href="mailto:shahabsaeed1663@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Collaborator Spotlight: Aliyan Khalid */}
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
            <img
              src="/img/me2.JPG"
              alt="Aliyan Khalid"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Aliyan Khalid</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Collaborator & Partner
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dedicated Backend Developer with expertise in Python, Java, and scalable system infrastructure.
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Co-creator on TechStack Foundation
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Technical Expertise
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A balanced toolkit combining cutting-edge frontend velocity with stable backend reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skillGroup) => {
            const Icon = skillGroup.icon;
            return (
              <div
                key={skillGroup.category}
                className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-6 space-y-4 hover:border-cyan-500/30 transition-colors shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skillGroup.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{skillGroup.category}</h3>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  {skillGroup.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Featured Work & Products
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select projects engineered by Shahab Saeed.
            </p>
          </div>
          <a
            href="https://github.com/Shahab-1663"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
          >
            View all on GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 flex flex-col justify-between space-y-4 hover:bg-slate-900/80 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 block uppercase tracking-wider">
                  {proj.role}
                </span>
                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Explore Project <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Contact Section */}
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-[#070b13] to-slate-900/80 p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Let&apos;s Build Something Incredible Together
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Have a project in mind, need technical collaboration, or want to hire? Reach out directly via the form below or email <strong className="text-white">shahabsaeed1663@gmail.com</strong>.
          </p>
        </div>

        {formSent ? (
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Opening Email Client...</h4>
            <p className="text-xs text-slate-300">
              Your inquiry has been formulated. Send the prefilled email or contact directly at shahabsaeed1663@gmail.com.
            </p>
            <button
              onClick={() => setFormSent(false)}
              className="text-xs text-cyan-400 underline mt-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 uppercase tracking-wider">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 uppercase tracking-wider">
                Message / Project Details
              </label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Tell me about your idea, scope, or inquiry..."
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500/50 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Shahab</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
