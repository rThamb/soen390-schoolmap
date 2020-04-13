    import { autoSpy } from '../../../auto-spy';
    import { Location} from './Location';
    import { FloorTile } from './FloorTile';
    import {async, TestBed} from '@angular/core/testing';
    import {AppComponent} from '../app.component';
    import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
    import {StatusBar} from '@ionic-native/status-bar/ngx';
    import {SplashScreen} from '@ionic-native/splash-screen/ngx';
    import {Platform} from '@ionic/angular';

    describe('FloorTile', () => {

        let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

        beforeEach(async(() => {
            statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
            splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
            platformReadySpy = Promise.resolve();
            platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

            TestBed.configureTestingModule({
                declarations: [AppComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: StatusBar, useValue: statusBarSpy },
                    { provide: SplashScreen, useValue: splashScreenSpy },
                    { provide: Platform, useValue: platformSpy },
                ],
            }).compileComponents();
        }));
        it('when getLocation is called it should', () => {
        // arrange
        const { build } = setup().default();
        const c = build();
        // act
        const l = location;
        c.setLocation(l);
        const a = c.getLocation();
        // assert
        expect(a).toEqual(l);
    });


        it('when getPathfinderCode is called it should', () => {
        // arrange
        const { build } = setup().default();
        const c = build();
        // act
        c.setPathfinderCode(1);
        const a = c.getPathfinderCode();
        // assert
        expect(a).toEqual(1);
    });
    });



    function setup() {

       const l = location;
       let pfc: number;
       pfc = 0;
       const builder = {
            l,
            pfc,
            default() {
                return builder;
            },
            build() {
                return new FloorTile( l, 0);
            }
        };
       return builder;
    }
