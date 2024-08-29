import {setNotification} from "@/lib/Notification/ClientNotification";

const ELAPSE_TIME = 10000
export enum QueueTypes {
    CHALLENGES,
    SKILLS,
    MENTIONS
}

export type QueueDataItem = {
    studentId: number;
    evaluationId: string;
    value: string | boolean;
};

export type QueueItem = {
    type: QueueTypes;
    data: QueueDataItem;
}

export type QueueRequest = {
    type: QueueTypes;
    data: QueueDataItem[];
};

export const enum QueueStatus {
    Saved,
    Saving,
    NotSaved
}

class CQueue {
    private queue: QueueItem[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private intervalTime: number;
    private onCallback: (status: QueueStatus) => void;
    private status: QueueStatus;

    constructor(intervalTime: number = ELAPSE_TIME) {
        this.intervalTime = intervalTime;
        this.onCallback = () => {};
        this.status = QueueStatus.Saved;
    }

    private setStatus(status: QueueStatus) {
        const validTransitions: Record<QueueStatus, QueueStatus> = {
            [QueueStatus.Saved]: QueueStatus.NotSaved,
            [QueueStatus.NotSaved]: QueueStatus.Saving,
            [QueueStatus.Saving]: QueueStatus.Saved
        };

        if (validTransitions[this.status] === status) {
            this.status = status;
            this.onCallback(status);
        }
    }

    private async processQueue(): Promise<void> {
        if (this.queue.length === 0) return;

        this.setStatus(QueueStatus.Saving);
        const itemsToProcess = [...this.queue];
        this.queue = [];

        const groupedItems = this.groupItemsByType(itemsToProcess);

        for (const items of groupedItems) {
            await this.execute(items);
        }

        this.setStatus(QueueStatus.Saved);
        if (this.queue.length > 0) {
            this.setStatus(QueueStatus.NotSaved);
        } else {
            this.stop()
        }
    }

    private groupItemsByType(items: QueueItem[]): QueueItem[][] {
        const grouped: Record<QueueTypes, QueueItem[]> = {} as Record<QueueTypes, QueueItem[]>

        items.forEach(item => {
            if (!grouped[item.type])
                grouped[item.type] = []
            grouped[item.type].push(item);
        });

        return Object.values(grouped).filter(group => group.length > 0);
    }

    private async execute(items: QueueItem[]): Promise<void> {
        try {
            const response = await fetch("/api/event/post", {
                method: "POST",
                body: JSON.stringify({type: items[0].type, data: items.map(item => item.data)} as QueueRequest),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok)
                throw new Error("Failed to post items " + response.statusText)

            const data = await response.json()
            if (!data.success)
                 throw new Error("Server error: " + data.error)

            this.setStatus(QueueStatus.Saved)

        } catch (error) {
            console.error("Error posting items:", error);
            setNotification("Internal error: events could not be executed")
        }
    }

    public add(item: QueueItem): void {
        this.start()
        this.queue.push(item);
        if (this.status !== QueueStatus.NotSaved) {
            this.setStatus(QueueStatus.NotSaved);
        }
    }

    public start(): void {
        if (this.intervalId !== null) return;

        this.intervalId = setInterval(() => {
            this.processQueue();
        }, this.intervalTime);
    }

    public on(callback: (status: QueueStatus) => void): void {
        this.onCallback = callback;
    }

    public stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public async save() {
        this.stop()
        await this.processQueue()
        this.start()
    }
}

const queue = new CQueue();
export default queue;