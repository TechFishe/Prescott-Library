import { useState } from "react";

export default function MenuBtn(){
    const [menuOpen, setMenu] = useState(false);

    return(
        <div className="relative ml-8">
            <button onClick={() => setMenu(!menuOpen)} className={`border ${menuOpen ? "rounded-b-none border-[#E9EDDE]/25 border-b-0" : "border-transparent hover:border-[#E9EDDE]/25"} group px-2 py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" fill="currentColor" viewBox="0 0 448 512" className="group-hover:text-burgundy-900 transition-colors ease-in">
                    {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                </svg>
                <span className="text-2xl font-semibold">Menu</span>
            </button>
            <section className={`absolute top-10 h-fit w-fit min-w-full bottom-0 right-0 border rounded-b-lg border-[#E9EDDE]/25 px-2 space-y-1 ${menuOpen ? "" : "hidden"}`}>
                <ul className="px-1">
                    <MenuLink isLast={true} URL="prescott.k12.wi.us" text="School Site" viewBox="576 512" icon="M288 0H400c8.8 0 16 7.2 16 16V80c0 8.8-7.2 16-16 16H320.7l89.6 64H512c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H336V400c0-26.5-21.5-48-48-48s-48 21.5-48 48V512H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64H165.7L256 95.5V32c0-17.7 14.3-32 32-32zm48 240a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM80 224c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H80zm368 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H464c-8.8 0-16 7.2-16 16zM80 352c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H80zm384 0c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H464z" />
                </ul>
            </section>
        </div>
    )   
}

interface MenuLinkProps{
    URL: string,
    icon: string,
    viewBox: string,
    text: string,
    isLast: boolean
}
function MenuLink(props: MenuLinkProps){
    return(
        <li className={`flex space-x-1 items-center px-1 py-1 ${props.isLast ? "" : "border-b border-[#E9EDDE]/10"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1rem" fill="currentColor" viewBox={`0 0 ${props.viewBox}`}>
                {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d={props.icon}/>
            </svg>
            <a href={props.URL} className="whitespace-nowrap text-lg hover:underline hover:decoration-burgundy-800 decoration-2">{props.text}</a>
        </li>
    )
}