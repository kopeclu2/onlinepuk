

export const findLiveMatches = (matches) => {
    return matches.filter((match) => match.live === 1);
}