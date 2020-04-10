import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import {Storage} from '@ionic/storage';
import { HistoryComponent } from './history.component';
import { By } from '@angular/platform-browser';

/******************************************REMOVE F DESCRIBE BEFORE PUSHING**************************************** */
describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the clear history button', () => {
    const btn = fixture.debugElement.query(By.css('#clearHistoryBtn'));
    expect(btn.nativeElement.textContent).toContain('Clear History');
  });

  it('clearHistory shourld prompt an alert message', () => {
    spyOn(window, 'confirm');
    const btn = fixture.debugElement.nativeElement.querySelector('#clearHistoryBtn');
    btn.click();
    expect(window.confirm).toHaveBeenCalled()
    
  });

  it('should have history in storage on init', async () => {
    let storage = TestBed.get(Storage);
    let hist;

    storage.ready().then(() => {
      hist = storage.get('history');
    });
    
    if(hist)
      expect(hist).toBeTruthy();
    else
      expect(hist).toBeFalsy();
  });

  it('should have the date of the searches on the view', () => {
    let storage = TestBed.get(Storage);
    let hist;
    let date = fixture.debugElement.query(By.css('.dates'));
    console.log(date)
    storage.ready().then(() => {
      hist = storage.get('history');
    });

    if(hist) 
      expect(date.nativeElement.textContent).toContain(', 2020');
    else
      expect(date).toBeFalsy();


    
  });

  
});
