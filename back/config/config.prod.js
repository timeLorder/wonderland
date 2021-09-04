/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  const mongoose = {
    client: {
      options: {
        auth: {
          authSource: 'admin',
        },
      },
    },
  };

  return {
    ...config,
    mongoose,
  };
};
