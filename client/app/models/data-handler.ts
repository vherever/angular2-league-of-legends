export interface DataHandler {
    errorInput?: string;
    errorFind?: string;
    game: {
        apiVersion?: number;
        regions?: any[];
    };
    player: {
        region: string;
        id?: number;
        name?: string;
        profileIconId?: number;
        revisionDate: number;
        summonerLevel: number;
    },
    playerSummary: {
        aggregatedStats?: any[],
        modifyDate?: number;
        playerStatSummaryType?: string;
        wins?: number;
    }
}
