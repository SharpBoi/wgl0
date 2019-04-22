export default class ShaderLoader {

    private static req: XMLHttpRequest;
    private static gl: WebGLRenderingContext;

    private static extFrag = ".frag";
    private static extVert = ".vert";

    public static Init(Gl: WebGLRenderingContext) {
        this.gl = Gl;
        this.req = new XMLHttpRequest();
    }

    public static LoadShaderASync(url: string, onLoad: (shader: WebGLShader) => {}, shaderType = this.gl.FRAGMENT_SHADER) {

        this.req.open("GET", url, true);
        this.req.onreadystatechange = () => {
            if (this.req.status === 200) {

                let content = this.req.responseText;

                let shader = this.gl.createShader(shaderType);
                this.gl.shaderSource(shader, content);
                this.gl.compileShader(shader);

                onLoad(shader);
            }
        };
        this.req.send();
    }

    public static LoadShader(url: string, shaderType = this.gl.FRAGMENT_SHADER) {
        this.req.open("GET", url, false);
        this.req.send();

        let shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, this.req.responseText);
        this.gl.compileShader(shader);


        return shader;
    }

}