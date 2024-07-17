import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { CustomButton } from 'common/src/components';
import { useIsMobile } from 'common/src/hooks';

function Home() {
  const [device, setDevice] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const { isMobile } = useIsMobile();
  useEffect(() => {
    setUserAgent(navigator.userAgent);
    if (isMobile) {
      setDevice('모바일기기입니다.');
    } else {
      setDevice('PC로 들어왔습니다');
    }
  }, [isMobile]);

  const [webviewMsg, setWebviewMsg] = useState('');

  const handleMessage = (e: any) => {
    let event;
    try {
      event = JSON.parse(e.data);

      if (event.type === 'MESSAGE') {
        setWebviewMsg(event.payload);
      }
    } catch {
      event = e.data;
      console.log('에러');
    }
  };

  useEffect(() => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('웹에서 보내는 메시지333 ');
      // alert('웹뷰');
    }
    // window.addEventListener('message', (e) => setWebviewMsg(e?.data));
    window.addEventListener('message', handleMessage);
    document.addEventListener('message', handleMessage);
  }, []);

  return (
    <Flex direction="column" gap="10px">
      <Text>
        <b>UserAgent</b>:{userAgent}
      </Text>
      <Text>
        <b>기기종류</b>:{webviewMsg}
      </Text>
      <Text>
        <b>Pc인지 Mobile인지</b> :{device}
      </Text>
      {/* <Link href="/login">Login</Link>
      <CustomButton /> */}
      {/* <Text>project11</Text> */}
    </Flex>
  );
}
export default Home;
