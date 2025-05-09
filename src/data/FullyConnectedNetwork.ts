import { input } from "@angular/core";
import { Matrix2D } from "./Matrix";

export class FullyConnectedNetwork
{

    private hidden_0: Matrix2D;
    private hidden_1: Matrix2D;

    private bias_0: Matrix2D;
    private bias_1: Matrix2D;


    constructor(input: number, hidden: number, output: number)
    {
        this.hidden_0 = new Matrix2D(hidden, input);
        this.hidden_1 = new Matrix2D(output, hidden);

        this.bias_0 = new Matrix2D(hidden, 1);
        this.bias_1 = new Matrix2D(output, 1);

    }

    //activation function definition
    private Sigmoid(input: number): number
    {
        return 1 / (1 + Math.exp(-1 * input))
    }

    public Predict(inputMatrix: Matrix2D): Matrix2D
    {
        if (inputMatrix.Rows() != this.hidden_0.Cols())
        {
            throw new Error("Input matrix not correct dimentions.");
        }

        let hidden_out: Matrix2D = this.hidden_0.CrossProduct(inputMatrix).Add(this.bias_0);
        hidden_out.Map(this.Sigmoid);

        let output: Matrix2D = this.hidden_1.CrossProduct(hidden_out).Add(this.bias_1);
        output.Map(this.Sigmoid);

        return output;
    }

}