import SiteLogo from "../assets/vexview-logo-shad.svg"
import Clock from "./Clock"

export default function Header() {
    return (
        <header>
            <div id="leftSide">
                <img src={SiteLogo} />
                <h1 style={{color: "#d22630"}}>VEX</h1><h1>Viewer</h1>
            </div>
                <Clock />
        </header>
    )
}