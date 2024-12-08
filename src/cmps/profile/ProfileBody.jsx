import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import PostsIcon from '../../assets/svg/posts-icon.svg?react'
import SavedIcon from '../../assets/svg/saved-posts-icon.svg?react'
import TaggedIcon from '../../assets/svg/tagged-icon.svg?react'
import WhiteLikeIcon from '../../assets/svg/white-like.svg?react'
import BlackCommentIcon from '../../assets/svg/black-comment.svg?react'



export default function ProfileBody({ feedItems, user, onOpenFeedItem }) {

  const [postImages, setPostImages] = useState(feedItems)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const userPosts = feedItems.filter(item => {

      return item?.owner._id === user?._id;
    });

    setPostImages(userPosts);
  }, [feedItems, user]);


  function handleTabChange(event, newValue) {
    setActiveTab(newValue)
  }

  return (
    <div>
      <section className="tabs-section">
        <Tabs value={activeTab} onChange={handleTabChange}
          className="custom-tabs"
          aria-label="profile tabs">
          <Tab className='custom-tab' icon={<PostsIcon />} iconPosition="start" label="Posts" />
          <Tab className='custom-tab' icon={<SavedIcon />} iconPosition="start" label="Saved" />
          <Tab className='custom-tab' icon={<TaggedIcon />} iconPosition="start" label="Tagged" />
        </Tabs>
      </section>
      <div className="grid-container">
        {postImages.map((post, idx) => (
          post.imageUrl.length > 0 && (
            <div key={idx} className="grid-item">
              <div className="image-overlay-container">
                <img
                  src={post.imageUrl[0]}
                  onClick={(ev) => {
                    const id = post._id
                    onOpenFeedItem(ev, id)
                  }}
                  alt={`Post ${idx} Image`}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }}
                />
                <div className="icons-overlay">
                  <WhiteLikeIcon className="overlay-icon" />
                  <span className='likes-and-comments-count'>{post?.likes?.length}</span>
                  <BlackCommentIcon className="overlay-icon" />
                  <span className='likes-and-comments-count'>{post?.comments?.length}</span>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
