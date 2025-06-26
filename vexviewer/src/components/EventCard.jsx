export default function MatchCard(props) {
    return (
        <div className="eventCard">
            <h3>{props.eventInfo.name}</h3>
            <p>{props.eventInfo.date} {props.eventInfo.ongoing?"(Ongoing)":""}</p>
            <p>{props.eventInfo.location}</p>
            <input type="button" value="View Schedule" id={props.eventInfo.id} onClick={props.clickHandler}/>
        </div>
    )
}