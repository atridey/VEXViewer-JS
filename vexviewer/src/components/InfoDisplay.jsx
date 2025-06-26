export default function InfoDisplay(props) {
    return (
        <>
            <section id="teamInfo">
            {props.teamInfo.exists
            ?<>
                <h1>Team information:</h1>
                <div id="infoGrid">
                    <div>
                        <h3>Team Name:</h3>
                        <p>{props.teamInfo.teamName}</p>
                    </div>
                    <div>
                        <h3>Robot Name:</h3>
                        <p>{props.teamInfo.robotName}</p>
                    </div>
                    <div>
                        <h3>School:</h3>
                        <p>{props.teamInfo.school}</p>
                    </div>
                    <div>
                        <h3>Location:</h3>
                        <p>{props.teamInfo.location}</p>
                    </div>
                </div>
            </>

            :<h1>Team not found</h1>}

            </section>
        </>
    )
}