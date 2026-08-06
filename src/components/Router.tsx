import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import PackagesPage from '@/components/pages/PackagesPage';
import PackageDetailPage from '@/components/pages/PackageDetailPage';
import PackageCustomizerPage from '@/components/pages/PackageCustomizerPage';
import DestinationPage from '@/components/pages/DestinationPage';
import BookingConfirmationPage from '@/components/pages/BookingConfirmationPage';
import MyQuotesPage from '@/components/pages/MyQuotesPage';
import AboutPage from '@/components/pages/AboutPage';
import AdminPage from '@/components/pages/AdminPage';
import TermsPage from '@/components/pages/TermsPage';
import FAQPage from '@/components/pages/FAQPage';
import ContactPage from '@/components/pages/ContactPage';

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
        path: "booking-confirmation",
        element: <BookingConfirmationPage />,
      },
      {
        path: "my-quotes",
        element: <MyQuotesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
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