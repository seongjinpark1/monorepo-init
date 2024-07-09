/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
exports.module = {
  commit: {
    workspaces: ['project1', 'project2', 'native'],
  },
};
