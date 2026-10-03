"use client"
import { useState,useEffect} from 'react'
import Link from 'next/link'
import Axios from 'axios'

import {faTrash,faPen,faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function PopUp_create({ name, desc, setName, setDesc,setPop,addJournal,onClickPreventDefault}) {
  return (
    <div>
      <div className=" fixed top-[0] left-[0] w-full h-full bg-black bg-opacity-20" onClick={() => { setName(""); setDesc(""); }}>{/* Reset state on close */}</div>
      <div className="border-4 border-black flex justify-center items-center w-[30%] h-[60%] p-[1rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white">
        <p className="absolute top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={() => { setName(""); setDesc(""); setPop(false); }}>X</p>
        <form onSubmit={addJournal} className="h-[100%] w-[100%] flex flex-col justify-evenly items-center">
          <input onChange={e => setName(e.target.value)} value={name} type="text" className="p-[1rem] w-[90%] h-[10%] border-2 border-gray-900" placeholder="journal name" />
          <textarea onChange={e => setDesc(e.target.value)} value={desc} type="text" className="p-[1rem] w-[90%] h-[60%] border-2 border-gray-900" placeholder="journal description" />
          <input onSubmit={onClickPreventDefault} className="border-2 border-gray-900 p-[1rem] pt-[0.5rem] pb-[0.5rem]" type="submit" value="Create journal" />
        </form>
      </div>
    </div>
  );
}
function PopUp_edit({ name, desc, setName, setDesc,setPop,editJournal,onClickPreventDefault}) {
  return (
    <div>
      <div className=" fixed top-[0] left-[0] w-full h-full bg-black bg-opacity-20" onClick={() => { setName(""); setDesc(""); }}>{/* Reset state on close */}</div>
      <div className="border-4 border-black flex justify-center items-center w-[30%] h-[60%] p-[1rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white">
        <p className="absolute top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={() => { setName(""); setDesc(""); setPop(false); }}>X</p>
        <form onSubmit={editJournal} className="h-[100%] w-[100%] flex flex-col justify-evenly items-center">
          <input onChange={e => setName(e.target.value)} value={name} type="text" className="p-[1rem] w-[90%] h-[10%] border-2 border-gray-900" placeholder="journal name" />
          <textarea onChange={e => setDesc(e.target.value)} value={desc} type="text" className="p-[1rem] w-[90%] h-[60%] border-2 border-gray-900" placeholder="journal description" />
          <input onSubmit={onClickPreventDefault} className="border-2 border-gray-900 p-[1rem] pt-[0.5rem] pb-[0.5rem]" type="submit" value="Update journal" />
        </form>
      </div>
    </div>
  );
}






export default function page() {

var user_id="angy123"
//displaying journals
const [journals, setJournal]=useState([]);
const [data,setData]=useState([]);
const [pop,setPop]=useState(false)

const [editPop,setEditPop]=useState(false)

//form and adding journal
const [name,setName]=useState("")
const [desc,setDesc]=useState("")

const [editId,setEditId]=useState(0)

const deleteJournal=async(ID)=>{
  
  try{
   const response =await Axios.delete("http://localhost:3001/delete_journal",{
    params:{user_id:"angy123",
    ID:ID
  }
    }).then(()=>{fetch_journals()})
  } catch (error) {
    console.error("Error fetching journals:", error);
  }

}

function Journal(props) {

  return (
   


    <div className="p-[1.25rem] flex justify-center items-center border-4 border-black text-black w-[25vw] h-[50vh]">
      <div className="flex flex-col w-[90%] h-[95%] ">
        <div className=" mb-[1rem] border-black border-2 p-[1rem] text-[1.5em]">
          {props.name}

        </div>
        <div className="mb-[1rem] flex justify-evenly *:p-[0.25rem]  *:w-[30%] *:text-center w-[100%] border-2 border-black">
          <div className="">
           <p>created at: {props.creation}</p>
          </div>
          <div>
           <p>last edit: {props.edit}</p>
          </div>
        </div>
        <div className="border-black border-2 h-[35%] p-[1rem] text-[1.25rem] mb-[1rem]">
          {props.desc}
        </div>
        <div className="*:cursor-pointer   mb-[1rem] flex *:flex *:justify-center *:border-black *:border-2 *:items-center *:text-[1.25em] *:w-[47%] justify-between w-[100%] ">
          <div className="" onClick={()=>{setEditId(props.ID); setEditPop(true); console.log("hi")}}><FontAwesomeIcon icon={faPen} />Edit</div>
          <div className="" onClick={()=>{deleteJournal(props.ID)}} ><FontAwesomeIcon icon={faTrash}/>Discard</div>
        </div>
        <Link className="w-[100%] border-2 border-black flex justify-center items-center text-[1.25em]"  href={{
    pathname:'/main/entry',
    query: {
     journal_id:props.key
    }, // the data
  }}>
          Open Journal
        </Link>
      </div>
    </div>
    
  );
}


function onClickPreventDefault(e){
  e.preventDefault()
}
const addJournal= async(e)=>{
  e.preventDefault() 
  console.log("WE SUBMITTING")
  try {
    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
    const response = await Axios.post("http://localhost:3001/create_journal", {
      journal_name:name,
      journal_desc:desc,
      createDate:`${year}-${month}-${day}`,
      editDate:`${year}-${month}-${day}`,
      owner_ID:user_id
      }).then(()=>{fetch_journals()})
  } catch (error) {
    console.error("Error fetching journals:", error);
    // Handle the error appropriately, e.g., display an error message to the user
  
  }
}


const editJournal= async(e)=>{
  e.preventDefault() 
  console.log("WE SUBMITTING")
  try {
    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
    const response = await Axios.post("http://localhost:3001/edit_journal", {
      journal_name:name,
      journal_desc:desc,
      editDate:`${year}-${month}-${day}`,
      ID:editId
      }).then(()=>{fetch_journals()})
  } catch (error) {
    console.error("Error fetching journals:", error);
    // Handle the error appropriately, e.g., display an error message to the user
  
  }
}






const fetch_journals = async ()=>{
console.log("ran the fetch!")
  try {
    const response = await Axios.get("http://localhost:3001/fetch_journals", {
      params: { user_id: "angy123" }
    });
  
    setData(response.data);
  } catch (error) {
    console.error("Error fetching journals:", error);
    // Handle the error appropriately, e.g., display an error message to the user
  
  }
}
 useEffect(()=>{
 fetch_journals()
  },[])
   useEffect(()=>{

        setJournal(data.map((item) => {
    const dateObjectC = new Date(item.createDate);
    const dateObjectE = new Date(item.editDate);

    const yearC = dateObjectC.getFullYear();
    const monthC = String(dateObjectC.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const dayC = String(dateObjectC.getDate()).padStart(2, '0');

    const yearE = dateObjectE.getFullYear();
    const monthE = String(dateObjectE.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const dayE = String(dateObjectE.getDate()).padStart(2, '0');

   console.log("item id is "+item.ID)
    const formattedDateC = `${yearC}-${monthC}-${dayC}`
    const formattedDateE = `${yearE}-${monthE}-${dayE}`

        return (<Journal ID={item.ID} name={item.journal_name} desc={item.journal_desc} creation={formattedDateC} edit={formattedDateE}  />)
}))
  },[data])
  

  return (
    <main className="w-[100vw]">
        <button  onClick={()=>{setPop(true)}} className="flex cursor-pointer   items-center w-[15vw] justify-evenly absolute right-[2vw] p-[1rem]  top-[12.5vh] border-2 border-black text-black"><p className="text-[1.5em]">Add new journal</p> <FontAwesomeIcon className="text-black text-[1.5em]" icon={faCirclePlus} /></button>
      <h1 className=" text-center text-[4em] mt-[12.5vh]">your Journals</h1>

        <div className="mt-[2rem] w-[100%] flex justify-center items-center">
            
          {journals.length<3 ? <div className="w-[80%]  flex justify-evenly">
            {journals}
          </div> : <div className="w-[80%] grid-cols-3 gap-4 grid">
            {journals}
          </div>

        }

        </div>
{pop && <PopUp_create setPop={setPop} name={name} 
desc={desc} setName={setName} setDesc={setDesc}
 addJournal={addJournal} 
 onClickPreventDefault={onClickPreventDefault} />}
{editPop && <PopUp_edit setPop={setEditPop} name={name} 
desc={desc} setName={setName} setDesc={setDesc} 
editJournal={editJournal} 
onClickPreventDefault={onClickPreventDefault} />}
    </main>

  );
} 