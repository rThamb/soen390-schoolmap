import { Floor } from './Floor';
import {FloorTile} from './FloorTile';
import { IndoorPOI } from './IndoorPOI';
import {autoSpy} from '../../../auto-spy';
import {Location} from './Location';


describe('Floor', () => {
  it('when getFloorLevel is called it should return floor level', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setFloorLevel(8);
    const floor = c.getFloorLevel();
    // assert
    expect(floor).toEqual(8);
  });

  it('when setFloorLevel is called it should set floor level', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const floor = 8;
    c.setFloorLevel(floor);
    // assert
    expect(c.setFloorLevel).toBeDefined;

  });

  // it('when getFloorTileGrid is called it should return floor tile grid', () => {
  //   // arrange
  //   const { build } = setup().default();
  //   const c = build();
  //   // act
  //   c.setFloorTileGrid(FloorTile[0][1])
  //   const floorGrid=c.getFloorTileGrid();
  //   // assert
  //   expect(floorGrid).toEqual(FloorTile[0][1]);
  // });

  // it('when setFloorTileGrid is called it should', () => {
  //   // arrange
  //   const { build } = setup().default();
  //   const c = build();
  //   // act
  //   c.setFloorTileGrid();
  //   // assert
  //   // expect(c).toEqual
  // });

  it('when getWidth is called it should return width', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setWidth(35);
    const width = c.getWidth();
    // assert
    expect(width).toEqual(35);

  });

  it('when setWidth is called it should set width', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const width = 80;
    c.setWidth(width);
    // assert
    expect(c.setWidth).toBeDefined;
  });

  it('when getHeight is called it should return height', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setHeight(35);
    const height = c.getHeight();
    // assert
    expect(height).toEqual(35);
  });

  it('when setHeight is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const height = 80;
    c.setHeight(height);
    // assert
    expect(c.setHeight).toBeDefined;
  });

  it('when getPois is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setPois (IndoorPOI['']);
    const pois = c.getPois();
    // assert
    expect(pois).toEqual(IndoorPOI['']);
  });

  it('when setPois is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const pois = IndoorPOI[''];
    c.setPois(pois);
    // assert
    expect(c.setPois).toBeDefined;
  });






// it('when getBinaryGrid is called it should', () => {
//   // arrange
//   const { build } = setup().default();
//   const c = build();
//   // act
//   c.getBinaryGrid();
//   // assert
//   // expect(c).toEqual
// });
//
// it('when getMensWashroom is called it should', () => {
//   // arrange
//   const { build } = setup().default();
//   const c = build();
//   // act
//   c.getMensWashroom();
//   // assert
//   // expect(c).toEqual
// });
//
// it('when getWomensWashroom is called it should', () => {
//   // arrange
//   const { build } = setup().default();
//   const c = build();
//   // act
//   c.getWomensWashroom();
//   // assert
//   // expect(c).toEqual
// });
//
// it('when getStairsCoordinate is called it should', () => {
//   // arrange
//   const { build } = setup().default();
//   const c = build();
//   // act
//   c.getStairsCoordinate();
//   // assert
//   // expect(c).toEqual
// });
//
  it('when getUp_EscalatorCoordinate is called it should', () => {
  // arrange
  const { build } = setup().default();
  const c = build();
  c.getUp_EscalatorCoordinate();
  // assert
  const key = 'Escalator-Up';
  expect(c.getUp_EscalatorCoordinate()).toHaveBeenCalledWith(c.getCoordinate(key));
  });

  it('when getDown_EscalatorCoordinate is called it should', () => {
  // arrange
  const { build } = setup().default();
  const c = build();
  // act
  c.getDown_EscalatorCoordinate();
  // assert
  const key = 'Escalator-Down';
  expect(c.getElevatorCoordinate()).toHaveBeenCalledWith(c.getCoordinate(key));
});

  it('when getElevatorCoordinate is called it should', () => {
  // arrange
  const { build } = setup().default();
  const c = build();
  // act
  const key = 'Elevator';
  c.getElevatorCoordinate();
  // assert
  expect(c.getElevatorCoordinate()).toEqual(c.getCoordinate(key));
});

 //  it('when getClassroomCoordinate is called it should', () => {
 //  // arrange
 //  const { build } = setup().default();
 //  const c = build();
 //  // act
 //  c.getClassroomCoordinate();
 //  // assert
 //  // expect(c).toEqual
 // });
});
function setup() {

  const builder = {

    default() {
      return builder;
    },
    build() {
      return new Floor();
    }
  };

  return builder;
}
