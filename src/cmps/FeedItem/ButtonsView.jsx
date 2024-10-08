import { useState } from 'react'
import Like from "../../assets/svg/like.svg?react";
import Comment from "../../assets/svg/comment.svg?react";
import Share from "../../assets/svg/share.svg?react";
import SaveIcon from "../../assets/svg/SaveIcon.svg?react";
import RedLike from "../../assets/svg/red-like.svg?react";
import PressedSaveIcon from "../../assets/svg/pressed-save-icon.svg?react";

export function ButtonsView({ feedItem, isImgDoubleClicked, onOpenFeedItem }) {

  const [isLiked,setIsLiked] = useState()
  const [isSaved,setIsSaved] = useState()

  function onChangeLike(){
    setIsLiked(prev => !prev)
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

