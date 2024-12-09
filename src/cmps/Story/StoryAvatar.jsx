import React from 'react';

const StoryAvatar = ({ imgUrl, username, isSeen }) => {
  return (
    <div className={`avatar-container`}>
      <div className="avatar-border">
        <img src={imgUrl} alt={`${username}'s avatar`} className="avatar-image" />
      </div>
      <p className="username">{username}</p>
    </div>
  );
};

export default StoryAvatar;
