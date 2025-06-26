import { useState, useEffect } from 'react'
import Header from "./components/Header"
import TeamForm from "./components/TeamForm"
import InfoDisplay from "./components/InfoDisplay"
import EventGrid from "./components/EventGrid"
import MatchTable from "./components/MatchTable"
import Footer from "./components/Footer"

export default function App() {

  const baseURL = 'https://vexviewer.vercel.app'//window.location.href

  const [teamInfo, setTeamInfo] = useState(null)
  const [allEvents, setAllEvents] = useState(null)
  async function handleSubmit(formData) {
    const teamNum = formData.get("team").toUpperCase()
    var response = await fetch(`${baseURL}/api/get_team/${teamNum}`) //Use effects?
    const info = await response.json()
    setTeamInfo({...info, teamNum: teamNum})
    if (info.exists) {
      response = await fetch(`${baseURL}/api/get_events/${info.id}`)
      setAllEvents(await response.json())
    } else {
      setAllEvents(null)
    }
    setMatchList(null)
  }

  const [matchList, setMatchList] = useState(null)
  async function clickHandler(e) {
    const response = await fetch(`${baseURL}/api/get_matches/${e.target.id}/${teamInfo.id}`)
    setMatchList(await response.json())
  }

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 500) //event grid gets squished below this
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  },
  []
  )
  
  return (
    <>
      <Header isMobile={isMobile}/>
      <main style={isMobile ? {paddingTop: '80px'} : null}>
        <TeamForm handleSubmit={handleSubmit} />
        {teamInfo!=null ? <InfoDisplay teamInfo={teamInfo} /> : null}
        {allEvents!=null ? <EventGrid allEvents={allEvents} clickHandler={clickHandler} isMobile={isMobile}/> : null}
        {(matchList!=null&&allEvents.length>0) ? <MatchTable matchList={matchList} teamNum={teamInfo.teamNum} isMobile={isMobile}/> : null}
      </main>
      <Footer />
    </>
  )
}