export default class Renderer{

    public static Gl : WebGLRenderingContext;

    constructor(GL : WebGLRenderingContext) {
        Renderer.Gl = GL;
    }
}