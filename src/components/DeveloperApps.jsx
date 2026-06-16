import { ExternalLink, ClipboardList, Type, KeyRound, Newspaper, SearchCode } from 'lucide-react';
import './ToolPage.css';

const APPS = [
  {
    title: 'Code Formatter',
    description: 'Format your code snippets with a simple interface supporting multiple languages and themes.',
    url: 'https://devmint-tools.vercel.app/',
    tag: 'Developer',
    icon: <ClipboardList size={22} className="text-blue-400" />
  },
  {
    title: 'Task Manager',
    description: 'Plan your day with a clean task board for creating, tracking, and completing daily to-dos.',
    url: 'https://taskmint-tools.vercel.app/',
    tag: 'Productivity',
    icon: <ClipboardList size={22} className="text-blue-400" />
  },
  {
    title: 'Word Utils',
    description: 'A handy suite of text and word utilities for quick formatting, cleanup, and content edits.',
    url: 'https://textmint.netlify.app/',
    tag: 'Text Helper',
    icon: <Type size={22} className="text-purple-400" />
  },
  {
    title: 'NewsPulse',
    description: 'Read latest headlines by category with a responsive news reader featuring bookmarks and dark mode.',
    url: 'https://getyournewspulse.netlify.app/',
    tag: 'Information',
    icon: <Newspaper size={22} className="text-amber-400" />
  },
  {
    title: 'Bing Cypress Search',
    description: 'A Cypress automation project for validating Bing search flows and end-to-end browser scenarios.',
    url: 'https://github.com/rahilshah3105/bing-cypress-search',
    tag: 'Automation',
    icon: <SearchCode size={22} className="text-rose-400" />
  },
];

export default function DeveloperApps() {
  return (
    <div className="tool-page">
      <header className="tool-header">
        <div>
          <h2 style={{ color: "#E4AE90" }}>Recommended Developer Apps</h2>
          <p style={{ color: "#E4AE90" }}>A curated list of external tools and platforms that pair nicely with DevMint.</p>
        </div>
      </header>

      <div className="custom-scrollbar">
        <div className="developer-app-grid" style={{ marginTop: '5px' }}>
          {APPS.map((app, idx) => (
            <a
              key={idx}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="developer-app-card"
            >
              <div className="developer-app-card-header">
                <div className="developer-app-card-header-left">
                  <div className="app-card-icon-wrapper">
                    {app.icon}
                  </div>
                  <div className="developer-app-card-title-group">
                    <span className="app-card-tag">
                      {app.tag}
                    </span>
                    <h3 className="developer-app-card-title">
                      {app.title}
                    </h3>
                  </div>
                </div>
                <ExternalLink size={16} className="developer-app-card-icon" />
              </div>

              <p className="developer-app-card-description">
                {app.description}
              </p>

              {/* <div className="app-card-footer">
                <span>Launch Application</span>
                <span className="arrow-transition">→</span>
              </div> */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
