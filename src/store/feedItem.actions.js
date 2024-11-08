import { feedItemService } from '../services/feeditem.service'
import { store } from './store'
import { ADD_FEED_ITEM, REMOVE_FEED_ITEM, SET_FEED_ITEMS, SET_FEED_ITEM, ADD_FEED_ITEM_MSG, UPDATE_FEED_ITEM } from './feedItem.reducer'

export async function loadFeedItems() {
    try {       
        const feedItems = await feedItemService.getFeedItems()
        store.dispatch(getCmdSetFeedItems(feedItems))
    } catch (err) {
        console.log('Cannot load feedItems', err)
        throw err
    }
}

export async function loadFeedItem(feedItemId) {
    try {
        const feedItem = await feedItemService.getById(feedItemId)
        console.log('feedItem from DB:', feedItem)
        store.dispatch(getCmdSetFeedItem(feedItem))
    } catch (err) {
        console.log('Cannot load feedItem', err)
        throw err
    }
}

export async function removeFeedItem(feedItemId) {
    try {
        await feedItemService.remove(feedItemId)
        store.dispatch(getCmdRemoveFeedItem(feedItemId))
    } catch (err) {
        console.log('Cannot remove feedItem', err)
        throw err
    }
}

export async function addFeedItem(feedItem) {
    try {
        const savedFeedItem = await feedItemService.create(feedItem)
        console.log('Added feedItem', savedFeedItem)
        store.dispatch(getCmdAddFeedItem(savedFeedItem))
        
        return savedFeedItem
    } catch (err) {
        console.log('Cannot add feedItem', err)
        throw err
    }
}

export async function updateFeedItem(feedItem) {
    try {
        const savedFeedItem = await feedItemService.save(feedItem)
        console.log('Updated feedItem:', savedFeedItem)
        store.dispatch(getCmdUpdateFeedItem(savedFeedItem))
        
        return savedFeedItem
    } catch (err) {
        console.log('Cannot save feedItem', err)
        throw err
    }
}

export async function addFeedItemMsg(feedItemId, txt) {
    try {
        const msg = await feedItemService.addFeedItemMsg(feedItemId, txt)
        console.log('Added feedItem message', msg)
        store.dispatch(getCmdAddFeedItemMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add feedItem msg', err)
        throw err
    }
}

// export async function updateTask(feedItemId, groupId, task, activityTitle) {
//     try {
//         const [savedTask, activity] = await feedItemService.updateTask(feedItemId, groupId, task, activityTitle)
//         console.log('Updated task', savedTask)
//         store.dispatch(getCmdUpdateTask(groupId, task, activity))
//         return savedTask
//     } catch (err) {
//         console.log('Cannot update task', err)
//         throw err
//     }
// }

// Command Creators:
function getCmdRemoveFeedItem(feedItemId) {
    return {
        type: REMOVE_FEED_ITEM,
        feedItemId
    }
}

function getCmdAddFeedItem(feedItem) {
    return {
        type: ADD_FEED_ITEM,
        feedItem
    }
}

function getCmdUpdateFeedItem(feedItem) {
    return {
        type: UPDATE_FEED_ITEM,
        feedItem
    }
}

function getCmdSetFeedItems(feedItems) {
    return {
        type: SET_FEED_ITEMS,
        feedItems
    }
}

function getCmdSetFeedItem(feedItem) {
    return {
        type: SET_FEED_ITEM,
        feedItem
    }
}

function getCmdAddFeedItemMsg(msg) {
    return {
        type: ADD_FEED_ITEM_MSG,
        msg
    }
}

// function getCmdUpdateTask(groupId, task, activity) {
//     return {
//         type: UPDATE_TASK,
//         groupId,
//         task,
//         activity
//     }
// }

// unitTestActions()
// async function unitTestActions() {
//     await loadFeedItems()
//     await addFeedItem(feedItemService.getEmptyfeedItem())
//     await updateFeedItem({
//         _id: 'm1oC7',
//         title: 'feedItem-Good',
//     })
//     await removeFeedItem('m1oC7')
//     // TODO unit test loadfeedItem
//     // TODO unit test addfeedItemMsg
//     // TODO unit test updateTask
// }

