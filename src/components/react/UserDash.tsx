import { useState, useEffect } from "react";
import { supabase } from "src/supabase";
import { months } from "src/months";

export default function UserDash(){
    const [user, setUser] = useState<User>();
    const [dateJoined, setDate] = useState("");

    useEffect(() => {
        async function getUser(){
            await supabase.auth.getUser().then((val) => {
                if(val.data?.user) getCustomUser(val.data.user.id);
            })
        }

        async function getCustomUser(uuid: string){
            const {data, error} = await supabase.from("users").select().eq("user_ref", uuid).single();
            if(error) throw error;
            else setUser(data);
        }

        getUser();
    }, [])

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
            </section>
            <main className="flex">
                <article>
                    <h2></h2>
                    <ul className="flex"></ul>
                </article>
                <article>
                    <h2></h2>
                    <ul className="flex"></ul>
                </article>
            </main>
        </>
    )
}