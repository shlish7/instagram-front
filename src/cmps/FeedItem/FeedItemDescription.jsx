import { useState } from 'react';

export function FeedItemDescription({feedItem,user}) {
  
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() {
    setIsExpanded(true);
  }

  return (
    <section className="home-img-description-container">
      { user &&<span className="home-img-user-name">{user.username}</span> }
      <span className={`home-img-detailes ${isExpanded ? 'expanded' : ''}`}>
          {feedItem.caption}
      </span>
      
      {!isExpanded && (
        <button className="toggle-btn" onClick={toggleExpand}>
          more
        </button>
      )}
    </section>
  );
}

