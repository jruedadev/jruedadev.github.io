import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite
    .setEndpoint(process.env.APPWRITE_HOST)
    .setProject(process.env.APPWRITE_PROJECT)

export { appwrite }