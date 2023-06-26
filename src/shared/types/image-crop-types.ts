export interface CropType {
    x: number;
    y: number;
}

export interface CroppedAreaType extends CropType {
    height: number;
    width: number;
}

export interface ImageType {
    src: string;
    width: number;
    height: number;
}

export interface FlipType {
    horizontal: boolean;
    vertical: boolean;
}

