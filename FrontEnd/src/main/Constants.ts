export interface HeaderTypes {
    userId?: string
    title?: string,
    isAuth : boolean
}

export interface UserTypes {
    userId: string
}

export interface TabsTypes {
    currentTab: string
}

export const menuTabs = {
    NEWS: 1,
    EVENTS: 2,
    PROFILE: 3
}
