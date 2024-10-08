import { useState } from 'react'
import { Carousel } from "../Carousel.jsx";
import { ButtonsView } from './ButtonsView.jsx';
import { LikesCount } from './LikesCount.jsx';
import { FeedItemDescription } from './FeedItemDescription.jsx';
import { CommnetsView } from './CommnetsView.jsx';
import { FeedItemCreatorDetails } from './FeedItemCreatorDetails.jsx';

export function FeedItem({ feedItem, onOpenFeedItem, handleCommentSubmit, user }) {

  const [ isImgDoubleClicked, setIsImgDoubleClicked ] = useState(false);

  function onDoubleClicked() {
    setIsImgDoubleClicked(true)   
  }

  return (
      <section className="home-feed-container">
        <FeedItemCreatorDetails feedItem={feedItem} user={user}/>
        <Carousel feedItem={feedItem} onDoubleClicked={onDoubleClicked} isImgDoubleClicked={isImgDoubleClicked} fullScreen={false}/>
        <ButtonsView feedItem={feedItem} isImgDoubleClicked={isImgDoubleClicked} onOpenFeedItem={onOpenFeedItem}/>
        <LikesCount feedItem={feedItem}/>
        <FeedItemDescription feedItem={feedItem} user={user}/>
        <CommnetsView feedItem={feedItem} handleCommentSubmit={handleCommentSubmit} user={user} />
      </section>
  )
}

