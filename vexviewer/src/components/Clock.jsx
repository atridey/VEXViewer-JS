import { useState, useEffect } from "react"

export default function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);
    
    return(
        <h1 className="clock" style={{justifySelf: "end"}}>{time.toLocaleTimeString('default', {hour12: false})}</h1>
    )
}