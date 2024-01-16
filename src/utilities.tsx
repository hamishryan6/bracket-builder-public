import { Timestamp } from "firebase/firestore"
import { defaultBracket, defaultRoundMatchups, roundNameArray } from "./defaultValues"
import { addBracketToDatabase, updateBracketInDatabase } from "./services/FireStoreService"
import { bracket, matchup, roundNames, scoringSystem, team, user } from "./types"

const convertSeedToSequence = (bracketSize: 4 | 8 | 16, seed: number) => {
    if (bracketSize === 16) {
        switch (seed) {
            case 1: return 1
            case 2: return 9
            case 3: return 13
            case 4: return 5
            case 5: return 7
            case 6: return 15
            case 7: return 11
            case 8: return 3
            case 9: return 4
            case 10: return 12
            case 11: return 16
            case 12: return 8
            case 13: return 6
            case 14: return 14
            case 15: return 10
            case 16: return 2
            default: return 0
        }
    } else if (bracketSize === 8) {
        switch (seed) {
            case 1: return 1
            case 2: return 5
            case 3: return 7
            case 4: return 3
            case 5: return 4
            case 6: return 8
            case 7: return 6
            case 8: return 2
            default: return 0
        }
    } else {
        switch (seed) {
            case 1: return 1
            case 2: return 3
            case 3: return 4
            case 4: return 2
            default: return 0
        }
    }
}

export const createRoundList = (bracketSize: 0 | 4 | 8 | 16) => {
    let roundList: Array<number | 'Final'> = []

    new Array(roundsByBracketSize(bracketSize)).fill(0).forEach((round, index) => {
        let roundNumber: number | 'Final'

        if ((index + 1) === roundsByBracketSize(bracketSize)) {
            roundNumber = 'Final'
        } else {
            roundNumber = index + 1
        }

        roundList.push(roundNumber)
    })

    return roundList
}

export const halfAndSplit = (sequences: number[] | number) => {

    let team1Sequences: number[] = []
    let team2Sequences: number[] = []

    if (typeof sequences === 'number') {
        new Array(sequences).fill(0).forEach((element, index) => {
            if (index >= (sequences / 2)) {
                team2Sequences.push(index + 1)
            } else {
                team1Sequences.push(index + 1)
            }
        })
    } else {
        sequences.forEach((number, index) => {
            if (index >= (sequences.length / 2)) {
                team2Sequences.push(number)
            } else {
                team1Sequences.push(number)
            }
        })
    }

    return {
        team1Sequences,
        team2Sequences
    }
}


export const roundsByBracketSize = (number: number) => {
    let count = 0
    while (number > 1) {
        number /= 2
        count++
    }
    return count
}

const teamsByRounds = (round: number): number => {
    let teamCount = 2

    for (let i = 1; i < round; i++) {
        teamCount = teamCount * 2
    }

    return teamCount
}

const objectNameByRound = (round: number) => {
    switch (round) {
        case 1: return 'final2'
        case 2: return 'final4'
        case 3: return 'final8'
        // case 4: return 'final16'
        default: return 'final2'
    }
}

export const generateMatchups = (bracketSize: 4 | 8 | 16) => {

    const matchups: { [key in roundNames]: matchup[] } = defaultRoundMatchups

    new Array(roundsByBracketSize(bracketSize)).fill(0).forEach((round, index) => {
        if (index === 0) {
            let emptyMatchup: matchup = {
                ...halfAndSplit(bracketSize),
                teamsRemaining: 2 * (index + 1)
            }
            matchups[objectNameByRound(index + 1)] = [emptyMatchup]
        } else {

            let previousRound: matchup[] = [...matchups[objectNameByRound(index)]]
            let emptyMatchups: matchup[] = []

            previousRound.forEach((matchup) => {
                let emptyTeam1Matchup: matchup = {
                    ...halfAndSplit(matchup.team1Sequences),
                    teamsRemaining: teamsByRounds(index + 1)
                }
                let emptyTeam2Matchup: matchup = {
                    ...halfAndSplit(matchup.team2Sequences),
                    teamsRemaining: teamsByRounds(index + 1)
                }

                emptyMatchups.push(emptyTeam1Matchup, emptyTeam2Matchup)
            })

            matchups[objectNameByRound(index + 1)] = [...emptyMatchups]

        }
    })

    return matchups
}

const assignTeamsToMatchups = (teams: team[], matchups: matchup[]) => {

    let updatedMatchups: matchup[] = [...matchups]

    teams.forEach((team, index) => {
        updatedMatchups.forEach((matchup, index) => {
            if (matchup.team1Sequences.indexOf(team.sequence) !== -1) {
                updatedMatchups[index].team1 = team
            } else if (matchup.team2Sequences.indexOf(team.sequence) !== -1) {
                updatedMatchups[index].team2 = team
            }
        })
    })

    return updatedMatchups
}

const createTeamList = (bracketSize: 4 | 8 | 16, teams: string[]): team[] => {
    let teamList: team[] = []

    teams.forEach((teamName, index) => {
        let team: team = {
            name: teamName,
            number: index + 1,
            sequence: convertSeedToSequence(bracketSize, index + 1)
        }

        teamList.push(team)
    })

    return teamList
}

export const createBracket = async (name: string, bracketSize: 4 | 8, teams: string[], scoringSystem: scoringSystem, user: user | undefined, setBracket: (bracket: bracket) => void) => {
    let newBracket: bracket = defaultBracket

    let teamList = createTeamList(bracketSize, teams)

    newBracket.name = name
    newBracket.size = bracketSize
    newBracket.scoringSystem = scoringSystem
    newBracket.rounds[objectNameByRound(roundsByBracketSize(bracketSize))].teams = [...teamList]

    roundNameArray.forEach((round, index) => {
        let generatedMatchups = generateMatchups(bracketSize)[round]
        newBracket.rounds[round].matchups = generatedMatchups

        if (round === objectNameByRound(roundsByBracketSize(bracketSize))) {
            assignTeamsToMatchups(teamList, newBracket.rounds[round].matchups)
        }

    })

    if (user) {
        await addBracketToDatabase(newBracket, user, setBracket)
    } else {
        setBracket(newBracket)
    }
}

export const createResult = async (bracket: bracket, matchup: matchup, team1Score: number, team2Score: number, user: user | undefined, setBracket: (update: bracket) => void) => {

    deleteResult(bracket, matchup, user, setBracket)

    let updatedMatchup = { ...matchup }
    let updatedBracket = bracket

    if (updatedMatchup.team1 === undefined || updatedMatchup.team2 === undefined) return

    updatedMatchup.result = {
        team1score: team1Score,
        team2score: team2Score,
        winner: team1Score > team2Score ? updatedMatchup.team1 : updatedMatchup.team2
    }

    let currentMatchupKey: "final2" | "final4" | "final8" = objectNameByRound(roundsByBracketSize(matchup.teamsRemaining))
    let nextMatchupKey: "final2" | "final4" | "final8" = objectNameByRound(roundsByBracketSize(matchup.teamsRemaining / 2))

    let relevantMatchups: matchup[] = [...bracket.rounds[currentMatchupKey].matchups]

    relevantMatchups.forEach((matchup, index) => {
        if (updatedMatchup.team1 !== matchup.team1 || updatedMatchup.team2 !== matchup.team2) return
        matchup.result = updatedMatchup.result
    })

    updatedBracket.rounds[currentMatchupKey].matchups = relevantMatchups

    if (matchup.teamsRemaining !== 2) {
        updatedBracket.rounds[nextMatchupKey].teams.push(updatedMatchup.result.winner)
        updatedBracket.rounds[nextMatchupKey].matchups = assignTeamsToMatchups(updatedBracket.rounds[nextMatchupKey].teams, updatedBracket.rounds[nextMatchupKey].matchups)
    }

    sessionStorage.setItem('bracket', JSON.stringify(updatedBracket))

    if (user && updatedBracket.id) {
        await updateBracketInDatabase(updatedBracket, updatedBracket.id, user, setBracket)
    } else {
        setBracket(updatedBracket)
    }

}

export const deleteResult = async (bracket: bracket, matchup: matchup, user: user | undefined, setBracket: (update: bracket) => void) => {
    let deletingMatchup = { ...matchup }
    let updatedBracket = bracket

    let currentMatchupKey: "final2" | "final4" | "final8" = objectNameByRound(roundsByBracketSize(matchup.teamsRemaining))
    let nextMatchupKey: "final2" | "final4" | "final8" = objectNameByRound(roundsByBracketSize(matchup.teamsRemaining / 2))

    let relevantMatchups: matchup[] = [...bracket.rounds[currentMatchupKey].matchups]

    if (!deletingMatchup.result) return

    relevantMatchups.forEach((matchup, index) => {
        if (deletingMatchup.team1 !== matchup.team1 || deletingMatchup.team2 !== matchup.team2) return
        delete updatedBracket.rounds[currentMatchupKey].matchups[index].result
    })

    let nextRoundIndex = updatedBracket.rounds[nextMatchupKey].teams.indexOf(deletingMatchup.result.winner)
    updatedBracket.rounds[nextMatchupKey].teams.splice(nextRoundIndex, 1)

    updatedBracket.rounds[nextMatchupKey].matchups.forEach((matchup, index) => {
        if (updatedBracket.rounds[nextMatchupKey].matchups[0].teamsRemaining === 2) return
        if (!deletingMatchup.result) return
        if (matchup.team1?.sequence === deletingMatchup.result.winner.sequence) {
            delete updatedBracket.rounds[nextMatchupKey].matchups[index].team1
        } else if (matchup.team2?.sequence === deletingMatchup.result.winner.sequence) {
            delete updatedBracket.rounds[nextMatchupKey].matchups[index].team2
        }

    })

    if (user && updatedBracket.id) {
        await updateBracketInDatabase(updatedBracket, updatedBracket.id, user, setBracket)
    } else {
        setBracket(updatedBracket)
    }

    sessionStorage.setItem('bracket', JSON.stringify(updatedBracket))
    setBracket(updatedBracket)

}

export const checkForFutureResults = (bracket: bracket, matchup: matchup) => {
    let currentMatchup = { ...matchup }
    let currentBracket = bracket

    let hasFutureResults = false

    let nextMatchupKey: "final2" | "final4" | "final8" = objectNameByRound(roundsByBracketSize(currentMatchup.teamsRemaining / 2))

    let nextRoundMatchups: matchup[] = [...currentBracket.rounds[nextMatchupKey].matchups]

    if (currentMatchup.teamsRemaining === 2) return hasFutureResults
    nextRoundMatchups.forEach((matchup, index) => {
        if (!matchup.result) return
        if (matchup.team1?.sequence === currentMatchup.team1?.sequence) hasFutureResults = true
        if (matchup.team1?.sequence === currentMatchup.team2?.sequence) hasFutureResults = true
        if (matchup.team2?.sequence === currentMatchup.team1?.sequence) hasFutureResults = true
        if (matchup.team2?.sequence === currentMatchup.team2?.sequence) hasFutureResults = true
    })

    return hasFutureResults
}

export const changeBracket = (bracket: bracket, setBracket: (bracket: bracket) => void) => {
    setBracket(bracket)
    sessionStorage.setItem('bracket', JSON.stringify(bracket))
}

export const dateToString = (timestamp: Timestamp) => {
    const formattedDate = new Date(timestamp.toDate()).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    return formattedDate
}

export const saveBracketAfterSignIn = async (bracket: bracket, user: user | undefined, setBracket: (bracket: bracket) => void) => {
    if (bracket.id || !user || bracket.size === 0) return
    await addBracketToDatabase(bracket, user, (bracket: bracket) => setBracket(bracket))
}