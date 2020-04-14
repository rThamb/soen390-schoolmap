import { Location } from './Location';
import { Building } from './Building';



describe('Building', () => {
  it('when getBuildingName is called it should return building name', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setBuildingName('Hall');
    const name=c.getBuildingName();
    // assert
    expect(name).toEqual("Hall");
  });


  it('when getBuildingKey is called it should return the building key', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    c.setBuildingKey('key')
    const key=c.getBuildingKey();
    // assert
    expect(key).toEqual('key');
  });

  
  it('when getBuildingLocation is called it should return the building location', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    var loc=new Location(1, 1, 1);
    
    c.setBuildingLocation(loc);
    expect(c.getBuildingLocation()).toEqual(loc); 
  });

  it('when setBuildingLocation is called it should define a building location', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    var loc=new Location(1, 1, 1);
    
    c.setBuildingLocation(loc);
    // assert
    expect(c.setBuildingLocation(loc)).toBeDefined;
  });

  it('when getFloors is called it should return the value set', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    const floor='8';
    c.setFloors(floor);
    c.getFloors();
    // assert
     expect(c.getFloors()).toEqual(floor);
  });

  it('when setFloors is called it should define the floor value', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const floor='8';
    c.setFloors(floor);
    // assert
    expect(c.setFloors).toBeDefined;
  });
  
});

function setup() {
  
  const builder = {
    
    default() {
      return builder;
    },
    build() {
      return new Building();
    }
  };

  return builder;
}
