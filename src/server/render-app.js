import { APP_NAME, APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (user = { profileId: '', _id: '' }, venues = []) =>
  `<!doctype html>
  <html>
    <head>
      <title>${APP_NAME}</title>
      <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
      <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
      <script>
        window.user = JSON.parse('${JSON.stringify(user)}');
        window.venues = JSON.parse('${JSON.stringify(venues)}');
      </script>
    </head>
    <body>
      <div class="${APP_CONTAINER_CLASS}"></div>
      <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
    </body>
  </html>
  `;

export default renderApp;
