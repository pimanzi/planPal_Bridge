import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/ApplicationLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { DarkModeContext } from './contexts/DarkModeProvider';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Tasks = lazy(() => import('./pages/Tasks'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <DarkModeContext>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Suspense
            fallback={
              <div className="bg-[var(--color-grey-0)] flex justify-center items-center h-screen">
                <div className="spinner"></div>
              </div>
            }
          >
            {' '}
            <Routes>
              <Route element={<AppLayout></AppLayout>}>
                <Route
                  index
                  element={<Navigate replace to="home"></Navigate>}
                ></Route>
                <Route element={<Home></Home>} path="home"></Route>
                <Route element={<Tasks></Tasks>} path="tasks"></Route>
              </Route>
              <Route element={<PageNotFound></PageNotFound>} path="*"></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '700px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-bg-main)',
              color: 'var(--color-text-main)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeContext>
  );
}

export default App;
