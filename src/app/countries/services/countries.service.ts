import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';

import { Observable, map, of, tap } from 'rxjs';
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
        borders:country.borders ?? [] // coalencia nula(??) evalua si es nulo regresa un arreglo vacio
      }))),
      //tap( response => console.log({ response } )), //tap sirve para ejecutar eventos secundarios response del servicio
      )
    }

}
