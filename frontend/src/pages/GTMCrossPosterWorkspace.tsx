import React from 'react';

export default function GTMCrossPosterWorkspace() {
  return (
    <div className="w-full h-full min-h-[calc(100vh-64px)] bg-[#0a0a0a]">
      <iframe 
        src="/gtm-waitlist.html" 
        className="w-full h-[calc(100vh-64px)] border-none"
        title="GTM Workspace"
      />
    </div>
  );
}
