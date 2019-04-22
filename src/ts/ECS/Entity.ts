import IID from "./IID";
import IEntity from "./IEntity";

export default class Entity implements IID, IEntity {
    GetComponent(): import("./IComponent").default;
    GetComponent(kek: number): import("./IComponent").default;
    GetComponent(kek?: any) {
        throw new Error("Method not implemented.");
    }
    UID: number;

}