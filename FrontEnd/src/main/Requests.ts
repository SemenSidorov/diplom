import { getCookieByName } from "./Auth/Login";
import {NewsListI} from "./News/NewsList";

const requestContainer = (req) => {
    return req.then(async res => {
        const data = await res?.json();
        if (data?.ERROR) {
            // window.location.href = 'http://localhost:3000/login'
            document.cookie = "access_token=; Max-Age=0";
            document.cookie = "user_id=; Max-Age=0";
            document.cookie = "is_admin=; Max-Age=0";
            return new Error('Токен упал')
        }
        return data
    });
};
// Мероприятия
export const getEvents = (isMyEvents, dateFrom, dateTo , userId, token) => {
    return requestContainer(fetch(`http://backend/BackEnd/events/all.php?METHOD=${isMyEvents ? 'get_for_user' : ''}&TOKEN=${token}&DATE_START=${dateFrom}&DATE_EXP=${dateTo}&USER_ID=${userId}`))

};

export const addEvent = (formData) => {
   return requestContainer(fetch('http://backend/BackEnd/admin/add_events.php', {
           body: formData,
           method: "post",
       }
   ))
};

export const subscribeEvent = (token, userId, eventId) => {
    return requestContainer(fetch(`http://backend/BackEnd/events/subscribe.php?EVENT_ID=${eventId}&TOKEN=${token}&USER_ID=${userId}`))
}

//Новости
export const getNews = (userId: string, token: any): Promise<NewsListI> => {
    return requestContainer(fetch(`http://backend/BackEnd/news/news.php?TOKEN=${token}&PAGEN=1&USER_ID=${userId}`))
};

export const addNew = (formData: FormData) => {
    return requestContainer(fetch('http://backend/BackEnd/admin/add_news.php', {
            body: formData,
            method: "post",
        }
    ))
}

export const editProfile = (formData: FormData, isAdmin) => {
    return requestContainer(fetch(`http://backend/BackEnd/${isAdmin ? 'admin' : 'personal'}/set_user_fields.php`, {
            body: formData,
            method: "post",
        }
    ))
}

//Все пользователи
export const getAllUsers = (userId: string, token: any): Promise<NewsListI> => {
    return requestContainer(fetch(`http://backend/BackEnd/admin/get_all_users.php?TOKEN=${token}&USER_ID=${userId}`));
};

export const getAllUsersForEvents = (userId: string, token: any, eventId: string): Promise<NewsListI> => {
    return requestContainer(fetch(`http://backend/BackEnd/personal/users_to_event.php?TOKEN=${token}&USER_ID=${userId}&EVENT_ID=${eventId}`));
};

export const getUserFields = (userId, otherUserId): Promise<any> => {
    const token = getCookieByName('access_token');
    return requestContainer(fetch(`http://backend/BackEnd/personal/get_user_fields.php?&TOKEN=${token}&USER_ID=${userId}&ID=${otherUserId}`));
};