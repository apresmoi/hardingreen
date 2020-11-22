import React, { useContext } from "react";

interface Props {
    children: React.ReactNode;
}

const eventsSubscribers: Map<string, ((...args: any) => void)[]> = new Map()

const contextValue = {
    subscribeEvent: (eventName: string, callback: (...args: any) => void) => {
        if (!eventsSubscribers.has(eventName)) {
            eventsSubscribers.set(eventName, [])
        }
        eventsSubscribers.get(eventName)?.push(callback)
    },
    raiseEvent: (eventName: string, ...args: any) => {
        if (eventsSubscribers.has(eventName)) {
            eventsSubscribers.get(eventName)?.forEach(callback => {
                callback(...args)
            })
        }
    }
}

const EventsContext = React.createContext<{
    subscribeEvent: (eventName: string, callback: (...args: any) => void) => void;
    raiseEvent: (eventName: string, ...args: any) => void
}>(contextValue)

export const useEvents = () => {
    return useContext(EventsContext)
}

export function Events({ children }: Props) {
    return (
        <EventsContext.Provider value={contextValue}>
            {children}
        </EventsContext.Provider>
    );
}
