import { Component } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { Sidebar } from "./components/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { NavigationOverlay } from '../../core/navigation/components/navigation-overlay/navigation-overlay';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Sidebar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
