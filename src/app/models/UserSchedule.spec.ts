import { UserSchedule } from './UserSchedule';
import {Course} from "./Course";

describe('UserSchedule', () => {
  it('when getCourses is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    c.setCourses(Course['']);
    const Courses = c.getCourses();
    // assert
    expect(Courses).toEqual(Course['']);
  });

  it('when setCourses is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const Courses= Course[''];
    c.setCourses(Courses);
    // assert
    expect(c.setCourses).toBeDefined;
  });

  
});

function setup() {
  
  const builder = {
    
    default() {
      return builder;
    },
    build() {
      return new UserSchedule();
    }
  };

  return builder;
}
