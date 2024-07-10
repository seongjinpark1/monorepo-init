import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import HomeLayout from '@/components/@Layout/HomeLayout';
import Home from '@/containers/Home';
import withHomePageProvider from '@/hocs/withHomePageProvider';

import { Locale } from '@/types/global';

function HomePage() {
  return (
    <>
      {/* output: 똑똑한 개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="메인" />
      <HomeLayout content={<Home />} />
    </>
  );
}

export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default withHomePageProvider(HomePage);
