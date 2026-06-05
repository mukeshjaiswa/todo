"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';


export default function Popup({ setPopUp, selectedtask, list, setList }) {

    const [updatetask, setUpdateTask] = useState('')


    useEffect(() => {
        if (selectedtask) {
            setUpdateTask(selectedtask.task);
        }

    }, [selectedtask])
    // edit task
    const edittask = () => {
        if (!updatetask.trim()) {
            toast.warn("Task cannot be empty");
            return;
        }
        const updatelist = list.map((item) => item.id === selectedtask.id ? { ...item, task: updatetask } : item)
        setList(updatelist)


        localStorage.setItem("todo", JSON.stringify(updatelist))

        toast.success("Updated Successfully")
        setPopUp(false)


    }
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setPopUp(false)}
            ></div>
            <div className=' w-[80%] sm:w-100 bg-white z-10 rounded-md px-5'>
                <div className='flex w-full py-2  justify-between mt-5  '>
                    <h1 className='text-xl font-bold'>Edit task </h1>
                    <h1 onClick={() => setPopUp(false)} className='cursor-pointer text-xl hover:text-gray-400'>X</h1>
                </div>

                <div className=' w-full py-2'>
                    <input value={updatetask} onChange={(e) => setUpdateTask(e.target.value)} type="text" placeholder='Add your task' className='w-full  bg-gray-100 rounded-md outline-none py-2 px-3' />
                    <div className='place-self-end'>
                        <button onClick={edittask} className=' py-2 bg-green-500 text-white font-semibold px-5 mt-2 rounded-md cursor-pointer hover:bg-green-600'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
