'use server'

function win1251(text:string){
    let ci = ''
    for(const ch of text){
        for(let i=0;i<win1251K.length;i++){
            if(ch == win1251K[i][0]){
                ci += win1251K[i][1] + ' '
            }
        }
    }
    return ci
}
function hex2bin(hex:string){
    let ci = ''
    for(const ch of hex){
        if (ch!= ' '){
            ci+= ( (parseInt(ch, 16)).toString(2)).padStart(4, '0') + ' '
        }
    }
    return ci
}
function appendEmptyZeros(bin:string){
    bin = bin.replace(/\s/g, '')
    if (bin.length<64){
        bin = '0'.repeat(64-bin.length) + bin
        // console.log(bin.length)
    }
    return bin  
}
function firstChange(text:string){
    let replaces = ''
    for(let i=0; i<p1.length;i++){
        replaces+= text[p1[i]-1]
    }
    return replaces
}
function compression56Key(key:string){
    // console.log(key)
    let replaces = ''
    for(let i=0; i<k56bit.length;i++){
        replaces+= key[k56bit[i]-1]
    }
    return replaces
}
function bin2hex(bin:string){
    let chunks = [];

    for (var i = 0; i < bin.length; i += 4) {
    chunks.push(bin.substring(i, i + 4));}
    let hexCon = ''
    for(let i = 0; i<chunks.length;i++){
        hexCon+=parseInt(chunks[i], 2).toString(16).toUpperCase();
    }
    return hexCon
}

function change1(text:string){
    let firstKeyRound  = ''
    for(let i = 0; i<text.length;i++){
        if (i!=text.length-1){
        firstKeyRound+=text[i+1]
    }
        else{
            firstKeyRound+=text[0]
        }}
    return firstKeyRound
}
function keyTo48Bit(key:string){
    let key48 = ''
    for(let i = 0; i<k48bit.length; i++){
        key48+= key[k48bit[i]-1]
    }
    return key48
}
function R0from32to48(text:string){
    let R048 = ''
    // console.log(text.length, text)
    for(let i = 0; i<R0f32t48.length; i++){
        R048+= text[R0f32t48[i]-1]
    }
    return R048
}
function XOR(R:string, key:string){
    let xorSum=''
    for(let i = 0; i<R.length; i++){
        if(R[i]==key[i]){
            xorSum +='0'
        }
        else{
            xorSum+='1'
        }
    }
    return xorSum
}
const decToBin = (dec:number) => ("0000" + (parseInt(dec.toString(), 10)).toString(2)).substr(-4);
const chunkString = (str:string, len:number) => str.match(new RegExp('.{1,' + len + '}', 'g'));
const sBoxOutput =(bits:string) => {
    //ts-ignore
    return chunkString(bits, 6).map((group, sBox) => {
    let row = parseInt(group[0] + group[5], 2);
    let col = parseInt(group.slice(1, 5), 2);
    return decToBin(S[sBox][16 * row + col]);
    }).join("");
    };
function insertCharacter(str:string, n:number) {
    let val = [];
    let i, l;
    for (i = 0, l = str.length; i < l; i += n) {
        val.push(str.substr(i, n));
    }
 
    return val;
};
function finalChangeSBlocks(bit:string){
    let change = ''
    for(let i = 0; i<finalP.length; i++){
        change+= bit[finalP[i]-1]
    }
    return change
}
const win1251K = [
    ['а', 'C0'],
    ['б', 'C1'],
    ['в', 'C2'],
    ['г', 'C3'],
    ['д', 'C4'],
    ['е', 'C5'],
    ['ж', 'C6'],
    ['з', 'C7'],
    ['и', 'C8'],
    ['й', 'C9'],
    ['к', 'CA'],
    ['л', 'CB'],
    ['м', 'CC'],
    ['н', 'CD'],
    ['о', 'CE'],
    ['п', 'CF'],
    ['р', 'D0'],
    ['с', 'D1'],
    ['т', 'D2'],
    ['у', 'D3'],
    ['ф', 'D4'],
    ['х', 'D5'],
    ['ц', 'D6'],
    ['ч', 'D7'],
    ['ш', 'D8'],
    ['щ', 'D9'],
    ['ъ', 'DA'],
    ['ы', 'DB'],
    ['ь', 'DC'],
    ['э', 'DD'],
    ['ю', 'DE'],
    ['я', 'DF'],
]
const p1 = [
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56 ,48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9,  1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7
]
const k56bit = [
    57, 49, 41, 33, 25, 17, 9,  1,
    58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3,
    60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7,  62, 54, 46, 38,
    30, 22, 14, 6,  61, 53, 45, 37, 
    29, 21, 13, 5,  28, 20, 12, 4
]
const k48bit = [
    14, 17, 11, 24, 1,  5, 
    3,  28, 15, 6,  21, 10,
    23, 19, 12, 4,  26, 8,
    16, 7,  27, 20, 13, 2,
    41, 52, 32, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32
]
const R0f32t48= [
    32, 1, 2, 3, 4, 5,
    4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1
]
const S = [
    [
    14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
    0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
    4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
    15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
    ],
    [
    15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
    3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
    0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
    13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
    ],
    [
    10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
    13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
    13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
    1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
    ],
    [
    7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
    13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
    10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
    3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
    ],
    [
    2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
    14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
    4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
    11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
    ],
    [
    12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
    10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
    9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
    4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
    ],
    [
    4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
    13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
    1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
    6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
    ],
    [
    13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
    1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
    7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
    2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
    ]
    ]
const finalP = [
    16, 7, 20, 21,
    29, 12, 28, 17,
    1, 15, 23, 26,
    5, 18, 31, 10,
    2, 8, 24, 14,
    32, 27, 3, 9,
    19, 13, 30, 6,
    22, 11, 4, 25
]
interface desProps{
    text:string,
    key:string
}

export async function encryption({text, key}:desProps){
    const w1251Text = win1251(text)
    const binText = hex2bin(w1251Text)
    const w1251Key = win1251(key)
    const binKey = hex2bin(w1251Key)
    const bitText64 = appendEmptyZeros(binText) 
    const bitKey64 = appendEmptyZeros(binKey)
    // const bitKey64SP = insertCharacter(bitKey64, 4).join(' ')
    // const bitText64SP = insertCharacter(bitText64, 4).join(' ')
    const firstChangeText = firstChange(bitText64)
    const hexText = bin2hex(firstChangeText)
    const L0TextHex = hexText.slice(0, hexText.length/2)
    const R0TextHex = hexText.slice(hexText.length/2, hexText.length)
    // console.log(R0TextHex)
    const keyCompr56 = compression56Key(bitKey64)
    const keyL0 = keyCompr56.slice(0, keyCompr56.length/2)
    const keyR0 = keyCompr56.slice(keyCompr56.length/2, keyCompr56.length)
    const firstKeyRoundLeft  = change1(keyL0)
    const firstKeyRoundRight  = change1(keyR0)
    // console.log(keyL0, ' ', keyR0)
    // console.log( firstKeyRoundLeft, ' ', firstKeyRoundRight)
    const key48Bit = keyTo48Bit(firstKeyRoundLeft+firstKeyRoundRight)
    const hexKey48Bit = bin2hex(key48Bit)
    const R0up48 = R0from32to48(firstChangeText.slice(firstChangeText.length/2, firstChangeText.length))
    const R0xorK1= XOR(R0up48 , key48Bit)
    const SOut = sBoxOutput(R0xorK1)
    const finalSBlocksChange = finalChangeSBlocks(SOut)
    // console.log(finalSBlocksChange)
    const L0xorSBlock = XOR(firstChangeText.slice(0, firstChangeText.length/2), finalSBlocksChange)
    return bin2hex(L0xorSBlock)+R0TextHex
}
export async function decryption({text, key}:desProps){
    return text.toString()
}