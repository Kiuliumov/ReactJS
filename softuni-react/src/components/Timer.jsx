import { useState } from 'react';
import { useEffect } from 'react';

export default function Timer(){
    const [time, setTime] = useState(0);

    useEffect(() => {
    const timerId = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

    return (<div>Timer: {time}
     <p>Uses State.</p>
     </div>   
    );
}
