import React, { useEffect } from 'react';

/**
 * AdBanner – Google AdSense banner component
 *
 * Shows a live ad when VITE_ADSENSE_CLIENT_ID and slot are present,
 * or a styled dev-mode placeholder otherwise.
 *
 * Usage:
 *   <AdBanner
 *     slot={import.meta.env.VITE_ADSENSE_TOP_SLOT}
 *     position="top"
 *     darkMode={darkMode}
 *   />
 */
function loadAdSenseScript(client) {
  if (!client || typeof document === 'undefined') return;
  if (document.querySelector('script[data-passgen-adsense="true"]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  script.setAttribute('crossorigin', 'anonymous');
  script.setAttribute('data-passgen-adsense', 'true');
  document.head.appendChild(script);
}

export default function AdBanner() {
  return null;
}

