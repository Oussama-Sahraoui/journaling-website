'use client';
import {faHouse, faBars} from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function RootLayout({ children }) {
  let username="angy"
  let path=usePathname()

  return (
    <div>
        <div className="fixed left-[0] top-[0] bg-gray-900 w-screen h-[7.5vh] text-white flex items-center justify-between">
          <div className="ml-[2rem] flex justify-between items-center w-[13vw] h-[4vh]">
            
             {path.includes("entry") && <FontAwesomeIcon className=" text-[1.75em]"  icon={faBars} />} 
             { (path.includes("entry") || path.includes("up") ) && <Link href="/main/home"><FontAwesomeIcon className=" text-[1.75em]" icon={faHouse} /></Link>}

            <Link href="/main/home"> <p className="text-[2em]">Web Nikki</p> </Link>
          </div>
          <div className="mr-[2rem] flex items-center">
            <p className="text-[2em] mr-[1rem]">{username}</p>
           <FontAwesomeIcon  className="text-[1.5em]" icon={faSquarePlus} />
          </div>
        </div>
      <div className="mt-[7.5vh]">  
      {children}
      </div>
    </div>
  );
}

