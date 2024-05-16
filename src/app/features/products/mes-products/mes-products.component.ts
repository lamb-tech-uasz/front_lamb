import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, first, lastValueFrom, takeUntil } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ProductService } from "src/app/core/services/product.service";
import { FormMaker, FormOptions } from "src/app/shared/interfaces/form-maker";

@Component({
  selector: "app-mes-products",
  templateUrl: "./mes-products.component.html",
  styleUrls: ["./mes-products.component.scss"],
})
export class MesProductsComponent implements OnInit {
  @ViewChild("productModal", { static: false }) productModal!: ElementRef;
  success: boolean = false;
  error: boolean = false;
  selectedImage: File | null = null;
  successDelete: boolean = false;
  errorDelete: boolean = false;
  messageDelete: string = "";
  isloading: boolean = false;
  message: string = "";
  mainMessage: string = "";
  destroy$ = new Subject();
  utilisateur!: any;
  products: any;
  productMaker = new FormGroup({
    nom: new FormControl("", [Validators.required]),
    prixUnitaire: new FormControl("", [Validators.required]),
    specialPrice: new FormControl("", [Validators.required]),
    quantite: new FormControl("", [Validators.required]),
    designation: new FormControl("", [Validators.required]),
    dateExp: new FormControl("", [Validators.required]),
    categorie: new FormControl("", [Validators.required]),
    file: new FormControl<File | null>(null, [Validators.required]),
  });
  fichier: File;

  formMaker: FormMaker[] = [
    {
      name: "Nom",
      key: "nom",
      type: "text",
      control: this.productMaker.get("nom") as FormControl,
    },
    {
      name: "Emballage",
      key: "designation",
      type: "select",
      control: this.productMaker.get("designation") as FormControl,
    },
    {
      name: "Prix unitaire",
      key: "prixUnitaire",
      type: "number",
      control: this.productMaker.get("prixUnitaire") as FormControl,
    },
    {
      name: "Prix Special",
      key: "specialPrice",
      type: "number",
      control: this.productMaker.get("specialPrice") as FormControl,
    },
    {
      name: "Quantite",
      key: "quantite",
      type: "number",
      control: this.productMaker.get("quantite") as FormControl,
    },
    {
      name: "Catégorie",
      key: "categorie",
      type: "select",
      control: this.productMaker.get("categorie") as FormControl,
    },
    {
      name: "Date d'expiration",
      key: "dateExp",
      type: "date",
      control: this.productMaker.get("dateExp") as FormControl,
    },
  ];

  categorie: FormOptions[] = [
    {
      name: "Fruits",
      value: "fruits",
    },
    {
      name: "Légumes",
      value: "legumes",
    },
    {
      name: "Medicaments",
      value: "medicaments",
    },
    {
      name: "Autres",
      value: "autres",
    },
  ];

  emb: FormOptions[] = [
    {
      name: "Sac",
      value: "sac",
    },
    {
      name: "Carton",
      value: "carton",
    },
    {
      name: "Caisse",
      value: "caisse",
    },
    {
      name: "Bouteille",
      value: "bouteille",
    },
    {
      name: "Unité",
      value: "unite",
    },
  ];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {
    this.fichier = new File(["contenu du fichier"], "nom_du_fichier.txt", {
      type: "text/plain",
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onSubmit() {
    this.success = false;
    this.error = false;
    const formData = this.productMaker.value;

    const formData2 = new FormData();
    if (formData.nom) formData2.append("nom", formData.nom);
    if (formData.prixUnitaire) formData2.append("prix", formData.prixUnitaire);

    if (formData.specialPrice)
      formData2.append("prixspecial", formData.specialPrice);
    if (formData.quantite) formData2.append("quantite", formData.quantite);
    if (formData.designation)
      formData2.append("designation", formData.designation);
    if (formData.categorie)
      formData2.append("categorie", formData.categorie);
    if (formData.dateExp) formData2.append("dateExp", formData.dateExp);
    if (formData.file) {
      formData2.append("file", this.fichier);
    }

    formData2.forEach((value, key) => {
      console.log(key, value);
    });

    const data = {
      nom: formData.nom,
      prixUnitaire: formData.prixUnitaire,
      specialPrice: formData.specialPrice,
      quantite: formData.quantite,
      designation: formData.designation,
      dateExp: formData.dateExp,
      categorie: formData.categorie,
      file: this.fichier,
    };

    this.productService.postProducts(formData2).subscribe({
      next: (res: any) => {
        this.success = true;
        this.message = "Le produit a été ajouté avec succès.";
        // this.productMaker.reset();
        console.log(res);

        this.ngOnInit();
        alert(res.text);
      },
      error: (res) => {
        this.error = true;
        this.message = "Une erreur s'est produite lors de l'ajout du produit.";
        console.log(res);
      },
    });
  }

  async getProducts() {
    try {
      this.products = await lastValueFrom(
        this.productService
          .getAllProducts()
          .pipe(takeUntil(this.destroy$), first())
      );
    } catch (error) {
      console.error(error);
    }
  }

  getOptions(ctrl: FormMaker): FormOptions[] {
    if (ctrl.type === "select") {
      if (ctrl.key === "categorie") {
        return this.categorie;
      }
      if (ctrl.key === "designation") {
        return this.emb;
      }
    }
    return [];
  }

  imageBase64: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fichier = file;
    console.log(this.fichier);
    if (file) {
      this.productMaker.patchValue({
        file: file, // Met à jour la valeur du champ file dans le formulaire
      });
      // this.fichier = file;
    }
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageBase64 = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  // supprimer(b: any) {
  //   const confirmation = window.confirm(
  //     "Voulez vous vraiment supprimer ce produit ?"
  //   );

  //   if (confirmation) {
  //     this.productService.deleteProduct(b.id).subscribe((res: any) => {
  //       console.log(res);
  //       window.location.reload();
  //       if (res.error) {
  //         this.errorDelete = true;
  //         this.successDelete = false;
  //         this.messageDelete = "Erreur lors de la suppression.";
  //       } else {
  //         this.products = lastValueFrom(
  //           this.productService
  //             .getAllProducts()
  //             .pipe(takeUntil(this.destroy$), first())
  //         );
  //         this.errorDelete = false;
  //         this.successDelete = true;
  //         this.messageDelete = "Produits supprimé avec succés.";
  //         window.location.reload();
  //       }
  //     });
  //   }
  // }
  supprimer(b: any) {
    const confirmation = window.confirm(
      "Voulez vous vraiment supprimer ce produit ?"
    );

    if (confirmation) {
      this.productService.deleteProduct(b.id).subscribe({
        next: (value) => {
          this.errorDelete = false;
          this.successDelete = true;
          this.messageDelete = "Produits supprimé avec succés.";

          console.log(value);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.errorDelete = true;
          this.successDelete = false;
          this.messageDelete = "Erreur lors de la suppression.";

          window.location.reload();
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
