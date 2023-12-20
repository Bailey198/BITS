const Gaming = document.querySelector('.Gaming-type');
const Boarding = document.querySelector('.BoardGame-type');


var LGaming = [
    {
        name: 'NBA 2k24',
        image: './assets/images/Game/NBA2k24.jpg',
        price: 150000,
        link: 'detail.html#NBA2k24',
    },

    {
        name: 'GTA 5',
        image: './assets/images/Game/GTA5.jpg',
        price: 150000,
        link: 'detail.html#GTA5',
    },

    {
        name: 'Fifa 2k23',
        image: './assets/images/Game/Fifa.jpg',
        price: 150000,
        link: 'detail.html#Fifa',
    }

    
]

var LBoardGame = [
    {
        name: 'House of Betrayed',
        image: './assets/images/Boardgame/Betrayed.jpg',
        price: 150000,
        link: 'detail.html#Betray',
    },

    {
        name: 'Deception',
        image: './assets/images/Boardgame/Deception.jpg',
        price: 150000,
        link: 'detail.html#Deception',
    },

    {
        name: 'MAFIA',
        image: './assets/images/Boardgame/MAFIA.jpg',
        price: 150000,
        link: 'detail.html#MAFIA',
    },
]



function loadProduct(list, CategoryType) {
    for (let i = 0; i < list.length; i++) {
        let box = document.createElement('a');
        box.classList.add('ProductContainer');
        box.href = list[i].link;
        let heading = document.createElement('h4');
        heading.innerText = list[i].name;
        let making = document.createElement('img');
        making.src = list[i].image;
        let cost = document.createElement('strong')
        cost.innerText = `${list[i].price}dong`;
    
        box.appendChild(making);
        box.appendChild(heading);
        box.appendChild(cost);
        CategoryType.appendChild(box);
    }
}

loadProduct(LGaming, Gaming);
loadProduct(LBoardGame, Boarding);

