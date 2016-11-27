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
    },
    recentGames: {
        championId?: number;
        createDate?: number;
        fellowPlayers?: any[];
        gameId?: number;
        gameMode?: string;
        gameType?: string;
        invalid?: boolean;
        ipEarned?: number;
        level?: number;
        mapId?: number;
        spell1?: number;
        spell2?: number;
        stats?: any[];
        subType?: string;
        teamId?: number;
    },
    leagueData: {
        entries?: any[];
        name?: string;
        participantId?: string;
        queue?: string;
        tier?: string;
    }
}
