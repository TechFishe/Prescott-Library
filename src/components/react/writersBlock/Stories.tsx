import { useEffect, useState } from "react";
import { supabase } from "src/supabase";
import CardLink from "./CardLink/CardLink";

export default function Stories(){
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        async function getStories(){
            const {data, error} = await supabase.from("writers_stories").select().eq("prompt_id", 2);
            if(error) throw error;
            else setStories(data)
        }

        getStories();
    }, [])

    return(
        <div className="h-fullscreen-1/3 px-1 py-2 space-x-4">
            {stories.length}
        </div>
    )
}