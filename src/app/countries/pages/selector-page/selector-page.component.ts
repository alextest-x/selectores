import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry, Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];



  //hay que conectar el myForm al formualrio de la vista
  public myForm: FormGroup = this.fb.group({
    region:  [ '' , Validators.required ],
    country: [ '' , Validators.required ],
    border: [ '' , Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    ) {}


    //se ejecuta cuando se inicializa este componente
    //aqui ya tengo acceso a mi servicio y las propiedades
  ngOnInit(): void {

    //creando el listener
   this.onRegionChanged();
   this.onCountryChanged();

  }


    get regions(): Region[] {
      //apunta por referencia al arreglo de regiones
      return this.countriesService.regions;
    }

    onRegionChanged(): void{
    //el formulario ya esta creado en el OnInit
    /*!. operador not null operator siempre hay un valor*/
    this.myForm.get('region')!.valueChanges
    //operador que recibe el valor de un observable y subscribirse a otro observable es el switchMap que va a tener el valor anterior
    //de la region y con este valor this.countriesService.getCountriesByRegion(region); le enviamos la region
    //porque enviamos el argumento region a otra funcion
     .pipe(
        //limpia los paises antes que mande la peticion de paises
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.borders =[]),  //limpia el selector de borders  efecto secudario con tap
        //switchMap( this.countriesService.getCountriesByRegion ) //simplificado
        //el switchMap tomar el valor del observable anterior ( region) y se subscribe al nuevo observable
          switchMap( (region) => this.countriesService.getCountriesByRegion(region) ),
     )
     .subscribe( countries => {
      this.countriesByRegion = countries;
      //console.log({ countries })
      });
 }

    onCountryChanged(): void {

      this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('border')!.setValue('') ),
        //filtra si trae un true continua sino se sale
        filter( (value: string) => value.length > 0),
        switchMap( ( alphaCode ) => this.countriesService.getCountryByAlphaCode(alphaCode) ),
        switchMap( (country) => this.countriesService.getCountryBordersByCodes(country.borders)),
     )
     .subscribe( countries => {
      this.borders = countries;
      //console.log({borders: country.borders});


      //this.countriesByRegion = countries;

      });
    }

}


