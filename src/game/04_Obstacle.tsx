import { Scene, Mesh, Vector3 } from "@babylonjs/core";
import { uuid } from "uuidv4";
import { obstacle } from "../types/songPackageFormat";
import { MaterialLibrary } from "./05_Material";

export class Obstacle {
    public mesh: Mesh;

    public constructor(public manifest: obstacle, private scene: Scene) {
        this.mesh = Mesh.CreateBox(uuid(), 1, scene);
        this.mesh.scaling = new Vector3(manifest._width, 3, 1);
        this.mesh.material = MaterialLibrary.materials["obstacle"];
        this.mesh.visibility = 0;
    }
}
