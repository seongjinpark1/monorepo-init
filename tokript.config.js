/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
exports.module = {
  commit: {
    workspaces: ['web', 'native'],
  },
};
