import { MarkOptions } from "perf_hooks";


export class Matrix2D
{
    private _rows: number;
    private _cols: number;

    public _data: number[][] = [];

    constructor(rows: number, cols: number)
    {
        this._rows = rows;
        this._cols = cols;

        //for now init random
        this._data = Array.from({ length: rows }, () => Array(cols).fill(Math.random()));
    }

    public Data(): number[][]
    {
        return this._data;
    }

    public Rows(): number
    {
        return this._rows;
    }

    public Cols(): number
    {
        return this._cols;
    }

    public SetData(data: number[][])
    {
        this._data = data;
    }

    public FromArray(data: number[][]): Matrix2D
    {
        let matrix: Matrix2D = new Matrix2D(data.length, data[0].length);
        matrix.SetData(data);
        return matrix;

    }

    public Add(other: Matrix2D): Matrix2D
    {

    }

}