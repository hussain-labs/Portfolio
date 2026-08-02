import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/project/:id',
    element: <ProjectDetail />
  }
]);

function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;