import { useEffect, useState } from "react";
import { supabase } from "src/supabase";
import CardLink from "./CardLink/CardLink";

export default function Prompts(){
    const [prompts, setPrompts] = useState<Prompt[]>([]);

    useEffect(() => {
        async function getPrompts(){
            const {data, error} = await supabase.from("writers_prompts").select().neq("id", 2);
            if(error) throw error;
            else setPrompts(data);
        }

        getPrompts()
    }, [])

    return(
        <div className="h-fullscreen-1/3 px-1 py-2 space-x-4">
            {prompts.map((prompt, key) => (
                <CardLink text={prompt.prompt} description={prompt.description} URL={`/clubs/writers-block/prompts/${prompt.id}`} />
            ))}
        </div>
    )
}