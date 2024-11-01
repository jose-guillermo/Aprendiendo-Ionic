import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  standalone: true
})
export class FiltroPipe implements PipeTransform {

  transform<T extends Record<string, any>>( arreglo: T[], texto: string, columna: string): T[] {
    if ( texto === "") return arreglo;
    if ( !arreglo ) return arreglo;
    if ( columna === "") return arreglo;

    texto = texto.toLowerCase();
    
    return arreglo.filter(
      item => item[columna].toLowerCase().includes(texto)
    );
  }

}
