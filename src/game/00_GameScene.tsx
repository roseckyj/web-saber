import {
    Color3,
    Color4,
    Engine,
    FreeCamera,
    HemisphericLight,
    Mesh,
    Scene,
    Sound,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";
import { wallType } from "../types/songPackageFormat";
import { Track } from "./01_Track";
import { Beatset } from "./02_Beatset";
import { MaterialLibrary } from "./05_Material";

const EARTH_RADIUS = 200;

export class GameScene {
    private currentTrack: Track;
    private currentBeatset: Beatset;
    private scene: Scene;
    private sound: Sound;

    public constructor(
        engine: Engine,
        track: Track,
        diffset: number,
        beatmap: number
    ) {
        this.currentTrack = track;
        this.scene = new Scene(engine);

        /* Material init */
        MaterialLibrary.init(this.scene);

        /* Scene init */
        this.scene.clearColor = new Color4(147 / 255, 209 / 255, 255 / 255, 1);
        var camera = new FreeCamera(
            "camera1",
            new Vector3(0, 2, 0),
            this.scene
        );
        camera.setTarget(new Vector3(0, 2, 10));
        camera.attachControl(engine._workingCanvas, false);
        new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);

        const ground = Mesh.CreateSphere(
            "ground",
            100,
            EARTH_RADIUS * 2,
            this.scene
        );
        ground.position = new Vector3(0, -EARTH_RADIUS, 0);
        ground.material = MaterialLibrary.materials["ground"];

        this.currentBeatset = track.getBeatmap(diffset, beatmap, this.scene);

        this.sound = new Sound("song", track.getAudio(), this.scene, () => {
            this.sound.play();
        });

        this.scene.createDefaultXRExperienceAsync({});
    }

    public tick() {
        const currentBeat =
            this.sound.currentTime *
            (this.currentTrack.manifest._beatsPerMinute / 60);
        this.currentBeatset.notes.forEach((note) => {
            if (
                note.manifest._time <= currentBeat + 15 &&
                note.manifest._time >= currentBeat
            ) {
                const distance =
                    ((note.manifest._time - currentBeat) *
                        this.currentBeatset.manifest._noteJumpMovementSpeed) /
                    EARTH_RADIUS;

                note.mesh.position = new Vector3(
                    note.manifest._lineIndex - 1.5,
                    note.manifest._lineLayer +
                        0.5 -
                        EARTH_RADIUS * (1 - Math.cos(distance)),
                    EARTH_RADIUS * Math.sin(distance)
                );
                note.mesh.rotation = new Vector3(distance, 0, note.getAngle());
                note.mesh.visibility = 1;
            } else {
                note.mesh.visibility = 0;
            }
        });
        this.currentBeatset.obstacles.forEach((obstacle) => {
            if (
                obstacle.manifest._time <= currentBeat + 15 &&
                obstacle.manifest._time + obstacle.manifest._duration >=
                    currentBeat
            ) {
                const distance =
                    ((obstacle.manifest._time - currentBeat) *
                        this.currentBeatset.manifest._noteJumpMovementSpeed) /
                    EARTH_RADIUS;

                obstacle.mesh.position = new Vector3(
                    obstacle.manifest._lineIndex -
                        2 +
                        obstacle.manifest._width / 2,
                    (obstacle.manifest._type === wallType.Full ? 1.5 : 2.5) -
                        EARTH_RADIUS * (1 - Math.cos(distance)),
                    EARTH_RADIUS * Math.sin(distance)
                );
                obstacle.mesh.scaling = new Vector3(
                    obstacle.manifest._width - 0.2,
                    obstacle.manifest._type === wallType.Full ? 4 : 2,
                    obstacle.manifest._duration *
                        this.currentBeatset.manifest._noteJumpMovementSpeed
                );
                obstacle.mesh.rotation = new Vector3(distance, 0, 0);
                obstacle.mesh.visibility = 0.4;
            } else {
                obstacle.mesh.visibility = 0;
            }
        });

        this.scene.render();
    }
}
