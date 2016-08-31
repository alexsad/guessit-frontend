import {EventEmitter} from "event-emitter-lite";
import {IDashCard} from "../dash-card/i-dash-card";
import {IPlayer} from "./i-player";
import dashCardStore from "../dash-card/dash-card-store";

declare var io:any;

class PlayerStore {
	onChange: EventEmitter<any> = new EventEmitter();
	private players: IPlayer[];
	constructor(){
		var socket = io();

		this.players = [];
		/*
		setTimeout(()=>{
			this.players = [
				{ id: 1, color: "#ff0000", points: 10 }
				, { id: 2, color: "#99ff44", points: 5 }
				, { id: 3, color: "#BABACA", points: 12 }
				, { id: 4, color: "#FAfA0A", points: 30 }
				, { id: 5, color: "#4499FF", points: 4 }
			];
			this.onChange.emit(null);
		},2000);
		*/
		socket.emit('join', 'Guabiraba');

		socket.on('update-players',(players:IPlayer[])=>{
			this.players = players;
			console.log(players);
			this.onChange.emit(null);
			dashCardStore.set(players[0].deck);
		});

	}
	get():IPlayer[]{
		return this.players;
	}
}

export default new PlayerStore();
