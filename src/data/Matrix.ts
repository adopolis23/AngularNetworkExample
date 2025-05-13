
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
        this._data = Array.from({ length: rows }, () => Array(cols));
        this.Randomize(1);
    }

    //STATIC method that returns a new matrix2d from a number[][]
    static FromArray(data: number[][]): Matrix2D
    {
        let matrix: Matrix2D = new Matrix2D(data.length, data[0].length);
        matrix.SetData(data);
        return matrix;
    }


    public Randomize(max: number)
    {
        for (let i = 0; i < this._rows; i++)
        {
            for (let j = 0; j < this._cols; j++)
            {
                this._data[i][j] = Math.random() * max;
            }
        }
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

    public GetRow(row: number): number[]
    {
        return this._data[row];
    }

    //takes in a function and applies it to every value in data.
    public Map(func: (value: number) => number)
    {
        this._data = this._data.map(row => row.map(func));
    }

    public GetCol(col: number): number[]
    {
        //creates array with a length equal to the totaL number of rows
        let result: number[] = Array.from({ length: this._rows });

        for (let i = 0; i < this._rows; i++)
        {
            result[i] = this._data[i][col];
        }

        return result;
    }

    //element wise add
    public Add(other: Matrix2D): Matrix2D
    {
        if (other.Cols() != this._cols || other.Rows() != this._rows)
        {
            throw new Error("Rows and Cols length must match to add element-wise.");
        }

        let newData: number[][] = this._data.map((row, i) => row.map((value, j) => value + other.Data()[i][j]));

        let result: Matrix2D = Matrix2D.FromArray(newData);


        return result;
    }

    //add a scalar value to every number in the matrix
    public AddScalar(scalar: number): Matrix2D
    {
        let newData: number[][] = this._data.map((row, i) => row.map((value, j) => value + scalar));
        let result: Matrix2D = Matrix2D.FromArray(newData);
        return result;
    }

    //element wise subtract
    public Sub(other: Matrix2D): Matrix2D
    {
        if (other.Cols() != this._cols || other.Rows() != this._rows)
        {
            throw new Error("Rows and Cols length must match to add element-wise.");
        }

        let newData: number[][] = this._data.map((row, i) => row.map((value, j) => value - other.Data()[i][j]));

        let result: Matrix2D = Matrix2D.FromArray(newData);


        return result;
    }

    //element wise Multiply
    public Mul(other: Matrix2D): Matrix2D
    {
        if (other.Cols() != this._cols || other.Rows() != this._rows)
        {
            throw new Error("Rows and Cols length must match to add element-wise.");
        }

        let newData: number[][] = this._data.map((row, i) => row.map((value, j) => value * other.Data()[i][j]));

        let result: Matrix2D = Matrix2D.FromArray(newData);


        return result;
    }

    //probably a very innefiect cross product algorithm TODO: look up better way.
    public CrossProduct(other: Matrix2D): Matrix2D
    {
        const rowA = this._rows;
        const colA = this._cols;
        const rowB = other.Rows();
        const colB = other.Cols();

        if (other.Rows() != this._cols)
        {
            throw new Error("Rows of B must be equal to Columns of A.");
        }

        let newData: number[][] = Array.from({ length: this._rows }, () => Array(other.Cols()).fill(0));

        //nested for loop goes through each position in the output array and computes the dot product of the row and col from the two input arrays.
        for (let i = 0; i < rowA; i++)
        {
            for (let j = 0; j < colB; j++)
            {
                let rowOfA: number[] = this.GetRow(i);
                let colOfB: number[] = other.GetCol(j);

                // computes the dot product by multiplying two arrays element wise then sums their values. 
                let dot: number = rowOfA.map((value, index) => value * colOfB[index]).reduce((acc, value) => acc + value, 0);

                newData[i][j] = dot;
            }
        }

        let result: Matrix2D = Matrix2D.FromArray(newData);

        return result;

    }

}