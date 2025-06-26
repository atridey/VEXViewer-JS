import { useState, useEffect } from "react"

export default function Clock(props) {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);
    
    return(
        <h1 className="clock" style={props.isMobile ? {fontSize: '1.3rem'} : null}>{time.toLocaleTimeString('default', {hour12: false})}</h1>
    )
}