import { client } from './client'
import { postQuery, projectQuery, aboutQuery } from './queries'

export async function getPosts() {
    return await client.fetch(postQuery)
}

export async function getProjects() {
    return await client.fetch(projectQuery)
}
export async function getAbout() {
    return await client.fetch(aboutQuery)
}