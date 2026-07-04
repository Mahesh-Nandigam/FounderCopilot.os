import React, { useState } from 'react';
import { useAppStore } from '../store';
import { generateCampaignContent, publishToWebhook } from '../lib/gtm';
import type { CampaignContent } from '../lib/gtm';
import { 
  Rocket, Linkedin, Twitter, FileText, Send, 
  Settings2, Loader2, Link2, CheckCircle2 
} from 'lucide-react';
import './GTMCrossPosterWorkspace.css';

export const GTMCrossPosterWorkspace = () => {
  const { gtm, setGtm } = useAppStore();
  
  // Input State
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Professional & Engaging');
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter' | 'blog'>('linkedin');
  
  // Result State
  const [campaign, setCampaign] = useState<CampaignContent | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  
  // Publish Status
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const allAccountsConnected = gtm.linkedinConnected && gtm.twitterConnected && gtm.instagramConnected;

  const handleConnectAccounts = () => {
    // Simulate OAuth connection success for the hackathon demo
    setGtm({
      linkedinConnected: true,
      twitterConnected: true,
      instagramConnected: true
    });
  };

  const handleGenerate = async () => {
    if (!topic || !audience) return;
    setIsGenerating(true);
    setPublishStatus('idle');
    try {
      const content = await generateCampaignContent(topic, audience, tone);
      setCampaign(content);
      
      // If AI suggests an image, generate it via Pollinations
      if (content.imagePrompt) {
        const encodedPrompt = encodeURIComponent(content.imagePrompt);
        setGeneratedImageUrl(`https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true`);
      } else {
        setGeneratedImageUrl(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate campaign. Check API keys.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!campaign) return;
    setIsPublishing(true);
    try {
      await publishToWebhook(campaign, generatedImageUrl);
      
      // Play satisfying success sound
      try {
        const audio = new Audio('/sounds/success.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed', e));
      } catch (e) {}

      setPublishStatus('success');
    } catch (err) {
      console.error(err);
      setPublishStatus('error');
      alert("Failed to publish to webhook.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!allAccountsConnected) {
    return (
      <div className="gtm-workspace">
        <div className="gtm-header">
          <div>
            <h2><Rocket size={24} className="text-blue-500" /> GTM Cross-Poster</h2>
            <p>Deploy AI-optimized content across all channels simultaneously.</p>
          </div>
        </div>
        <div className="gtm-connect-wall">
          <div className="gtm-connect-content">
            <Link2 size={48} className="text-gray-400 mx-auto" />
            <h3>Connect Your Accounts</h3>
            <p>To use the Cross-Poster, you must first authorize FounderCopilot to publish on your behalf.</p>
            <button className="gtm-connect-btn" onClick={handleConnectAccounts}>
              Connect LinkedIn, X & Instagram
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gtm-workspace">
      <div className="gtm-header">
        <div>
          <h2><Rocket size={24} className="text-blue-500" /> GTM Cross-Poster</h2>
          <p>Deploy AI-optimized content across all channels simultaneously.</p>
        </div>
        <div className="gtm-status-pills">
          <div className="gtm-pill connected"><CheckCircle2 size={14}/> LinkedIn Connected</div>
          <div className="gtm-pill connected"><CheckCircle2 size={14}/> X Connected</div>
        </div>
      </div>

      <div className="gtm-main-layout">
        {/* Left Form Panel */}
        <div className="gtm-panel">
          <h3><Settings2 size={18} /> Campaign Setup</h3>
          
          <div className="gtm-form-group">
            <label>What are we announcing?</label>
            <textarea 
              className="gtm-input" 
              rows={3} 
              placeholder="e.g., We just launched FounderCopilot 2.0 with new AI features..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="gtm-form-group">
            <label>Target Audience</label>
            <input 
              type="text" 
              className="gtm-input" 
              placeholder="e.g., Tech Founders, VCs, Developers"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div className="gtm-form-group">
            <label>Brand Tone</label>
            <select 
              className="gtm-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional & Engaging">Professional & Engaging</option>
              <option value="Bold & Disruptive (Edgy)">Bold & Disruptive (Edgy)</option>
              <option value="Inspirational & Visionary">Inspirational & Visionary</option>
              <option value="Technical & Analytical">Technical & Analytical</option>
            </select>
          </div>

          <button 
            className="gtm-generate-btn"
            onClick={handleGenerate}
            disabled={isGenerating || !topic || !audience}
          >
            {isGenerating ? (
              <><Loader2 size={18} className="animate-spin" /> Crafting Campaign...</>
            ) : (
              <><Rocket size={18} /> Generate Posts</>
            )}
          </button>
        </div>

        {/* Right Output Panel */}
        <div className="gtm-panel">
          {isGenerating ? (
            <div className="gtm-loading-container">
              <Loader2 size={40} className="gtm-loading-spinner" />
              <p>Analyzing topic and generating multi-platform content...</p>
            </div>
          ) : campaign ? (
            <>
              <div className="gtm-tabs">
                <button 
                  className={`gtm-tab ${activeTab === 'linkedin' ? 'active' : ''}`}
                  onClick={() => setActiveTab('linkedin')}
                >
                  <Linkedin size={16} /> LinkedIn
                </button>
                <button 
                  className={`gtm-tab ${activeTab === 'twitter' ? 'active' : ''}`}
                  onClick={() => setActiveTab('twitter')}
                >
                  <Twitter size={16} /> Twitter (X)
                </button>
                <button 
                  className={`gtm-tab ${activeTab === 'blog' ? 'active' : ''}`}
                  onClick={() => setActiveTab('blog')}
                >
                  <FileText size={16} /> Company Blog
                </button>
              </div>

              <div className="gtm-output-area">
                <div className="gtm-post-preview">
                  {activeTab === 'linkedin' && campaign.linkedin}
                  {activeTab === 'twitter' && campaign.twitter}
                  {activeTab === 'blog' && campaign.blog}
                </div>

                {generatedImageUrl && (
                  <div>
                    <h4 style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Generated Media</h4>
                    <img src={generatedImageUrl} alt="Campaign Media" className="gtm-generated-image" />
                  </div>
                )}
              </div>

              <div className="gtm-actions">
                {publishStatus === 'success' ? (
                  <button className="gtm-publish-btn" style={{ background: '#10b981' }} disabled>
                    <CheckCircle2 size={18} /> Successfully Published!
                  </button>
                ) : (
                  <button 
                    className="gtm-publish-btn"
                    onClick={handlePublish}
                    disabled={isPublishing}
                  >
                    {isPublishing ? (
                      <><Loader2 size={18} className="animate-spin" /> Publishing...</>
                    ) : (
                      <><Send size={18} /> Publish to All Platforms</>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="gtm-loading-container" style={{ opacity: 0.5 }}>
              <Rocket size={48} />
              <p>Your generated campaign will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
