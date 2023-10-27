const front = "card_front";
const back = "card_back";
const CARD = 'card'
const ICON = 'icon'

let cards = null;

start_game()

function start_game(){
    cards = game.create_card_techs();
    shuffle_card(cards); 
    initialize_cards(cards);
}

function initialize_cards(cards) {
    let board = document.getElementById("game_board");
    board.innerHTML = ''
    cards.forEach(card=>{
        
        let card_element = document.createElement('div');
        card_element.id = card.id;
        card_element.classList.add(CARD);   
        card_element.dataset.icon = card.icon;

        create_content_card(card, card_element);

        card_element.addEventListener('click', flip_card)
        board.appendChild(card_element);
    });
}

function create_content_card(card, card_element){
    
    create_card_face(front, card, card_element);
    create_card_face(back, card, card_element);

}

function create_card_face(face, card, card_element){    

    let card_element_face = document.createElement('div');
    card_element_face.classList.add(face);

    if(face === front){
        let icon_element = document.createElement('img');
        icon_element.classList.add(ICON)
        icon_element.src = 'image/' + card.icon + '.png' 
        card_element_face.appendChild(icon_element);
    } else {
        card_element_face.innerHTML = "&lt/&gt"
    }
    card_element.appendChild(card_element_face);
};

// embaralha os índices
function shuffle_card(cards){
    let current_index = cards.length;
    let random_index = 0;

    while(current_index !== 0){

        random_index = Math.floor(Math.random() * current_index);
        current_index--;

        // forma de inverter os valores
        [cards[random_index], cards[current_index]] = [cards[current_index], cards[random_index]]
    }
}

function flip_card(){

    if(game.set_card(this.id)){

        this.classList.add('flip');

        if(game.second_card){
            if(game.check_game()){
                game.clear_cards();
                if(game.check_game_over()){
                    let game_over_layer = document.getElementById("game_over");
                    game_over_layer.style.display = 'flex';
                }
            } else {
                setTimeout(() =>{ 
                let first_card_view = document.getElementById(game.first_card.id);
                let second_card_view = document.getElementById(game.second_card.id);
                
                    first_card_view.classList.remove("flip");
                    second_card_view.classList.remove("flip");
                    game.unflip_cards()
                }, 1000)
            }
        }
    }

}

function restart(){
    game.clear_cards();
    start_game();
    let game_over_layer = document.getElementById("game_over");
    game_over_layer.style.display = 'none'
}

