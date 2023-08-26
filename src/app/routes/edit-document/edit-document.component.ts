import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RoutesEnum, StorageService } from "../../core";

@Component({
  selector: 'edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['../../app.component.css', './edit-document.component.css']
})
export class EditDocumentComponent implements OnInit, OnDestroy {
  id: number = -1
  textData: any = {}
  date: string = ''
  image: any = null
  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private ref: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      //alert(JSON.stringify(params))
      this.id = params['id'];
      this.storage.get(this.id, (document: any) => {
        if(document == null) {
          this.router.navigate([RoutesEnum.Home]);
        } else {
          this.textData = JSON.stringify(document.textData);
          this.date = document.date;
          this.image = new File([], 'no-changed', undefined)
          console.log(document)
          this.ref.markForCheck();
        }
      });
    })

  }

  getTextData(textData: string) {
    if(textData) {
      this.textData = JSON.stringify(textData)
    }
  }

  getImage(image: File) {
    if(image) {
      this.image = image
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
