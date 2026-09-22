import toast from "react-hot-toast";
import CustomToast from "../components/customToast";

export function showSuccessToast(message) {

    toast.custom((t) => (
        <CustomToast
            t={t}
            type="success"
            message={message}
        />
    ), {
        duration: 3000
    });

}


export function showErrorToast(message) {

    toast.custom((t) => (
        <CustomToast
            t={t}
            type="error"
            message={message}
        />
    ), {
        duration: 4000
    });

}