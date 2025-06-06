


import { _ } from '../../src/DefinitionClass.js'



describe(`isFuture`, () => {

    const isFutureDef = _.date().isFuture()
    const dateForFutureNumber = 203001010000
    const dateForFutureString = new Date('2030-01-01T00:00:00Z');
    const dateForPastString = new Date('1990-01-01T00:00:00Z');

    it('checks the return types of read or write as any', () => {
        expect(isFutureDef.getTsTypeAsString()).toEqual({ 'read': 'Date', 'write': 'Date' })
    })

    it('accepts a date in the future', async () => {
        expect(await isFutureDef.formatAndValidate(dateForFutureString)).toEqual(dateForFutureString);
    })

    it('throws an error if value is not in the future', () => {
        expect(isFutureDef.formatAndValidate(dateForPastString)).rejects.toThrow(`Date should be in the future. Actual date: 01/01/1990`);
    })

    it('throws an error if value is not date format', () => {
        expect(isFutureDef.formatAndValidate(dateForFutureNumber)).rejects.toThrow(`Expected type date but got 203001010000`);
    })
})