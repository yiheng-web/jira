import React from "react";
import { useAuth } from "context/auth-context";
import './App.css'
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { FullPageError } from "components/lib";
import Errorboundary from "components/error-boundary";


function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Errorboundary fallbackRender={FullPageError}>
      {
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
      </Errorboundary>
    </div>

  );
}

export default App;
