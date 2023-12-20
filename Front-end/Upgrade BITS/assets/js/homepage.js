const Gaming = document.querySelector('.Game');
const Boarding = document.querySelector('.BoardGame');



var list1 = [
    {
        name: 'Fifa 2k23',
        image: './assets/images/Game/Fifa.jpg',
        price: 150000,
        link: 'detail.html#Fifa',
    },

    {
        name: 'GTA5',
        image: './assets/images/Game/GTA5.jpg',
        price: 150000,
        link: 'detail.html#GTA5',
    },

    {
        name: 'NBA 2k24',
        image: './assets/images/Game/NbA2k24.jpg',
        price: 150000,
        link: 'detail.html#NBA',
        
    }
]

var list2 = [
    {
        name: 'House of Betrayed',
        image: './assets/images/Boardgame/Betrayed.jpg',
        price: 150000,
        link: 'detail.html#Betrayed',
    },

    {
        name: 'Deception',
        image: './assets/images/Boardgame/Deception.jpg',
        price: 150000,
        link: 'detail.html#Deception',
    },

    {
        name: 'Mafia',
        image: './assets/images/Boardgame/MAFIA.jpg',
        price: 150000,
        link: 'detail.html#MAFIA',
        
    }
]




function loadCategory(list, CategoryType) {
    for (let i = 0; i < list.length; i++) {
        let box = document.createElement('a');
        box.classList.add('Productcontainer');
        box.href = list[i].link;
        let heading = document.createElement('h4');
        heading.innerText = list[i].name;
        let making = document.createElement('img');
        making.src = list[i].image;
        let cost = document.createElement('strong')
        cost.innerText = `${list[i].price}d`
    
        box.appendChild(making);
        box.appendChild(heading);
        box.appendChild(cost);
        CategoryType.appendChild(box);
    }
}

loadCategory(list1, Gaming);
loadCategory(list2, Boarding);

