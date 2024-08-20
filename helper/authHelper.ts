import {debounce} from "lodash";
import axios from "axios";

export const checkEmailAvailability = debounce(async (email, setEmailError) => {
    if (email) {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/check-email", {email});
            if (response.data.exists) {
                console.log(response.data)
                setEmailError("This email is already associated with an account");
            } else {
                setEmailError("");
            }
        } catch (error) {
            console.error("Error checking email:", error);
            setEmailError("Error checking email availability");
        }
    }
}, 500);


export const checkUsernameAvailability = debounce(async (username, setUsernameError) => {
    if (username) {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/check-username", {username});
            if (response.data.exists) {
                setUsernameError("This username is already taken");
            } else {
                setUsernameError("");
            }
        } catch (error) {
            console.error("Error checking username:", error);
            setUsernameError("Error checking username availability");
        }
    }
}, 500);
