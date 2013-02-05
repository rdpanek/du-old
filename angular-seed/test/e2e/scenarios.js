'use strict';

var movement = {
  amount: '1234', 
  short_description: 'baterie', 
  long_description: 'do mobilniho telefonu' 
};

var type = {
  name: 'typ1234', 
  color: 'white'
};

describe('Du', function () {
  describe('Kontrola hlavni stranky', function () {

    beforeEach(function (done) {
      browser().navigateTo('../../index.html');
    });

    it('Obsahuje tlacitko +Novy', function (done) {
      expect(element('#new_movement').text()).toBe('+ Nový');
    });

    it('Obsahuje tlacitko Obalky', function(){
       expect(element('#show_types').text()).toBe('Obálky');
    });

    it('Obsahuje tlacitko Vypis', function(){
       expect(element('#show_movements').text()).toBe('Výpis');
    });
  });

  describe('Pohyby', function () {

    describe('Přidat nový pohyb', function () {
      it(' s nepovinym popisem', function (done) {
        element('#new_movement').click();
        input('movement.amount').enter(movement.amount);
        input('movement.name').enter(movement.short_description);
        input('movement.description').enter(movement.long_description);
        
      });
      it('vždy by měly byt dostupny minimalne 3 typy (vydaje, prijmy, ostatni)', function(){
        expect(repeater('.types').count()).toBeGreaterThan(2);
        element('#0-type').click();
        element('#1-type').click();
        element('#2-type').click(); 
      });
      it('uložení nového pohybu', function(){
         element('#save').click();
      });
    });

    describe('Kontrola výpisu pohybů', function () {
      
      describe('Výpis pohybů', function () {
        it('by měl obsahovat více jak 0 pohybů', function(){
           expect(element('.alert-success').count()).toBeGreaterThan(0);
        });
      });

      describe('Kontrola detailu vytvořeného pohybu', function () {
        it('vytvořený pohyb je ve výpisu', function (done) {
          element("span:contains(" + movement.amount + ") ~ a").click();
        });
        it('obsahuje částku', function (done) {
          expect(element('#amount').text()).toBe(movement.amount);
        });
        it('obsahuje zkrácený popis', function(){
           expect(element('#short_description').text()).toBe(movement.short_description);
        });
        it('obsahuje dlouhý popis', function(){
           expect(element('#long_description').text()).toBe(movement.long_description);
        });
        it('obsahuje 3 typy', function(){
           expect(repeater('.type').count()).toBeGreaterThan(2);
        });
        it('z detailu pohybu se lze vrátit zpět na seznam pohybů', function(){
           element('.close').click();
           expect(element('.alert-success').count()).toBeGreaterThan(0);
        });
      });
    });

    describe('Vybraný pohyb lze editovat', function () {
      
        beforeEach(function (done) {
          browser().navigateTo('../../index.html');
        });

        it('editace pohybu - popis nebude vyplnen', function (done) {
          element("span:contains(" + movement.amount + ") ~ a").click();
          element('.edit').click();
          input('movement.amount').enter(movement.amount + 5);
          input('movement.name').enter(movement.short_description + " updated");
          input('movement.description').enter();
          element('#save').click();
        });
        it('pohyb lze smazat', function(){
           element("span:contains(" + movement.amount + "5) ~ a").click();
           element('#remove').click();
        });
      });
  });
  
  describe('Typy', function () {

    beforeEach(function (done) {
      browser().navigateTo('../../index.html');
    });

    it('existují vždy minimálně 3 typy', function (done) {
      element('#show_types').click();
      expect(repeater('.type').count()).toBeGreaterThan(2);
    });

    describe('lze vytvořit nový typ', function () {

      it('uložení nového typu', function (done) {
        element('#show_types').click();
        element('#new_type').click();
        input('type.name').enter(type.name);
        input('type.color').enter(type.color);
        element('#save').click();
      });
      it('ověření, že nový typ byl vytvořen', function(){ 
        element('#show_types').click();
        element("span:contains(" + type.name + ") ~ span a:first").click();
      });
      it('editace uloženého typu bez udání barvy', function(){
          element('#show_types').click();
          element("span:contains(" + type.name + ") ~ span a:first").click();
          input('type.name').enter(type.name);
          input('type.color').enter();
          element('#save').click();
      });
      it('vytovřený typ lze smazat', function(){
         element('#show_types').click();
         element("span:contains(" + type.name + ") ~ span a:eq(1)").click();
      });
    });
  });
});