import './App.css';
import {useState} from 'react';
import {IncomeExpenses} from './components/IncomeExpenses'
import {TransactionList} from './components/TransactionList'
import {GlobalProvider} from './context/GlobalState'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import EditTransaction from './components/EditTransaction'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ProtectedRoute from './services/ProtectedRoute'


function App() {
  const [navState, setNavState] = useState(0);

  return (
    <Router>
      <GlobalProvider>
          <Switch>
            <ProtectedRoute exact path="/" component={IncomeExpenses} setNavState = {setNavState} navState={navState} />
            <Route path="/signIn">
              <SignIn setNavState= {setNavState}/>
            </Route>
            <Route path="/signUp" >
              <SignUp setNavState= {setNavState}/>
            </Route>
            <ProtectedRoute path="/transactionList" component={TransactionList} setNavState = {setNavState} navState={navState} />
            <ProtectedRoute path="/editTransaction/:transactionId" component={EditTransaction} setNavState = {setNavState} navState={navState} />
          </Switch>
      </GlobalProvider>
    </Router>
  );
}

export default App;
