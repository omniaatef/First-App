import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { VotingStatusModel } from '../models/voting-status.model';
import { debug } from 'util';

@Injectable()
export class VotingStorageService {

    voteingData: VotingStatusModel[] = [];

    constructor(private http : HttpClient){
    }

    setVotingData(votingData: VotingStatusModel){
        
        this.getVotingStatus().subscribe(
            (res)=>{
                debugger;
                this.voteingData = res;
                var eventItem = this.voteingData.find(
                    function(eventEl) {
                    if(eventEl){
                        return eventEl['email'] == votingData.email && eventEl['eventIndex'] == votingData.eventIndex;
                    }
                }
                );
        
                  if(eventItem){
                    eventItem.option = votingData.option; 
                  }
                  else{
                    this.voteingData.push(votingData);
                  }
                this.storeVotingStatus(this.voteingData).subscribe();
            }
        );
    }


    storeVotingStatus(voteingData: VotingStatusModel[]){
        return this.http.put('https://online-poll-84371.firebaseio.com/VotingData.json', voteingData);
    }


    getVotingStatus(){
        return this.http.get<VotingStatusModel[]>('https://online-poll-84371.firebaseio.com/VotingData.json')
    }


}












    