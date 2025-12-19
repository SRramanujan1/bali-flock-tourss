import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import PackagesPage from '@/components/pages/PackagesPage';
import PackageDetailPage from '@/components/pages/PackageDetailPage';
import PackageCustomizerPage from '@/components/pages/PackageCustomizerPage';
import DestinationPage from '@/components/pages/DestinationPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "packages",
        element: <PackagesPage />,
      },
      {
        path: "packages/:id",
        element: <PackageDetailPage />,
      },
      {
        path: "packages/:id/customize",
        element: <PackageCustomizerPage />,
      },
      {
        path: "destination",
        element: <DestinationPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
