import {  Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile.jsx";
import { FeedItemFullScreen } from "./pages/FeedItemFullScreen.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";

export function RootCmp() {
  return (
    <div className="instagram-app">
      {/* <AppHeader /> */}
      <main>

        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/p/:pId?" element={<FeedItemFullScreen />} />
            {/* <Route path="/stories/:userName?" element={<Stories />} /> */}
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<LoginPage />}/>

        </Routes>

      </main>
      {/* <AppFooter /> */}
    </div>
  );
}