import { Timestamp } from "firebase/firestore";

type FixedLengthArray<T, L extends number> = [T, ...Array<T>] & { length: L };

export type modalStateContext = {
    teams: string[]
    setTeams: (teamList: string[]) => void

    bracketSize: 4 | 8
    setBracketSize: (size: 4 | 8) => void

    scoringSystem: scoringSystem
    setScoringSystem: (scoringSystem: scoringSystem) => void

    bracketName: string
    setBracketName: (input: string) => void

    bracket: bracket
    setBracket: (input: bracket) => void

    liveBracket: boolean
    setLiveBracket: (state: boolean) => void

    isScoreModalOpen: boolean
    setIsScoreModalOpen: (state: boolean) => void

    isAuthModalOpen: boolean
    setIsAuthModalOpen: (state: boolean) => void

    currentMatchup: matchup
    setCurrentMatchup: (matchup: matchup) => void

    authMode: 'Sign Up' | 'Log In'
    setAuthMode: (mode: 'Sign Up' | 'Log In') => void

    user: user | undefined
    setUser: (user: user | undefined) => void
}

export type roundNames = 'final2' | 'final4' | 'final8'

export type scoringSystem = {
    round1: number
    round2?: number
    final: number
}

export interface bracket {
    size: 0 | 4 | 8 | 16
    scoringSystem: scoringSystem
    name: string
    rounds: {
        final8: {
            teams: team[]
            matchups: matchup[]
        }
        final4: {
            teams: team[]
            matchups: matchup[]
        }
        final2: {
            teams: team[]
            matchups: matchup[]
        }
    }
    id?: string
    userId?: string,
    dateCreated?: Timestamp
}

export type team = {
    name: string,
    number: number
    sequence: number
}

export type matchup = {
    team1?: team
    team2?: team

    result?: {
        team1score: number,
        team2score: number,
        winner: team
    }

    teamsRemaining: number
    team1Sequences: number[]
    team2Sequences: number[]
}

export type authDetails = {
    firstName?: string
    lastName?: string
    email: string
    password: string
}

export type user = {
    id: string
    email: string
    firstName: string
    lastName: string
}