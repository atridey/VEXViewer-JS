import { useEffect, useRef } from "react"

export default function MatchTable(props) {
    const tableRef = useRef(null)
    useEffect(() => {
        tableRef.current.scrollIntoView({behavior: "smooth", block: "start"})
    },
    [props.matchList] //should run just once initially
    )

    const rowList = []
    const formatTeam = (inputTeam) => (inputTeam==props.teamNum ? <u><b>{inputTeam}</b></u> : inputTeam)
    for (let i = 0; i < props.matchList.length; i++) {
        const thisMatch = props.matchList[i]
        const thisRow = (
            <tr>
                <td>{thisMatch.name}</td>
                <td>{thisMatch.scheduledTime}</td>
                <td>{thisMatch.actualTime}</td>
                <td>{thisMatch.field}</td>
                <td>{formatTeam(thisMatch.redAlliance[0])}, {formatTeam(thisMatch.redAlliance[1])}</td>
                <td><nobr className="redScore">{thisMatch.redScore}</nobr> - <nobr className="blueScore">{thisMatch.blueScore}</nobr></td>
                <td>{formatTeam(thisMatch.blueAlliance[0])}, {formatTeam(thisMatch.blueAlliance[1])}</td>
            </tr>
        )          
        rowList.push(thisRow)
    }

    return (
        <table id="matchTable" ref={tableRef}>
            <thead>
                <tr>
                    <th>Match</th>
                    <th>Scheduled Time</th>
                    <th>Actual Time</th>
                    <th>Field</th>
                    <th>Red Alliance</th>
                    <th>Score</th>
                    <th>Blue Alliance</th>
                </tr>
            </thead>

            <tbody>
                {rowList}
            </tbody>
        </table>
    )
}