
let x_turn=true
let o_turn=false
let x_area=[]
let o_area=[]
let winner_display=document.querySelector(".winner")



let reset_btn=document.querySelector(".reset-btn")
reset_btn.addEventListener("click",()=>{
    window.location.reload()
})



function gameResponse(e){
    let clicked_box=e.target
    clicked_box.classList.add("rotateff")
    setTimeout(()=>{

        if(x_turn && clicked_box.innerHTML==""){
            clicked_box.innerHTML="X"
            x_turn=false
            o_turn=true
            document.querySelector(".cur-player").innerHTML="O"
            x_area.push(parseInt(clicked_box.getAttribute("id")))
            if(winnerChecking(x_area)==1){
                document.querySelector(".winning-display").style.display="block"
                winner_display.innerHTML=" X "            }
        }
        else{
            if(clicked_box.innerHTML==""){
                clicked_box.innerHTML="O"
                o_turn=false
                x_turn=true
                document.querySelector(".cur-player").innerHTML="X"
                o_area.push(parseInt(clicked_box.getAttribute("id")))
                if(winnerChecking(o_area)==1){
                    document.querySelector(".winning-display").style.display="block"
                    winner_display.innerHTML=" O "
                }
            }
        }
    },300)
}

let inner_container=document.querySelector(".inner")
inner_container.addEventListener("click",gameResponse)



function gameEnd(){
    inner_container.removeEventListener("click",gameResponse)
    reset_btn.innerHTML="Play Again"    
}

function highlight_winner(positions){
    for(pos of positions){
        document.querySelector(`.box${pos}`).style.background="rgba(62, 62, 237, 0.552)";
    }
}

let pair=0
function winnerChecking(playerArea){
    let winingCombination=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
    for(posibility of winingCombination){
        pair=0
        for(position of posibility){
            if(playerArea.includes(position)){
                pair+=1
            }
            
        }
        if(pair==3){
            highlight_winner(posibility)
            gameEnd()
            return 1
        }
        pair=0
    }
    return -1
}



