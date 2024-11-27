import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

export default async function doPost(endpoint: string, data: any, notification: boolean = true): Promise<{success: true, data: any}|{success: false, error: string}> {
    try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                cache: "no-cache",
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
            setNotification((error as Error).message, NotificationColor.ERROR);
            return {success: false, error: (error as Error).message};
        }
}

export async function doGet(endPoint: string, notification: boolean = true): Promise<{success: true, data: any}|{success: false, error: string}> {
    try {
        const response = await fetch(endPoint, {cache: "no-cache"})
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()
        if (data.success) {
            return data;
        } else {
            throw new Error(data.error)
        }
    } catch (error) {
        console.error(error)
        setNotification((error as Error).message, NotificationColor.ERROR);
        return {success: false, error: (error as Error).message};
    }
}