import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";


export default function useAuthChange() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser? authUser : null)
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return user;
}