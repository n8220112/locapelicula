import {Routes, Route} from "react-router-dom";

/* layouts */
import AppLayout from "./layouts/AppLayout";

/* pages */
import HomePage from "./pages/homepage/HomePage";
import MoviePage from "./pages/moviepage/MoviePage";
import MovieDetailPage from "./pages/moviedetailpage/MovieDetailPage";
import TVShowsPage from "./pages/tvshows/TVShowsPage";
import TVDetailPage from "./pages/tvdetailpage/TVDetailPage";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";

/* css */
import "./styles/App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* 메인 */}
        <Route index element={<HomePage />} />

        {/* 영화 */}
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>

        {/* TV 상세 */}

        <Route path="tv">
          <Route index element={<TVShowsPage />} />
          <Route path=":id" element={<TVDetailPage />} />
        </Route>

        {/* 기타 */}
        <Route path="mypage" element={<MyPage />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/sub" element={<subNav />}>
        {/* 메인 */}
        <Route index element={<HomePage />} />

        {/* 영화 */}
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>

        {/* TV 상세 */}

        <Route path="tv">
          <Route index element={<TVShowsPage />} />
          <Route path=":id" element={<TVDetailPage />} />
        </Route>

        {/* 기타 */}
        <Route path="mypage" element={<MyPage />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
