import { storyService } from '../services/story.service.remote'
import { store } from '../store/store'
import { ADD_story, REMOVE_story, SET_STORIES, SET_STORY, UPDATE_STORY, ADD_STORY_MSG } from './story.reducer'

export async function loadStories() {
    try {
        const stories = await storyService.query()
        store.dispatch(getCmdSetStories(stories))
    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function loadStory(storyId) {
    try {
        const story = await storyService.getById(storyId)
        store.dispatch(getCmdSetstory(story))
    } catch (err) {
        console.log('Cannot load story', err)
        throw err
    }
}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemovestory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added story', savedStory)
        store.dispatch(getCmdAddstory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Updated story:', savedStory)
        store.dispatch(getCmdUpdatestory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function addStoryMsg(storyId, txt) {
    try {
        const msg = await storyService.addStoryMsg(storyId, txt)
        console.log('Added story message', msg)
        store.dispatch(getCmdAddstoryMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add story msg', err)
        throw err
    }
}

// export async function updateTask(storyId, groupId, task, activityTitle) {
//     try {
//         const [savedTask, activity] = await storyService.updateTask(storyId, groupId, task, activityTitle)
//         console.log('Updated task', savedTask)
//         store.dispatch(getCmdUpdateTask(groupId, task, activity))
//         return savedTask
//     } catch (err) {
//         console.log('Cannot update task', err)
//         throw err
//     }
// }

// Command Creators:
function getCmdRemovestory(storyId) {
    return {
        type: REMOVE_story,
        storyId
    }
}

function getCmdAddstory(story) {
    return {
        type: ADD_story,
        story
    }
}

function getCmdUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

function getCmdSetStories(storys) {
    return {
        type: SET_STORIES,
        storys
    }
}

function getCmdSetStory(story) {
    return {
        type: SET_STORY,
        story
    }
}

function getCmdAddStoryMsg(msg) {
    return {
        type: ADD_STORY_MSG,
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
    await loadStories()
    await addStory(storyService.getEmptystory())
    await updateStory({
        _id: 'm1oC7',
        title: 'story-Good',
    })
    await removeStory('m1oC7')
    // TODO unit test loadstory
    // TODO unit test addstoryMsg
    // TODO unit test updateTask
}

