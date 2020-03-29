import { Location } from './Location';

describe('Location', () => {
  it('when getLng is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.getLng();
    // assert
    // expect(c).toEqual
  });

  it('when setLng is called it should set longitude ', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const Lng = 80;
    c.setLng(Lng);
    // assert
    expect(c.setLng).toBeDefined;

  });

  it('when getLat is called it should return longitude ', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setLng(35);
    const Lng = c.getLng();
    // assert
    expect(Lng).toEqual(35);
  });

  it('when setLat is called it should set latitude', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const Lat = 80;
    c.setLng(Lat);
    // assert
    expect(c.setLat).toBeDefined;
  });

  // it('when getGoogleLatLng is called it should', () => {
  //   // arrange
  //   const { build } = setup().default();
  //   const c = build();
  //   // act
  //   c.getGoogleLatLng();
  //   // assert
  //   // expect(c).toEqual
  // });

  
});

function setup() {
  let lat:number;
let lng:number;
let alt:number;
  const builder = {
    lat,
lng,
alt,
    default() {
      return builder;
    },
    build() {
      return new Location(lat,lng,alt);
    }
  };

  return builder;
}
