import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadFeedItems } from '../store/feedItem.actions.js';
import WhiteLikeIcon from '../assets/svg/white-like.svg?react';
import BlackCommentIcon from '../assets/svg/black-comment.svg?react';
import { useNavigate } from 'react-router';
import { LeftSideBar } from '../cmps/LeftSideBar.jsx';

export default function Explore() {
    const navigate = useNavigate()

    const feedItems = useSelector(storeState => storeState.feedItemModule.feedItems);

    useEffect(() => {
        loadFeedItems();
    }, []);

    function onOpenFeedItem(ev, id) {
        ev.stopPropagation()
        ev.preventDefault()
        navigate(`/p/${id}`)
    }


    return (
        <section className='explore-page'>
            <aside className="profie-left-side-bar">
                <LeftSideBar />
            </aside>
            <main className='explore-page-main'>
                <div className='explore-container'>
                    <ul className='explore-ul'>
                        {feedItems?.map((item, idx) =>
                            item.imageUrl?.map((url, i) => (
                                <li key={`${idx}-${i}`} className='explore-li'>
                                    <div className='image-overlay-container'>
                                        <img src={url}
                                            alt={`Feed item ${idx}`}
                                            onClick={(ev) => {
                                                const id = item._id
                                                onOpenFeedItem(ev, id)
                                            }}
                                        />
                                        <div className="explore-icons-overlay">
                                            <div className="icon-with-count">
                                                <WhiteLikeIcon className="explore-overlay-icon" />
                                                <span className='likes-and-comments-count'>{item?.likes?.length || 0}</span>
                                            </div>
                                            <div className="icon-with-count">
                                                <BlackCommentIcon className="explore-overlay-icon" />
                                                <span className='likes-and-comments-count'>{item?.comments?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </main>
        </section>
    );
}
