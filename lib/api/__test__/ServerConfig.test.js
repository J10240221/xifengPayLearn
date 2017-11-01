jest.mock('../../apin.test.config.js');
jest.mock('../ExternalConfig.js');
let ServerConfig = require('../ServerConfig');

describe('serverConfig Test', () => {
    test('if external config not exists', () => {
        let serverConfig = new ServerConfig();
        expect(serverConfig.getServerConfig('apin.js').port).toBe(3001);
    })
    test('default setting if external config exist', () => {
        let serverConfig = new ServerConfig('apin.test.config.js');
        expect(serverConfig.getServerConfig().port).toBe(8080);
    })
})