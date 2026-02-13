"use client"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { BankTransferProps } from "./bank-transfer";

interface User {
    name: string;
    number: string;
}

  
function SenderDetail({ onSent, onChangeMethod }: BankTransferProps) {
    const [userDetail,setUserDetail] = useState({
        name: "",
        number:""
    })
    const [errorCheck,setErrorCheck] = useState(false)
console.log(userDetail)
    return <>
         <div className="flex gap-3 items-center mb-6">
            <button
                onClick={onChangeMethod}
            >
          <ArrowLeft className="w-5 h-5 text-[#111528]" />
        </button>
        <span className="text-gray-900 font-medium">
        Pay with Bank Transfer
        </span>
      </div>
            <form className="grid gap-5">
        <h3 className="text-[#5A5F73]">Sender Details</h3>
        <div className="bg-[#F3F4F6] flex flex-col gap-2.5 p-3 rounded-lg">
                <input type="text" onChange={(e) => setUserDetail((prev: User) => {
                    return { ...prev, name: e.target.value }
                })} placeholder="Enter your name" className={`bg-[#FFFFFF] placeholder:text-[#5A5F73] py-3 px-4 rounded-md focus:border-none focus:outline-[#003DFF] focus:outline-1 text-black border border-[#E3E3E3] ${errorCheck && userDetail.name == ""?"border-red-600":""}`} />
        <input  onChange={(e) => setUserDetail((prev: User) => {
            return {...prev,number:e.target.value}
        })}  type="number" placeholder="Enter your Phone Number" className={`bg-[#FFFFFF] placeholder:text-[#5A5F73] py-3 px-4 rounded-md focus:border-none focus:outline-[#003DFF] focus:outline-1 text-black border border-[#E3E3E3] ${errorCheck && userDetail.number == ""?"border-red-600":""}`} />
        </div>
        
            <button
                type="button"
                onClick={() => {
                    if (userDetail.name === "" || userDetail.number === "") {
                        setErrorCheck(true)
                    } else {
                        onSent()
                    }
        }}
        className="w-full py-4 rounded-xl font-medium text-white bg-[#003DFF] hover:bg-[#002dbf] shadow-lg shadow-blue-500/20 transition-all mt-6"
      >
        Next
      </button>
    </form>
    </>

}

export default SenderDetail