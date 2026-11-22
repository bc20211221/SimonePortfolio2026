/* Fixed, translucent T/L/I/Z background. One controllable piece at a time. */
(() => {
 const canvas=document.querySelector('.pixel-background');
 if(!canvas)return;
 document.body.prepend(canvas);
 document.body.classList.add('pixel-home');
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 const shapes=[[[1,0],[0,1],[1,1],[2,1]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[1,1],[2,1]]];
 const colors=['#a6a0b5','#8dabb0','#b6b8bb','#a4ad93'];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let cols,rows,size,offset,board,piece,clock=0,last=0,frame,drag=null,flash=0;
 function fits(cells,x,y){return cells.every(([dx,dy])=>x+dx>=0&&x+dx<cols&&y+dy<rows&&(y+dy<0||!board[y+dy][x+dx]));}
 function spawn(){
  const type=Math.floor(Math.random()*4),cells=shapes[type].map(p=>p.slice());
  piece={cells,x:Math.floor(Math.random()*Math.max(1,cols-3)),y:-4,color:colors[type]};
  if(!fits(cells,piece.x,piece.y)){board=Array.from({length:rows},()=>Array(cols).fill(null));}
 }
 function clearRows(){
  const kept=board.filter(row=>!row.every(Boolean));
  if(kept.length<rows)flash=.35;
  while(kept.length<rows)kept.unshift(Array(cols).fill(null));
  board=kept;
 }
 function fall(){
  if(fits(piece.cells,piece.x,piece.y+1)){piece.y++;return;}
  if(piece.cells.some(([,dy])=>piece.y+dy<0))board=Array.from({length:rows},()=>Array(cols).fill(null));
  else {for(const [dx,dy] of piece.cells)board[piece.y+dy][piece.x+dx]=piece.color;clearRows();}
  spawn();
 }
 function rotate(){
  const rotated=piece.cells.map(([x,y])=>[-y,x]);
  const minX=Math.min(...rotated.map(p=>p[0])),minY=Math.min(...rotated.map(p=>p[1]));
  const cells=rotated.map(([x,y])=>[x-minX,y-minY]);
  for(const kick of [0,-1,1,-2,2])if(fits(cells,piece.x+kick,piece.y)){piece.cells=cells;piece.x+=kick;break;}
 }
 function resize(){
  const w=innerWidth,h=innerHeight;
  cols=Math.max(8,Math.round(w/44));size=w/cols;rows=Math.ceil(h/size);offset=h-rows*size;
  const ratio=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
  board=Array.from({length:rows},()=>Array(cols).fill(null));spawn();piece.y=1;clock=0;drag=null;draw();
 }
 function cell(x,y,color){
  if(y<0)return;
  ctx.fillStyle=color;ctx.globalAlpha=.26;
  ctx.fillRect(x*size+2,y*size+offset+2,size-4,size-4);
  ctx.globalAlpha=.18;ctx.strokeStyle=color;ctx.lineWidth=1;
  ctx.strokeRect(x*size+2.5,y*size+offset+2.5,size-5,size-5);
 }
 function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  board.forEach((row,y)=>row.forEach((c,x)=>{if(c)cell(x,y,c);}));
  if(piece)for(const [x,y]of piece.cells)cell(piece.x+x,piece.y+y,piece.color);
  if(flash>0){ctx.globalAlpha=flash*.15;ctx.fillStyle='#fff';ctx.fillRect(0,innerHeight-size,innerWidth,size);}
  ctx.globalAlpha=1;
 }
 function tick(now){
  const dt=last?Math.min((now-last)/1000,.1):0;last=now;
  if(!drag){clock+=dt;if(clock>=.9){clock=0;fall();}}
  flash=Math.max(0,flash-dt);draw();frame=requestAnimationFrame(tick);
 }
 function play(){cancelAnimationFrame(frame);last=0;if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);else draw();}
 const interactive=target=>target.closest('a,button,input,textarea,select,video');
 window.addEventListener('pointerdown',e=>{
  if(interactive(e.target)||e.button!==0)return;
  const x=Math.floor(e.clientX/size),y=Math.floor((e.clientY-offset)/size);
  if(!piece.cells.some(([dx,dy])=>piece.x+dx===x&&piece.y+dy===y))return;
  drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:piece.x,moved:false};
 });
 window.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>8)drag.moved=true;
  const target=drag.x+Math.round((e.clientX-drag.startX)/size),direction=Math.sign(target-piece.x);
  while(piece.x!==target&&fits(piece.cells,piece.x+direction,piece.y))piece.x+=direction;
  draw();
 });
 window.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;if(!drag.moved)rotate();drag=null;draw();});
 window.addEventListener('pointercancel',()=>{drag=null;});
 window.addEventListener('blur',()=>{drag=null;});
 window.addEventListener('resize',resize);
 document.addEventListener('visibilitychange',play);
 reduced.addEventListener('change',play);
 resize();play();
})();
