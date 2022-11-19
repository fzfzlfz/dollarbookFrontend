import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import ProfilePage from './pages/ProfilePage';
import BookPage from './pages/BookPage';
import DashboardApp from './pages/DashboardApp';
import AnalysisPage from './pages/AnalysisPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'analysis', element: <AnalysisPage /> },
        { path: 'dollarbook', element: <BookPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ]);
  

  return routes;
}
