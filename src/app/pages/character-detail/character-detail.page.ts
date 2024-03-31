import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RickAndMortyServiceService } from 'src/app/services/rick-and-morty-service.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class CharacterDetailPage implements OnInit {
  characterId: string = '';
  character= null as any;
  episodes: any[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private rickAndMortyService:RickAndMortyServiceService
  ) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter(){
    this.rickAndMortyService.getCharacterById(this.characterId).subscribe({
      next: (res:any) => {
        this.character = res;
        this.getEpisodes();

      },
      error: (err:any) => {
        
      },
    })

  }

  getEpisodes(){
    for(let url of this.character.episode){
      this.rickAndMortyService.getByUrl(url).subscribe({
        next: (res:any) => {
          this.episodes.push(res);
          console.log(res);
  
        },
        error: (err:any) => {
          
        },
      })
    }
    
    
  }

}
