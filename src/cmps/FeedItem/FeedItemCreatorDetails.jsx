import { Link } from "react-router-dom";
import ImageAvatars from "../ImageAvatars.jsx";
import Verified from "../../assets/svg/verified.svg?react";
import MoreOptions from '../../assets/svg/more-options-icon.svg?react'

export function FeedItemCreatorDetails({ feedItem, user }) {

  return (
    <section className="img-title-container">
      <section className="avatar-and-user-details">
        
        <section className="avatar">
          <ImageAvatars
            img={user?.imgUrl}
            avatarHeight="30px !important"
            avatarWidth="30px !important"
          />
        </section>

        <section className="home-img-title-user-details">
          <section className="home-user-title-container">
            <Link to="/" className="home-title-user-name">
              {user?.fullname}
            </Link>
            <Verified className="home-title-verified" />
            <span className="home-title-dot">.</span>
            <time className="home-posted-time">15h</time>
          </section>
        </section>
      </section>

      <section className="img-title-more-option">
        <MoreOptions className="home-more-options-icon" />
      </section>
    </section>
  )
}

