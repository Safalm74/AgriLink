import BaseModel from "./base";

export class TestModel extends BaseModel{
    static async create(params:string) {
        const msgtosave={
            msg:params
        }
        await this.queryBuilder().insert(msgtosave).table('test');
    }
}