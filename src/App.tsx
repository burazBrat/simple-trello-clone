import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BoardProvider } from "./providers/BoardProvider";
import ErrorBoundary from "./ErrorBoundary";
import { ListProvider } from "./providers/ListProvider";
import { CardProvider } from "./providers/CardProvider";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <BoardProvider>
          <ListProvider>
            <CardProvider>
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route path="/board/:idBoard">
                  <Board />
                </Route>
              </Switch>
            </CardProvider>
          </ListProvider>
        </BoardProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
