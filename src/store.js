import { createStore } from "vuex"
import axios from "axios"

export const store = createStore({
    state() {
        return {
            tasks: []
        }
    },
    mutations: {
        pushTask(state, payload) {
            if (payload) {
                state.tasks.push(payload)
            } else {
                let error = new Error('name должен быть строкой!')
                console.error(error)
            }
        },
        clearTasks(state) {
            state.tasks = []
        },
        changeTask(state, payload) {
            if (payload) {
                let taskIndex = state.tasks.findIndex(item => item.id === payload.id)
                state.tasks[taskIndex].status = payload.status
            }
        }
    },
        actions: {
        async patchStatusTask({ commit }, payload) {
            try {
                await axios.patch(`https://freelance-ae474-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload.id}.json`, {
                    status: payload.status
                })
                commit('changeTask', {
                    id: payload.id,
                    status: payload.status
                })
            } catch {
                // Error handling without logging
            }
        }
    },
    getters: {
        getTasks(state) {
            return state.tasks
        }
    }
})