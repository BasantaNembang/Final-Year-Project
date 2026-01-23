import { LoginDetails } from "@/types/usersData";
import axios from "axios";

export async function loginUSER(loginStdForm: LoginDetails) {

    let response = null;
    try {
        response = await axios.post('/api/auth/login', loginStdForm);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        return false;
    }
}

