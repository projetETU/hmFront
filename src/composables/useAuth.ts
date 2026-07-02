import { ref } from "vue";
import api from "@/api/api"

export const useAuth = () => {
    const isAuth = ref(false)
    const user = ref(JSON.parse(localStorage.getItem("user")) || null)

    const checkAuth = async () => {
        try {
            const response = await api.get("api/user/me")
            user.value = response.data
            localStorage.setItem("user",JSON.stringify(user.value))
            console.log(response.data);
            
            
            isAuth.value = true
            return true
        } catch {
            isAuth.value = false
            user.value = null
            return false
        }
    }
    return { isAuth, user, checkAuth }
}