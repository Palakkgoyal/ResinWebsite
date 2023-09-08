import { auth } from "../lib/firebase"

function isOwner() {
    return auth?.currentUser?.uid === import.meta.env.VITE_OWNER_SECRET
}


export default isOwner