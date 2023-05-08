module.exports = {
    apps: [
        {
            name: 'chatgpt-web',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: 'yarn',
            args: 'start'
        }
    ]
}