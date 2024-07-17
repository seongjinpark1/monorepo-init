declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (value: string) => void;
    };
  }
}
export interface Locale {
  locale: 'ko' | 'en';
}

export {};
