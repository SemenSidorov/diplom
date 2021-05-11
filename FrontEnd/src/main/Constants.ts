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
    PROFILE: 3,
    EDIT: 4,
}

export const DATE_FILTER_KEYS = {
    day: 1,
    weak: 2,
    month: 3,
};

export const DATE_FILTER_VALUES = {
    [DATE_FILTER_KEYS.day]: 'Дни',
    [DATE_FILTER_KEYS.weak]: 'Недели',
    [DATE_FILTER_KEYS.month]: 'Месяцы',
}


export const timeTabs = [
    {
        name: DATE_FILTER_VALUES[DATE_FILTER_KEYS.day],
        id: DATE_FILTER_KEYS.day,
    },
    {
        name: DATE_FILTER_VALUES[DATE_FILTER_KEYS.weak],
        id: DATE_FILTER_KEYS.weak,
    },
    {
        name: DATE_FILTER_VALUES[DATE_FILTER_KEYS.month],
        id: DATE_FILTER_KEYS.month,
    },
];
