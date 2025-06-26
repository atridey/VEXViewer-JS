import SiteLogo from "../assets/vexview-logo-shad.svg"
import Clock from "./Clock"

export default function Header(props) {
    return (
        <header>
            <div id="leftSide">
                <img src={SiteLogo} style={props.isMobile ? {height: '50px', marginTop: '5px', marginBottom: '5px'} : null}/>
                {props.isMobile ? null : <><h1 style={{color: "#d22630"}}>VEX</h1><h1>Viewer</h1></>}
            </div>
                <Clock isMobile={props.isMobile}/>
        </header>
    )
}