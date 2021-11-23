'use strict';

import log from 'npmlog'

log.heading = 'lego-cli' // 修改前缀
// log.headingStyle = { fg: 'black', bg: 'white' } 

log.level = process.env.LOG_LEVEL || 'info' // 判断 debug 模式
log.addLevel('success', 2000, { fg: 'green' }) // 自定义 log 方法

export default log