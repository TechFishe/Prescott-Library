import { useEffect, useState } from "react";
import { supabase } from "src/supabase";

export default function NavProfile(){
    const [user, setUser]:any =  useState({});

    useEffect(() => {
        async function getUser(){
            await supabase.auth.getUser().then((val) => {
                if(!val.data?.user) return;
                else getCustomUser(val.data.user.id);
            })
        }

        async function getCustomUser(uuid: string){
            const {data, error} = await supabase.from("users").select().eq("user_ref", uuid).single();
            if(error) throw error;
            else setUser(data);
        }

        getUser();
    }, [])

    return(
        <a href="/user" className="mdTall:ml-8 border border-transparent hover:border-[#E9EDDE]/25 group mdTall:px-5 mdTall:py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex mdTall:flex-row flex-col items-center justify-center">
            {Object.keys(user).length === 0 ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className="group-hover:text-burgundy-900 transition-colors ease-in mdTall:h-5 h-6">
                    {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
            :
                <img src={user.pfp} aria-label="Profile Picture" className="mdTall:h-7 h-8" />
            }
            <span className="mdTall:text-2xl text-lg font-semibold">{Object.keys(user).length === 0 ? "User" : "You"}</span>
        </a>
    )
}