import { useState } from "react"

export default function TeamForm(props) {
    return (
        <form action={props.handleSubmit}>
            <label htmlFor="team">Team Number:</label>
            <input type="text" id="team" name="team" placeholder=" e.g. 5501B" />
            <input type="submit" value="Go!" />
        </form>
    )
}