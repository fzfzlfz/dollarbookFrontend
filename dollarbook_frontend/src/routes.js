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
      element: <Navigate to = '/login' />
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="dashboard" />, index: true },
        { path: '/home/dashboard', element: <DashboardApp /> },
        { path: '/home/analysis', element: <AnalysisPage /> },
        { path: '/home/dollarbook', element: <BookPage /> },
        { path: '/home/profile', element: <ProfilePage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    { path: '404', element: <Page404 /> }
  ]);
  

  return routes;
}
