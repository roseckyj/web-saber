import { Scene } from "@babylonjs/core";
import { beatmap } from "../types/songPackageFormat";
import { Note } from "./04_Note";
import { Obstacle } from "./04_Obstacle";

export class Beatset {
    public notes: Note[];
    public obstacles: Obstacle[];

    public constructor(public manifest: beatmap, private scene: Scene) {
        this.notes = this.manifest.contents._notes.map(
            (note) => new Note(note, scene)
        );
        this.obstacles = this.manifest.contents._obstacles.map(
            (obstacle) => new Obstacle(obstacle, scene)
        );
    }
}
