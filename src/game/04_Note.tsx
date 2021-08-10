import { Scene, Mesh } from "@babylonjs/core";
import { uuid } from "uuidv4";
import { note, noteDirection, noteType } from "../types/songPackageFormat";
import { MaterialLibrary } from "./05_Material";

export class Note {
    public mesh: Mesh;

    public constructor(public manifest: note, private scene: Scene) {
        this.mesh = Mesh.CreateCylinder(uuid(), 0.8, 0, 0.8, 10, 1, scene);
        this.mesh.material =
            MaterialLibrary.materials[
                manifest._type === noteType.Red ? "red" : "blue"
            ];
        this.mesh.visibility = 0;
    }

    public getAngle() {
        switch (this.manifest._cutDirection) {
            case noteDirection.Up:
                return Math.PI * 0;
            case noteDirection.Down:
                return Math.PI * 1;
            case noteDirection.Left:
                return Math.PI * 1.5;
            case noteDirection.Right:
                return Math.PI * 0.5;
            case noteDirection.UpLeft:
                return Math.PI * 1.75;
            case noteDirection.UpRight:
                return Math.PI * 0.25;
            case noteDirection.DownLeft:
                return Math.PI * 1.25;
            case noteDirection.DownRight:
                return Math.PI * 0.75;
        }
    }
}
