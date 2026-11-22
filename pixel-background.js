/* Fixed translucent block background with multiple interactive falling pieces. */
(() => {
 const canvas=document.querySelector('.pixel-background');
 if(!canvas)return;
 document.body.prepend(canvas);
 document.body.classList.add('pixel-home');
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 const shapes=[[[0,0]],[[0,0],[0,1]],[[0,0],[1,0],[0,1],[1,1]]];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let cols,rows,size,offset,board,pieces=[],clock=0,last=0,frame,drag=null,flash=0,spawnClock=0;
 let tap=null, fragments=[];
 function cancelTap(){if(tap)clearTimeout(tap.timer);tap=null;}
 function shatter(piece){
  for(const [dx,dy] of piece.cells)burst(piece.x+dx,piece.y+dy,piece.color);
  pieces=pieces.filter(p=>p!==piece);
 }
 function burst(x,y,color){
  if(reduced.matches)return;
  for(let i=0;i<9;i++)fragments.push({
   x:(x+i%3/3)*size,y:(y+Math.floor(i/3)/3)*size+offset,
   vx:(Math.random()-.5)*220,vy:-60-Math.random()*160,life:.7,color
  });
  if(fragments.length>1800)fragments.splice(0,fragments.length-1800);
 }
 function shatterConnected(x,y){
  const queue=[[x,y]];
  while(queue.length){
   const [cx,cy]=queue.pop();
   if(cx<0||cx>=cols||cy<0||cy>=rows||!board[cy][cx])continue;
   burst(cx,cy,board[cy][cx]);board[cy][cx]=null;
   queue.push([cx-1,cy],[cx+1,cy],[cx,cy-1],[cx,cy+1]);
  }
 }
 function fits(cells,x,y,selected){return cells.every(([dx,dy])=>x+dx>=0&&x+dx<cols&&y+dy<rows&&(y+dy<0||!board[y+dy][x+dx])&&!pieces.some(p=>p!==selected&&p.cells.some(([px,py])=>p.x+px===x+dx&&p.y+py===y+dy)));}
 function spawn(){
  const type=Math.floor(Math.random()*shapes.length),cells=shapes[type].map(p=>p.slice());
  const shapeWidth=Math.max(...cells.map(([x])=>x))+1;
  const opacity=.05+Math.random()*.20;
  const piece={cells,x:Math.floor(Math.random()*(cols-shapeWidth+1)),y:-4,color:'rgba(255,255,255,'+opacity+')'};
  for(let i=0;i<cols;i++){
   if(fits(cells,piece.x,piece.y,piece)){pieces.push(piece);return;}
   piece.x=(piece.x+1)%(cols-shapeWidth+1);
  }
 }
 function clearRows(){
  const kept=board.filter(row=>!row.every(Boolean));
  if(kept.length<rows)flash=.35;
  while(kept.length<rows)kept.unshift(Array(cols).fill(null));
  board=kept;
 }
 function fall(){
  const sorted=[...pieces].sort((a,b)=>Math.max(...b.cells.map(([,y])=>b.y+y))-Math.max(...a.cells.map(([,y])=>a.y+y)));
  for(const piece of sorted){
   if(drag?.active===piece||tap?.active===piece)continue;
   if(fits(piece.cells,piece.x,piece.y+1,piece)){piece.y++;continue;}
   // A falling piece resting on another active piece waits instead of locking.
   const blocked=piece.cells.some(([dx,dy])=>piece.y+dy+1>=rows||board[piece.y+dy+1]?.[piece.x+dx]);
   if(!blocked)continue;
   if(piece.cells.some(([,dy])=>piece.y+dy<0)){
    board=Array.from({length:rows},()=>Array(cols).fill(null));pieces=[];cancelTap();drag=null;break;
   }
   for(const [dx,dy] of piece.cells)board[piece.y+dy][piece.x+dx]=piece.color;
   pieces=pieces.filter(p=>p!==piece);
  }
  clearRows();
 }
 function rotate(piece){
  const rotated=piece.cells.map(([x,y])=>[-y,x]);
  const minX=Math.min(...rotated.map(p=>p[0])),minY=Math.min(...rotated.map(p=>p[1]));
  const cells=rotated.map(([x,y])=>[x-minX,y-minY]);
  for(const kick of [0,-1,1,-2,2])if(fits(cells,piece.x+kick,piece.y,piece)){piece.cells=cells;piece.x+=kick;break;}
 }
 function resize(){
  const w=innerWidth,h=innerHeight;
  cols=Math.max(8,Math.round(w/44));size=w/cols;rows=Math.ceil(h/size);offset=h-rows*size;
  const ratio=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
  board=Array.from({length:rows},()=>Array(cols).fill(null));pieces=[];cancelTap();
  for(let i=0;i<3;i++){spawn();pieces[pieces.length-1].y=-4-i*4;}
  clock=0;spawnClock=0;drag=null;fragments=[];draw();
 }
 function cell(x,y,color){
  if(y<0)return;
  ctx.fillStyle=color;ctx.globalAlpha=1;
  ctx.fillRect(x*size+2,y*size+offset+2,size-4,size-4);
  ctx.globalAlpha=.7;ctx.strokeStyle=color;ctx.lineWidth=1;
  ctx.strokeRect(x*size+2.5,y*size+offset+2.5,size-5,size-5);
 }
 function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  board.forEach((row,y)=>row.forEach((c,x)=>{if(c)cell(x,y,c);}));
  for(const piece of pieces)for(const [x,y]of piece.cells)cell(piece.x+x,piece.y+y,piece.color);
  for(const p of fragments){ctx.globalAlpha=Math.max(0,p.life/.7);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,size/3-2,size/3-2);}
  if(flash>0){ctx.globalAlpha=flash*.15;ctx.fillStyle='#fff';ctx.fillRect(0,innerHeight-size,innerWidth,size);}
  ctx.globalAlpha=1;
 }
 function tick(now){
  const dt=last?Math.min((now-last)/1000,.1):0;last=now;
  clock+=dt;if(clock>=.7){clock-=.7;fall();}
  spawnClock+=dt;if(spawnClock>=2.1){spawnClock=0;if(pieces.length<5)spawn();}
  fragments=fragments.filter(p=>p.life>0);
  for(const p of fragments){p.life-=dt;p.vy+=400*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}
  flash=Math.max(0,flash-dt);draw();frame=requestAnimationFrame(tick);
 }
 function play(){cancelAnimationFrame(frame);last=0;if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);else draw();}
 const interactive=target=>target.closest('a,button,input,textarea,select,video');
 window.addEventListener('pointerdown',e=>{
  if(interactive(e.target)||e.button!==0)return;
  const x=Math.floor(e.clientX/size),y=Math.floor((e.clientY-offset)/size);
  const active=pieces.find(piece=>piece.cells.some(([dx,dy])=>piece.x+dx===x&&piece.y+dy===y));
  if(!active&&!board[y]?.[x])return;
  drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x:active?.x,moved:false,active,cellX:x,cellY:y};
 });
 window.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>8)drag.moved=true;
  if(!drag.active)return;
  const piece=drag.active;
  const target=drag.x+Math.round((e.clientX-drag.startX)/size),direction=Math.sign(target-piece.x);
  while(piece.x!==target&&fits(piece.cells,piece.x+direction,piece.y,piece))piece.x+=direction;
  draw();
 });
 window.addEventListener('pointerup',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  if(!drag.moved){
   if(tap&&tap.active===drag.active&&Math.hypot(e.clientX-tap.x,e.clientY-tap.y)<24){
    cancelTap();
    if(drag.active)shatter(drag.active);else shatterConnected(drag.cellX,drag.cellY);
   }else{
    cancelTap();
    const active=drag.active;
    tap={x:e.clientX,y:e.clientY,active,timer:setTimeout(()=>{
     tap=null;if(active&&pieces.includes(active))rotate(active);draw();
    },280)};
   }
  }else cancelTap();
  drag=null;draw();
 });
 window.addEventListener('pointercancel',()=>{drag=null;});
 window.addEventListener('blur',()=>{drag=null;cancelTap();});
 window.addEventListener('resize',resize);
 document.addEventListener('visibilitychange',play);
 reduced.addEventListener('change',play);
 resize();play();
})();
