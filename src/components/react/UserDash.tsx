import { useState, useEffect } from "react";
import { supabase } from "src/supabase";
import { months } from "src/months";

export default function UserDash(){
    const [user, setUser] = useState<User>();
    const [dateJoined, setDate] = useState("");
    const [stories, setStories] = useState<Story[]>([]);
    const [likedStories, setLikedStories] = useState<Story[]>([]);

    useEffect(() => {
        async function getUser(){
            await supabase.auth.getUser().then((val) => {
                if(val.data?.user) getCustomUser(val.data.user.id);
            })
        }

        async function getCustomUser(uuid: string){
            const {data, error} = await supabase.from("users").select().eq("user_ref", uuid).single();
            if(error) throw error;
            else{
                setUser(data);
                getStories(uuid);
                getLikedStories(uuid);
            }
        }

        async function getStories(user_ref: string){
            const {data, error} = await supabase.from("writers_stories").select().eq("author", user_ref);
            if(error) throw error;
            else setStories(data);
        }

        async function getLikedStories(user_ref: string){
            const {data, error} = await supabase.from("liked_stories").select().eq("user_ref", user_ref);
            if(error) throw error;
            else setLikedStories(data);
        }

        getUser();
    }, [])

    async function logout(){
        const {error} = await supabase.auth.signOut();
        if(error) throw error;
        else window.location.href = "https://prescott-library-git-supabase-start-techfishe.vercel.app/user" //THIS MUST BE CHANGED BEFORE GITHUB UPDATE
    }

    if(dateJoined === "" && user?.joined_on){
        let tempArray = user.joined_on.split("-").join(" ").split("T");
        tempArray.pop();
        tempArray = tempArray[0].split(" ");

        for(let i = 0; i < months.length; i++){
            if(tempArray[1] === months[i].num){
                tempArray[1] = months[i].name;
                break;
            }
        }

        setDate(`${tempArray[1]} ${tempArray[2]}, ${tempArray[0]}`);
    }

    return(
        <>
            <section className="flex">
                <img src={user?.pfp} alt="Profile picture" className="w-1/12" />
                <div className="flex flex-col px-1 justify-center">
                    <span className="border-b border-b-[#E9EDDE]/25 pb-1 px-1 text-6xl font-bold tracking-wide">{user?.first_name} {user?.last_name}</span>
                    <p className="px-1 pt-1 text-lg">Joined on: <span className="text-burgundy-700">{dateJoined}</span></p>
                </div>
                <section className="flex flex-col justify-center px-1">
                    <QuickAction text="Log out" function={logout} viewBox="512 512" svg="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </section>
            </section>
            <main className="flex flex-col">
                <article className="w-full px-1 border-b border-b-[#E9EDDE]/10 pb-1">
                    <h2 className="text-5xl font-bold tracking-wide">Stories: <span className="text-burgundy-800">{stories.length}</span></h2>
                    <ul className="flex"></ul>
                </article>
                <article className="w-full px-1 pt-1">
                    <h2 className="text-5xl font-bold tracking-wide">Liked Stories: <span className="text-burgundy-800">{likedStories.length}</span></h2>
                    <ul className="flex"></ul>
                </article>
            </main>
        </>
    )
}

interface ActionProps{
    function: () => void,
    text: string,
    svg: string,
    viewBox: string
}

function QuickAction(props: ActionProps){
    return(
        <button onClick={() => props.function()} className="flex flex-col items-center space-y-1 p-1 rounded-lg aspect-square justify-center border border-transparent hover:border-[#E9EDDE]/25 group hover:scale-[1.025] transition-all ease-in">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.75rem" viewBox={`0 0 ${props.viewBox}`} fill="currentColor" className="group-hover:text-burgundy-900 transition-colors ease-in">
                {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d={props.svg}/>
            </svg>
            <span className="mdTall:text-xl font-semibold">{props.text}</span>
        </button>
    )
}