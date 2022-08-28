import { useEffect } from 'react';
import splitbee from '@splitbee/web';

const useAnalytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      splitbee.init({
        token: process.env.NEXT_PUBLIC_SPLITBEE_TOKEN,
      });
    }
  }, []);
};

export default useAnalytics;
