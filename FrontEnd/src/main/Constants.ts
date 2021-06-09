export interface HeaderTypes {
    userId?: string
    title?: string,
    isAuth : boolean
    isMain?: boolean
}

export interface UserTypes {
    userId: string
}

export interface TabsTypes {
    currentTab: string
}

export const menuTabs = {
    MESSAGES: 0,
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
        name: DATE_FILTER_VALUES[DATE_FILTER_KEYS.month],
        id: DATE_FILTER_KEYS.month,
    },
    {
        name: DATE_FILTER_VALUES[DATE_FILTER_KEYS.weak],
        id: DATE_FILTER_KEYS.weak,
    },
    {
        name: DATE_FILTER_VALUES[DATE_FILTER_KEYS.day],
        id: DATE_FILTER_KEYS.day,
    },

];

export const addNewInitialModel = [
    {
        title: 'Название новости',
        name: 'NAME',
        type: 'input',
        value: '',
    },
    {
        title: 'Краткое описание новости',
        name: 'PREVIEW_TEXT',
        type: 'textarea',
        value: '',
    },
    {
        title: 'Детальное описание новости',
        name: 'DETAIL_TEXT',
        type: 'textarea',
        value: '',
    },
    {
        title: 'Картинка для отображения в ленте',
        name: 'PREVIEW_PICTURE',
        type: 'file',
        id: 'inputGroupFile01',
        value: '',
        multiple: false,
    },
    {
        title: 'Картинки для детального отображения',
        name: 'ADD_PICTURES[]',
        id: 'inputGroupFile02',
        type: 'file',
        value: '',
        multiple: true
    }
]
