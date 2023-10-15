import { useEffect, useState } from "react";

interface Props{
    text: string
}

export default function TitleText(props: Props){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const [text, setText] = useState(props.text);

    useEffect(() => {
        let tempText = props.text;
        let iterations = 0;

        const interval = setInterval(() => {
            setText(tempText.split("").map((letter, index) => {
                if(index < iterations) return props.text[index];
                else return letters[Math.floor(Math.random() * 26)];
            }).join(""));

            if(iterations >= props.text.length) clearInterval(interval);
            iterations += 1/2;
        }, 60)
    }, []);

    return(
        <h1 className="h-fit w-fit uppercase text-burgundy-900 self-center mdTall:text-7xl text-5xl font-bold mdTall:tracking-wide">{text}</h1>
    )
}