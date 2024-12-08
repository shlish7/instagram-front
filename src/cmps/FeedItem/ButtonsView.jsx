import { useState } from 'react'
import { useSelector } from 'react-redux'
import Like from "../../assets/svg/like.svg?react";
import CommentIcon from "../../assets/svg/comment.svg?react";
import ShareIcon from "../../assets/svg/share.svg?react";
import SaveIcon from "../../assets/svg/SaveIcon.svg?react";
import RedLike from "../../assets/svg/red-like.svg?react";
import PressedSaveIcon from "../../assets/svg/pressed-save-icon.svg?react";
import { updateFeedItem } from '../../store/feedItem.actions';

export function ButtonsView({ feedItem, isImgDoubleClicked, onOpenFeedItem }) {

  const user = useSelector(storeState => storeState.userModule.user)

  const [isLiked, setIsLiked] = useState(feedItem?.likes?.some(like => like.userId === user?._id))
  const [isSaved, setIsSaved] = useState()

  async function onChangeLike(){
    const updatedLikes = feedItem?.likes?.some(like => like.userId === user?._id)
      ? feedItem?.likes?.filter(like => like.userId !== user?._id)
      : [...feedItem.likes, { userId: user?._id }]
      console.log('Payload:', { ...feedItem, likes: updatedLikes });

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
        <CommentIcon onClick={(ev) => { 
            const id = feedItem._id
            onOpenFeedItem(ev, id) 
          }}/>
        <ShareIcon />
      </section>
      
      <section className="feed-item-img-save-icon">
        {isSaved ? <PressedSaveIcon onClick={onSaveItem} /> : <SaveIcon onClick={onSaveItem} />}
      </section>
    </section>
  )
}

