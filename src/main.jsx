import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./index.jsx";
import userAPI from "./global/scripts/user-api.js";
import cookies from "./global/scripts/utils/cookies-helper.js";


userAPI.auth.isValid()
    .then(({response}) => {
        if (response && !response['is_valid']) {
            cookies.accessToken.remove();
        }
    })
    .catch(error => {
        console.error(error);
        cookies.accessToken.remove();
    });

createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>);
