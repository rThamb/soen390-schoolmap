import { Location } from './Location';
import { Campus } from './campus';
import { Building } from './Building';
import {autoSpy} from '../../../auto-spy';


describe('Campus', () => {
  it('when getCampusLocation is called it should give the location of the campus', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    const newlocation = new Location( 0, 0, 0);
    c.setCampusLocation(newlocation);
    expect(c.getCampusLocation()).toEqual( newlocation );
  });

  it('when setCampusLocation is called it should add a location for a campus', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const newlocation = new Location( 1, 1, 1);
    const x = c.setCampusLocation(newlocation);
    // assert
    expect( c.setCampusLocation(newlocation)).toEqual(x);
  });








});

function setup() {
  const cl = autoSpy(Location);

  const builder = {
    cl,
    default() {
      return builder;
    },
    build() {
      return new Campus(cl);
    }
  };

  return builder;
}
