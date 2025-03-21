import { Link } from "react-router";
import classes from "./MainNavigation.module.css"

export function MainNavigation() {
    return (
    <header className={classes.header}>
        <nav>
            <ul className={classes.list}>
                <li><Link to="/" style={{color:"darkslateblue"}}>Home Page</Link></li>
                <li><Link to="/game" style={{color:"darkslateblue"}}>Game</Link></li>
            </ul>
        </nav>
    </header>);
}