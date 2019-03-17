import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import RouteLink from 'Components/ui/RouteLink';
import TabsMenu from 'Components/ui/TabsMenu';

export default function CustomRouter({ className, config }) {
  return <div className={className}>
    <Router>
      <>{ config.map(n => (
        <Route key={n.link} path={n.link} component={n.component} />
      ))}</>
    </Router>
  </div>
}

export function RouteMenu({ config }) {
  return <nav>
    <Router>
      <TabsMenu>
        <>{ config.map(n => (
            n.hidden ? null : <li key={n.name}><RouteLink to={n.link}>{n.name}</RouteLink></li>
        ))}</>
      </TabsMenu>
    </Router>
  </nav>
}