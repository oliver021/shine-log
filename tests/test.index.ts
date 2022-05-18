import { expect } from 'chai';
import { parseFormat } from '../src/util';

describe("Test basic utilities", () => {
    it("Test format string", () => {
    	let sample = "Server is too bussy: request={0}, ms={1}";
        let params = [
            "test",
            "123"
        ];
    	expect(parseFormat(sample, params)).equal("Server is too bussy: request=test, ms=123");
    });
});