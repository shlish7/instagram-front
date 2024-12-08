import {  Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile.jsx";
import { FeedItemFullScreen } from "./pages/FeedItemFullScreen.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import Explore from "./pages/Explore.jsx";
import { ChatApp } from "./pages/Chat.jsx";

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
          <Route path="/:userId" element={<Profile />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/chat" element={<ChatApp />}/>

        </Routes>

      </main>
      {/* <AppFooter /> */}
    </div>
  );
}