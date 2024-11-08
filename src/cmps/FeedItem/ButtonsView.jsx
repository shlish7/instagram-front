import { useState } from 'react'
import Like from "../../assets/svg/like.svg?react";
import Comment from "../../assets/svg/comment.svg?react";
import Share from "../../assets/svg/share.svg?react";
import SaveIcon from "../../assets/svg/SaveIcon.svg?react";
import RedLike from "../../assets/svg/red-like.svg?react";
import PressedSaveIcon from "../../assets/svg/pressed-save-icon.svg?react";
import { updateFeedItem } from '../../store/feedItem.actions';

export function ButtonsView({ feedItem, isImgDoubleClicked, onOpenFeedItem }) {

  console.log("before feed item: ", feedItem);

  const [isLiked, setIsLiked] = useState(feedItem?.likes?.some(like => like.userId === "uid002")) // TODO: Replace with logged-in userId if he is in the likes array
  const [isSaved, setIsSaved] = useState()

  async function onChangeLike(){
    const userId = "uid002"; // TODO: Replace with logged-in userId
    const updatedLikes = feedItem.likes.some(like => like.userId === userId)
      ? feedItem.likes.filter(like => like.userId !== userId)
      : [...feedItem.likes, { userId }];
  
    const savedFeedItem = await updateFeedItem({ ...feedItem, likes: updatedLikes });
    setIsLiked(prev => !prev);
  }

  function onSaveItem(){
    setIsSaved(prev => !prev)
  }
  
  return (
    <section className="feed-item-img-icons">
      <section className="feed-item-img-icons-group">
        { isLiked || isImgDoubleClicked ? <RedLike onClick={onChangeLike}/> : <Like onClick={onChangeLike} />}
        <Comment onClick={(ev) => { 
            const id = feedItem._id
            onOpenFeedItem(ev, id) 
          }}/>
        <Share />
      </section>
      
      <section className="feed-item-img-save-icon">
        {isSaved ? <PressedSaveIcon onClick={onSaveItem} /> : <SaveIcon onClick={onSaveItem} />}
      </section>
    </section>
  )
}

