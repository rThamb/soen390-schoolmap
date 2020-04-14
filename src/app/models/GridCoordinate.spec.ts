
import {GridCoordinate} from './GridCoordinate';
describe('GridCoordinate', () => {
it('should create GridCoordinate', () => {
    const { build } = setup().default();
    const c = build();
    const b = new GridCoordinate(0, 0);
    expect(c).toEqual(b);
});
});

function setup() {
    const x = 0 ;
    const y = 0;
    const builder = {
        x,
        y,
        default() {
            return builder;
        },
        build() {
            return new GridCoordinate(x, y);
        }
    };
    return builder;
}
