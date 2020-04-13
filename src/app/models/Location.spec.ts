import { Location} from './Location';

describe('Location', () => {
it('when getLng is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    c.setLng(1);
    const b = c.getLng();
    // assert
    expect(b).toEqual(1);
});


it('when getLat is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setLat(1);
    const b = c.getLat();
    // assert
    expect(b).toEqual(1);
});
});

function setup() {
    const lat = 0 ;
    const lng = 0;
    const alt = 0;
    const builder = {lat, lng, alt,
        default() {return builder; },
        build() {

            return new Location(0, 0 , 0); }
    };
    return builder;
}
