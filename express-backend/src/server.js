import express from "express"
import { teamInfo, teamEvents, getMatches } from "./data.js"
import cors from "cors"

const PORT = 8000
const app = express()
app.use(cors())

app.get("/api/get_team/:teamNum", async (req, res) => {
    res.json(await teamInfo(req.params.teamNum))
})

app.get("/api/get_events/:id", async (req, res) => {
    res.json(await teamEvents(req.params.id))
})

app.get("/api/get_matches/:eventID/:teamID", async (req, res) => {
    res.json(await getMatches(req.params.eventID, req.params.teamID))
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})