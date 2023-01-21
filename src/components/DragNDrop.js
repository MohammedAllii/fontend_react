import React, {useState, useRef} from 'react';
import axios from 'axios';

function DragNDrop({data}) {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('drag starting ...',params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handelDragEnd)
        setTimeout(()=> {
            setDragging(true)
        },0) 
    }

    const handleDragEnter = (e, params)=>{
        console.log('Entering drag...',params)
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log("Target is not the same")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grp1].items.splice(params.item1,0,newList[currentItem.grp1].items.splice(currentItem.item1,1)[0]);
                dragItem.current = params
                return newList
            })
        }
    }

    const handelDragEnd = (e) => {

        console.log('Ending drag...')
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handelDragEnd);
        dragItem.current = null;
        dragNode.current = null;
       
          
       
    }

    const getStyles = (params) =>{
        const currentItem = dragItem.current;
         if (currentItem.grp1 === params.grp1 && currentItem.item1 === params.item1){
            return 'current dnd-item'
         }
         return 'dnd-item'
        
    }
    
        return (                
            <div className="drag-n-drop">
            {list.map((grp, grp1) => (
              <div key={grp.title} className='dnd-group' onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grp1, item1: 0}):null} >
                <div className='group-title'>{grp.title}</div>

                
                {
                
                grp.items.map((item, item1) => (
                  <div 
                  draggable  
                  onDragStart={(e) => {handleDragStart(e, {grp1, item1})}}
                  onDragEnter={dragging?(e) => {handleDragEnter(e, {grp1, item1})}:null} 
                  key={item.titre} 
                  style={{backgroundColor: item.couleur}} 
                  className={dragging?getStyles({grp1, item1}):"dnd-item"}>
                    <div style={{textAlign:"right",margin:"10px"}}>{item.duree} H</div><div style={{textAlign:"left",margin:"10px"}}> {item.titre}<br/> {item.description}</div>
                    <br></br>
                    
                  </div>
                  
                ))}
                <button className="hide-button" onClick={savedays(grp.title)}>Save</button>
              </div>
            ))}
            </div>
            
        )
        
        function savedays(it)
        {
            
            switch (it) {
                case "Matieres":
                  var i=0;
                  break;
                case "Lundi":
                    var i=1;
                  break;
                case "Mardi":
                    var i=2;
                  break;
                  case "Mercredi":
                    var i=3;
                    break;
                    case "Jeudi":
                        var i=4;
                        break;
                        case "Vendredi":
                            var i=5;
                            break;
                            case "Samedi":
                                var i=6;
                            break;
               
              }
           let day= list[i].items.map(item => item._id);
           const arrayString = day.join('-');
        
           
           
            var token = localStorage.getItem("authToken");
        
            axios.get('http://localhost:5000/stories/sday/'+i+'/'+arrayString, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
           })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
           // alert(it ," Est sauvegarder !!");
            
        }
        
        
}

export default DragNDrop;