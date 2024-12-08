import { useState } from 'react'
import DragPhoto from '../assets/svg/drag-photos-icon.svg?react'
import CloseModal from '../assets/svg/close-modal-icon.svg?react'
// import CloseModal from '../assets/svg/close-btn-white.svg?react'
import BackIcon from '../assets/svg/back-icon.svg?react'
import { ImageUploader } from './Imageuploader'
import { useSelector } from 'react-redux'
import { addFeedItem } from '../store/feedItem.actions'

export function CreatePost({ onCloseModal }) {
    const [imageUrl, setImageUrl] = useState()
    const feedItems = useSelector(storeState => storeState.feedItemModule.feedItems)
    const [description, setDescription] = useState(false)
    const [btnName,setBtnName] = useState('Next')
    const [showNextBtn, setShowNextBtn] = useState(false)

    function onClickX(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onCloseModal()
    }

    function onUploaded(imgUrl) {
        setImageUrl([imgUrl])
        setShowNextBtn(true)
    }

    async function onSavePost(ev) {

        try {
            const newPost = {
                imageUrl,
                caption: description,
                tags: [],
                comments: [],
                likes: [],
                createdAt: new Date().toISOString()
            }

            await addFeedItem(newPost)

            ev.stopPropagation()
            ev.preventDefault()
            onCloseModal()

        } catch {

        }
    }

    function onMoveToWriteDescription(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        setDescription(prev => !prev)
        if (btnName==='Next') setBtnName('Share')
        
        else if(btnName==='Share'){
            onSavePost(ev)
        }
    }

    function onMoveBack(ev){
        ev.stopPropagation()
        ev.preventDefault()
        setDescription(prev => !prev)
        if (btnName==='Share') setBtnName('Next')
        else if(btnName==='Next') {
            setShowNextBtn(false)
            setImageUrl(null)
        }

    }

    function onAddDescription({target}){
        const { value } = target
        setDescription(value)
    }

    return (
        <>
            <section className="create-modal-container">

                <CloseModal className='close-modal-icon-create-post' onClick={onClickX} />

                <section className="create-post-container">
                    <section className="create-post-title-container">
                       {showNextBtn && <BackIcon className='back-icon' onClick={onMoveBack}/>}
                        <span className='create-post-title'>Create new post</span>
                        {showNextBtn &&  <button className='next-pic-create-post' onClick={onMoveToWriteDescription}>{btnName}</button>}
                    </section>
                    {
                        !imageUrl ? (
                            <section className="modal-internal-container">
                                <DragPhoto />
                                <span className='drag-photos-span'>Drag photos and videos here</span>
                                <ImageUploader onUploaded={onUploaded}  />
                            </section>
                        ) : (
                            <>
                                <section className="img-description">
                                    {/* <img src={imageUrl} alt="" className='create-post-img' /> */}
                                    { showNextBtn && <img src={imageUrl} alt="" className={description ?'create-post-img-description' : 'create-post-img'} />}
                                    {description && <textarea className='description-text-area' onChange={onAddDescription}/>}
                                </section>
                                {/* <button className="save-img-to-db-btn" onClick={onSavePost}>Save Post</button> */}
                            </>



                        )
                    }
                </section>

            </section>

        </>

    )
}

