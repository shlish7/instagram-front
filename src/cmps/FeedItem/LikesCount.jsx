
export function LikesCount({ feedItem }) {
  
  return (
    <section className="like-count-container">
      <span>{feedItem.likesCount}</span>
      <span>likes</span>
    </section>
  )
}

 