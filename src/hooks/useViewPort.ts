import { useEffect, useState } from 'react';

const MOBILE = 576;
const TABLET = 768;
const DESKTOP = 992;
export const useViewPort = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const isDesktop = width >= DESKTOP;
  const isTablet = TABLET <= width && width < DESKTOP;
  const isLgMobile = MOBILE <= width && width < TABLET;
  const isMobile = width < MOBILE;

  return { isMobile, isLgMobile, isTablet, isDesktop, width };
};
