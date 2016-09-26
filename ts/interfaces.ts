namespace I {
    export interface Ship {
        locations: Array<string>;
        hits: Array<string>;
    }

    export interface Cell {
        row: string,
        col: string
    }
}

//export { Ship, Cell }