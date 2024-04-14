import "./CardLink.css";

interface Props {
  URL: string;
  text: string;
  description: string;
}

export default function CardLink(props: Props) {
  return (
    <a
      id="bubbles"
      href={props.URL}
      className="group flex h-full w-1/5 flex-col rounded-lg border border-transparent transition-transform duration-200 ease-in hover:scale-[1.025] hover:border-[#E9EDDE]/25">
      <span className="flex-grow text-center text-5xl font-bold text-[#E9EDDE] transition-colors duration-200 ease-in group-hover:text-burgundy-800">
        {props.text}
      </span>
      <span className="line-clamp-2 px-1 pb-0.5 text-sm tracking-tight">{props.description}</span>
    </a>
  );
}
