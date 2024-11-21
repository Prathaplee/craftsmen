import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import KycDashboard from './kycDashboard'; // Import KYC Dashboard

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/kyc-dashboard" component={KycDashboard} />
          {/* Add other routes here */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
