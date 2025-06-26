import "dotenv/config" //key = process.env.RECAPI
const authHeader = {'Authorization' : 'Bearer ' + process.env.RECAPI}

export async function teamInfo(teamNum) {
    const r = await fetch(`https://www.robotevents.com/api/v2/teams?number%5B%5D=${teamNum}&myTeams=false`, {headers: authHeader})
    const response = await r.json()
    if (response.meta.total == 0) {
        return {'exists': false}
    } else {
        //Exclude IQ teams, pick V5
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].program.code == "V5RC") {
                var teamIndex = i //function scoping save me
                break
            }
        }
        if (teamIndex!= 0 && !teamIndex) { //Excluding index 0, please let ts be falsy
            return {'exists': false}
        } else {
            const teamData = response.data[teamIndex]
            const id = teamData.id
            const teamName = teamData.team_name
            const robotName = teamData.robot_name
            const school = teamData.organization
            let location = teamData.location.city

            //Below needed because Taiwan, UK, etc are weird
            if (teamData.location.region) {
                location += ", " + teamData.location.region
            } else { //Banking on null and DNE being falsy
                location += ", " + teamData.location.country
            }
            return {'exists': true, 'id' : id, 'teamName' : teamName, 'robotName' : robotName, 'school' : school, 'location': location}
        }
    }
}

export async function teamEvents(id) {
    const thisYear = new Date().getFullYear()
    const r = await fetch(`https://www.robotevents.com/api/v2/teams/${id}/events?start=${thisYear}-01-01&end=${thisYear+1}-12-31`, {headers: authHeader})
    const data = (await r.json()).data
    let eventList = []
    for (let i = data.length-1; i>=0; i--) {
        const currentEvent = data[i]
        let location = currentEvent.location.venue + ", " + currentEvent.location.city
        if (currentEvent.location.region) { //Kuwait doesn't like regions apparently
            location += ", " + currentEvent.location.region
        }

        let divisions = []
        for (let j = 0; j < currentEvent.divisions.length; j++) {
            divisions.push(currentEvent.divisions[j].id)
        }

        eventList.push({"id" : currentEvent.id, "name" : currentEvent.name, 'date' : currentEvent.start.slice(0,10), 'location' : location, 'divisions': divisions, 'ongoing' : currentEvent.ongoing, 'startTimestamp': currentEvent.start} )
        }
    return eventList
}

export async function getMatches(eventID, teamID) {
    const r = await fetch(`https://www.robotevents.com/api/v2/teams/${teamID}/matches?event%5B%5D=${eventID}`, {headers: authHeader})
    const matches = (await r.json()).data

    let allMatchData = []
    for (let i=0; i<matches.length; i++) {
        const match = matches[i]
        const alliances = match.alliances
        const blueAlliance = [alliances[0].teams[0].team.name, alliances[0].teams[1].team.name] //first alliance always blue
        const redAlliance = [alliances[1].teams[0].team.name, alliances[1].teams[1].team.name]

        let scheduledTime = null //would need a var anyways for block scoping
        if (match.scheduled) {
            scheduledTime = match.scheduled.slice(11, 16)
        }
        let actualTime = null
        if (match.started) {
            actualTime = match.started.slice(11, 16)
        }

        let matchData = {"name" : match.name, "scheduledTime" : scheduledTime, "actualTime": actualTime,  "field" : match.field, "blueAlliance" : blueAlliance, "redAlliance" : redAlliance}

        if (match.alliances[0].score && match.alliances[1].score) {
            matchData.blueScore = match.alliances[0].score
            matchData.redScore = match.alliances[1].score
        }
        allMatchData.push(matchData)
    }
    return allMatchData
}