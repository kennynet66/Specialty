import { Pipe, PipeTransform } from '@angular/core';
import { countriesApiResponse } from '../Interfaces/data.Interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(countries: countriesApiResponse[], name: string): countriesApiResponse[]{

    if(!countries || name == ''){
      return countries
    }
    const filtered: countriesApiResponse[] =[]

    for(let country of countries){
      if(country.name.toLowerCase().includes(name.toLowerCase())){
        filtered.push(country)
      }
    }
    return filtered
  }

}
