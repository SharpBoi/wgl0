import IComponent from "./IComponent";

export default interface IEntity {
    GetComponent(): IComponent;
    GetComponent(kek: number): IComponent;
}