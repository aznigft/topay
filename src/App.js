import "./App.css";
import { useState } from "react";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditTransaction from "./components/EditTransaction";
import EditTransactionRequest from "./components/EditTransactionRequest";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./services/ProtectedRoute";
import Contacts from "./components/Contacts";
import BankAccounts from "./components/BankAccounts";
import { Payments } from "./components/Payments";

function App() {
	const [navState, setNavState] = useState(0);

	return (
		<Router>
			<GlobalProvider>
				<Switch>
					<ProtectedRoute
						exact
						path="/"
						component={IncomeExpenses}
						setNavState={setNavState}
						navState={navState}
					/>
					<Route path="/signIn">
						<SignIn setNavState={setNavState} />
					</Route>
					<Route path="/signUp">
						<SignUp setNavState={setNavState} />
					</Route>
					<ProtectedRoute
						path="/payments"
						component={Payments}
						setNavState={setNavState}
						navState={navState}
					/>
					<ProtectedRoute
						path="/editTransaction/:transactionType?/:transactionId"
						component={EditTransaction}
						setNavState={setNavState}
						navState={navState}
					/>
					<ProtectedRoute
						path="/editTransactionRequest/:transactionRequestId"
						component={EditTransactionRequest}
						setNavState={setNavState}
						navState={navState}
					/>
					<ProtectedRoute
						path="/contacts"
						component={Contacts}
						setNavState={setNavState}
						navState={navState}
					/>
					<ProtectedRoute
						path="/my-profile/accounts"
						component={BankAccounts}
						setNavState={setNavState}
						navState={navState}
					/>
				</Switch>
			</GlobalProvider>
		</Router>
	);
}

export default App;
