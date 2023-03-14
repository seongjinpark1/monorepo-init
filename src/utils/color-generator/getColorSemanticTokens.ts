import { getColorSchema } from './getColorSchema';
import { ColorKey, ColorSchema, ColorToken } from './types';

/**
 * @brief CSS selectors 환경에 호환되는 semanticToken을 생성하는 함수입니다.
 * @see Docs https://chakra-ui.com/docs/styled-system/semantic-tokens
 * @param keyName - 대상 이름 (eg. primary, secondary..)
 * @param light  - 대상  Light Mode 색상 Hex code or Color schema object
 * @param dark  - 대상  Dark Mode 색상 Hex code or Color schema object
 * - color schema 를 정적으로 입력할 시 key값은 500이 메인 컬러이며, 필수 값 입니다.
 * - light color기준으로 Schema가 생성되므로 light key 값들은 dark mode key값들을 필수로 가지고 있어야 합니다. (Required)
 *  - case 1) colors = {light: "ffffff", dark: "eeeeee"} // success
 *  - case 2) colors = {light: "ffffff", dark: {500: '#eeeeee", 600: "#e2e2e2e"}} // success
 *  - case 3) colors = {light: {500: '#ffffff", 600: "#f2f2f2"}, dark: {500: '#eeeeee"}} // success
 *  - case 4) colors = {light: {500: '#ffffff"}, dark: {500: '#eeeeee", 600: "e2e2e2"}} // fail!!
 * @returns semantic Token schema 형태를 가지는 객체 모음으로 반환
 */

const getColorSemanticTokens = <
  KeyName extends string,
  LightScheme extends string | Partial<ColorSchema>,
  DarkScheme extends string | Partial<LightScheme>,
>(
  keyName: KeyName,
  light: LightScheme,
  dark?: DarkScheme,
): Record<string, ColorToken> => {
  const lightSchema = typeof light === 'string' ? getColorSchema(light) : light;
  const darkSchema = typeof dark === 'string' ? getColorSchema(dark) : dark;
  const keyNumbers = Object.keys(lightSchema) as unknown as ColorKey[];

  const has500 = '500' in (lightSchema as Object);
  const mainColor =
    has500 &&
    createToken({
      keyName,
      light: lightSchema[500] || 'black',
      dark: darkSchema?.[500] || lightSchema[500] || 'black',
    });

  const hasOnlyMainColor = keyNumbers.length === 1 && mainColor;
  if (hasOnlyMainColor) return mainColor;

  const semanticTokens = keyNumbers.reduce<Record<string, ColorToken>>(
    (acc, cur) => {
      const token = createToken({
        keyName: `${keyName}.${cur}`,
        light: lightSchema[cur] || 'black',
        dark: darkSchema?.[cur] || lightSchema[cur] || 'black',
      });
      return { ...acc, ...token };
    },
    mainColor || {},
  );

  return semanticTokens;
};

const createToken = <KeyName extends string>(params: {
  keyName: KeyName;
  light: string;
  dark?: string;
}): Record<KeyName, ColorToken> => {
  return {
    [params.keyName]: {
      default: params.light,
      _dark: params.dark,
    },
  } as Record<KeyName, ColorToken>;
};

export default getColorSemanticTokens;
