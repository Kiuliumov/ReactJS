import { useState } from "react";

export default function Counter(){
    const [count, setCount] = useState(0);
    if(count > 20){
        return <div>Count is greater than 20</div>;
    }
    return (
        <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>
    )
}