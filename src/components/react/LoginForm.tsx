import { useState } from "react";
import { supabase } from "src/supabase";

import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

export default function LoginForm(){
    const [isNew, setIsNew] = useState(false);
    const [screenTwo, setScreenTwo] = useState(true);

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [grade, setGrade] = useState("");

    function signup(){
        setIsNew(true);
        setEmail("");
        setPass("");
    }

    //#region User Auth 
        async function logInWithEmail(){
           const {error} = await supabase.auth.signInWithPassword({email, password: pass});
           if(error) throw error
           else window.location.reload();
        }
    
        async function signUpWithEmail(){
           const {data, error} = await supabase.auth.signUp({ email, password: pass});
           if(error) throw error
           else if(data.user) createNewUser(data.user?.id); //Ignore error
        }
    
        async function createNewUser(uuid:string){
            const {error} = await supabase.from("users").insert({user_ref: uuid, first_name: firstName, last_name: lastName, gender: gender, grade: Number(grade), pfp : createAvatar(bottts, {size:64, seed: uuid}).toDataUriSync()});
            if(error) throw error
        }
    //#endregion

    if(!isNew){
        return(
            <main className="h-fullscreen w-full flex flex-col justify-center">
                <h1 className="xl:text-8xl xl:font-black xl:tracking-wider w-full text-center">Login</h1>
                <section className="flex flex-col items-center space-y-4">
                    <div className="mdTall:w-1/2 2xl:w-1/3">
                        <label htmlFor="email" className="ml-2 text-2xl">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-none focus:ring-0 text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <div className="mdTall:w-1/2 2xl:w-1/3">
                        <label htmlFor="pass" className="ml-2 text-2xl">Password</label>
                        <input type="password" name="pass" value={pass} onChange={(e) => setPass(e.target.value)} className="border-none focus:ring-0 text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                </section>
                <section className="flex flex-col items-center mt-2">
                    <button onClick={() => logInWithEmail()} disabled={email === "" || pass === ""} className="mb-1 border border-transparent hover:border-[#E9EDDE]/25 hover:text-burgundy-900 group px-2 py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex mdTall:flex-row flex-col items-center justify-center mdTall:text-2xl text-lg font-semibold">Login</button>
                    <p className="text-center mt-1 text-lg">New user? Sign up <button onClick={() => signup()} className="hover:underline underline-offset-2 decoration-burgundy-800">here</button>.</p>
                </section>
            </main>
        )
    } else if(!screenTwo) {
        return(
            <main className="h-fullscreen w-full flex flex-col justify-center">
                <h1 className="xl:text-8xl xl:font-black xl:tracking-wider w-full text-center">Sign up</h1>
                <section className="flex flex-col items-center space-y-4">
                    <div className="mdTall:w-1/2 2xl:w-1/3">
                        <label htmlFor="email" className="ml-2 text-2xl">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-none focus:ring-0 text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <div className="mdTall:w-1/2 2xl:w-1/3">
                        <label htmlFor="pass1" className="ml-2 text-2xl">Password</label>
                        <input type="password" name="pass1" value={pass} onChange={(e) => setPass(e.target.value)} className="text-xl w-fullborder-none focus:ring-0  outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <div className="mdTall:w-1/2 2xl:w-1/3">
                        <label htmlFor="pass2" className="ml-2 text-2xl">Confirm password</label>
                        <input type="password" name="pass2" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="border-none focus:ring-0 text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                </section>
                <button onClick={() => setScreenTwo(true)} disabled={email === "" || pass === "" || confirmPass === "" || pass !== confirmPass} className="border border-transparent enabled:hover:border-[#E9EDDE]/25 disabled:cursor-not-allowed disabled:text-[#E9EDDE]/75 enabled:hover:text-burgundy-900 group px-2 py-1 rounded-lg space-x-1 enabled:hover:scale-[1.025] transition-all ease-in flex mdTall:flex-row flex-col items-center justify-center mdTall:text-2xl text-lg font-semibold mt-2 w-fit self-center">Sign up</button>
            </main>
        )
    } else if(screenTwo){
        return(
            <main className="h-fullscreen w-full flex flex-col justify-center">
                <section className="flex flex-col items-center w-fit self-center">
                    <h1 className="xl:text-7xl xl:font-black xl:tracking-wider text-center border-b-2 border-b-[#E9EDDE]/25 w-fit px-2 pb-1">Just a little more</h1>
                    <p className="text-center py-1 w-full">We just need a little more data to make a profile for you.<br />You need to answer <span className="text-burgundy-800 text-lg">all</span> the questions before you can have an account.</p>
                </section>
                <section className="flex flex-col items-center space-y-4 mt-1">
                    <section className="mdTall:w-1/2 2xl:w-1/3 flex space-x-2">
                        <div className="flex flex-col flex-grow">
                            <label htmlFor="firstName" className="ml-2 text-2xl self-center">First Name</label>
                            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="text-xl w-full outline-none border-none focus:ring-0 bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <label htmlFor="lastName" className="ml-2 text-2xl self-center">Last Name</label>
                            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="text-xl w-full outline-none border-none focus:ring-0 bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                        </div>
                    </section>
                    <section className="mdTall:w-1/2 2xl:w-1/3 flex space-x-2">
                        <article className="flex flex-col flex-grow w-1/2">
                            <span className="text-center text-2xl font-semibold border-b border-[#E9EDDE]/10 w-fit pb-1 self-center px-2">What's your gender?</span>
                            <section className="flex flex-col">
                                <section className="flex">
                                    <div className="w-1/2">
                                        <input type="radio" name="gender" id="male" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                        <label htmlFor="male" className="ml-2 text-xl self-center">Male</label>
                                    </div>
                                    <div className="w-1/2">
                                        <input type="radio" name="gender" id="female" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                        <label htmlFor="female" className="ml-2 text-xl self-center">Female</label>
                                    </div>
                                </section>
                                <section className="flex">
                                    <div className="w-1/2">
                                        <input type="radio" name="gender" id="non-binary" value="non-binary" checked={gender === "non-binary"} onChange={(e) => setGender(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                        <label htmlFor="non-binary" className="ml-2 text-xl self-center">Non-binary</label>
                                    </div>
                                    <div className="w-1/2">
                                        <input type="radio" name="gender" id="none" value="none" checked={gender === "none"} onChange={(e) => setGender(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                        <label htmlFor="none" className="ml-2 text-xl self-center">Rather not say</label>
                                    </div>
                                </section>
                            </section>
                        </article>
                        <article className="flex flex-col flex-grow w-1/2">
                            <span className="text-center text-2xl font-semibold border-b border-[#E9EDDE]/10 w-fit pb-1 self-center px-2">What grade are you?</span>
                            <section className="flex justify-evenly">
                                <div>
                                    <input type="radio" name="grade" id="nine" value="9" checked={grade === "9"} onChange={(e) => setGrade(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                    <label htmlFor="nine" className="ml-2 text-xl self-center">9</label>
                                </div>
                                <div>
                                    <input type="radio" name="grade" id="ten" value="10" checked={grade === "10"} onChange={(e) => setGrade(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                    <label htmlFor="ten" className="ml-2 text-xl self-center">10</label>
                                </div>
                                <div>
                                    <input type="radio" name="grade" id="eleven" value="11" checked={grade === "11"} onChange={(e) => setGrade(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                    <label htmlFor="eleven" className="ml-2 text-xl self-center">11</label>
                                </div>
                                <div>
                                    <input type="radio" name="grade" id="twelve" value="12" checked={grade === "12"} onChange={(e) => setGrade(e.target.value)} className="bg-[#E9EDDE]/10 text-burgundy-900 focus:ring-0 border-none" />
                                    <label htmlFor="twelve" className="ml-2 text-xl self-center">12</label>
                                </div>
                            </section>
                        </article>
                    </section>
                </section>
                <button onClick={() => signUpWithEmail()} disabled={firstName === "" || lastName === "" || gender === "" || grade === ""} className="border border-transparent enabled:hover:border-[#E9EDDE]/25 disabled:cursor-not-allowed disabled:text-[#E9EDDE]/75 enabled:hover:text-burgundy-900 group px-2 py-1 rounded-lg space-x-1 enabled:hover:scale-[1.025] transition-all ease-in flex mdTall:flex-row flex-col items-center justify-center mdTall:text-2xl text-lg font-semibold mt-2 w-fit self-center">Confirm</button>
            </main>
        )
    }
}
