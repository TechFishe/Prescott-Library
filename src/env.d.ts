/// <reference types="astro/client" />

interface User{
    id: number,
    user_ref: string,
    joined_on: string,    
    gender: string,
    pfp: string,
    first_name: string,
    last_name: string,
    grade: number   
}

interface Month{
    name: string,
    num: string
}

interface Story{
    id: number,
    created_on: string,
    author: string,
    title: string,
    story: string,
    promt_id: number,
    story_id: string
}
