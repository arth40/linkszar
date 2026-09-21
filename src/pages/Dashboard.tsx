import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Spinner } from '@heroui/spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '../store/userStore';
import {
  createOrUpdatePortfolio,
  getPortfolio,
} from '../services/portfolioService';
import { updateDisplayName } from '../services/userService';
import type { PortfolioLink } from '../types/portfolio';
import toastMessage from '../services/toasterService';
import Logo from '../components/brand/Logo';
import PortfolioView from '../components/portfolio/PortfolioView';

const ABOUT_MAX = 160;
const TITLE_MAX = 60;
const MAX_LINKS = 6;
const PREVIEW_SCALE = 280 / 390;

const normalizeUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const Dashboard: React.FC = () => {
  const { user, userDetails, resendVerificationEmail, refreshUser } =
    useAuthStore();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [links, setLinks] = useState<PortfolioLink[]>([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (userDetails?.name) setName(userDetails.name);
  }, [userDetails?.name]);

  const fetchData = async () => {
    if (!user?.uid) return;
    setLoading(true);
    const portfolio = await getPortfolio(user.uid);
    setAbout(portfolio?.about || '');
    setLinks(portfolio?.links || []);
    setLoading(false);
    setDirty(false);
  };

  const markDirty = () => setDirty(true);

  const addLink = () => {
    if (links.length >= MAX_LINKS) return;
    setLinks([...links, { title: '', url: '' }]);
    markDirty();
  };

  const updateLinkTitle = (value: string, index: number) => {
    const updated = [...links];
    updated[index] = { ...updated[index], title: value };
    setLinks(updated);
    markDirty();
  };

  const updateLinkUrl = (value: string, index: number) => {
    const updated = [...links];
    updated[index] = { ...updated[index], url: value };
    setLinks(updated);
    markDirty();
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
    markDirty();
  };

  const copyShareLink = async () => {
    if (!userDetails?.handle) return;
    const link = `${window.location.origin}/${userDetails.handle}`;
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
      toastMessage('success', 'Link copied');
    }
  };

  const saveChanges = async () => {
    if (about.length > ABOUT_MAX) {
      toastMessage('error', `Bio must be under ${ABOUT_MAX} characters`);
      return;
    }
    if (links.some((link) => link.title.length > TITLE_MAX)) {
      toastMessage('error', `Link titles must be under ${TITLE_MAX} characters`);
      return;
    }
    if (links.some((link) => !link.title || !link.url)) {
      toastMessage('error', 'Fill in every link before saving');
      return;
    }

    setSaving(true);
    try {
      const cleanedLinks = links.map((link) => ({
        title: link.title.trim(),
        url: normalizeUrl(link.url),
      }));

      await createOrUpdatePortfolio({ about, links: cleanedLinks }, user?.uid);

      if (userDetails && name.trim() && name.trim() !== userDetails.name) {
        await updateDisplayName(user?.uid, name.trim());
      }

      setLinks(cleanedLinks);
      setDirty(false);
      toastMessage('success', 'Changes saved');
    } finally {
      setSaving(false);
    }
  };

  const initials = (userDetails?.name || userDetails?.handle || '?')
    .slice(0, 2)
    .toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-paper">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard ~ Linkszar</title>
      </Helmet>

      <div className="min-h-screen w-full bg-paper flex flex-col">
        <div className="flex items-center justify-between px-5 md:px-10 h-[76px] shrink-0 border-b border-line bg-paper-2">
          <Logo markSize={20} wordmarkClassName="text-[17px]" />

          {userDetails?.handle && (
            <div className="hidden sm:flex items-center gap-2 bg-white border border-line rounded-full pl-4 pr-1.5 py-1.5">
              <span className="text-[13px] font-semibold text-ink-70">
                linkszar.com/{userDetails.handle}
              </span>
              <button
                type="button"
                aria-label="Copy link"
                onClick={copyShareLink}
                className="w-[30px] h-[30px] rounded-full bg-paper flex items-center justify-center cursor-pointer border-none"
              >
                <Icon icon="lucide:copy" className="text-[13px] text-ink" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            {isDirty && (
              <button
                type="button"
                onClick={saveChanges}
                disabled={saving}
                className="text-[13.5px] font-semibold text-paper bg-cobalt rounded-lg px-4 py-2.5 border-none cursor-pointer disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            )}
            {userDetails?.handle && (
              <a
                href={`/${userDetails.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-[13.5px] font-semibold text-ink bg-white border-[1.5px] border-ink rounded-lg px-4 py-2.5 no-underline"
              >
                View live
                <Icon icon="lucide:arrow-right" className="text-[13px]" />
              </a>
            )}
            <Link
              to="/account"
              aria-label="Account"
              className="w-[38px] h-[38px] rounded-full bg-ink text-paper flex items-center justify-center text-[13px] font-semibold no-underline"
            >
              {initials}
            </Link>
          </div>
        </div>

        {user && !user.emailVerified && !bannerDismissed && (
          <div className="flex items-center gap-3 px-5 md:px-10 py-3 bg-[#FDF3EC] border-b border-line">
            <Icon icon="lucide:mail-warning" className="text-ember text-[17px] shrink-0" />
            <p className="text-[13px] text-ink-70 flex-1 m-0">
              Verify your email so your linkszar goes live. Check your inbox.
            </p>
            <button
              type="button"
              onClick={resendVerificationEmail}
              className="text-[12.5px] font-semibold text-cobalt bg-transparent border-none cursor-pointer"
            >
              Resend
            </button>
            <button
              type="button"
              onClick={refreshUser}
              className="text-[12.5px] font-semibold text-ink bg-transparent border-none cursor-pointer"
            >
              I've verified
            </button>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setBannerDismissed(true)}
              className="text-mist bg-transparent border-none cursor-pointer"
            >
              <Icon icon="lucide:x" className="text-[15px]" />
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col lg:flex-row gap-8 px-5 md:px-10 py-8 overflow-hidden">
          <div className="flex-1 max-w-[760px] flex flex-col gap-6 overflow-y-auto">
            <div className="bg-white border border-line rounded-[20px] p-7 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[12px] font-semibold text-ink-70">
                  Display name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    markDirty();
                  }}
                  className="border-[1.5px] border-ink rounded-[10px] px-3.5 py-2.5 text-[14.5px] font-sans outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="about" className="text-[12px] font-semibold text-ink-70">
                  Bio
                </label>
                <textarea
                  id="about"
                  rows={2}
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                    markDirty();
                  }}
                  className="border-[1.5px] border-ink rounded-[10px] px-3.5 py-2.5 text-[14px] font-sans outline-none resize-none"
                />
                <span
                  className={`text-[11px] self-end ${about.length > ABOUT_MAX ? 'text-danger-ink' : 'text-mist'}`}
                >
                  {about.length} / {ABOUT_MAX}
                </span>
              </div>
            </div>

            <div className="bg-white border border-line rounded-[20px] p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-[15.5px] font-semibold m-0">Your links</p>
                <span className="text-[12px] text-mist">
                  {links.length} / {MAX_LINKS}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 border border-line rounded-[14px] px-3.5 py-2.5"
                  >
                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                      <input
                        type="text"
                        placeholder={`Link ${index + 1} title`}
                        value={link.title}
                        maxLength={TITLE_MAX}
                        onChange={(e) => updateLinkTitle(e.target.value, index)}
                        className="border-none outline-none bg-transparent text-[14px] font-semibold font-sans"
                      />
                      <input
                        type="text"
                        placeholder="https://"
                        value={link.url}
                        onChange={(e) => updateLinkUrl(e.target.value, index)}
                        className="border-none outline-none bg-transparent text-[12.5px] text-mist font-sans"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Remove link"
                      onClick={() => removeLink(index)}
                      className="border-none bg-transparent cursor-pointer p-1 shrink-0"
                    >
                      <Icon icon="lucide:trash-2" className="text-danger-ink text-[15px]" />
                    </button>
                  </div>
                ))}
              </div>

              {links.length < MAX_LINKS && (
                <button
                  type="button"
                  onClick={addLink}
                  className="self-start flex items-center gap-2 border-[1.5px] border-dashed border-mist rounded-xl px-4.5 py-2.5 bg-transparent cursor-pointer text-[13.5px] font-semibold text-ink-70"
                >
                  <Icon icon="lucide:plus" />
                  Add link
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3.5 shrink-0">
            <div className="flex items-center justify-between w-[280px]">
              <p className="text-[13px] font-semibold text-ink-70 m-0">
                Live preview
              </p>
              <span className="text-[11.5px] text-mist">as you save</span>
            </div>
            <div className="rounded-[32px] bg-ink p-3 shadow-lg">
              <div
                className="rounded-[22px] overflow-hidden"
                style={{
                  width: 390 * PREVIEW_SCALE,
                  height: 844 * PREVIEW_SCALE,
                }}
              >
                <div
                  className="w-[390px] h-[844px] overflow-hidden"
                  style={{
                    transform: `scale(${PREVIEW_SCALE})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <PortfolioView
                    handle={userDetails?.handle || ''}
                    name={name}
                    about={about}
                    links={links}
                    showFooterCta={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
