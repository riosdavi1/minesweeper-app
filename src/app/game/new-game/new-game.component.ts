import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AlertService, GameService} from "@app/_services";

@Component({ templateUrl: 'new-game.component.html' })
export class NewGameComponent implements OnInit {
  newGameForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  // error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameService: GameService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.newGameForm = this.formBuilder.group({
      size: ['', Validators.required],
      mines: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newGameForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newGameForm.invalid) {
      return;
    }

    this.loading = true;
    this.gameService.newGame(this.f.size.value, this.f.mines.value)
      .pipe(first())
      .subscribe(
        // data => {
          () => {
            this.router.navigate(['game-board']);
        },
        error => {
          // this.error = error;
          this.alertService.error(error);
          this.loading = false;
        });
  }
}