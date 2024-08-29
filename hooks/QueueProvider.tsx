"use client";

/*import React, {FC, ReactNode, useContext, useCallback, useState, useEffect} from "react";
import CQueue, { QueueItem, QueueTypes } from "@/lib/Queue/queue";
import { NotificationColor, setNotification } from "@/lib/Notification/ClientNotification";

type QueueState = Record<QueueTypes, CQueue | undefined>;
type BusyState = Record<QueueTypes, boolean>;

type QueueContextType = {
  add: (item: QueueItem) => void;
  create: (type: QueueTypes) => void;
  start: (type: QueueTypes) => void;
};

const QueueContext = React.createContext<QueueContextType | undefined>(undefined);

type QueueProviderProps = {
  children: ReactNode;
};

export const QueueProvider: FC<QueueProviderProps> = ({ children }) => {
  const [queue, setQueue] = useState<QueueState>({} as QueueState);
  const [busy, setBusy] = useState<BusyState>({} as BusyState);

  const add = useCallback((item: QueueItem) => {
    console.log("Queue hook adding")
    setQueue(prevState => {
      const currentQueue = prevState[item.type]
      if (currentQueue)
        currentQueue.add(item)
      else
        setNotification("Internal error: queue not found", NotificationColor.ERROR)
      return prevState
    })
  }, []);

  const create = useCallback((type: QueueTypes) => {
    console.log("Creating")
    setQueue((prevQueue) => {
      if (!prevQueue[type]) {
        return { ...prevQueue, [type]: new CQueue(() => {}) };
      }
      return prevQueue;
    });

    setBusy((prevBusy) => {
      if (prevBusy[type] === undefined) {
        return { ...prevBusy, [type]: false };
      }
      return prevBusy;
    });
  }, []);

  const start = useCallback((type: QueueTypes) => {
    setQueue((prevQueue) => {
      const tmpQueue = prevQueue[type];
      if (tmpQueue) {
        tmpQueue.start();
      } else {
        setNotification("Internal error: queues could not be started", NotificationColor.ERROR);
      }
      return { ...prevQueue };
    });
  }, []);

  return (
    <QueueContext.Provider value={{ add, create, start }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};*/