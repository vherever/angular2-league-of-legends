export interface DataHandler {
    errorInput?: string;
    errors: {
        summonerData: string
    }
    _data: {
        matchesByRole: {
            mid?: number;
            adc?: number;
            sup?: number;
            jun?: number;
            top?: number;
        },
        championInfo: {
            id: number;
            key: string;
            name: string;
            title: string;
        },
        topChampions?: any[];
    };
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
    leagueEntryData: {
        entries?: any[];
        name?: string;
        queue?: string;
        tier?: string;
    },
    matchHistory: {
        endIndex?: number;
        matches?: any[];
        startIndex?: number;
        totalGames?: number
    },
    champions: {
        data?: any[]
    }
}
