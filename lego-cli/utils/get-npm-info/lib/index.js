'use strict';

import notifier from 'update-notifier'

function updateNotifier(pkg) {
    const noti = notifier({pkg, updateCheckInterval: 0})
    noti.notify()
    console.log('noti', noti.update)
}

export {
    updateNotifier
}
