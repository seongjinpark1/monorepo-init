import { useTranslation } from 'next-i18next';

import { Box, Text } from '@chakra-ui/react';

import { CustomButton } from 'common/src/components';

function Home() {
  const { t } = useTranslation('common');
  return (
    <Box>
      <CustomButton />
      <Text>{t('test')}</Text>
    </Box>
  );
}
export default Home;
