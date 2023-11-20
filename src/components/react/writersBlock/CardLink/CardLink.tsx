import "./CardLink.css";

interface Props{
    URL: string,
    text: string,
    description: string
}

export default function CardLink(props: Props){
    return(
        <a id="bubbles" href={props.URL} className="h-full w-1/5 border border-transparent hover:border-[#E9EDDE]/25 hover:scale-[1.025] flex flex-col rounded-lg transition-transform group duration-200 ease-in">
            <span className="text-center text-5xl font-bold text-[#E9EDDE] flex-grow group-hover:text-burgundy-800 transition-colors duration-200 ease-in">{props.text}</span>
            <span className="text-sm tracking-tight pb-0.5 px-1 line-clamp-2">{props.description}</span>
        </a>
    )
}