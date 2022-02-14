export class MockMongooseModel {
    constructor(dto: { [key: string]: any }) {
        Object.keys(dto)
            .forEach((key: string) => { this[key] = dto[key] })
    }
    
    static findOne(): { [key: string]: any } {
        return {
            exec: (): any => Promise.resolve(null)
        };
    }

    save(): Promise<any> {
        return Promise.resolve(this);
    }
}
