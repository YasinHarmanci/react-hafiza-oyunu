import './App.css';
import {useEffect, useState} from "react";
import Card from "./components/card";
import {match} from "assert";

export type T_Card = {
    src:any,
    id?:number,
    count?:number,
    match:boolean,
}


const data:T_Card[] = [
    {id:1,src:"/armut.png",match:false},
    {id:2,src:"/elma.png",match:false},
    {id:3,src:"/muz.png",match:false},
    {id:4,src:"/karpuz.png",match:false},
    {id:5,src:"/visne.png",match:false},
    {id:6,src:"/portakal.png",match:false},
]


function App() {
    const [card,setCard] = useState<T_Card[]>([])
    const [primary,setPrimary] = useState<any>(null);
    const [secondary,setSecondary] = useState<any>(null);
    const [animation,setAnimation] = useState<any>(false);
    const [active,setActiveClick] = useState(true);
    const [options,setOptions] = useState(0);


    const confuse = ()=>{
     const  sorteds:any = [...data,...data].sort(()=> Math.random()-0.5).map((k)=> ({...k}));
        setCard(sorteds);
        setOptions(0);
    }

    const CardSelected =(data:any)=>{
        if(animation) return;
        primary ? setSecondary(data) : setPrimary(data);
        if (!active){
            return card;
        }
    }

    const Reset = () =>{
        setPrimary(null);
        setSecondary(null);
        setActiveClick(false);
        setOptions( count => count + 1);
    }


    useEffect(()=> {
        if(primary && secondary){
            setActiveClick(true);
            if(primary.id === secondary.id){
                setCard(backCard => {
                    return backCard.map(card => {
                        if (card.id === primary.id){
                            return {...card,match:true}
                        }else {
                            return {...card};
                        }
                    })
                })
                console.log("no match")
                Reset();
            }else {
                console.log("matched")
                Reset();
            }
            console.log(card, "ALL CARDS");
        }

    },[primary,secondary])

    useEffect(()=> {
        confuse();
    },[])

    return (
      <div className="App">
        <h1>React Memory Game</h1>
        <button onClick={confuse}>New Play</button>
          <div className="card-grid">
              {card.map((e)=>{
                  return(
                      <Card data={e}  onSelect={CardSelected} rotate={e === primary || e === secondary || e.match}/>
                  )
              })}
          </div>
          <h1>Number of Options:{options}</h1>
      </div>
  );
}

export default App;