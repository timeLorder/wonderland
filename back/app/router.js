'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/common/status', controller.user.getStatus);
  router.post('/common/onboard', controller.user.onboard);
  router.put('/private/logout', controller.user.logout);
};
