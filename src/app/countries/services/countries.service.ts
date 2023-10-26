import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';

import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';



//el servicio esta a nivel global
@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  private baseUrl: string ='https://restcountries.com/v3.1';


  private _regions: Region[]= [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor(private http: HttpClient ){}

  get regions(): Region[] {
    return [ ...this._regions ];

  }


  // https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders

  // hay que poner un observable para que regrese el valor que va estar emitiendo el SmallCountry
   getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
  //getCountriesByRegion( region: Region ): Observable<Country[]> {
   //si la region viene vacio entonces regresa arreglo vacio
   //transformamos a un observable con la funcion of
   if( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;


    //regresa solo el arreglo que tiene este SmallCountry
    //return this.http.get<SmallCountry[]>(url)

    return this.http.get<Country[]>(url)
    .pipe(
      //map( countries => [] ),  //nos trae un arreglo vacio porque lo transforma para que pase solo los datos que queramos
      //countries.map es el map de los arreglos y va a regresar un objetos
      map( countries => countries.map( country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [], // coalencia nula(??) evalua si es nulo regresa un arreglo vacio
      })))
      //tap( response => console.log({ response } )), //tap sirve para ejecutar eventos secundarios response del servicio
      )
    }


    //trae un observable de paises Observable<SmallCountry>
    getCountryByAlphaCode(alphaCode: string ): Observable<SmallCountry> {
      console.log(alphaCode);

      const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
       return this.http.get<Country>(url)
       .pipe(
        map( country =>  ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
       )
      }

      getCountryBordersByCodes(borders: string [] ): Observable<SmallCountry[]> {
        //sino hay borders regresa un arreglo vacio
         if( !borders || borders.length === 0 ) return of ([]);
         //arreglo que tiene todos los observables
         //arreglo que va obtener todos los paises

          const countriesRequest: Observable<SmallCountry>[] = [];
          //leer cada uno de los borders que hay
          borders.forEach( code => {
            const request = this.getCountryByAlphaCode( code );  // reuest tiene la informacion de este pais
            //almacenando el request en el arreglo del countryRequest
            //para que me traiga el listado de  observables que trae los paises
              countriesRequest.push(request);  //insertando el request en el arreglo del countriesRequest
            });

            //combineLatest es una funcion de rx
            //combineLatest cuando lo mande llamar el subscribe va emitir de manera simultanea todos los valores que tiene el arreglo
            //hay que mandar el conjunto de observables que esta en el arreglo countriesRequest
            return combineLatest (countriesRequest);

      }


}
