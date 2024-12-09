import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ImageAvatars from "../ImageAvatars";
import FollowsList from "./FollowsList";

export default function ProfileHeader({ feedItems, user }) {

  const [profileFeedItems, setProfileFeedItems] = useState()
  const [displayFollowersModal, setDisplayFollowersModal] = useState(false)
  const [displayFollowingModal, setDisplayFollowingModal] = useState(false)

  useEffect(() => {
    const userFeedItemsCount = feedItems.filter(feedItem => feedItem.owner._id === user._id).length;
    setProfileFeedItems(userFeedItemsCount)

  }, []);


  function onCloseModal() {
    setDisplayFollowersModal(false)
    setDisplayFollowingModal(false)
  }

  function onOpenFollowingModal(){
    setDisplayFollowingModal(true)

  }
  function onOpenFollowersModal(){
    setDisplayFollowersModal(true)

  }

  return (
    <>
      <header className="profile-main-header">
        <section className="profile-pic">
          <ImageAvatars
            img={user?.imgUrl}
            avatarHeight="150px !important"
            avatarWidth="150px !important"
          />
        </section>
        <section className="header-btns">
          <section className="profile-link-buttons">
            <span className="user-name-profile-header">{user?.username}</span>
            <Link className="profile-link-button">Edit Profile</Link>
            <Link className="profile-link-button">View Archive</Link>
          </section>
          <section className="profile-follows-lists">
            <section className="profile-follows-post">
              <span className="profile-counts">{profileFeedItems}</span>
              <span>Posts</span>
            </section>
            <section className="profile-follows" onClick={onOpenFollowersModal}>
              <span className="profile-counts">
                {user?.followers?.length}
              </span>
              <span>Followers</span>
            </section>
            {displayFollowersModal && <FollowsList user={user} onCloseModal={onCloseModal} followType={'Followers'} />}

            <section className="profile-follows" onClick={onOpenFollowingModal}>
              <span className="profile-counts">
                {user?.following?.length}
              </span>
              <span>Following</span>
            </section>
            {displayFollowingModal && <FollowsList user={user} onCloseModal={onCloseModal} followType={'Following'} />}
          </section>
        </section>
      </header>
    </>
  );
}
