
// app.component.ts

/*

Aufgabe für Schüler: Aufteilung der Angular-App in logische Komponenten
Ziel der Aufgabe:
Die Schüler sollen die bestehende Angular-App (app.component.ts) in logische
Komponenten aufteilen. Dabei sollen sie die Dateien
app.component.ts, app.component.html und app.component.css
erstellen und den Code sinnvoll strukturieren. Zusätzlich sollen sie darauf achten,
dass die Imports korrekt übertragen werden.

Schritt-für-Schritt-Anleitung:
1. Vorbereitung
Erstelle einen neuen Ordner für die Angular-App (falls noch nicht vorhanden).

Erstelle die folgenden Dateien manuell:

ordner components
- header
- main
- footer
- modale


app.xy.ts

app.xy.html

app.x.css

files für die jeweiligen components.

Kopiere den gegebenen Code in die entsprechenden Dateien.

2. Aufteilung des Codes
Der Code ist in folgende logische Gruppen unterteilt:

1.
Komponenten-Deklaration:

Hier wird die Angular-Komponente mit @Component deklariert.

Die notwendigen Module (z. B. CommonModule, FormsModule) werden importiert.

2.
Zustandsverwaltung:

Zustandsvariablen wie isMenuOpen, modalType, feedback, starships, favorites, cart usw.
werden hier verwaltet.

3.
Kategorien und Bilder:

Die Kategorien der Schiffe (shipCategories) und die zugehörigen Bilder
(starshipImages) werden definiert.

4.
Initialisierung:

Im Konstruktor werden die Schiffe, Favoriten und der Warenkorb geladen.

5.
Methoden:

Methoden zur Steuerung der Benutzerinteraktionen wie Menüsteuerung,
Modalsteuerung, Filterung, Favoritenverwaltung, Warenkorbverwaltung und PDF-Export.

*/

// hier sind die imports die man so braucht.
// auch bibliotheken wie jsPDF oder tailwind für einfaches desing kann hier rein.
// auch die imports für die modals die wir in app.modals.ts verfrachten werden.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Für Two-Way-Bindung mit [(ngModel)]
import { jsPDF } from 'jspdf';

// Komponenten-Deklaration
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule für [(ngModel)]
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Zustandsverwaltung
  // Menü Status
  isMenuOpen = false;

  // Modal Status
  modalType: string | null = null;
  isModalOpen = false;

  // Feedback-Nachricht
  feedback: string | null = null;

  // Schiffe und Filter
  starships: any[] = [];
  filteredStarships: any[] = [];
  activeCategory: string | null = null;
  activeFilters: string[] = [];

  // Favoriten und Warenkorb
  favorites: any[] = [];
  cart: any[] = [];

  // Filter- und Modal-Zustände
  filters = {
    name: '',
    model: '',
    manufacturer: '',
    minPrice: '',
    maxPrice: '',
  };

  // Quantität für den Warenkorb
  quantity: number = 1;
  showQuantityModal: boolean = false;

  // Modale Zustände
  showFavorites: boolean = false;
  showCart: boolean = false;
  showFilterModal: boolean = false;
  showCheckoutModal: boolean = false;

  // Ausgewähltes Schiff
  selectedShip: any = null;

  // Kategorien
  shipCategories = [
    {
      id: 'light-fighters',
      title: 'Leichte Jäger',
      description: 'Schnelle und wendige Kampfschiffe',
      image: '/assets/light.jpg',
      filter: (ship: any) =>
        [
          'Starfighter',
          'starfighter',
          'Light fighter',
          'Assault starfighter',
          'assault starfighter',
          'patrol craft',
          'yacht',
          'Space Transport',
          'light freighter',
        ].includes(ship.starshipClass),
    },
    {
      id: 'heavy-ships',
      title: 'Schwere Kampfschiffe',
      description: 'Mächtige Schlachtschiffe und Kreuzer',
      image: '/assets/heavy.jpg',
      filter: (ship: any) =>
        [
          'Star Destroyer',
          'star destroyer',
          'Star dreadnought',
          'star dreadnought',
          'corvette',
          'Cruiser',
          'Battleship',
          'Destroyer',
          'escort ship',
          'droid control ship',
          'assault ship',
          'capital ship',
          'deep space mobile battlestation',
          'space cruiser',
        ].includes(ship.starshipClass),
    },
    {
      id: 'cargo-ships',
      title: 'Frachtschiffe',
      description: 'Transport- und Handelsschiffe',
      image: '/assets/cargos.jpg',
      filter: (ship: any) =>
        [
          'transport',
          'landing craft',
          'medium transport',
          'cargo transport',
          'armed government transport',
          'Star Cruiser',
          'cruiser',
          'freighter',
          'diplomatic barge',
        ].includes(ship.starshipClass),
    },
  ];

  // Bilder für Schiffe
  starshipImages: { [key: string]: string } = {
    'CR90 corvette': 'cr90.jpg',
    'Star Destroyer': 'star-destroyer.jpg',
    'Sentinel-class landing craft': 'sentinel.jpg',
    'Death Star': 'death-star.jpg',
    'Millennium Falcon': 'millennium-falcon.jpg',
    'X-wing': 'x-wing.jpg',
    'TIE Advanced x1': 'tie-x1.jpg',
    'Executor': 'executor.jpg',
    'Rebel transport': 'rebel-transport.jpg',
    'Slave 1': 'slave.jpg',
    'Imperial shuttle': 'Imperial-shuttle.jpg',
    'EF76 Nebulon-B escort frigate': 'escort-frigate.jpg',
    'Calamari Cruiser': 'calamari-cruiser.jpg',
    'A-wing': 'a-wing.jpg',
    'B-wing': 'b-wing.jpg',
    'Republic Cruiser': 'republic-cruiser.jpg',
    'Droid control ship': 'droid-controlship.jpg',
    'Naboo fighter': 'naboo-fighter.jpg',
    'Naboo Royal Starship': 'naboo-royal.jpg',
    'Scimitar': 'scimitar.jpg',
    'J-type diplomatic barge': 'J-type.jpg',
    'AA-9 Coruscant freighter': 'aa-9.jpeg',
    'Jedi starfighter': 'jedi-starfighter.jpg',
    'H-type Nubian yacht': 'h-type.jpg',
    'Republic Assault ship': 'assault-ship.jpg',
    'Solar Sailer': 'solar-sailer.jpg',
    'Trade Federation cruiser': 'ferderation-cruiser.jpg',
    'Theta-class T-2c shuttle': 't-2c.jpg',
    'Republic attack cruiser': 'attack-cruiser.jpg',
    'Naboo star skiff': 'star-skiff.jpg',
    'Jedi Interceptor': 'interceptor.jpg',
    'arc-170': 'arc-170.jpg',
    'Banking clan frigte': 'clan-frigte.jpg',
    'Belbullab-22 starfighter': 'belbullab-22.jpg',
    'V-wing': 'v-wing.jpg',
    'Y-wing': 'y-wing.jpg',
  };

  // Einzigartige Modelle und Hersteller
  uniqueModels: string[] = [];
  uniqueManufacturers: string[] = [];

  // Initialisierung
  constructor() {
    this.loadInitialStarships();
    this.loadFavorites();
    this.loadCart();
  }

  // Menü umschalten
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Modal öffnen
  openModal(type: string) {
    this.modalType = type;
    this.isMenuOpen = false; // Menü schließen
  
    // Alle Modals schließen
    this.resetAllModals();
    
    // Nur das gewünschte Modal öffnen
    if (type === 'filter') {
      this.showFilterModal = true;
    } else if (type === 'favorites') {
      this.showFavorites = true;
    } else if (type === 'cart') {
      this.showCart = true;
    }
  }

  // Modal schließen
  closeModal(event?: Event) {
    if (event) {
      const target = event.target as HTMLElement;
  
      // Wenn genau auf den Modal-Wrapper geklickt wird (Außenbereich)
      if (target === event.currentTarget) {
        this.resetAllModals();
      }
    } else {
      // Nur die Schiffdetails schließen, nicht das übergeordnete Modal
      this.selectedShip = null;
      this.showQuantityModal = false;
    }
  }
  

  // Hilfsfunktion zum Schließen aller Modals
  resetAllModals() {
    this.showFilterModal = false;
    this.showFavorites = false;
    this.showCart = false;
    this.showCheckoutModal = false;
    this.showQuantityModal = false;
    this.selectedShip = null;
    this.modalType = null;
  }

  // Menü schließen
  closeMenu(event: Event) {
    const target = event.target as HTMLElement;

    // Überprüfe, ob der Klick außerhalb des Dropdown-Inhalts erfolgt ist
    if (!target.closest('.menu') && !target.closest('.menu-container')) {
      this.isMenuOpen = false; // Schließe das Dropdown-Menü
    }
  }

  // Kategorie klicken
  handleCategoryClick(categoryId: string) {
    this.activeCategory = categoryId;
    this.applyFilters();
    console.log(`Kategorie ${categoryId} aktiviert`);
  }

  // Filter anwenden
  applyFilters() {
    let filtered = this.starships.filter((ship) => {
      const matchesFilter =
        ship.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
        ship.model.toLowerCase().includes(this.filters.model.toLowerCase()) &&
        ship.manufacturer.toLowerCase().includes(this.filters.manufacturer.toLowerCase()) &&
        (this.filters.minPrice === '' || ship.costInCredits >= +this.filters.minPrice) &&
        (this.filters.maxPrice === '' || ship.costInCredits <= +this.filters.maxPrice);
  
      return matchesFilter;
    });
  
    if (this.activeCategory) {
      const category = this.shipCategories.find((cat) => cat.id === this.activeCategory);
      if (category) {
        filtered = filtered.filter(category.filter);
      }
    }
  
    this.filteredStarships = filtered;
  
    // Smooth Scroll zur Schiffeliste
    setTimeout(() => {
      const starshipListElement = document.getElementById('starship-list');
      if (starshipListElement) {
        starshipListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Kurze Verzögerung, um sicherzustellen, dass die Liste aktualisiert ist
  }

  // Filter zurücksetzen
  resetFilters() {
    this.filters = {
      name: '',
      model: '',
      manufacturer: '',
      minPrice: '',
      maxPrice: '',
    };
    this.activeCategory = null;
    this.filteredStarships = this.starships;
    this.feedback = 'Filter zurückgesetzt';
    setTimeout(() => (this.feedback = null), 3000);
  }

  // Schiffdetails öffnen
  openShipDetails(ship: any) {
    this.selectedShip = ship;
  }

  // Kategorietitel abrufen
  getCategoryTitle(id: string) {
    return this.shipCategories.find((cat) => cat.id === id)?.title || '';
  }

  // Favoriten hinzufügen/entfernen
  handleAddToFavorites(ship: any) {
    if (!this.favorites.some((fav) => fav.id === ship.id)) {
      this.favorites = [...this.favorites, ship];
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.feedback = `${ship.name} wurde zu Favoriten hinzugefügt!`;
    } else {
      this.favorites = this.favorites.filter((fav) => fav.id !== ship.id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.feedback = `${ship.name} wurde aus Favoriten entfernt!`;
    }
    setTimeout(() => (this.feedback = null), 3000);
  }

  // Favoriten laden
  loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  }

  // Warenkorb laden
  loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  // Schiff zum Warenkorb hinzufügen
  handleAddToCart(ship: any) {
    // Prüfen, ob das Schiff bereits im Warenkorb ist
    if (!this.isInCart(ship.id)) {
      this.showQuantityModal = true;
      this.selectedShip = ship;
    } else {
      this.feedback = `${ship.name} ist bereits im Warenkorb!`;
      setTimeout(() => (this.feedback = null), 3000);
    }
  }

  // Zum Warenkorb mit Menge hinzufügen
  addToCartWithQuantity() {
    if (this.selectedShip && this.quantity > 0) {
      this.cart = [...this.cart, { ...this.selectedShip, quantity: this.quantity }];
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.feedback = `${this.selectedShip.name} (${this.quantity} Stk) wurde zum Warenkorb hinzugefügt!`;
      setTimeout(() => (this.feedback = null), 3000);
      this.showQuantityModal = false;
      this.quantity = 1; // Zurücksetzen der Stückzahl
    }
  }

  updateCartQuantity(index: number, action: string) {
    if (action === 'increment') {
      this.cart[index].quantity++;
    }
    if (action === 'decrement' && this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  

  // Schiff aus dem Warenkorb entfernen
  removeFromCart(shipId: string) {
    this.cart = this.cart.filter((ship) => ship.id !== shipId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.feedback = `Raumschiff wurde aus dem Warenkorb entfernt!`;
    setTimeout(() => (this.feedback = null), 3000);
    // Modal nicht schließen - wir bleiben im Warenkorb
  }

  // Gesamtpreis berechnen
  calculateTotalPrice() {
    return this.cart.reduce((total, item) => total + item.costInCredits * item.quantity, 0);
  }

  // Warenkorb leeren
  handleClearCart() {
    if (this.cart.length > 0) {
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.feedback = 'Warenkorb wurde geleert!';
      setTimeout(() => (this.feedback = null), 3000);
    }
  }

  // Checkout starten
  handleCheckout() {
    this.showCart = false;
    this.showCheckoutModal = true;
  }

  // Zahlung abschließen
  handlePayNow() {
    this.feedback = 'Vielen Dank für Ihren Einkauf!';
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.showCheckoutModal = false;
    setTimeout(() => (this.feedback = null), 3000);
  }

  // Quantität ändern
  handleQuantityChange(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    if (value > 0) {
      this.quantity = value;
    }
  }

  // Quantität erhöhen
  incrementQuantity() {
    this.quantity++;
  }

  // Quantität verringern
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Schiffe von der API laden
  async loadInitialStarships() {
    const SWAPI_BASE_URL = 'https://swapi.dev/api/starships';
    let allStarships: any[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const starshipsData = await this.getStarships(SWAPI_BASE_URL, currentPage);
      if (starshipsData.length > 0) {
        allStarships = [...allStarships, ...starshipsData];
        currentPage++;
      } else {
        hasMore = false;
      }
    }

    this.starships = allStarships;
    this.filteredStarships = allStarships;

    // Einzigartige Modelle und Hersteller ableiten
    this.uniqueModels = [...new Set(this.starships.map((ship) => ship.model))];
    this.uniqueManufacturers = [...new Set(this.starships.map((ship) => ship.manufacturer))];
  }

  // Schiffe von der API abrufen
  async getStarships(baseUrl: string, page: number) {
    try {
      const response = await fetch(`${baseUrl}?page=${page}`);
      const data = await response.json();
      return data.results.map((ship: any) => ({
        id: ship.url.match(/(\d+)\/$/)[1],
        name: ship.name,
        model: ship.model,
        starshipClass: ship.starship_class.toLowerCase(),
        manufacturer: ship.manufacturer,
        costInCredits: ship.cost_in_credits === 'unknown' ? 0 : parseInt(ship.cost_in_credits, 10),
        length: ship.length,
        crew: ship.crew,
        passengers: ship.passengers,
        speed: ship.max_atmosphering_speed,
        hyperdrive: ship.hyperdrive_rating,
        mglt: ship.MGLT,
        cargo: ship.cargo_capacity,
        consumables: ship.consumables,
        imageUrl: `/assets/starships/${this.starshipImages[ship.name] || 'default.jpg'}`
      }));
    } catch (error) {
      console.error('Fehler beim Abrufen der Starships:', error);
      return [];
    }
  }

  // Hilfsfunktion zur Formatierung des Preises
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Scrollen zum Seitenanfang
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Prüfen, ob ein Schiff in den Favoriten ist
  isFavorite(shipId: string): boolean {
    return this.favorites.some((fav) => fav.id === shipId);
  }

  // Prüfen, ob ein Schiff im Warenkorb ist
  isInCart(shipId: string): boolean {
    return this.cart.some((item) => item.id === shipId);
  }

  // Schiffdetails aus Favoriten öffnen
  openShipDetailsFromFavorites(ship: any) {
    this.selectedShip = ship;
    // this.showFavorites = false // auskommentiert : Das Favoriten-Modal bleibt geöffnet
  }

  // Schiffdetails aus Warenkorb öffnen
  openShipDetailsFromCart(ship: any) {
    this.selectedShip = ship;
    // this.showCart = false; // auskommentiert : Das Warenkorb-Modal bleibt geöffnet
  }

  // Filter anwenden und Modal schließen
  handleFilterApply() {
    this.applyFilters();
    this.showFilterModal = false;
  }

  // Schiff aus Favoriten entfernen
  removeFromFavorites(shipId: string) {
    this.favorites = this.favorites.filter((ship) => ship.id !== shipId);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.feedback = `Raumschiff wurde aus Favoriten entfernt!`;
    setTimeout(() => (this.feedback = null), 3000);
    // Modal bleibt geöffnet, um weitere Aktionen zu ermöglichen
  }

  // PDF exportieren
  handleExportToPDF() {
    const doc = new jsPDF();

    // Titel hinzufügen
    doc.setFontSize(18);
    doc.text('Ihre Einkaufsliste', 10, 20);

    // Warenkorb-Inhalt hinzufügen
    let yPosition = 30;
    this.cart.forEach((ship, index) => {
      doc.setFontSize(12);
      doc.text(
        `${ship.name} - ${ship.quantity} Stk - ${ship.costInCredits * ship.quantity} Credits`,
        10,
        yPosition
      );
      yPosition += 10;
    });

    // Gesamtpreis hinzufügen
    doc.setFontSize(14);
    doc.text(
      `Gesamtpreis: ${this.formatPrice(this.calculateTotalPrice())} Credits`,
      10,
      yPosition + 10
    );

    // PDF speichern
    doc.save('einkaufsliste.pdf');
  }
}