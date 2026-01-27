import React from "react";
import { useAuth } from "context/auth-context";
import './App.css'
import { FullPageError, FullPageLoading } from "components/lib";
import Errorboundary from "components/error-boundary";

const AuthenticatedApp = React.lazy(() => import("authenticated-app"))
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"))

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Errorboundary fallbackRender={FullPageError}>
      <React.Suspense fallback={<FullPageLoading />}>
      {
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
      </React.Suspense>
      </Errorboundary>
    </div>

  );
}

export default App;
