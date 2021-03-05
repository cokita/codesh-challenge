import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess(textOrTpl: string, options: any = {}) {
    const newOptions = {...options, ...{ classname: 'bg-success text-light', delay: 10000 }};
    this.show(textOrTpl, newOptions);
  }

  showDanger(textOrTpl: string, options: any = {}) {
    const newOptions = {...options, ...{ classname: 'bg-danger text-light', delay: 10000 }};
    this.show(textOrTpl, newOptions);
  }
}
