import Renderer from "../Render/Renderer";

export default class ExtendedShader extends WebGLShader {

    public CodeText: string;

    constructor(Code: string) {
        super();

        this.CodeText = Code;
    }

    public Compile() {
        Renderer.Gl.shaderSource(this, this.CodeText);
        Renderer.Gl.compileShader(this);
    }
}