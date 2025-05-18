import { input } from "@angular/core";
import { Matrix2D } from "./Matrix";

export class FullyConnectedNetwork
{

    private hidden_0: Matrix2D;
    public hidden_1: Matrix2D;

    private bias_0: Matrix2D;
    private bias_1: Matrix2D;

    private hidden_output: Matrix2D;

    private LearningRate: number;


    constructor(input: number, hidden: number, output: number)
    {
        this.hidden_0 = new Matrix2D(hidden, input);
        this.hidden_1 = new Matrix2D(output, hidden);

        this.bias_0 = new Matrix2D(hidden, 1);
        this.bias_1 = new Matrix2D(output, 1);

        this.hidden_output = new Matrix2D(hidden, 1);

        this.LearningRate = 0.1;

    }

    //activation function definition
    private Sigmoid(input: number): number
    {
        return 1 / (1 + Math.exp(-1 * input))
    }

    //derivative of the activation function sigmoid
    private Sigmoid_Derivative(input: number): number
    {
        let sigmoid_of_input: number = 1 / (1 + Math.exp(-1 * input))

        return sigmoid_of_input * (1 - sigmoid_of_input)
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

        this.hidden_output = this.hidden_0.CrossProduct(inputMatrix).Add(this.bias_0);
        this.hidden_output.Map(this.Sigmoid);

        let output: Matrix2D = this.hidden_1.CrossProduct(this.hidden_output).Add(this.bias_1);
        output.Map(this.Sigmoid);

        return output;
    }


    // public Train(input: Matrix2D, target: Matrix2D): void
    // {

    //     if (input.Rows() != this.hidden_0.Cols() || target.Rows() != this.hidden_1.Rows())
    //     {
    //         throw new Error("Input or Target dimentions do not match the network.");
    //     }

    //     let predictedOutput: Matrix2D = this.Predict(input);

    //     let outputError: Matrix2D = target.Sub(predictedOutput);

    //     //create a matrix to hold the predicted output times the derivative of sigmoid
    //     let predictedOutputTimesSigmoidDer: Matrix2D = predictedOutput.Copy();
    //     predictedOutputTimesSigmoidDer.Map(this.Sigmoid_Derivative);

    //     let output_delta: Matrix2D = outputError.Mul(predictedOutputTimesSigmoidDer);

    //     //transpose of the hidden to output weights
    //     let hidden_1_t: Matrix2D = this.hidden_1.Transpose();

    //     let hidden_error: Matrix2D = hidden_1_t.CrossProduct(output_delta);

    //     //create a matrix to hold the hidden output times the derivative of sigmoid
    //     let hiddenOutputTimesSigmoidDer: Matrix2D = this.hidden_output.Copy();
    //     hiddenOutputTimesSigmoidDer.Map(this.Sigmoid_Derivative);

    //     let hidden_delta: Matrix2D = hidden_error.Mul(hiddenOutputTimesSigmoidDer);

    //     //update weights in the hidden to output layer
    //     let hidden_1_delta: Matrix2D = this.hidden_output.CrossProduct(output_delta.Transpose()).MulScalar(this.LearningRate);
    //     this.hidden_1 = this.hidden_1.Add(hidden_1_delta.Transpose());

    //     //update bias in the ouput later - add the output delta to the bias times the learning rate.
    //     this.bias_1 = this.bias_1.Add(output_delta.MulScalar(this.LearningRate));

    //     //update the weights in the input to hidden layer
    //     let hidden_0_delta: Matrix2D = input.CrossProduct(hidden_delta).MulScalar(this.LearningRate)
    //     this.hidden_0 = this.hidden_0.Add(hidden_0_delta.Transpose());

    //     //update the bias in the hidden layer
    //     this.bias_0 = this.bias_1.Add(hidden_delta.MulScalar(this.LearningRate));
    // }


    public Train(input: Matrix2D, target: Matrix2D): void
    {
        let predicted_output: Matrix2D = this.Predict(input);

        let output_error: Matrix2D = target.Sub(predicted_output);

        predicted_output.Map(this.Sigmoid_Derivative);
        let output_delta: Matrix2D = output_error.Mul(predicted_output);

        //let hidden_error: Matrix2D = output_delta.CrossProduct();

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

























