"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface SidebarContextType {
    refreshKey: number;
    refreshSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshSidebar = useCallback(() => {
        setRefreshKey((prev) => prev + 1);
    }, []);

    return (
        <SidebarContext.Provider value={{ refreshKey, refreshSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("useSidebarContext must be used inside SidebarProvider");
    return ctx;
};
