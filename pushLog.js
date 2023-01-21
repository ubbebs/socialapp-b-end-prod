import { db } from './firebase.js'

const ref = db.ref();

export const pushLog = (title, category, timestamp, details) => {
    console.log('e')
    let title
    if (timestamp === number) {
        const date = new Date(timestamp)
        title = `${timestamp} / ${date.toDateString()}, ${date.getHours}:${date.getMinutes}`
    } else {
        title = timestamp
    }
    const log = ref.child(`logs/${category}/${formatedData}/`)
    log.set({
        message: title,
        details: details + "|" + timestamp,
    })
}