
import LikesList from '../LikesList.jsx';
import { useState } from 'react'

export function LikesCount({ feedItem }) {

  const [showLikesList, setShowLikeList] = useState(false)

  function onDisplayLikes(){
    setShowLikeList(prev=> !prev)
  }
  return (
    <div>
      <section className="like-count-container">
        <span>{feedItem.likes?.length}</span>
        <span onClick={onDisplayLikes}>likes</span>
      </section>
      {showLikesList &&<LikesList feedItem={feedItem} onCloseModal={onDisplayLikes} />}

    </div>

  )
}

