/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { getTextCase } = require('../../../utils/nodejs/getTextCase');
const scriptConfig = require('../../../../tok-script.config');
const generatorConfig = scriptConfig['module']['gen:source']['page'];

const rootPath = process.env.PWD;

function getPageEtaConfig(pagePath, pageName) {
  const pageTextCase = getTextCase(pageName);
  const pageComponentName = pageTextCase.pascal + 'Page';
  const pageContentName = pageTextCase.pascal + 'PageContent';

  const outputPathPage = path.resolve(pagePath, pageName, 'index.ts');
  const outputPathComponent = path.resolve(
    rootPath,
    'src/components/elements',
    pageComponentName,
  );

  const outputPathComponentFile = path.resolve(
    outputPathComponent,
    pageComponentName + '.tsx',
  );
  const outputPathContent = path.resolve(
    outputPathComponent,
    '_fragments',
    pageContentName + '.tsx',
  );

  const templatePath = path.resolve(
    rootPath,
    'src/scripts/source-gen/templates/page',
  );

  return {
    data: {
      name: {
        page: pageName,
        element: pageComponentName,
        content: pageContentName,
        app: generatorConfig.appName || '똑똑한 개발자',
      },
      outputPath: {
        page: outputPathPage,
        element: outputPathComponent,
        elementFile: outputPathComponentFile,
        content: outputPathContent,
      },
      templatePath: {
        page: path.resolve(templatePath, 'Page.route.eta'), // will be "src/page/[name]"
        element: path.resolve(templatePath, 'Page.element.eta'), // will be "src/element/[NamePage]"
        content: path.resolve(templatePath, 'Page.content.eta'), // will be "src/element/[NamePage]/_fragments/[NamePageContent]"
      },
    },
    utils: {
      getTextCase,
    },
  };
}

module.exports = {
  getPageEtaConfig,
};
