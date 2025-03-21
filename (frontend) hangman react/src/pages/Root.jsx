import React from "react";
import { Outlet } from "react-router";
import { MainNavigation } from "../components/MainNavigation";
import { GameProvider } from "../context/GameContext";
import classes from './Root.module.css';

export function RootLayout() {
    return (
        <>
            <MainNavigation />
            <GameProvider>
                <main className={classes.content}>
                    <Outlet />
                </main>
            </GameProvider>
        </>
    );
}
