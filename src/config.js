export const SERVER_HOST = 'https://cube-management.azurewebsites.net/';

// 订单状态
export const orderStatus = {
    0: {
        label: 'Created',
        desc: 'New created order.'
    },
    1: {
        label: 'Paid',
        desc: 'Order got paid.'
    },
    2: {
        label: 'Notified',
        desc: 'Already notified user by email.'
    },
    3: {
        label: 'Shipped',
        desc: 'Goods have been dispatched.'
    },
    4: {
        label: 'Received',
        desc: 'Goods have been deliverd.'
    },
    9: {
        label: 'Failed',
        desc: 'Failed order ( for example: payment expires.)'
    }
};
