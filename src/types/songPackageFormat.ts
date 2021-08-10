export type songManifest = {
    _version: string;
    _songName: string;
    _songSubName: string;
    _songAuthorName: string;
    _levelAuthorName: string;
    _beatsPerMinute: number;
    _shuffle: number;
    _shufflePeriod: number;
    _previewStartTime: number;
    _previewDuration: number;
    _songFilename: string;
    _coverImageFilename: string;
    _environmentName: string;
    _songTimeOffset: number;
    _customData: { [key: string]: any };
    _difficultyBeatmapSets: {
        _beatmapCharacteristicName: string;
        _difficultyBeatmaps: beatmap[];
    }[];
};

export type beatmap = {
    _difficulty: string;
    _difficultyRank: difficulty;
    _beatmapFilename: string;
    _noteJumpMovementSpeed: number;
    _noteJumpStartBeatOffset: number;
    _customData: { [key: string]: any };
    contents: beatmapContents;
};

export type beatmapContents = {
    _customData: { [key: string]: any };
    _events: event[];
    _notes: note[];
    _obstacles: obstacle[];
    _version: string;
};

export type event = {
    _time: number;
    _type: number;
    _value: number;
    _customData: { [key: string]: any };
};

export type obstacle = {
    _time: number;
    _lineIndex: number;
    _type: wallType;
    _duration: number;
    _width: number;
    _customData: { [key: string]: any };
};

export type note = {
    _time: number;
    _lineIndex: number;
    _lineLayer: number;
    _type: noteType;
    _cutDirection: noteDirection;
    _customData: { [key: string]: any };
};

export enum noteType {
    Red = 0,
    Blue = 1,
    Bomb = 3,
}

export enum noteDirection {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
    UpLeft = 4,
    UpRight = 5,
    DownLeft = 6,
    DownRight = 7,
    Any = 8,
}

export enum wallType {
    Full = 0,
    Crouch = 1,
}

export enum difficulty {
    Easy = 1,
    Normal = 3,
    Hard = 5,
    Expert = 7,
    ExpertPlus = 9,
}
