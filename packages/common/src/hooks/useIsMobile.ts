import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkIsMobile = /Mobi/i.test(navigator.userAgent);
    setIsMobile(checkIsMobile);
  }, []);
  return { isMobile };
};

export default useIsMobile;
