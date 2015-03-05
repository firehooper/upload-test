Router.configure({
  controller: 'AppController',
  loadingTemplate: 'loading'
});

// Router.plugin('loading', {loadingTemplate: 'loading'});
Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});

//BrowserPolicy.content.allowConnectOrigin("*https://*.s3.amazonaws.com");
