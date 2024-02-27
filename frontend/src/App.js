import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./Pages/RootPage/RootLayout";
import HomeLayout from "./Pages/HomePage/HomeLayout";
import BlogLayout from "./Pages/BlogPage/BlogLayout";
import ErrorLayout from "./Pages/ErrorPage/ErrorLayout";
import StudioLayout from "./Pages/StudioPage/StudioLayout";
import AuthLayout from "./Pages/StudioPage/AuthPage/AuthLayout";
import UserBlogLayout from "./Pages/StudioPage/MyStudioPage/UserBlogLayout";
import CreateBlogLayout from "./Pages/StudioPage/MyStudioPage/CreateBlogLayout";

// loader
import { blogslodaer } from "./Pages/BlogPage/BlogLayout";
import BlogContent, {
  BlogContentLoader,
} from "./Pages/BlogContentPage/BlogContent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<ErrorLayout />}
      id="blogs"
      loader={blogslodaer}>
      <Route index element={<HomeLayout />} />
      <Route path="blogs">
        <Route index element={<BlogLayout />} />
        <Route
          path=":blogid"
          element={<BlogContent />}
          loader={BlogContentLoader}
        />
      </Route>

      <Route path="studio" element={<StudioLayout />}>
        <Route path="" element={<UserBlogLayout />} />
        <Route path="create" element={<CreateBlogLayout />} />
        <Route path="edit/:blogid" element={<CreateBlogLayout />} />
        <Route path="auth" element={<AuthLayout />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
