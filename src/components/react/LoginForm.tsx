import { useState } from "react";
// import { supabase } from "src/supabase";

export default function LoginForm(){
    const [isNew, setIsNew] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    //#region User Auth 
        // async function logInWithEmail(){
        //    const {error} = await supabase.auth.signInWithPassword({email, password: pass});
        //    if(error) throw error
        //    else window.location.reload();
        // }
    
        // async function signUpWithEmail(){
        //    const {data, error} = await supabase.auth.signUp({ email, password: pass});
        //    if(error) throw error
        // }
    
        // async function createNewUser(uuid:string){
        //     const {error} = await supabase.from("users").insert({user_id: uuid, first_name: firstName, last_name: lastName, friends: [], pfp : createAvatar(micah, {size:64, seed: uuid}).toDataUriSync()});
        //     if(error) throw error
        // }
    //#endregion

    if(!isNew){
        return(
            <main className="h-fullscreen w-full flex flex-col justify-center">
                <h1 className="xl:text-8xl xl:font-black xl:tracking-widest w-full text-center">Login</h1>
                <section className="flex flex-col items-center space-y-8 mdTall:w-2/3 2xl:w-1/3">
                    <div>
                        <label htmlFor="email" className="ml-2 text-2xl">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="pass" className="ml-2 text-2xl">Password</label>
                        <input type="password" name="pass" value={pass} onChange={(e) => setPass(e.target.value)} className="text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <button className="border border-transparent hover:border-[#E9EDDE]/25 hover:text-burgundy-900 group px-2 py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex mdTall:flex-row flex-col items-center justify-center mdTall:text-2xl text-lg font-semibold">Login</button>
                    <p>New user? Sign up <button onClick={() => setIsNew(true)}>here</button>.</p>
                </section>
            </main>
        )
    } else {
        return(
            <main className="h-fullscreen w-full flex flex-col justify-center">
                <h1 className="xl:text-8xl xl:font-black xl:tracking-widest w-full text-center">Sign up</h1>
                <section className="flex flex-col items-center space-y-8">
                    <div className="2xl:w-1/3">
                        <label htmlFor="email" className="ml-2 text-2xl">Email</label>
                        <input type="email" name="email" className="text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <div className="2xl:w-1/3">
                        <label htmlFor="pass1" className="ml-2 text-2xl">Password</label>
                        <input type="password" name="pass1" className="text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <div className="2xl:w-1/3">
                        <label htmlFor="pass2" className="ml-2 text-2xl">Confirm password</label>
                        <input type="password" name="pass2" className="text-xl w-full outline-none bg-[#E9EDDE]/10 py-1 px-2 rounded-lg" />
                    </div>
                    <button className="border border-transparent hover:border-[#E9EDDE]/25 hover:text-burgundy-900 group px-2 py-1 rounded-lg space-x-1 hover:scale-[1.025] transition-all ease-in flex mdTall:flex-row flex-col items-center justify-center mdTall:text-2xl text-lg font-semibold">Sign up</button>
                </section>
            </main>
        )
    }
}
