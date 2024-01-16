import { bracket, matchup, roundNames, scoringSystem } from "./types";

export const defaultScoringSystem: scoringSystem = {
    round1: 1,
    round2: 1,
    final: 1
}

export const defaultBracket: bracket = {
    name: '',
    size: 0,
    scoringSystem: defaultScoringSystem,
    rounds: {
        final8: {
            teams: [],
            matchups: []
        },
        final4: {
            teams: [],
            matchups: []
        },
        final2: {
            teams: [],
            matchups: []
        }
    }
}

export const defaultMatchup: matchup = {
    team1: {
        name: '',
        number: 0,
        sequence: 0
    },
    team2: {
        name: '',
        number: 0,
        sequence: 0
    },
    teamsRemaining: 0,
    team1Sequences: [],
    team2Sequences: [],

}

export const defaultRoundMatchups:  { [key in roundNames]: matchup[] } = {
    final2: [],
    final4: [],
    final8: [],
}

export const roundNameArray: roundNames[] = ['final2', 'final4', 'final8']