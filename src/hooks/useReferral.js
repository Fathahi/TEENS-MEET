import { useState, useEffect } from 'react';

export const useReferral = () => {
  const [referredBy, setReferredBy] = useState('');

  useEffect(() => {
    // 1. Check URL for ?ref=CODE
    const urlParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlParams.get('ref');

    if (refFromUrl) {
      setReferredBy(refFromUrl);
      sessionStorage.setItem('tm_referred_by', refFromUrl);
    } else {
      // 2. Fallback to sessionStorage if URL doesn't have it
      const savedRef = sessionStorage.getItem('tm_referred_by');
      if (savedRef) {
        setReferredBy(savedRef);
      }
    }
  }, []);

  return referredBy;
};
