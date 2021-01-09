'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  router.get('/user/status', controller.user.getStatus);
  router.post('/user/onboard', controller.user.onboard);
  router.post('/user/logout', jwt, controller.user.logout);
  router.patch('/user/switchFollow', jwt, controller.user.switchFollow);
  router.get('/oss/config', jwt, controller.oss.getOSSConfig);

  router.get('/article/getHotList', controller.article.getHotList);
  router.get('/article/detail', controller.article.detail);
  router.post('/article/publish', jwt, controller.article.publish);
  router.post('/article/save', jwt, controller.article.saveDraft);
};
