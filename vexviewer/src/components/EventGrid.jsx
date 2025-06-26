import { useEffect, useRef } from "react"
import EventCard from "./EventCard"

export default function MatchGrid(props) {
    const gridRef = useRef(null)
    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.scrollIntoView({behavior: "smooth", block: "end"})
        }
    },
    [props.allEvents] //should run just once initially
    )

    const year = new Date().getFullYear()
    return (
        props.allEvents.length>0
        ? <>
            <h1 id="compHeading">{year}-{year+1} Competitions:</h1>
            <section id="eventGrid" ref={gridRef} style={props.isMobile ? {gridTemplate: "1fr / 1fr 1fr"} : null}>
                {props.allEvents.map(thisEvent => <EventCard eventInfo={thisEvent} clickHandler={props.clickHandler} />)}
            </section>
        </>
        : <h1 id="compHeading">No {year}-{year+1} Competitions Found.</h1>

    )
}