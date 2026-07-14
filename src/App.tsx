/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import ArticlePage from './pages/ArticlePage';
import MetodologiaPage from './pages/MetodologiaPage';
import PatrociniosPage from './pages/PatrociniosPage';
import PlacePage from './pages/PlacePage';

function ErrorBoundary() {
  const error: any = useRouteError();
  return <div id="error-boundary-debug">{error?.message || error?.statusText || "Unknown error"} {error?.stack}</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/guias/:slug",
    element: <GuidePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/guias",
    element: <Navigate to="/guias/seleccion-fundadora" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/articulos/:slug",
    element: <ArticlePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/articulos",
    element: <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/lugares/:slug",
    element: <PlacePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/metodologia",
    element: <MetodologiaPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/patrocinios",
    element: <PatrociniosPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />
  }
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

