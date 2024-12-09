import { CommentsList } from './CommentsList.jsx'

export function CommentsIndex({feedItem}) {
  
  return (
    <section className="comments-index">
        <CommentsList feedItem={feedItem} />
    </section>

  )
}