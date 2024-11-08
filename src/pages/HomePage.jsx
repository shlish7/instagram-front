import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LeftSideBar } from "../cmps/LeftSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import AvatarsStoryView from "../cmps/Story/AvatarsStoryView";
import { FeedItem } from "../cmps/FeedItem/FeedItem";
import { RightSideBar } from '../cmps/RightSideBar.jsx';
import { loadUsers } from '../store/user.actions.js';
import { loadFeedItems } from '../store/feedItem.actions.js';

export function HomePage() {
  const user = useSelector(storeState => storeState.userModule.user)
  const feedItems = useSelector(storeState => storeState.feedItemModule.feedItems)

  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
    loadFeedItems()
  }, [])
  

  function onOpenFeedItem(ev, id) {
    ev.stopPropagation()
    ev.preventDefault()
    navigate(`/p/${id}`)
  }

  function handleCommentSubmit(comment) {
    console.log(comment)
    //feeditemService.save()
  }

  return (
    <section className="instagram-home-page">
      <header className="home-header">
        <AvatarsStoryView className="avatarr-story-view" />
      </header>

      <aside className="home-left-side-bar">
        <LeftSideBar />
      </aside>

      <main className="home-feed">
        {feedItems.map(feedItem => (
          <FeedItem
            key={feedItem._id}  
            feedItem={feedItem}
            onOpenFeedItem={onOpenFeedItem}
            handleCommentSubmit={handleCommentSubmit}
            user={user}
          />
        ))}
      </main>

      <Outlet context={{ onOpenFeedItem }} />
      <aside className="home-right-bar">
        <RightSideBar />
      </aside>
    </section>
  );
}