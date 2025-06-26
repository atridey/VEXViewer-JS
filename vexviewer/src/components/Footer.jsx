import GithubLogo from "../assets/github-shadow.svg"

export default function Footer() {
    return (
        <footer>
            <div></div>             
            <div>
                <p>Made with ❤️ by 5501B</p>
                <p>©2025 Atri Dey</p>
            </div>
            <div>
                <a href="https://github.com/atridey/VEXViewer-JS" target="_blank">
                    <img src={GithubLogo} />
                </a>
            </div>
        </footer>
    )
}
