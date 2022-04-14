export default {
    items: [
        {
            id: 1,
            title: 'Dashboard',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 2,
            title: 'Reported Tweets',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'reported tweets',
                    title: 'Reported Tweets',
                    type: 'item',
                    url: '/reported-tweets',
                    icon: 'feather icon-flag',
                }
            ]
        },
        {
            id: 3,
            title: 'Retraining Model',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'retraining model',
                    title: 'Retraining Model',
                    type: 'item',
                    url: '/retraining-model',
                    icon: 'feather icon-server',
                }
            ]
        },
        // {
        //     id: 2,
        //     title: 'Reports',
        //     type: 'group',
        //     icon: 'icon-navigation',
        //     children: [
        //         {
        //             id: 'reports',
        //             title: 'Reports',
        //             type: 'collapse',
        //             icon: 'feather icon-flag',
        //             children: [
        //                 {
        //                     id: 'reported tweets',
        //                     title: 'Reported Tweets',
        //                     type: 'item',
        //                     url: '/reported-tweets',
        //                 },
        //                 {
        //                     id: 'retraining model',
        //                     title: 'Retraining Model',
        //                     type: 'item',
        //                     url: '/retraining-model',
        //                 },
        //             ]
        //         }
        //     ]
        // },
        {
            id: 4,
            title: 'Models',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'models',
                    title: 'Models',
                    type: 'item',
                    url: '/models',
                    icon: 'feather icon-file',
                }
            ]
        },
        {
            id: 5,
            title: 'Users',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/users',
                    icon: 'feather icon-users',
                }
            ]
        },
        {
            id: 6,
            title: 'Admins',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'admins',
                    title: 'Admins',
                    type: 'item',
                    url: '/admins',
                    icon: 'feather icon-user-plus',
                }
            ]
        }
    ]
}