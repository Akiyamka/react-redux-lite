import React from 'react';

/* Components */
import LogoutButton from 'Components/business/LogoutButton';
import Router, { RouteMenu } from 'Components/business/Router';
import Header from 'Components/ui/Header';
import BaseLayout from 'Components/ui/BaseLayout';

/* Application Configs */
import routeConfig from 'Config/routesConfig';

function App() {
  return (
    <>
      <Header
        title={'test'}
        menu={<RouteMenu config={routeConfig} />}
      >
        <LogoutButton />
      </Header>

      <BaseLayout>
        <Router config={routeConfig} />
      </BaseLayout>
    </>
  );
}

export default App;