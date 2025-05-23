import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
