import { ArtworkConfig } from "./artworks";

export interface Artist {
    data: {
        data: {
            id: number;
            attributes: {
                fullName: string;
                nationality: string;
                description: string;
                socials?: string;
                profilePicture?: any;
                artworks: {
                    data: ArtworkConfig[];
                };
            };
        };
    };
}

export interface ArtistConfig {
    id: number;
    attributes: {
        fullName: string;
        nationality: string;
        description: string;
        socials?: string;
        profilePicture?: any;
        artworks: {
            data: ArtworkConfig[];
        };
    };
}

export interface Artists {
    data: {
        data: ArtistConfig[];
    };
}
