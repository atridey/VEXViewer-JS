import { useEffect, useRef } from "react"

export default function MatchTable(props) {
    const tableRef = useRef(null)
    useEffect(() => {
        tableRef.current.scrollIntoView({behavior: "smooth", block: "start"})
    },
    [props.matchList] //should run just once initially
    )

    const headerStyle = props.isMobile ? {fontSize: "0.7rem"} : null
    const dataStyle = props.isMobile ? {fontSize: "0.6rem"} : null

    const rowList = []
    const formatTeam = (inputTeam) => (inputTeam==props.teamNum ? <u><b>{inputTeam}</b></u> : inputTeam)
    for (let i = 0; i < props.matchList.length; i++) {
        const thisMatch = props.matchList[i]
        const thisRow = (
            <tr>
                <td style={dataStyle}>{thisMatch.name}</td>
                <td style={dataStyle}>{thisMatch.scheduledTime}</td>
                <td style={dataStyle}>{thisMatch.actualTime}</td>
                <td style={dataStyle}>{thisMatch.field}</td>
                <td style={dataStyle}>{formatTeam(thisMatch.redAlliance[0])}, {formatTeam(thisMatch.redAlliance[1])}</td>
                <td style={dataStyle}><nobr className="redScore">{thisMatch.redScore}</nobr> - <nobr className="blueScore">{thisMatch.blueScore}</nobr></td>
                <td style={dataStyle}>{formatTeam(thisMatch.blueAlliance[0])}, {formatTeam(thisMatch.blueAlliance[1])}</td>
            </tr>
        )          
        rowList.push(thisRow)
    }

    return (
        <table id="matchTable" ref={tableRef}>
            <thead>
                <tr>
                    <th style={headerStyle}>Match</th>
                    <th style={headerStyle}>Scheduled Time</th>
                    <th style={headerStyle}>Actual Time</th>
                    <th style={headerStyle}>Field</th>
                    <th style={headerStyle}>Red Alliance</th>
                    <th style={headerStyle}>Score</th>
                    <th style={headerStyle}>Blue Alliance</th>
                </tr>
            </thead>

            <tbody>
                {rowList}
            </tbody>
        </table>
    )
}