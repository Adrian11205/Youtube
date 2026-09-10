
import {useState} from "react"
import {Moon, Sun} from "lucide-react"


export default function SwitchTheme(){

const [isDark, setIsDark] = useState(false)

const changeTheme =()=>{
    document.documentElement.classList.toggle("dark", !isDark)
    setIsDark(!isDark)
}

    return (
        <button onClick={changeTheme}
        className=" size-10 flex justify-center items-center rounded-2xl p-1 border border-blue-500">
{
    isDark ? <Moon/> : <Sun/>
}
        </button>
    )
}