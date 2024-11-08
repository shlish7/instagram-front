
export function LikesCount({ feedItem }) {
  
  return (
    <section className="like-count-container">
      <span>{feedItem.likes?.length}</span>
      <span>likes</span>
    </section>
  )
}

 