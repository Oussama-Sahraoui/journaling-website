import {faTrash,faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function page(){



	return(
	<div className="w-[120vw] h-[92.5vh] ml-[-20vw] flex justify-between items-center">
		
		<div className="w-[15%]  ml-[2vw] border-4 border-black *:border-2 *:border-black  *:p-[1rem] *:w-[90%] h-[95%] mt-[0.75rem] items-center justify-evenly flex flex-col ">
			<div className=" "><p>Current journal</p></div>
			<input className=" " type="text" placeholder="Search in journal" />
			<div className=" ">New entry</div>
			<div className=" h-[70%] "></div>
		</div>
		<div className="w-[85%] h-[95%] mt-[0.75rem] flex justify-center">
				<div className=" flex flex-col items-center justify-evenly *:w-[95%] w-[40%] h-[100%] border-4 border-black">
					<div className="h-[10%] border-2 border-black"><input className="text-[1.5em] w-[100%] h-[100%] p-[1rem]"  placeholder="entry title"/></div>
					<div className="h-[7.5%] *:text-[1.25em] *:border-black *:border-2 *:p-[0.5rem] flex items-center justify-between "><p className="flex flex-col p-[0]">Creation date:{"2024-07-05"}</p> <p className="flex flex-col p-[0]">Edit date:{"2024-07-05"}</p> <div><FontAwesomeIcon className="mr-[0.5rem]" icon={faTrash} />Discard</div> <div><FontAwesomeIcon className="mr-[0.5rem]" icon={faFloppyDisk} /> Save</div> </div>
					<textarea className="p-[1rem] h-[70%] border-2 border-black" placeholder="entry content"/>  
				</div>		
		</div>
	
	</div>
	)
}