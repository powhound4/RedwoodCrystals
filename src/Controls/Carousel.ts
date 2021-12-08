/**
 * Custom string literal type for slide direction
 */
 type SlideDirection = 'PREVIOUS' | 'NEXT';


 export class Carousel {
     //  Fields
     /**
      * Disables interactivity - 'true' disables
      */
     protected isMoving: boolean;
 
     /**
      * List of carousel items
      */
     protected items: Array<Element>;
 
     /**
      * The mounted element for internal DOM manipulations.
      */
     protected mountedEl?: HTMLElement;
 
     /**
      * The next button
      */
     protected nextBtn?: HTMLElement;
 
     /**
      * The previous button
      */
     protected prevBtn?: HTMLElement;
 
     //  Properties
 
     /**
      * Carousel item class
      */
     protected ItemClassName: string;
 
     /**
      * Interval id for ref
      */
     protected IntervalId: any;
 
     /**
      * Carousel item class
      */
     protected NextButtonClassName: string;
 
     /**
      * Carousel item class
      */
     protected PrevButtonClassName: string;
 
     /**
      * The value of the next slide.
      */
     
     public get NextSlide(): number {
         if (this.Slide >= this.TotalItems - 1) {
             return 0;
         } else {
                 return this.Slide + 1; 
         }
     }
 
     /**
      * The value of the previous slide.
      */
     public get PreviousSlide(): number {
         if (this.Slide <= 0) {
             return this.TotalItems - 1;
         } else {
             return this.Slide - 1;
         }
     }
 
     /**
      * Value that tells us what frame we're on
      */
     public Slide: number;
 
     /**
      * Total carousel items
      */
     public get TotalItems(): number {
         return this.items?.length || 0;
     }
 
     //  Constructors
     constructor() {
         this.isMoving = true;
 
         this.items = [];
 
         this.ItemClassName = 'sjs-carousel-item';
 
         this.NextButtonClassName = 'sjs-carousel-button-next';
 
         this.PrevButtonClassName = 'sjs-carousel-button-prev';
 
         this.Slide = 0;
 
         this.IntervalId = 0;
     }
 
     //  API Methods
     public Mount(selector: string | HTMLElement): void {
         if (typeof selector === 'string') {
             selector = <HTMLElement>document.querySelector(<string>selector);
         }
 
         this.mountedEl = this.mountToElement(<HTMLElement>selector);
     }
 
     public SetSlide(slide: number | HTMLElement): void {
        //  console.log("set slide: ", this.items); 
        //  console.log("slide = ",  slide);

         if (slide instanceof HTMLElement) {
             slide = <number>this.items?.indexOf(slide);
            //  console.log("slide converted : ", slide);
         }
 
         if (!this.isMoving) {
             this.removeClasses();
 
             this.Slide = slide;
 
             this.setClasses();
         }
     }
 
     public SlideInterval(interval: number): void{
         this.IntervalId = setInterval(this.moveNext.bind(this), interval);
     }
 
     public StopInterval(){
         clearInterval(this.IntervalId);
     }
 
     //  Helpers
     /**
      * Disable isMoving for the same duration as our transition (500ms)
      */
     protected disableInteraction(): void {
         this.isMoving = true;
 
         setTimeout(() => {
             this.isMoving = false;
         }, 500);
     }
 
     protected mountToElement(el: HTMLElement): HTMLElement {
         this.setupChildElements(el);
 
         this.setClasses();
 
         this.setupEventListeners();
 
         this.isMoving = false;
 
         el.classList.add('sjs-carousel');
 
         return el;
     }
 
     /**
      * Next navigation
      */
     protected moveNext(): void {
         this.SetSlide(this.NextSlide);
     }
 
     /**
      * Previous navigation
      */
     protected movePrev(): void {
         this.SetSlide(this.PreviousSlide);
     }
 
     /**
      * Remove carousel classes
      */
     protected removeClasses(): void {
         this.items[this.PreviousSlide].classList.remove('prev');
 
         this.items[this.Slide].classList.remove('active');
 
         this.items[this.NextSlide].classList.remove('next');
     }
 
     /**
      * Setup child elements
      */
     protected setupChildElements(el?: HTMLElement): void {
         const workingEl = <HTMLElement>el || this.mountedEl;
 
         this.items = Array.from(workingEl.querySelectorAll(`.${this.ItemClassName}`));
 
         this.nextBtn = <HTMLElement>(
             workingEl.querySelector(`.${this.NextButtonClassName}`)
         );
 
         this.prevBtn = <HTMLElement>(
             workingEl.querySelector(`.${this.PrevButtonClassName}`)
         );
     }
 
     /**
      * Set carousel classes
      */
     protected setClasses(): void {
        //  console.log("items: ", this.items);
         if(this.items.length >= 2){
         
         this.items[this.PreviousSlide].classList.add('prev');
 
         this.items[this.Slide].classList.add('active');
 
         this.items[this.NextSlide].classList.add('next');

        }
        else{
            this.items[this.Slide].classList.add('active');
        }
     }
 
     /**
      * Click events for navigation buttons
      */
     protected setupEventListeners(): void {
         console.log("TEST: ", this.nextBtn)
         this.nextBtn?.addEventListener('click', this.moveNext.bind(this));
 
         this.prevBtn?.addEventListener('click', this.movePrev.bind(this));
     }
 }
 