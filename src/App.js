import { Route, Switch, Redirect } from 'react-router-dom';

import Top from './pages/Top';
import Business from './pages/Business';
import Technology from './pages/Technology';
import Entertainment from './pages/Entertainment';
import MainHeader from './components/Layout/MainHeader';
import SettingProvider from './store/SettingProvider';

function App() {
  return (
    <SettingProvider>
      <MainHeader />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/categories/top' />
          </Route>
          <Route path='/categories/top' component={Top} />
          <Route path='/categories/top/:country' component={Top} />
          <Route path='/categories/business' component={Business} exact />
          <Route path='/categories/technology' component={Technology} exact />
          <Route
            path='/categories/entertainment'
            component={Entertainment}
            exact
          />
        </Switch>
      </main>
    </SettingProvider>
  );
}

export default App;
