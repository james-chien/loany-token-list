const { version } = require('../package.json');
const goerli = require('./tokens/goerli.json');
const bridgeUtils = require('@uniswap/token-list-bridge-utils');

module.exports = function buildList() {
    const parsed = version.split('.');
    const l1List = {
      name: 'Loany',
      timestamp: new Date().toISOString(),
      version: {
        major: +parsed[0],
        minor: +parsed[1],
        patch: +parsed[2],
      },
      tags: {},
      logoURI: 'https://raw.githubusercontent.com/james-chien/loany-token-list/main/assets/lny.png',
      keywords: ['loany', 'defi'],
      tokens: [...goerli]
        // sort them by symbol for easy readability
        .sort((t1, t2) => {
          if (t1.chainId === t2.chainId) {
            return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
          }
          return t1.chainId < t2.chainId ? -1 : 1;
        }),
    };
    return bridgeUtils.chainify(l1List);
};
