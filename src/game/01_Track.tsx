import { Scene } from "@babylonjs/core";
import JSZip from "jszip";
import { songManifest } from "../types/songPackageFormat";
import { Beatset } from "./02_Beatset";

export class Track {
    public manifest: songManifest = {} as any;
    private audio: ArrayBuffer | null = null;

    public async loadAsync(source: string) {
        return new Promise<Track>(async (resolve, reject) => {
            let loading = {
                info: false,
                audio: false,
                beatmaps: {
                    ready: 0,
                    all: 0,
                },
            };

            const res = await fetch(source);
            const blob = await res.blob();
            const zip = new JSZip();
            try {
                await zip.loadAsync(blob);
            } catch (e) {
                reject(e);
                return;
            }
            if (!zip.files["Info.dat"] && !zip.files["info.dat"]) {
                reject("info.dat not found!");
                return;
            }
            this.manifest = JSON.parse(
                await (zip.files["Info.dat"] || zip.files["info.dat"]).async(
                    "string"
                )
            );
            loading.info = true;

            this.audio = await zip.files[this.manifest._songFilename].async(
                "arraybuffer"
            );
            loading.audio = true;

            loading.beatmaps.all = this.manifest._difficultyBeatmapSets.reduce(
                (prev, bm) => bm._difficultyBeatmaps.length + prev,
                0
            );

            this.manifest._difficultyBeatmapSets.forEach(
                (diffSet, setIndex) => {
                    diffSet._difficultyBeatmaps.forEach(
                        async (diff, mapIndex) => {
                            this.manifest._difficultyBeatmapSets[
                                setIndex
                            ]._difficultyBeatmaps[mapIndex].contents =
                                JSON.parse(
                                    await zip.files[
                                        diff._beatmapFilename
                                    ].async("string")
                                );

                            loading.beatmaps.ready++;
                            if (
                                loading.beatmaps.all === loading.beatmaps.ready
                            ) {
                                resolve(this);
                            }
                        }
                    );
                }
            );
        });
    }

    public getAudio() {
        if (!this.audio) throw new Error("Audio not loaded!");
        return this.audio;
    }

    public getBeatmap(diffset: number, beatmap: number, scene: Scene) {
        return new Beatset(
            this.manifest._difficultyBeatmapSets[diffset]._difficultyBeatmaps[
                beatmap
            ],
            scene
        );
    }
}
