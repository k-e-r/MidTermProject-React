import { Route, Switch, Redirect } from 'react-router-dom';

import Top from './pages/Top';
import Business from './pages/Business';
import MainHeader from './components/Layout/MainHeader';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/categories/top' />
          </Route>
          <Route path='/categories/top'>
            <Top />
          </Route>
          <Route path='/categories/business' exact>
            <Business />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
