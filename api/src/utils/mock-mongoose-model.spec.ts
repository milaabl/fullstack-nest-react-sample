import { MockMongooseModel } from './mock-mongoose-model';

describe('MockMongooseModel', () => {
    let sut: any;

    beforeEach(() => {
        sut = new MockMongooseModel({ foo: 'bar' });
    });

    describe('findOne', () => {
        it('should return a null value', async () => {            
            await expect(MockMongooseModel.findOne().exec()).resolves
                .toBe(null);
        });
    });

    describe('save', () => {
        it('should resolve itself', async () => {
            await expect(sut.save()).resolves
                .toEqual({
                    foo: 'bar'
                });
        });
    });
});
