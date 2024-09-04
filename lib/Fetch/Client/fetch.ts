import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

export default async function doPost(endpoint: string, data: object, notification: boolean = true): Promise<{success: true, data: any}|{success: false, error: string}> {
    try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Connection error");

            const responseData = await response.json();
            if (!responseData.success) throw new Error(`Server returned an error: ${responseData.error}`);

            if (notification)
                setNotification("Request sent successfully 👍", NotificationColor.SUCCESS);
            return responseData
        } catch (error) {
            console.error(error);
            setNotification("The request could not be sent", NotificationColor.ERROR);
            return {success: false, error: (error as Error).message};
        }
}