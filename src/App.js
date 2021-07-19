import './App.css';
import {useState} from 'react';
import {Balance} from './components/Balance.js'
import {IncomeExpenses} from './components/IncomeExpenses'
import {TransactionList} from './components/TransactionList'
import {GlobalProvider} from './context/GlobalState'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import EditTransaction from './components/EditTransaction'
import { Header } from './components/Header'
import SimpleBottomNavigation from './components/SimpleBottomNavigation';


function App() {

  const [navState, setNavState] = useState(0);

  return (
    <Router>
    <GlobalProvider>
      {/* <Header title="Home"/> */}
      <div className="container">
        <Switch>
          {/* <Route exact path="/">
            <Balance setNavState = {setNavState}/>
          </Route> */}
          <Route exact path="/">
            <IncomeExpenses setNavState = {setNavState}/>
          </Route>
          <Route path="/transactionList">
            <TransactionList setNavState = {setNavState}/>
          </Route>
          <Route path="/editTransaction/:transactionId">
            <EditTransaction setNavState = {setNavState}/>
          </Route>
        </Switch>
      </div>
      <SimpleBottomNavigation navState = {navState} setNavState = {setNavState}/>
    </GlobalProvider>
    </Router>
  );
}

export default App;
