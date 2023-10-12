import { useState } from "react";

export default function NavMenu(){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const [menuOpen, setMenu] = useState(false);
    const [topText, setText] = useState("menu");

    function handleMenu(){
        if(menuOpen){
            setMenu(false);
            return;
        }
        
        setMenu(true);
        let tempText = "menu";
        let iterations = 0;

        const interval = setInterval(() => {
            setText(tempText.split("").map((letter, index) => {
                if(index < iterations) return "menu"[index];
                else return letters[Math.floor(Math.random() * 26)];
            }).join(""));

            if(iterations >= "menu".length) clearInterval(interval);
            iterations += 1/2;
        }, 60)
    }

    return(
        <div className="ml-8">
            <button onClick={() => handleMenu()} className="border border-transparent hover:border-[#E9EDDE]/25 group px-2 py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" fill="currentColor" viewBox="0 0 448 512" className="group-hover:text-burgundy-900 transition-colors ease-in">
                    {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                </svg>
                <span className="text-2xl font-semibold">Menu</span>
            </button>
            <section className={`absolute top-0 h-screen backdrop-blur-sm z-10 w-screen right-0 rounded-b-lg px-2 space-y-1 ${menuOpen ? "" : "hidden"}`}>
                <div className="float-right md:w-1/3 2xl:w-1/6 h-screen bg-[#0C080A]/90 px-1 flex flex-col">
                    <section className="flex justify-between items-center h-fit border-b border-[#E9EDDE]/50 py-1">
                        <span className="text-4xl font-bold tracking-wide uppercase text-burgundy-900">{topText}</span>
                        <button onClick={() => handleMenu()} className="border border-transparent hover:border-[#E9EDDE]/25 group px-2 py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 384 512" fill="currentColor" className="group-hover:text-burgundy-900 transition-colors ease-in">
                                {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                            <span className="text-xl font-semibold">Close</span>
                        </button>
                    </section>
                    <ul className="px-1">
                        <MenuLink isLast={false} URL="soraapp.com/welcome/login/202765" text="Search Library Books" viewBox="512 512" icon="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        <MenuLink isLast={false} URL="prescott-phs.library.site" text="Sora: Audio & eBooks" viewBox="448 512" icon="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                        {/* <MenuLink isLast={false} URL="digitalcampus.swankmp.net/psd396313&sa=D&source=editors&ust=1697064757838510&usg=AOvVaw2m9A8Ws3woFXZjeiRLd6Ct" text="SWANK: Streaming" viewBox="640 512" icon="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /> */}
                    </ul>
                    <div className="flex flex-grow" />
                    <ul>
                        <MenuLink isLast={false} URL="prescott.k12.wi.us" text="School Site" viewBox="576 512" icon="M288 0H400c8.8 0 16 7.2 16 16V80c0 8.8-7.2 16-16 16H320.7l89.6 64H512c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H336V400c0-26.5-21.5-48-48-48s-48 21.5-48 48V512H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64H165.7L256 95.5V32c0-17.7 14.3-32 32-32zm48 240a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM80 224c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H80zm368 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H464c-8.8 0-16 7.2-16 16zM80 352c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H80zm384 0c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H464z" />
                        <MenuLink isLast={false} URL="prescott.k12.wi.us/schools/high/resources/hs-library-resources.cfm" text="Library Resources" viewBox="448 512" icon="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                        <MenuLink isLast={true} URL="github.com/TechFishe/Prescott-Library" text="GitHub" viewBox="496 512" icon="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </ul>
                </div>
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
            <a href={`https://${props.URL}`} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-lg hover:underline hover:decoration-burgundy-800 underline-offset-2 pr-1">{props.text}</a>
        </li>
    )
}
