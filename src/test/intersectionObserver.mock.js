export const mockIntersectionObserver = class IO {
    constructor(handler) {
        this.handler = handler;
    }

    observe(element) {
        jest.fn();
        this.handler([{
            intersectionRatio: element.intersectionRatio,
            target: element
        }]);
    }
};
