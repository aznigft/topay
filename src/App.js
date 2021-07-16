import './App.css';
import {Header} from './components/Header'
import {Balance} from './components/Balance.js'
import {IncomeExpenses} from './components/IncomeExpenses'
import {TransactionList} from './components/TransactionList'
import {GlobalProvider} from './context/GlobalState'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import EditTransaction from './components/EditTransaction'


function App() {
  return (
    <Router>
    <GlobalProvider>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Balance />
          </Route>
          <Route path="/incomeExpenses">
            <IncomeExpenses />
          </Route>
          <Route path="/transactionList">
            <TransactionList />
          </Route>
          <Route path="/editTransaction/:transactionId">
            <EditTransaction />
          </Route>
        </Switch>
      </div>
    </GlobalProvider>
    </Router>
  );
}

export default App;
