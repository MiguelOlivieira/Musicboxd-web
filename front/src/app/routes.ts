import { createBrowserRouter, redirect } from "react-router";
import { AppLayout } from "./components/Layout";
import { HomePage } from "./pages/Home";
import { ProfilePage } from "./pages/Profile";
import { AlbumPage } from "./pages/Album";
import { EditAlbumPage } from "./pages/EditAlbum";
import { CommunityPage } from "./pages/Community";
import { DiaryPage } from "./pages/Diary";
import { AuthLayout } from "./components/AuthLayout";
import { LoginPage } from "./pages/Login";
import { SearchPage } from "./pages/Search";
import { CreateReviewPage } from "./pages/CreateReview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "search", Component: SearchPage },
      { path: "profile", Component: ProfilePage },
      { path: "album/:id", Component: AlbumPage },
      { path: "album/:id/edit", Component: EditAlbumPage },
      { path: "album/:id/review", Component: CreateReviewPage },
      { path: "community", Component: CommunityPage },
      { path: "diary", Component: DiaryPage },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { index: true, loader: () => redirect("/auth/login") },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: LoginPage },
    ]
  }
]);