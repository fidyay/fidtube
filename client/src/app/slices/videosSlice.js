import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'

const videosAdapter = createEntityAdapter()

const initialState = videosAdapter.getInitialState({
    ids: ['a', 'b', 'c'],
    entities: {
        a: {
            id: 'a',
            src: 'a',
            title: 'aboba',
            description: '',
            author: 'a',
            liked: true,
            disliked: false,
            likes: 0,
            dislikes: 3,
            preview: null,
            comments:{ 
                ids: ['a', 'b'],
                entities: {
                a: {
                    id: 'a',
                    self: true,
                    text: 'abf',
                    author: 'a',
                    liked: true,
                    disliked: false,
                    likes: 0,
                    dislikes: 3
                },
                b: 
                {
                    id: 'b',
                    self: false,
                    text: 'abf',
                    author: 'a',
                    liked: false,
                    disliked: true,
                    likes: 0,
                    dislikes: 3
                },
            }

            }
        },
        b: {
            id: 'b',
            src: 'b',
            title: 'silvesta',
            description: 'fg',
            author: 'b',
            liked: false,
            disliked: true,
            likes: 0,
            dislikes: 3,
            preview: null,
            comments:{ 
                ids: ['a', 'b'],
                entities: {
                a: {
                    id: 'a',
                    self: true,
                    text: 'abf',
                    author: 'a',
                    liked: true,
                    disliked: false,
                    likes: 0,
                    dislikes: 3
                },
                b: 
                {
                    id: 'b',
                    self: false,
                    text: 'abf',
                    author: 'a',
                    liked: false,
                    disliked: true,
                    likes: 0,
                    dislikes: 3
                },
            }

            }
        },
        c: {
            id: 'c',
            src: 'c',
            title: 'sonte',
            description: 'fg',
            author: 'c',
            liked: false,
            disliked: false,
            likes: 0,
            dislikes: 3,
            preview: null,
            comments:{ 
                ids: ['a', 'b'],
                entities: {
                a: {
                    id: 'a',
                    self: true,
                    text: 'abf',
                    author: 'a',
                    liked: true,
                    disliked: false,
                    likes: 0,
                    dislikes: 3
                },
                b: 
                {
                    id: 'b',
                    self: false,
                    text: 'abf',
                    author: 'a',
                    liked: false,
                    disliked: true,
                    likes: 0,
                    dislikes: 3
                },
            }
            }
        },
    }
})



const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        addVideo: videosAdapter.addOne
    }
})

export default videosSlice.reducer

export const {addVideo} = videosSlice