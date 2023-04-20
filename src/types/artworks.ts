export interface Artwork {
    data: {
        id: number;
        attributes: {
            title?: string;
            description: string;
            mainImage: any;
            format: "square" | "portrait";
            artists: {
                data: any; //TODO add artist array type
            };
            aditionnalImages: {
                data?: any[];
            };
        };
    };
}

export interface ArtworkConfig {
    id: number;
    attributes: {
        title?: string;
        description: string;
        mainImage: any;
        format: "square" | "portrait";
        artists: {
            data: any; //TODO add artist array type
        };
        aditionnalImages: {
            data?: any[];
        };
    };
}

export interface Artworks {
    data: ArtworkConfig[];
}
