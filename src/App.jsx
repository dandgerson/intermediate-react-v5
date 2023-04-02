import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdoptedPetContextProvider } from "./AdoptedPetContext";
import { Suspense, lazy } from "react";

const DetailsWithErrorBoundary = lazy(() =>
  import("./Details").then((module) => ({
    default: module.DetailsWithErrorBoundary,
  }))
);
const SearchParams = lazy(() =>
  import("./SearchParams").then((module) => ({ default: module.SearchParams }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContextProvider>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🐶</h2>
              </div>
            }
          >
            <header>
              <Link to="/">Adopt me!</Link>
            </header>

            <Routes>
              <Route
                path="/details/:id"
                element={<DetailsWithErrorBoundary />}
              />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </AdoptedPetContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
