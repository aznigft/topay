import './App.css';
import {useState} from 'react';
import {Balance} from './components/Balance.js'
import {IncomeExpenses} from './components/IncomeExpenses'
import {TransactionList} from './components/TransactionList'
import {GlobalProvider} from './context/GlobalState'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import EditTransaction from './components/EditTransaction'
import { Header } from './components/Header'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import SimpleBottomNavigation from './components/SimpleBottomNavigation';
import { createBrowserHistory } from "history";


function App() {

  const [navState, setNavState] = useState(0);
  const history = createBrowserHistory()


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
          <Route path="/signIn">
            <SignIn setNavState= {setNavState}/>
          </Route>
          <Route path="/signUp">
            <SignUp setNavState= {setNavState}/>
          </Route>
          <Route path="/transactionList">
            <TransactionList setNavState = {setNavState}/>
          </Route>
          <Route path="/editTransaction/:transactionId">
            <EditTransaction setNavState = {setNavState}/>
          </Route>
        </Switch>
      </div>
      {
        (history.location.pathname === "/signIn" || history.location.pathname === "/signIn")
          ? null
          : <SimpleBottomNavigation navState = {navState} setNavState = {setNavState}/>
      }
      
      
    </GlobalProvider>
    </Router>
  );
}

export default App;
