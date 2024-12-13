import { Routes } from '@angular/router';
import { NotfoundComponent } from '../views/notfound/notfound.component';

export const routes: Routes = [
    {
        path:"produits",
        loadComponent : ()=> import('../components/product/product.component')
        .then(m => m.ProductComponent),
    },
    {
        path:"login",
        loadComponent : ()=> import('../views/login/login.component')
        .then(m => m.LoginComponent)
    },
    {
        path:"register",
        loadComponent : ()=> import('../views/register/register.component')
        .then(m => m.RegisterComponent)
    },
    {
        path:"**",
        loadComponent : ()=> import('../views/notfound/notfound.component')
        .then(m => NotfoundComponent)
    },
];
