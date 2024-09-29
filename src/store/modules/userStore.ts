import {ref} from "vue";
import {defineStore} from "pinia";

export const useUserStore
    = defineStore('user', () => {
    const userUpvoteList = ref<number[]>([])

    function checkIfUpvote(id: number): boolean {
        return userUpvoteList.value.includes(id)
    }

    function cancelUpvote(id: number) {
        const index = userUpvoteList.value.indexOf(id)
        if (index !== -1) {
            userUpvoteList.value.splice(index, 1)
        }
        return
    }

    function upvote(id: number) {
        userUpvoteList.value.push(id)
    }

    return {
        userUpvoteList,
        checkIfUpvote,
        cancelUpvote,
        upvote
    }
})