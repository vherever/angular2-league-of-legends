export interface DataHandler {
    game: {
        apiVersion?: number;
        regions?: any[];
    };
    player: {
        id?: number;
        name?: string;
    }
}
