import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RadioPage} from './radio.page';

describe('RadioPage', () => {
    let component: RadioPage;
    let fixture: ComponentFixture<RadioPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RadioPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
