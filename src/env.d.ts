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
