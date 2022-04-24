import { get, post, put, destroy } from './configuration';

export const GameApi = {
    /* GET */
getAll: () =>
    get('/games'),
getAllAvailable: () =>
    get('/games/available'),
getOne: (id) =>
    get(`/game/${id}`),

    /* POST */
create: (params) =>
    post('/game', params),
changeAvailability: (params) =>
    post('/game/availability', params),

    /* PUT */
update: (id, params) =>
    put(`/game/${id}`, params),

    /* DELETE */
remove: (id) =>
    destroy(`/game/delete/${id}`),
};


export const MemberApi = {
        /* GET */
    getAll: () =>
        get('/members'),
    getOne: (id) =>
        get(`/member/${id}`),
    getOneLastCreated: () =>
        get('/member/last'),

        /* PUT */
    create: (member) =>
        put('/member', member),
    update: (id, params) =>
        put(`/member/${id}`, params),

        /* DELETE */
    remove: (id) =>  
        destroy('/member/delete', { data: { id: id } }),
};


export const LoanApi = {
        /* GET */
    getAll: () =>
        get('/loans'),
    getOne: (id) =>
        get(`/loan/${id}`),
    getOneLastCreated: () =>
        get('/loan/last'),

        /* POST */
    create: (params) =>
        post('/loan', params),

        /* PUT */
    update: (id, params) =>
        put(`/loan/${id}`, params),

        /* DELETE */
    remove: (id) =>
        destroy(`/loan/delete/${id}`),
};