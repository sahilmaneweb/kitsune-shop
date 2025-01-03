
import tees1 from './tees1.jpg'
import tees2 from './tees2.jpg'
import tees3 from './tees3.jpg'
import tees4 from './tees4.jpg'
import tees5 from './tees5.jpg'
import tees6 from './tees6.jpg'
import tees7 from './tees7.jpg'
import tees8 from './tees8.jpg'
import tees9 from './tees9.jpg'
import tees10 from './tees10.jpg'
import tees11 from './tees11.jpg'
import tees12 from './tees12.jpg'
import shirt1 from './shirt1.jpg'
import shirt2 from './shirt2.jpg'
import shirt3 from './shirt3.jpg'
import shirt4 from './shirt4.jpg'
import shirt5 from './shirt5.jpg'
import shirt6 from './shirt6.jpg'
import shirt7 from './shirt7.webp'
import shirt8 from './shirt8.webp'
import shirt9 from './shirt9.webp'
import shirt10 from './shirt10.webp'
import shirt11 from './shirt11.webp'
import shirt12 from './shirt12.webp'
import hat1 from './hat1.webp'
import hat2 from './hat2.webp'
import hat3 from './hat3.webp'
import hat4 from './hat4.webp'
import hat5 from './hat5.webp'
import hat6 from './hat6.webp'
import hat7 from './hat7.webp'
import hat8 from './hat8.webp'
import hat9 from './hat9.webp'
import hat10 from './hat10.webp'
import hat11 from './hat11.webp'
import hat12 from './hat12.webp'


const productData = [
    {
        id:"01",
        name:"Red Scar",
        image:tees1,
        category:"Kitsune-Tees",
        oldPrice:875,
        newPrice:788,
    },
    {
        id:"02",
        name:"Shinigami",
        image: tees2,
        category:"Kitsune-Tees",
        oldPrice:815,
        newPrice:696,
    },
    {
        id:"03",
        name:"Yare",
        image: tees3,
        category:"Kitsune-Tees",
        oldPrice:798,
        newPrice:694,
    },
    {
        id:"04",
        name:"Pirate",
        image: tees4,
        category:"Kitsune-Tees",
        oldPrice:840,
        newPrice:763,
    },
    {
        id:"05",
        name:"Joy",
        image: tees5,
        category:"Kitsune-Tees",
        oldPrice:890,
        newPrice:775,
    },
    {
        id:"06",
        name:"Asura",
        image: tees6,
        category:"Kitsune-Tees",
        oldPrice:860,
        newPrice:707,
    },
    {
        id:"07",
        name:"Attack",
        image: tees7  ,
        category:"Kitsune-Tees",
        oldPrice:845,
        newPrice:739,
    },
    {
        id:"08",
        name:"Overtime",
        image: tees8  ,
        category:"Kitsune-Tees",
        oldPrice:880,
        newPrice:796,
    },
    {
        id:"09",
        name:"Curse",
        image: tees9  ,
        category:"Kitsune-Tees",
        oldPrice:830,
        newPrice:747,
    },
    {
        id:"10",
        name:"Ace",
        image: tees10  ,
        category:"Kitsune-Tees",
        oldPrice:810,
        newPrice:689,
    },
    {
        id:"11",
        name:"King",
        image: tees11  ,
        category:"Kitsune-Tees",
        oldPrice:870,
        newPrice:706,
    },
    {
        id:"12",
        name:"Ghoul",
        image: tees12  ,
        category:"Kitsune-Tees",
        oldPrice:835,
        newPrice:751,
    },
    // Kitsune-Shirts Section
    {
        id:"13",
        name:"Day Sorcerer",
        image: shirt1  ,
        category:"Kitsune-Shirts",
        oldPrice:870,
        newPrice:773,
    },
    {
        id:"14",
        name:"Basement",
        image: shirt2  ,
        category:"Kitsune-Shirts",
        oldPrice:825,
        newPrice:718,
    },
    {
        id:"15",
        name:"Malaysia",
        image: shirt3  ,
        category:"Kitsune-Shirts",
        oldPrice:860,
        newPrice:792,
    },
    {
        id:"16",
        name:"Run",
        image: shirt4  ,
        category:"Kitsune-Shirts",
        oldPrice:805,
        newPrice:661,
    },
    {
        id:"17",
        name:"Shadows",
        image: shirt5  ,
        category:"Kitsune-Shirts",
        oldPrice:830,
        newPrice:703,
    },
    {
        id:"18",
        name:"Keystones",
        image: shirt6  ,
        category:"Kitsune-Shirts",
        oldPrice:890,
        newPrice:802,
    },
    {
        id:"19",
        name:"Kitsune Masks",
        image: shirt7 ,
        category:"Kitsune-Shirts",
        oldPrice:800,
        newPrice:696,
    },
    {
        id:"20",
        name:"Wanted Pirates",
        image: shirt8 ,
        category:"Kitsune-Shirts",
        oldPrice:880,
        newPrice:769,
    },
    {
        id:"21",
        name:"Shinigami Grafitti",
        image: shirt9 ,
        category:"Kitsune-Shirts",
        oldPrice:855,
        newPrice:700,
    },
    {
        id:"22",
        name:"Slayers Pattern",
        image: shirt10 ,
        category:"Kitsune-Shirts",
        oldPrice:870,
        newPrice:783,
    },
    {
        id:"23",
        name:"Turtle Hermit",
        image: shirt11 ,
        category:"Kitsune-Shirts",
        oldPrice:880,
        newPrice:751,
    },
    {
        id:"24",
        name:"Soot Spirits",
        image: shirt12 ,
        category:"Kitsune-Shirts",
        oldPrice:795,
        newPrice:681,
    },
    // Kitsune-Headgear
    {
        id:"25",
        name:"Straw Hat",
        image: hat1 ,
        category:"Kitsune-Headgear",
        oldPrice:810,
        newPrice:690,
    },
    {
        id:"26",
        name:"Jotaro",
        image: hat2 ,
        category:"Kitsune-Headgear",
        oldPrice:860,
        newPrice:731,
    },
    {
        id:"27",
        name:"Mugiwara Bucket",
        image: hat3 ,
        category:"Kitsune-Headgear",
        oldPrice:875,
        newPrice:740,
    },
    {
        id:"28",
        name:"Band of Sacrifise",
        image: hat4 ,
        category:"Kitsune-Headgear",
        oldPrice:890,
        newPrice:781,
    },
    {
        id:"29",
        name:"Wings of Freedom",
        image: hat5 ,
        category:"Kitsune-Headgear",
        oldPrice:815,
        newPrice:671,
    },
    {
        id:"30",
        name:"Shopkeeper",
        image: hat6 ,
        category:"Kitsune-Headgear",
        oldPrice:800,
        newPrice:672,
    },
    {
        id:"31",
        name:"Devil Hunter",
        image: hat7 ,
        category:"Kitsune-Headgear",
        oldPrice:835,
        newPrice:743,
    },
    {
        id:"32",
        name:"Soul Society",
        image: hat8 ,
        category:"Kitsune-Headgear",
        oldPrice:870,
        newPrice:773,
    },
    {
        id:"33",
        name:"Menacing",
        image: hat9 ,
        category:"Kitsune-Headgear",
        oldPrice:820,
        newPrice:698,
    },
    {
        id:"34",
        name:"Anti Magic",
        image: hat10 ,
        category:"Kitsune-Headgear",
        oldPrice:845,
        newPrice:761,
    },
    {
        id:"35",
        name:"Sandkage",
        image: hat11 ,
        category:"Kitsune-Headgear",
        oldPrice:890,
        newPrice:772,
    },
    {
        id:"36",
        name:"Majin",
        image: hat12 ,
        category:"Kitsune-Headgear",
        oldPrice:860,
        newPrice:772,
    }
];

export default productData