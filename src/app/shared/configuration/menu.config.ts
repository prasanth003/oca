import { iMenu } from "../interface/menu.interface";

export const Menu: iMenu[] = [
    {
        menu: 'Market',
        path: '/market',
        icon: 'fa-arrow-trend-up'
    },
    {
        menu: 'BS',
        path: '/sentiment/trend',
        icon: 'fa-magnifying-glass-chart'
    },
    {
        menu: 'Summary',
        path: '/summary',
        icon: 'fa-hard-drive'
    },
    {
        menu: 'Profile',
        path: '/',
        icon: 'fa-user'
    },
    {
        menu: 'Setting',
        path: '/',
        icon: 'fa-gears'
    }
]