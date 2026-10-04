let gridSize = 5;
function setGridSize(size) { if (![4,5,6].includes(size)) throw new Error('Grade inválida'); gridSize = size; }
const solution = () => Array.from({length:gridSize*gridSize}, (_,i)=>(i+1)%(gridSize*gridSize));
function valid(board) { const total=gridSize*gridSize;return Array.isArray(board)&&board.length===total&&board.every(Number.isInteger)&&new Set(board).size===total&&board.every(n=>n>=0&&n<total); }
function solvable(board) { if(!valid(board))return false;let inversions=0;const a=board.filter(Boolean);for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]>a[j])inversions++;if(gridSize%2)return inversions%2===0;const rowFromBottom=gridSize-Math.floor(board.indexOf(0)/gridSize);return (inversions+rowFromBottom)%2===1; }
function neighbors(index) { return Array.from({length:gridSize*gridSize},(_,i)=>i).filter(i=>Math.abs(Math.floor(i/gridSize)-Math.floor(index/gridSize))+Math.abs(i%gridSize-index%gridSize)===1); }
function move(board,index) { const empty=board.indexOf(0);if(!neighbors(empty).includes(index))return false;[board[index],board[empty]]=[board[empty],board[index]];return true; }
const solved=board=>valid(board)&&board.every((n,i)=>n===(i+1)%(gridSize*gridSize));
function shuffle(random=Math.random) { const board=solution();let previous=-1;for(let i=0;i<gridSize*gridSize*32;i++){const empty=board.indexOf(0),options=neighbors(empty).filter(n=>n!==previous);move(board,options[Math.floor(random()*options.length)]);previous=empty;}if(solved(board))move(board,neighbors(board.indexOf(0))[0]);return board; }
