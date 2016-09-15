
interface ship {
    locations: Array<string>;
    hits: Array<string>;
}

interface resultObject {
    ship: ship;
    guessIndex: number;
    isHit: boolean;
    alreadyFired: boolean;
}

export { ship, resultObject }
