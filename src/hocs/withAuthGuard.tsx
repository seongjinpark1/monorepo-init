import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '@features/store'

export default function withAuthGuard(AppComponent: NextPage<AppProps>) {
  return function WrappedAppComponent(props: AppProps) {
    const router = useRouter();
    const { isLogin } = useSelector((state: AppState) => state.USER);

    useEffect(() => {
      if (isLogin === false)
        router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
    }, [isLogin]);

    return isLogin !== true ? <></> : <AppComponent {...props} />
  }
}
