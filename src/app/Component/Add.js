"use client"
import { Fascinate } from 'next/font/google';
import React, { useState, useEffect } from 'react'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { RiEditCircleLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import Popup from './Popup';


export default function Add() {
    const [task, setTask] = useState("")
    const [list, setList] = useState([])
    const [popup, setPopUp] = useState(false)
    const [selectedtask, setSelectedTask] = useState(null);


    useEffect(() => {
        const getdata = localStorage.getItem("todo")
        if (getdata) {

            setList(JSON.parse(getdata))
        }

    }, [])
    // add new task
    const addlist = () => {
        if (task === '') {
            toast.warn("Please enter task")
        }
        else {
            const newtask = {
                id: Date.now(),
                task: task
            }
            const updatelist = [...list, newtask]
            setList(updatelist)
            localStorage.setItem("todo", JSON.stringify(updatelist))
            setTask("");

            toast.success("Added Successfully");


        }
    }
    // delete task
    const deletetask = (id) => {
        const updatelist = list.filter((item) => item.id !== id)
        setList(updatelist)
        toast.success("Deleted Successfully")
        localStorage.setItem("todo", JSON.stringify(updatelist))


    }


    // delete all task
    const clearall = () => {
        localStorage.removeItem("todo")
        toast.success("Clear all task sucessfully")
        setList([])
    }
    return (

        <div className="bg-white shadow rounded-md w-[80%] sm:w-100 px-4 sm:px-10 py-5 ">
            <h1 className="text-2xl font-semibold text-blue-800 py-2  flex  gap-2">To-Do List
                <IoDocumentTextOutline />
            </h1>

            {/* input section */}
            <div className='flex items-center rounded-xl bg-gray-200'>
                <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder='Add your task' className='w-full outline-none py-2 px-3' />
                <button onClick={addlist} className='bg-blue-500 text-white rounded-xl py-2 px-5 cursor-pointer hover:bg-blue-600 font-semibold'>Add</button>
            </div>
            {/* task section */}
            {list.length === 0 ? null : <h1 onClick={clearall} className='text-end mt-2 hover:font-semibold cursor-pointer text-blue-600'>Clear All</h1>
            }

            <div className='mt-2 w-full '>
                {list.map((item, index) => (


                    <label key={index} className="flex items-center w-full gap-2  mx-auto  justify-between py-1">

                        <div className='flex  gap-2'>
                            <h1 className='text-gray-600'>{index + 1}.</h1>
                            <h1 >     {item.task}</h1>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button onClick={() => {
                                setPopUp(true)
                                setSelectedTask(item)
                            }}
                                className='hover:text-gray-300 cursor-pointer px-4 py-2 rounded-md  bg-zinc-100'>
                                <RiEditCircleLine size={25} />
                            </button>


                            <button onClick={() => deletetask(item.id)} className='hover:text-gray-300 cursor-pointer px-4 py-2 rounded-md  bg-red-500 text-white'>X</button>
                        </div>
                    </label>
                ))}
            </div>
            {
                popup ?
                    <Popup setPopUp={setPopUp} selectedtask={selectedtask} list={list} setList={setList} />
                    : ""
            }
        </div >
    )
}

const tasklist = [
    {
        id: 1,
        task: 'lorem Lorem ipsum dolor sit amet.'
    },
    {
        id: 2,
        task: 'lorem Lorem ipsum dolor sit amet.'
    },
    {
        id: 3,
        task: 'lorem Lorem ipsum dolor sit amet.'
    },
    {
        id: 4,
        task: 'lorem Lorem ipsum dolor sit amet.'
    },
]