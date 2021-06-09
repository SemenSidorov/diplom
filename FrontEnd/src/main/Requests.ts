// Мероприятия
import {NewsListI} from "./News/NewsList";

export const getEvents = (isMyEvents, dateFrom, dateTo , userId, token) => {
    return fetch(`http://backend/BackEnd/events/all.php?METHOD=${isMyEvents ? 'get_for_user' : ''}&TOKEN=${token}&DATE_START=${dateFrom}&DATE_EXP=${dateTo}&USER_ID=${userId}`).then(res => res.json());
};

export const addEvent = (formData) => {
   return fetch('http://backend/BackEnd/admin/add_events.php', {
            body: formData,
            method: "post",
        }
    )
};

export const subscribeEvent = (token, userId) => {
    return fetch(`http://backend/BackEnd/events/subscribe.php?TOKEN=${token}&USER_ID=${userId}`)
}


//Новости
export const getNews = (userId: string, token: any): Promise<NewsListI> => {
    return fetch(`http://backend/BackEnd/news/news.php?TOKEN=${token}&PAGEN=1&USER_ID=${userId}`).then(res => res.json());
};

export const addNew = (formData: FormData) => {
    return fetch('http://backend/BackEnd/admin/add_news.php', {
            body: formData,
            method: "post",
        }
    );
}
