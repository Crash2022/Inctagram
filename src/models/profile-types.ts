// временный тип
export interface Photo {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}
export interface Profile  {
	id: number;
	userName: string;
	firstName: string;
	lastName: string;
	city: string;
	dateOfBirth: string;
	aboutMe: string;
	avatars: ProfileAvatars[];
}
export interface ProfileAvatars  {
	url: string;
	width: number;
	height: number;
	fileSize: number;
}

export interface UpdateUserProfile {
    userName: string
    firstName: string
    lastName: string
    city: string
    dateOfBirth: string
    aboutMe: string
}
