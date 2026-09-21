import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sanitizeHandle } from '../services/handleService';
import Logo from '../components/brand/Logo';
import PortfolioView from '../components/portfolio/PortfolioView';

const SAMPLE_LINKS = [
  { title: 'My portfolio site', url: 'arthpanchani.dev' },
  { title: 'GitHub', url: 'github.com/arth40' },
  { title: 'Weekly newsletter', url: 'newsletter.arthpanchani.dev' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [handle, setHandle] = useState('');

  const claimHandle = () => {
    navigate(handle ? `/register?handle=${handle}` : '/register');
  };

  return (
    <>
      <Helmet>
        <title>Linkszar — one link for everywhere you are</title>
        <meta
          name="description"
          content="Linkszar turns your links into a single clean profile — and a short link anyone can share."
        />
        <link rel="canonical" href="https://linkszar.com/" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen w-full bg-paper flex flex-col">
        <div className="flex items-center justify-between px-6 md:px-16 py-7">
          <Logo />
          <div className="flex items-center gap-5 md:gap-9">
            <a
              href="#features"
              className="hidden sm:inline text-[14.5px] font-medium text-ink no-underline"
            >
              How it works
            </a>
            <Link
              to="/login"
              className="text-[14.5px] font-medium text-ink no-underline"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-[14.5px] font-semibold text-paper bg-ink px-5.5 py-2.5 rounded-full no-underline"
            >
              Get your link
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-14 px-6 md:px-16 py-10 flex-1">
          <div className="flex-1 flex flex-col gap-7 max-w-[560px] min-w-0">
            <div className="inline-flex items-center gap-2 bg-white border border-line px-3.5 py-1.5 rounded-full w-fit">
              <span className="w-[7px] h-[7px] rounded-full bg-ember" />
              <span className="text-[12.5px] font-semibold text-ink-70">
                Now with verified email
              </span>
            </div>

            <h1 className="font-display font-medium text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.05] m-0 tracking-tight">
              One link for
              <br />
              everywhere you are.
            </h1>

            <p className="text-[17px] sm:text-[18px] leading-[1.6] text-ink-70 m-0 max-w-[480px]">
              Linkszar turns your links into a single clean profile — and a
              short link anyone can share. Built on Firebase, made for one
              thing done well.
            </p>

            <div className="flex flex-col gap-2.5 mt-1">
              <div className="flex items-center bg-white border-[1.5px] border-ink rounded-2xl pl-5 pr-1.5 py-1.5 gap-2 w-full max-w-[460px]">
                <span className="text-[15.5px] font-medium text-mist shrink-0">
                  linkszar.com/
                </span>
                <label htmlFor="landing-handle" className="sr-only">
                  Choose your handle
                </label>
                <input
                  id="landing-handle"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(sanitizeHandle(e.target.value))}
                  placeholder="yourname"
                  className="border-none outline-none text-[15.5px] font-sans font-semibold flex-1 bg-transparent min-w-0"
                />
                <button
                  type="button"
                  onClick={claimHandle}
                  className="text-[14.5px] font-semibold text-paper bg-cobalt px-5.5 py-3 rounded-[10px] border-none cursor-pointer shrink-0"
                >
                  Claim it
                </button>
              </div>
              <p className="text-[12.5px] text-mist m-0">
                Free while linkszar is in beta. No credit card.
              </p>
            </div>
          </div>

          <div className="shrink-0 self-center">
            <div className="rounded-[36px] bg-ink p-3.5 shadow-2xl w-fit">
              <div className="rounded-[26px] overflow-hidden w-[234px] h-[506px] lg:w-[320px] lg:h-[692px]">
                <div className="w-[390px] h-[844px] overflow-hidden scale-[0.6] lg:scale-[0.82] origin-top-left">
                  <PortfolioView
                    handle="arth"
                    name="Arth Panchani"
                    about="Building linkszar, one link at a time."
                    links={SAMPLE_LINKS}
                    showFooterCta={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="grid sm:grid-cols-3 gap-5 px-6 md:px-16 pb-14">
          <div className="bg-white border border-line rounded-[20px] p-6 flex flex-col gap-2.5">
            <Icon icon="lucide:layout-panel-top" className="text-cobalt text-[22px]" />
            <p className="text-[15.5px] font-semibold m-0">
              One profile, not a maze
            </p>
            <p className="text-[13.5px] leading-[1.55] text-mist m-0">
              A single page for every link you want people to find — nothing
              to manage but that.
            </p>
          </div>
          <div className="bg-white border border-line rounded-[20px] p-6 flex flex-col gap-2.5">
            <Icon icon="lucide:link-2" className="text-cobalt text-[22px]" />
            <p className="text-[15.5px] font-semibold m-0">
              A short link worth sharing
            </p>
            <p className="text-[13.5px] leading-[1.55] text-mist m-0">
              linkszar.com/yourname — memorable enough to say out loud.
            </p>
          </div>
          <div className="bg-white border border-line rounded-[20px] p-6 flex flex-col gap-2.5">
            <Icon icon="lucide:shield-check" className="text-cobalt text-[22px]" />
            <p className="text-[15.5px] font-semibold m-0">
              Backed by Firebase
            </p>
            <p className="text-[13.5px] leading-[1.55] text-mist m-0">
              Verified email, secure auth, your data synced and yours.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 md:px-16 py-6 border-t border-line">
          <p className="text-[13px] text-mist m-0">© 2026 Linkszar</p>
        </div>
      </div>
    </>
  );
};

export default Landing;
