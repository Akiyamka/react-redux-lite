import React from 'react';

/* Components */
import Router from 'Components/business/Router';
import BaseLayout from 'Components/ui/BaseLayout';
import './style.global.styl';

/* Application Configs */
import routeConfig from 'Config/routesConfig';

function App() {
  return (
    <>
      <BaseLayout>
        <Router config={routeConfig} />
      </BaseLayout>
    </>
  );
}

export default App;