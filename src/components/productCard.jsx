export default function ProductCard(props){

    return(
        <div className="border w-56 h-72 rounded-lg p-4 flex flex-col items-center justify-between ">

            <h1>{props.name}</h1>
            <img src={props.src} 
                className="w-40 bg-amber-300"/>
            <p>{props.price}</p>     
            
        </div>
    )
}