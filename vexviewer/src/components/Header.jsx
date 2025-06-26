import SiteLogo from "../assets/vexview-logo-shad.svg"
import Clock from "./Clock"

export default function Header(props) {
    return (
        <header>
            <div id="leftSide">
                <img src={SiteLogo} style={props.isMobile ? {height: '50px', margin: '5px'} : null}/>
                <h1 style={props.isMobile ? {fontSize: "1.5rem", color: "#d22630"} : {color: "#d22630"}}>VEX</h1>
                <h1 style={props.isMobile ? {fontSize: "1.5rem"} : null}>Viewer</h1>
            </div>
                <Clock isMobile={props.isMobile}/>
        </header>
    )
}