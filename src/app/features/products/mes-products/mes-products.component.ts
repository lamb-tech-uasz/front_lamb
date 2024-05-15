import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, first, lastValueFrom, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { FormMaker, FormOptions } from 'src/app/shared/interfaces/form-maker';

@Component({
  selector: 'app-mes-products',
  templateUrl: './mes-products.component.html',
  styleUrls: ['./mes-products.component.scss']
})
export class MesProductsComponent {

  success: boolean = false
  error: boolean = false


  successDelete: boolean = false
  errorDelete: boolean = false
  messageDelete:string = ''
  isloading: boolean = false
  message: string = ""
  mainMessage: string = ""
  destroy$ = new Subject();
  utilisateur!: any
  products: any
  productMaker = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prixUnitaire: new FormControl('', [Validators.required]),
    quantite: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    dateExp: new FormControl('', [Validators.required]),
    categorie: new FormControl('', [Validators.required]),
  });

  formMaker: FormMaker[] = [
    { name: "Nom", key: "nom", type: "text", control: this.productMaker.get('nom') as FormControl },
    { name: "Emballage", key: "designation", type: "select", control: this.productMaker.get('designation') as FormControl },
    { name: "Prix unitaire", key: "prixUnitaire", type: "number", control: this.productMaker.get('prixUnitaire') as FormControl },
    { name: "Quantite", key: "quantite", type: "number", control: this.productMaker.get('quantite') as FormControl },
    { name: "Catégorie", key: "categorie", type: "select", control: this.productMaker.get('categorie') as FormControl },
    { name: "Date d'expiration", key: "dateExp", type: "date", control: this.productMaker.get('dateExp') as FormControl },
  ]

  categorie: FormOptions[] = [
    {
      name: 'Fruits',
      value: 'fruits'
    },
    {
      name: 'Légumes',
      value: 'legumes'
    }, {
      name: 'Medicaments',
      value: 'medicaments'
    }, {
      name: 'Autres',
      value: 'autres'
    }
  ]

  emb: FormOptions[] = [
    {
      name: 'Sac',
      value: 'sac'
    },
    {
      name: 'Carton',
      value: 'carton'
    }, {
      name: 'Caisse',
      value: 'caisse'
    },
    {
      name: 'Bouteille',
      value: 'bouteille'
    },
    {
      name: 'Unité',
      value: 'unite'
    }
  ]

  constructor(private authService: AuthService, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProducts()
  }



  onSubmit() {
    this.success = false;
    this.error = false;
    const formData = this.productMaker.value;
    const data = {
      nom: formData.nom,
      prixUnitaire: formData.prixUnitaire,
      quantite: formData.quantite,
      designation: formData.designation,
      dateExp: formData.dateExp,
      categorie: formData.categorie,
    };

    this.productService.postProducts(data).subscribe(
      (res: any) => {
        if (res.error) {
          this.error = true;
          this.message = 'Une erreur s\'est produite lors de l\'ajout du produit.';
        } else {
          this.success = true;
          this.message = 'Le produit a été ajouté avec succès.';
          this.productMaker.reset();
          this.getProducts();
        }
      })
  }

  async getProducts() {
    try {
      this.products = await lastValueFrom(
        this.productService.getAllProducts()
          .pipe(
            takeUntil(this.destroy$),
            first(),
          )
      );
    } catch (error) {
      console.error(error)

    }
  }

  getOptions(ctrl: FormMaker): FormOptions[] {
    if (ctrl.type === 'select') {
      if (ctrl.key === 'categorie') {
        return this.categorie;
      }
      if (ctrl.key === 'designation') {
        return this.emb
      }
    }
    return [];
  }
  supprimer(b: any) {
    const confirmation = window.confirm("Voulez vous vraiment supprimer ce produit ?");

    if(confirmation){
      this.productService.deleteProduct(b.id).subscribe((res:any)=>{
        console.log(res)
        if(res.error){
          this.errorDelete = true
          this.successDelete = false
          this.messageDelete = "Erreur lors de la suppression."
        }else {
          this.products =  lastValueFrom(
            this.productService.getAllProducts()
              .pipe(
                takeUntil(this.destroy$),
                first(),
              )
          );
          this.errorDelete = false
          this.successDelete = true
          this.messageDelete = "Produits supprimé avec succés."
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
