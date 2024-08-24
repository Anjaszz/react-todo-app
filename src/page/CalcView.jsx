import { useState } from "react";
import TitleHead from "../components/TitleHead";

const CalcView = () => {
    const numbers = Array.from({ length: 9 }, (_, index) => 9 - index);
    const [Result,SetResult] = useState('')
    const handleClick = (event) => {
        SetResult(Result.concat(event.target.value))
    }
    const Clear=() => {
        SetResult('')
    }
    const Calculate = () => {
        SetResult(eval(Result).toString())
    }
    return (
        <>
            <TitleHead title="Kalkulator" />

            <div className="max-w-xs mx-auto p-5 rounded-lg bg-slate-100 shadow-md">
                <input 
                    type="text" 
                    placeholder="0"
                    value={Result}
                    className="w-full p-3 text-2xl mb-3 rounded border border-gray-300 box-border"
                />
                <div className="grid grid-cols-4 gap-3">
                    {numbers.map(number => (
                        <input 
                        onClick={handleClick}
                            key={number} 
                            type="button" 
                            value={number} 
                            className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                        />
                    ))}
                    <input 
                       onClick={handleClick}
                        type="button" 
                        value="0" 
                        className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={handleClick}
                        type="button" 
                        value="+" 
                        className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={handleClick}
                        type="button" 
                        value="-" 
                        className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={handleClick}
                        type="button" 
                        value="*" 
                        className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={handleClick}
                        type="button" 
                        value="/" 
                        className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={handleClick}
                        type="button" 
                        value="%" 
                        className="p-4 text-lg rounded border border-gray-300 bg-gray-200 hover:bg-gray-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={Clear}
                        type="button" 
                        value="Clear" 
                        className="col-span-2 p-4 text-lg rounded border border-gray-300 bg-red-200 hover:bg-red-300 transition duration-300 cursor-pointer"
                    />
                    <input 
                     onClick={Calculate}
                        type="button" 
                        value="=" 
                        className="col-span-2 p-4 text-lg rounded border border-gray-300 bg-green-200 hover:bg-green-300 transition duration-300 cursor-pointer"
                    />
                </div>
            </div>
        </>
    );
};

export default CalcView;
