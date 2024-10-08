import { feeditemService } from '../services/feeditem.service'
import { store } from './store'
import { ADD_FEED_ITEM, REMOVE_FEED_ITEM, SET_FEED_ITEMS, SET_FEED_ITEM } from './feedItem.reducer'

export async function loadfeedItems() {
    try {       
        const feedItems = await feeditemService.getFeedItems()
        store.dispatch(getCmdSetfeedItems(feedItems))
    } catch (err) {
        console.log('Cannot load feedItems', err)
        throw err
    }
}

export async function loadfeedItem(feedItemId) {
    try {
        const feedItem = await feedItemService.getById(feedItemId)
        console.log('feedItem from DB:', feedItem)
        store.dispatch(getCmdSetfeedItem(feedItem))
    } catch (err) {
        console.log('Cannot load feedItem', err)
        throw err
    }
}

export async function removefeedItem(feedItemId) {
    try {
        await feedItemService.remove(feedItemId)
        store.dispatch(getCmdRemovefeedItem(feedItemId))
    } catch (err) {
        console.log('Cannot remove feedItem', err)
        throw err
    }
}

export async function addfeedItem(feedItem) {
    try {
        const savedfeedItem = await feeditemService.save(feedItem)
        console.log('Added feedItem', savedfeedItem)
        store.dispatch(getCmdAddfeedItem(savedfeedItem))
        return savedfeedItem
    } catch (err) {
        console.log('Cannot add feedItem', err)
        throw err
    }
}

export async function updatefeedItem(feedItem) {
    try {
        const savedfeedItem = await feedItemService.save(feedItem)
        console.log('Updated feedItem:', savedfeedItem)
        store.dispatch(getCmdUpdatefeedItem(savedfeedItem))
        return savedfeedItem
    } catch (err) {
        console.log('Cannot save feedItem', err)
        throw err
    }
}

export async function addfeedItemMsg(feedItemId, txt) {
    try {
        const msg = await feedItemService.addfeedItemMsg(feedItemId, txt)
        console.log('Added feedItem message', msg)
        store.dispatch(getCmdAddfeedItemMsg(msg))
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
function getCmdRemovefeedItem(feedItemId) {
    return {
        type: REMOVE_FEED_ITEM,
        feedItemId
    }
}

function getCmdAddfeedItem(feedItem) {
    return {
        type: ADD_FEED_ITEM,
        feedItem
    }
}

function getCmdUpdatefeedItem(feedItem) {
    return {
        type: UPDATE_FEED_ITEM,
        feedItem
    }
}

function getCmdSetfeedItems(feedItems) {
    return {
        type: SET_FEED_ITEMS,
        feedItems
    }
}

function getCmdSetfeedItem(feedItem) {
    return {
        type: SET_FEED_ITEM,
        feedItem
    }
}

function getCmdAddfeedItemMsg(msg) {
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
async function unitTestActions() {
    await loadfeedItems()
    await addfeedItem(feedItemService.getEmptyfeedItem())
    await updatefeedItem({
        _id: 'm1oC7',
        title: 'feedItem-Good',
    })
    await removefeedItem('m1oC7')
    // TODO unit test loadfeedItem
    // TODO unit test addfeedItemMsg
    // TODO unit test updateTask
}

