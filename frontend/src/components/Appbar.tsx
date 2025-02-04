import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-20 py-4">
        <Link to={'/blogs'} className="flex flex-row items-center justify-center cursor-pointer font-bold">
            <img src="https://cdn.freebiesupply.com/images/large/2x/medium-icon-white-on-black.png" className="w-10 h-10 object-contain rounded"/>
            <div className="font-bold pl-2 text-3xl">
                Radium
            </div>
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 font-medium hover:cursor-pointer rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name="Lokesh" />
        </div>
    </div>
  )
}

export default Appbar