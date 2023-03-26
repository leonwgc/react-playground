import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setAsync = createAsyncThunk('counter/setAsync', async () => {
    const response = await new Promise(resolve => {
        setTimeout(() => {
            resolve(~~(Math.random() * 10))
        }, 500);
    })
    return response
})


const initialValue = 0;

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: initialValue,
        status: ''
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = initialValue;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(setAsync.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(setAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.value = action.payload as number;

                console.log(action)
            })
            .addCase(setAsync.rejected, (state, action) => {
                state.status = 'rejected'
            })
    }
})

export const { increment, decrement, reset } = counterSlice.actions
export default counterSlice.reducer;