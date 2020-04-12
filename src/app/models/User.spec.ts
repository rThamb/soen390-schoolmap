import { Location} from './Location';
import { autoSpy} from '../../../auto-spy';
import {User} from './User';
import {UserSettings} from './UserSettings';
import {UserSchedule} from './UserSchedule';

fdescribe('User', () => {
it('when getSettings is called it should return the user setting that been assigned by setSetting()', (l) => {

    // arrange
    const { build } = setup().default();
    const c = build();
    const b = new UserSettings();

    c.setSettings(b);
    const g = c.getSettings();
    // assert
    expect(g).toEqual(b);
});



it('when getSchedule is called it should return the user schedule that been assigned by setSchedule()', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    const d  = new UserSchedule();
    // act
    c.setSchedule(d);
    const g = c.getSchedule();
    // assert
    expect(g).toEqual(d);
});


it('when getLocation is called it should return the user location that been assigned by setLocation()', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    const a = new Location(1, 1, 1);
    c.setLocation(a);
    // act
    const g = c.getLocation();
    // assert
    expect(g).toEqual(a);
});
});


function setup() {
    const builder = {
        default() {
            return builder;
        },
        build() {
            return new User();
        }
    };
    return builder;
}
