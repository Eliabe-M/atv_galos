const chai = require('chai');
const expect = chai.expect;
const { checkFieldsNotEmpty } = require('../validations');

describe('Testes de Validação', () => {
    it('Deve retornar verdadeiro se nenhum campo estiver vazio', () => {
        const data = {
            breed: 'Galo1',
            value: 100,
            size: 'Médio',
            weight: 5.2
        };
        const resultado = checkFieldsNotEmpty(data);
        expect(resultado).to.be.true;
    });

    it('Deve retornar falso se algum campo estiver vazio', () => {
        const data = {
            breed: 'Galo2',
            value: 200,
            size: '',
            weight: 5.5
        };
        const resultado = checkFieldsNotEmpty(data);
        expect(resultado).to.be.false;
    });
});
