import { Engine, Viewport } from "@babylonjs/core";
import React from "react";
import { GameScene } from "./game/00_GameScene";
import { Track } from "./game/01_Track";

function App() {
    return (
        <>
            <div id="loading">
                The song is loading, it can take up to few minutes...
            </div>
            <div id="error">
                There was an error loading the song:
                <div id="errorDesc" />
            </div>
            <canvas
                id="renderCanvas"
                width="1200"
                height="700"
                ref={async (canvas) => {
                    canvas!.width = window.innerWidth;
                    canvas!.height = window.innerHeight;

                    document.addEventListener("resize", () => {
                        canvas!.width = window.innerWidth;
                        canvas!.height = window.innerHeight;
                    });

                    const engine = new Engine(canvas);

                    try {
                        const scene = new GameScene(
                            engine,
                            await new Track().loadAsync(
                                "https://cdn.beatsaver.com/17ad188a8dea7cff81f5f7c6720099a1e395b168.zip"
                            ),
                            0,
                            3
                        );

                        document.getElementById("loading")!.style.display =
                            "none";

                        engine.runRenderLoop(function () {
                            scene.tick();
                        });
                    } catch (e) {
                        document.getElementById("loading")!.style.display =
                            "none";
                        document.getElementById("error")!.style.display =
                            "block";
                        document.getElementById("errorDesc")!.innerText = e;
                    }
                }}
            />
        </>
    );
}

export default App;
