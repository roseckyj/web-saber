import { Color3, Scene, StandardMaterial } from "@babylonjs/core";

export class MaterialLibrary {
    public static materials: { [key: string]: StandardMaterial } = {};

    public static init(scene: Scene) {
        this.add("ground", scene, new Color3(152 / 255, 224 / 255, 112 / 255));
        this.add("red", scene, new Color3(180 / 255, 0 / 255, 0 / 255));
        this.add("blue", scene, new Color3(0 / 255, 0 / 255, 180 / 255));
        this.add("obstacle", scene, new Color3(255 / 255, 100 / 255, 50 / 255));
    }

    public static add(name: string, scene: Scene, diffuseColor: Color3) {
        MaterialLibrary.materials[name] = new StandardMaterial(name, scene);
        MaterialLibrary.materials[name].diffuseColor = diffuseColor;
        MaterialLibrary.materials[name].emissiveColor = new Color3(0, 0, 0);
        MaterialLibrary.materials[name].specularColor = new Color3(
            0.1,
            0.1,
            0.1
        );
        MaterialLibrary.materials[name].ambientColor = new Color3(0, 0, 0);
    }
}
