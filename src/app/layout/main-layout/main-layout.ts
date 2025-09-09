import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { Header } from '../header/header';
// import { Footer } from '../footer/footer';w

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
