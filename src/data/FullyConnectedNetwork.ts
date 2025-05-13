import { input } from "@angular/core";
import { Matrix2D } from "./Matrix";

export class FullyConnectedNetwork
{

    private hidden_0: Matrix2D;
    private hidden_1: Matrix2D;

    private bias_0: Matrix2D;
    private bias_1: Matrix2D;

    private LearningRate: number;


    constructor(input: number, hidden: number, output: number)
    {
        this.hidden_0 = new Matrix2D(hidden, input);
        this.hidden_1 = new Matrix2D(output, hidden);

        this.bias_0 = new Matrix2D(hidden, 1);
        this.bias_1 = new Matrix2D(output, 1);

        this.LearningRate = 1;

    }

    //activation function definition
    private Sigmoid(input: number): number
    {
        return 1 / (1 + Math.exp(-1 * input))
    }

    public SetLearningRate(lr: number)
    {
        this.LearningRate = lr;
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


    public Train(input: Matrix2D, target: Matrix2D): void
    {

        if (input.Cols() != this.hidden_0.Cols() || target.Cols() != this.hidden_1.Rows())
        {
            throw new Error("Input or Target dimentions do not match the network.");
        }

        let finalOutput: Matrix2D = this.Predict(input);
        let outputError: Matrix2D = target.Sub(finalOutput);

        //output unit error = output * (1 - output) * (target - output)
        let outputUnitError: Matrix2D = finalOutput.Mul(finalOutput.AddScalar(-1)).Mul(outputError);

        
    }


    public PrintToConsole(): void
    {
        console.log("# of Input Nodes: " + this.hidden_0.Cols());
        console.log("Weights Between Input and Hidden: ");
        console.log(this.hidden_0.Data());
        console.log("# of Hidden Nodes: " + this.hidden_0.Rows());
        console.log("Hidden Node Bias: ");
        console.log(this.bias_0.Data());
        console.log("Weights Between Hidden and Output: ");
        console.log(this.hidden_1.Data());
        console.log("# of Output Nodes: " + this.hidden_1.Rows());
        console.log("Output Node Bias: ");
        console.log(this.bias_1.Data());
    }

}