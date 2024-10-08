import React, { useState } from 'react'
import DragPhoto from '../assets/svg/drag-photos-icon.svg?react'
import CloseModal from '../assets/svg/close-modal-icon.svg?react'
import { ImageUploader } from './Imageuploader'
import { feeditemService } from '../services/feeditem.service'
import { useSelector } from 'react-redux'
import { addfeedItem } from '../store/feedItem.actions'


export function CreatePost({ onCloseModal }) {
    const [imageUrl, setImageUrl] = useState()
    const feedItems = useSelector(storeState => storeState.feedItemModule.feedItems)


    function onClickX(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onCloseModal()
    }

    function onUploaded(imgUrl) {
        console.log("imgUrl: ", imgUrl)
        setImageUrl(imgUrl)
    }

    async function onSavePost(ev) {

        try {
            const newPost = {
                _id: `test now`,
                userId: 'mwut3',
                imageUrl,
                caption: `Test caption`,
                tags: null,
                comments: null,
                likesCount: null,
                createdAt: new Date().toISOString()
            }

            await addfeedItem(newPost)

            ev.stopPropagation()
            ev.preventDefault()
            onCloseModal()

        } catch {

        }
    }

    return (
        <>
            <section className="create-modal-container">

                <CloseModal className='close-modal-icon' onClick={onClickX} />

                <section className="create-post-container">

                    <span className='create-post-title'>Create new post</span>

                    {
                        !imageUrl ? (
                            <section className="modal-internal-container">
                                <DragPhoto />
                                <span className='drag-photos-span'>Drag photos and videos here</span>
                                <ImageUploader onUploaded={onUploaded} />
                            </section>
                        ) : (
                            <>
                                <img src={imageUrl} alt="" className='create-post-img' />
                                <button className="save-img-to-db-btn" onClick={onSavePost}>Save Post</button>
                            </>

                        )
                    }
                </section>

            </section>

        </>

    )
}

