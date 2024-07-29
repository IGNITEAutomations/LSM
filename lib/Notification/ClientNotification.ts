import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"

export enum NotificationColor {
    INFO = "#374151",
    SUCCESS = "#28a745",
    ERROR = "#dc3545"
}


export function setNotification(message: string, color: NotificationColor = NotificationColor.SUCCESS, duration: number = 3000) {
    Toastify({
                text: message,
                duration: duration,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: color,
                    fontSize: "12px",
                    borderRadius: "10px",
                },
    }).showToast()
}