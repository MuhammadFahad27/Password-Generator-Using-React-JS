import { useState ,useCallback ,useEffect ,useRef} from "react"
const App = () => {

  let [number,setNumber] = useState(false) ;
  let [length,setLenght] = useState(8) ;
  let [character ,setCharacter] = useState(false) ;
  let [password,setPassword] = useState() ;
  let copy_pass = useRef(null) ; 

  const copy_password = ()=>{

    window.navigator.clipboard.writeText(password);
    copy_pass.current?.select() ;
    copy_pass.current?.setSelectionRange(0,30) ;
  }

  // fuction to generate a random password 
  const passGenerator = useCallback(()=>{
    
    
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;
    let pass = "";

    if (number) {

      str+="0123456789" ;
    }

    else if (character) {

      str+= "@#!%$&*?><" ;
    }

    for (let i  = 0; i  < length ; i++) {
      
      let index = Math.floor(Math.random() * str.length +1) ;  // random index 

      pass += str.charAt(index) ;

      
    }

    setPassword(pass) ;

  },[number,length,character]) 

  useEffect(()=>{

    passGenerator() ;
  },[length,number,character,passGenerator])

 
//  passGenerator();
 
  return (
   <>
        <div className="ml-[400px] mt-[30px] overflow-hiden mb-4">

          <h1 className="text-white text-3xl " >Random Password Generator </h1>

        </div>
        <div className="bg-gray-800 w-[650px] h-[120px] ml-[300px] mt-[100px]">
            <div>
              <input type="text" value={password} 
              className="ml-10 mt-8 w-[490px] rounded-sm p-2" readOnly  ref={copy_pass}/>

              <button className="text-white bg-blue-800 ml-0 p-2 rounded-sm " 
              onClick={copy_password} >Copy</button>
          </div>
          <div>
              <input type="range" min={6} max={30} className="ml-10 mt-4 cursor-pointer" 
              value={length}
              onChange={(e)=>{setLenght(e.target.value)}}/>
              <label className="text-white ml-2">lenght : ({length})</label>

              <input type="checkbox" defaultChecked={number}
              onChange={()=>{
                setNumber((prev)=> !prev) 
              }} className="ml-4"/>
              <label className="text-white ml-2">Numbers</label>

              <input type="checkbox" defaultChecked={character}
              onChange={()=>{
                setCharacter((prev)=> !prev) 
              }} className="ml-4"/>
              <label className="text-white ml-2">Characters</label>
          </div>
      </div>

   </>
  )
}

export default App