import { Injectable} from '@angular/core';
import {Hero} from './hero';
import {Headers,Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {HEROES} from './mock-heroes';

@Injectable()



export class HeroService{
	private heroesUrl='api/heroes';
	constructor(private http:Http){}
	private headers=new Headers({'Content-Type':'application/json'});
	getHeroes():Promise<Hero[]>{
		return this.http.get(this.heroesUrl)
					.toPromise()
					// 此处和原文不一致，不知道为什么我的data没有值	.then(response=>response.json().data as Hero[])
					.then(response=>response.json() as Hero[])
					.catch(this.handleError);

		//return Promise.resolve(HEROES);
	}
	private handleError(error:any):Promise<any>{
		console.error('An error occurred',error);
		return Promise.reject(error.message||error);
	}

	getHero(id:number):Promise<Hero>{
		const url=`${this.heroesUrl}/${id}`;
		return this.http.get(url)
				.toPromise()
				//此处和原文不一致，不知道为什么我的data没有值	.then(response => response.json().data as Hero)
				.then(response=>response.json() as Hero)
				.catch(this.handleError);
		// return this.getHeroes()
		// 		.then(heroes=>heroes.find(hero=>hero.id===id));
	}
	update(hero:Hero):Promise<Hero>{
		const url=`${this.heroesUrl}/${hero.id}`;
		return this.http
		.put(url,JSON.stringify(hero),{headers:this.headers})
		.toPromise()
		.then(()=>hero)
		.catch(this.handleError);
	}

	create(name:string):Promise<Hero>{
		return this.http
		.post(this.heroesUrl,JSON.stringify({name:name}),{headers:this.headers})
		.toPromise()
		.then(res=>res.json() as Hero)
		.catch(this.handleError);
	}

	delete(id:number):Promise<void>{
		const url=`${this.heroesUrl}/${id}`;
		return this.http.delete(url,{headers:this.headers})
		.toPromise()
		.then(()=>null)
		.catch(this.handleError);
	}
}