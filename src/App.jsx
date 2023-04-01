import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { SearchParams } from "./SearchParams";
import { DetailsWithErrorBoundary } from "./Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdoptedPetContextProvider } from "./AdoptedPetContext";

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
    <div
      className="m-0 p-0"
      style={{
        background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContextProvider>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt me!
              </Link>
            </header>

            <Routes>
              <Route
                path="/details/:id"
                element={<DetailsWithErrorBoundary />}
              />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};
