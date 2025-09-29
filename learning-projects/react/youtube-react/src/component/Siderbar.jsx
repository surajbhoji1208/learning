import React from "react";
import Menuiteme from './Menuiteme';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Example icons as SVG components (you can replace with your own icons)
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21z" />
    <path d="M9 22.5V12h6v10.5" />
  </svg>
);

const ShortsIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
    <path d="M3 9h18v6H3z" />
  </svg>
);

const SubscriptionsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20v-2a4 4 0 018 0v2" />
  </svg>
);

const ExploreIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8l-8 4 8 4-4-8z" />
  </svg>
);

const Sidebar = () => {
    const isToggleMenu = useSelector((store)=>store.app.toggleMenu)

    if(!isToggleMenu) {
        return null;
    }
  return (
    <aside className="w-60 bg-white min-h-screen border-r border-gray-200 px-2 py-4 sticky top-0">
      <nav className="flex flex-col space-y-1">
        <Link to={'/'}><Menuiteme Icon={HomeIcon} title="Home" /></Link>
        <Menuiteme Icon={ShortsIcon} title="Shorts" />
        <Menuiteme Icon={SubscriptionsIcon} title="Subscriptions" />
        <Menuiteme Icon={SubscriptionsIcon} title="Your Subscriptions" />
        <Menuiteme Icon={ExploreIcon} title="Explore" />
      </nav>
    </aside>
  );
};

export default Sidebar;
