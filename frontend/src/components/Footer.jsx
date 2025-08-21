import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-700 text-slate-400 text-xs md:text-sm text-center p-2 shadow-inner">
      <div>
        🚀 <strong>CubeSat Mission Control</strong> — v1.0
      </div>
      <div>
        Built by{" "}
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noreferrer"
          className="text-sky-400 hover:underline"
        >
          @satellite team
        </a>
      </div>
    </footer>
  );
}
export default Footer;


