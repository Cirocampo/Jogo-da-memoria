let game = {

    lock_mode: false,

    first_card: null,

    second_card: null,

    set_card: function(id){

        let card = cards.filter(card =>card.id===id)[0];
        if(card.flipped || this.lock_mode){
            return false;
        }
        if(!this.first_card) {
            this.first_card = card;
            this.first_card.flipped = true;
            return true
        } else {
            this.second_card = card;
            this.second_card.flipped = true;
            this.lock_mode = true
            return true 
        }
    },

    check_game: function(){
        if(!this.first_card || !this.second_card){
            return false
        }
        return this.first_card.icon === this.second_card.icon
    },

    unflip_cards(){
        this.first_card.flipped = false;
        this.second_card.flipped = false;
        this.clear_cards();
    },

    flip_true: [],

    check_game_over: function(){
        this.flip_true.push(this.cards);

        if(this.flip_true.length == 10){
            return true
        } else {
            return false
        }
    },  

    clear_cards: function(){
        this.first_card = null;
        this.second_card = null;
        this.lock_mode = false;
    },

    techs: [
        'bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react'
    ],

    create_card_techs: function() {
        this.cards = [];
    
        this.techs.forEach((tech) => {
            this.cards.push(this.create_pair_from_tech(tech));
        })
    
        return this.cards.flatMap(pair => pair)
        
    },

    create_pair_from_tech: function(tech) {

        return [{
            id: this.create_id_with_tech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.create_id_with_tech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    create_id_with_tech: function(tech){
        return tech + parseInt(Math.random() * 1000);  
    },
}
